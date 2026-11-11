// Level-by-level class features and the choices a 2014 character makes at each level.
// The data lives in data/2014/classes (features, subclasses) and data/2014/classChoices (choice definitions).
import classChoices from '../data/2014/classChoices';
import { disciplines, invocations, maneuvers } from '../data/2014/classLists';
import { infusions } from '../data/2014/infusions';
import spellIndex from '../data/2014/spellIndex';
import { allLanguages } from '../data/languages';
import { getEditionData } from '../data';
import skills from '../data/skills';
import { ABILITY_KEYS } from './abilityScore';
import { getClassViews } from './multiclass';
import { splitSkilled } from './customOrigin';

// Most functions here describe ONE class: the one in character.classInfo (for a multiclassed character, pass the class's view
// from getClassViews). The ones that say so in their comment cover every class the character has.

const baseName = (s) => String(s).replace(/\s*\([^)]*\)\s*/g, ' ').replace(/[⁠​]/g, '').replace(/\s+/g, ' ').trim();
const ASI = 'Ability Score Improvement';
const SPLIT = /,\s*(?![^()]*\))/;

const info = (character) => character.classInfo || {};
export const hasClassChoices = (character) => character.edition === '2014' && !!getClass2014(character);

function getClass2014(character) {
	return getEditionData(character.edition).classes[info(character).className] || null;
}

const levelOf = (character) => Math.min(20, Math.max(1, Number(info(character).level) || 1));
export const getChoiceValues = (character) => info(character).choices || {};
export const getEnabledOptionals = (character) => info(character).optionalFeatures || [];

export function getSubclass(character) {
	const cls = getClass2014(character);
	return cls?.subclasses?.find((s) => s.name === info(character).subclass) || null;
}

function config(character) {
	return classChoices[info(character).className] || { optional: {}, choices: [], subclasses: {} };
}

// Features hidden because an enabled optional feature replaces them.
function replacedFeatures(character) {
	const optional = config(character).optional || {};
	return new Set(getEnabledOptionals(character).flatMap((n) => optional[n]?.replaces || []));
}

// Table cells for a level: [{ label, base }], skipping the generic "Path feature" placeholders.
function tableCells(cls, level) {
	const col = cls.table.columns.findIndex((c) => /^Features$/i.test(c.replace(/\s+/g, ' ').trim()));
	const cell = cls.table.rows[level - 1]?.[col] || '';
	return cell.split(SPLIT).map((s) => s.replace(/[⁠​]/g, '').trim()).filter((s) => s && s !== '-' && s !== '—')
		.map((label) => ({ label, base: baseName(label) }))
		.filter((c) => !/ feature$/i.test(c.base));
}

// All choice definitions that could apply to this class (class-wide + the chosen subclass).
export function getChoiceDefs(character) {
	const cfg = config(character);
	const sub = info(character).subclass;
	return [...(cfg.choices || []), ...((cfg.subclasses || {})[sub] || [])];
}

// A choice can depend on an earlier one (showIf: { id, value }), e.g. the Blessed Warrior cantrips.
const isVisible = (def, values) => !def.showIf || values[def.showIf.id] === def.showIf.value;

// Choices for a level/feature that should currently be shown on the Class page. Spell picks are made
// on the Spells step instead (see spellChoicesFor and utils/spells2014).
function matchingChoices(character, level, featureName) {
	const enabled = new Set(getEnabledOptionals(character));
	const values = getChoiceValues(character);
	return getChoiceDefs(character).filter((c) => (
		c.level === level && c.feature === featureName && (!c.optionalFeature || enabled.has(c.optionalFeature)) && isVisible(c, values)
	));
}
const choicesFor = (character, level, featureName) => matchingChoices(character, level, featureName).filter((c) => c.kind !== 'spells');
const spellChoicesFor = (character, level, featureName) => matchingChoices(character, level, featureName).filter((c) => c.kind === 'spells');

