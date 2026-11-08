import { getEditionData } from '../data';
import {
	getCantripsKnown, getClass, getLevel, getPreparedSpellsLimit, getSpellSlots,
} from './characterCalc';

export function isSpellcaster(character) {
	return !!getClass(character)?.spellcastingAbility;
}

// Every spell on the character's class list, cantrips first, then by level and name.
export function getClassSpells(character) {
	const cls = getClass(character);
	if (!cls) return [];
	return getEditionData(character.edition).spells.filter((s) => s.classes.includes(cls.name));
}

// Highest spell level the class has slots for at its current level.
export function getMaxSpellLevel(character) {
	const slots = getSpellSlots(character);
	if (!slots) return 0;
	if (slots.type === 'pact') return slots.level;
	return Math.max(0, ...Object.entries(slots.slots).filter(([, n]) => n > 0).map(([lvl]) => Number(lvl)));
}

export function getCantripLimit(character) {
	return getCantripsKnown(character);
}

export function getPreparedLimit(character) {
	return getPreparedSpellsLimit(character);
}

// Wizards keep a spellbook: six level 1 spells at level 1, plus two more per level after.
export function usesSpellbook(character) {
	return getClass(character)?.name === 'Wizard';
}

export function getSpellbookLimit(character) {
	return usesSpellbook(character) ? 6 + 2 * (getLevel(character) - 1) : 0;
}

const byName = (character) => {
	const all = getEditionData(character.edition).spells;
	return (name) => all.find((s) => s.name === name);
};

// Chosen cantrips and prepared spells as full records, in sheet order (cantrips, then level/name).
export function getSelectedSpells(character) {
	if (!isSpellcaster(character)) return [];
	const lookup = byName(character);
	const chosen = [...character.spells.cantrips, ...character.spells.prepared]
		.map(lookup).filter(Boolean).filter((s) => s.level <= getMaxSpellLevel(character));
	return chosen.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}
