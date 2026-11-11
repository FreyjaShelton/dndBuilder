// One custom item as a file, to share it or move it to another device: { format, version, item }.
// The item is saved without the device's own bookkeeping (libId, updatedAt): an imported item becomes a new item in the library.
// The Custom items card (pages/equipment/CustomItems.js) cleans what it reads the same way it cleans what the editor saves.

export const ITEM_FILE_FORMAT = 'dndBuilder-custom-item';
const VERSION = 1;

// The file's text for an item.
export function itemToFile(item) {
	const { libId, updatedAt, ...rest } = item;
	return JSON.stringify({ format: ITEM_FILE_FORMAT, version: VERSION, item: rest }, null, 2);
}

// A file name for an item: "Heart-of-the-Storm.item.json".
export const itemFileName = (item) => `${String(item.name || 'custom-item').trim().replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '') || 'custom-item'}.item.json`;

// The item in a file's text, or throws with a message for the player. A bare item object (no wrapper) is accepted too.
export function itemFromFile(text) {
	let data;
	try { data = JSON.parse(text); } catch (e) { throw new Error('That file is not a dndBuilder custom item (it is not JSON).'); }
	if (data && data.character && data.character.classInfo) throw new Error('That file is a character. Import it from the interactive sheet instead.');
	const item = data && data.format === ITEM_FILE_FORMAT ? data.item : data;
	if (!item || typeof item !== 'object' || Array.isArray(item) || typeof item.name !== 'string' || !item.name.trim() || typeof item.group !== 'string') {
		throw new Error('That file is not a dndBuilder custom item.');
	}
	const { libId, updatedAt, ...rest } = item;
	return rest;
}

// Saves text as a downloaded file.
export function downloadText(text, fileName) {
	const blob = new Blob([text], { type: 'application/json' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = fileName;
	a.click();
	URL.revokeObjectURL(a.href);
}
