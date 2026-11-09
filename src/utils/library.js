// The characters saved on this device. Each one is a record { character, play, playBase } in its own
// localStorage key, plus a small index with what sync needs to know about it:
//   entries[id] = { id, name, summary, updatedAt, dirty, finalized, ready, driveId, syncedVersion, syncedUpdatedAt }
//   finalized: the user has reached the Finalize step at least once (otherwise it is a draft that never syncs).
//   ready: they reached Finalize since the last edit. A character only uploads to Drive when it is ready, so
//   syncing happens when the user finalizes, and again only after more edits followed by another Finalize. syncedUpdatedAt: the updatedAt of the content last uploaded/downloaded, so a
//   stale file listing from Drive is not mistaken for a change made on another device.
//   deleted     = characters removed here whose Drive copy still needs deleting
//   activeId    = the character open in the builder / sheet
// `play` is the interactive sheet's in-play state (HP, spent slots...). `playBase` is the JSON of the
// character that `play` was recorded against; if the build has changed since, the sheet starts fresh.
//
// Built as a factory so the sync logic can be tested against an in-memory storage.

import { getClassSummary } from './multiclass';

const INDEX_KEY = 'dndBuilder.library.v2';
const RECORD_PREFIX = 'dndBuilder.char.';
const LEGACY_KEY = 'dndBuilder.sheet.v1'; // the old single-character slot

