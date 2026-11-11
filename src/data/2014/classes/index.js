import artificer from './artificer';
import barbarian from './barbarian';
import bard from './bard';
import cleric from './cleric';
import druid from './druid';
import fighter from './fighter';
import monk from './monk';
import paladin from './paladin';
import ranger from './ranger';
import rogue from './rogue';
import sorcerer from './sorcerer';
import warlock from './warlock';
import wizard from './wizard';
import homebrewSubclasses from '../homebrew';
import applySubclassSpellFixes from './subclassSpellFixes';

const classes = applySubclassSpellFixes({
	Artificer: artificer,
	Barbarian: barbarian,
	Bard: bard,
	Cleric: cleric,
	Druid: druid,
	Fighter: fighter,
	Monk: monk,
	Paladin: paladin,
	Ranger: ranger,
	Rogue: rogue,
	Sorcerer: sorcerer,
	Warlock: warlock,
	Wizard: wizard,
});

// Homebrew subclasses are added to the end of their class's list (they carry homebrew: true).
homebrewSubclasses.forEach(({ className, subclass }) => {
	classes[className] = { ...classes[className], subclasses: [...classes[className].subclasses, subclass] };
});

export default classes;
