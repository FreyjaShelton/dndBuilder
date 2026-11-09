// Build-time decisions for the 2014 classes, shown as dropdowns inside the level they happen at.
// Ability Score Improvements and the subclass pick are not listed here: they are derived from the
// class table (any "Ability Score Improvement" row) and from `subclassLevel` / `subclasses`.
//
// A choice looks like:
//   id        unique within the class (stored under character.classInfo.choices[id])
//   level     the class level the choice is made at
//   feature   the feature card the dropdown appears in ('Proficiencies' = a card of starting proficiencies at level 1)
//   label     what the dropdown is called
//   kind      'option'    one of a list
//             'multi'     several of a list (`count`)
//             'spells'    spells from the spell index (`spells`: { classes, levels, school?, maxByLevel? })
//             'skill'     one skill proficiency            'skills'  several skill proficiencies
//             'expertise' skills (or `extra`) that get double proficiency
//             'languages' / 'tools'  languages or tool proficiencies
//   options   names, [{ name, description }], 'feature' (parsed from the feature text), or a list id
//             ('list:maneuvers', 'list:disciplines', 'list:invocations', 'list:kensei-weapons', 'list:martial-weapons')
//   optionsFrom  read the options from another feature of the class or subclass
//   from      for skills/languages/tools: 'class' (the class skill list), 'any', or a list of names
//   count     a number, a step map { 3: 2, 10: 3 } (value at the highest level reached), or { column } from the class table
//   showIf    { id, value } show only when an earlier choice has that value
//   group     choices sharing a group are either-or (a skill or a language)
//   optionalFeature  only offered when that Tasha's optional feature is switched on
//   grantsWeaponProficiency  true: the picked weapon is a weapon the character is proficient with
//
// `optional` holds the metadata for Tasha's optional class features: `replaces` names features swapped out.

import { artisanTools, gamingSets, musicalInstruments } from '../toolLists';

const ALL_SKILLS = 'any';

// Cantrips and spells a caster picks, sized by the class table.
const cantrips = (cls, feature = 'Spellcasting', level = 1) => ({
	id: 'cantrips', level, feature, label: 'Cantrips', kind: 'spells', count: { column: 'Cantrips Known' }, spells: { classes: [cls], levels: [0] },
});
const spellsKnown = (cls, feature = 'Spellcasting', level = 1) => ({
	id: 'spellsKnown', level, feature, label: 'Spells known', kind: 'spells', count: { column: 'Spells Known' }, spells: { classes: [cls], levels: 'leveled' },
});
const fightingStyle = (level) => ({ id: 'fightingStyle', level, feature: 'Fighting Style', label: 'Fighting style', kind: 'option', options: 'feature' });

// Spells known by the one-third casters (Eldritch Knight and Arcane Trickster), from the PHB subclass tables.
const THIRD_CASTER_SPELLS = { 3: 3, 4: 4, 7: 5, 8: 6, 10: 7, 11: 8, 13: 9, 14: 10, 16: 11, 19: 12, 20: 13 };
const THIRD_CASTER_MAX_LEVEL = { 3: 1, 7: 2, 13: 3, 19: 4 };
const wizardBook = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [i + 1, 6 + 2 * i]));

