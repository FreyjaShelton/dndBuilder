// Charges and abilities of custom magic items on the interactive sheet.
//   item.charges    { max: number | null, perProficiency: bool, recharge: '1d4' | 'all' | '2' | '', on: 'Long rest' | 'Short rest' | 'Dawn' }
//     (the most charges is a number, or the character's proficiency bonus when perProficiency is set)
//   item.abilities  [{ name, activation, cost, resource, uses, dice, diceLabel, save, dc, description }]
//     cost      charges of the item the ability spends
//     resource  text for a cost the sheet does not track ("6 sorcery points")
//     uses      { max: number | null, perProficiency: bool, on: 'Short rest' | 'Long rest' | 'Dawn' }: a limited number of uses of its own
//   play.charges    { [item name]: charges spent, [item name::ability name]: uses spent }
import { getCustomGear } from '../../utils/equipment';
import { getLevel, getProficiencyBonus } from '../../utils/characterCalc';
import { rollExpression } from './dice';

export const abilityUsesKey = (item, ability) => `${item.name}::${ability.name}`;

// The most times an ability can be used between rests, or null when it has no limit of its own.
export function abilityMaxUses(ability, proficiencyBonus) {
	const u = ability.uses;
	if (!u) return null;
	if (u.perProficiency) return Math.max(1, Number(proficiencyBonus) || 2);
	const n = Math.floor(Number(u.max));
	return n > 0 ? n : null;
}

// The most charges an item holds (0 when it has none): a number, or the proficiency bonus.
export function itemMaxCharges(item, proficiencyBonus) {
	const c = item.charges;
	if (!c) return 0;
	if (c.perProficiency) return Math.max(1, Number(proficiencyBonus) || 2);
	const n = Math.floor(Number(c.max));
	return n > 0 ? n : 0;
}

// The custom items the character is carrying that have something to show, with the most charges they hold and the charges spent:
// [{ item, max, used }]
export function getMagicItems(character, items, charges) {
	const carried = new Set((items || []).filter((i) => Number(i.qty) > 0).map((i) => i.name));
	const prof = getProficiencyBonus(getLevel(character));
	return getCustomGear(character)
		.map((item) => ({ item, max: itemMaxCharges(item, prof) }))
		.filter(({ item, max }) => carried.has(item.name) && (max > 0 || (item.abilities && item.abilities.length) || item.description || item.bonuses || item.attunement))
		.map(({ item, max }) => ({ item, max, used: Math.min(max, Number((charges || {})[item.name]) || 0) }));
}

// Whether a magic item is working for the character: it needs no attunement, or the character is attuned to it.
export const isItemActive = (item, attunedNames) => !item.attunement || (attunedNames || []).includes(item.name);

// Where an ability goes on the Actions tab, by how it is used.
export const ACTION_SECTIONS = [
	{ id: 'Action', title: 'Actions' },
	{ id: 'Bonus action', title: 'Bonus actions' },
	{ id: 'Reaction', title: 'Reactions' },
	{ id: 'Free', title: 'Free' },
	{ id: 'Other', title: 'During a rest and other' },
];
const sectionOf = (activation) => (ACTION_SECTIONS.some((s) => s.id === activation) ? activation : 'Other');

// The abilities of the carried magic items that are used (not passive ones), by section:
// [{ id, title, rows: [{ item, ability, active, max, used }] }]. `max` and `used` are the item's charges.
// `active` is false for an item that needs attunement the character does not have.
export function getItemActions(character, items, charges, attunedNames) {
	const entries = getMagicItems(character, items, charges);
	return ACTION_SECTIONS.map((section) => ({
		...section,
		rows: entries.flatMap(({ item, max, used }) => (item.abilities || [])
			.filter((a) => a.activation !== 'Passive' && sectionOf(a.activation) === section.id)
			.map((ability) => ({ item, ability, max, used, active: isItemActive(item, attunedNames) }))),
	})).filter((s) => s.rows.length > 0);
}

// The items that grant something the character keeps: passive abilities, bonuses to their numbers, and every ability, for the Features tab.
// [{ item, max, used }]
export const getFeatureItems = (character, items, charges) => getMagicItems(character, items, charges)
	.filter(({ item, max }) => (item.abilities && item.abilities.length) || item.bonuses || max > 0);

// Charges still available.
export const chargesLeft = (max, used) => Math.max(0, (Number(max) || 0) - (Number(used) || 0));

const appliesAt = (on, type) => (type === 'short' ? (on || 'Long rest') === 'Short rest' : true);

// Regains charges and resets ability uses at a rest. type 'short' or 'long' (a long rest also covers short-rest and dawn items).
// Returns { charges: new play.charges, notes: ['Heart of the Storm regains 3 charges (1d4: 3)'] }
export function rechargeOnRest(character, items, charges, type) {
	const next = { ...(charges || {}) };
	const notes = [];
	getMagicItems(character, items, charges).forEach(({ item, max, used }) => {
		const rule = item.charges;
		if (rule && max > 0 && rule.recharge && used > 0 && appliesAt(rule.on, type)) {
			let regained;
			let how;
			if (String(rule.recharge).toLowerCase() === 'all') { regained = used; how = 'all'; } else {
				const roll = rollExpression(rule.recharge);
				if (roll) {
					regained = Math.min(used, Math.max(0, roll.total));
					how = `${rule.recharge}: ${roll.total}`;
				}
			}
			if (regained !== undefined) {
				next[item.name] = used - regained;
				notes.push(`${item.name} regains ${regained} charge${regained === 1 ? '' : 's'} (${how})`);
			}
		}
		(item.abilities || []).forEach((ability) => {
			const key = abilityUsesKey(item, ability);
			if (ability.uses && (Number(next[key]) || 0) > 0 && appliesAt(ability.uses.on, type)) {
				next[key] = 0;
				notes.push(`${item.name}: ${ability.name} can be used again`);
			}
		});
	});
	return { charges: next, notes };
}