// [{ level, proficiencyBonus, entries: [...] }] for levels 1..current level.
// entry: { key, name, label, description, kind: 'class'|'subclass'|'subclassPick'|'asi', optional, enabled, source, choices, options, repeat }
export function getLevelEntries(character) {
	const cls = getClass2014(character);
	if (!cls) return [];
	const sub = getSubclass(character);
	const replaced = replacedFeatures(character);
	const enabledOptionals = new Set(getEnabledOptionals(character));
	const seen = new Set();
	const levels = [];
	for (let level = 1; level <= levelOf(character); level++) {
		const entries = [];
		// Starting proficiencies that need a pick (e.g. a bard's instruments) get their own card at level 1.
		if (level === 1) {
			const profChoices = choicesFor(character, 1, 'Proficiencies');
			if (profChoices.length) {
				entries.push({
					key: 'proficiencies-1', name: 'Proficiencies', label: 'Proficiencies', kind: 'class', level: 1, enabled: true, choices: profChoices,
					description: `Armor: ${cls.armorProficiencies}\nWeapons: ${cls.weaponProficiencies}\nTools: ${cls.toolProficiencies}\nSaving throws: ${cls.savingThrows.join(', ')}`,
				});
			}
		}
		const cells = tableCells(cls, level);
		if (level === cls.subclassLevel && !cells.some((c) => c.base === cls.subclassName) && cls.subclasses?.length) {
			cells.unshift({ label: cls.subclassName, base: cls.subclassName });
		}
		for (const cell of cells) {
			const feature = cls.features.find((f) => f.name === cell.base);
			if (feature && replaced.has(feature.name)) continue;
			if (cell.base === ASI) {
				entries.push({ key: `asi-${level}`, name: ASI, label: ASI, description: feature?.description || '', kind: 'asi', level, repeat: seen.has(cell.base) });
			} else if (feature?.name === cls.subclassName && level === cls.subclassLevel) {
				entries.push({ key: `pick-${level}`, name: feature.name, label: feature.name, description: feature.description, kind: 'subclassPick', level });
			} else {
				const optional = !!feature?.optional;
				entries.push({
					key: `${cell.label}-${level}`,
					name: cell.base,
					label: cell.label,
					description: feature ? feature.description : '',
					kind: 'class',
					level,
					optional,
					enabled: !optional || enabledOptionals.has(feature.name),
					options: feature?.options,
					choices: choicesFor(character, level, cell.base), spellChoices: spellChoicesFor(character, level, cell.base),
					repeat: seen.has(cell.base) && !!feature,
				});
			}
			seen.add(cell.base);
		}
		// Optional features the class table doesn't list (e.g. the cleric's Blessed Strikes) still get a card at their level.
		cls.features.filter((f) => f.optional && f.levels.includes(level) && !cells.some((c) => c.base === f.name)).forEach((f) => {
			entries.push({
				key: `${f.name}-${level}`, name: f.name, label: f.name, description: f.description, kind: 'class', level, optional: true,
				enabled: enabledOptionals.has(f.name), options: f.options, choices: choicesFor(character, level, f.name), spellChoices: spellChoicesFor(character, level, f.name), repeat: false,
			});
		});
		if (sub) {
			sub.features.filter((f) => f.level === level && !replaced.has(f.name)).forEach((f) => entries.push({
				key: `sub-${f.name}-${level}`,
				name: f.name,
				label: f.name,
				description: f.description,
				kind: 'subclass',
				level,
				source: sub.homebrew ? `Homebrew: ${sub.name}` : sub.name, homebrew: !!sub.homebrew,
				options: f.options,
				choices: choicesFor(character, level, f.name), spellChoices: spellChoicesFor(character, level, f.name),
			}));
		}
		levels.push({ level, proficiencyBonus: Math.ceil(level / 4) + 1, entries });
	}
	return levels;
}