const classChoices = {
	// Tasha's Cauldron of Everything. Spells are prepared from the class list (Intelligence modifier + half the level).
	Artificer: {
		optional: { 'Firearm Proficiency': {} },
		choices: [
			cantrips('Artificer'),
			{ id: 'artificerTool', level: 1, feature: 'Proficiencies', label: "Artisan's tools (one type of your choice)", kind: 'tools', count: 1, from: artisanTools },
			{
				id: 'infusions', level: 2, feature: 'Infuse Item', label: 'Infusions known', kind: 'multi', options: 'list:infusions', count: { column: 'Infusions Known' },
				countNote: 'You can replace one infusion with another whenever you gain an artificer level. Some infusions need a higher level.',
			},
		],
		subclasses: {
			Alchemist: [],
			Armorer: [
				{
					id: 'armorModel', level: 3, feature: 'Armor Model', label: 'Armor model', kind: 'option',
					options: [
						{ name: 'Guardian', description: 'Thunder Gauntlets (simple melee weapon, 1d8 thunder; the target has disadvantage on attacks against others) and Defensive Field (temporary hit points equal to your artificer level, a number of times equal to your proficiency bonus per long rest).' },
						{ name: 'Infiltrator', description: 'Lightning Launcher (simple ranged weapon, 1d6 lightning plus an extra 1d6 once per turn), Powered Steps (+5 feet of speed) and Dampening Field (advantage on Stealth checks). You can change the model after any rest.' },
					],
				},
			],
			Artillerist: [],
			'Battle Smith': [],
		},
	},

	Barbarian: {
		optional: { 'Primal Knowledge': {}, 'Instinctive Pounce': {} },
		choices: [
			{ id: 'primalKnowledge3', level: 3, feature: 'Primal Knowledge', label: 'Skill proficiency', kind: 'skill', from: 'class', optionalFeature: 'Primal Knowledge' },
			{ id: 'primalKnowledge10', level: 10, feature: 'Primal Knowledge', label: 'Skill proficiency', kind: 'skill', from: 'class', optionalFeature: 'Primal Knowledge' },
		],
		subclasses: {
			'Totem Warrior': [
				{ id: 'totemSpirit', level: 3, feature: 'Totem Spirit', label: 'Totem spirit', kind: 'option', options: 'feature' },
				{ id: 'aspectOfTheBeast', level: 6, feature: 'Aspect of the Beast', label: 'Aspect', kind: 'option', options: 'feature' },
				{ id: 'totemicAttunement', level: 14, feature: 'Totemic Attunement', label: 'Attunement', kind: 'option', options: 'feature' },
			],
			Giant: [
				{ id: 'giantCantrip', level: 3, feature: "Giant's Power", label: 'Cantrip', kind: 'option', options: ['Druidcraft', 'Thaumaturgy'] },
				{ id: 'giantLanguage', level: 3, feature: "Giant's Power", label: 'Language (Giant, or another if you already know it)', kind: 'languages', count: 1 },
			],
			Zealot: [
				{ id: 'divineFuryType', level: 3, feature: 'Divine Fury', label: 'Damage type', kind: 'option', options: ['Necrotic', 'Radiant'] },
			],
		},
	},

	Bard: {
		optional: { 'Magical Inspiration': {}, 'Bardic Versatility': {} },
		choices: [
			{ id: 'instruments', level: 1, feature: 'Proficiencies', label: 'Musical instrument proficiencies', kind: 'tools', count: 3, from: musicalInstruments },
			cantrips('Bard'),
			spellsKnown('Bard'),
			{ id: 'expertise3', level: 3, feature: 'Expertise', label: 'Expertise', kind: 'expertise', count: 2 },
			{ id: 'expertise10', level: 10, feature: 'Expertise', label: 'Expertise', kind: 'expertise', count: 2 },
			{ id: 'secrets10', level: 10, feature: 'Magical Secrets', label: 'Magical Secrets', kind: 'spells', count: 2, spells: { classes: 'any', levels: 'castable' } },
			{ id: 'secrets14', level: 14, feature: 'Magical Secrets', label: 'Magical Secrets', kind: 'spells', count: 2, spells: { classes: 'any', levels: 'castable' } },
			{ id: 'secrets18', level: 18, feature: 'Magical Secrets', label: 'Magical Secrets', kind: 'spells', count: 2, spells: { classes: 'any', levels: 'castable' } },
		],
		subclasses: {
			Lore: [
				{ id: 'loreSkills', level: 3, feature: 'Bonus Proficiencies', label: 'Skill proficiencies', kind: 'skills', count: 3, from: ALL_SKILLS },
				{ id: 'loreSecrets', level: 6, feature: 'Additional Magical Secrets', label: 'Spells from any class', kind: 'spells', count: 2, spells: { classes: 'any', levels: 'castable' } },
			],
			Swords: [
				{ id: 'swordsStyle', level: 3, feature: 'Fighting Style', label: 'Fighting style', kind: 'option', options: 'feature' },
			],
		},
	},

	Cleric: {
		optional: {
			'Harness Divine Power': {},
			'Cantrip Versatility': {},
			'Blessed Strikes': { replaces: ['Divine Strike', 'Potent Spellcasting'] },
		},
		choices: [cantrips('Cleric')],
		subclasses: {
			Arcana: [
				{ id: 'arcanaCantrips', level: 1, feature: 'Arcane Initiate', label: 'Wizard cantrips', kind: 'spells', count: 2, spells: { classes: ['Wizard'], levels: [0] } },
				{ id: 'arcanaMastery6', level: 17, feature: 'Arcane Mastery', label: '6th-level wizard spell', kind: 'spells', count: 1, spells: { classes: ['Wizard'], levels: [6] } },
				{ id: 'arcanaMastery7', level: 17, feature: 'Arcane Mastery', label: '7th-level wizard spell', kind: 'spells', count: 1, spells: { classes: ['Wizard'], levels: [7] } },
				{ id: 'arcanaMastery8', level: 17, feature: 'Arcane Mastery', label: '8th-level wizard spell', kind: 'spells', count: 1, spells: { classes: ['Wizard'], levels: [8] } },
				{ id: 'arcanaMastery9', level: 17, feature: 'Arcane Mastery', label: '9th-level wizard spell', kind: 'spells', count: 1, spells: { classes: ['Wizard'], levels: [9] } },
			],
			Death: [
				{ id: 'reaperCantrip', level: 1, feature: 'Reaper', label: 'Necromancy cantrip (any class list)', kind: 'spells', count: 1, spells: { classes: 'any', levels: [0], school: 'Necromancy' } },
			],
			Knowledge: [
				{ id: 'knowledgeLanguages', level: 1, feature: 'Blessings of Knowledge', label: 'Languages', kind: 'languages', count: 2 },
				{ id: 'knowledgeSkills', level: 1, feature: 'Blessings of Knowledge', label: 'Skills (proficiency doubled)', kind: 'skills', count: 2, from: ['Arcana', 'History', 'Nature', 'Religion'] },
			],
			Nature: [
				{ id: 'natureCantrip', level: 1, feature: 'Acolyte of Nature', label: 'Druid cantrip', kind: 'spells', count: 1, spells: { classes: ['Druid'], levels: [0] } },
				{ id: 'natureSkill', level: 1, feature: 'Acolyte of Nature', label: 'Skill proficiency', kind: 'skill', from: ['Animal Handling', 'Nature', 'Survival'] },
			],
			Peace: [
				{ id: 'peaceSkill', level: 1, feature: 'Implement of Peace', label: 'Skill proficiency', kind: 'skill', from: ['Insight', 'Performance', 'Persuasion'] },
			],
		},
	},

	Druid: {
		optional: { 'Wild Companion': {}, 'Cantrip Versatility': {} },
		choices: [cantrips('Druid')],
		subclasses: {
			Land: [
				{ id: 'landCantrip', level: 2, feature: 'Bonus Cantrip', label: 'Druid cantrip', kind: 'spells', count: 1, spells: { classes: ['Druid'], levels: [0] } },
				{ id: 'landTerrain', level: 3, feature: 'Circle Spells', label: 'Land', kind: 'option', options: ['Arctic', 'Coast', 'Desert', 'Forest', 'Grassland', 'Mountain', 'Swamp', 'Underdark'] },
			],
		},
	},

	Fighter: {
		optional: { 'Martial Versatility': {} },
		choices: [fightingStyle(1)],
		subclasses: {
			Champion: [
				{ id: 'championStyle', level: 10, feature: 'Additional Fighting Style', label: 'Second fighting style', kind: 'option', options: 'feature', optionsFrom: 'Fighting Style' },
			],
			'Battle Master': [
				{ id: 'maneuvers', level: 3, feature: 'Combat Superiority', label: 'Maneuvers', kind: 'multi', options: 'list:maneuvers', count: { 3: 3, 7: 5, 10: 7, 15: 9 }, countNote: 'You learn two more at levels 7, 10 and 15.' },
				{ id: 'studentOfWar', level: 3, feature: 'Student of War', label: "Artisan's tools", kind: 'tools', count: 1, from: artisanTools },
			],
			'Eldritch Knight': [
				{ id: 'ekCantrips', level: 3, feature: 'Spellcasting', label: 'Wizard cantrips', kind: 'spells', count: { 3: 2, 10: 3 }, spells: { classes: ['Wizard'], levels: [0] } },
				{ id: 'ekSpells', level: 3, feature: 'Spellcasting', label: 'Wizard spells known', kind: 'spells', count: THIRD_CASTER_SPELLS, spells: { classes: ['Wizard'], levels: 'leveled', maxByLevel: THIRD_CASTER_MAX_LEVEL }, countNote: 'Most must be abjuration or evocation spells.' },
			],
			'Arcane Archer': [
				{ id: 'archerSkill', level: 3, feature: 'Arcane Archer Lore', label: 'Skill proficiency', kind: 'skill', from: ['Arcana', 'Nature'] },
				{ id: 'archerCantrip', level: 3, feature: 'Arcane Archer Lore', label: 'Cantrip', kind: 'option', options: ['Prestidigitation', 'Druidcraft'] },
				{ id: 'arcaneShots', level: 3, feature: 'Arcane Shot', label: 'Arcane Shot options', kind: 'multi', options: 'feature', optionsFrom: 'Arcane Shot Options', count: { 3: 2, 7: 3, 10: 4, 15: 5, 18: 6 }, countNote: 'You learn one more at levels 7, 10, 15 and 18.' },
			],
			Banneret: [
				{ id: 'envoySkill', level: 7, feature: 'Royal Envoy', label: 'Skill (only if you already have Persuasion)', kind: 'skill', from: ['Animal Handling', 'Insight', 'Intimidation', 'Performance'] },
			],
			Cavalier: [
				{ id: 'cavalierSkill', level: 3, feature: 'Bonus Proficiency', label: 'Skill proficiency', kind: 'skill', from: ['Animal Handling', 'History', 'Insight', 'Performance', 'Persuasion'], group: 'bonus' },
				{ id: 'cavalierLanguage', level: 3, feature: 'Bonus Proficiency', label: 'Or a language instead', kind: 'languages', count: 1, group: 'bonus' },
			],
			Samurai: [
				{ id: 'samuraiSkill', level: 3, feature: 'Bonus Proficiency', label: 'Skill proficiency', kind: 'skill', from: ['History', 'Insight', 'Performance', 'Persuasion'], group: 'bonus' },
				{ id: 'samuraiLanguage', level: 3, feature: 'Bonus Proficiency', label: 'Or a language instead', kind: 'languages', count: 1, group: 'bonus' },
			],
			'Rune Knight': [
				{ id: 'runes', level: 3, feature: 'Rune Carver', label: 'Runes', kind: 'multi', options: 'feature', count: { 3: 2, 7: 3, 10: 4, 15: 5 }, countNote: 'You learn more runes at levels 7, 10 and 15. Hill and Storm runes need level 7.' },
			],
		},
	},

	Monk: {
		optional: { 'Dedicated Weapon': {}, 'Ki-Fueled Attack': {}, 'Quickened Healing': {}, 'Focused Aim': {} },
		choices: [
			{ id: 'monkTool', level: 1, feature: 'Proficiencies', label: "Artisan's tool or musical instrument", kind: 'tools', count: 1, from: [...artisanTools, ...musicalInstruments] },
		],
		subclasses: {
			'Four Elements': [
				{ id: 'disciplines', level: 3, feature: 'Disciple of the Elements', label: 'Elemental disciplines', kind: 'multi', options: 'list:disciplines', exclude: ['Elemental Attunement'], count: { 3: 1, 6: 2, 11: 3, 17: 4 }, countNote: 'You know Elemental Attunement plus these, and learn one more at levels 6, 11 and 17.' },
			],
			Kensei: [
				{ id: 'kenseiWeapons', level: 3, feature: 'Path of the Kensei', label: 'Kensei weapons', kind: 'multi', options: 'list:kensei-weapons', count: { 3: 2, 6: 3, 11: 4, 17: 5 }, countNote: 'One melee and one ranged weapon to start; you choose another at levels 6, 11 and 17.' },
			],
			'Ascendant Dragon': [
				{ id: 'dragonLanguage', level: 3, feature: 'Draconic Disciple', label: 'Language (Draconic, or another if you already know it)', kind: 'languages', count: 1 },
			],
		},
	},

	Paladin: {
		optional: { 'Harness Divine Power': {}, 'Martial Versatility': {} },
		choices: [
			fightingStyle(2),
			{ id: 'blessedCantrips', level: 2, feature: 'Fighting Style', label: 'Cleric cantrips (Blessed Warrior)', kind: 'spells', count: 2, spells: { classes: ['Cleric'], levels: [0] }, showIf: { id: 'fightingStyle', value: 'Blessed Warrior' } },
		],
		subclasses: {},
	},

	Ranger: {
		optional: {
			'Favored Foe': { replaces: ['Favored Enemy'] },
			'Deft Explorer': { replaces: ['Natural Explorer'] },
			'Primal Awareness': { replaces: ['Primeval Awareness'] },
			"Nature's Veil": { replaces: ['Hide in Plain Sight'] },
			'Martial Versatility': {},
		},
		choices: [
			...[[1, 'Favored Enemy'], [6, 'Favored Enemy Improvement'], [14, 'Favored Enemy Improvement']].flatMap(([level, feature]) => [
				{ id: `enemy${level}`, level, feature, label: 'Favored enemy', kind: 'option', options: ['Aberrations', 'Beasts', 'Celestials', 'Constructs', 'Dragons', 'Elementals', 'Fey', 'Fiends', 'Giants', 'Monstrosities', 'Oozes', 'Plants', 'Undead', 'Two races of humanoid'] },
				{ id: `enemyLanguage${level}`, level, feature, label: 'Language spoken by them (if any)', kind: 'languages', count: 1 },
			]),
			...[[1, 'Natural Explorer'], [6, 'Natural Explorer Improvement'], [10, 'Natural Explorer Improvement']].map(([level, feature]) => ({
				id: `terrain${level}`, level, feature, label: 'Favored terrain', kind: 'option', options: ['Arctic', 'Coast', 'Desert', 'Forest', 'Grassland', 'Mountain', 'Swamp', 'Underdark'],
			})),
			{ id: 'deftExpertise', level: 1, feature: 'Deft Explorer', label: 'Canny: skill to double', kind: 'expertise', count: 1, optionalFeature: 'Deft Explorer' },
			{ id: 'deftLanguages', level: 1, feature: 'Deft Explorer', label: 'Canny: languages', kind: 'languages', count: 2, optionalFeature: 'Deft Explorer' },
			fightingStyle(2),
			{ id: 'druidicCantrips', level: 2, feature: 'Fighting Style', label: 'Druid cantrips (Druidic Warrior)', kind: 'spells', count: 2, spells: { classes: ['Druid'], levels: [0] }, showIf: { id: 'fightingStyle', value: 'Druidic Warrior' } },
			spellsKnown('Ranger', 'Spellcasting', 2),
		],
		subclasses: {
			Hunter: [
				{ id: 'huntersPrey', level: 3, feature: "Hunter's Prey", label: "Hunter's Prey", kind: 'option', options: 'feature' },
				{ id: 'defensiveTactics', level: 7, feature: 'Defensive Tactics', label: 'Defensive tactic', kind: 'option', options: 'feature' },
				{ id: 'hunterMultiattack', level: 11, feature: 'Multiattack', label: 'Multiattack', kind: 'option', options: 'feature' },
				{ id: 'superiorDefense', level: 15, feature: "Superior Hunter's Defense", label: 'Defense', kind: 'option', options: 'feature' },
			],
			'Fey Wanderer': [
				{ id: 'glamourSkill', level: 3, feature: 'Otherworldly Glamour', label: 'Skill proficiency', kind: 'skill', from: ['Deception', 'Performance', 'Persuasion'] },
			],
		},
	},

	Rogue: {
		optional: { 'Steady Aim': {} },
		choices: [
			{ id: 'expertise1', level: 1, feature: 'Expertise', label: 'Expertise', kind: 'expertise', count: 2, extra: ["Thieves' tools"] },
			{ id: 'expertise6', level: 6, feature: 'Expertise', label: 'Expertise', kind: 'expertise', count: 2, extra: ["Thieves' tools"] },
		],
		subclasses: {
			'Arcane Trickster': [
				{ id: 'atCantrips', level: 3, feature: 'Spellcasting', label: 'Wizard cantrips', kind: 'spells', count: { 3: 2, 10: 3 }, spells: { classes: ['Wizard'], levels: [0] }, countNote: 'You also know Mage Hand.' },
				{ id: 'atSpells', level: 3, feature: 'Spellcasting', label: 'Wizard spells known', kind: 'spells', count: THIRD_CASTER_SPELLS, spells: { classes: ['Wizard'], levels: 'leveled', maxByLevel: THIRD_CASTER_MAX_LEVEL }, countNote: 'Most must be enchantment or illusion spells.' },
			],
			Mastermind: [
				{ id: 'mastermindLanguages', level: 3, feature: 'Master of Intrigue', label: 'Languages', kind: 'languages', count: 2 },
				{ id: 'mastermindGaming', level: 3, feature: 'Master of Intrigue', label: 'Gaming set', kind: 'tools', count: 1, from: gamingSets },
			],
		},
	},

	Sorcerer: {
		optional: { 'Sorcerous Versatility': {}, 'Magical Guidance': {} },
		choices: [
			cantrips('Sorcerer'),
			spellsKnown('Sorcerer'),
			{ id: 'metamagic', level: 3, feature: 'Metamagic', label: 'Metamagic options', kind: 'multi', options: 'feature', count: { 3: 2, 10: 3, 17: 4 }, countNote: 'You learn one more at levels 10 and 17.' },
		],
		subclasses: {
			'Draconic Bloodline': [
				{ id: 'dragonAncestor', level: 1, feature: 'Dragon Ancestor', label: 'Dragon ancestor', kind: 'option', options: [
					{ name: 'Black', description: 'Acid damage' }, { name: 'Blue', description: 'Lightning damage' }, { name: 'Brass', description: 'Fire damage' },
					{ name: 'Bronze', description: 'Lightning damage' }, { name: 'Copper', description: 'Acid damage' }, { name: 'Gold', description: 'Fire damage' },
					{ name: 'Green', description: 'Poison damage' }, { name: 'Red', description: 'Fire damage' }, { name: 'Silver', description: 'Cold damage' },
					{ name: 'White', description: 'Cold damage' },
				] },
			],
			'Elemental Bloodline': [
				{ id: 'elementalAncestor', level: 1, feature: 'Elemental Ancestor', label: 'Elemental ancestor', kind: 'option', options: [
					{ name: 'Water', description: 'Spells: Healing Word, Lesser Restoration, Sleet Storm, Control Water, Cone of Cold.' },
					{ name: 'Earth', description: "Spells: Mage Armor, Hold Person, Slow, Otiluke's Resilient Sphere, Creation." },
					{ name: 'Fire', description: 'Spells: Faerie Fire, Flame Blade, Fireball, Fire Shield, Flame Strike.' },
					{ name: 'Air', description: 'Spells: Shield, Invisibility, Fly, Freedom of Movement, Telekinesis.' },
					{ name: 'Lightning', description: 'Spells: Color Spray, Misty Step, Blink, Dimension Door, Mislead.' },
				] },
				{ id: 'elementalWeapon', level: 1, feature: 'Elemental Warrior', label: 'Martial weapon proficiency', kind: 'option', options: 'list:martial-weapons', grantsWeaponProficiency: true },
			],
			'Divine Soul': [
				{ id: 'divineAffinity', level: 1, feature: 'Divine Magic', label: 'Affinity', kind: 'option', options: [
					{ name: 'Good', description: 'You learn Cure Wounds.' }, { name: 'Evil', description: 'You learn Inflict Wounds.' },
					{ name: 'Law', description: 'You learn Bless.' }, { name: 'Chaos', description: 'You learn Bane.' },
					{ name: 'Neutrality', description: 'You learn Protection from Evil and Good.' },
				] },
			],
		},
	},

	Warlock: {
		optional: { 'Eldritch Versatility': {} },
		choices: [
			cantrips('Warlock', 'Pact Magic'),
			spellsKnown('Warlock', 'Pact Magic'),
			{ id: 'invocations', level: 2, feature: 'Eldritch Invocations', label: 'Eldritch invocations', kind: 'multi', options: 'list:invocations', count: { column: 'Invocations Known' }, countNote: 'You learn more as you gain levels. Invocations that need a pact boon appear once you choose it at level 3.' },
			{ id: 'pactBoon', level: 3, feature: 'Pact Boon', label: 'Pact boon', kind: 'option', options: [
				{ name: 'Pact of the Chain', description: 'You learn the find familiar spell and can cast it as a ritual, with special familiar forms.' },
				{ name: 'Pact of the Blade', description: 'You can create a pact weapon in your empty hand.' },
				{ name: 'Pact of the Tome', description: "You get a Book of Shadows with three cantrips from any class's spell list." },
				{ name: 'Pact of the Talisman', description: "You gain a talisman that adds a d4 to failed ability checks (Tasha's Cauldron of Everything)." },
			] },
			...[[11, 6], [13, 7], [15, 8], [17, 9]].map(([level, spell]) => ({
				id: `arcanum${spell}`, level, feature: 'Mystic Arcanum', label: `${spell}th-level warlock spell`, kind: 'spells', count: 1, spells: { classes: ['Warlock'], levels: [spell] },
			})),
		],
		subclasses: {
			Genie: [
				{ id: 'genieKind', level: 1, feature: 'Genie Kind', label: 'Genie kind', kind: 'option', options: ['Dao', 'Djinni', 'Efreeti', 'Marid'] },
			],
		},
	},

	Wizard: {
		optional: { 'Cantrip Formulas': {} },
		choices: [
			cantrips('Wizard'),
			{ id: 'spellbook', level: 1, feature: 'Spellcasting', label: 'Spellbook', kind: 'spells', count: wizardBook, spells: { classes: ['Wizard'], levels: 'leveled' }, countNote: 'You start with six spells and add two for each level you gain. You can keep adding more beyond that: copy spells you find into your spellbook (see the Wizard class description).' },
			{ id: 'masteryFirst', level: 18, feature: 'Spell Mastery', label: '1st-level wizard spell', kind: 'spells', count: 1, spells: { classes: ['Wizard'], levels: [1] } },
			{ id: 'masterySecond', level: 18, feature: 'Spell Mastery', label: '2nd-level wizard spell', kind: 'spells', count: 1, spells: { classes: ['Wizard'], levels: [2] } },
			{ id: 'signatureSpells', level: 20, feature: 'Signature Spells', label: '3rd-level wizard spells', kind: 'spells', count: 2, spells: { classes: ['Wizard'], levels: [3] } },
		],
		subclasses: {},
	},
};

export default classChoices;
