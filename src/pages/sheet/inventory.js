import { getItemIndex, getOwnedItems, getWornArmorName, hasShield } from '../../utils/equipment';

let nextId = 0;
export const newItemId = () => `i${Date.now().toString(36)}${(nextId++).toString(36)}`;

// Every item the builder knows about (weapons, armor and gear), de-duplicated by name.
export function getCatalog(edition) {
	const seen = new Map();
	getItemIndex(edition).all.forEach((i) => {
		if (!seen.has(i.name)) seen.set(i.name, { name: i.name, weight: Number(i.weight) || 0 });
	});
	return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// The starting inventory: whatever was picked on the builder's Equipment step.
export function seedItems(character) {
	const worn = getWornArmorName(character);
	const shield = hasShield(character);
	return getOwnedItems(character).map((item) => {
		const note = item.name === worn ? 'worn' : item.type === 'Shield' && shield ? 'equipped' : '';
		return { id: newItemId(), name: item.name, qty: item.quantity, weight: Number(item.weight) || 0, ...(note ? { note } : {}) };
	});
}
