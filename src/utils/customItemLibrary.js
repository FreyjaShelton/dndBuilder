// Custom items you made (2014), shared by every character on this device and synced through Google Drive.
//
// The library is where items are created, edited and deleted. A character that carries one keeps its own copy in
// character.equipment.customGear (with the item's `libId` and `updatedAt`), so the sheet, the PDF and the character's own
// Drive file keep working with nothing but the character. Things that keep the copies and the library together:
//   - a copy older than the library's item is refreshed when the character is opened (reconcile),
//   - an item a character carries that the library lacks (a character that came from another device, or one made before the
//     library existed) is added to the library, unless that item was deleted here,
//   - the library as a whole is one file in Google Drive (see driveSync.js), merged item by item with merge().
// Deleting an item removes it from the library and leaves a dated marker (`deleted[id]`), so the deletion reaches the other devices;
// characters that already carry the item keep their copy.
//
// Built as a factory so it can be tested against an in-memory storage.
import { getCustomGear, saveCustomItem } from './equipment';
import { newId } from './library';
import { CUSTOM_ITEM_PRESETS } from '../data/2014/customItemPresets';

const KEY = 'dndBuilder.customItems.v1';

export function createCustomItemLibrary(getStorage, now = Date.now) {
	const listeners = new Set();
	let version = 0;
	const storage = () => { try { return getStorage(); } catch (e) { return null; } };
	const normalize = (raw) => {
		const s = raw && typeof raw === 'object' ? raw : {};
		// older saves kept deleted ids as a list; now each deletion is dated
		const deleted = Array.isArray(s.deleted) ? Object.fromEntries(s.deleted.map((id) => [id, 1])) : { ...(s.deleted || {}) };
		return { items: Array.isArray(s.items) ? s.items : [], deleted };
	};
	const read = () => { try { const raw = storage()?.getItem(KEY); return normalize(raw ? JSON.parse(raw) : null); } catch (e) { return normalize(null); } };
	const write = (state) => { try { storage()?.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable: the library just won't persist */ } };
	const emit = () => { version += 1; listeners.forEach((l) => l()); };

	const list = () => read().items.slice().sort((a, b) => a.name.localeCompare(b.name));
	const get = (id) => read().items.find((i) => i.libId === id) || null;

	// Adds or updates an item; returns it as stored (with its libId and a new updatedAt).
	function save(item) {
		const state = read();
		const stored = { ...item, libId: item.libId || newId(), updatedAt: now() };
		const exists = state.items.some((i) => i.libId === stored.libId);
		const deleted = { ...state.deleted };
		delete deleted[stored.libId];
		write({ items: exists ? state.items.map((i) => (i.libId === stored.libId ? stored : i)) : [...state.items, stored], deleted });
		emit();
		return stored;
	}

	function remove(id) {
		const state = read();
		write({ items: state.items.filter((i) => i.libId !== id), deleted: { ...state.deleted, [id]: now() } });
		emit();
	}

	// Adds an item a character carried in, unless it is already here or was deleted. Returns whether it was added.
	function adopt(item) {
		const state = read();
		if (state.items.some((i) => i.libId === item.libId) || state.deleted[item.libId]) return false;
		write({ ...state, items: [...state.items, item] });
		emit();
		return true;
	}

	// Makes ready-made items (the two in data/2014/customItemPresets.js) part of the library the first time they are not there.
	// They get fixed ids and the oldest possible date, so every device seeds the same item and any edit beats the original.
	function seed(presets) {
		const state = read();
		const missing = presets.filter((p) => {
			const id = `preset-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
			return !state.items.some((i) => i.libId === id) && !state.deleted[id];
		});
		if (!missing.length) return;
		write({
			...state,
			items: [...state.items, ...missing.map((p) => ({ ...JSON.parse(JSON.stringify(p)), homebrew: true, libId: `preset-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, updatedAt: 1 }))],
		});
		emit();
	}

	// ---- Google Drive -----------------------------------------------------------------------------------------------------

	const canon = (state) => JSON.stringify({ items: state.items.slice().sort((a, b) => a.libId.localeCompare(b.libId)), deleted: Object.fromEntries(Object.entries(state.deleted).sort()) });

	// What Drive's copy of the library should hold: { items, deleted }.
	const snapshot = () => read();

	// Merges what Drive has (null when it has no file yet) into the library, item by item: the more recently changed one wins, and a
	// deletion beats an item that has not been changed since. Returns { snapshot, changedRemote }: the merged library, and whether
	// Drive's copy needs to be rewritten.
	function merge(remote) {
		const local = read();
		const theirs = normalize(remote);
		const deleted = { ...local.deleted };
		Object.entries(theirs.deleted).forEach(([id, at]) => { deleted[id] = Math.max(deleted[id] || 0, at); });
		const byId = new Map();
		[...local.items, ...theirs.items].forEach((item) => {
			const have = byId.get(item.libId);
			if (!have || (item.updatedAt || 0) > (have.updatedAt || 0)) byId.set(item.libId, item);
		});
		const items = [...byId.values()].filter((i) => !(deleted[i.libId] && deleted[i.libId] >= (i.updatedAt || 0)));
		const merged = { items, deleted };
		if (canon(merged) !== canon(local)) { write(merged); emit(); }
		return { snapshot: merged, changedRemote: !remote || canon(merged) !== canon(theirs) };
	}

	// Brings a character's copies of custom items in line with the library (see the top of this file).
	// Returns the same object when nothing needs to change.
	function reconcile(character) {
		const gear = getCustomGear(character);
		if (!gear.length) return character;
		let eq = character.equipment;
		let changed = false;
		const state = read();
		gear.forEach((copy) => {
			if (!copy.libId) {
				// made before the library existed: it becomes a library item. Its id comes from its name, so loading the same
				// character twice (or on two devices) gives it the same id instead of adding it again.
				const stamped = { ...copy, libId: `legacy-${String(copy.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, updatedAt: now() };
				adopt(stamped);
				eq = { ...eq, customGear: eq.customGear.map((i) => (i === copy ? stamped : i)) };
				changed = true;
				return;
			}
			const lib = state.items.find((i) => i.libId === copy.libId);
			if (!lib) { adopt(copy); return; }
			if ((lib.updatedAt || 0) > (copy.updatedAt || 0)) {
				eq = { ...eq, ...saveCustomItem(eq, lib, copy.name) };
				changed = true;
			}
		});
		return changed ? { ...character, equipment: eq } : character;
	}

	return {
		list, get, save, remove, adopt, seed, merge, snapshot, reconcile,
		names: () => read().items.map((i) => i.name),
		subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },
		getVersion: () => version,
	};
}

const customItemLibrary = createCustomItemLibrary(() => window.localStorage);
customItemLibrary.seed(CUSTOM_ITEM_PRESETS); // Heart of the Storm and Blessing of the Tempest start out in the list
export default customItemLibrary;
