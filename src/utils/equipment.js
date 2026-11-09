import { getEditionData } from '../data';
import { parseCostToGold } from './currency';
import { getItem, getItemIndex } from './itemIndex';
import { getKitGold, getKitItems } from './startingKit';

// character.equipment = {
//   selected: [{ name, group, quantity }],   items bought or added by hand
//   armor: '',  shield: false,                the worn armor (any owned armor) and whether a shield is carried
//   goldMethod: '' | 'average' | 'roll' | 'kit',  how starting gold was determined
//   gold: '' | number,                         starting gold (the budget); in 'kit' mode the kit's coins are used instead
//   kit: { choices, picks },                   choices made in the starting kit (see startingKit.js)
//   added, removed, customItems, carried       changes made on the interactive sheet (see getOwnedItems and sheetSync.js)
// }
// In 'kit' mode the class and background kit items are owned as well (derived, free); everything in `selected` still costs gold.

export { getItem, getItemIndex };

// Older saves stored armor/shield/weapons/gear as separate lists; fold them into `selected`.
export function migrateEquipment(equipment, edition) {
	const eq = equipment || {};
	if (Array.isArray(eq.selected)) return eq;
	const { byName } = getItemIndex(edition);
	const selected = [];
	const add = (name) => {
		const item = byName.get(name);
		if (item && !selected.some((s) => s.name === name)) selected.push({ name, group: item.group, quantity: 1 });
	};
	const armor = eq.armor && getEditionData(edition).equipment.armor.find((a) => a.name === eq.armor || a.name.startsWith(`${eq.armor} `));
	if (armor) add(armor.name);
	if (eq.shield) add('Shield');
	(eq.weapons || []).forEach(add);
	(eq.gear || []).forEach(add);
	return { selected, armor: armor ? armor.name : '', shield: !!eq.shield, goldMethod: '', gold: eq.gold === undefined ? '' : eq.gold };
}

export const getSelected = (character) => character.equipment?.selected || [];

export const isKit = (character) => character.equipment?.goldMethod === 'kit';

// The items added by hand, joined with their item data (entries without data, e.g. from another edition, are skipped).
export function getPurchasedItems(character) {
	return getSelected(character)
		.map((s) => { const item = getItem(character.edition, s.name); return item ? { ...item, quantity: s.quantity || 1 } : null; })
		.filter(Boolean);
}

// The kit plus what was bought, before anything the interactive sheet changed.
export const getBaseOwnedItems = (character) => [...getKitItems(character), ...getPurchasedItems(character)];

// What the interactive sheet changed in play, applied when the player goes back to the builder (see sheetSync.js):
//   equipment.added   { name: quantity }     items picked up or bought in play (free: they never touch the starting gold)
//   equipment.removed { name: quantity }     items given up (taken from the kit first, then purchases; spent gold is not refunded)
//   equipment.customItems { name: { weight } }   weights of the added items that are not in the item catalog
function applySheetChanges(character, base) {
	const eq = character.equipment || {};
	const removed = eq.removed || {};
	const added = eq.added || {};
	if (!Object.keys(removed).length && !Object.keys(added).length) return base;
	let rows = base.map((row) => ({ ...row }));
	Object.entries(removed).forEach(([name, quantity]) => {
		let left = Number(quantity) || 0;
		rows.forEach((row) => {
			if (row.name !== name || left <= 0) return;
			const take = Math.min(row.quantity, left);
			row.quantity -= take;
			left -= take;
		});
	});
	rows = rows.filter((row) => row.quantity > 0);
	Object.entries(added).forEach(([name, quantity]) => {
		if (!(Number(quantity) > 0)) return;
		const item = getItem(character.edition, name);
		const custom = eq.customItems?.[name];
		if (item) rows.push({ ...item, quantity: Number(quantity), fromSheet: true });
		else rows.push({ name, group: 'Added on the sheet', cost: '', weight: Number(custom?.weight) || 0, quantity: Number(quantity), custom: true, fromSheet: true });
	});
	return rows;
}

// Everything the character has: the starting kit (when taken), what was added by hand, and what the sheet changed.
export const getOwnedItems = (character) => applySheetChanges(character, getBaseOwnedItems(character));

