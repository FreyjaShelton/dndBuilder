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
//   attuned: [name]                             the custom magic items the character is attuned to (at most 3)
//   customGear: [item]                          items the player made up (2014), usually starting from a catalog item: the same fields
//                                               as a catalog item plus { homebrew: true, base: 'Longsword' }. They are bought through
//                                               `selected` like any item, and every lookup by name finds them (getCharacterItem)
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

// ---- Custom items (2014) -----------------------------------------------------------------------------------------------

export const getCustomGear = (character) => (character.edition === '2014' && Array.isArray(character.equipment?.customGear) ? character.equipment.customGear : []);

// An item by name: one the player made up, else the catalog's.
export const getCharacterItem = (character, name) => getCustomGear(character).find((i) => i.name === name) || getItem(character.edition, name);

// Armor and weapons the character can use, catalog and custom (what Armor Class and attacks look names up in).
export const getArmorData = (character) => [...getEditionData(character.edition).equipment.armor, ...getCustomGear(character).filter((i) => i.group === 'Armor')];
export const getWeaponData = (character) => [...getEditionData(character.edition).equipment.weapons, ...getCustomGear(character).filter((i) => i.group === 'Weapons')];

// Is this name free for a custom item? (not empty, not a catalog item, not another custom item). `own` is the item being edited.
export function checkCustomName(character, name, own = '', alsoTaken = []) {
	const trimmed = String(name || '').trim();
	if (!trimmed) return 'Give the item a name.';
	if (trimmed === own) return '';
	if (getItem(character.edition, trimmed)) return `"${trimmed}" is already an item in the catalog. Pick a different name.`;
	if (getCustomGear(character).some((i) => i.name === trimmed) || alsoTaken.includes(trimmed)) return `You already have a custom item called "${trimmed}".`;
	return '';
}

// A starting point for a custom item: a copy of a catalog item (or a blank one) with a free name.
export function newCustomItem(character, baseName, alsoTaken = []) {
	const base = baseName ? getItem(character.edition, baseName) : null;
	const copy = base ? JSON.parse(JSON.stringify(base)) : { group: 'Adventuring Gear', cost: '', weight: 0, description: '' };
	let name = base ? `${base.name} (custom)` : 'New item';
	for (let n = 2; checkCustomName(character, name, '', alsoTaken); n += 1) name = `${base ? `${base.name} (custom)` : 'New item'} ${n}`;
	return { ...copy, name, homebrew: true, ...(base ? { base: base.name } : {}) };
}

// Saves a custom item (new, or an edit of `original`, the name it had): the equipment patch for updateEquipment.
// Renaming follows the item through what is bought and the worn armor.
export function saveCustomItem(eq, item, original) {
	const list = Array.isArray(eq.customGear) ? eq.customGear : [];
	const exists = original && list.some((i) => i.name === original);
	const customGear = exists ? list.map((i) => (i.name === original ? item : i)) : [...list, item];
	const selected = eq.selected || [];
	const hasIt = selected.some((s) => s.name === (original || item.name));
	const nextSelected = original && original !== item.name
		? selected.map((s) => (s.name === original ? { ...s, name: item.name, group: item.group } : { ...s }))
		: selected.map((s) => (s.name === item.name ? { ...s, group: item.group } : s));
	return {
		customGear,
		// a new item goes straight into the inventory
		selected: !original && !hasIt ? [...nextSelected, { name: item.name, group: item.group, quantity: 1 }] : nextSelected,
		...(original && original !== item.name && eq.armor === original ? { armor: item.name } : {}),
	};
}

// Puts a library item (see customItemLibrary.js) on the character: its copy is added or brought up to date, and it is bought
// (carried) like any item.
export function carryCustomItem(eq, item) {
	const list = Array.isArray(eq.customGear) ? eq.customGear : [];
	const copy = list.find((i) => item.libId && i.libId === item.libId) || list.find((i) => i.name === item.name);
	const patch = saveCustomItem(eq, item, copy ? copy.name : undefined);
	const selected = patch.selected || eq.selected || [];
	return { ...patch, selected: selected.some((s) => s.name === item.name) ? selected : [...selected, { name: item.name, group: item.group, quantity: 1 }] };
}

// Brings the character's copy of a library item up to date (nothing when the character has no copy).
export function refreshCustomCopy(eq, item) {
	const list = Array.isArray(eq.customGear) ? eq.customGear : [];
	const copy = list.find((i) => item.libId && i.libId === item.libId) || list.find((i) => i.name === item.name);
	return copy ? saveCustomItem(eq, item, copy.name) : {};
}

// Deletes a custom item and takes it out of the inventory.
export const deleteCustomItem = (eq, name) => ({
	customGear: (eq.customGear || []).filter((i) => i.name !== name),
	selected: (eq.selected || []).filter((s) => s.name !== name),
	...(eq.armor === name ? { armor: '' } : {}),
});

export const isKit = (character) => character.equipment?.goldMethod === 'kit';

// The items added by hand, joined with their item data (entries without data, e.g. from another edition, are skipped).
export function getPurchasedItems(character) {
	return getSelected(character)
		.map((s) => { const item = getCharacterItem(character, s.name); return item ? { ...item, quantity: s.quantity || 1 } : null; })
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
		const item = getCharacterItem(character, name);
		const custom = eq.customItems?.[name];
		if (item) rows.push({ ...item, quantity: Number(quantity), fromSheet: true });
		else rows.push({ name, group: 'Added on the sheet', cost: '', weight: Number(custom?.weight) || 0, quantity: Number(quantity), custom: true, fromSheet: true });
	});
	return rows;
}

// ---- Magic item bonuses and attunement -----------------------------------------------------------------------------------

export const MAX_ATTUNED = 3;
export const getAttuned = (character) => (Array.isArray(character.equipment?.attuned) ? character.equipment.attuned : []);

// What the custom magic items the character carries add to the numbers: { ac, spellSaveDc, spellAttack, saves }.
// An item that needs attunement counts only while the character is attuned to it (equipment.attuned: [names]).
export function getItemBonuses(character) {
	const out = { ac: 0, spellSaveDc: 0, spellAttack: 0, saves: 0 };
	if (character.edition !== '2014' || !getCustomGear(character).some((i) => i.bonuses)) return out;
	const attuned = getAttuned(character);
	const carried = new Set(getOwnedItems(character).filter((i) => i.quantity > 0).map((i) => i.name));
	getCustomGear(character).forEach((item) => {
		if (!item.bonuses || !carried.has(item.name) || (item.attunement && !attuned.includes(item.name))) return;
		Object.keys(out).forEach((k) => { out[k] += Number(item.bonuses[k]) || 0; });
	});
	return out;
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
// "Wondrous item, Rare, requires attunement": what a magic item is, when it has been described that way
export const describeMagicItem = (item) => [item.itemType, item.rarity, item.attunement && 'requires attunement'].filter(Boolean).join(', ');

export function formatItemStats(item) {
	const base = formatBaseStats(item);
	const extra = [item.charges?.max > 0 && `${item.charges.max} charges`].filter(Boolean);
	return [describeMagicItem(item), base, ...extra].filter(Boolean).join(' · ');
}

function formatBaseStats(item) {
	if (item.group === 'Weapons') {
		const props = item.properties.map((p) => (p === 'Versatile' && item.versatileDamage ? `Versatile (${item.versatileDamage})` : p));
		return [
			`${item.category} ${item.kind.toLowerCase()}`,
			item.damage && `${item.damage}${item.ability ? ` + ${item.ability.toUpperCase()} modifier` : ''} ${item.damageType.toLowerCase()}`,
			item.spellAttack && 'spell attack',
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
