// 2014 races: which version/subrace a character has, what it grants, and the choices it asks for.
// The data (data/2014/races) is generated from the rules reference; every trait carries the mechanical
// effects detected from its text (fixed skills, skill/tool/language/cantrip picks, a feat, speed, natural
// armor...). This module turns the character's picks into bonuses, proficiencies and spells.
import raceData from '../data/2014/races';
import { getEditionData } from '../data';
import skills from '../data/skills';
import { ABILITY_KEYS } from './abilityScore';
import { getRaceFeatSpellPending } from './featSpells';
import { allLanguages } from '../data/languages';
import { artisanTools, gamingSets, musicalInstruments } from '../data/toolLists';
import { ALL_TOOLS, SKILLED_COUNT, SKILLED_FROM, applySwaps, parseRacialArmor, parseRacialWeapons, splitSkilled } from './customOrigin';
import { getTotalLevel } from './multiclass';

const raceOf = (character) => character.race || {};
export const getRaceChoices = (character) => raceOf(character).choices || {};
const norm = (s) => String(s).toLowerCase();
const SKILL_NAMES = skills.map((s) => s.name);

export const getRaceCategories = () => {
	const groups = {};
	Object.values(raceData).forEach((r) => { (groups[r.category] ||= []).push(r.name); });
	return groups;
};

export function getRaceRecord(character) {
	return raceData[raceOf(character).name] || null;
}

export function getVersion(character) {
	const rec = getRaceRecord(character);
	if (!rec) return null;
	return rec.versions.find((v) => v.id === raceOf(character).version) || rec.versions.find((v) => v.id === rec.defaultVersion) || rec.versions[0];
}

export function getSubraceRecord(character) {
	const v = getVersion(character);
	return v?.subraces.find((s) => s.name === raceOf(character).subrace) || null;
}

// ---- What a subrace replaces ---------------------------------------------------------------------------

const replacesAsi = (sub) => !!sub && (sub.replaces === 'all' || !!sub.replaces?.asi) && !!sub.asi;
const replacesTrait = (sub, name) => !!sub && (sub.replaces === 'all' || (sub.replaces?.traits || []).some((n) => norm(n) === norm(name)));

export function getBaseTraits(character) {
	const sub = getSubraceRecord(character);
	return (getVersion(character)?.traits || []).filter((t) => t.name !== 'Subrace' && !replacesTrait(sub, t.name));
}
export const getSubraceTraits = (character) => getSubraceRecord(character)?.traits || [];
export const getAllTraits = (character) => [...getBaseTraits(character), ...getSubraceTraits(character)];

// ---- Ability scores ---------------------------------------------------------------------------------

// { fixed: {str: 2}, choose: [{ count, amount }], flex: bool }
export function getEffectiveAsi(character) {
	const v = getVersion(character);
	const sub = getSubraceRecord(character);
	const out = { fixed: {}, choose: [], flex: false };
	const add = (a) => {
		if (!a) return;
		Object.entries(a.fixed || {}).forEach(([k, n]) => { out.fixed[k] = (out.fixed[k] || 0) + n; });
		(a.choose || []).forEach((g) => out.choose.push(g));
		if (a.flex) out.flex = true;
	};
	const replaced = collectEffects(character).find((fx) => fx.replaceAsi)?.replaceAsi;
	if (replaced) add(replaced);
	else {
		if (!replacesAsi(sub)) add(v?.asi);
		if (sub) add(sub.asi);
	}
	return out;
}

// The feat the race grants (Variant Human, Custom Lineage), as its full record, or null.
export const getRaceFeat = (character) => (getRaceChoiceDefs(character).some((d) => d.kind === 'feat') ? chosenFeat(character) : null);

function chosenFeat(character) {
	const name = getRaceChoices(character).feat;
	return name ? getEditionData(character.edition).feats.find((f) => f.name === name) || null : null;
}

// ---- Customizing Your Origin (Tasha's) ---------------------------------------------------------------
// See customOrigin.js. The customization lives on character.race.customize.

export const canCustomizeOrigin = (character) => character.edition === '2014' && !!getVersion(character) && getRaceRecord(character).category !== 'Custom Lineage';
export const getCustomize = (character) => raceOf(character).customize || null;
export const isCustomizing = (character) => canCustomizeOrigin(character) && !!getCustomize(character)?.on;

