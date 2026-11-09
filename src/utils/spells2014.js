// Spells for 2014 characters: what the Spells step offers, what has been picked, and the spell
// records the sheet and PDF need. The picks themselves live in character.classInfo.choices (same
// store as the other class choices); this module only reads them. A multiclassed character picks spells class by class: the
// functions that take one class (getPreparedLimit2014, getPreparedOptions, getPreparedSpells) are given a class view
// (see multiclass.js); the ones that cover the character combine all of its classes.
import spellIndex from '../data/2014/spellIndex';
import { getAbilityMods, getClass, getClassLevel, getClassSpellcastingStats } from './characterCalc';
import { getClassViews } from './multiclass';
import { getRaceChoices, getRaceSpellInfo } from './raceChoices';
import { getFeatGrantedSpells } from './featSpells';
import {
	getActiveChoiceDefs, getChoiceOptions, getChoiceValues, getMaxCastableLevel, getSubclass, resolveCount,
} from './classChoices';

const byName = new Map(spellIndex.map((s) => [s.name.toLowerCase(), s]));
export const findSpell = (name) => byName.get(String(name).toLowerCase()) || null;
export const levelTitle = (l) => (l === 0 ? 'Cantrips' : `Level ${l}`);

// ---- Spell details (loaded on demand: the file is large) -------------------------------------------

let detailsCache = null;
let detailsPromise = null;
export function loadSpellDetails() {
	if (!detailsPromise) {
		detailsPromise = import('../data/2014/spellDetails')
			.then((m) => { detailsCache = m.default; return detailsCache; })
			// a failed chunk load (offline, or a stale page after a new deploy) must not be cached: the next visit retries
			.catch((error) => { detailsPromise = null; throw error; });
	}
	return detailsPromise;
}
export const getLoadedSpellDetails = () => detailsCache;

// ---- Which classes get a Spells step -----------------------------------------------------------

const spellDefs = (character) => getActiveChoiceDefs(character).filter((d) => d.kind === 'spells');

// Does this class (or class view) have spells to choose?
const classHasSpells = (view) => {
	const cls = getClass(view);
	return !!cls && (!!cls.spellcastingAbility || spellDefs(view).some((d) => resolveCount(d, view) > 0));
};

export function hasSpellsPage2014(character) {
	if (!character || character.edition !== '2014') return false;
	if (!getClass(character)) return false;
	const race = getRaceSpellInfo(character);
	return getClassViews(character).some(classHasSpells) || race.fixed.length > 0 || getFeatGrantedSpells(character).length > 0;
}

// ---- Prepared spells (artificer, cleric, druid, paladin, wizard) ------------------------------------------

export function getPreparedLimit2014(character) {
	const cls = getClass(character);
	const stats = cls && getClassSpellcastingStats(character);
	if (!stats) return 0;
	const mod = getAbilityMods(character)[stats.abilityKey];
	const level = getClassLevel(character);
	if (['Cleric', 'Druid', 'Wizard'].includes(cls.name)) return Math.max(1, mod + level);
	if (cls.name === 'Paladin') return level >= 2 ? Math.max(1, mod + Math.floor(level / 2)) : 0;
	if (cls.name === 'Artificer') return Math.max(1, mod + Math.floor(level / 2));
	return 0;
}

const optionOf = (s) => ({ name: s.name, label: `${s.name} (level ${s.level}, ${s.school})`, group: levelTitle(s.level) });

export function getPreparedOptions(character) {
	const cls = getClass(character);
	if (!cls) return [];
	if (cls.name === 'Wizard') {
		// wizards prepare from the spellbook
		const book = getChoiceValues(character).spellbook || [];
		return book.map(findSpell).filter((s) => s && s.level >= 1).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name)).map(optionOf);
	}
	const max = getMaxCastableLevel(character);
	return spellIndex.filter((s) => s.level >= 1 && s.level <= max && s.classes.includes(cls.name)).map(optionOf);
}

