// Spells granted by 2014 feats (Fey Touched, Magic Initiate, Telepathic...). The feat's spell choices are made right
// where the feat is chosen (the class's Ability Score Improvement card, or the race page for a racial feat) and stored
// with it as { variant, picks: { [pickId]: [spellNames] } }:
//   class ASI: classInfo.choices['asi-<level>'].spells      race feat: race.choices['feat:spells']
//   background feat: background.choices['feat:spells']
// (a later class of a multiclassed character keeps its own choices, in its entry of classInfo.multiclass.classes)
import spellIndex from '../data/2014/spellIndex';
import backgrounds2014 from '../data/2014/backgrounds';
import { attackCantrips, featSpells, ritualSpells } from '../data/2014/featSpells';
import { ABILITY_NAMES } from './abilityScore';
import { getAsiLevels, getChoiceValues } from './classChoices';
import { getClassViews } from './multiclass';

const byName = new Map(spellIndex.map((s) => [s.name, s]));
const ritual = new Set(ritualSpells);
const attack = new Set(attackCantrips);

export const getFeatSpellGrant = (featName) => featSpells[featName] || null;

const ordinal = (n) => ({ 1: '1st', 2: '2nd', 3: '3rd' }[n] || `${n}th`);
const joinOr = (list) => (list.length < 2 ? list.join('') : `${list.slice(0, -1).join(', ')} or ${list[list.length - 1]}`);

export const USE_TEXT = { known: '', daily: 'once per long rest', rest: 'once per short or long rest', will: 'at will', ritual: 'as a ritual' };

const optionOf = (s) => ({ name: s.name, label: `${s.name} (level ${s.level}, ${s.school})`, group: s.level === 0 ? 'Cantrips' : `Level ${s.level}` });

// The spells a pick can be filled with.
export function getPickOptions(pick) {
	if (pick.from) return pick.from.map((n) => byName.get(n)).filter(Boolean).map(optionOf);
	return spellIndex
		.filter((s) => (pick.level === undefined || s.level === pick.level)
			&& (!pick.classes || pick.classes.some((c) => s.classes.includes(c)))
			&& (!pick.schools || pick.schools.includes(s.school))
			&& (!pick.ritual || ritual.has(s.name))
			&& (!pick.attack || attack.has(s.name)))
		.map(optionOf);
}

function pickTitle(pick) {
	const base = pick.from ? 'Spells' : pick.level === 0 ? (pick.count > 1 ? 'Cantrips' : 'Cantrip') : `${ordinal(pick.level)}-level spell${pick.count > 1 ? 's' : ''}`;
	const quals = [];
	if (pick.from) quals.push("from this option's list");
	if (pick.classes) quals.push(`${joinOr(pick.classes)} list`);
	if (pick.schools) quals.push(joinOr([...pick.schools].sort()));
	if (pick.ritual) quals.push('ritual');
	if (pick.attack) quals.push('needs an attack roll');
	return quals.length ? `${base} (${quals.join(', ')})` : base;
}

// Who the spellcasting ability is, in words.
export function getSpellAbilityText(ability) {
	if (!ability) return '';
	if (ability === 'inherit') return 'the ability score this feat increases';
	if (typeof ability === 'string') return ABILITY_NAMES[ability] || ability;
	return `${joinOr(ability.choose.map((k) => ABILITY_NAMES[k]))} (your choice)`;
}

// The variants a player can actually take: ones whose spell choices have enough legal spells (Spell Sniper has no
// attack-roll cantrip on the bard or cleric list, so those two are not offered).
const availableCache = new Map();
// variantPrefix keeps only the variants named after it (a Lorehold Student's Strixhaven Initiate offers only Lorehold).
export function getAvailableVariants(featName, variantPrefix) {
	const grant = getFeatSpellGrant(featName);
	if (!grant) return [];
	if (!availableCache.has(featName)) availableCache.set(featName, grant.variants.filter((v) => v.picks.every((p) => getPickOptions(p).length >= p.count)));
	const all = availableCache.get(featName);
	return variantPrefix ? all.filter((v) => v.name === variantPrefix || v.name.startsWith(`${variantPrefix} `)) : all;
}

