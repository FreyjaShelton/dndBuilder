import { getEditionData } from '../data';

const indexes = {};

// Every shoppable item of an edition (weapons, armor, then gear), with a lookup by name.
export function getItemIndex(edition) {
	if (!indexes[edition]) {
		const { weapons, armor, gear, packExtras = [] } = getEditionData(edition).equipment;
		const all = [...weapons, ...armor, ...gear];
		const groups = [];
		all.forEach((i) => { if (!groups.includes(i.group)) groups.push(i.group); });
		// items that only exist inside a pack can be looked up by name but are not for sale (they are not in `all`)
		indexes[edition] = { all, groups, byName: new Map([...all, ...packExtras].map((i) => [i.name, i])) };
	}
	return indexes[edition];
}

export const getItem = (edition, name) => getItemIndex(edition).byName.get(name);

// What a pack (Explorer's Pack, Dungeoneer's Pack...) contains: [{ name, quantity }], or null when the item is not a pack
// (or the edition has no pack data; only 2014 does).
export const getPackContents = (edition, name) => getEditionData(edition).equipment.packs?.[name] || null;

// One line describing a pack's contents, for the kit choices: "Backpack, Bedroll, Torch ×10, ...".
export function describePack(edition, name) {
	const contents = getPackContents(edition, name);
	return contents ? contents.map((c) => (c.quantity > 1 ? `${c.name} ×${c.quantity}` : c.name)).join(', ') : '';
}
