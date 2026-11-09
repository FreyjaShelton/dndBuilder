import * as React from 'react';
import { DEFAULT_EDITION } from '../data';
import { migrateEquipment } from '../utils/equipment';
import library, { isMeaningful, newId } from '../utils/library';
import { startSync } from '../utils/cloud';
import { pendingSheetChanges } from '../pages/sheet/sheetSync';

const CharacterContext = React.createContext(null);

// Everything that depends on the edition's rules data. Switching edition resets these so a
// 2014 race/class/background can't leak into a 2024 character (or vice versa).
const editionDependentDefaults = {
	race: { name: '', subrace: '', version: '', abilityChoices: [], skillChoices: [], lineage: '', originFeat: '', choices: {} },
	classInfo: { className: '', level: 1, subclass: '', optionalFeatures: [], choices: {}, hpMethod: 'average', hpRolls: [], hpOverride: '' },
	background: {
		name: '', variant: '', choices: {}, customName: '', customSkills: [], customProficiency: '',
		abilityMode: 'twoOne', abilityPlus2: '', abilityPlus1: '', abilityPlus1b: '', originFeat: '',
		personalityTraits: '', ideals: '', bonds: '', flaws: '',
	},
	skills: { classChoices: [] },
	equipment: { selected: [], armor: '', shield: false, goldMethod: '', gold: '', kit: { choices: {}, picks: {} } },
	spells: { cantrips: [], prepared: [], spellbook: [] },
};

const initialCharacter = {
	edition: DEFAULT_EDITION,
	info: {
		name: '', player: '', alignment: '', age: '', height: '', weight: '',
		eyes: '', skin: '', hair: '', backstory: '',
	},
	abilities: {
		str: '', dex: '', con: '', int: '', wis: '', cha: '',
		generationMethod: '', rolls: [],
	},
	...editionDependentDefaults,
};

// Brings a character loaded from storage / Drive up to the current shape.
const prepare = (loaded) => (loaded && loaded.equipment
	? { ...loaded, equipment: migrateEquipment(loaded.equipment, loaded.edition || DEFAULT_EDITION) }
	: loaded);

// The dev server (npm start) comes with two finished level 20 characters, a Wizard and a Fighter (src/dev), so pages, the
// interactive sheet, swapping between characters and Drive sync can be tested without building one by hand. They are
// added to the library (once, if missing) like any saved character. Production builds never include them; set
// REACT_APP_BLANK_CHARACTER=true to start empty in dev.
const useDevCharacters = process.env.NODE_ENV === 'development' && process.env.REACT_APP_BLANK_CHARACTER !== 'true';

function seedDevCharacters() {
	const have = library.getIndex().entries;
	const list = require('../dev/testCharacters').DEV_CHARACTERS;
	list.forEach(({ id, character }) => {
		if (have[id]) return;
		library.createRecord({ character }, id);
		library.markFinalized(id); // they are finished characters
	});
	return list[0];
}

// What the app opens with: the character that was open last time, else a blank one (in dev, else the test Wizard).
function loadStart() {
	const first = useDevCharacters ? seedDevCharacters() : null;
	const id = library.getActiveId();
	const record = library.getRecord(id);
	if (record?.character) return { id, character: prepare(record.character) };
	if (first) return { id: first.id, character: first.character };
	return { id: newId(), character: initialCharacter };
}

