// Multiclassing for 2014 characters (Player's Handbook, chapter 6; the Artificer from Tasha's Cauldron of Everything).
//
// Storage: the first class stays in character.classInfo exactly as before. The classes gained after it live in
//   character.classInfo.multiclass = {
//     enabled: bool,          multiclassing is switched on
//     ignorePrereqs: bool,    the ability score prerequisites are not enforced
//     classes: [{ className, subclass, level, optionalFeatures, choices, hpRolls, skill, instrument }]
//   }
// Every class-by-class calculation in the app reads `character.classInfo`, so each class is handed to them as a "view": a copy of
// the character whose classInfo is that class. Calculations that cover the whole character (hit points, spell slots,
// proficiencies, ...) go through getClassViews and combine the views. Views are never stored.
import { ABILITY_KEYS, ABILITY_NAMES } from './abilityScore';

export const MAX_LEVEL = 20;
const clampLevel = (n) => Math.min(MAX_LEVEL, Math.max(1, Math.floor(Number(n)) || 1));

export const emptyExtraClass = (className = '') => ({
	className, subclass: '', level: 1, optionalFeatures: [], choices: {}, hpRolls: [], skill: '', instrument: '',
});

export const getMulticlass = (character) => {
	const mc = character?.classInfo?.multiclass;
	return { enabled: !!mc?.enabled, ignorePrereqs: !!mc?.ignorePrereqs, classes: Array.isArray(mc?.classes) ? mc.classes : [] };
};

const cache = new WeakMap();

function build(root) {
	const mc = root.classInfo && root.classInfo.multiclass;
	if (root.edition !== '2014' || !mc || !mc.enabled || !Array.isArray(mc.classes)) return [root];
	let left = MAX_LEVEL - clampLevel(root.classInfo.level);
	const views = [root];
	mc.classes.forEach((entry, slot) => {
		if (!entry || !entry.className || left <= 0) return;
		const level = Math.min(left, clampLevel(entry.level));
		left -= level;
		views.push({
			...root,
			classInfo: {
				...entry, level, choices: entry.choices || {}, optionalFeatures: entry.optionalFeatures || [], hpRolls: entry.hpRolls || [],
				hpMethod: root.classInfo.hpMethod, hpOverride: '',
			},
			__root: root, __index: views.length, __slot: slot,
		});
	});
	return views;
}

// [character, ...] — one entry per class the character has, the first class first. A character that is not multiclassed
// gets [character] back, so single-class code paths are unchanged.
export function getClassViews(character) {
	if (!character) return [];
	const root = character.__root || character;
	let views = cache.get(root);
	if (!views) { views = build(root); cache.set(root, views); }
	return views;
}

export const isMulticlassed = (character) => getClassViews(character).length > 1;
export const getRootCharacter = (character) => character.__root || character;
export const getClassLevelOf = (view) => clampLevel(view.classInfo?.level);
export const getTotalLevel = (character) => Math.min(MAX_LEVEL, getClassViews(character).reduce((sum, v) => sum + getClassLevelOf(v), 0));

// "Fighter 3 / Wizard 2"
export const getClassSummary = (character) => getClassViews(character)
	.filter((v) => v.classInfo.className)
	.map((v) => `${v.classInfo.className} ${getClassLevelOf(v)}`).join(' / ');

// ---- Prerequisites ---------------------------------------------------------------------------------------------------

// Ability score minimums (13) for a class you are taking or already have: all of them, or any one.
export const MULTICLASS_PREREQS = {
	Artificer: { mode: 'all', abilities: ['int'] },
	Barbarian: { mode: 'all', abilities: ['str'] },
	Bard: { mode: 'all', abilities: ['cha'] },
	Cleric: { mode: 'all', abilities: ['wis'] },
	Druid: { mode: 'all', abilities: ['wis'] },
	Fighter: { mode: 'any', abilities: ['str', 'dex'] },
	Monk: { mode: 'all', abilities: ['dex', 'wis'] },
	Paladin: { mode: 'all', abilities: ['str', 'cha'] },
	Ranger: { mode: 'all', abilities: ['dex', 'wis'] },
	Rogue: { mode: 'all', abilities: ['dex'] },
	Sorcerer: { mode: 'all', abilities: ['cha'] },
	Warlock: { mode: 'all', abilities: ['cha'] },
	Wizard: { mode: 'all', abilities: ['int'] },
};
export const PREREQ_MINIMUM = 13;

// "Strength 13 or Dexterity 13", "Dexterity 13 and Wisdom 13"
export function describePrereq(className) {
	const p = MULTICLASS_PREREQS[className];
	if (!p) return '';
	return p.abilities.map((k) => `${ABILITY_NAMES[k]} ${PREREQ_MINIMUM}`).join(p.mode === 'any' ? ' or ' : ' and ');
}

// scores: { str: 14, dex: 12, ... } (the final scores)
export function meetsPrereq(className, scores) {
	const p = MULTICLASS_PREREQS[className];
	if (!p) return true;
	const ok = (k) => (Number(scores?.[k]) || 0) >= PREREQ_MINIMUM;
	return p.mode === 'any' ? p.abilities.some(ok) : p.abilities.every(ok);
}

export const ABILITIES = ABILITY_KEYS;