// ---- Counts and option lists -----------------------------------------------------------------

// How many picks a choice allows at the character's level: a number, a step map { 3: 2, 10: 3 }
// (the value at the highest key <= level), or { column: 'Invocations Known' } read from the class table.
export function resolveCount(def, character) {
	const c = def.count;
	const level = levelOf(character);
	if (c == null) return 1;
	if (typeof c === 'number') return c;
	if (c.column) {
		const cls = getClass2014(character);
		const idx = cls?.table.columns.findIndex((x) => x.replace(/\s+/g, ' ').trim() === c.column) ?? -1;
		return idx >= 0 ? Number(cls.table.rows[level - 1]?.[idx]) || 0 : 0;
	}
	return stepValue(c, level);
}

// { 3: 2, 10: 3 } at level 12 -> 3 (the value of the highest key not above the level), 0 below the first key.
function stepValue(map, level) {
	const keys = Object.keys(map).map(Number).filter((k) => k <= level).sort((a, b) => b - a);
	return keys.length ? map[keys[0]] : 0;
}

// Highest spell level the class can cast at the character's level, from its table (0 if it doesn't cast).
export function getMaxCastableLevel(character) {
	const cls = getClass2014(character);
	if (!cls) return 0;
	const row = cls.table.rows[levelOf(character) - 1] || [];
	const pact = cls.table.columns.findIndex((c) => /^Slot Level$/i.test(c.trim()));
	if (pact >= 0) return parseInt(row[pact], 10) || 0;
	let max = 0;
	cls.table.columns.forEach((c, i) => {
		const m = c.match(/Spell Slots per Spell Level (\d)(?:st|nd|rd|th)$/);
		if (m && /\d/.test(row[i] || '') && Number(row[i]) > 0) max = Math.max(max, Number(m[1]));
	});
	return max;
}

// Options parsed from another feature of the class or chosen subclass (e.g. "Arcane Shot Options").
function findFeatureOptions(character, featureName) {
	const sub = getSubclass(character);
	const cls = getClass2014(character);
	const f = sub?.features.find((x) => x.name === featureName) || cls?.features.find((x) => x.name === featureName);
	return f?.options || [];
}

const prereqLevel = (text) => {
	const m = String(text || '').match(/(\d+)(?:st|nd|rd|th)[ -]level/i);
	return m ? Number(m[1]) : 0;
};

// Everything a choice can be picked from, as [{ name, description, group?, label? }].
export function getChoiceOptions(def, entry, character) {
	const level = levelOf(character);
	let list;
	if (def.spells) {
		const { classes = 'any', levels = 'castable', maxByLevel, school } = def.spells;
		// Subclass casters (Eldritch Knight, Arcane Trickster) give their own level cap; full casters use their table.
		const max = maxByLevel ? stepValue(maxByLevel, level) : getMaxCastableLevel(character);
		const allowed = (l) => (Array.isArray(levels) ? levels.includes(l) : levels === 'leveled' ? l >= 1 && l <= max : l <= max);
		list = spellIndex
			.filter((s) => allowed(s.level) && (!school || s.school === school) && (classes === 'any' || s.classes.some((c) => classes.includes(c))))
			.map((s) => ({ name: s.name, label: `${s.name} (${s.level === 0 ? 'cantrip' : `level ${s.level}`}, ${s.school})`, group: s.level === 0 ? 'Cantrips' : `Level ${s.level}` }));
	} else if (def.options === 'list:maneuvers') {
		list = maneuvers;
	} else if (def.options === 'list:disciplines') {
		list = disciplines.filter((d) => prereqLevel(d.prerequisite) <= level);
	} else if (def.options === 'list:kensei-weapons') {
		// Any simple or martial weapon without the heavy or special property, plus the longbow.
		list = getEditionData(character.edition).equipment.weapons
			.filter((w) => /^(Simple|Martial)$/.test(w.category) && w.name !== 'Net' && (w.name === 'Longbow' || !(w.properties || []).some((p) => /^(Heavy|Special)/i.test(p))))
			.map((w) => ({ name: w.name, description: `${w.category} ${w.kind} weapon` }));
	} else if (def.options === 'list:martial-weapons') {
		list = getEditionData(character.edition).equipment.weapons
			.filter((w) => w.category === 'Martial')
			.map((w) => ({ name: w.name, description: `Martial ${w.kind.toLowerCase()} weapon` }));
	} else if (def.options === 'list:infusions') {
		list = infusions.filter((i) => !i.minLevel || i.minLevel <= level);
	} else if (def.options === 'list:invocations') {
		const pact = getChoiceValues(character).pactBoon;
		list = invocations.filter((i) => (!i.minLevel || i.minLevel <= level) && (!i.pact || pact === `Pact of the ${i.pact}`));
	} else if (Array.isArray(def.options)) {
		list = def.options.map((o) => (typeof o === 'string' ? { name: o } : o));
	} else {
		const seen = new Set();
		const own = def.optionsFrom ? findFeatureOptions(character, def.optionsFrom) : entry?.options || [];
		list = own
			.filter((o) => o.source !== 'UA')
			.filter((o) => (seen.has(o.name) ? false : seen.add(o.name)))
			.filter((o) => !o.prerequisite || prereqLevel(o.prerequisite) <= level);
	}
	return def.exclude ? list.filter((o) => !def.exclude.includes(o.name)) : list;
}

