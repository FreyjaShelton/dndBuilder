// What a 2014 character's race and background picks mean, for the interactive sheet: the picked options and the feats
// they grant as feature entries, and the racial traits that are used in play (Healing Hands, Radiant Soul...) as actions.
import { getEditionData } from '../data';
import { getAllTraits, getRaceChoiceFeatures, getRaceChoices, getRaceFeat, getRaceRecord } from './raceChoices';
import { getBackgroundFeat } from './featSpells';
import { splitSkilled } from './customOrigin';
import { ABILITY_NAMES } from './abilityScore';
import { getTotalLevel } from './multiclass';

const is2014 = (character) => character.edition === '2014';

// "Celestial Revelation: Radiant Soul"
const pickTitle = (f) => `${f.trait}: ${f.name}`;

// The race's picked options with rules of their own: [{ name, description }]. The description starts with the trait's own
// rules (how it is used) and then what the pick does.
export function getRacePickEntries(character) {
	if (!is2014(character)) return [];
	return getRaceChoiceFeatures(character).map((f) => ({
		name: pickTitle(f),
		description: [f.traitDescription, `${f.name}. ${f.description}`].filter(Boolean).join('\n\n'),
	}));
}

// Extra lines under a feat taken from the race or background: the ability it raised and the Skilled picks.
function featDetails(feat, choices) {
	const lines = [];
	const inc = feat.abilityIncrease;
	if (inc) {
		const key = inc.options.length === 1 ? inc.options[0] : choices.featAbility;
		if (key && ABILITY_NAMES[key]) lines.push(`Ability score increase: ${ABILITY_NAMES[key]} +${inc.amount || 1}`);
	}
	if (feat.name === 'Skilled') {
		const { skills, tools } = splitSkilled(choices['feat:skilled']);
		if (skills.length) lines.push(`Skills: ${skills.join(', ')}`);
		if (tools.length) lines.push(`Tools: ${tools.join(', ')}`);
	}
	return lines;
}

// Feats from the race (Variant Human, Custom Lineage) and the background (Rewarded, Ruined, Wildspacer...):
// [{ name, from, description }]. Feats taken at an Ability Score Improvement are listed with the class features.
export function getOriginFeatEntries(character) {
	if (!is2014(character)) return [];
	const out = [];
	const raceFeat = getRaceFeat(character);
	if (raceFeat) {
		const choices = getRaceChoices(character);
		out.push({ name: raceFeat.name, from: getRaceRecord(character)?.name || 'Race', description: [...featDetails(raceFeat, choices), raceFeat.description].join('\n\n') });
	}
	const bg = getBackgroundFeat(character);
	const bgRecord = bg?.name && getEditionData('2014').feats.find((f) => f.name === bg.name);
	if (bgRecord) {
		const choices = character.background?.choices || {};
		out.push({ name: bgRecord.name, from: `${character.background.name}: ${bg.trait}`, description: [...featDetails(bgRecord, choices), bgRecord.description].join('\n\n') });
	}
	return out;
}

// ---- Racial traits used in play ----------------------------------------------------------------------------------------

// How a trait is used, from its text: the first of "as a bonus action", "as an action" or "as a reaction" it mentions.
const ACTIVATIONS = [
	{ id: 'Bonus action', re: /\b(as a bonus action|use (?:a|your) bonus action)\b/i },
	{ id: 'Action', re: /\b(as an action|use your action|(?:take|use) an action)\b/i },
	{ id: 'Reaction', re: /\b(as a reaction|use your reaction)\b/i },
];
export function activationOf(text) {
	let best = null;
	ACTIVATIONS.forEach(({ id, re }) => {
		const m = String(text || '').match(re);
		if (m && (!best || m.index < best.index)) best = { id, index: m.index };
	});
	return best ? best.id : null;
}

// Limited uses, from the text: { max | perProficiency, on: 'Short rest' | 'Long rest' } (shaped like a magic item ability's uses), or null.
export function usesOf(text) {
	const t = String(text || '');
	const on = /(?:finish|complete)s? a short or long rest/i.test(t) ? 'Short rest' : /(?:finish|complete)s? a long rest/i.test(t) ? 'Long rest' : null;
	if (!on) return null;
	if (/number of times equal to your proficiency bonus/i.test(t)) return { perProficiency: true, on };
	return { max: 1, on };
}

export const traitUsesKey = (action) => `trait::${action.name}`;

// The racial traits (and picked options, such as Radiant Soul) that are used as an action, bonus action or reaction:
// [{ name, from, activation, uses, description }]. A trait with a list of options shows the picked one.
export function getTraitActions(character) {
	if (!is2014(character)) return [];
	const race = getRaceRecord(character);
	if (!race) return [];
	const level = getTotalLevel(character);
	const picks = getRaceChoiceFeatures(character);
	const out = [];
	getAllTraits(character).forEach((t) => {
		if (t.minLevel && level < t.minLevel) return;
		const pick = t.choose === 'option' ? picks.find((p) => p.trait === t.name) : null;
		const name = pick ? pickTitle(pick) : t.name;
		const description = pick ? [t.description, `${pick.name}. ${pick.description}`].join('\n\n') : t.description || '';
		// the trait's own text says how it is used; a picked option inherits that
		const activation = activationOf(t.description) || (pick && activationOf(pick.description));
		if (!activation) return;
		out.push({ name, from: race.name, activation, uses: usesOf(t.description) || (pick && usesOf(pick.description)), description });
	});
	return out;
}

// Resets the trait uses that come back at this rest ('short' or 'long'). Returns { charges, notes }.
export function resetTraitUses(character, charges, type) {
	const next = { ...(charges || {}) };
	const notes = [];
	getTraitActions(character).forEach((a) => {
		const key = traitUsesKey(a);
		if (!a.uses || !(Number(next[key]) > 0)) return;
		if (type === 'short' && a.uses.on !== 'Short rest') return;
		next[key] = 0;
		notes.push(`${a.name} can be used again`);
	});
	return { charges: next, notes };
}
