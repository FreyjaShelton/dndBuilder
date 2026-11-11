// Every official 2014 lineage from the rules reference, generated from dnd5e.wikidot.com.
// Each race has one or more versions (the original book and sometimes the Monsters of the Multiverse
// rewrite), subraces (including setting add-ons like the Eberron dragonmarks), and traits with
// the mechanical effects detected from their text. See utils/raceChoices.js for how they are used.
// fixes.js corrects the traits the generator got wrong (mostly choices it did not turn into pickers).
import generated from './data.generated.json';
import applyRaceFixes from './fixes';

const races = Object.fromEntries(applyRaceFixes(generated).map((race) => [race.name, race]));

export default races;
