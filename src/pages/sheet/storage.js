import { getCarriedGold, getClass, getHitPoints } from '../../utils/characterCalc';
import { splitGold } from '../../utils/currency';
import { seedItems } from './inventory';

const KEY = 'dndBuilder.sheet.v1';

export function loadSaved() {
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch (e) {
		return null;
	}
}

export function persist(data) {
	try {
		window.localStorage.setItem(KEY, JSON.stringify(data));
	} catch (e) {
		// storage may be unavailable (private mode); the sheet still works for this session
	}
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
