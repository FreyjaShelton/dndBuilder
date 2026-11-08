import { getEditionData } from '../../data';

let nextId = 0;
export const newItemId = () => `i${Date.now().toString(36)}${(nextId++).toString(36)}`;

// Every item the builder knows about (weapons, armor and gear), de-duplicated by name.
export function getCatalog(edition) {
	const { weapons, armor, gear } = getEditionData(edition).equipment;
	const seen = new Map();
	[...weapons, ...armor, ...gear].forEach((i) => {
		if (!seen.has(i.name)) seen.set(i.name, { name: i.name, weight: Number(i.weight) || 0 });
	});
	return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// The starting inventory: whatever was picked on the builder's Equipment step.
export function seedItems(character) {
	const { weapons, armor, gear } = getEditionData(character.edition).equipment;
	const { equipment } = character;
	const items = [];
	const add = (name, weight, note) => items.push({ id: newItemId(), name, qty: 1, weight: Number(weight) || 0, ...(note ? { note } : {}) });
	if (equipment.armor) add(equipment.armor, armor.find((x) => x.name === equipment.armor)?.weight, 'worn');
	if (equipment.shield) {
		const shield = armor.find((x) => x.type === 'Shield');
		add(shield ? shield.name : 'Shield', shield?.weight, 'equipped');
	}
	(equipment.weapons || []).forEach((n) => add(n, weapons.find((w) => w.name === n)?.weight));
	(equipment.gear || []).forEach((n) => add(n, gear.find((g) => g.name === n)?.weight));
	return items;
}