export function CharacterProvider({ children }) {
	const [start] = React.useState(loadStart);
	const [character, setCharacter] = React.useState(start.character);
	const [characterId, setCharacterId] = React.useState(start.id);
	// Bumped when the open character is swapped for another one (opened, imported, or updated from Drive), so the
	// interactive sheet knows to reload its in-play state.
	const [playRevision, setPlayRevision] = React.useState(0);
	const idRef = React.useRef(characterId);
	idRef.current = characterId;
	const savedJson = React.useRef(JSON.stringify(start.character));

	// Every change to the character is saved on this device right away (and then to Google Drive if connected).
	React.useEffect(() => {
		const json = JSON.stringify(character);
		if (json === savedJson.current) return;
		savedJson.current = json;
		if (isMeaningful(character)) library.saveRecord(characterId, { character });
	}, [character, characterId]);

	React.useEffect(() => { library.setActive(characterId); }, [characterId]);

	// Reconnect to Google Drive if the user signed in before.
	React.useEffect(() => { startSync(); }, []);

	// Drive delivered a newer copy of the character that is open: show it.
	React.useEffect(() => library.subscribe((event, id) => {
		if (event !== 'remote' || id !== idRef.current) return;
		const record = library.getRecord(id);
		if (!record?.character) return;
		const next = prepare(record.character);
		savedJson.current = JSON.stringify(next);
		setCharacter(next);
		setPlayRevision((r) => r + 1);
	}), []);

	// What the player changed on the interactive sheet (inventory, prepared spells) is carried into the character when they
	// leave the sheet. Returns the updated character, or null when there was nothing to carry over.
	const applySheetChanges = (id) => {
		const applied = pendingSheetChanges(library.getRecord(id));
		if (!applied) return null;
		library.saveFromSheet(id, { character: applied, playBase: JSON.stringify(applied) });
		return applied;
	};

	const show = (id, next) => {
		if (idRef.current && idRef.current !== id) applySheetChanges(idRef.current); // switching characters: nothing is stranded
		library.setActive(id); // before anything re-renders, so nothing reads the previous character as the active one
		idRef.current = id;
		savedJson.current = JSON.stringify(next);
		setCharacterId(id);
		setCharacter(next);
		setPlayRevision((r) => r + 1);
	};

	// patch is an object to merge, or a function of the current section returning one (for updates that
	// must build on the latest value, such as rapid clicks on a list of choices).
	const updateSection = (section) => (patch) =>
		setCharacter((prev) => ({ ...prev, [section]: { ...prev[section], ...(typeof patch === 'function' ? patch(prev[section]) : patch) } }));

	const setEdition = (edition) =>
		setCharacter((prev) => (prev.edition === edition ? prev : { ...prev, edition, ...editionDependentDefaults }));

	const value = {
		character,
		characterId,
		playRevision,
		setEdition,
		// called when the sheet is closed: shows the sheet's changes in the rest of the app
		syncFromSheet: () => {
			const applied = applySheetChanges(idRef.current);
			if (!applied) return;
			const next = prepare(applied);
			savedJson.current = JSON.stringify(next);
			setCharacter(next);
		},
		loadCharacter: (loaded) => setCharacter(prepare(loaded)),
		newCharacter: () => show(newId(), initialCharacter),
		openCharacter: (id) => {
			const record = library.getRecord(id);
			if (record?.character) show(id, prepare(record.character));
		},
		deleteCharacter: (id) => {
			library.deleteRecord(id);
			if (id === idRef.current) show(newId(), initialCharacter);
		},
		// Adds a character from an exported file as a new character (never overwrites the open one).
		importCharacter: (data) => {
			const next = prepare(data.character);
			const id = newId();
			library.createRecord({ character: next, ...(data.play ? { play: data.play, playBase: JSON.stringify(next) } : {}) }, id);
			library.markFinalized(id);
			show(id, next);
			return id;
		},
		updateInfo: updateSection('info'),
		updateRace: updateSection('race'),
		updateClass: updateSection('classInfo'),
		updateAbilities: updateSection('abilities'),
		updateBackground: updateSection('background'),
		updateSkills: updateSection('skills'),
		updateEquipment: updateSection('equipment'),
		updateSpells: updateSection('spells'),
	};

	return (
		<CharacterContext.Provider value={value}>
			{children}
		</CharacterContext.Provider>
	);
}

export function useCharacter() {
	const context = React.useContext(CharacterContext);
	if (!context) {
		throw new Error('useCharacter must be used within a CharacterProvider');
	}
	return context;
}
