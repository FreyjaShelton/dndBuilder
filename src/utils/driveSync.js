// Keeps the characters in the local library in sync with the user's Google Drive, like the budget app does:
// sign in with Google once and it stays connected. There is no passphrase and no manual save, and no continuous
// syncing either: a character uploads when the user reaches the Finalize step (and again only if they edit it and
// finalize again), and changes made on the interactive sheet upload after 20 quiet seconds. A sync also runs when the app opens, when the Characters list is opened and on "Sync now",
// which is how characters saved on another device show up here. Drafts never upload.
//
// Each sync pass compares every character with its file in Drive using the file's version number:
//   - only this device changed it  -> upload
//   - only Drive changed it        -> download
//   - both changed it              -> the newer one wins (and if both ended up exactly the same, nothing happens). A character
//                                     is never copied: there is one per id, on every device
//   - new on either side           -> copied across (a new character only goes up once the user reaches Finalize;
//                                     drafts stay on this device)
//   - deleted on this device       -> its Drive file is deleted; deleted on another device -> removed here
// The custom items library is synced with the same passes, as one more file ("Custom items (dndBuilder-items).json"), merged item by
// item (the newer edit wins; a deletion beats an item that has not changed since). It syncs whenever it changes, not only at Finalize.
// Built as a factory so it can be tested with an in-memory Drive and library.

const CONNECTED_KEY = 'dndBuilder.drive.connected';
const LAST_SYNC_KEY = 'dndBuilder.drive.lastSync';
const ITEMS_FILE_KEY = 'dndBuilder.drive.itemsFileId'; // the library's file, remembered so a lagging file search can't create a second one
const SYNC_DELAY_MS = 1000;
const SHEET_DELAY_MS = 5000; // quiet period after the last change on the interactive sheet

