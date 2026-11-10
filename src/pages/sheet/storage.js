import { getCarriedGold, getClass, getHitPoints } from '../../utils/characterCalc';
import { splitGold } from '../../utils/currency';
import { seedItems } from './inventory';
import library from '../../utils/library';

// The sheet keeps its in-play state (HP, spent slots...) in the open character's library record, so it is saved on
// this device and follows the character to Google Drive.
// Both take the character's id explicitly: the open character changes in the middle of a render cycle, and reading
// "the active character" at that moment would hand one character's sheet state to another.
export function loadSaved(id) {
	const record = library.getRecord(id);
	return record?.character ? record : null;
}

export function persist(id, { character, play }) {
	if (!id) return;
	library.saveFromSheet(id, { character, play, playBase: JSON.stringify(character) });
}

// Fresh in-play state for a character: full hit points, no spent resources.
export function defaultPlay(character) {
	return {
		hpCurrent: getClass(character) ? getHitPoints(character) : 0,
		hpTemp: 0,
		deathSaves: { successes: 0, failures: 0 },
		inspiration: false,
		hitDiceUsed: 0,
		slotsUsed: {},
		pactUsed: 0,
		concentration: '',
		conditions: [],
		notes: '',
		currency: { cp: 0, sp: 0, ep: 0, ...splitGold(getCarriedGold(character)), pp: 0 },
		rollMode: 'normal',
		items: seedItems(character),
		attuned: Array.isArray(character.equipment?.attuned) ? [...character.equipment.attuned] : [],
	};
}
