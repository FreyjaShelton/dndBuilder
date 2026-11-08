import { getEditionData } from '../data';

const indexes = {};

// Every shoppable item of an edition (weapons, armor, then gear), with a lookup by name.
export function getItemIndex(edition) {
	if (!indexes[edition]) {
		const { weapons, armor, gear } = getEditionData(edition).equipment;
		const all = [...weapons, ...armor, ...gear];
		const groups = [];
		all.forEach((i) => { if (!groups.includes(i.group)) groups.push(i.group); });
		indexes[edition] = { all, groups, byName: new Map(all.map((i) => [i.name, i])) };
	}
	return indexes[edition];
}

export const getItem = (edition, name) => getItemIndex(edition).byName.get(name);