export function getOptionDescription(def, entry, character, value) {
	const hit = getChoiceOptions(def, entry, character).find((o) => o.name === value);
	if (!hit) return '';
	return [hit.prerequisite ? `Prerequisite: ${hit.prerequisite}` : '', hit.description || ''].filter(Boolean).join('\n');
}

// ---- Ability score improvements and feats ----------------------------------------------------

// Value shape: { type: 'two', a } | { type: 'split', a, b } | { type: 'feat', feat, ability? }
export function getAsiLevels(character) {
	const cls = getClass2014(character);
	if (!cls) return [];
	const lv = levelOf(character);
	return cls.table.rows.map((_, i) => i + 1).filter((l) => l <= lv && tableCells(cls, l).some((c) => c.base === ASI));
}

// Feats taken in place of an Ability Score Improvement, in every class.
export function getChosenFeats(character) {
	return getClassViews(character).flatMap((view) => {
		const values = getChoiceValues(view);
		return getAsiLevels(view).map((l) => values[`asi-${l}`]).filter((v) => v?.type === 'feat' && v.feat).map((v) => v.feat);
	});
}

// { bonuses: {str: n...}, cap: {str: 20...} } from ASI picks, half-feats, and fixed class features, in every class.
export function getClassAbilityEffects(character) {
	const bonuses = Object.fromEntries(ABILITY_KEYS.map((k) => [k, 0]));
	const cap = Object.fromEntries(ABILITY_KEYS.map((k) => [k, 20]));
	if (character.edition !== '2014') return { bonuses, cap };
	getClassViews(character).forEach((view) => {
		const one = classAbilityEffectsOf(view);
		ABILITY_KEYS.forEach((k) => { bonuses[k] += one.bonuses[k]; cap[k] = Math.max(cap[k], one.cap[k]); });
	});
	return { bonuses, cap };
}

