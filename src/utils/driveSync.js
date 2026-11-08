// Keeps the characters in the local library in sync with the user's Google Drive, like the budget app does:
// sign in with Google once and it stays connected. Changes upload a few seconds after you stop editing, and
// characters saved on another device show up here. There is no passphrase and no manual save.
//
// Each sync pass compares every character with its file in Drive using the file's version number:
//   - only this device changed it  -> upload
//   - only Drive changed it        -> download
//   - both changed it              -> keep the newer one; the older one is saved as a separate copy so
//                                     nothing is lost
//   - new on either side           -> copied across
//   - deleted on this device       -> its Drive file is deleted; deleted on another device -> removed here
// Built as a factory so it can be tested with an in-memory Drive and library.

const CONNECTED_KEY = 'dndBuilder.drive.connected';
const LAST_SYNC_KEY = 'dndBuilder.drive.lastSync';
const SYNC_DELAY_MS = 3000;

export function createSyncEngine({ library, drive, getStorage = () => window.localStorage, now = Date.now, delay = SYNC_DELAY_MS }) {
	let state = { status: 'off' };
	const listeners = new Set();
	let running = false;
	let rerun = false;
	let timer = null;

	const store = () => { try { return getStorage(); } catch (e) { return null; } };
	const getFlag = (key) => { try { return store()?.getItem(key); } catch (e) { return null; } };
	const setFlag = (key, value) => { try { if (value === null) store()?.removeItem(key); else store()?.setItem(key, value); } catch (e) { /* ignore */ } };
	const isConnected = () => getFlag(CONNECTED_KEY) === '1';

	const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };

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

	// The character is kept twice when both devices changed it; this saves the losing copy as its own character.
	function keepAsCopy(character, play, playBase, label) {
		const copy = { ...character, info: { ...character.info, name: `${character.info?.name?.trim() || 'Unnamed character'} (${label})` } };
		library.createRecord({ character: copy, ...(play ? { play, playBase: JSON.stringify(copy) } : {}) });
	}

	async function pass() {
		let conflicts = 0;

		// 1. Characters deleted on this device
		let files = await drive.listFiles();
		const tombstones = library.getIndex().deleted;
		for (const gone of tombstones) {
			if (files.some((f) => f.id === gone.driveId)) await drive.deleteFile(gone.driveId);
			library.clearDeleted(gone.id);
		}
		files = files.filter((f) => !tombstones.some((d) => d.driveId === f.id));

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
			const remoteChanged = file.id !== entry.driveId || file.version !== entry.syncedVersion;
			if (!remoteChanged) {
				if (entry.dirty) await upload(id, entry, file);
			} else if (!entry.dirty) {
				adopt(id, await download(file), file);
			} else {
				// Edited here and on another device since the last sync
				const content = await download(file);
				const remoteNewer = (content.updatedAt || Date.parse(file.modifiedTime) || 0) > entry.updatedAt;
				const local = library.getRecord(id);
				conflicts += 1;
				if (remoteNewer) {
					keepAsCopy(local.character, local.play, local.playBase, 'this device');
					adopt(id, content, file);
				} else {
					keepAsCopy(content.character, content.play, content.playBase, 'other device');
					await upload(id, entry, file);
				}
			}
		}

		// 3. Characters only this device has
		for (const entry of library.list()) {
			if (remote.has(entry.id)) continue;
			if (entry.driveId && !entry.dirty) {
				// It was synced before and its file is gone: it was deleted on another device.
				if (library.getIndex().activeId === entry.id) {
					library.unlink(entry.id); // keep the open one; it uploads again
				} else {
					library.deleteRecord(entry.id);
					library.clearDeleted(entry.id);
				}
			}
			const current = library.getIndex().entries[entry.id];
			if (current && (!current.driveId || current.dirty)) await upload(entry.id, { ...current, driveId: undefined }, null);
		}
		return { conflicts };
	}

	const engine = {
		subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },
		getState: () => state,
		isConnected,

		// Call once when the app starts: reconnect quietly if the user signed in before.
		async init() {
			if (!isConnected()) return set({ status: 'off' });
			drive.preloadGoogle().catch(() => {});
			const lastSyncAt = Number(getFlag(LAST_SYNC_KEY)) || undefined;
			if (drive.currentToken()) { set({ status: 'idle', lastSyncAt }); return engine.syncNow(); }
			set({ status: 'syncing', lastSyncAt });
			try {
				await drive.silentSignIn();
				return engine.syncNow();
			} catch (e) {
				return set({ status: 'needsAuth', error: undefined });
			}
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

		// Call whenever the library changes locally.
		notifyLocalChange() {
			if (!isConnected()) return;
			clearTimeout(timer);
			timer = setTimeout(() => engine.syncIfReady(), delay);
		},

		// Sync now if signed in, or try to renew the sign-in quietly (no popup). Used on startup and when the tab regains focus.
		async syncIfReady({ retry = false } = {}) {
			if (!isConnected()) return;
			if (state.status === 'needsAuth' && !retry && !drive.currentToken()) return; // already asked; wait for a click or a refocus
			if (drive.currentToken()) return engine.syncNow();
			if (running) return;
			try {
				await drive.silentSignIn();
				return engine.syncNow();
			} catch (e) {
				return set({ status: 'needsAuth' });
			}
		},

		async syncNow() {
			if (!isConnected()) return set({ status: 'off' });
			if (running) { rerun = true; return; }
			if (!drive.currentToken()) return set({ status: 'needsAuth' });
			running = true;
			set({ status: 'syncing', error: undefined });
			try {
				const { conflicts } = await pass();
				const lastSyncAt = now();
				setFlag(LAST_SYNC_KEY, String(lastSyncAt));
				set({ status: 'idle', lastSyncAt, lastConflicts: conflicts || undefined });
			} catch (e) {
				if (e instanceof drive.AuthError) set({ status: 'needsAuth' });
				else set({ status: 'error', error: e.message });
			} finally {
				running = false;
				if (rerun) { rerun = false; engine.notifyLocalChange(); }
			}
		},

		// Stop syncing on this device. Characters stay here and in Google Drive.
		disconnect() {
			clearTimeout(timer);
			setFlag(CONNECTED_KEY, null);
			drive.clearToken();
			set({ status: 'off', error: undefined, lastSyncAt: undefined, lastConflicts: undefined });
		},
	};

	library.subscribe((event) => { if (event === 'local') engine.notifyLocalChange(); });
	return engine;
}
