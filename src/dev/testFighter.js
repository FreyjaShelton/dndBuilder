// A second fully built level 20 character (2014 rules) for local testing, next to the level 20 Wizard: a Battle Master
// Fighter. Having two characters makes it easy to test swapping between them (the Characters button) on the builder
// pages, the interactive sheet and Google Drive sync. Dev server only; see CharacterContext and testCharacters.js.
//
// Everything below is a normal save: the same shape the builder stores and that Export/Import round-trips.

const rolls = [7, 4, 9, 6, 10, 3, 8, 5, 9, 2, 10, 6, 4, 8, 7, 5, 9, 3, 6]; // d10 for levels 2-20

// Point Buy 27: 15 / 13 / 14 / 8 / 12 / 10, plus Mountain Dwarf +2 Str and +2 Con, plus the ASI picks below
// (Str 20, Dex 16, Con 20 at the end).
const abilities = { str: 15, dex: 13, con: 14, int: 8, wis: 12, cha: 10, generationMethod: 'Point Buy', rolls: [] };

const testFighter = {
	edition: '2014',
	info: {
		name: 'Borin Ironhold',
		player: 'Test Player',
		alignment: 'Lawful Good',
		age: '187',
		height: '4\'6"',
		weight: '190 lb',
		eyes: 'Brown',
		skin: 'Ruddy',
		hair: 'Black, braided with iron rings',
		backstory: 'Borin marched out of the mountain holds as an infantry recruit and came home a battle-scarred officer. Decades of '
			+ 'holding shield walls taught him that a war is won by the people who plan it, so he studied every maneuver he could '
			+ 'steal from rival captains. Now he leads the sell-sword company that bears his name, and he has never lost a soldier '
			+ 'he did not mourn.',
	},
	abilities,
	race: {
		name: 'Dwarf',
		subrace: 'Mountain Dwarf',
		version: '',
		abilityChoices: [],
		skillChoices: [],
		lineage: '',
		originFeat: '',
		choices: {
			'tools:b:Tool Proficiency:0': ["Mason's tools"],
		},
	},
	classInfo: {
		className: 'Fighter',
		level: 20,
		subclass: 'Battle Master',
		optionalFeatures: [],
		hpMethod: 'roll',
		hpRolls: rolls,
		hpOverride: '',
		choices: {
			'asi-4': { type: 'two', a: 'str' },
			'asi-6': { type: 'split', a: 'str', b: 'con' },
			'asi-8': { type: 'two', a: 'con' },
			'asi-12': { type: 'feat', feat: 'Great Weapon Master' },
			'asi-14': { type: 'split', a: 'con', b: 'dex' },
			'asi-16': { type: 'two', a: 'dex' },
			'asi-19': { type: 'feat', feat: 'Tough' },
			fightingStyle: 'Great Weapon Fighting',
			maneuvers: [
				'Ambush', "Commander's Strike", 'Disarming Attack', 'Parry', 'Precision Attack',
				'Riposte', 'Rally', 'Sweeping Attack', 'Trip Attack',
			],
			studentOfWar: ["Smith's tools"],
		},
	},
	background: {
		name: 'Soldier',
		variant: '',
		choices: {
			'tools:0': ['Dice set'],
			'roll:specialty-0': 'Officer',
		},
		customName: '',
		customSkills: [],
		customProficiency: '',
		abilityMode: 'twoOne',
		abilityPlus2: '',
		abilityPlus1: '',
		abilityPlus1b: '',
		originFeat: '',
		personalityTraits: 'I\'m always polite and respectful.\nI face problems head-on. A simple, direct solution is the best path to success.',
		ideals: 'Responsibility. I do what I must and obey just authority.',
		bonds: 'I would still lay down my life for the people I served with.',
		flaws: 'I made a terrible mistake in battle that cost many lives, and I would do anything to keep that mistake secret.',
	},
	skills: { classChoices: ['Perception', 'Survival'] },
	equipment: {
		// the class and background kit (chain mail, a longsword and shield, two handaxes, an explorer's pack, bone dice),
		// plus two extras bought with the kit's coins; wearing the chain mail and shield
		goldMethod: 'kit',
		gold: '',
		kit: {
			choices: { class0: 'a', class1: 'a', class2: 'b', class3: 'b', bg2: 'a' },
			picks: { 'class1:a:0:0': 'Longsword' },
		},
		selected: [
			{ name: "Healer's Kit", group: 'Adventuring Gear', quantity: 1 },
			{ name: 'Signal Whistle', group: 'Adventuring Gear', quantity: 1 },
		],
		armor: 'Chain Mail',
		shield: true,
	},
	spells: { cantrips: [], prepared: [], spellbook: [] },
};

export default testFighter;
