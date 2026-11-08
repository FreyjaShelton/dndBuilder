const allSteps = ["Edition", "Home", "Race", "Class", "Spells", "Abilities", "Background", "Skills", "Equipment", "Finalize"];

// Spell selection is only built for the 2024 rules.
export function getWizardSteps(edition) {
	return edition === '2014' ? allSteps.filter((s) => s !== 'Spells') : allSteps;
}

export function getStepEyebrow(pageName, edition) {
	const steps = getWizardSteps(edition);
	return `Step ${steps.indexOf(pageName) + 1} of ${steps.length}`;
}

export default allSteps;
