// 2014 backgrounds: what a background grants, and the choices it asks for.
// The data (data/2014/backgrounds) is generated from the rules reference: each background has fixed
// skills/tools/languages plus "picks" (choose one of a list), starting equipment, features with optional
// specialty roll tables, variants, and suggested characteristics.
import backgrounds from '../data/2014/backgrounds';
import skills from '../data/skills';
import { allLanguages } from '../data/languages';
import { artisanTools, gamingSets, musicalInstruments } from '../data/toolLists';

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

// Everything the Background page asks the player to pick, in display order.
export function getBackgroundChoiceDefs(character) {
	if (character.edition !== '2014') return [];
	const rec = getBackgroundRecord(character);
	if (!rec) return [];
	const defs = [];
	if (rec.variants.length) defs.push({ id: 'variant', kind: 'variant', label: 'Variant', optional: true });
	rec.skills.picks.forEach((p, i) => defs.push({
		id: `skills:${i}`, kind: 'skills', label: 'Skill proficiencies', count: p.count, from: p.from === 'any' ? SKILL_NAMES : p.from,
	}));
	rec.tools.picks.forEach((p, i) => defs.push({
		id: `tools:${i}`, kind: 'tools', label: `Tool proficiency: ${toolLabel(p.from)}`, count: p.count, from: expandToolPool(p.from),
	}));
	if (rec.languages.pick) {
		const p = rec.languages.pick;
		defs.push({ id: 'languages', kind: 'languages', label: p.note ? `Languages (${p.note})` : 'Languages', count: p.count, from: p.from === 'any' ? allLanguages : p.from });
	}
	rec.features.forEach((f) => (f.rolls || []).forEach((r) => defs.push({
		id: `roll:${r.id}`, kind: 'roll', label: r.name, die: r.die, options: r.rows, optional: true,
	})));
	rec.rolls.forEach((r) => defs.push({ id: `roll:${r.id}`, kind: 'roll', label: r.name, die: r.die, options: r.rows, optional: true }));
	return defs;
}

const valid = (def, v) => (Array.isArray(v) ? v.filter((x) => def.from.includes(x)) : []);

// ---- Effects --------------------------------------------------------------------------------------------

export function getBackgroundSkillList(character) {
	const rec = getBackgroundRecord(character);
	if (!rec) return [];
	const values = getBackgroundChoices(character);
	const picked = getBackgroundChoiceDefs(character).filter((d) => d.kind === 'skills').flatMap((d) => valid(d, values[d.id]));
	return [...new Set([...rec.skills.fixed, ...picked])];
}

export function getBackgroundTools(character) {
	const rec = getBackgroundRecord(character);
	if (!rec) return [];
	const values = getBackgroundChoices(character);
	const picked = getBackgroundChoiceDefs(character).filter((d) => d.kind === 'tools').flatMap((d) => valid(d, values[d.id]));
	return [...rec.tools.fixed, ...picked];
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
	getBackgroundChoiceDefs(character).filter((d) => d.kind === 'roll').forEach((d) => {
		if (values[d.id]) lines.push(`${d.label}: ${values[d.id]}`);
	});
	return lines;
}

// How many required picks are still missing (variants and rolls are optional flavor).
export function getBackgroundPending(character) {
	const values = getBackgroundChoices(character);
	return getBackgroundChoiceDefs(character).filter((d) => {
		if (d.optional) return false;
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
	const real = rec.features.find((f) => !(f.rolls && f.rolls.length)) || rec.features[0];
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
