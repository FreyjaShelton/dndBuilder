// Every official 2014 background from the rules reference, generated from dnd5e.wikidot.com
// (no Unearthed Arcana, homebrew or Plane Shift). Each one carries structured proficiencies
// (fixed grants plus picks), starting equipment and gold, its features, specialty roll tables,
// variants, and suggested personality traits, ideals, bonds and flaws.
// "Custom" follows the PHB "Customizing a Background" rule: any two skills and your own details.
// backgroundFixes.js adds the feats and choices the generator left as plain text.
import generated from './backgrounds.generated.json';
import races from './races';
import applyBackgroundFixes from './backgroundFixes';

const custom = {
	name: 'Custom',
	slug: 'custom',
	source: 'Customizing a Background',
	description: 'Build your own background: choose any two skills, then write your own feature and equipment.',
	skills: { fixed: [], picks: [{ count: 2, from: 'any' }] },
	tools: { fixed: [], picks: [], text: '' },
	languages: { fixed: [], pick: null, text: '' },
	equipment: '',
	gold: 0,
	features: [],
	variants: [],
	rolls: [],
	traits: { personality: [], ideals: [], bonds: [], flaws: [] },
};

const backgrounds = Object.fromEntries([...applyBackgroundFixes(generated, Object.keys(races).filter((n) => n !== 'Custom')), custom].map((b) => [b.name, b]));

export default backgrounds;
