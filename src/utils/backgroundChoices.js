// 2014 backgrounds: what a background grants, and the choices it asks for.
// The data (data/2014/backgrounds) is generated from the rules reference: each background has fixed
// skills/tools/languages plus "picks" (choose one of a list), starting equipment, features with optional
// specialty roll tables, variants, and suggested characteristics.
import backgrounds from '../data/2014/backgrounds';
import skills from '../data/skills';
import { allLanguages } from '../data/languages';
import { artisanTools, gamingSets, musicalInstruments } from '../data/toolLists';
import { getEditionData } from '../data';
import { SKILLED_COUNT, SKILLED_FROM, splitSkilled } from './customOrigin';
import { getBackgroundFeat, getFeatSpellPending } from './featSpells';
import { getRaceLanguages } from './raceChoices';

const SKILL_NAMES = skills.map((s) => s.name);
const bgState = (character) => character.background || {};
export const getBackgroundChoices = (character) => bgState(character).choices || {};

export const getBackgroundList = () => Object.values(backgrounds);
export const getBackgroundRecord = (character) => backgrounds[bgState(character).name] || null;
export const getVariant = (character) => {
	const rec = getBackgroundRecord(character);
	return rec?.variants.find((v) => v.name === bgState(character).variant) || null;
};

// Tool pools use @categories in the data; expand them to concrete names.
const POOLS = { '@gaming': gamingSets, '@artisan': artisanTools, '@instrument': musicalInstruments };
export const expandToolPool = (from) => [...new Set(from.flatMap((f) => POOLS[f] || [f]))];
const toolLabel = (from) => {
	const cats = from.filter((f) => f.startsWith('@')).map((f) => ({ '@gaming': 'gaming set', '@artisan': "artisan's tools", '@instrument': 'musical instrument' }[f]));
	const names = from.filter((f) => !f.startsWith('@'));
	return [...cats, ...names].join(' or ');
};

// The extra picks (see data/2014/backgroundFixes.js) that apply with the chosen variant.
const optionGroups = (character, rec) => (rec.options || []).filter((g) => !g.variant || g.variant === bgState(character).variant);

// Effects of the options picked: [{ tools, toolPicks, languagePicks, dropToolPicks }], each with the option group id.
function chosenOptionEffects(character, rec) {
	const values = getBackgroundChoices(character);
	return optionGroups(character, rec).map((g) => {
		const chosen = g.options.find((o) => o.name === values[`option:${g.id}`]);
		return chosen?.effects ? { ...chosen.effects, group: g.id } : null;
	}).filter(Boolean);
}

// Everything the Background page asks the player to pick, in display order.
export function getBackgroundChoiceDefs(character) {
	if (character.edition !== '2014') return [];
	const rec = getBackgroundRecord(character);
	if (!rec) return [];
	const defs = [];
	if (rec.variants.length) defs.push({ id: 'variant', kind: 'variant', label: 'Variant', optional: true });
	optionGroups(character, rec).forEach((g) => defs.push({ id: `option:${g.id}`, kind: 'option', label: g.label, options: g.options, optional: !!g.optional }));
	const effects = chosenOptionEffects(character, rec);
	rec.skills.picks.forEach((p, i) => defs.push({
		id: `skills:${i}`, kind: 'skills', label: 'Skill proficiencies', count: p.count, from: p.from === 'any' ? SKILL_NAMES : p.from,
	}));
	if (!effects.some((e) => e.dropToolPicks)) {
		rec.tools.picks.forEach((p, i) => defs.push({
			id: `tools:${i}`, kind: 'tools', label: `Tool proficiency: ${toolLabel(p.from)}`, count: p.count, from: expandToolPool(p.from),
		}));
	}
	effects.forEach((e) => (e.toolPicks || []).forEach((p, i) => defs.push({
		id: `tools:${e.group}:${i}`, kind: 'tools', label: `Tool proficiency: ${toolLabel(p.from)}`, count: p.count, from: expandToolPool(p.from),
	})));
	const langCount = languagePickCount(character, rec) + effects.reduce((n, e) => n + (e.languagePicks || 0), 0);
	if (langCount > 0) {
		const p = rec.languages.pick || { from: 'any' };
		defs.push({ id: 'languages', kind: 'languages', label: p.note ? `Languages (${p.note})` : 'Languages', count: langCount, from: p.from === 'any' ? allLanguages : p.from });
	}
	const feat = getBackgroundFeat(character);
	if (feat) {
		if (feat.from) defs.push({ id: 'feat', kind: 'feat', label: `${feat.trait}: feat`, trait: feat.trait, from: feat.from });
		const inc = feat.name && getEditionData('2014').feats.find((f) => f.name === feat.name)?.abilityIncrease;
		if (inc && inc.options.length > 1) defs.push({ id: 'featAbility', kind: 'featAbility', label: `${feat.name}: ability score +1`, options: inc.options });
		if (feat.name === 'Skilled') defs.push({ id: 'feat:skilled', kind: 'skilled', label: 'Skilled: skills or tools', count: SKILLED_COUNT, from: SKILLED_FROM });
	}
	rec.features.forEach((f) => (f.rolls || []).forEach((r) => defs.push({
		id: `roll:${r.id}`, kind: 'roll', label: r.name, die: r.die, options: r.rows, optional: true,
	})));
	rec.rolls.forEach((r) => defs.push({ id: `roll:${r.id}`, kind: 'roll', label: r.name, die: r.die, options: r.rows, optional: true }));
	return defs;
}

