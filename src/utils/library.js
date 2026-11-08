// The characters saved on this device. Each one is a record { character, play, playBase } in its own
// localStorage key, plus a small index with what sync needs to know about it:
//   entries[id] = { id, name, summary, updatedAt, dirty, driveId, syncedVersion }
//   deleted     = characters removed here whose Drive copy still needs deleting
//   activeId    = the character open in the builder / sheet
// `play` is the interactive sheet's in-play state (HP, spent slots...). `playBase` is the JSON of the
// character that `play` was recorded against; if the build has changed since, the sheet starts fresh.
//
// Built as a factory so the sync logic can be tested against an in-memory storage.

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
	const summary = [race, cls ? `${cls} ${character.classInfo.level || 1}` : ''].filter(Boolean).join(' · ');
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
			index.entries[id] = { id, ...describe(legacy.character), updatedAt: now(), dirty: true };
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
		index.entries[id] = { ...(index.entries[id] || {}), id, ...describe(next.character), updatedAt: now(), dirty: true };
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
		index.entries[id] = { id, ...describe(record.character), updatedAt: updatedAt || now(), dirty: false, driveId, syncedVersion };
		putIndex(index);
		emit('remote', id);
	}

	// Records that an upload went through. The character stays marked changed if it was edited meanwhile.
	function markSynced(id, { driveId, version: syncedVersion, updatedAt }) {
		const index = getIndex();
		const entry = index.entries[id];
		if (!entry) return;
		index.entries[id] = { ...entry, driveId, syncedVersion, dirty: entry.updatedAt === updatedAt ? false : entry.dirty };
		putIndex(index);
		emit('meta', id);
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
		index.entries[id] = { ...entry, driveId: undefined, syncedVersion: undefined, dirty: true };
		putIndex(index);
		emit('meta', id);
	}

	return {
		getIndex, list, getRecord, saveRecord, createRecord, setActive, deleteRecord, adoptRemote, markSynced, clearDeleted, unlink,
		subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
		getVersion: () => version,
		getActiveId: () => getIndex().activeId,
	};
}

const library = createLibrary(() => window.localStorage);
export default library;