export function createSyncEngine({ library, drive, items, getStorage = () => window.localStorage, now = Date.now, delay = SYNC_DELAY_MS, sheetDelay = SHEET_DELAY_MS }) {
	let state = { status: 'off' };
	const listeners = new Set();
	let running = false;
	let rerun = false;
	let timer = null;
	let sheetTimer = null;

	const store = () => { try { return getStorage(); } catch (e) { return null; } };
	const getFlag = (key) => { try { return store()?.getItem(key); } catch (e) { return null; } };
	const setFlag = (key, value) => { try { if (value === null) store()?.removeItem(key); else store()?.setItem(key, value); } catch (e) { /* ignore */ } };
	const isConnected = () => getFlag(CONNECTED_KEY) === '1';

	const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };

	// A character uploads only if it changed and the user has reached Finalize since its last edit.
	const canPush = (entry) => !!(entry.dirty && entry.ready);
	// Drive files this session deleted: a listing that lags behind must not bring them back.
	const recentlyDeleted = new Set();
	const sameContent = (content, record) => !!record
		&& JSON.stringify(content.character) === JSON.stringify(record.character)
		&& JSON.stringify(content.play || null) === JSON.stringify(record.play || null);

	const remoteId = (file) => file.appProperties?.cid || `legacy-${file.id}`;

	// A file's contents as a library record. Files from older versions of the app have no updatedAt/playBase.
	function toRecord(content) {
		const record = { character: content.character };
		if (content.play) {
			record.play = content.play;
			record.playBase = content.playBase || JSON.stringify(content.character);
		}
		return record;
	}

	async function upload(id, entry, file) {
		const record = library.getRecord(id);
		if (!record?.character) return null;
		const written = await drive.writeFile({
			id: file?.id || entry.driveId,
			name: drive.fileNameFor(entry.name),
			appProperties: { cid: id },
			content: { app: 'dndBuilder', version: 2, id, name: entry.name, updatedAt: entry.updatedAt, ...record },
		});
		library.markSynced(id, { driveId: written.id, version: written.version, updatedAt: entry.updatedAt });
		return written;
	}

	async function download(file) {
		const content = await drive.downloadFile(file.id);
		if (!content?.character?.classInfo) throw new Error(`"${file.name}" in Google Drive is not a dndBuilder character.`);
		return content;
	}

	const adopt = (id, content, file) => library.adoptRemote(id, toRecord(content), {
		driveId: file.id,
		version: file.version,
		updatedAt: content.updatedAt || Date.parse(file.modifiedTime) || now(),
	});

	// The custom item library is one file in Drive: merge it with this device's, and write it back when it differs.
	async function syncItems() {
		if (!items) return;
		let file = null;
		const knownId = getFlag(ITEMS_FILE_KEY);
		if (knownId && await drive.fileExists(knownId)) file = { id: knownId };
		if (!file) file = await drive.findFileByName(drive.ITEMS_FILE);
		const remote = file ? await drive.downloadFile(file.id) : null;
		const { snapshot, changedRemote } = items.merge(remote);
		if (!changedRemote) { if (file) setFlag(ITEMS_FILE_KEY, file.id); return; }
		if (!file && snapshot.items.length === 0 && Object.keys(snapshot.deleted).length === 0) return; // nothing to put there yet
		const written = await drive.writeFile({
			id: file?.id, name: drive.ITEMS_FILE, appProperties: { kind: 'customItems' },
			content: { app: 'dndBuilder', kind: 'customItems', version: 1, ...snapshot },
		});
		setFlag(ITEMS_FILE_KEY, written.id);
	}

	async function pass() {
		await syncItems(); // first, so characters opened afterwards find the items they carry up to date

		// 1. Characters deleted on this device
		let files = await drive.listFiles();
		const tombstones = library.getIndex().deleted;
		for (const gone of tombstones) {
			await drive.deleteFile(gone.driveId); // already-gone files are fine
			recentlyDeleted.add(gone.driveId);
			library.clearDeleted(gone.id);
		}
		files = files.filter((f) => !recentlyDeleted.has(f.id) && !tombstones.some((d) => d.driveId === f.id));

		// If two files claim the same character, use the most recently changed one.
		const remote = new Map();
		[...files].sort((a, b) => String(a.modifiedTime).localeCompare(String(b.modifiedTime))).forEach((f) => remote.set(remoteId(f), f));

		// 2. Characters Drive has
		for (const [id, file] of remote) {
			const entry = library.getIndex().entries[id];
			if (!entry) {
				adopt(id, await download(file), file);
				continue;
			}
			const versionDiffers = file.id !== entry.driveId || file.version !== entry.syncedVersion;
			if (!versionDiffers) {
				if (canPush(entry)) await upload(id, entry, file);
				continue;
			}
			// The version differs, but Drive's listing can lag behind a write, so look at the contents before calling
			// it a change from another device: if it is what we last synced, nothing happened elsewhere.
			const content = await download(file);
			const stamp = content.updatedAt || Date.parse(file.modifiedTime) || 0;
			const unchanged = entry.syncedUpdatedAt !== undefined ? stamp === entry.syncedUpdatedAt : sameContent(content, library.getRecord(id));
			if (unchanged) {
				if (canPush(entry)) await upload(id, entry, file);
				else library.setSyncedVersion(id, file.id, file.version);
			} else if (sameContent(content, library.getRecord(id))) {
				// Both devices ended up with exactly the same character (opening a character brings its custom item copies up to
				// date on every device, so each one "changes" it the same way). Nothing differs, so nothing is copied or downloaded.
				library.markInSync(id, { driveId: file.id, version: file.version, updatedAt: stamp });
			} else if (!entry.dirty) {
				adopt(id, content, file);
			} else if (!entry.ready) {
				// Being edited here and changed on another device: leave it alone until the user finalizes, then resolve.
			} else if (stamp > entry.updatedAt) {
				// Edited here and on another device since the last sync: the newer version wins. Nothing is kept as a copy; there is only ever one
				// character per id.
				adopt(id, content, file);
			} else {
				await upload(id, entry, file);
			}
		}

		// 3. Characters the listing did not show
		for (const entry of library.list()) {
			if (remote.has(entry.id)) continue;
			if (entry.driveId && await drive.fileExists(entry.driveId)) {
				// Still in Drive; the listing just had not caught up. Never treat that as a delete.
				if (canPush(entry)) await upload(entry.id, entry, { id: entry.driveId });
				continue;
			}
			if (entry.driveId && !entry.dirty) {
				// It was synced before and its file is really gone: it was deleted on another device.
				if (library.getIndex().activeId === entry.id) {
					library.unlink(entry.id); // keep the open one; it uploads again
				} else {
					library.deleteRecord(entry.id);
					library.clearDeleted(entry.id);
				}
			}
			const current = library.getIndex().entries[entry.id];
			if (current && canPush(current)) await upload(entry.id, { ...current, driveId: undefined }, null);
		}
		return {};
	}

	const engine = {
		subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },
		getState: () => state,
		isConnected,

		// Call once when the app starts: reconnect if the user signed in before and the sign-in is still valid. When it has expired
		// nothing is opened (Google's sign-in window can only come from a click): the sync window offers a "Sign in with Google" button.
		async init() {
			if (!isConnected()) return set({ status: 'off' });
			drive.preloadGoogle().catch(() => {});
			const lastSyncAt = Number(getFlag(LAST_SYNC_KEY)) || undefined;
			if (drive.currentToken()) { set({ status: 'idle', lastSyncAt }); return engine.syncNow(); }
			return set({ status: 'needsAuth', lastSyncAt, error: undefined });
		},

		// From a click: sign in with Google (the only step the user does) and start syncing.
		async connect() {
			set({ error: undefined });
			try {
				await drive.signIn();
			} catch (e) {
				return set({ status: isConnected() ? 'needsAuth' : 'off', error: e.message });
			}
			setFlag(CONNECTED_KEY, '1');
			set({ status: 'idle' });
			return engine.syncNow();
		},

		// Schedules a sync a moment from now (batches a burst of triggers into one).
		scheduleSync() {
			if (!isConnected()) return;
			clearTimeout(timer);
			timer = setTimeout(() => engine.syncIfReady(), delay);
		},

		// Changes on the interactive sheet sync after a quiet period: every further change restarts the countdown.
		scheduleSheetSync() {
			if (!isConnected()) return;
			clearTimeout(sheetTimer);
			sheetTimer = setTimeout(() => engine.syncIfReady(), sheetDelay);
		},

		// Sync now if signed in. If the sign-in has expired, just say so: Google's sign-in window is only ever opened by a click on
		// the sign-in button in the sync window (connect), never by the app on its own.
		async syncIfReady() {
			if (!isConnected()) return;
			if (drive.currentToken()) return engine.syncNow();
			if (state.status !== 'needsAuth') set({ status: 'needsAuth' });
		},

		async syncNow() {
			if (!isConnected()) return set({ status: 'off' });
			if (running) { rerun = true; return; }
			if (!drive.currentToken()) return set({ status: 'needsAuth' });
			running = true;
			set({ status: 'syncing', error: undefined });
			try {
				await pass();
				const lastSyncAt = now();
				setFlag(LAST_SYNC_KEY, String(lastSyncAt));
				set({ status: 'idle', lastSyncAt });
			} catch (e) {
				if (e instanceof drive.AuthError) set({ status: 'needsAuth' });
				else set({ status: 'error', error: e.message });
			} finally {
				running = false;
				if (rerun) { rerun = false; engine.scheduleSync(); }
			}
		},

		// Stop syncing on this device. Characters stay here and in Google Drive.
		disconnect() {
			clearTimeout(timer);
			clearTimeout(sheetTimer);
			setFlag(CONNECTED_KEY, null);
			drive.clearToken();
			set({ status: 'off', error: undefined, lastSyncAt: undefined });
		},
	};

	// Editing in the builder never syncs. Reaching Finalize does, so does deleting a character that is in Drive, and so
	// do changes made on the interactive sheet (after a quiet period).
	// A change to the custom items (made, edited, deleted, or brought in by a character) syncs soon after.
	if (items) items.subscribe(() => engine.scheduleSync());
	library.subscribe((event, id) => {
		if (event === 'finalize') engine.scheduleSync();
		else if (event === 'sheet') engine.scheduleSheetSync();
		else if (event === 'local' && library.getIndex().deleted.some((d) => d.id === id)) engine.scheduleSync();
	});
	return engine;
}
