// Charges and abilities of custom magic items on the interactive sheet.
//   item.charges    { max, recharge: '1d4' | 'all' | '2' | '', on: 'Long rest' | 'Short rest' | 'Dawn' }
//   item.abilities  [{ name, group, activation, cost, resource, uses, dice, diceLabel, save, dc, description }]
//     cost      charges of the item the ability spends
//     resource  text for a cost the sheet does not track ("6 sorcery points")
//     uses      { max: number | null, perProficiency: bool, on: 'Short rest' | 'Long rest' | 'Dawn' }: a limited number of uses of its own
//   play.charges    { [item name]: charges spent, [item name::ability name]: uses spent }
import { getCustomGear } from '../../utils/equipment';
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

// The custom items the character is carrying that have something to show, with the charges spent: [{ item, used }]
export function getMagicItems(character, items, charges) {
	const carried = new Set((items || []).filter((i) => Number(i.qty) > 0).map((i) => i.name));
	return getCustomGear(character)
		.filter((item) => carried.has(item.name) && ((item.charges && item.charges.max > 0) || (item.abilities && item.abilities.length) || item.description || item.bonuses || item.attunement))
		.map((item) => ({ item, used: Math.min(Number(item.charges?.max) || 0, Number((charges || {})[item.name]) || 0) }));
}

// Charges still available.
export const chargesLeft = (item, used) => Math.max(0, (Number(item.charges?.max) || 0) - (Number(used) || 0));

const appliesAt = (on, type) => (type === 'short' ? (on || 'Long rest') === 'Short rest' : true);

// Regains charges and resets ability uses at a rest. type 'short' or 'long' (a long rest also covers short-rest and dawn items).
// Returns { charges: new play.charges, notes: ['Heart of the Storm regains 3 charges (1d4: 3)'] }
export function rechargeOnRest(character, items, charges, type) {
	const next = { ...(charges || {}) };
	const notes = [];
	getMagicItems(character, items, charges).forEach(({ item, used }) => {
		const rule = item.charges;
		if (rule && rule.max > 0 && rule.recharge && used > 0 && appliesAt(rule.on, type)) {
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
