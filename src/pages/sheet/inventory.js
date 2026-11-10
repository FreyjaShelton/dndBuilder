import { getCharacterItem, getCustomGear, getItemIndex, getOwnedItems, getWeaponNames, getWornArmorName, hasShield } from '../../utils/equipment';
import { getPackContents } from '../../utils/itemIndex';

let nextId = 0;
export const newItemId = () => `i${Date.now().toString(36)}${(nextId++).toString(36)}`;

// Every item the builder knows about (weapons, armor and gear) plus the character's own custom items, de-duplicated by name.
export function getCatalog(character) {
	const seen = new Map();
	[...getItemIndex(character.edition).all, ...getCustomGear(character)].forEach((i) => {
		if (!seen.has(i.name)) seen.set(i.name, { name: i.name, weight: Number(i.weight) || 0 });
	});
	return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// Equipping armor, shields and weapons on the sheet is a 2014 feature for now.
export const usesEquipping = (character) => character.edition === '2014';

// What an item can be equipped as: 'armor' (body armor, one at a time), 'shield' (one at a time), 'weapon', or null.
export function getEquipKind(character, name) {
	const item = getCharacterItem(character, name);
	if (!item) return null;
	if (item.type === 'Shield') return 'shield';
	if (item.group === 'Armor') return 'armor';
	if (item.group === 'Weapons') return 'weapon';
	return null;
}

// The starting inventory: whatever was picked on the builder's Equipment step. In 2014 the armor, shield and
// weapons chosen there start out equipped.
export function seedItems(character) {
	const worn = getWornArmorName(character);
	const shield = hasShield(character);
	const equipping = usesEquipping(character);
	let shieldGiven = false;
	return getOwnedItems(character).map((item, index) => {
		const base = { id: `seed${index}`, name: item.name, qty: item.quantity, weight: Number(item.weight) || 0 };
		if (equipping) {
			const kind = getEquipKind(character, item.name);
			if (!kind) return base;
			let equipped = false;
			if (kind === 'armor') equipped = item.name === worn;
			else if (kind === 'shield') { equipped = shield && !shieldGiven; if (equipped) shieldGiven = true; } else equipped = true;
			return { ...base, equipped };
		}
		const note = item.name === worn ? 'worn' : item.type === 'Shield' && shield ? 'equipped' : '';
		return { ...base, ...(note ? { note } : {}) };
	});
}

// Sheets saved before equipping existed have items without an `equipped` flag: give them one from what the builder
// had selected, so nothing about AC or attacks changes until the player equips something differently.
export function withEquipFlags(character, items) {
	if (!usesEquipping(character) || !Array.isArray(items)) return items;
	if (items.some((i) => 'equipped' in i)) return items;
	const worn = getWornArmorName(character);
	const shield = hasShield(character);
	const weapons = new Set(getWeaponNames(character));
	let shieldGiven = false;
	return items.map((item) => {
		const kind = getEquipKind(character, item.name);
		if (!kind) return item;
		// the old "worn" / "equipped" notes are replaced by the flag (they would go stale when something is unequipped)
		const { note, ...i } = item;
		const keepNote = note && note !== 'worn' && note !== 'equipped';
		let equipped = false;
		if (kind === 'armor') equipped = i.name === worn;
		else if (kind === 'shield') { equipped = shield && !shieldGiven; if (equipped) shieldGiven = true; } else equipped = weapons.has(i.name);
		return { ...i, ...(keepNote ? { note } : {}), equipped };
	});
}

// Breaks a pack (Explorer's Pack...) into the items inside it: one pack comes out, and each item is added, joining a
// row of the same item that is already there.
export function unpackItem(character, items, id) {
	const pack = items.find((i) => i.id === id);
	const contents = pack && getPackContents(character.edition, pack.name);
	if (!contents) return items;
	let next = items.flatMap((i) => {
		if (i.id !== id) return [i];
		return Number(i.qty) > 1 ? [{ ...i, qty: Number(i.qty) - 1 }] : [];
	});
	contents.forEach((c) => {
		const data = getCharacterItem(character, c.name);
		const existing = next.find((i) => i.name === c.name && !i.note && !i.custom);
		if (existing) next = next.map((i) => (i === existing ? { ...i, qty: (Number(i.qty) || 0) + c.quantity } : i));
		else next = [...next, { id: newItemId(), name: c.name, qty: c.quantity, weight: Number(data?.weight) || 0 }];
	});
	return next;
}

// What the inventory has equipped: { armor: name | '', shield: bool, weapons: [names] }. Items with none left don't count.
export function getEquipped(character, items) {
	const result = { armor: '', shield: false, weapons: [] };
	(items || []).forEach((i) => {
		if (!i.equipped || !(Number(i.qty) > 0)) return;
		const kind = getEquipKind(character, i.name);
		if (kind === 'armor' && !result.armor) result.armor = i.name;
		else if (kind === 'shield') result.shield = true;
		else if (kind === 'weapon' && !result.weapons.includes(i.name)) result.weapons.push(i.name);
	});
	return result;
}

// Equips or unequips one item. Only one body armor and one shield can be equipped at a time, so equipping one
// takes the other off.
export function toggleEquipped(character, items, id) {
	const target = items.find((i) => i.id === id);
	const kind = target && getEquipKind(character, target.name);
	if (!kind) return items;
	const on = !target.equipped;
	return items.map((i) => {
		if (i.id === id) return { ...i, equipped: on };
		if (on && (kind === 'armor' || kind === 'shield') && getEquipKind(character, i.name) === kind && i.equipped) return { ...i, equipped: false };
		return i;
	});
}
