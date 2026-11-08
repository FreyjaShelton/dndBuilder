// A fully built level 20 Wizard (2014 rules) for local testing. The dev server starts with this character loaded
// (see CharacterContext), so every page and the interactive sheet have something to show without clicking through
// the whole wizard. It is never used in a production build.
//
// To start the dev server with an empty character instead, set REACT_APP_BLANK_CHARACTER=true
// (for example in a git-ignored .env.development.local file).
//
// Everything below is a normal save: the same shape the builder stores and that Export/Import round-trips.

const rolls = [4, 2, 6, 3, 5, 1, 6, 4, 2, 5, 3, 6, 4, 1, 5, 2, 6, 3, 4]; // d6 for levels 2-20

// Point Buy 27: 8 / 14 / 14 / 15 / 12 / 8, plus High Elf +2 Dex and +1 Int, ASI picks below.
const abilities = { str: 8, dex: 14, con: 14, int: 15, wis: 12, cha: 8, generationMethod: 'Point Buy', rolls: [] };

const spellbook = [
	'Magic Missile', 'Shield', 'Mage Armor', 'Detect Magic', 'Find Familiar', 'Identify', 'Thunderwave',
	'Misty Step', 'Scorching Ray', 'Invisibility', 'Mirror Image', 'Hold Person', 'Shatter',
	'Fireball', 'Counterspell', 'Fly', 'Haste', 'Dispel Magic', 'Lightning Bolt',
	'Wall of Fire', 'Greater Invisibility', 'Dimension Door', 'Banishment', 'Ice Storm',
	'Cone of Cold', 'Wall of Force', 'Telekinesis', 'Scrying', 'Teleportation Circle',
	'Chain Lightning', 'Globe of Invulnerability', 'Disintegrate', 'True Seeing',
	'Delayed Blast Fireball', 'Teleport', 'Forcecage', 'Simulacrum',
	'Mind Blank', 'Sunburst', 'Power Word: Stun', 'Incendiary Cloud',
	'Meteor Swarm', 'Time Stop', 'Wish',
];

const prepared = [
	'Magic Missile', 'Shield', 'Detect Magic', 'Mage Armor',
	'Misty Step', 'Scorching Ray', 'Mirror Image',
	'Fireball', 'Counterspell', 'Fly', 'Haste',
	'Wall of Fire', 'Greater Invisibility', 'Dimension Door',
	'Cone of Cold', 'Wall of Force', 'Teleportation Circle',
	'Chain Lightning', 'Globe of Invulnerability', 'Disintegrate',
	'Delayed Blast Fireball', 'Forcecage',
	'Mind Blank',
	'Meteor Swarm', 'Time Stop',
];

const testCharacter = {
	edition: '2014',
	info: {
		name: 'Aelindra Vaeril',
		player: 'Test Player',
		alignment: 'Neutral Good',
		age: '212',
		height: '5\'8"',
		weight: '125 lb',
		eyes: 'Silver',
		skin: 'Pale gold',
		hair: 'White, worn long',
		backstory: 'Raised in a moonlit library-city of the high elves, Aelindra spent decades cataloguing forbidden evocations before '
			+ 'an experiment with raw storm magic leveled half the archive. She left to learn control the hard way, and has since '
			+ 'become one of the most feared and most careful battle mages of her age.',
	},
	abilities,
	race: {
		name: 'Elf',
		subrace: 'High Elf',
		version: '',
		abilityChoices: [],
		skillChoices: [],
		lineage: '',
		originFeat: '',
		choices: {
			'cantrip:s:Cantrip:0': ['Ray of Frost'],
			languages: ['Gnomish'],
		},
	},
	classInfo: {
		className: 'Wizard',
		level: 20,
		subclass: 'Evocation',
		optionalFeatures: [],
		hpMethod: 'roll',
		hpRolls: rolls,
		hpOverride: '',
		choices: {
			'asi-4': { type: 'two', a: 'int' },
			'asi-8': { type: 'two', a: 'int' },
			'asi-12': { type: 'two', a: 'con' },
			'asi-16': { type: 'split', a: 'dex', b: 'wis' },
			'asi-19': { type: 'feat', feat: 'War Caster' },
			cantrips: ['Fire Bolt', 'Mage Hand', 'Prestidigitation', 'Light', 'Shocking Grasp'],
			spellbook,
			prepared,
			masteryFirst: ['Shield'],
			masterySecond: ['Misty Step'],
			signatureSpells: ['Counterspell', 'Fireball'],
		},
	},
	background: {
		name: 'Sage',
		variant: '',
		choices: {
			languages: ['Draconic', 'Infernal'],
			'roll:specialty-0': 'Alchemist',
		},
		customName: '',
		customSkills: [],
		customProficiency: '',
		abilityMode: 'twoOne',
		abilityPlus2: '',
		abilityPlus1: '',
		abilityPlus1b: '',
		originFeat: '',
		personalityTraits: 'I use polysyllabic words that convey the impression of great erudition.\nI am horribly, horribly awkward in social situations.',
		ideals: 'Knowledge. The path to power and self-improvement is through knowledge.',
		bonds: 'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.',
		flaws: 'I overlook obvious solutions in favor of complicated ones.',
	},
	skills: { classChoices: ['Investigation', 'Medicine'] },
	equipment: {
		// the class and background kit (with the arcane focus picked), plus two extras bought with the kit's coins
		goldMethod: 'kit',
		gold: '',
		kit: { choices: { class1: 'b' }, picks: { 'class1:b:0:0': 'Crystal' } },
		selected: [
			{ name: "Healer's Kit", group: 'Adventuring Gear', quantity: 1 },
			{ name: 'Signal Whistle', group: 'Adventuring Gear', quantity: 1 },
		],
		armor: '',
		shield: false,
	},
	spells: { cantrips: [], prepared: [], spellbook: [] },
};

export default testCharacter;