// The ability score increases the race gives, as amounts ([2, 1, 1]). Races with flexible increases (the +2/+1 ones)
// already let the player assign them, so they have nothing to customize here.
export function getRaceIncreases(character) {
	const asi = getEffectiveAsi(character);
	if (asi.flex) return [];
	const out = Object.values(asi.fixed);
	asi.choose.forEach((g) => { for (let i = 0; i < g.count; i++) out.push(g.amount); });
	return out;
}

// Where each increase goes by default (the race's own assignment); '' for an increase the player has not picked yet.
export function getDefaultIncreaseTargets(character) {
	const asi = getEffectiveAsi(character);
	if (asi.flex) return [];
	const picks = getRaceChoices(character).asi || [];
	const out = Object.keys(asi.fixed);
	let slot = 0;
	asi.choose.forEach((g) => { for (let i = 0; i < g.count; i++) out.push(picks[slot++] || ''); });
	return out;
}

const customizingAsi = (character) => isCustomizing(character) && !getEffectiveAsi(character).flex;

export function getRaceAbilityBonuses(character) {
	const bonuses = Object.fromEntries(ABILITY_KEYS.map((k) => [k, 0]));
	if (!getVersion(character)) return bonuses;
	const asi = getEffectiveAsi(character);
	const choices = getRaceChoices(character);
	if (customizingAsi(character)) {
		// each increase goes where the player put it
		const targets = getCustomize(character).asi || [];
		getRaceIncreases(character).forEach((amount, i) => { if (targets[i] && targets[i] in bonuses) bonuses[targets[i]] += amount; });
	} else {
		Object.entries(asi.fixed).forEach(([k, n]) => { bonuses[k] += n; });
		let slot = 0;
		asi.choose.forEach((g) => {
			for (let i = 0; i < g.count; i++) {
				const key = (choices.asi || [])[slot++];
				if (key && key in bonuses) bonuses[key] += g.amount;
			}
		});
	}
	if (asi.flex && choices.asiFlex) {
		const f = choices.asiFlex;
		if (f.mode === 'twoOne') {
			if (f.plus2) bonuses[f.plus2] += 2;
			if (f.plus1 && f.plus1 !== f.plus2) bonuses[f.plus1] += 1;
		} else if (f.mode === 'oneOneOne') {
			new Set(f.picks || []).forEach((k) => { if (k in bonuses) bonuses[k] += 1; });
		}
	}
	// half-feats chosen as a racial feat (Variant Human, Custom Lineage)
	const feat = chosenFeat(character);
	if (feat?.abilityIncrease) {
		const inc = feat.abilityIncrease;
		const key = inc.options.length === 1 ? inc.options[0] : choices.featAbility;
		if (key && inc.options.includes(key)) bonuses[key] += inc.amount || 1;
	}
	return bonuses;
}

// ---- Choice definitions -------------------------------------------------------------------------

// Options for a dragon-ancestry table: rows after the header row, first column is the name.
function ancestryOptions(tables) {
	for (const t of tables || []) {
		const headerAt = t.rows.findIndex((r) => r.length >= 2 && /^Dragon( Color)?$/i.test(r[0]));
		if (headerAt < 0) continue;
		const header = t.rows[headerAt];
		return t.rows.slice(headerAt + 1).filter((r) => r[0]).map((r) => ({
			name: r[0],
			description: r.slice(1).map((c, i) => `${header[i + 1]}: ${c}`).join('; '),
		}));
	}
	return [];
}

function languageCount(character) {
	const v = getVersion(character);
	const sub = getSubraceRecord(character);
	let n = sub?.replaces === 'all' && sub.languages ? sub.languages.choose : v?.languages?.choose || 0;
	if (sub?.languages && sub.replaces !== 'all') n += sub.languages.choose || 0;
	return n;
}