export const getWeaponNames = (character) => [...new Set(getOwnedItems(character).filter((i) => i.group === 'Weapons').map((i) => i.name))];

export function getWornArmorName(character) {
	const name = character.equipment?.armor;
	return name && getOwnedItems(character).some((i) => i.name === name && i.group === 'Armor' && i.type !== 'Shield') ? name : '';
}

export function hasShield(character) {
	return !!character.equipment?.shield && getOwnedItems(character).some((i) => i.type === 'Shield');
}

const bodyArmor = (items) => items.filter((i) => i.group === 'Armor' && i.type !== 'Shield');
const shields = (items) => items.filter((i) => i.type === 'Shield');

// What to wear and carry after the owned items changed from `before` to `after` (both whole characters):
// a worn armor that is still owned stays worn, newly owned armor is put on when nothing is worn,
// and a newly owned shield is carried.
export function getWearDefaults(before, after) {
	const was = getOwnedItems(before);
	const now = getOwnedItems(after);
	const body = bodyArmor(now);
	const current = after.equipment?.armor;
	let armor;
	if (current && body.some((i) => i.name === current)) armor = current; // still owned: keep wearing it
	else if (current || bodyArmor(was).length === 0) armor = body[0]?.name || ''; // lost it, or had none to choose from
	else armor = ''; // owned armor was taken off on purpose
	const hadShield = shields(was).length > 0;
	const shield = shields(now).length > 0 ? (hadShield ? !!after.equipment?.shield : true) : false;
	return { armor, shield };
}

// Gold spent on items added by hand (the kit itself is free).
export const getTotalSpent = (character) => getPurchasedItems(character).reduce((sum, i) => sum + parseCostToGold(i.cost) * i.quantity, 0);

// The starting budget: rolled or average gold, or the coins that come with the kit.
export function getStartingGold(character) {
	if (isKit(character)) return getKitGold(character);
	const gold = character.equipment?.gold;
	return gold === '' || gold === undefined || gold === null ? '' : Number(gold);
}

export function getRemainingGold(character) {
	const gold = getStartingGold(character);
	if (gold === '') return '';
	return Math.round((gold - getTotalSpent(character)) * 100) / 100;
}

export const getTotalWeight = (character) => getOwnedItems(character).reduce((sum, i) => sum + (Number(i.weight) || 0) * i.quantity, 0);

// One line per owned item: "Chain Mail", "Arrows (20) x3".
export function getEquipmentLines(character) {
	const worn = getWornArmorName(character);
	return getOwnedItems(character).map((i) => `${i.name}${i.quantity > 1 ? ` x${i.quantity}` : ''}${i.name === worn ? ' (worn)' : ''}`);
}

// Short stats line for the item list: damage and properties, or AC and requirements.
export function formatItemStats(item) {
	if (item.group === 'Weapons') {
		const props = item.properties.map((p) => (p === 'Versatile' && item.versatileDamage ? `Versatile (${item.versatileDamage})` : p));
		return [
			`${item.category} ${item.kind.toLowerCase()}`,
			item.damage && `${item.damage} ${item.damageType.toLowerCase()}`,
			props.length > 0 && props.join(', '),
			item.range && `range ${item.range}`,
			item.mastery && `Mastery: ${item.mastery}`,
		].filter(Boolean).join(' · ');
	}
	if (item.group === 'Armor') {
		return [
			item.type === 'Shield' ? `+${item.ac} AC` : `AC ${item.ac}${item.type === 'Heavy' ? '' : item.dexCap === null ? ' + Dex' : ` + Dex (max ${item.dexCap})`}`,
			item.type !== 'Shield' && `${item.type} armor`,
			item.strengthRequirement > 0 && `Str ${item.strengthRequirement}`,
			item.stealthDisadvantage && 'Stealth disadvantage',
		].filter(Boolean).join(' · ');
	}
	return [item.speed && `speed ${item.speed} ft.`, item.carryingCapacity && `carries ${item.carryingCapacity} lb.`].filter(Boolean).join(' · ');
}
