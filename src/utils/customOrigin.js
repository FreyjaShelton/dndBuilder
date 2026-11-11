// "Customizing Your Origin" (Tasha's Cauldron of Everything, chapter 1), 2014 only. A race that has the Ability Score
// Increase trait can be customized:
//   - ability score increases: each increase goes to any ability of your choice (never two increases on the same ability)
//   - languages: each language in the Languages trait can be replaced with any listed language
//   - proficiencies: each racial proficiency can be swapped, following the Proficiency Swaps table:
//       Skill -> skill | Armor -> simple/martial weapon or tool | Simple weapon -> simple weapon or tool
//       Martial weapon -> simple/martial weapon or tool | Tool -> tool or simple weapon
//   - personality: nothing to calculate; the race's personality suggestions can simply be ignored
// This module holds the rules; raceChoices.js applies them to a character. The customization is stored on
// character.race.customize = { on, asi: [ability per racial increase], languages: { [language]: replacement },
// swaps: { [proficiency id]: 'kind:Name' } } where kind is skill, weapon or tool.
import skills from '../data/skills';
import { getEditionData } from '../data';
import { artisanTools, gamingSets, musicalInstruments } from '../data/toolLists';

const SKILL_NAMES = skills.map((s) => s.name);
const OTHER_TOOLS = ['Disguise kit', 'Forgery kit', 'Herbalism kit', "Navigator's tools", "Poisoner's kit", "Thieves' tools", 'Vehicles (land)', 'Vehicles (water)'];
export const ALL_TOOLS = [...artisanTools, ...gamingSets, ...musicalInstruments, ...OTHER_TOOLS];

// The Skilled feat: "any combination of three skills or tools". splitSkilled sorts a stored pick list into the two.
export const SKILLED_COUNT = 3;
export const SKILLED_FROM = [...SKILL_NAMES, ...ALL_TOOLS];
export function splitSkilled(picks) {
	const list = (Array.isArray(picks) ? picks : []).filter((n) => SKILLED_FROM.includes(n)).slice(0, SKILLED_COUNT);
	return { skills: list.filter((n) => SKILL_NAMES.includes(n)), tools: list.filter((n) => !SKILL_NAMES.includes(n)) };
}

export const ARMOR_TYPES = ['Light', 'Medium', 'Heavy'];

// What each kind of racial proficiency may be swapped for: which kinds, and (for weapons) which categories.
const RULES = {
	skill: { skill: true },
	armor: { weapon: ['Simple', 'Martial'], tool: true },
	simple: { weapon: ['Simple'], tool: true },
	martial: { weapon: ['Simple', 'Martial'], tool: true },
	tool: { weapon: ['Simple'], tool: true },
};

// The rule key for a racial proficiency: { kind: 'skill' | 'tool' | 'armor' | 'weapon', name, category? }.
export const ruleFor = (prof) => (prof.kind === 'weapon' ? (prof.category === 'Martial' ? 'martial' : 'simple') : prof.kind);

// What the replacement of a racial proficiency can be: { skills: [names], weapons: [names], tools: [names] }.
export function getSwapOptions(prof, edition = '2014') {
	const rule = RULES[ruleFor(prof)];
	const weapons = getEditionData(edition).equipment.weapons;
	return {
		skills: rule.skill ? SKILL_NAMES : [],
		weapons: rule.weapon ? weapons.filter((w) => rule.weapon.includes(w.category)).map((w) => w.name) : [],
		tools: rule.tool ? ALL_TOOLS : [],
	};
}

// A stored swap ('skill:Performance') is only honored if the table allows it for this proficiency.
export function parseSwap(prof, value, edition = '2014') {
	if (!value || typeof value !== 'string' || !value.includes(':')) return null;
	const [kind, ...rest] = value.split(':');
	const name = rest.join(':');
	const options = getSwapOptions(prof, edition);
	if (kind === 'skill' && options.skills.includes(name)) return { kind, name };
	if (kind === 'weapon' && options.weapons.includes(name)) return { kind, name };
	if (kind === 'tool' && options.tools.includes(name)) return { kind, name };
	return null;
}

export const profId = (prof) => `${prof.kind}:${prof.name}`;

// Weapons a race trains you in, from the text of its traits ("proficiency with the longsword, shortsword..."):
// [{ kind: 'weapon', name, category }]. Same text matching the sheet has always used for racial weapon training.
export function parseRacialWeapons(texts, edition = '2014') {
	const text = texts.filter((t) => /proficiency with/i.test(t)).map((t) => t.toLowerCase()).join(' ');
	if (!text) return [];
	return getEditionData(edition).equipment.weapons
		.filter((w) => text.includes(w.name.toLowerCase()) || text.includes(`${w.name.toLowerCase()}s`))
		.map((w) => ({ kind: 'weapon', name: w.name, category: w.category }));
}

// Armor a race trains you in ("proficiency with light and medium armor"): [{ kind: 'armor', name: 'Light' }].
export function parseRacialArmor(texts) {
	const found = [];
	texts.filter((t) => /proficiency with/i.test(t) && /armor/i.test(t)).forEach((t) => {
		t.split(/[.;]\s+/).filter((s) => /proficiency with/i.test(s) && /armor/i.test(s)).forEach((s) => {
			ARMOR_TYPES.forEach((type) => { if (new RegExp(`\\b${type}\\b`, 'i').test(s) && !found.includes(type)) found.push(type); });
		});
	});
	return found.map((name) => ({ kind: 'armor', name }));
}

// Applies the swaps to a list of racial proficiencies. Returns what the character ends up with:
// { skills, tools, weapons, armor } (names). Proficiencies without a valid swap are kept as they are.
export function applySwaps(profs, swaps = {}, edition = '2014') {
	const out = { skills: [], tools: [], weapons: [], armor: [] };
	const put = (kind, name) => {
		const list = kind === 'skill' ? out.skills : kind === 'tool' ? out.tools : kind === 'weapon' ? out.weapons : out.armor;
		if (!list.includes(name)) list.push(name);
	};
	profs.forEach((p) => {
		const swap = parseSwap(p, swaps[profId(p)], edition);
		if (swap) put(swap.kind, swap.name);
		else put(p.kind, p.name);
	});
	return out;
}

// Ability increases: assignments must be to distinct abilities. Returns the abilities used more than once.
export function duplicateAbilities(assignments) {
	const seen = new Set();
	const dups = new Set();
	(assignments || []).filter(Boolean).forEach((k) => { if (seen.has(k)) dups.add(k); seen.add(k); });
	return [...dups];
}
