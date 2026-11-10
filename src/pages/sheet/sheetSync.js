// Carries what the player changed on the interactive sheet back into the character, so the rest of the app (the Equipment
// and Spells steps, the printed PDF) shows it. This is done once, when the player leaves the sheet for the builder, not
// while they play. 2014 only for now.
//
//   inventory  -> equipment.added / removed / customItems (the difference from what the builder gives: the starting kit and
//                 what was bought), the worn armor and carried shield, and the coins
//   prepared   -> classInfo.choices.prepared (the first class), the choices of each later class of a multiclassed character
//
// The sheet keeps these in play.items / play.currency / play.prepared. Applying them is idempotent.
import { getBaseOwnedItems, getCharacterItem } from '../../utils/equipment';
import { getCarriedGold } from '../../utils/characterCalc';
import { splitGold } from '../../utils/currency';
import { getClassViews } from '../../utils/multiclass';
import { getEquipped, usesEquipping } from './inventory';

const COIN_KEYS = ['cp', 'sp', 'ep', 'gp', 'pp'];

// The items the character is attuned to, as the sheet has them (play.attuned).
function withAttuned(character, play) {
	if (!Array.isArray(play?.attuned)) return character;
	// nothing attuned on the sheet and nothing recorded on the character: leave it exactly as it was
	if (play.attuned.length === 0 && !(character.equipment || {}).attuned?.length) return character;
	return { ...character, equipment: { ...(character.equipment || {}), attuned: play.attuned } };
}

// The prepared spells of one class: index 0 is the first class, 1+ the classes taken after it.
function setPreparedAt(character, index, list) {
	const classView = getClassViews(character)[index];
	if (!classView) return character;
	const ci = character.classInfo;
	if (index === 0) return { ...character, classInfo: { ...ci, choices: { ...(ci.choices || {}), prepared: list } } };
	const mc = ci.multiclass;
	return {
		...character,
		classInfo: { ...ci, multiclass: { ...mc, classes: mc.classes.map((c, i) => (i === classView.__slot ? { ...c, choices: { ...(c.choices || {}), prepared: list } } : c)) } },
	};
}

// The character with every prepared list the sheet holds ({ prepared, preparedMore: { [index]: list } }) put in.
function withPrepared(character, play) {
	let next = character;
	if (Array.isArray(play?.prepared)) next = setPreparedAt(next, 0, play.prepared);
	Object.entries(play?.preparedMore || {}).forEach(([index, list]) => { if (Array.isArray(list)) next = setPreparedAt(next, Number(index), list); });
	return next;
}

// The character's equipment after the sheet's inventory is applied.
export function inventoryToEquipment(character, items, currency) {
	const eq = character.equipment || {};
	const target = new Map();
	const weights = {};
	(items || []).forEach((i) => {
		const quantity = Math.max(0, Math.floor(Number(i.qty) || 0));
		if (!quantity) return;
		target.set(i.name, (target.get(i.name) || 0) + quantity);
		if (!getCharacterItem(character, i.name)) weights[i.name] = Number(i.weight) || 0;
	});
	// what the builder alone would give, ignoring any earlier sheet changes
	const base = new Map();
	getBaseOwnedItems({ ...character, equipment: { ...eq, added: {}, removed: {}, customItems: {} } })
		.forEach((i) => base.set(i.name, (base.get(i.name) || 0) + i.quantity));

	const added = {};
	const removed = {};
	new Set([...target.keys(), ...base.keys()]).forEach((name) => {
		const want = target.get(name) || 0;
		const have = base.get(name) || 0;
		if (want > have) added[name] = want - have;
		else if (want < have) removed[name] = have - want;
	});
	const customItems = Object.fromEntries(Object.keys(added).filter((n) => !getCharacterItem(character, n)).map((n) => [n, { weight: weights[n] || 0 }]));

	// only write what differs, so visiting the sheet without changing anything leaves the character exactly as it was
	const next = { ...eq };
	[['added', added], ['removed', removed], ['customItems', customItems]].forEach(([key, value]) => {
		if (Object.keys(value).length || key in eq) next[key] = value;
	});
	if (usesEquipping(character)) {
		const worn = getEquipped(character, items);
		if ((eq.armor || '') !== worn.armor) next.armor = worn.armor;
		if (!!eq.shield !== worn.shield) next.shield = worn.shield;
	}
	if (currency) {
		const coins = Object.fromEntries(COIN_KEYS.map((k) => [k, Math.max(0, Number(currency[k]) || 0)]));
		const current = { cp: 0, sp: 0, ep: 0, pp: 0, ...splitGold(getCarriedGold(character) || 0) };
		if (eq.carried || COIN_KEYS.some((k) => coins[k] !== (Number(current[k]) || 0))) next.carried = coins;
	}
	return next;
}

// The character with the sheet's changes applied (the same object when there is nothing to change).
export function applySheetToCharacter(character, play) {
	if (!character || !play || character.edition !== '2014') return character;
	let next = character;
	if (Array.isArray(play.items)) next = { ...next, equipment: inventoryToEquipment(next, play.items, play.currency) };
	next = withAttuned(withPrepared(next, play), play);
	return JSON.stringify(next) === JSON.stringify(character) ? character : next;
}

// The character as the sheet shows it while playing: the prepared spells picked on the sheet stand in for the builder's.
export function viewCharacter(character, play) {
	if (!play || character.edition !== '2014') return character;
	return withAttuned(withPrepared(character, play), play);
}

// What is waiting to be applied for a saved sheet record ({ character, play, playBase }): the updated character, or null.
// Only when the sheet state was recorded against this very build (otherwise it is stale and is thrown away on the next visit).
export function pendingSheetChanges(record) {
	if (!record?.character || !record.play || record.playBase !== JSON.stringify(record.character)) return null;
	const applied = applySheetToCharacter(record.character, record.play);
	return applied === record.character ? null : applied;
}