// ---- What a later class gives (Multiclassing Proficiencies table) -----------------------------------------------------

const LIGHT_MEDIUM_SHIELDS = ['Light armor', 'Medium armor', 'Shields'];
const SIMPLE_MARTIAL = ['Simple weapons', 'Martial weapons'];
// skills: { count, from: 'any' | 'class' } — a pick made on the Class step;  instrument: a musical instrument pick
export const MULTICLASS_PROFICIENCIES = {
	Artificer: { armor: LIGHT_MEDIUM_SHIELDS, weapons: [], tools: ["Thieves' tools", "Tinker's tools"] },
	Barbarian: { armor: ['Shields'], weapons: SIMPLE_MARTIAL, tools: [] },
	Bard: { armor: ['Light armor'], weapons: [], tools: [], skills: { count: 1, from: 'any' }, instrument: true },
	Cleric: { armor: LIGHT_MEDIUM_SHIELDS, weapons: [], tools: [] },
	Druid: { armor: LIGHT_MEDIUM_SHIELDS, weapons: [], tools: [], note: 'Druids will not wear armor or use shields made of metal.' },
	Fighter: { armor: LIGHT_MEDIUM_SHIELDS, weapons: SIMPLE_MARTIAL, tools: [] },
	Monk: { armor: [], weapons: ['Simple weapons', 'Shortswords'], tools: [] },
	Paladin: { armor: LIGHT_MEDIUM_SHIELDS, weapons: SIMPLE_MARTIAL, tools: [] },
	Ranger: { armor: LIGHT_MEDIUM_SHIELDS, weapons: SIMPLE_MARTIAL, tools: [], skills: { count: 1, from: 'class' } },
	Rogue: { armor: ['Light armor'], weapons: [], tools: ["Thieves' tools"], skills: { count: 1, from: 'class' } },
	Sorcerer: { armor: [], weapons: [], tools: [] },
	Warlock: { armor: ['Light armor'], weapons: ['Simple weapons'], tools: [] },
	Wizard: { armor: [], weapons: [], tools: [] },
};

export const getMulticlassProficiencies = (className) => MULTICLASS_PROFICIENCIES[className] || { armor: [], weapons: [], tools: [] };

// The classes after the first, with what each one adds.
export const getExtraClassViews = (character) => getClassViews(character).slice(1);

// ---- Spell slots ----------------------------------------------------------------------------------------------------------

// How a class adds to the multiclass spellcaster level: its full level, half of it (rounded down), half (rounded up: the
// Artificer), or a third (Eldritch Knight and Arcane Trickster). Warlocks use Pact Magic, which is separate.
const CASTER_KIND = { Bard: 'full', Cleric: 'full', Druid: 'full', Sorcerer: 'full', Wizard: 'full', Paladin: 'half', Ranger: 'half', Artificer: 'halfUp', Warlock: 'pact' };
const THIRD_CASTER = { Fighter: 'Eldritch Knight', Rogue: 'Arcane Trickster' };

// The kind of caster a class is at its level (null while it has no Spellcasting feature yet).
export function casterKind(className, subclass, level) {
	const kind = CASTER_KIND[className];
	if (kind === 'half') return level >= 2 ? 'half' : null;
	if (kind) return kind;
	return THIRD_CASTER[className] && THIRD_CASTER[className] === subclass && level >= 3 ? 'third' : null;
}

export const casterLevelContribution = (kind, level) => {
	if (kind === 'full') return level;
	if (kind === 'half') return Math.floor(level / 2);
	if (kind === 'halfUp') return Math.ceil(level / 2);
	if (kind === 'third') return Math.floor(level / 3);
	return 0;
};

// Multiclass Spellcaster table: spell slots per spell level (1st-9th) by combined spellcaster level.
const T = (...rows) => rows;
const SLOT_ROWS = T(
	[2], [3], [4, 2], [4, 3], [4, 3, 2], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 2], [4, 3, 3, 3, 1], [4, 3, 3, 3, 2],
	[4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1],
	[4, 3, 3, 3, 2, 1, 1, 1, 1], [4, 3, 3, 3, 3, 1, 1, 1, 1], [4, 3, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 3, 2, 2, 1, 1],
);
export function multiclassSlots(casterLevel) {
	const row = SLOT_ROWS[Math.min(MAX_LEVEL, Math.max(0, casterLevel)) - 1] || [];
	return Object.fromEntries(Array.from({ length: 9 }, (_, i) => [i + 1, row[i] || 0]));
}

// The Eldritch Knight's and Arcane Trickster's own slots by class level (they are one-third casters on their own table).
const THIRD_ROWS = {
	3: [2], 4: [3], 5: [3], 6: [3], 7: [4, 2], 8: [4, 2], 9: [4, 2], 10: [4, 3], 11: [4, 3], 12: [4, 3], 13: [4, 3, 2], 14: [4, 3, 2],
	15: [4, 3, 2], 16: [4, 3, 3], 17: [4, 3, 3], 18: [4, 3, 3], 19: [4, 3, 3, 1], 20: [4, 3, 3, 1],
};
export function thirdCasterSlots(level) {
	const row = THIRD_ROWS[level] || [];
	return Object.fromEntries(Array.from({ length: 9 }, (_, i) => [i + 1, row[i] || 0]));
}