export const newId = () => {
	const bytes = new Uint8Array(8);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

export const isMeaningful = (character) => !!(character && (character.info?.name?.trim() || character.classInfo?.className || character.race?.name));

const describe = (character) => {
	const name = character?.info?.name?.trim() || 'Unnamed character';
	const race = character?.race?.subrace || character?.race?.name;
	const cls = character?.classInfo?.className;
	const summary = [race, cls ? (getClassSummary(character) || `${cls} ${character.classInfo.level || 1}`) : ''].filter(Boolean).join(' · ');
	return { name, summary };
};

export function createLibrary(getStorage, now = Date.now) {
	const listeners = new Set();
	let version = 0;

	const storage = () => { try { return getStorage(); } catch (e) { return null; } };
	const read = (key) => { try { const raw = storage()?.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } };
	const write = (key, value) => { try { storage()?.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; } };
	const erase = (key) => { try { storage()?.removeItem(key); } catch (e) { /* ignore */ } };

	const emit = (event, id) => { version += 1; listeners.forEach((l) => l(event, id)); };

	function getIndex() {
		let index = read(INDEX_KEY);
		if (index) return { activeId: null, entries: {}, deleted: [], ...index };
		index = { activeId: null, entries: {}, deleted: [] };
		// First run on this version: adopt the character the old single slot held, if any.
		const legacy = read(LEGACY_KEY);
		if (legacy?.character && isMeaningful(legacy.character)) {
			const id = newId();
			write(RECORD_PREFIX + id, { character: legacy.character, play: legacy.play, playBase: legacy.play ? JSON.stringify(legacy.character) : undefined });
			index.entries[id] = { id, ...describe(legacy.character), updatedAt: now(), dirty: true, finalized: true, ready: true }; // it came from the sheet
			index.activeId = id;
		}
		write(INDEX_KEY, index);
		return index;
	}
	const putIndex = (index) => write(INDEX_KEY, index);

	const getRecord = (id) => (id ? read(RECORD_PREFIX + id) : null);

	// Characters on this device, most recently changed first.
	const list = () => Object.values(getIndex().entries).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

	// Merges a patch ({ character?, play?, playBase? }) into the record. Does nothing (and does not mark the
	// character as changed) when the result is identical, so loading a character never causes a sync.
	function saveRecord(id, patch) {
		const prev = getRecord(id) || {};
		const next = { ...prev, ...patch };
		if (JSON.stringify(next) === JSON.stringify(prev)) return false;
		write(RECORD_PREFIX + id, next);
		const index = getIndex();
		index.entries[id] = { ...(index.entries[id] || {}), id, ...describe(next.character), updatedAt: now(), dirty: true, ready: false };
		putIndex(index);
		emit('local', id);
		return true;
	}

	function createRecord(record, id = newId()) {
		saveRecord(id, record);
		return id;
	}

	function setActive(id) {
		const index = getIndex();
		if (index.activeId === id) return;
		index.activeId = id;
		putIndex(index);
		emit('meta', id);
	}

	// Removes a character from this device; if it had been synced, its Drive copy is deleted on the next sync.
	function deleteRecord(id) {
		const index = getIndex();
		const entry = index.entries[id];
		delete index.entries[id];
		if (entry?.driveId) index.deleted = [...index.deleted.filter((d) => d.id !== id), { id, driveId: entry.driveId }];
		if (index.activeId === id) index.activeId = null;
		putIndex(index);
		erase(RECORD_PREFIX + id);
		emit('local', id);
	}

	// A character that arrived from Drive: stored as already synced.
	function adoptRemote(id, record, { driveId, version: syncedVersion, updatedAt }) {
		write(RECORD_PREFIX + id, record);
		const index = getIndex();
		index.entries[id] = { id, ...describe(record.character), updatedAt: updatedAt || now(), dirty: false, finalized: true, ready: false, driveId, syncedVersion: syncedVersion, syncedUpdatedAt: updatedAt || now() };
		putIndex(index);
		emit('remote', id);
	}

	// Records that an upload went through. The character stays marked changed if it was edited meanwhile.
	function markSynced(id, { driveId, version: syncedVersion, updatedAt }) {
		const index = getIndex();
		const entry = index.entries[id];
		if (!entry) return;
		index.entries[id] = { ...entry, driveId, syncedVersion, syncedUpdatedAt: updatedAt, dirty: entry.updatedAt === updatedAt ? false : entry.dirty };
		putIndex(index);
		emit('meta', id);
	}

	// The user reached the Finalize step: the character is now ready to upload to Drive. Emits 'finalize', which
	// is what starts a sync.
	function markFinalized(id) {
		const index = getIndex();
		const entry = index.entries[id];
		if (!entry || (entry.finalized && entry.ready)) return;
		index.entries[id] = { ...entry, finalized: true, ready: true };
		putIndex(index);
		emit('finalize', id);
	}

	// A change made on the interactive sheet (HP, spell slots, inventory, notes, prepared spells...). The sheet is only
	// reachable from a finished character, so this keeps it ready to upload; the engine syncs it after a short quiet
	// period (the 'sheet' event) instead of waiting for another visit to Finalize.
	function saveFromSheet(id, patch) {
		if (!saveRecord(id, patch)) return false;
		const index = getIndex();
		const entry = index.entries[id];
		if (!entry) return false;
		index.entries[id] = { ...entry, finalized: true, ready: true };
		putIndex(index);
		emit('sheet', id);
		return true;
	}

	// Notes the Drive file version we are looking at without touching the changed flag.
	function setSyncedVersion(id, driveId, syncedVersion) {
		const index = getIndex();
		const entry = index.entries[id];
		if (!entry) return;
		index.entries[id] = { ...entry, driveId, syncedVersion };
		putIndex(index);
	}

	function clearDeleted(id) {
		const index = getIndex();
		index.deleted = index.deleted.filter((d) => d.id !== id);
		putIndex(index);
	}

	// Forget the Drive link (the file is gone from Drive); the character stays and will be uploaded again.
	function unlink(id) {
		const index = getIndex();
		const entry = index.entries[id];
		if (!entry) return;
		index.entries[id] = { ...entry, driveId: undefined, syncedVersion: undefined, syncedUpdatedAt: undefined, dirty: true, ready: true };
		putIndex(index);
		emit('meta', id);
	}

	return {
		getIndex, list, getRecord, saveRecord, createRecord, setActive, deleteRecord, adoptRemote, markSynced, markFinalized, saveFromSheet, setSyncedVersion, clearDeleted, unlink,
		subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
		getVersion: () => version,
		getActiveId: () => getIndex().activeId,
	};
}

const library = createLibrary(() => window.localStorage);
export default library;