const ABILITY_CHOICE = /Intelligence, Wisdom, or Charisma[^.]*\(choose/;
const ordinal = (n) => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`;

function addTraitDefs(character, trait, ctx, defs, values, tables) {
	const fx = trait.effects || {};
	(fx.skillChoices || []).forEach((g, i) => defs.push({
		id: `skills:${ctx}${trait.name}:${i}`, kind: 'skills', label: trait.name, trait: trait.name, count: g.count, from: g.from === 'any' ? SKILL_NAMES : g.from,
	}));
	(fx.toolChoices || []).forEach((g, i) => {
		const from = Array.isArray(g.from) ? g.from : g.from === 'instrument' ? musicalInstruments : g.from === 'gaming' ? gamingSets : g.from === 'any' ? ALL_TOOLS : artisanTools;
		defs.push({ id: `tools:${ctx}${trait.name}:${i}`, kind: 'tools', label: trait.name, trait: trait.name, count: g.count, from });
	});
	(fx.weaponChoices || []).forEach((g, i) => {
		const from = getEditionData('2014').equipment.weapons.filter((w) => !g.category || w.category === g.category).map((w) => w.name);
		defs.push({ id: `weapons:${ctx}${trait.name}:${i}`, kind: 'weapons', label: trait.name, trait: trait.name, count: g.count, from });
	});
	// "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this race)"
	if (ABILITY_CHOICE.test(trait.description || '')) {
		const what = /spellcasting ability/.test(trait.description) ? 'spellcasting ability' : 'ability';
		defs.push({ id: `ability:${ctx}${trait.name}`, kind: 'option', label: `${trait.name}: ${what}`, trait: trait.name, options: ['Intelligence', 'Wisdom', 'Charisma'].map((name) => ({ name })) });
	}
	(fx.cantripChoices || []).forEach((g, i) => defs.push({
		id: `cantrip:${ctx}${trait.name}:${i}`, kind: 'spells', label: `${trait.name}: cantrip`, trait: trait.name, count: g.count, classes: g.classes,
	}));
	if (fx.feat) defs.push({ id: 'feat', kind: 'feat', label: trait.name, trait: trait.name });
	if (/Ancestry$/.test(trait.name) && ancestryOptions(tables).length) {
		defs.push({ id: `ancestry:${ctx}${trait.name}`, kind: 'option', label: trait.name, trait: trait.name, traitDescription: trait.description, options: ancestryOptions(tables) });
	}
	if (trait.choose === 'option' && trait.options) {
		const id = `option:${ctx}${trait.name}`;
		const label = trait.choiceLabel || trait.name;
		// a pick made at a later level (Aasimar's Celestial Revelation at 3rd) can be made early but is not missing until then
		defs.push({
			id, kind: 'option', label: trait.minLevel && !/level\)$/.test(label) ? `${label} (${ordinal(trait.minLevel)} level)` : label, trait: trait.name, traitDescription: trait.description, options: trait.options, minLevel: trait.minLevel,
		});
		const chosen = trait.options.find((o) => o.name === values[id]);
		if (chosen) addTraitDefs(character, { name: chosen.name, effects: chosen.effects, description: chosen.description }, `${ctx}${trait.name}>`, defs, values, tables);
	}
}

// Everything the Race page asks the player to pick, in display order.
export function getRaceChoiceDefs(character) {
	if (character.edition !== '2014') return [];
	const v = getVersion(character);
	if (!v) return [];
	const sub = getSubraceRecord(character);
	const values = getRaceChoices(character);
	const defs = [];
	const asi = getEffectiveAsi(character);
	const fixedKeys = Object.keys(asi.fixed);
	const slots = asi.choose.reduce((n, g) => n + g.count, 0);
	// when the origin is customized, the increases are assigned in the "Customize your origin" panel instead
	if (slots > 0 && !customizingAsi(character)) defs.push({ id: 'asi', kind: 'abilities', label: 'Ability score increases', groups: asi.choose, exclude: fixedKeys });
	if (asi.flex) defs.push({ id: 'asiFlex', kind: 'flex', label: 'Ability score increases' });
	if (v.sizeChoice && !(sub?.replaces === 'all' && sub.size)) defs.push({ id: 'size', kind: 'option', label: 'Size', options: v.sizeChoice.map((name) => ({ name })) });
	const tables = [...(sub?.tables || []), ...(v.tables || [])];
	getBaseTraits(character).forEach((t) => addTraitDefs(character, t, 'b:', defs, values, tables));
	getSubraceTraits(character).forEach((t) => addTraitDefs(character, t, 's:', defs, values, tables));
	// a racial feat of Skilled (Variant Human, Custom Lineage): three skills or tools
	if (chosenFeat(character)?.name === 'Skilled' && defs.some((d) => d.kind === 'feat')) {
		defs.push({ id: 'feat:skilled', kind: 'skilled', label: 'Skilled: skills or tools', count: SKILLED_COUNT, from: SKILLED_FROM });
	}
	const langs = languageCount(character) + getAllEffects(character).languagePicks;
	if (langs > 0) defs.push({ id: 'languages', kind: 'languages', label: 'Languages', count: langs });
	return defs;
}

// ---- Effects ------------------------------------------------------------------------------------------

// Effects of every trait, including the option the player chose for traits that offer a list.
function collectEffects(character) {
	const values = getRaceChoices(character);
	const list = [];
	const walk = (t, ctx) => {
		if (t.effects) list.push(t.effects);
		if (t.choose === 'option' && t.options) {
			const chosen = t.options.find((o) => o.name === values[`option:${ctx}${t.name}`]);
			if (chosen) walk({ name: chosen.name, effects: chosen.effects }, `${ctx}${t.name}>`);
		}
	};
	getBaseTraits(character).forEach((t) => walk(t, 'b:'));
	getSubraceTraits(character).forEach((t) => walk(t, 's:'));
	return list;
}

function getAllEffects(character) {
	const out = { skills: [], tools: [], armor: [], spells: [], speeds: {}, hpPerLevel: 0, speedSet: 0, naturalArmor: null, acBonus: 0, languagePicks: 0 };
	collectEffects(character).forEach((fx) => {
		(fx.skills || []).forEach((s) => out.skills.push(s));
		(fx.toolsFixed || []).forEach((t) => out.tools.push(t));
		(fx.spells || []).forEach((s) => out.spells.push(s));
		(fx.armor || []).forEach((a) => out.armor.push(a));
		Object.assign(out.speeds, fx.speeds || {});
		out.hpPerLevel += fx.hpPerLevel || 0;
		if (fx.speedSet) out.speedSet = Math.max(out.speedSet, fx.speedSet);
		if (fx.naturalArmor && (!out.naturalArmor || fx.naturalArmor.base > out.naturalArmor.base)) out.naturalArmor = fx.naturalArmor;
		out.acBonus += fx.acBonus || 0;
		out.languagePicks += fx.languageChoices || 0;
	});
	return out;
}

// the character level (all classes added together), which racial features such as the Tiefling's spells are unlocked by
const level = (character) => getTotalLevel(character);

// The text of every trait the character has, including the option picked for a trait that offers a list
// (used to find weapon proficiencies such as "Elf Weapon Training").
export function getRaceTraitTexts(character) {
	const values = getRaceChoices(character);
	const texts = [];
	const walk = (t, ctx) => {
		texts.push(t.description || '');
		if (t.choose === 'option' && t.options) {
			const chosen = t.options.find((o) => o.name === values[`option:${ctx}${t.name}`]);
			if (chosen) walk({ name: chosen.name, description: chosen.description || chosen.name }, `${ctx}${t.name}>`);
		} else if (t.options) {
			// plain bullet lists under a trait are part of its text
			t.options.forEach((o) => texts.push(`${o.name}. ${o.description || ''}`));
		}
	};
	getBaseTraits(character).forEach((t) => walk(t, 'b:'));
	getSubraceTraits(character).forEach((t) => walk(t, 's:'));
	return texts;
}

// The Skilled picks of a racial feat, split into skills and tools.
const raceSkilled = (character) => (getRaceChoiceDefs(character).some((d) => d.kind === 'skilled') ? splitSkilled(getRaceChoices(character)['feat:skilled']) : { skills: [], tools: [] });

// Fixed skills from traits plus the skills picked from the race's dropdowns.
export function getRaceSkills(character) {
	if (character.edition !== '2014') return [];
	const values = getRaceChoices(character);
	const picks = getRaceChoiceDefs(character).filter((d) => d.kind === 'skills').flatMap((d) => values[d.id] || []);
	return [...new Set([...getRacialProficiencySet(character).skills, ...picks, ...raceSkilled(character).skills])];
}

export function getRaceTools(character) {
	const values = getRaceChoices(character);
	const picks = getRaceChoiceDefs(character).filter((d) => d.kind === 'tools').flatMap((d) => values[d.id] || []);
	return [...getRacialProficiencySet(character).tools, ...picks, ...raceSkilled(character).tools];
}

// What the race trains the character in outright (not the dropdown picks): skills, tools, weapons and armor types.
// Racial proficiencies, one entry each, so they can be swapped when the origin is customized.
export function getRacialProficiencies(character) {
	if (character.edition !== '2014' || !getVersion(character)) return [];
	const fx = getAllEffects(character);
	const texts = getRaceTraitTexts(character);
	return [
		...fx.skills.map((name) => ({ kind: 'skill', name })),
		...fx.tools.map((name) => ({ kind: 'tool', name })),
		...parseRacialWeapons(texts),
		...[...new Set([...parseRacialArmor(texts).map((a) => a.name), ...fx.armor])].map((name) => ({ kind: 'armor', name })),
	];
}

// The racial proficiencies after the player's swaps (customized origin) or as the race gives them: { skills, tools, weapons, armor }.
export function getRacialProficiencySet(character) {
	const swaps = isCustomizing(character) ? getCustomize(character).swaps || {} : {};
	return applySwaps(getRacialProficiencies(character), swaps);
}

// weapons the race trains outright plus the ones picked (Hobgoblin's two martial weapons)
export function getRaceWeaponProficiencies(character) {
	const values = getRaceChoices(character);
	const picks = getRaceChoiceDefs(character).filter((d) => d.kind === 'weapons').flatMap((d) => values[d.id] || []);
	return [...new Set([...getRacialProficiencySet(character).weapons, ...picks])];
}
export const getRaceArmorProficiencies = (character) => getRacialProficiencySet(character).armor;

// { fixed: [names], picked: [names], pickCount }
// The languages the race gives outright, before any customization.
export function getRaceBaseLanguages(character) {
	const v = getVersion(character);
	if (!v) return [];
	const sub = getSubraceRecord(character);
	const fixed = new Set(sub?.replaces === 'all' && sub.languages ? sub.languages.fixed : v.languages?.fixed || []);
	if (sub?.languages && sub.replaces !== 'all') sub.languages.fixed.forEach((l) => fixed.add(l));
	return [...fixed];
}

export function getRaceLanguages(character) {
	const v = getVersion(character);
	if (!v) return { fixed: [], picked: [], pickCount: 0 };
	// customized origin: each language the race gives can be replaced with any other listed language
	let fixedList = getRaceBaseLanguages(character);
	if (isCustomizing(character)) {
		const swaps = getCustomize(character).languages || {};
		fixedList = [...new Set(fixedList.map((l) => (swaps[l] && allLanguages.includes(swaps[l]) ? swaps[l] : l)))];
	}
	const fixedSet = new Set(fixedList);
	const picked = (getRaceChoices(character).languages || []).filter((l) => !fixedSet.has(l));
	return { fixed: fixedList, picked, pickCount: languageCount(character) + getAllEffects(character).languagePicks };
}

export function getRaceSpeeds(character) {
	const v = getVersion(character);
	const sub = getSubraceRecord(character);
	const speeds = { ...((sub?.replaces === 'all' && sub.speeds) ? sub.speeds : v?.speeds || {}) };
	const fx = getAllEffects(character);
	if (fx.speedSet) speeds.walk = fx.speedSet;
	// speeds from a trait or a picked option: a number, or 'walk' for "equal to your walking speed"
	Object.entries(fx.speeds).forEach(([kind, n]) => { speeds[kind] = Math.max(speeds[kind] || 0, n === 'walk' ? speeds.walk || 0 : n); });
	return speeds;
}

export function getRaceSize(character) {
	const picked = getRaceChoices(character).size;
	if (picked) return picked;
	const v = getVersion(character);
	const sub = getSubraceRecord(character);
	const text = sub?.replaces === 'all' && sub.size ? sub.size : v?.size || '';
	const m = text.match(/\b(Tiny|Small|Medium|Large)\b/);
	return m ? m[1] : 'Medium';
}

export const getRaceHpPerLevel = (character) => getAllEffects(character).hpPerLevel;
export const getRaceArmor = (character) => ({ naturalArmor: getAllEffects(character).naturalArmor, acBonus: getAllEffects(character).acBonus });

// Racial spells that are known automatically at the character's level, and the cantrip picks.
export function getRaceSpellInfo(character) {
	if (character.edition !== '2014' || !getVersion(character)) return { fixed: [], pickDefs: [] };
	const lv = level(character);
	const fixed = getAllEffects(character).spells.filter((s) => s.characterLevel <= lv);
	const seen = new Set();
	const unique = fixed.filter((s) => (seen.has(s.name) ? false : seen.add(s.name)));
	return { fixed: unique, pickDefs: getRaceChoiceDefs(character).filter((d) => d.kind === 'spells') };
}

// The race's pick for each defined choice, as "Trait: choice" lines for the sheet.
// skipDescribed leaves out picks the sheet shows as entries of their own (see getRaceChoiceFeatures).
export function getRaceChoiceSummaries(character, { skipDescribed = false } = {}) {
	const values = getRaceChoices(character);
	const lines = [];
	const described = new Set(skipDescribed ? getRaceChoiceFeatures(character).map((f) => f.defId) : []);
	getRaceChoiceDefs(character).forEach((d) => {
		const v = values[d.id];
		if (!v || (Array.isArray(v) && !v.length)) return;
		if (d.kind === 'abilities' || d.kind === 'flex' || described.has(d.id)) return;
		if (skipDescribed && d.kind === 'feat') return;
		lines.push(`${d.label.replace(/ \((?:\d+(?:st|nd|rd|th)) level\)$/, '')}: ${Array.isArray(v) ? v.join(', ') : v}`);
	});
	return lines;
}

// The options picked for traits that offer a list, when the option has rules of its own (Radiant Soul, a Shifting benefit, a
// dragon ancestry): [{ defId, name, trait, description, traitDescription, minLevel }]. Picks for a level not reached yet are left out.
export function getRaceChoiceFeatures(character) {
	const values = getRaceChoices(character);
	const lv = level(character);
	return getRaceChoiceDefs(character).filter((d) => d.kind === 'option' && d.trait && (!d.minLevel || lv >= d.minLevel)).map((d) => {
		const option = d.options.find((o) => o.name === values[d.id]);
		if (!option?.description) return null;
		return { defId: d.id, name: option.name, trait: d.trait, description: option.description, traitDescription: d.traitDescription || '', minLevel: d.minLevel };
	}).filter(Boolean);
}

// How many picks are still missing, for a "to choose" badge.
export function getRacePending(character) {
	const values = getRaceChoices(character);
	// customized increases that have not been assigned yet
	const customPending = customizingAsi(character) ? getRaceIncreases(character).filter((_, i) => !(getCustomize(character).asi || [])[i]).length : 0;
	const lv = level(character);
	return customPending + getRaceFeatSpellPending(character) + getRaceChoiceDefs(character).filter((d) => {
		const v = values[d.id];
		if (d.minLevel && lv < d.minLevel && !v) return false;
		if (d.kind === 'abilities') return (Array.isArray(v) ? v.filter(Boolean).length : 0) < d.groups.reduce((n, g) => n + g.count, 0);
		if (d.kind === 'flex') return !(v && ((v.mode === 'twoOne' && v.plus2 && v.plus1) || (v.mode === 'oneOneOne' && (v.picks || []).filter(Boolean).length === 3)));
		if (['skills', 'tools', 'weapons', 'languages', 'spells', 'skilled'].includes(d.kind)) return !Array.isArray(v) || v.length < d.count;
		return !v;
	}).length;
}

// ---- Shape the rest of the app already understands ----------------------------------------------------

// A 2014 race as the sheet/PDF code expects: { name, size, speed, traits, languages (text), description, subraces }.
export function resolveRace(character) {
	const rec = getRaceRecord(character);
	const v = getVersion(character);
	if (!rec || !v) return null;
	const langs = getRaceLanguages(character);
	return {
		name: rec.name,
		category: rec.category,
		size: getRaceSize(character),
		speed: getRaceSpeeds(character).walk || '',
		speeds: getRaceSpeeds(character),
		traits: getBaseTraits(character),
		subraces: v.subraces,
		description: v.description,
		source: v.source,
		languages: [...langs.fixed, ...langs.picked].join(', '),
	};
}

export { allLanguages };