function classAbilityEffectsOf(character) {
	const bonuses = Object.fromEntries(ABILITY_KEYS.map((k) => [k, 0]));
	const cap = Object.fromEntries(ABILITY_KEYS.map((k) => [k, 20]));
	const values = getChoiceValues(character);
	getAsiLevels(character).forEach((l) => {
		const v = values[`asi-${l}`];
		if (!v) return;
		if (v.type === 'two' && v.a) bonuses[v.a] += 2;
		if (v.type === 'split') { if (v.a) bonuses[v.a] += 1; if (v.b && v.b !== v.a) bonuses[v.b] += 1; }
		if (v.type === 'feat' && v.feat) {
			const inc = getEditionData(character.edition).feats.find((f) => f.name === v.feat)?.abilityIncrease;
			// feats that raise a single fixed score apply it automatically; others use the player's pick
			const key = inc && inc.options.length === 1 ? inc.options[0] : v.ability;
			if (inc && key && inc.options.includes(key)) bonuses[key] += inc.amount || 1;
		}
	});
	// Fixed increases from class features
	if (info(character).className === 'Barbarian' && levelOf(character) >= 20) {
		bonuses.str += 4; bonuses.con += 4; cap.str = 24; cap.con = 24;
	}
	return { bonuses, cap };
}

// ---- Skills --------------------------------------------------------------------------------

export function getClassSkillPool(character, def) {
	const cls = getClass2014(character);
	const all = skills.map((s) => s.name);
	if (def.from === 'any') return all;
	if (Array.isArray(def.from)) return def.from;
	const list = cls?.skillChoices?.from;
	return !list || list === 'any' ? all : list;
}

export function getActiveChoiceDefs(character) {
	const lv = levelOf(character);
	const enabled = new Set(getEnabledOptionals(character));
	const values = getChoiceValues(character);
	return getChoiceDefs(character).filter((d) => d.level <= lv && (!d.optionalFeature || enabled.has(d.optionalFeature)) && isVisible(d, values));
}

// Weapons the character is proficient with because of a choice (a subclass that lets you pick a martial weapon), in every class.
export function getChoiceWeaponProficiencies(character) {
	if (character.edition !== '2014') return [];
	return getClassViews(character).flatMap((view) => {
		const values = getChoiceValues(view);
		return getActiveChoiceDefs(view).filter((d) => d.grantsWeaponProficiency).map((d) => values[d.id]).filter(Boolean);
	});
}

// Armor and weapon proficiencies the chosen subclasses add on top of the classes', as text ('' when none).
export function getSubclassProficiencyText(character) {
	if (character.edition !== '2014') return { armor: '', weapons: '' };
	const armor = [...new Set(getClassViews(character).map((view) => getSubclass(view)?.grants?.armor).filter(Boolean))];
	return { armor: armor.join(', '), weapons: getChoiceWeaponProficiencies(character).join(', ') };
}

// Skills picked in class choices, in every class.
export function getChoiceSkills(character) {
	const out = [];
	getClassViews(character).forEach((view) => {
		const values = getChoiceValues(view);
		getActiveChoiceDefs(view).filter((d) => d.kind === 'skill' || d.kind === 'skills').forEach((d) => {
			const v = values[d.id];
			(Array.isArray(v) ? v : [v]).filter(Boolean).forEach((s) => out.push(s));
		});
	});
	return [...out, ...getAsiSkilled(character).skills];
}

// Skills and tools picked for the Skilled feat taken at an Ability Score Improvement, in every class.
export function getAsiSkilled(character) {
	const out = { skills: [], tools: [] };
	getClassViews(character).forEach((view) => {
		const values = getChoiceValues(view);
		getAsiLevels(view).forEach((l) => {
			const v = values[`asi-${l}`];
			if (v?.type !== 'feat' || v.feat !== 'Skilled') return;
			const { skills, tools } = splitSkilled(v.skilled);
			out.skills.push(...skills);
			out.tools.push(...tools);
		});
	});
	return out;
}

export function getChoiceLanguages(character) {
	return getClassViews(character).flatMap((view) => {
		const values = getChoiceValues(view);
		return getActiveChoiceDefs(view).filter((d) => d.kind === 'languages').flatMap((d) => values[d.id] || []);
	});
}

export { allLanguages };

export function getExpertiseSkills(character) {
	const out = [];
	getClassViews(character).forEach((view) => {
		const values = getChoiceValues(view);
		getActiveChoiceDefs(view).filter((d) => d.kind === 'expertise').forEach((d) => { (values[d.id] || []).forEach((sk) => out.push(sk)); });
	});
	return out;
}

