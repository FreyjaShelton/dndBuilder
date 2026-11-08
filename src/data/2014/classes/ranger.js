const ranger = {
	"name": "Ranger",
	"hitDie": 10,
	"startingGold": "5d4 x 10",
	"subclassName": "Ranger Archetype",
	"suggestedAbilities": "Dexterity or Strength, Wisdom",
	"primaryAbility": [
		"Dexterity",
		"Wisdom"
	],
	"spellcastingAbility": "Wisdom",
	"subclassLevel": 3,
	"subclassFeatureLevels": [
		7,
		10,
		11,
		15
	],
	"armorProficiencies": "Light armor, medium armor, shields",
	"weaponProficiencies": "Simple weapons, martial weapons",
	"toolProficiencies": "None",
	"savingThrows": [
		"Strength",
		"Dexterity"
	],
	"skillChoices": {
		"count": 3,
		"from": [
			"Animal Handling",
			"Athletics",
			"Insight",
			"Investigation",
			"Nature",
			"Perception",
			"Stealth",
			"Survival"
		],
		"raw": "Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival"
	},
	"startingEquipment": [
		"(a) Scale Mail or (b) leather armor",
		"(a) two shortswords or (b) two simple melee weapons",
		"(a) a dungeoneer's pack or (b) an explorer's pack",
		"A longbow and a quiver of 20 arrows"
	],
	"table": {
		"caption": "The Ranger",
		"columns": [
			"Level",
			"Proficiency Bonus",
			"Features",
			"Spells Known",
			"Spell Slots per Spell Level 1st",
			"Spell Slots per Spell Level 2nd",
			"Spell Slots per Spell Level 3rd",
			"Spell Slots per Spell Level 4th",
			"Spell Slots per Spell Level 5th"
		],
		"rows": [
			[
				"1st",
				"+2",
				"Favored Enemy, Natural Explorer, Deft Explorer (Optional), Favored Foe (Optional)",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"2nd",
				"+2",
				"Fighting Style, Spellcasting, Spellcasting Focus (Optional)",
				"2",
				"2",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"3rd",
				"+2",
				"Primeval Awareness, Ranger Conclave, Primal Awareness (Optional)",
				"3",
				"3",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"4th",
				"+2",
				"Ability Score Improvement, Martial Versatility (Optional)",
				"3",
				"3",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"5th",
				"+3",
				"Extra Attack",
				"4",
				"4",
				"2",
				"-",
				"-",
				"-"
			],
			[
				"6th",
				"+3",
				"Favored Enemy Improvement, Natural Explorer Improvement, Deft Explorer Improvement (Optional)",
				"4",
				"4",
				"2",
				"-",
				"-",
				"-"
			],
			[
				"7th",
				"+3",
				"Ranger Conclave feature",
				"5",
				"4",
				"3",
				"-",
				"-",
				"-"
			],
			[
				"8th",
				"+3",
				"Ability Score Improvement, Land's Stride, Martial Versatility (Optional)",
				"5",
				"4",
				"3",
				"-",
				"-",
				"-"
			],
			[
				"9th",
				"+4",
				"",
				"6",
				"4",
				"3",
				"2",
				"-",
				"-"
			],
			[
				"10th",
				"+4",
				"Natural Explorer Improvement, Hide in Plain Sight, Deft Explorer Feature (Optional), Nature's Veil (Optional)",
				"6",
				"4",
				"3",
				"2",
				"-",
				"-"
			],
			[
				"11th",
				"+4",
				"Ranger Conclave feature",
				"7",
				"4",
				"3",
				"3",
				"-",
				"-"
			],
			[
				"12th",
				"+4",
				"Ability Score Improvement, Martial Versatility (Optional)",
				"7",
				"4",
				"3",
				"3",
				"-",
				"-"
			],
			[
				"13th",
				"+5",
				"",
				"8",
				"4",
				"3",
				"3",
				"1",
				"-"
			],
			[
				"14th",
				"+5",
				"Favored Enemy Improvement, Vanish",
				"8",
				"4",
				"3",
				"3",
				"1",
				"-"
			],
			[
				"15th",
				"+5",
				"Ranger Conclave feature",
				"9",
				"4",
				"3",
				"3",
				"2",
				"-"
			],
			[
				"16th",
				"+5",
				"Ability Score Improvement, Martial Versatility (Optional)",
				"9",
				"4",
				"3",
				"3",
				"2",
				"-"
			],
			[
				"17th",
				"+6",
				"",
				"10",
				"4",
				"3",
				"3",
				"3",
				"1"
			],
			[
				"18th",
				"+6",
				"Feral Senses",
				"10",
				"4",
				"3",
				"3",
				"3",
				"1"
			],
			[
				"19th",
				"+6",
				"Ability Score Improvement, Martial Versatility (Optional)",
				"11",
				"4",
				"3",
				"3",
				"3",
				"2"
			],
			[
				"20th",
				"+6",
				"Foe Slayer",
				"11",
				"4",
				"3",
				"3",
				"3",
				"2"
			]
		]
	},
	"features": [
		{
			"name": "Favored Enemy",
			"levels": [
				1
			],
			"description": "Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.\nChoose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can select two races of humanoid (such as gnolls and orcs) as favored enemies.\nYou have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.\nWhen you gain this feature, you also learn one language of your choice that is spoken by your favored enemies, if they speak one at all.\nYou choose one additional favored enemy, as well as an associated language, at 6th and 14th level. As you gain levels, your choices should reflect the types of monsters you have encountered on your adventures."
		},
		{
			"name": "Favored Foe",
			"levels": [
				1
			],
			"optional": true,
			"description": "This 1st-level feature replaces the Favored Enemy feature and works with the Foe Slayer feature. You gain no benefit from the replaced feature and don't qualify for anything in the game that requires it.\nWhen you hit a creature with an attack roll, you can call on your mystical bond with nature to mark the target as your favored enemy for 1 minute or until you lose your concentration (as if you were concentrating on a spell).\nThe first time on each of your turns that you hit the favored enemy and deal damage to it, including when you mark it, you increase that damage by 1d4.\nYou can use this feature to mark a favored enemy a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\nThis feature's extra damage increases when you reach certain levels in this class: to 1d6 at 6th level and to 1d8 at 14th level."
		},
		{
			"name": "Natural Explorer",
			"levels": [
				1
			],
			"description": "Also at 1st level, you are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. Choose one type of favored terrain: arctic, coast, desert, forest, grassland, mountain, swamp, or the Underdark. When you make an Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you're proficient in.\nWhile traveling for an hour or more in your favored terrain, you gain the following benefits:\n• Difficult terrain doesn't slow your group's travel.\n• Your group can't become lost except by magical means.\n• Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.\n• If you are traveling alone, you can move stealthily at a normal pace.\n• When you forage, you find twice as much food as you normally would.\n• While tracking other creatures, you also learn their exact number, their sizes, and how long ago they passed through the area.\nYou choose additional favored terrain types at 6th and 10th level."
		},
		{
			"name": "Deft Explorer",
			"levels": [
				1
			],
			"optional": true,
			"description": "This 1st-level feature replaces the Natural Explorer feature. You gain no benefit from the replaced feature and don't qualify for anything in the game that requires it.\nYou are an unsurpassed explorer and survivor, both in the wilderness and in dealing with others on your travels. You gain the Canny benefit below, and you gain an additional benefit when you reach 6th level and 10th level in this class.\nCANNY (1ST LEVEL)\nChoose one of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make using the chosen skill.\nYou can also speak, read, and write 2 additional languages of your choice.\nROVING (6TH LEVEL)\nYour walking speed increases by 5, and you gain a climbing speed and a swimming speed equal to your walking speed.\nTIRELESS (10TH LEVEL)\nAs an action, you can give yourself a number of temporary hit points equal to 1d8 + your Wisdom modifier (minimum of 1 temporary hit point). You can use this action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\nIn addition, whenever you finish a short rest, your exhaustion level, if any, is decreased by 1."
		},
		{
			"name": "Fighting Style",
			"levels": [
				2
			],
			"description": "At 2nd level, you adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.\n• Archery. You gain a +2 bonus to attack rolls you make with ranged weapons.\n• Blind Fighting. You have blind sight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.\n• Defense. While you are wearing armor, you gain a +1 bonus to AC.\n• Druidic Warrior. You learn two cantrips of your choice from the Druid spell list. They count as ranger spells for you, and Wisdom is your spellcasting ability for them. Whenever you gain a level in this class, you can replace one of these cantrips with another cantrip from the Druid spell list.\n• Dueling. When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.\n• Thrown Weapon Fighting. You can draw a weapon that has the thrown property as part of the attack you make with the weapon.\n• In addition, when you hit with a ranged attack using a thrown weapon, you gain a +2 bonus to the damage roll.\n• Two-Weapon Fighting. When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.\n• Close Quarters Shooter (UA). When making a ranged attack while you are within 5 feet of a hostile creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half cover and three-quarters cover against targets within 30 feet of you. You have a +1 bonus to attack rolls on ranged attacks.\n• Interception (UA). When a creature you can see hits a target that is within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction.\n• Mariner (UA). As long as you are not wearing heavy armor or using a shield, you have a swimming speed and a climbing speed equal to your normal speed, and you gain a +1 bonus to armor class.\n• Tunnel Fighter (UA). As a bonus action, you can enter a defensive stance that lasts until the start of your next turn. While in your defensive stance, you can make opportunity attacks without using your reaction, and you can use your reaction to make a melee attack against a creature that moves more than 5 feet while within your reach.\n• Unarmed Fighting (UA). Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier. If you strike with two free hands, the d6 becomes a d8.\n• When you successfully start a grapple, you can deal 1d4 bludgeoning damage to the grappled creature. Until the grapple ends, you can also deal this damage to the creature whenever you hit it with a melee attack.",
			"options": [
				{
					"name": "Archery",
					"description": "You gain a +2 bonus to attack rolls you make with ranged weapons."
				},
				{
					"name": "Blind Fighting",
					"description": "You have blind sight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you."
				},
				{
					"name": "Defense",
					"description": "While you are wearing armor, you gain a +1 bonus to AC."
				},
				{
					"name": "Druidic Warrior",
					"description": "You learn two cantrips of your choice from the Druid spell list. They count as ranger spells for you, and Wisdom is your spellcasting ability for them. Whenever you gain a level in this class, you can replace one of these cantrips with another cantrip from the Druid spell list."
				},
				{
					"name": "Dueling",
					"description": "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."
				},
				{
					"name": "Thrown Weapon Fighting",
					"description": "You can draw a weapon that has the thrown property as part of the attack you make with the weapon."
				},
				{
					"name": "Two-Weapon Fighting",
					"description": "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
				},
				{
					"name": "Close Quarters Shooter",
					"source": "UA",
					"description": "When making a ranged attack while you are within 5 feet of a hostile creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half cover and three-quarters cover against targets within 30 feet of you. You have a +1 bonus to attack rolls on ranged attacks."
				},
				{
					"name": "Interception",
					"source": "UA",
					"description": "When a creature you can see hits a target that is within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction."
				},
				{
					"name": "Mariner",
					"source": "UA",
					"description": "As long as you are not wearing heavy armor or using a shield, you have a swimming speed and a climbing speed equal to your normal speed, and you gain a +1 bonus to armor class."
				},
				{
					"name": "Tunnel Fighter",
					"source": "UA",
					"description": "As a bonus action, you can enter a defensive stance that lasts until the start of your next turn. While in your defensive stance, you can make opportunity attacks without using your reaction, and you can use your reaction to make a melee attack against a creature that moves more than 5 feet while within your reach."
				},
				{
					"name": "Unarmed Fighting",
					"source": "UA",
					"description": "Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier. If you strike with two free hands, the d6 becomes a d8."
				}
			]
		},
		{
			"name": "Spellcasting",
			"levels": [
				2
			],
			"description": "By the time you reach 2nd level, you have learned to use the magical essence of nature to cast spells, much as a druid does.\nSPELL SLOTS\nThe Ranger table shows how many spell slots you have to cast your ranger spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nFor example, if you know the 1st-level spell Animal Friendship and have a 1st-level and a 2nd-level spell slot available, you can cast Animal Friendship using either slot.\nSPELLS KNOWN OF 1ST LEVEL AND HIGHER\nYou know two 1st-level spells of your choice from the ranger spell list.\nThe Spells Known column of the Ranger table shows when you learn more ranger spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 5th level in this class, you can learn one new spell of 1st or 2nd level.\nAdditionally, when you gain a level in this class, you can choose one of the ranger spells you know and replace it with another spell from the ranger spell list, which also must be of a level for which you have spell slots.\nSPELLCASTING ABILITY\nWisdom is your spellcasting ability for your ranger spells, since your magic draws on your attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a ranger spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier\nSpell attack modifier = your proficiency bonus + your Wisdom modifier\nSPELLCASTING FOCUS (OPTIONAL)\nAt 2nd level, you can use a druidic focus as a spellcasting focus for your ranger spells. A druidic focus might be a sprig of mistletoe or holly, a wand or rod made of yew or another special wood, a staff drawn whole from a living tree, or an object incorporating feathers, fur, bones, and teeth from sacred animals."
		},
		{
			"name": "Primeval Awareness",
			"levels": [
				3
			],
			"description": "Beginning at 3rd level, you can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether the following types of creatures are present within 1 mile of you (or within up to 6 miles if you are in your favored terrain): aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn't reveal the creatures' location or number."
		},
		{
			"name": "Primal Awareness",
			"levels": [
				3
			],
			"optional": true,
			"description": "This 3rd-level feature replaces the Primeval Awareness feature. You gain no benefit from the replaced feature and don't qualify for anything in the game that requires it.\nYou can focus your awareness through the interconnections of nature: you learn additional spells when you reach certain levels in this class if you don't already know them, as shown in the Primal Awareness Spells table. These spells don't count against the number of ranger spells you know.\nPrimal Awareness Spells | \nRanger Level | Spell\n3rd | Speak with Animals\n5th | Beast Sense\n9th | Speak with Plants\n13th | Locate Creature\n17th | Commune with Nature\nYou can cast each of these spells once without expending a spell slot. Once you cast a spell in this way, you can't do so again until you finish a long rest."
		},
		{
			"name": "Ranger Conclave",
			"levels": [
				3
			],
			"description": "At 3rd level, you choose to emulate the ideals and training of a ranger conclave. Your choice grants you features at 3rd level and again at 7th, 11th, and 15th level.\nConclave | Source\nBeast Master | Player's Handbook\nFey Wanderer | Tasha's Cauldron of Everything\nGloom Stalker | Xanathar's Guide to Everything\nHorizon Walker | Xanathar's Guide to Everything\nHunter | Player's Handbook\nMonster Slayer | Xanathar's Guide to Everything\nSwarmkeeper | Tasha's Cauldron of Everything\nDrakewarden | Fizban's Treasury of Dragons\nUnearthed Arcana\nDrakewarden (UA) | Unearthed Arcana 75 - Subclasses, Part 5\nArchived Unearthed Arcana\nRanger, Revised | Unearthed Arcana 17 - The Ranger, Revised\nDeep Stalker | Unearthed Arcana 10 - Light, Dark, Underdark!\nFey Wanderer | Unearthed Arcana 69 - Subclasses, Part 3\nMonster Slayer | Unearthed Arcana 35 - A Trio of Subclasses\nPrimeval Guardian | Unearthed Arcana 27 - Ranger & Rogue\nSwarmkeeper | Unearthed Arcana 64 - Fighter, Ranger, Rogue"
		},
		{
			"name": "Ability Score Improvement",
			"levels": [
				4,
				8,
				12,
				16,
				19
			],
			"description": "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature."
		},
		{
			"name": "Martial Versatility",
			"levels": [
				4,
				8,
				12,
				16,
				19
			],
			"optional": true,
			"description": "Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace a fighting style you know with another fighting style available to rangers. This replacement represents a shift of focus in your martial practice."
		},
		{
			"name": "Extra Attack",
			"levels": [
				5
			],
			"description": "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn."
		},
		{
			"name": "Land's Stride",
			"levels": [
				8
			],
			"description": "Starting at 8th level, moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.\nIn addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such as those created by the Entangle spell."
		},
		{
			"name": "Hide in Plain Sight",
			"levels": [
				10
			],
			"description": "Starting at 10th level, you can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage.\nOnce you are camouflaged in this way, you can try to hide by pressing yourself up against a solid surface, such as a tree or wall, that is at least as tall and wide as you are. You gain a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or taking actions. Once you move or take an action or a reaction, you must camouflage yourself again to gain this benefit."
		},
		{
			"name": "Nature's Veil",
			"levels": [
				10
			],
			"optional": true,
			"description": "This 10th-level feature replaces the Hide in Plain Sight feature. You gain no benefit from the replaced feature and don't qualify for anything in the game that requires it.\nYou draw on the powers of nature to hide yourself from view briefly. As a bonus action, you can magically become invisible, along with any equipment you are wearing or carrying, until the start of your next turn.\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
		},
		{
			"name": "Vanish",
			"levels": [
				14
			],
			"description": "Starting at 14th level, you can use the Hide action as a bonus action on your turn. Also, you can't be tracked by nonmagical means, unless you choose to leave a trail."
		},
		{
			"name": "Feral Senses",
			"levels": [
				18
			],
			"description": "At 18th level, you gain preternatural senses that help you fight creatures you can't see. When you attack a creature you can't see, your inability to see it doesn't impose disadvantage on your attack rolls against it.\nYou are also aware of the location of any invisible creature within 30 feet of you, provided that the creature isn't hidden from you and you aren't blinded or deafened."
		},
		{
			"name": "Foe Slayer",
			"levels": [
				20
			],
			"description": "At 20th level, you become an unparalleled hunter of your enemies. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies. You can choose to use this feature before or after the roll, but before any effects of the roll are applied."
		}
	],
	"subclasses": [
		{
			"name": "Beast Master",
			"slug": "beast-master",
			"source": "Player's Handbook",
			"summary": "The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world. United in focus, beast and ranger work as one to fight the monstrous foes that threaten civilization and the wilderness alike. Emulating the Beast Master archetype means committing yourself to this ideal, working in partnership with an animal as its companion and friend.",
			"features": [
				{
					"name": "Ranger's Companion",
					"level": 3,
					"description": "At 3rd level, you gain a beast companion that accompanies you on your adventures and is trained to fight alongside you. Choose a beast that is no larger than Medium and that has a challenge rating of 1/4 or lower (Player's Handbook Appendix D presents statistics for the hawk, mastiff, and panther as examples). Add your proficiency bonus to the beast's AC, attack rolls, and damage rolls, as well as to any saving throws and skills it is proficient in. Its hit point maximum equals its normal maximum or four times your ranger level, whichever is higher. Like any creature, the beast can spend Hit Dice during a short rest.\nThe beast obeys your commands as best as it can. It takes its turn on your initiative. On your turn, you can verbally command the beast where to move (no action required by you). You can use your action to verbally command it to take the Attack, Dash, Disengage, or Help action. If you don't issue a command, the beast takes the Dodge action. Once you have the Extra Attack feature, you can make one weapon attack yourself when you command the beast to take the Attack action. While traveling through your favored terrain with only the beast, you can move stealthily at a normal pace.\nIf you are incapacitated or absent, the beast acts on its own, focusing on protecting you and itself. The beast never requires your command to use its reaction, such as when making an opportunity attack.\nIf the beast dies, you can obtain another one by spending 8 hours magically bonding with another beast that isn't hostile to you, either the same type of beast as before or a different one."
				},
				{
					"name": "Primal Companion",
					"level": 3,
					"description": "This 3rd-level feature replaces the Ranger's Companion feature.\nYou magically summon a primal beast, which draws strength from your bond with nature. The beast is friendly to you and your companions and obeys your commands. Choose its stat block-Beast of the Land, Beast of the Sea, or Beast of the Sky-which uses your proficiency bonus (PB) in several places. You also determine the kind of animal the beast is, choosing a kind appropriate for the stat block. Whatever kind you choose, the beast bears primal markings, indicating its mystical origin.\nIn combat, the beast acts during your turn. It can move and use its reaction on its own, but the only action it takes is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. You can also sacrifice one of your attacks when you take the Attack action to command the beast to take the Attack action. If\nyou are incapacitated, the beast can take any action of its choice, not just Dodge.\nIf the beast has died within the last hour, you can use your action to touch it and expend a spell slot of 1st level or higher. The beast returns to life after 1 minute with all its hit points restored. When you finish a long rest, you can summon a different primal beast. The new beast appears in an unoccupied space within 5 feet of you, and you choose its stat block and appearance. If you already have a beast from this feature, it vanishes when the new beast appears. The beast also vanishes if you die.\nBeast of the Land\nMedium beast\nArmor Class: 13 + PB (natural armor)\nHit Points: 5 + five times your ranger level (the beast has a number of Hit Dice [d8s] equal to your ranger level)\nSpeed: 40 ft., climb 40ft.\nSTR | DEX | CON | INT | WIS | CHA\n14 (+2) | 14 (+2) | 15 (+2) | 8 (−1) | 14 (+2) | 11 (+0)\nSenses: darkvision 60 ft., passive Perception 12\nLanguages: understands the languages you speak\nChallenge: —\nProficiency Bonus (PB): equals your bonus\nCharge: If the beast moves at least 20 feet straight toward a target and then hits it with a maul attack on the same turn, the target takes an extra 1d6 slashing damage. If the target is a creature, it must succeed on a Strength saving throw against your spell save DC or be knocked prone.\nPrimal Bond: You can add your proficiency bonus to any ability check or saving throw that the beast makes.\nActions\nMaul. Melee Weapon Attack: your spell attack modifier to hit, reach 5 ft., one target. Hit: 1d8 + 2 + PB slashing damage.\nBeast of the Sea\nMedium beast\nArmor Class: 13 + PB (natural armor)\nHit Points: 5 + five times your ranger level (the beast has a number of Hit Dice [d8s] equal to your ranger level)\nSpeed: 5 ft., swim 60ft.\nSTR | DEX | CON | INT | WIS | CHA\n14 (+2) | 14 (+2) | 15 (+2) | 8 (−1) | 14 (+2) | 11 (+0)\nSenses: darkvision 60 ft., passive Perception 12\nLanguages: understands the languages you speak\nChallenge: —\nProficiency Bonus (PB): equals your bonus\nAmphibious: The beast can breathe both air and water.\nPrimal Bond: You can add your proficiency bonus to any ability check or saving throw that the beast makes.\nActions\nBinding Strike. Melee Weapon Attack: your spell attack modifier to hit, reach 5 ft., one target. Hit: 1d6 + 2 + PB piercing or bludgeoning damage (your choice), and the target is grappled (escape DC equals your spell save DC). Until this grapple ends, the beast can't use this attack on another target.\nBeast of the Sky\nSmall beast\nArmor Class: 13 + PB (natural armor)\nHit Points: 4 + four times your ranger level (the beast has a number of Hit Dice [d6s] equal to your ranger level)\nSpeed: 10 ft., fly 60ft.\nSTR | DEX | CON | INT | WIS | CHA\n6 (-2) | 16 (+3) | 13 (+1) | 8 (−1) | 14 (+2) | 11 (+0)\nSenses: darkvision 60 ft., passive Perception 12\nLanguages: understands the languages you speak\nChallenge: —\nProficiency Bonus (PB): equals your bonus\nFlyby: The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach.\nPrimal Bond: You can add your proficiency bonus to any ability check or saving throw that the beast makes.\nActions\nShred. Melee Weapon Attack: your spell attack modifier to hit, reach 5 ft., one target. Hit: 1d4 + 3 + PB slashing damage."
				},
				{
					"name": "Exceptional Training",
					"level": 7,
					"description": "Beginning at 7th level, on any of your turns when your beast companion doesn't attack, you can use a bonus action to command the beast to take the Dash, Disengage, or Help action on its turn. In addition, the beast's attacks now count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
				},
				{
					"name": "Bestial Fury",
					"level": 11,
					"description": "Starting at 11th level, when you command your beast companion to take the Attack action, the beast can make two attacks, or it can take the Multiattack action if it has that action."
				},
				{
					"name": "Share Spells",
					"level": 15,
					"description": "Beginning at 15th level, when you cast a spell targeting yourself, you can also affect your beast companion with the spell if the beast is within 30 feet of you."
				}
			]
		},
		{
			"name": "Fey Wanderer",
			"slug": "fey-wanderer",
			"source": "Tasha's Cauldron of Everything",
			"summary": "A fey mystique surrounds you, thanks to the boon of an archfey, the shining fruit you ate from a talking tree, the magic spring you swam in, or some other auspicious event. However you acquired your fey magic, you are now a Fey Wanderer, a ranger who represents both the mortal and the fey realms. As you wander the multiverse, your joyful laughter brightens the hearts of the downtrodden, and your martial prowess strikes terror in your foes, for great is the mirth of the fey and dreadful is their fury.",
			"features": [
				{
					"name": "Dreadful Strikes",
					"level": 3,
					"description": "At 3rd level, you can augment your weapon strikes with mind-scarring magic, drawn from the gloomy hollows of the Feywild. When you hit a creature with a weapon, you can deal an extra 1d4 psychic damage to the target, which can take this extra damage only once per turn.\nThe extra damage increases to 1d6 when you reach 11th level in this class."
				},
				{
					"name": "Fey Wanderer Magic",
					"level": 3,
					"description": "Also at 3rd level, you learn an additional spell when you reach certain levels in this class, as shown in the Fey Wanderer Spells table. Each spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.\nFey Wanderer spells | \nRanger Level | Spell\n3rd | Charm Person\n5th | Misty Step\n9th | Dispel Magic\n13th | Dimension Door\n17th | Mislead\nYou also possess a preternatural blessing from a fey ally or a place of fey power. Choose your blessing from the Feywild Gifts table or determine it randomly.\nFeywild Gifts | \nd6 | Gift\n1 | Illusory butterflies flutter around you while you take a short or long rest.\n2 | Fresh, seasonal flowers sprout from your hair each dawn.\n3 | You faintly smell of cinnamon, lavender, nutmeg, or another comforting herb or spice.\n4 | Your shadow dances while no one is looking directly at it.\n5 | Horns or antlers sprout from your head.\n6 | Your skin and hair change color to match the season at each dawn."
				},
				{
					"name": "Otherworldly Glamour",
					"level": 3,
					"description": "Additionally at 3rd level, your fey qualities give you a supernatural charm. As a result, whenever you make a Charisma check, you gain a bonus to the check equal to your Wisdom modifier (minimum of +1).\nIn addition, you gain proficiency in one of the following skills of your choice: Deception, Performance, or Persuasion."
				},
				{
					"name": "Beguiling Twist",
					"level": 7,
					"description": "Beginning at 7th level, the magic of the Feywild guards your mind. You have advantage on saving throws against being charmed or frightened.\nIn addition, whenever you or a creature you can see within 120 feet of you succeeds on a saving throw against being charmed or frightened, you can use your reaction to force a different creature you can see within 120 feet of you to make a Wisdom saving throw against your spell save DC. If the save fails, the target is charmed or frightened by you (your choice) for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a successful save."
				},
				{
					"name": "Fey Reinforcements",
					"level": 11,
					"description": "At 11th level, the royal courts of the Feywild have blessed you with the assistance of fey beings: you know the spell Summon Fey. It doesn't count against the number of ranger spells you know, and you can cast it without a material component. You can also cast it once without using a spell slot, and you regain the ability to do so when you finish a long rest.\nWhenever you start casting the spell, you can modify it so that it doesn't require concentration. If you do so, the spell's duration becomes 1 minute for that casting."
				},
				{
					"name": "Misty Wanderer",
					"level": 15,
					"description": "When you reach 15th level, you can slip in and out of the Feywild to move in a blink of an eye: you can cast Misty Step without expending a spell slot. You can do so a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a long rest.\nIn addition, whenever you cast Misty Step, you can bring along one willing creature you can see within 5 feet of you. That creature teleports to an unoccupied space of your choice within 5 feet of your destination space."
				}
			]
		},
		{
			"name": "Gloom Stalker",
			"slug": "gloom-stalker",
			"source": "Xanathar's Guide to Everything",
			"summary": "deep under the earth, in gloomy alleyways, in primeval forests, and wherever else the light dims. Most folk enter such places with trepidation, but a gloom stalker ventures boldly into the darkness, seeking to ambush threats before they can reach the broader world. Such rangers are often found in the Underdark, but they will go any place where evil lurks in the shadows.",
			"features": [
				{
					"name": "Gloom Stalker Magic",
					"level": 3,
					"description": "Starting at 3rd level, you learn an additional spell when you reach certain levels in this class, as shown in the Gloom Stalker Spells table. The spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.\nGloom Stalker Spells\nRanger Level | Spells\n3rd | Disguise Self\n5th | Rope Trick\n9th | Fear\n13th | Greater Invisibility\n17th | Seeming"
				},
				{
					"name": "Dread Ambusher",
					"level": 3,
					"description": "At 3rd level, you master the art of the ambush. You can give yourself a bonus to your initiative rolls equal to your Wisdom modifier.\nAt the start of your first turn of each combat, your walking speed increases by 10 feet, which lasts until the end of that turn. If you take the Attack action on that turn, you can make one additional weapon attack as part of that action. If that attack hits, the target takes an extra 1d8 damage of the weapon's damage type."
				},
				{
					"name": "Umbral Sight",
					"level": 3,
					"description": "At 3rd level, you gain darkvision out to a range of 60 feet. If you already have darkvision from your race, its range increases by 30 feet.\nYou are also adept at evading creatures that rely on darkvision. While in darkness, you are invisible to any creature that relies on darkvision to see you in that darkness."
				},
				{
					"name": "Iron Mind",
					"level": 7,
					"description": "By 7th level, you have honed your ability to resist the mind-altering powers of your prey. You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice)."
				},
				{
					"name": "Stalker's Flurry",
					"level": 11,
					"description": "At 11th level, you learn to attack with such unexpected speed that you can turn a miss into another strike. Once on each of your turns when you miss with a weapon attack, you can make another weapon attack as part of the same action."
				},
				{
					"name": "Shadowy Dodge",
					"level": 15,
					"description": "Starting at 15th level, you can dodge in unforeseen ways, with wisps of supernatural shadow around you. Whenever a creature makes an attack roll against you and doesn't have advantage on the roll, you can use your reaction to impose disadvantage on it. You must use this feature before you know the outcome of the attack roll."
				}
			]
		},
		{
			"name": "Horizon Walker",
			"slug": "horizon-walker",
			"source": "Xanathar's Guide to Everything",
			"summary": "Horizon walkers guard the world against threats that originate from other planes or that seek to ravage the mortal realm with otherworldly magic. They seek out planar portals and keep watch over them, venturing to the Inner Planes and the Outer Planes as needed to pursue their foes. These rangers are also friends to any forces in the multiverse – especially benevolent dragons, fey, and elementals – that work to preserve life and the order of the planes.",
			"features": [
				{
					"name": "Horizon Walker Magic",
					"level": 3,
					"description": "Starting at 3rd level, you learn an additional spell when you reach certain levels in this class, as shown in the Horizon Walker Spells table. The spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.\nHorizon Walker Spells\nRanger Level | Spells\n3rd | Protection from Evil and Good\n5th | Misty Step\n9th | Haste\n13th | Banishment\n17th | Teleportation Circle"
				},
				{
					"name": "Detect Portal",
					"level": 3,
					"description": "At 3rd level, you gain the ability to magically sense the presence of a planar portal. As an action, you detect the distance and direction to the closest planar portal within 1 mile of you.\nOnce you use this feature, you can't use it again until you finish a short or long rest.\nSee the \"Planar Travel\" section in chapter 2 of the Dungeon Master's Guide for examples of planar portals."
				},
				{
					"name": "Planar Warrior",
					"level": 3,
					"description": "At 3rd level, you learn to draw on the energy of the multiverse to augment your attacks.\nAs a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack. When you reach 11th level in this class, the extra damage increases to 2d8."
				},
				{
					"name": "Ethereal Step",
					"level": 7,
					"description": "At 7th level, you learn to step through the Ethereal Plane. As a bonus action on your turn, you can cast the Etherealness spell with this feature, without expending a spell slot, but the spell ends at the end of the current turn.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Distant Strike",
					"level": 11,
					"description": "At 11th level, you gain the ability to pass between the planes in a blink of an eye. When you use the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see.\nIf you attack at least two different creatures with the action, you can make one additional attack with it against a third creature."
				},
				{
					"name": "Spectral Defense",
					"level": 15,
					"description": "At 15th level, your ability to move between planes enables you to slip through the planar boundaries to lessen the harm done to you during battle. When you take damage from an attack, you can use your reaction to give yourself resistance to all of that attack's damage on this turn."
				}
			]
		},
		{
			"name": "Hunter",
			"slug": "hunter",
			"source": "Player's Handbook",
			"summary": "Some rangers seek to master weapons to better protect civilization from the terrors of the wilderness. Members of the Hunter Conclave learn specialized fighting techniques for use against the most dire threats, from rampaging ogres and hordes of orcs to towering giants and terrifying dragons.",
			"features": [
				{
					"name": "Hunter's Prey",
					"level": 3,
					"description": "At 3rd level, you gain one of the following features of your choice.\n• Colossus Slayer. Your tenacity can wear down the most potent foes. When you hit a creature with a weapon attack, the creature takes an extra 1d8 damage if it's below its hit point maximum. You can deal this extra damage only once per turn.\n• Giant Killer. When a Large or larger creature within 5 feet of you hits or misses you with an attack, you can use your reaction to attack that creature immediately after its attack, provided that you can see the creature.\n• Horde Breaker. Once on each of your turns when you make a weapon attack, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target and within range of your weapon.",
					"options": [
						{
							"name": "Colossus Slayer",
							"description": "Your tenacity can wear down the most potent foes. When you hit a creature with a weapon attack, the creature takes an extra 1d8 damage if it's below its hit point maximum. You can deal this extra damage only once per turn."
						},
						{
							"name": "Giant Killer",
							"description": "When a Large or larger creature within 5 feet of you hits or misses you with an attack, you can use your reaction to attack that creature immediately after its attack, provided that you can see the creature."
						},
						{
							"name": "Horde Breaker",
							"description": "Once on each of your turns when you make a weapon attack, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target and within range of your weapon."
						}
					]
				},
				{
					"name": "Defensive Tactics",
					"level": 7,
					"description": "At 7th level, you gain one of the following features of your choice.\n• Escape the Horde. Opportunity attacks against you are made with disadvantage.\n• Multiattack Defense. When a creature hits you with an attack, you gain a +4 bonus to AC against all subsequent attacks made by that creature for the rest of the turn.\n• Steel Will. You have advantage on saving throws against being frightened.",
					"options": [
						{
							"name": "Escape the Horde",
							"description": "Opportunity attacks against you are made with disadvantage."
						},
						{
							"name": "Multiattack Defense",
							"description": "When a creature hits you with an attack, you gain a +4 bonus to AC against all subsequent attacks made by that creature for the rest of the turn."
						},
						{
							"name": "Steel Will",
							"description": "You have advantage on saving throws against being frightened."
						}
					]
				},
				{
					"name": "Multiattack",
					"level": 11,
					"description": "At 11th level, you gain one of the following features of your choice.\n• Volley. You can use your action to make a ranged attack against any number of creatures within 10 feet of a point you can see within your weapon's range. You must have ammunition for each target, as normal, and you make a separate attack roll for each target\n• Whirlwind Attack. You can use your action to make melee attacks against any number of creatures within 5 feet of you, with a separate attack roll for each target.",
					"options": [
						{
							"name": "Volley",
							"description": "You can use your action to make a ranged attack against any number of creatures within 10 feet of a point you can see within your weapon's range. You must have ammunition for each target, as normal, and you make a separate attack roll for each target"
						},
						{
							"name": "Whirlwind Attack",
							"description": "You can use your action to make melee attacks against any number of creatures within 5 feet of you, with a separate attack roll for each target."
						}
					]
				},
				{
					"name": "Superior Hunter's Defense",
					"level": 15,
					"description": "At 15th level, you gain one of the following features of your choice.\n• Evasion. When you are subjected to an effect, such as a red dragon's fiery breath or a lightning bolt spell, that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on a saving throw, and only half damage if you fail\n• Stand Against the Tide. When a hostile creature misses you with a melee attack, you can use your reaction to force that creature to repeat the same attack against another creature (other than itself) of your choice.\n• Uncanny Dodge. When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage against you.",
					"options": [
						{
							"name": "Evasion",
							"description": "When you are subjected to an effect, such as a red dragon's fiery breath or a lightning bolt spell, that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on a saving throw, and only half damage if you fail"
						},
						{
							"name": "Stand Against the Tide",
							"description": "When a hostile creature misses you with a melee attack, you can use your reaction to force that creature to repeat the same attack against another creature (other than itself) of your choice."
						},
						{
							"name": "Uncanny Dodge",
							"description": "When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage against you."
						}
					]
				}
			]
		},
		{
			"name": "Monster Slayer",
			"slug": "monster-slayer",
			"source": "Xanathar's Guide to Everything",
			"summary": "You have dedicated yourself to hunting down creatures of the night and wielders of grim magic. A monster slayer seeks out vampires, dragons, evil fey, fiends, and other magical threats. Trained in supernatural techniques to overcome such monsters, slayers are experts at unearthing and defeating mighty, mystical foes.",
			"features": [
				{
					"name": "Monster Slayer Magic",
					"level": 3,
					"description": "Starting at 3rd level, you learn an additional spell when you reach certain levels in this class, as shown in the Monster Slayer Spells table. The spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.\nMonster Slayer Spells\nRanger Level | Spells\n3rd | Protection from Evil and Good\n5th | Zone of Truth\n9th | Magic Circle\n13th | Banishment\n17th | Hold Monster"
				},
				{
					"name": "Hunter's Sense",
					"level": 3,
					"description": "At 3rd level, you gain the ability to peer at a creature and magically discern how best to hurt it. As an action, choose one creature you can see within 60 feet of you. You immediately learn whether the creature has any damage immunities, resistances, or vulnerabilities and what they are. If the creature is hidden from divination magic, you sense that it has no damage immunities, resistances, or vulnerabilities.\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Slayer's Prey",
					"level": 3,
					"description": "Starting at 3rd level, you can focus your ire on one foe, increasing the harm you inflict on it. As a bonus action, you designate one creature you can see within 60 feet of you as the target of this feature. The first time each turn that you hit that target with a weapon attack, it takes an extra 1d6 damage from the weapon.\nThis benefit lasts until you finish a short or long rest. It ends early if you designate a different creature."
				},
				{
					"name": "Supernatural Defense",
					"level": 7,
					"description": "At 7th level, you gain extra resilience against your prey's assaults on your mind and body. Whenever the target of your Slayer's Prey forces you to make a saving throw and whenever you make an ability check to escape that target's grapple, add 1d6 to your roll."
				},
				{
					"name": "Magic-User's Nemesis",
					"level": 11,
					"description": "At 11th level, you gain the ability to thwart someone else's magic. When you see a creature casting a spell or teleporting within 60 feet of you, you can use your reaction to try to magically foil it. The creature must succeed on a Wisdom saving throw against your spell save DC, or its spell or teleport fails and is wasted.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Slayer's Counter",
					"level": 15,
					"description": "At 15th level, you gain the ability to counterattack when your prey tries to sabotage you. If the target of your Slayer's Prey forces you to make a saving throw, you can use your reaction to make one weapon attack against the quarry. You make this attack immediately before making the saving throw. If the attack hits, your save automatically succeeds, in addition to the attack's normal effects."
				}
			]
		},
		{
			"name": "Swarmkeeper",
			"slug": "swarmkeeper",
			"source": "Tasha's Cauldron of Everything",
			"summary": "Feeling a deep connection to the environment around them, some rangers reach out through their magical connection to the world and bond with a swarm of nature spirits. The swarm becomes a potent force in battle, as well as helpful company for the ranger. Some Swarmkeepers are outcasts or hermits, keeping to themselves and their attendant swarms rather than dealing with the discomfort of others. Other Swarmkeepers enjoy building vibrant communities that work for the mutual benefit of all those they consider part of their swarm.",
			"features": [
				{
					"name": "Gathered Swarm",
					"level": 3,
					"description": "At 3rd level, a swarm of intangible nature spirits has bonded itself to you and can assist you in battle. While you're alive, the swarm remains in your space, crawling on you or flying and skittering around you within your space. You determine its appearance, or you generate its appearance by rolling on the Swarm Appearance table.\nSwarm Appearance | \nd4 | Appearance\n1 | Swarming insects\n2 | Miniature twig blights\n3 | Fluttering birds\n4 | Playful pixies\nOnce on each of your turns, you can cause the swarm to assist you in one of the following ways, immediately after you hit a creature with an attack:\n• The attack's target takes 1d6 piercing damage from the swarm.\n• The attack's target must succeed on a Strength saving throw against your spell save DC or be moved by the swarm up to 15 feet horizontally in a direction of your choice.\n• You are moved by the swarm 5 feet horizontally in a direction of your choice."
				},
				{
					"name": "Swarmkeeper Magic",
					"level": 3,
					"description": "Also at 3rd level, you learn the Mage Hand cantrip if you don't already know it. When you cast it, the hand takes the form of your swarming nature spirits.\nYou also learn an additional spell of 1st level or higher when you reach certain levels in this class, as shown in the Swarmkeeper Spells table. Each spell counts as a ranger spell for you, but it doesn't count against the number of ranger spells you know.\nSwarmkeeper spells | \nRanger Level | Spell\n3rd | Faerie Fire, Mage Hand\n5th | Web\n9th | Gaseous Form\n13th | Arcane Eye\n17th | Insect Plague"
				},
				{
					"name": "Writhing Tide",
					"level": 7,
					"description": "Beginning at 7th level, you can condense part of your swarm into a focused mass that lifts you up. As a bonus action, you gain a flying speed of 10 feet and can hover. This effect lasts for 1 minute or until you are incapacitated.\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Mighty Swarm",
					"level": 11,
					"description": "At 11th level, your Gathered Swarm grows mightier in the following ways:\n• The damage of Gathered Swarm increases to 1d8.\n• If a creature fails its saving throw against being moved by the Gathered Swarm, you can also cause the swarm to knock the creature prone.\n• When you are moved by Gathered Swarm, it gives you half cover until the start of your next turn."
				},
				{
					"name": "Swarming Dispersal",
					"level": 15,
					"description": "When you reach 15th level, you can discorporate into your swarm, avoiding danger. When you take damage, you can use your reaction to give yourself resistance to that damage. You vanish into your swarm and then teleport to an unoccupied space that you can see within 30 feet of you, where you reappear with the swarm.\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				}
			]
		},
		{
			"name": "Drakewarden",
			"slug": "drakewarden",
			"source": "Fizban's Treasury of Dragons",
			"summary": "Your connection to the natural world takes the form of a draconic spirit, which can manifest in physical form as a drake. As your powers grow, your drake grows as well, blossoming from a small four-legged companion to a majestic winged creature large and strong enough for you to ride. Along the way, you gain an increasing share of the awe-inspiring power of dragons.\nThe Drakewarden Origin table offers examples.",
			"features": [
				{
					"name": "Drakewarden Origin",
					"level": 3,
					"description": "d6 | Origin\n1 | You studied a dragon's scale or claw, or a trinket from a dragon's hoard, creating your bond through that token's lingering draconic magic.\n2 | A secret order of rangers who collect and guard draconic lore taught you their ways.\n3 | A dragon gave you a geode or gemstone to care for. To your surprise, the drake hatched from that stone.\n4 | You ingested a few drops of dragon blood, forever infusing your nature magic with draconic power.\n5 | An ancient Draconic inscription on a standing stone empowered you when you read it aloud.\n6 | You had a vivid dream of a mysterious figure accompanied by seven yellow canaries, who warned you of impending doom. When you awoke, your drake was there, watching you."
				},
				{
					"name": "Draconic Gift",
					"level": 3,
					"description": "At 3rd level, the bond you share with your drake creates a connection to dragonkind, granting you understanding and empowering your presence.\nYou gain the following benefits:\n• Thaumaturgy. You learn the Thaumaturgy cantrip, which is a ranger spell for you.\n• Tongue of Dragons. You learn to speak, read, and write Draconic or one other language of your choice."
				},
				{
					"name": "Drake Companion",
					"level": 3,
					"description": "At 3rd level, as an action, you can magically summon the drake that is bound to you. It appears in an unoccupied space of your choice within 30 feet of you.\nThe drake is friendly to you and your companions, and it obeys your commands. See its game statistics in the accompanying Drake Companion stat block, which uses your proficiency bonus (PB) in several places. Whenever you summon the drake, choose a damage type listed in its Draconic Essence trait. You can determine the cosmetic characteristics of the drake, such as its color, its scale texture, or any visible effect of its Draconic Essence; your choice has no effect on its game statistics.\nIn combat, the drake shares your initiative count, but it takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the drake can take any action of its choice, not just Dodge.\nThe drake remains until it is reduced to 0 hit points, until you use this feature to summon the drake again, or until you die. Anything the drake was wearing or carrying is left behind when the drake vanishes.\nOnce you summon the drake, you can't do so again until you finish a long rest, unless you expend a spell slot of 1st level or higher to summon it.\nDrake Companion\nSmall dragon\nArmor Class: 14 + PB (natural armor)\nHit Points: 5 + five times your ranger level (the drake has a number of hit dice [d10s] equal to your ranger level)\nSpeed: 40 ft.\nSTR | DEX | CON | INT | WIS | CHA\n16 (+3) | 12 (+1) | 15 (+2) | 8 (−1) | 14 (+2) | 8 (−1)\nSaving Throws: Dex +1 plus PB, Wis +2 plus PB\nDamage Immunities: determined by the drake's Draconic Essence trait\nSenses: darkvision 60 ft., passive Perception 12\nLanguages: Draconic\nChallenge: Proficiency Bonus (PB) equals your bonus\nDraconic Essence. When you summon the drake, choose a damage type: acid, cold, fire, lightning, or poison. The chosen type determines the drake's damage immunity and the damage of its Infused Strikes trait.\nActions\nBite. Melee Weapon Attack: +3 plus PB to hit, reach 5 ft., one target. Hit: 1d6 plus PB piercing damage.\nReactions\nInfused Strikes. When another creature within 30 feet of the drake that it can see hits a target with a weapon attack, the drake infuses the strike with its essence, causing the target to take an extra 1d6 damage of the type determined by its Draconic Essence."
				},
				{
					"name": "Bond of Fang and Scale",
					"level": 7,
					"description": "At 7th level the bond you share with your drake intensifies, protecting you and stoking the drake's fury. When you summon your drake, it grows wings on its back and gains a flying speed equal to its walking speed.\nIn addition, while your drake is summoned, you and the drake gain the following benefits:\nDrake Mount. The drake grows to Medium size. Reflecting your special bond, you can use the drake as a mount if your size is Medium or smaller. While you are riding your drake, it can't use the flying speed of this feature.\nMagic Fang. The drake's Bite attack deals an extra 1d6 damage of the type chosen for the drake's Draconic Essence.\nResistance. You gain resistance to the damage type chosen for the drake's Draconic Essence.",
					"options": [
						{
							"name": "Drake Mount",
							"description": "The drake grows to Medium size. Reflecting your special bond, you can use the drake as a mount if your size is Medium or smaller. While you are riding your drake, it can't use the flying speed of this feature."
						},
						{
							"name": "Magic Fang",
							"description": "The drake's Bite attack deals an extra 1d6 damage of the type chosen for the drake's Draconic Essence."
						},
						{
							"name": "Resistance",
							"description": "You gain resistance to the damage type chosen for the drake's Draconic Essence."
						}
					]
				},
				{
					"name": "Drake's Breath",
					"level": 11,
					"description": "At 11th level, as an action, you can exhale a 30-foot cone of damaging breath or cause your drake to exhale it. Choose acid, cold, fire, lightning, or poison damage (your choice doesn't have to match your drake's Draconic Essence). Each creature in the cone must make a Dexterity saving throw against your spell save DC, taking 8d6 damage on a failed save, or half as much damage on a successful one.\nThis damage increases to 10d6 when you reach 15th level in this class.\nOnce you use this feature, you can't do so again until you finish a long rest, unless you expend a spell slot of 3rd level or higher to use it again."
				},
				{
					"name": "Perfected Bond",
					"level": 15,
					"description": "At 15th level, your bond to your drake reaches the pinnacle of its power. While your drake is summoned, you and the drake gain the following benefits:\nEmpowered Bite. The drake's Bite attack deals an extra 1d6 damage of the type chosen for its Draconic Essence (for a total of 2d6 extra damage).\nLarge Drake. The drake grows to Large size. When you ride your drake, it is no longer prohibited from using the flying speed of Bond of Fang and Scale.\nReflexive Resistance. When either you or the drake takes damage while you're within 30 feet of each other, you can use your reaction to give yourself or the drake resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
					"options": [
						{
							"name": "Empowered Bite",
							"description": "The drake's Bite attack deals an extra 1d6 damage of the type chosen for its Draconic Essence (for a total of 2d6 extra damage)."
						},
						{
							"name": "Large Drake",
							"description": "The drake grows to Large size. When you ride your drake, it is no longer prohibited from using the flying speed of Bond of Fang and Scale."
						},
						{
							"name": "Reflexive Resistance",
							"description": "When either you or the drake takes damage while you're within 30 feet of each other, you can use your reaction to give yourself or the drake resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
						}
					]
				}
			]
		}
	]
};

export default ranger;
