// Every official 2014 lineage from the rules reference, generated from dnd5e.wikidot.com.
// Each race has one or more versions (the original book and sometimes the Monsters of the Multiverse
// rewrite), subraces (including setting add-ons like the Eberron dragonmarks), and traits with
// the mechanical effects detected from their text. See utils/raceChoices.js for how they are used.
import generated from './data.generated.json';

const races = Object.fromEntries(generated.map((race) => [race.name, race]));

export default races;