// Names of everything the character has picked in dropdowns, as "Feature: choice" lines for the sheet (every class; a
// multiclassed character's lines say which class they belong to).
export function getChoiceSummaries(character) {
	const views = getClassViews(character);
	return views.flatMap((view) => choiceSummariesOf(view).map((line) => (views.length > 1 ? `${view.classInfo.className}: ${line}` : line)));
}

function choiceSummariesOf(character) {
	const values = getChoiceValues(character);
	const lines = [];
	const sub = info(character).subclass;
	if (sub && getSubclass(character)) lines.push(`${getClass2014(character).subclassName}: ${sub}${getSubclass(character).homebrew ? ' (Homebrew)' : ''}`);
	getActiveChoiceDefs(character).forEach((d) => {
		const v = values[d.id];
		if (!v || (Array.isArray(v) && !v.length)) return;
		lines.push(`${d.feature}: ${Array.isArray(v) ? v.join(', ') : v}`);
	});
	getAsiLevels(character).forEach((l) => {
		const v = values[`asi-${l}`];
		if (v?.type === 'feat' && v.feat) lines.push(`Feat (level ${l}): ${v.feat}${v.feat === 'Skilled' && (v.skilled || []).length ? ` (${v.skilled.join(', ')})` : ''}`);
	});
	return lines;
}

// Everything the classes have given the character so far, for the sheet's feature list:
// [{ name, label, description }] with the subclass first, then features by level (repeats merged), then ASI feats.
// A multiclassed character gets each class's list in turn, the entries marked with their class.
export function getSheetFeatures(character) {
	const views = getClassViews(character);
	if (views.length === 1) return sheetFeaturesOf(character);
	return views.flatMap((view) => sheetFeaturesOf(view).map((f) => ({ ...f, name: `${view.classInfo.className}:${f.name}`, label: `${f.label} (${view.classInfo.className})` })));
}

function sheetFeaturesOf(character) {
	const cls = getClass2014(character);
	if (!cls) return [];
	const values = getChoiceValues(character);
	const sub = getSubclass(character);
	const out = new Map();
	if (sub) out.set(cls.subclassName, { name: cls.subclassName, label: `${cls.subclassName}: ${sub.name}${sub.homebrew ? ' (Homebrew)' : ''}`, description: `${sub.homebrew ? 'HOMEBREW (not official D&D content). ' : ''}${sub.summary}` });
	getLevelEntries(character).forEach((lv) => lv.entries.forEach((e) => {
		if (e.kind === 'asi' || e.kind === 'subclassPick' || e.enabled === false) return;
		const picked = (e.choices || []).map((def) => {
			const v = values[def.id];
			if (!v || (Array.isArray(v) && !v.length)) return '';
			const text = Array.isArray(v) ? v.join(', ') : v;
			const detail = def.kind === 'option' && !def.spells ? getOptionDescription(def, e, character, v) : '';
			return `${def.label}: ${text}${detail ? ` — ${detail}` : ''}`;
		}).filter(Boolean);
		const prev = out.get(e.name);
		const description = [picked.join('\n'), e.description].filter(Boolean).join('\n\n');
		out.set(e.name, { name: e.name, label: e.label, description: prev ? `${prev.description}${picked.length && prev.description !== description ? `\n\n${picked.join('\n')}` : ''}` : description });
	}));
	const feats = getEditionData(character.edition).feats;
	getChosenFeats(character).forEach((name) => {
		const f = feats.find((x) => x.name === name);
		out.set(`feat:${name}`, { name, label: `${name} (feat)`, description: f ? f.description : '' });
	});
	return [...out.values()];
}

export const emptyClassInfo ={ className: '', level: 1, subclass: '', optionalFeatures: [], choices: {} };
