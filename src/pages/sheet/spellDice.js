// What a spell rolls when it is cast, worked out from its text: the damage or healing dice in the description, made bigger
// by the slot it is cast with ("the damage increases by 1d6 for each slot level above 3rd") or by the caster's level for a
// cantrip ("increases by 1d10 when you reach 5th level"). Spells with several darts, rays or beams roll once for each.
import { parseDice, rollExpression } from './dice';

const NUMBER_WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const wordToNumber = (w) => NUMBER_WORDS[String(w).toLowerCase()] || Number(w) || 0;

// The first thing the description says to roll: { kind: 'damage' | 'healing' | 'roll', dice: 'NdM', flat, plusMod, type }
function baseRoll(text) {
	let m = text.match(/(\d+d\d+)(?:\s*\+\s*(\d+))?\s+([A-Za-z]+)\s+damage/);
	if (m && m[3].toLowerCase() !== 'of') return { kind: 'damage', dice: m[1], flat: Number(m[2]) || 0, plusMod: false, type: m[3].toLowerCase() };
	m = text.match(/([A-Za-z]+) damage equal to (\d+d\d+)(\s*\+\s*your spellcasting ability modifier)?/i);
	if (m) return { kind: 'damage', dice: m[2], flat: 0, plusMod: !!m[3], type: m[1].toLowerCase() };
	m = text.match(/regains? (?:a number of )?hit points equal to (\d+d\d+)(\s*\+\s*your spellcasting ability modifier)?/i);
	if (m) return { kind: 'healing', dice: m[1], flat: 0, plusMod: !!m[2], type: '' };
	m = text.match(/regains? (\d+) hit points/i);
	if (m) return { kind: 'healing', dice: '', flat: Number(m[1]), plusMod: false, type: '' };
	m = text.match(/Roll (\d+d\d+)/);
	if (m) return { kind: 'roll', dice: m[1], flat: 0, plusMod: false, type: '' };
	return null;
}


// slotLevel: the level of the slot it is cast with (0 for a cantrip); characterLevel: for cantrips
// abilityMod: the spellcasting ability modifier of the class the spell was learned with
// Returns null when the spell rolls nothing, otherwise { kind, type, sides, count, flat, repeat, expression, label }
export function getSpellRoll(spell, { slotLevel = 0, characterLevel = 1, abilityMod = 0 } = {}) {
	const text = String(spell?.description || '');
	const higher = String(spell?.higherLevels || '');
	const base = baseRoll(text);
	if (!base) return null;
	const parsed = base.dice ? parseDice(base.dice) : { count: 0, sides: 0, mod: 0 };
	let count = parsed.count;
	let flat = base.flat + (base.plusMod ? abilityMod : 0);
	let repeat = 1;

	if (spell.level === 0) {
		// cantrips grow with the caster's level: 5th, 11th and 17th
		const tier = 1 + (characterLevel >= 5 ? 1 : 0) + (characterLevel >= 11 ? 1 : 0) + (characterLevel >= 17 ? 1 : 0);
		const grow = higher.match(/increases by (\d+d\d+) when you reach 5th level/i);
		if (grow) count += parseDice(grow[1]).count * (tier - 1);
		else if (/beams? at 5th level/i.test(higher)) repeat = tier; // Eldritch Blast: one beam per tier
	} else if (slotLevel > spell.level) {
		// "increases by 1d6 for each slot level above 3rd" / "for every two slot levels above the 2nd" / "by 10 ..." (flat healing)
		const up = higher.match(/(?:damage|healing)[^.]*?increases? by (\d+d\d+|\d+) for (each|every) (two )?slot levels? above (?:the )?(\d+)/i)
			|| higher.match(/roll an additional (\d+d\d+) for (each|every) (two )?slot levels? above (?:the )?(\d+)/i);
		if (up) {
			const step = up[3] ? 2 : 1;
			const steps = Math.floor((slotLevel - Number(up[4])) / step);
			if (steps > 0) {
				if (/d/.test(up[1])) count += parseDice(up[1]).count * steps;
				else flat += Number(up[1]) * steps;
			}
		}
		// more darts or rays: "one more dart for each slot level above 1st"
		const more = higher.match(/(?:one|\d+) (?:more|additional) (?:dart|ray)s? for each slot level above (?:the )?(\d+)/i);
		const initial = text.match(/\b(one|two|three|four|five|six)\s+(?:glowing\s+)?(?:darts|rays)\b/i);
		if (more && initial) repeat = wordToNumber(initial[1]) + Math.max(0, slotLevel - Number(more[1]));
		else if (initial) repeat = wordToNumber(initial[1]);
	} else {
		const initial = text.match(/\b(one|two|three|four|five|six)\s+(?:glowing\s+)?(?:darts|rays)\b/i);
		if (initial && /(?:dart|ray)s? for each slot level/i.test(higher)) repeat = wordToNumber(initial[1]);
	}

	const sides = parsed.sides;
	const one = `${count ? `${count}d${sides}` : ''}${flat ? `${count ? (flat > 0 ? '+' : '') : ''}${flat}` : ''}` || '0';
	return {
		kind: base.kind, type: base.type, sides, count, flat, repeat,
		expression: repeat > 1 ? `${repeat} × ${one}` : one,
		one,
	};
}

// Rolls it: { total, detail } with the individual dice for the roll log.
export function rollSpell(roll) {
	let total = 0;
	const parts = [];
	for (let i = 0; i < roll.repeat; i += 1) {
		const r = rollExpression(roll.one);
		if (!r) continue;
		total += r.total;
		parts.push(r.sides ? `[${r.rolls.join(', ')}]${r.mod ? ` ${r.mod > 0 ? '+' : ''}${r.mod}` : ''}` : `${r.mod}`);
	}
	const word = roll.kind === 'healing' ? 'healing' : roll.kind === 'damage' ? `${roll.type} damage` : 'rolled';
	return { total, detail: `${roll.expression} ${word}: ${parts.join(' + ')}` };
}