// Prepared picks that are still valid (a spell removed from the spellbook can no longer be prepared).
export function getPreparedSpells(character) {
	const picked = getChoiceValues(character).prepared || [];
	const valid = new Set(getPreparedOptions(character).map((o) => o.name));
	return picked.filter((n) => valid.has(n));
}

// ---- Always-prepared spells (domain, oath and circle spells) ---------------------------------------

function parseSpellNames(cell) {
	const out = [];
	cell.split(/,\s*(?:and\s+)?/).forEach((part) => {
		const p = part.trim();
		if (!p) return;
		if (findSpell(p)) { out.push(findSpell(p).name); return; }
		p.split(/\s+and\s+/).forEach((q) => { if (findSpell(q.trim())) out.push(findSpell(q.trim()).name); });
	});
	return out;
}

// Always-prepared spells of every class the character has.
export function getAlwaysPrepared(character) {
	const all = getClassViews(character).flatMap(alwaysPreparedOf);
	return all.filter((r, i) => all.findIndex((x) => x.name === r.name) === i);
}

function alwaysPreparedOf(character) {
	const sub = getSubclass(character);
	if (!sub) return [];
	const level = getClassLevel(character);
	const terrain = getChoiceValues(character).landTerrain;
	const results = [];
	sub.features.filter((f) => /Spells$/.test(f.name) && f.level <= level).forEach((f) => {
		let lines = f.description.split('\n');
		// Circle of the Land lists one table per terrain; keep only the chosen one.
		if (f.name === 'Circle Spells') {
			const start = lines.findIndex((l) => terrain && l.trim().toLowerCase() === terrain.toLowerCase());
			if (start < 0) return;
			lines = lines.slice(start + 1);
			const end = lines.findIndex((l) => !/^\d+(?:st|nd|rd|th)\s*\|/.test(l) && !/\|/.test(l));
			lines = end < 0 ? lines : lines.slice(0, end);
		}
		lines.forEach((l) => {
			const m = l.match(/^(\d+)(?:st|nd|rd|th)\s*\|\s*(.+)$/);
			if (m && Number(m[1]) <= level) parseSpellNames(m[2]).forEach((name) => results.push({ name, from: sub.name }));
		});
	});
	// subclasses whose spells depend on a choice (Elemental Bloodline's ancestor): { choice, byChoice: { option: { level: [spells] } } }
	if (sub.bonusSpells) {
		const table = sub.bonusSpells.byChoice[getChoiceValues(character)[sub.bonusSpells.choice]];
		Object.entries(table || {}).forEach(([lv, names]) => {
			if (Number(lv) <= level) names.forEach((n) => { const s = findSpell(n); if (s) results.push({ name: s.name, from: sub.name }); });
		});
	}
	return results.filter((r, i) => results.findIndex((x) => x.name === r.name) === i);
}

// ---- Sections shown on the Spells step -------------------------------------------------------------------------

