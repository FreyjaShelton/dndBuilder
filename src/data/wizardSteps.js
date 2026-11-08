import { hasSpellsPage2014 } from '../utils/spells2014';

const allSteps = ["Edition", "Home", "Abilities", "Race", "Class", "Spells", "Background", "Skills", "Equipment", "Finalize"];

// The steps for a character (or, for a bare edition string, the steps before a class is known).
// 2024 always has a Spells step. 2014 has one only for characters that cast spells, which can
// depend on the subclass (Eldritch Knight, Arcane Trickster), so it needs the whole character.
export function getWizardSteps(characterOrEdition) {
	const character = typeof characterOrEdition === 'object' ? characterOrEdition : null;
	const edition = character ? character.edition : characterOrEdition;
	if (edition === '2014') return hasSpellsPage2014(character) ? allSteps : allSteps.filter((s) => s !== 'Spells');
	return allSteps;
}

export function getStepEyebrow(pageName, characterOrEdition) {
	const steps = getWizardSteps(characterOrEdition);
	return `Step ${steps.indexOf(pageName) + 1} of ${steps.length}`;
}

export default allSteps;
