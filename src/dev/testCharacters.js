// The test characters the dev server (npm start) loads, in the order they are added to the library. The first one is
// open on a fresh start. Each keeps its own id, so they sync to Google Drive like any other character.
import wizard from './testCharacter';
import fighter from './testFighter';

export const DEV_CHARACTERS = [
	{ id: 'dev-test-character', character: wizard },
	{ id: 'dev-test-fighter', character: fighter },
];

export default DEV_CHARACTERS;