// What a chosen feat gives, given the choices made so far:
// { grant, variants (those on offer), variant (the one in use), needsVariant, fixed: [{ name, level, use }], picks: [{ id, title, count, use, options, value }], ability }
export function resolveFeatSpells(featName, state, variantPrefix) {
	const grant = getFeatSpellGrant(featName);
	if (!grant) return null;
	const s = state || {};
	const variants = getAvailableVariants(featName, variantPrefix);
	const variant = variants.length === 1 ? variants[0] : variants.find((v) => v.name === s.variant) || null;
	const out = { grant, variants, variant, needsVariant: !variant, fixed: [], picks: [], ability: variant ? getSpellAbilityText(variant.ability) : '' };
	if (!variant) return out;
	out.fixed = variant.fixed.map((f) => ({ name: f.name, level: byName.get(f.name)?.level ?? 1, use: f.use }));
	out.picks = variant.picks.map((pick, i) => {
		const options = getPickOptions(pick);
		const id = `p${i}`;
		const value = ((s.picks || {})[id] || []).filter((n) => options.some((o) => o.name === n)).slice(0, pick.count);
		return { id, title: pickTitle(pick), count: pick.count, use: pick.use, options, value };
	});
	return out;
}

// Short description of a variant for its dropdown: the spells it gives automatically.
export function describeVariant(variant) {
	const names = variant.fixed.map((f) => f.name);
	return names.length ? `${variant.name} (${names.join(', ')})` : variant.name;
}

// How many choices are still open: the variant, and spells not yet picked.
export function getFeatSpellPending(featName, state, variantPrefix) {
	const r = resolveFeatSpells(featName, state, variantPrefix);
	if (!r) return 0;
	if (r.needsVariant) return 1;
	return r.picks.reduce((n, p) => n + Math.max(0, p.count - p.value.length), 0);
}

// The feat a 2014 background grants: { name, trait, from, variantPrefix } (name is '' until a pick is made), or null.
export function getBackgroundFeat(character) {
	if (character.edition !== '2014') return null;
	const info = backgrounds2014[character.background?.name]?.feat;
	if (!info) return null;
	const picked = character.background?.choices?.feat;
	const name = info.fixed || (info.from.includes(picked) ? picked : '');
	return { ...info, name };
}

// Every feat the 2014 character has, with where its spell choices are stored:
// [{ feat, source: 'asi-4' | 'race' | 'background', state, variantPrefix }]
export function getCharacterFeats(character) {
	if (character.edition !== '2014') return [];
	const out = [];
	getClassViews(character).forEach((view) => {
		const values = getChoiceValues(view);
		getAsiLevels(view).forEach((l) => {
			const v = values[`asi-${l}`];
			if (v?.type === 'feat' && v.feat) out.push({ feat: v.feat, source: view.__index ? `${view.classInfo.className}:asi-${l}` : `asi-${l}`, state: v.spells });
		});
	});
	const rc = character.race?.choices || {};
	if (rc.feat) out.push({ feat: rc.feat, source: 'race', state: rc['feat:spells'] });
	const bgFeat = getBackgroundFeat(character);
	if (bgFeat?.name) out.push({ feat: bgFeat.name, source: 'background', state: character.background.choices?.['feat:spells'], variantPrefix: bgFeat.variantPrefix });
	return out;
}

// All spells the character's feats give: fixed ones and the picks made. [{ name, level, school, from, use }]
export function getFeatGrantedSpells(character) {
	const seen = new Set();
	const out = [];
	getCharacterFeats(character).forEach(({ feat, state, variantPrefix }) => {
		const r = resolveFeatSpells(feat, state, variantPrefix);
		if (!r || r.needsVariant) return;
		const add = (name, use) => {
			const s = byName.get(name);
			if (!s || seen.has(name)) return;
			seen.add(name);
			out.push({ name, level: s.level, school: s.school, from: feat, use });
		};
		r.fixed.forEach((f) => add(f.name, f.use));
		r.picks.forEach((p) => p.value.forEach((n) => add(n, p.use)));
	});
	return out;
}

// Open spell choices across the character's feats.
export const getCharacterFeatSpellPending = (character) => getCharacterFeats(character).reduce((n, f) => n + getFeatSpellPending(f.feat, f.state, f.variantPrefix), 0);

// Pending choices for the race page's feat only (the class page shows its own).
export function getRaceFeatSpellPending(character) {
	if (character.edition !== '2014') return 0;
	const rc = character.race?.choices || {};
	return rc.feat ? getFeatSpellPending(rc.feat, rc['feat:spells']) : 0;
}