// [{ id, choiceId, classIndex, slot, className, title, subtitle, note, count, options, value, prepared? }] in display order.
// `id` is unique across the character; `choiceId` is the key the picks are stored under in that class's choices (classIndex 0 is
// the first class, `slot` is where a later class sits in classInfo.multiclass.classes, -1 for the first class).
export function getSpellSections(character) {
	if (!hasSpellsPage2014(character)) return [];
	const views = getClassViews(character);
	const multi = views.length > 1;
	return views.flatMap((view, vi) => {
		if (!classHasSpells(view)) return [];
		const className = getClass(view).name;
		const values = getChoiceValues(view);
		const mark = (section) => ({
			...section,
			choiceId: section.id,
			id: multi ? `${vi}:${section.id}` : section.id,
			classIndex: vi,
			slot: view.__slot ?? -1,
			className,
			title: multi ? `${section.title} (${className})` : section.title,
			order: vi * 10 + section.order,
		});
		const sections = spellDefs(view)
			.map((def) => ({
				id: def.id,
				title: def.id === 'cantrips' ? 'Cantrips' : def.id === 'spellsKnown' ? 'Spells known' : def.id === 'spellbook' ? 'Spellbook' : def.label,
				subtitle: def.id === 'cantrips' || def.id === 'spellsKnown' || def.id === 'spellbook' ? '' : `${def.feature}${def.level > 1 ? ` (level ${def.level})` : ''}`,
				note: def.countNote || '',
				count: resolveCount(def, view),
				options: getChoiceOptions(def, null, view),
				value: values[def.id] || [],
				// a wizard can keep adding spells to the spellbook, and cantrips, past the number the class gives
				openEnded: def.id === 'spellbook' || (def.id === 'cantrips' && className === 'Wizard'),
				order: def.id === 'cantrips' ? 0 : def.id === 'spellsKnown' || def.id === 'spellbook' ? 1 : 3 + def.level / 100,
			}))
			.filter((s) => s.count > 0)
			.map(mark);
		const limit = getPreparedLimit2014(view);
		if (limit > 0) {
			sections.push(mark({
				id: 'prepared',
				title: 'Prepared spells',
				subtitle: className === 'Wizard' ? 'Chosen from your spellbook' : `From the ${className} spell list`,
				note: 'You can change these after every long rest.',
				count: limit,
				options: getPreparedOptions(view),
				value: getPreparedSpells(view),
				order: 2,
				prepared: true,
			}));
		}
		return sections;
	}).sort((a, b) => a.order - b.order);
}

// Cantrips granted by the character's race (High Elf, Fairy...): picked on the Race page, stored with the race's choices.
// Same shape as the sections above so the same spell picker can show them.
export function getRaceSpellSections(character) {
	const raceValues = getRaceChoices(character);
	return getRaceSpellInfo(character).pickDefs.map((def) => ({
		id: def.id,
		title: def.trait || def.label,
		subtitle: `Racial cantrip${def.count > 1 ? 's' : ''}`,
		note: '',
		count: def.count,
		options: spellIndex.filter((sp) => sp.level === 0 && (def.classes === 'any' || sp.classes.some((c) => def.classes.includes(c)))).map(optionOf),
		value: raceValues[def.id] || [],
	}));
}

// ---- What the character has, for the sheet and PDF -------------------------------------------------------

export function getChosenSpellNames(character) {
	if (character.edition !== '2014') return [];
	const names = new Set();
	// a wizard's spellbook is reference, not what they can cast today: the sheet lists cantrips and prepared spells
	getSpellSections(character).filter((s) => s.choiceId !== 'spellbook').forEach((s) => (s.value || []).forEach((n) => names.add(n)));
	getFeatGrantedSpells(character).forEach((s) => names.add(s.name));
	getRaceSpellSections(character).forEach((s) => (s.value || []).forEach((n) => { if (s.options.some((o) => o.name === n)) names.add(n); }));
	getAlwaysPrepared(character).forEach((s) => names.add(s.name));
	getRaceSpellInfo(character).fixed.forEach((s) => names.add(s.name));
	return [...names];
}

// Full records (index fields plus details when they have been loaded), cantrips first.
export function getSelectedSpells2014(character) {
	const details = getLoadedSpellDetails();
	// which class each spell was picked for (its spellcasting ability, save DC and attack bonus are that class's)
	const casterOf = new Map();
	getSpellSections(character).filter((s) => s.choiceId !== 'spellbook').forEach((s) => (s.value || []).forEach((n) => { if (!casterOf.has(n)) casterOf.set(n, s.classIndex); }));
	getClassViews(character).forEach((view, vi) => alwaysPreparedOf(view).forEach((a) => { if (!casterOf.has(a.name)) casterOf.set(a.name, vi); }));
	return getChosenSpellNames(character)
		.map(findSpell).filter(Boolean)
		.map((s) => {
			const d = details?.[s.name] || {};
			return {
				name: s.name, level: s.level, school: s.school, classes: s.classes, casterIndex: casterOf.get(s.name),
				castingTime: d.castingTime || '', range: d.range || '', components: d.components || '', duration: d.duration || '',
				concentration: !!d.concentration, ritual: !!d.ritual, description: d.description || '', higherLevels: d.higherLevels || '',
			};
		})
		.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}
