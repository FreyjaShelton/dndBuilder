import { getCarriedGold, getClass, getHitPoints } from '../../utils/characterCalc';
import { splitGold } from '../../utils/currency';
import { seedItems } from './inventory';
import library from '../../utils/library';

// The sheet keeps its in-play state (HP, spent slots...) in the open character's library record, so it is saved on
// this device and follows the character to Google Drive.
export function loadSaved() {
	const record = library.getRecord(library.getActiveId());
	return record?.character ? record : null;
}

export function persist({ character, play }) {
	const id = library.getActiveId();
	if (id) library.saveRecord(id, { character, play, playBase: JSON.stringify(character) });
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
	};
}