// The background's own language pick; Clan Crafter's extra language only counts if the race already gives Dwarvish.
function languagePickCount(character, rec) {
	const p = rec.languages.pick;
	if (!p) return 0;
	if (p.onlyIfKnown) {
		const race = getRaceLanguages(character);
		if (![...race.fixed, ...race.picked].includes(p.onlyIfKnown)) return 0;
	}
	return p.count;
}

const valid = (def, v) => (Array.isArray(v) ? v.filter((x) => def.from.includes(x)) : []);
const skilledPicks = (character) => {
	const def = getBackgroundChoiceDefs(character).find((d) => d.kind === 'skilled');
	return def ? splitSkilled(getBackgroundChoices(character)[def.id]) : { skills: [], tools: [] };
};

// ---- Effects --------------------------------------------------------------------------------------------

export function getBackgroundSkillList(character) {
	const rec = getBackgroundRecord(character);
	if (!rec) return [];
	const values = getBackgroundChoices(character);
	const picked = getBackgroundChoiceDefs(character).filter((d) => d.kind === 'skills').flatMap((d) => valid(d, values[d.id]));
	// a variant can trade one skill for another (City Watch's Investigator)
	const swaps = getVariant(character)?.effects?.replaceSkills || {};
	const fixed = rec.skills.fixed.map((sk) => swaps[sk] || sk);
	const { skills: skilled } = skilledPicks(character);
	return [...new Set([...fixed, ...picked, ...skilled])];
}

export function getBackgroundTools(character) {
	const rec = getBackgroundRecord(character);
	if (!rec) return [];
	const values = getBackgroundChoices(character);
	const picked = getBackgroundChoiceDefs(character).filter((d) => d.kind === 'tools').flatMap((d) => valid(d, values[d.id]));
	const fromOptions = chosenOptionEffects(character, rec).flatMap((e) => e.tools || []);
	const { tools: skilled } = skilledPicks(character);
	return [...new Set([...rec.tools.fixed, ...fromOptions, ...picked, ...skilled])];
}

// { fixed, picked, pickCount }
export function getBackgroundLanguages(character) {
	const rec = getBackgroundRecord(character);
	if (!rec) return { fixed: [], picked: [], pickCount: 0 };
	const def = getBackgroundChoiceDefs(character).find((d) => d.kind === 'languages');
	const picked = def ? valid(def, getBackgroundChoices(character).languages).filter((l) => !rec.languages.fixed.includes(l)) : [];
	return { fixed: rec.languages.fixed, picked, pickCount: def ? def.count : 0 };
}

// "Label: choice" lines for the sheet: variant and any specialty/origin rolls picked.
export function getBackgroundChoiceSummaries(character) {
	const values = getBackgroundChoices(character);
	const lines = [];
	const variant = bgState(character).variant;
	if (variant) lines.push(`Variant: ${variant}`);
	const feat = getBackgroundFeat(character);
	if (feat?.name) lines.push(`${feat.trait}: ${feat.name} feat`);
	getBackgroundChoiceDefs(character).filter((d) => d.kind === 'roll' || d.kind === 'option').forEach((d) => {
		if (values[d.id]) lines.push(`${d.label.replace(/ \(decides .*\)$/, '')}: ${values[d.id]}`);
	});
	return lines;
}

// How many required picks are still missing (variants and rolls are optional flavor).
export function getBackgroundPending(character) {
	const values = getBackgroundChoices(character);
	const feat = getBackgroundFeat(character);
	const spellPending = feat?.name ? getFeatSpellPending(feat.name, values['feat:spells'], feat.variantPrefix) : 0;
	return spellPending + getBackgroundChoiceDefs(character).filter((d) => {
		if (d.optional) return false;
		if (d.kind === 'feat') return !feat?.name;
		if (d.kind === 'option') return !d.options.some((o) => o.name === values[d.id]);
		if (d.kind === 'featAbility') return !d.options.includes(values[d.id]);
		return valid(d, values[d.id]).length < d.count;
	}).length;
}

// ---- Shape the rest of the app already understands -----------------------------------------------------

// { name, description, skills, toolProficiencies (text), languages (text), equipment, feature, features, gold }
export function resolveBackground(character) {
	const rec = getBackgroundRecord(character);
	if (!rec) return null;
	const tools = getBackgroundTools(character);
	const langs = getBackgroundLanguages(character);
	const real = rec.features.find((f) => !(f.rolls && f.rolls.length) && !f.isChoice) || rec.features[0];
	return {
		name: rec.name,
		source: rec.source,
		description: rec.description,
		skills: getBackgroundSkillList(character),
		toolProficiencies: [...tools, ...(rec.tools.manual ? [rec.tools.text] : [])].join(', '),
		languages: [...langs.fixed, ...langs.picked].join(', '),
		equipment: rec.equipment,
		gold: rec.gold,
		features: rec.features,
		feature: real ? { name: real.name, description: real.description } : { name: '', description: '' },
	};
}

export { SKILL_NAMES };
