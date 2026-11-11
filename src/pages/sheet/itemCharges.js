// Charges and abilities of custom magic items on the interactive sheet.
//   item.charges    { max: number | null, perProficiency: bool, recharge: '1d4' | 'all' | '2' | '', on: 'Long rest' | 'Short rest' | 'Dawn' }
//     (the most charges is a number, or the character's proficiency bonus when perProficiency is set)
//   item.abilities  [{ name, activation, cost, resource, uses, dice, diceLabel, save, dc, description }]
//     cost      charges of the item the ability spends
//     extraCharges  true: more charges than `cost` can be spent on one use, each adding `diceExtra` ("1d6") to the dice,
//                   up to `maxCost` charges in all (none: as many as the item has left)
//     resource  text for a cost the sheet does not track ("6 sorcery points")
//     uses      { max: number | null, perProficiency: bool, on: 'Short rest' | 'Long rest' | 'Dawn' }: a limited number of uses of its own
//   item.spells     [{ name, level, ability, uses }]: spells the item lets the carrier cast (see utils/itemSpells.js)
//   play.charges    { [item name]: charges spent, [item name::ability name]: uses spent, [item name::spell::spell name]: uses spent }
import { getCustomGear } from '../../utils/equipment';
import { itemSpellKey } from '../../utils/itemSpells';
import { getLevel, getProficiencyBonus } from '../../utils/characterCalc';
import { parseDice, rollExpression } from './dice';

export const abilityUsesKey = (item, ability) => `${item.name}::${ability.name}`;

// The dice of one use of an ability, in words, when `extra` charges beyond its cost are spent: "3d12", "3d12 + 2d6".
export function abilityDiceText(ability, extra = 0) {
	const base = String(ability.dice || '').trim();
	const per = parseDice(ability.diceExtra);
	if (!extra || !per || !String(ability.diceExtra || '').trim()) return base;
	// the same kind of dice add up: 1d6 and two more 1d6 make 3d6
	const own = parseDice(base);
	if (own && own.count && per.count && own.sides === per.sides) {
		const mod = own.mod + per.mod * extra;
		return `${own.count + per.count * extra}d${own.sides}${mod ? `${mod > 0 ? '+' : '-'}${Math.abs(mod)}` : ''}`;
	}
	const more = per.count ? `${per.count * extra}d${per.sides}${per.mod ? `${per.mod > 0 ? '+' : '-'}${Math.abs(per.mod * extra)}` : ''}` : `${per.mod * extra}`;
	return base ? `${base} + ${more}` : more;
}

// How many charges one use of an ability can spend: [{ charges, extra, dice }], cheapest first. Empty when the ability spends no
// charges or there aren't enough left (`left`); one entry unless the ability can take extra charges.
export function abilityChargeOptions(ability, left) {
	const cost = Math.max(0, Math.floor(Number(ability.cost)) || 0);
	if (!cost || left < cost) return [];
	const most = ability.extraCharges ? Math.min(left, Number(ability.maxCost) > cost ? Math.floor(Number(ability.maxCost)) : left) : cost;
	const out = [];
	for (let c = cost; c <= most; c += 1) out.push({ charges: c, extra: c - cost, dice: abilityDiceText(ability, c - cost) });
	return out;
}

// Rolls the dice of one use of an ability with `extra` charges beyond its cost: { total, detail } or null when it has no dice.
export function rollAbilityDice(ability, extra = 0) {
	const parts = [];
	if (String(ability.dice || '').trim()) parts.push({ expr: ability.dice, times: 1 });
	if (extra > 0 && String(ability.diceExtra || '').trim()) parts.push({ expr: ability.diceExtra, times: extra });
	const rolled = parts.flatMap(({ expr, times }) => Array.from({ length: times }, () => rollExpression(expr))).filter(Boolean);
	if (!rolled.length) return null;
	const rolls = rolled.flatMap((r) => r.rolls);
	const mod = rolled.reduce((n, r) => n + r.mod, 0);
	return { total: rolled.reduce((n, r) => n + r.total, 0), detail: `${abilityDiceText(ability, extra)} [${rolls.join(', ')}]${mod ? ` ${mod > 0 ? '+' : ''}${mod}` : ''}` };
}

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
		.filter(({ item, max }) => carried.has(item.name) && (max > 0 || (item.abilities && item.abilities.length) || (item.spells && item.spells.length) || item.description || item.bonuses || item.attunement))
		.map(({ item, max }) => ({ item, max, used: Math.min(max, Number((charges || {})[item.name]) || 0) }));
}

// The ability modifier, save DC and spell attack bonus for a spell a magic item grants: the ability the item names, else the character's own
// spellcasting (the first class that casts). null when neither exists (a barbarian with a bracelet that casts Shield needs no numbers).
export function itemSpellStats(d, spell) {
	if (spell.ability && d.mods[spell.ability] !== undefined) {
		const mod = d.mods[spell.ability];
		return { mod, saveDc: 8 + d.prof + mod, attackBonus: d.prof + mod };
	}
	return d.spellStats ? { mod: d.mods[d.spellStats.abilityKey], saveDc: d.spellStats.saveDc, attackBonus: d.spellStats.attackBonus } : null;
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

// A spell goes where its casting time says: 1 action, 1 bonus action, 1 reaction, or (a minute, an hour...) the last section.
const sectionOfCasting = (castingTime) => {
	const t = String(castingTime || '').trim().toLowerCase();
	return /^1 bonus action/.test(t) ? 'Bonus action' : /^1 reaction/.test(t) ? 'Reaction' : /^1 action/.test(t) ? 'Action' : 'Other';
};

// The abilities of the carried magic items that are used (not passive ones), and the spells they let the character cast, by section:
// [{ id, title, rows: [{ item, ability, active, max, used }] }]. `max` and `used` are the item's charges. A spell's row has `spell`
// (see utils/itemSpells.js) instead of `ability`.
// `active` is false for an item that needs attunement the character does not have.
export function getItemActions(character, items, charges, attunedNames, itemSpells = []) {
	const entries = getMagicItems(character, items, charges);
	return ACTION_SECTIONS.map((section) => ({
		...section,
		rows: entries.flatMap(({ item, max, used }) => (item.abilities || [])
			.filter((a) => a.activation !== 'Passive' && sectionOf(a.activation) === section.id)
			.map((ability) => ({ item, ability, max, used, active: isItemActive(item, attunedNames) }))),
		spells: itemSpells.filter((s) => sectionOfCasting(s.castingTime) === section.id),
	})).map(({ spells, ...section }) => ({ ...section, rows: [...section.rows, ...spells.map((spell) => ({ item: { name: spell.fromItem }, spell, active: spell.active }))] })).filter((s) => s.rows.length > 0);
}

// The items that grant something the character keeps: passive abilities, bonuses to their numbers, and every ability, for the Features tab.
// [{ item, max, used }]
export const getFeatureItems = (character, items, charges) => getMagicItems(character, items, charges)
	.filter(({ item, max }) => (item.abilities && item.abilities.length) || (item.spells && item.spells.length) || item.bonuses || max > 0);

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
		(item.spells || []).forEach((spell) => {
			const key = itemSpellKey(item, spell);
			if (spell.uses && (Number(next[key]) || 0) > 0 && appliesAt(spell.uses.on, type)) {
				next[key] = 0;
				notes.push(`${item.name}: ${spell.name} can be cast again`);
			}
		});
	});
	return { charges: next, notes };
}
