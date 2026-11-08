const wizard = {
	"name": "Wizard",
	"hitDie": 6,
	"startingGold": "4d4 x 10",
	"subclassName": "Arcane Tradition",
	"suggestedAbilities": "Intelligence, Constitution / Dexterity / Charisma",
	"primaryAbility": [
		"Intelligence"
	],
	"spellcastingAbility": "Intelligence",
	"subclassLevel": 2,
	"subclassFeatureLevels": [
		6,
		10,
		14
	],
	"armorProficiencies": "None",
	"weaponProficiencies": "Daggers, darts, slings, quarterstaffs, light crossbows",
	"toolProficiencies": "None",
	"savingThrows": [
		"Intelligence",
		"Wisdom"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"Arcana",
			"History",
			"Insight",
			"Investigation",
			"Medicine",
			"Religion"
		],
		"raw": "Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion"
	},
	"startingEquipment": [
		"(a) a quarterstaff or (b) a dagger",
		"(a) a component pouch or (b) an arcane focus",
		"(a) a scholar's pack or (b) an explorer's pack",
		"A spellbook"
	],
	"table": {
		"caption": "The Wizard",
		"columns": [
			"Level",
			"Proficiency Bonus",
			"Features",
			"Cantrips Known",
			"Spell Slots per Spell Level 1st",
			"Spell Slots per Spell Level 2nd",
			"Spell Slots per Spell Level 3rd",
			"Spell Slots per Spell Level 4th",
			"Spell Slots per Spell Level 5th",
			"Spell Slots per Spell Level 6th",
			"Spell Slots per Spell Level 7th",
			"Spell Slots per Spell Level 8th",
			"Spell Slots per Spell Level 9th"
		],
		"rows": [
			[
				"1st",
				"+2",
				"Spellcasting, Arcane Recovery",
				"3",
				"2",
				"-",
				"-",
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
				"Arcane Tradition",
				"3",
				"3",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"3rd",
				"+2",
				"Cantrip Formulas (Optional)",
				"3",
				"4",
				"2",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"4th",
				"+2",
				"Ability Score Improvement",
				"4",
				"4",
				"3",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"5th",
				"+3",
				"",
				"4",
				"4",
				"3",
				"2",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"6th",
				"+3",
				"Arcane Tradition feature",
				"4",
				"4",
				"3",
				"3",
				"-",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"7th",
				"+3",
				"",
				"4",
				"4",
				"3",
				"3",
				"1",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"8th",
				"+3",
				"Ability Score Improvement",
				"4",
				"4",
				"3",
				"3",
				"2",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"9th",
				"+4",
				"",
				"4",
				"4",
				"3",
				"3",
				"3",
				"1",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"10th",
				"+4",
				"Arcane Tradition feature",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"11th",
				"+4",
				"",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"-",
				"-",
				"-"
			],
			[
				"12th",
				"+4",
				"Ability Score Improvement",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"-",
				"-",
				"-"
			],
			[
				"13th",
				"+5",
				"",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"1",
				"-",
				"-"
			],
			[
				"14th",
				"+5",
				"Arcane Tradition feature",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"1",
				"-",
				"-"
			],
			[
				"15th",
				"+5",
				"",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"1",
				"1",
				"-"
			],
			[
				"16th",
				"+5",
				"Ability Score Improvement",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"1",
				"1",
				"-"
			],
			[
				"17th",
				"+6",
				"",
				"5",
				"4",
				"3",
				"3",
				"3",
				"2",
				"1",
				"1",
				"1",
				"1"
			],
			[
				"18th",
				"+6",
				"Spell Mastery",
				"5",
				"4",
				"3",
				"3",
				"3",
				"3",
				"1",
				"1",
				"1",
				"1"
			],
			[
				"19th",
				"+6",
				"Ability Score Improvement",
				"5",
				"4",
				"3",
				"3",
				"3",
				"3",
				"2",
				"1",
				"1",
				"1"
			],
			[
				"20th",
				"+6",
				"Signature Spells",
				"5",
				"4",
				"3",
				"3",
				"3",
				"3",
				"2",
				"2",
				"1",
				"1"
			]
		]
	},
	"features": [
		{
			"name": "Spellcasting",
			"levels": [
				1
			],
			"description": "As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.\nCANTRIPS\nAt 1st level, you know three cantrips of your choice from the wizard spell list. You learn additional wizard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Wizard table.\nSPELLBOOK\nAt 1st level, you have a spellbook containing six 1st-level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind.\nThe spells that you add to your spellbook as you gain levels reflect the arcane research you conduct on your own, as well as intellectual breakthroughs you have had about the nature of the multiverse. You might find other spells during your adventures. You could discover a spell recorded on a scroll in an evil wizard's chest, for example, or in a dusty tome in an ancient library.\nCopying a Spell into the Book. When you find a wizard spell of 1st level or higher, you can add it to your spellbook if it is of a spell level you can prepare and if you can spare the time to decipher and copy it.\nCopying a spell into your spellbook involves reproducing the basic form of the spell, then deciphering the unique system of notation used by the wizard who wrote it. You must practice the spell until you understand the sounds or gestures required, then transcribe it into your spellbook using your own notation.\nFor each level of the spell, the process takes 2 hours and costs 50 gp. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it. Once you have spent this time and money, you can prepare the spell just like your other spells.\nReplacing the Book. You can copy a spell from your own spellbook into another book-for example, if you want to make a backup copy of your spellbook. This is just like copying a new spell into your spellbook, but faster and easier, since you understand your own notation and already know how to cast the spell. You need spend only 1 hour and 10 gp for each level of the copied spell.\nIf you lose your spellbook, you can use the same procedure to transcribe the spells that you have prepared into a new spellbook. Filling out the remainder of your spellbook requires you to find new spells to do so, as normal. For this reason, many wizards keep backup spellbooks in a safe place.\nThe Book's Appearance. Your spellbook is a unique compilation of spells, with its own decorative flourishes and margin notes. It might be a plain, functional leather volume that you received as a gift from your master, a finely bound gilt-edged tome you found in an ancient library or even a loose collection of notes scrounged together after you lost your previous spellbook in a mishap.\nPREPARING AND CASTING SPELLS\nThe Wizard table shows how many spell slots you have to cast your wizard spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nYou prepare the list of wizard spells that are available for you to cast. To do so, choose a number of wizard spells from your spellbook equal to your Intelligence modifier + your wizard level (minimum of one spell). The spells must be of a level for which you have spell slots.\nFor example, if you're a 3rd-level wizard, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination, chosen from your spellbook. If you prepare the 1st-level spell magic missile, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list.\nSPELLCASTING ABILITY\nIntelligence is your spellcasting ability for your wizard spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for a wizard spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Intelligence modifier\nSpell attack modifier = your proficiency bonus + your Intelligence modifier\nRITUAL CASTING\nYou can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell in your spellbook. You don't need to have the spell prepared.\nSPELLCASTING FOCUS\nYou can use an arcane focus as a spellcasting focus for your wizard spells.\nLEARNING SPELLS OF 1ST LEVEL AND HIGHER\nEach time you gain a wizard level, you can add two wizard spells of your choice to your spellbook. Each of these spells must be of a level for which you have spell slots, as shown on the Wizard table. On your adventures, you might find other spells that you can add to your spellbook.",
			"options": [
				{
					"name": "Copying a Spell into the Book",
					"description": "When you find a wizard spell of 1st level or higher, you can add it to your spellbook if it is of a spell level you can prepare and if you can spare the time to decipher and copy it."
				},
				{
					"name": "Replacing the Book",
					"description": "You can copy a spell from your own spellbook into another book-for example, if you want to make a backup copy of your spellbook. This is just like copying a new spell into your spellbook, but faster and easier, since you understand your own notation and already know how to cast the spell. You need spend only 1 hour and 10 gp for each level of the copied spell."
				},
				{
					"name": "The Book's Appearance",
					"description": "Your spellbook is a unique compilation of spells, with its own decorative flourishes and margin notes. It might be a plain, functional leather volume that you received as a gift from your master, a finely bound gilt-edged tome you found in an ancient library or even a loose collection of notes scrounged together after you lost your previous spellbook in a mishap."
				}
			]
		},
		{
			"name": "Arcane Recovery",
			"levels": [
				1
			],
			"description": "You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.\nFor example, if you're a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots."
		},
		{
			"name": "Arcane Tradition",
			"levels": [
				2
			],
			"description": "When you reach 2nd level, you choose an arcane tradition, shaping your practice of magic through one of the following schools. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level.\nSchool | Source\nAbjuration | Player's Handbook\nBladesinging | Sword Coast Adventurer's Guide Tasha's Cauldron of Everything\nChronurgy | Explorer's Guide to Wildemount\nConjuration | Player's Handbook\nDivination | Player's Handbook\nEnchantment | Player's Handbook\nEvocation | Player's Handbook\nGraviturgy | Explorer's Guide to Wildemount\nIllusion | Player's Handbook\nNecromancy | Player's Handbook\nOrder of Scribes | Tasha's Cauldron of Everything\nTransmutation | Player's Handbook\nWar Magic | Xanathar's Guide to Everything\nUnearthed Arcana\nRunecrafter | Unearthed Arcana 83 - Giant Options\nArchived Unearthed Arcana\nArtificer | Unearthed Arcana 1 - Eberron\nInvention | Unearthed Arcana 46 - Three Subclasses\nLore Mastery | Unearthed Arcana 29 - Warlock and Wizard\nMage of Lorehold | Unearthed Arcana 79 - Mages of Strixhaven\nMage of Prismari | Unearthed Arcana 79 - Mages of Strixhaven\nMage of Quandrix | Unearthed Arcana 79 - Mages of Strixhaven\nMage of Silverquill | Unearthed Arcana 79 - Mages of Strixhaven\nOnomancy | Unearthed Arcana 63 - Cleric, Druid, Wizard\nOrder of Scribes | Unearthed Arcana 72 - Subclasses Revisited\nPsionics | Unearthed Arcana 66 - Fighter, Rogue, Wizard\nTechnomancy | Unearthed Arcana 7 - Modern Magic\nTheurgy | Unearthed Arcana 33 - Wizard Revisited"
		},
		{
			"name": "Cantrip Formulas",
			"levels": [
				3
			],
			"optional": true,
			"description": "At 3rd level, you have scribed a set of arcane formulas in your spellbook that you can use to formulate a cantrip in your mind. Whenever you finish a long rest and consult those formulas in your spellbook, you can replace one wizard cantrip you know with another cantrip from the wizard spell list."
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
			"name": "Spell Mastery",
			"levels": [
				18
			],
			"description": "At 18th level, you have achieved such mastery over certain spells that you can cast them at will. Choose a 1st-level wizard spell and a 2nd-level wizard spell that are in your spellbook. You can cast those spells at their lowest level without expending a spell slot when you have them prepared. If you want to cast either spell at a higher level, you must expend a spell slot as normal.\nBy spending 8 hours in study, you can exchange one or both of the spells you chose for different spells of the same levels."
		},
		{
			"name": "Signature Spells",
			"levels": [
				20
			],
			"description": "When you reach 20th level, you gain mastery over two powerful spells and can cast them with little effort. Choose two 3rd-level wizard spells in your spellbook as your signature spells. You always have these spells prepared, they don't count against the number of spells you have prepared, and you can cast each of them once at 3rd level without expending a spell slot. When you do so, you can't do so again until you finish a short or long rest.\nIf you want to cast either spell at a higher level, you must expend a spell slot as normal."
		}
	],
	"subclasses": [
		{
			"name": "Abjuration",
			"slug": "abjuration",
			"source": "Player's Handbook",
			"summary": "Detractors of this school say that its tradition is about denial, negation rather than positive assertion. You understand, however, that ending harmful effects, protecting the weak, and banishing evil influences is anything but a philosophical void. It is a proud and respected vocation.\nCalled abjurers, members of this school are sought when baleful spirits require exorcism, when important locations must be guarded against magical spying, and when portals to other planes of existence must be closed.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Abjuration Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy an abjuration spell into your spellbook is halved."
				},
				{
					"name": "Arcane Ward",
					"level": 2,
					"description": "Starting at 2nd level, you can weave magic around yourself for protection. When you cast an abjuration spell of 1st level or higher, you can simultaneously use a strand of the spell's magic to create a magical ward on yourself that lasts until you finish a long rest. The ward has hit points equal to twice your wizard level + your Intelligence modifier. Whenever you take damage, the ward takes the damage instead. If this damage reduces the ward to 0 hit points, you take any remaining damage.\nWhile the ward has 0 hit points, it can't absorb damage, but its magic remains. Whenever you cast an abjuration spell of 1st level or higher, the ward regains a number of hit points equal to twice the level of the spell.\nOnce you create the ward, you can't create it again until you finish a long rest."
				},
				{
					"name": "Projected Ward",
					"level": 6,
					"description": "Starting at 6th level, when a creature that you can see within 30 feet of you takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage. If this damage reduces the ward to 0 hit points, the warded creature takes any remaining damage."
				},
				{
					"name": "Improved Abjuration",
					"level": 10,
					"description": "Beginning at 10th level, when you cast an abjuration spell that requires you to make an ability check as a part of casting that spell (as in Counterspell and Dispel Magic), you add your proficiency bonus to that ability check."
				},
				{
					"name": "Spell Resistance",
					"level": 14,
					"description": "Starting at 14th level, you have advantage on saving throws against spells.\nFurthermore, you have resistance against the damage of spells."
				}
			]
		},
		{
			"name": "Bladesinging",
			"slug": "bladesinging",
			"source": "Sword Coast Adventurer's Guide",
			"summary": "Bladesingers master a tradition of wizardry that incorporates swordplay and dance. Originally created by elves, this tradition has been adopted by non-elf practitioners, who honor and expand on the elven ways.\nIn combat, a bladesinger uses a series of intricate, elegant maneuvers that fend off harm and allow the bladesinger to channel magic into devastating attacks and a cunning defense. Many who have observed a bladesinger at work remember the display as one of the more beautiful experiences in their life, a glorious dance accompanied by a singing blade.\nSources: Tasha's Cauldron of Everything",
			"features": [
				{
					"name": "Training in War and Song",
					"level": 2,
					"description": "When you adopt this tradition at 2nd level, you gain proficiency with light armor, and you gain proficiency with one type of one-handed melee weapon of your choice.\nYou also gain proficiency in the Performance skill if you don't already have it."
				},
				{
					"name": "Bladesong",
					"level": 2,
					"description": "Starting at 2nd level, you can invoke an elven magic called the Bladesong, provided that you aren't wearing medium or heavy armor or using a shield. It graces you with supernatural speed, agility, and focus.\nYou can use a bonus action to start the Bladesong, which lasts for 1 minute. It ends early if you are incapacitated, if you don medium or heavy armor or a shield, or if you use two hands to make an attack with a weapon. You can also dismiss the Bladesong at any time (no action required).\nWhile your Bladesong is active, you gain the following benefits:\n• You gain a bonus to your AC equal to your Intelligence modifier (minimum of +1)\n• Your walking speed increases by 10 feet.\n• You have advantage on Dexterity (Acrobatics) checks.\n• You gain a bonus to any Constitution saving throw you make to maintain your concentration on a spell. The bonus equals your Intelligence modifier (minimum of +1).\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Extra Attack",
					"level": 6,
					"description": "Starting at 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks."
				},
				{
					"name": "Song of Defense",
					"level": 10,
					"description": "Beginning at 10th level, you can direct your magic to absorb damage while your Bladesong is active. When you take damage, you can use your reaction to expend one spell slot and reduce that damage to you by an amount equal to five times the spell slot's level."
				},
				{
					"name": "Song of Victory",
					"level": 14,
					"description": "Starting at 14th level, you can add your Intelligence modifier (minimum of +1) to the damage of your melee weapon attacks while your Bladesong is active."
				}
			]
		},
		{
			"name": "Chronurgy",
			"slug": "chronurgy",
			"source": "Explorer's Guide to Wildemount",
			"summary": "Focusing on the manipulation of time, those who follow the Chronurgy tradition learn to alter the pace of reality to their liking. Using the ramping of anticipatory dunamis energy, these mages can bend the flow of time as adroitly as a skilled musician plays an instrument, lending themselves and their allies an advantage in the blink of an eye.\nSources: Explorer's Guide to Wildemount",
			"features": [
				{
					"name": "Chronal Shift",
					"level": 2,
					"description": "At 2nd level, you can magically exert limited control over the flow of time around a creature. As a reaction, after you or a creature you can see within 30 feet of you makes an attack roll, an ability check, or a saving throw, you can force the creature to reroll. You make this decision after you see whether the roll succeeds or fails. The target must use the result of the second roll.\nYou can use this ability twice, and you regain any expended uses when you finish a long rest."
				},
				{
					"name": "Temporal Awareness",
					"level": 2,
					"description": "Starting at 2nd level, you can add your Intelligence modifiers to your initiative rolls."
				},
				{
					"name": "Momentary Stasis",
					"level": 6,
					"description": "When you reach 6th level, as an action, you can magically force a Large or smaller creature you can see within 60 feet of you to make a Constitution saving throw against your spell save DC. Unless the saving throw is a success, the creature is encased in a field of magical energy until the end of your next turn or until the creature takes any damage. While encased in this way, the creature is incapacitated and has a speed of 0.\nYou can use this feature a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Arcane Abeyance",
					"level": 10,
					"description": "At 10th level, when you cast a spell using a spell slot of 4th level or lower, you can condense the spell's magic into a mote. The spell is frozen in time at the moment of casting and held within a gray bead for 1 hour. This bead is a Tiny object with AC 15 and 1 hit point, and it is immune to poison and psychic damage. When the duration ends, or if the bead is destroyed, it vanishes in aflash of light, and the spell is lost.\nA creature holding the bead can use its action to release the spell within, whereupon the bead disappears. The spell uses your spell attack bonus and save DC, and the spell treats the creature who released it as the caster for all other purposes.\nOnce you create a bead with this feature, you can't do so again until you finish a short or long rest."
				},
				{
					"name": "Convergent Future",
					"level": 14,
					"description": "Starting at 14th level, you can peer through possible futures and magically pull one of them into events around you, ensuring a particular outcome. When you or a creature you can see within 60 feet of you makes an attack roll, an ability check, or a saving throw, you can use your reaction to ignore the die roll and decide whether the number rolled is the minimum needed to succeed or one less than that number (your choice).\nWhen you use this feature, you gain one level of exhaustion. Only by finishing a long rest can you remove a level of exhaustion gained in this way."
				}
			]
		},
		{
			"name": "Conjuration",
			"slug": "conjuration",
			"source": "Player's Handbook",
			"summary": "As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of killing fog or summon creatures from elsewhere to fight on your behalf. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence, in an instant.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Conjuration Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Conjuration spell into your spellbook is halved."
				},
				{
					"name": "Minor Conjuration",
					"level": 2,
					"description": "Starting at 2nd level when you select this school, you can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you. This object can be no larger than 3 feet on a side and weigh no more than 10 pounds, and its form must be that of a nonmagical object that you have seen. The object is visibly magical, radiating dim light out to 5 feet.\nThe object disappears after 1 hour, when you use this feature again, or if it takes or deals any damage."
				},
				{
					"name": "Benign Transportation",
					"level": 6,
					"description": "Starting at 6th level, you can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature. If that creature is willing, you both teleport, swapping places.\nOnce you use this feature, you can't use it again until you finish a long rest or you cast a conjuration spell of 1st level or higher."
				},
				{
					"name": "Focused Conjuration",
					"level": 10,
					"description": "Beginning at 10th level, while you are concentrating on a conjuration spell, your concentration can't be broken as a result of taking damage."
				},
				{
					"name": "Durable Summons",
					"level": 14,
					"description": "Starting at 14th level, any creature that you summon or create with a conjuration spell has 30 temporary hit points."
				}
			]
		},
		{
			"name": "Divination",
			"slug": "divination",
			"source": "Player's Handbook",
			"summary": "The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Divination Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Divination spell into your spellbook is halved."
				},
				{
					"name": "Portent",
					"level": 2,
					"description": "Starting at 2nd level when you choose this school, glimpses of the future begin to press in on your awareness. When you finish a long rest, roll two d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn.\nEach foretelling roll can be used only once. When you finish a long rest, you lose any unused foretelling rolls."
				},
				{
					"name": "Expert Divination",
					"level": 6,
					"description": "Beginning at 6th level, casting divination spells comes so easily to you that it expends only a fraction of your spellcasting efforts. When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the spell you cast and can't be higher than 5th level."
				},
				{
					"name": "The Third Eye",
					"level": 10,
					"description": "Starting at 10th level, you can use your action to increase your powers of perception. When you do so, choose one of the following benefits, which lasts until you are incapacitated or you take a short or long rest. You can't use the feature again until you finish a short or long rest.\nDarkvision. You gain darkvision out to a range of 60 feet.\nEthereal Sight. You can see into the Ethereal Plane within 60 feet of you.\nGreater Comprehension. You can read any language.\nSee Invisibility. You can see invisible creatures and objects within 10 feet of you that are within line of sight.",
					"options": [
						{
							"name": "Darkvision",
							"description": "You gain darkvision out to a range of 60 feet."
						},
						{
							"name": "Ethereal Sight",
							"description": "You can see into the Ethereal Plane within 60 feet of you."
						},
						{
							"name": "Greater Comprehension",
							"description": "You can read any language."
						},
						{
							"name": "See Invisibility",
							"description": "You can see invisible creatures and objects within 10 feet of you that are within line of sight."
						}
					]
				},
				{
					"name": "Greater Portent",
					"level": 14,
					"description": "Starting at 14th level, the visions in your dreams intensify and paint a more accurate picture in your mind of what is to come. You roll three d20s for your Portent feature, rather than two."
				}
			]
		},
		{
			"name": "Enchantment",
			"slug": "enchantment",
			"source": "Player's Handbook",
			"summary": "As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Enchantment Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Enchantment spell into your spellbook is halved."
				},
				{
					"name": "Hypnotic Gaze",
					"level": 2,
					"description": "Starting at 2nd level when you choose this school, your soft words and enchanting gaze can magically enthrall another creature. As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw against your wizard spell save DC or be charmed by you until the end of your next turn. The charmed creature's speed drops to 0, and the creature is incapacitated and visibly dazed.\nOn subsequent turns, you can use your action to maintain this effect, extending its duration until the end of your next turn. However, the effect ends if you move more than 5 feet away from the creature, if the creature can neither see nor hear you, or if the creature takes damage.\nOnce the effect ends, or if the creature succeeds on its initial saving throw against this effect, you can't use this feature on that creature again until you finish a long rest."
				},
				{
					"name": "Instinctive Charm",
					"level": 6,
					"description": "Beginning at 6th level, when a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack, provided that another creature is within the attack's range. The attacker must make a Wisdom saving throw against your wizard spell save DC. On a failed save, the attacker must target the creature that is closest to it, not including you or itself. If multiple creatures are closest, the attacker chooses which one to target.\nOn a successful save, you can't use this feature on the attacker again until you finish a long rest.\nYou must choose to use this feature before knowing whether the attack hits or misses. Creatures that can't be charmed are immune to this effect."
				},
				{
					"name": "Split Enchantment",
					"level": 10,
					"description": "Starting at 10th level, when you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature."
				},
				{
					"name": "Alter Memories",
					"level": 14,
					"description": "At 14th level, you gain the ability to make a creature unaware of your magical influence on it. When you cast an enchantment spell to charm one or more creatures, you can alter one creature's understanding so that it remains unaware of being charmed.\nAdditionally, once before the spell expires, you can use your action to try to make the chosen creature forget some of the time it spent charmed. The creature must succeed on an Intelligence saving throw against your wizard spell save DC or lose a number of hours of its memories equal to 1 + your Charisma modifier (minimum 1). You can make the creature forget less time, and the amount of time can't exceed the duration of your enchantment spell."
				}
			]
		},
		{
			"name": "Evocation",
			"slug": "evocation",
			"source": "Player's Handbook",
			"summary": "You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some evokers find employment in military forces, serving as artillery to blast enemy armies from afar. Others use their spectacular power to protect the weak, while some seek their own gain as bandits, adventurers, or aspiring tyrants.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Evocation Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Evocation spell into your spellbook is halved."
				},
				{
					"name": "Sculpt Spells",
					"level": 2,
					"description": "Beginning at 2nd level, you can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 + the spell's level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save."
				},
				{
					"name": "Potent Cantrip",
					"level": 6,
					"description": "Starting at 6th level, your damaging cantrips affect even creatures that avoid the brunt of the effect. When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip's damage (if any) but suffers no additional effect from the cantrip."
				},
				{
					"name": "Empowered Evocation",
					"level": 10,
					"description": "Beginning at 10th level, you can add your Intelligence modifier (minimum of +1) to one damage roll of any wizard evocation spell that you cast."
				},
				{
					"name": "Overchannel",
					"level": 14,
					"description": "Starting at 14th level, you can increase the power of your simpler spells. When you cast a wizard spell of 1st through 5th level that deals damage, you can deal maximum damage with that spell.\nThe first time you do so, you suffer no adverse effect. If you use this feature again before you finish a long rest, you take 2d12 necrotic damage for each level of the spell, immediately after you cast it. Each time you use this feature again before finishing a long rest, the necrotic damage per spell level increases by 1d12. This damage ignores resistance and immunity."
				}
			]
		},
		{
			"name": "Graviturgy",
			"slug": "graviturgy",
			"source": "Explorer's Guide to Wildemount",
			"summary": "Understanding and mastering the forces that draw bodies of matter together or drive them apart, the students of the Graviturgy arcane tradition learn to further bend and manipulate the violent energy of gravity to their benefit, and the terrible detriment of their enemies.\nSources: Explorer's Guide to Wildemount",
			"features": [
				{
					"name": "Adjust Density",
					"level": 2,
					"description": "At 2nd level, as an action, you can magically alter the weight of one object or creature you can see within 30 feet of you. The object or creature must be Large or smaller. The target's weight is halved or doubled for up to 1 minute or until your concentration ends (as if you were concentrating on a spell).\nWhile the weight of a creature is halved by this effect, the creature's speed increases by 10 feet, it can jump twice as far as normal, and it has disadvantage on Strength checks and Strength saving throws.\nWhile the weight of a creature is doubled by this effect, the creature's speed is reduced by 10 feet, and it has advantage on Strength checks and Strength saving throws.\nUpon reaching 10th level in this class, you can target an object or a creature that is Huge or smaller."
				},
				{
					"name": "Gravity Well",
					"level": 6,
					"description": "When you reach 6th level, whenever you cast a spell on a creature, you can move the target 5 feet to an unoccupied space of your choice if the target is willing to move, the spell hits it with an attack, or it fails a saving throw against the spell."
				},
				{
					"name": "Violent Attraction",
					"level": 10,
					"description": "At 10th level, when another creature that you can see within 60 feet of you hits with a weapon attack, you can use your reaction to increase the attack's velocity, causing the attack's target to take an extra 1d10 damage of the weapon's type.\nAlternatively, if a creature within 60 feet of you takes damage from a fall, you can use your reaction to increase the fall's damage by 2d10.\nYou can use this feature a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Event Horizon",
					"level": 14,
					"description": "Starting at 14th level, as an action, you can magically emit a powerful field of gravitational energy that tugs at other creatures for up to 1 minute or until your concentration ends (as if you were concentrating on a spell). For the duration, whenever a creature hostile to you starts its turn within 30 feet of you, it must make a Strength saving throw against your spell save DC. On a failed save, it takes 2d10 force damage, and its speed is reduced to 0 until the start of its next turn. On a successful save, it takes half as much damage, and every foot it moves this turn costs 2 extra feet of movement.\nOnce you use this feature, you can't do so again until you finish a long rest or until you expend a spell slot of 3rd level or higher on it."
				}
			]
		},
		{
			"name": "Illusion",
			"slug": "illusion",
			"source": "Player's Handbook",
			"summary": "You focus your studies on magic that dazzles the senses, befuddles the mind, and tricks even the wisest folk. Your magic is subtle, but the illusions crafted by your keen mind make the impossible seem real. Some illusionists – including many gnome wizards – are benign tricksters who use their spells to entertain. Others are more sinister masters of deception, using their illusions to frighten and fool others for their personal gain.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Illusion Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Illusion spell into your spellbook is halved."
				},
				{
					"name": "Improved Minor Illusion",
					"level": 2,
					"description": "When you choose this school at 2nd level, you learn the Minor Illusion cantrip. If you already know this cantrip, you learn a different wizard cantrip of your choice. The cantrip doesn't count against your number of cantrips known.\nWhen you cast Minor Illusion, you can create both a sound and an image with a single casting of the spell."
				},
				{
					"name": "Malleable Illusions",
					"level": 6,
					"description": "Starting at 6th level, when you cast an illusion spell that has a duration of 1 minute or longer, you can use your action to change the nature of that illusion (using the spell's normal parameters for the illusion), provided that you can see the illusion."
				},
				{
					"name": "Illusory Self",
					"level": 10,
					"description": "Beginning at 10th level, you can create an illusory duplicate of yourself as an instant, almost instinctual reaction to danger. When a creature makes an attack roll against you, you can use your reaction to interpose the illusory duplicate between the attacker and yourself. The attack automatically misses you, then the illusion dissipates.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Illusory Reality",
					"level": 14,
					"description": "By 14th level, you have learned the secret of weaving shadow magic into your illusions to give them a semi-reality. When you cast an illusion spell of 1st level or higher, you can choose one inanimate, nonmagical object that is part of the illusion and make that object real. You can do this on your turn as a bonus action while the spell is ongoing. The object remains real for 1 minute. For example, you can create an illusion of a bridge over a chasm and then make it real long enough for your allies to cross.\nThe object can't deal damage or otherwise directly harm anyone."
				}
			]
		},
		{
			"name": "Necromancy",
			"slug": "necromancy",
			"source": "Player's Handbook",
			"summary": "As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things. As you progress, you learn to sap the life force from a creature as your magic destroys its body, transforming that vital energy into magical power you can manipulate.\nMost people see necromancers as menacing, or even villainous, due to the close association with death. Not all necromancers are evil, but the forces they manipulate are considered taboo by many societies.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Necromancy Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Necromancy spell into your spellbook is halved."
				},
				{
					"name": "Grim Harvest",
					"level": 2,
					"description": "At 2nd level, you gain the ability to reap life energy from creatures you kill with your spells. Once per turn when you kill one or more creatures with a spell of 1st level or higher, you regain hit points equal to twice the spell's level, or three times its level if the spell belongs to the School of Necromancy. You don't gain this benefit for killing constructs or undead."
				},
				{
					"name": "Undead Thralls",
					"level": 6,
					"description": "At 6th level, you add the Animate Dead spell to your spellbook if it is not there already. When you cast Animate Dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton, as appropriate.\nWhenever you create an undead using a necromancy spell, it has additional benefits:\n• The creature's hit point maximum is increased by an amount equal to your wizard level.\n• The creature adds your proficiency bonus to its weapon damage rolls."
				},
				{
					"name": "Inured to Undeath",
					"level": 10,
					"description": "Beginning at 10th level, you have resistance to necrotic damage, and your hit point maximum can't be reduced. You have spent so much time dealing with undead and the forces that animate them that you have become inured to some of their worst effects."
				},
				{
					"name": "Command Undead",
					"level": 14,
					"description": "Starting at 14th level, you can use magic to bring undead under your control, even those created by other wizards. As an action, you can choose one undead that you can see within 60 feet of you. That creature must make a Charisma saving throw against your wizard spell save DC. If it succeeds, you can't use this feature on it again. If it fails, it becomes friendly to you and obeys your commands until you use this feature again.\nIntelligent undead are harder to control in this way. If the target has an Intelligence of 8 or higher, it has advantage on the saving throw. If it fails the saving throw and has an Intelligence of 12 or higher, it can repeat the saving throw at the end of every hour until it succeeds and breaks free."
				}
			]
		},
		{
			"name": "Order of Scribes",
			"slug": "order-of-scribes",
			"source": "Tasha's Cauldron of Everything",
			"summary": "The name is apt, given how much time wizards spend poring over tomes and penning theories about the nature of magic. It's rare to see wizards traveling without books and scrolls sprouting from their bags, and a wizard would go to great lengths to plumb an archive of ancient knowledge.\nIt takes many forms in different worlds, but its primary mission is the same everywhere: recording magical discoveries so that wizardry can flourish. And while all wizards value spellbooks, a wizard in the Order of Scribes magically awakens their book, turning it into a trusted companion. All wizards study books, but a wizardly scribe talks to theirs!\nSources: Tasha's Cauldron of Everything",
			"features": [
				{
					"name": "Wizardly Quill",
					"level": 2,
					"description": "At 2nd level, as a bonus action, you can magically create a Tiny quill in your free hand. The magic quill has the following properties:\n• The quill doesn't require ink. When you write with it, it produces ink in a color of your choice on the writing surface.\n• The time you must spend to copy a spell into your spell book equals 2 minutes per spell level if you use the quill for the transcription.\n• You can erase anything you write with the quill if you wave the feather over the text as a bonus action, provided the text is within 5 feet of you.\nThis quill disappears if you create another one or if you die."
				},
				{
					"name": "Awakened Spellbook",
					"level": 2,
					"description": "Using specially prepared inks and ancient incantations passed down by your wizardly order, you have awakened an arcane sentience within your spellbook.\nAt 2nd level, while you are holding the book, it grants you the following benefits:\n• You can use the book as a spellcasting focus for your wizard spells.\n• When you cast a wizard spell with a spell slot, you can temporarily replace its damage type with a type that appears in another spell in your spellbook, which magically alters the spell's formula for this casting only. The latter spell must be of the same level as the spell slot you expend.\n• When you cast a wizard spell as a ritual, you can use the spell's normal casting time, rather than adding 10 minutes to it. Once you use this benefit, you can't do so again until you finish a long rest.\nIf necessary, you can replace the book over the course of a short rest by using your Wizardly Quill to write arcane sigils in a blank book or a magic spellbook to which you're attuned. At the end of the rest, your spellbook's consciousness is summoned into the new book, which the consciousness transforms into your spellbook, along with all its spells. If the previous book still existed somewhere, all the spells vanish from its pages."
				},
				{
					"name": "Manifest Mind",
					"level": 6,
					"description": "At 6th level, you can conjure forth the mind of your Awakened Spellbook. As a bonus action while the book is on your person, you can cause the mind to manifest as a Tiny spectral object, hovering in an unoccupied space of your choice within 60 feet of you. The spectral mind is intangible and doesn't occupy its space, and it sheds dim light in a 10-foot radius. It looks like a ghostly tome, a cascade of text, or a scholar from the past (your choice).\nWhile manifested, the spectral mind can hear and see, and it has darkvision with a range of 60 feet. The mind can telepathically share with you what it sees and hears (no action required).\nWhenever you cast a wizard spell on your turn, you can cast it as if you were in the spectral mind's space, instead of your own, using its senses. You can do so a number of times per day equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\nAs a bonus action, you can cause the spectral mind to hover up to 30 feet to an unoccupied space that you or it can see. It can pass through creatures but not objects.\nThe spectral mind stops manifesting if it is ever more than 300 feet away from you, if someone casts Dispel Magic on it, if the Awakened Spellbook is destroyed, if you die, or if you dismiss the spectral mind as a bonus action.\nOnce you conjure the mind, you can't do so again until you finish a long rest, unless you expend a spell slot of any level to conjure it again."
				},
				{
					"name": "Master Scriviner",
					"level": 10,
					"description": "At 10th level, whenever you finish a long rest, you can create one magic scroll by touching your Wizardly Quill to a blank piece of paper or parchment and causing one spell from your Awakened Spellbook to be copied onto the scroll. The spellbook must be within 5 feet of you when you make the scroll.\nThe chosen spell must be of 1st or 2nd level and must have a casting time of 1 action. Once in the scroll, the spell's power is enhanced, counting as one level higher than normal. You can cast the spell from the scroll by reading it as an action. The scroll is unintelligible to anyone else, and the spell vanishes from the scroll when you cast it or when you finish your next long rest.\nYou are also adept at crafting spell scrolls, which are described in the treasure chapter of the Dungeon Master's Guide. The gold and time you must spend to make such a scroll are halved if you use your Wizardly Quill."
				},
				{
					"name": "One with the Word",
					"level": 14,
					"description": "At 14th level, your connection to your Awakened Spellbook has become so profound that your soul has become entwined with it. While the book is on your person, you have advantage on all Intelligence (Arcana) checks, as the spellbook helps you remember magical lore.\nMoreover, if you take damage while your spellbook's mind is manifested, you can prevent all of that damage to you by using your reaction to dismiss the spectral mind, using its magic to save yourself. Then roll 3d6. The spellbook temporarily loses spells of your choice that have a combined spell level equal to that roll or higher. For example, if the roll's total is 9, spells vanish from the book that have a combined level of at least 9, which could mean one 9th-level spell, three 3rd-level spells, or some other combination. If there aren't enough spells in the book to cover this cost, you drop to 0 hit points.\nUntil you finish 1d6 long rests, you are incapable of casting the lost spells, even if you find them on a scroll or in another spellbook. After you finish the required number of rests, the spells reappear in the spell book.\nOnce you use this reaction, you can't do so again until you finish a long rest."
				}
			]
		},
		{
			"name": "Transmutation",
			"slug": "transmutation",
			"source": "Player's Handbook",
			"summary": "To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities. Your magic gives you the tools to become a smith on reality's forge.\nSome transmuters are tinkerers and pranksters, turning people into toads and transforming copper into silver for fun and occasional profit. Others pursue their magical studies with deadly seriousness, seeking the power of the gods to make and destroy worlds.\nSources: Player's Handbook",
			"features": [
				{
					"name": "Transmutation Savant",
					"level": 2,
					"description": "Beginning when you select this school at 2nd level, the gold and time you must spend to copy a Transmutation spell into your spellbook is halved."
				},
				{
					"name": "Minor Alchemy",
					"level": 2,
					"description": "Starting at 2nd level when you select this school, you can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another. You perform a special alchemical procedure on one object composed entirely of wood, stone (but not a gemstone), iron, copper, or silver, transforming it into a different one of those materials. For each 10 minutes you spend performing the procedure, you can transform up to 1 cubic foot of material. After 1 hour, or until you lose your concentration (as if you were concentrating on a spell), the material reverts to its original substance."
				},
				{
					"name": "Transmuter's Stone",
					"level": 6,
					"description": "Starting at 6th level, you can spend 8 hours creating a transmuter's stone that stores transmutation magic. You can benefit from the stone yourself or give it to another creature. A creature gains a benefit of your choice as long as the stone is in the creature's possession. When you create the stone, choose the benefit from the following options:\n• Darkvision out to a range of 60 feet\n• An increase to speed of 10 feet while the creature is unencumbered\n• Proficiency in Constitution saving throws\n• Resistance to acid, cold, fire, lightning, or thunder damage (your choice whenever you choose this benefit)\nEach time you cast a transmutation spell of 1st level or higher, you can change the effect of your stone if the stone is on your person.\nIf you create a new transmuter's stone, the previous one ceases to function."
				},
				{
					"name": "Shapechanger",
					"level": 10,
					"description": "At 10th level, you add the Polymorph spell to your spellbook, if it is not there already. You can cast Polymorph without expending a spell slot. When you do so, you can target only yourself and transform into a beast whose challenge rating is 1 or lower.\nOnce you cast Polymorph in this way, you can't do so again until you finish a short or long rest, though you can still cast it normally using an available spell slot."
				},
				{
					"name": "Master Transmuter",
					"level": 14,
					"description": "Starting at 14th level, you can use your action to consume the reserve of transmutation magic stored within your transmuter's stone in a single burst. When you do so, choose one of the following effects. Your transmuter's stone is destroyed and can't be remade until you finish a long rest.\nMajor Transformation. You can transmute one nonmagical object – no larger than a 5-foot cube – into another nonmagical object of similar size and mass and of equal or lesser value. You must spend 10 minutes handling the object to transform it.\nPanacea. You remove all curses, diseases, and poisons affecting a creature that you touch with the transmuter's stone. The creature also regains all its hit points.\nRestore Life. You cast the Raise Dead spell on a creature you touch with the transmuter's stone, without expending a spell slot or needing to have the spell in your spellbook.\nRestore Youth. You touch the transmuter's stone to a willing creature, and that creature's apparent age is reduced by 3d10 years, to a minimum of 13 years. This effect doesn't extend the creature's lifespan.",
					"options": [
						{
							"name": "Major Transformation",
							"description": "You can transmute one nonmagical object – no larger than a 5-foot cube – into another nonmagical object of similar size and mass and of equal or lesser value. You must spend 10 minutes handling the object to transform it."
						},
						{
							"name": "Panacea",
							"description": "You remove all curses, diseases, and poisons affecting a creature that you touch with the transmuter's stone. The creature also regains all its hit points."
						},
						{
							"name": "Restore Life",
							"description": "You cast the Raise Dead spell on a creature you touch with the transmuter's stone, without expending a spell slot or needing to have the spell in your spellbook."
						},
						{
							"name": "Restore Youth",
							"description": "You touch the transmuter's stone to a willing creature, and that creature's apparent age is reduced by 3d10 years, to a minimum of 13 years. This effect doesn't extend the creature's lifespan."
						}
					]
				}
			]
		},
		{
			"name": "War Magic",
			"slug": "war-magic",
			"source": "Xanathar's Guide to Everything",
			"summary": "The tradition of War Magic blends principles of evocation and abjuration, rather than specializing in either of those schools. It teaches techniques that empower a caster's spells, while also providing methods for wizards to bolster their own defenses.\nThey see their magic as both a weapon and armor, a resource superior to any piece of steel. War mages act fast in battle, using their spells to seize tactical control of a situation. Their spells strike hard, while their defensive skills foil their opponents' attempts to counterattack. War mages are also adept at turning other spellcasters' magical energy against them.\nIn great battles, a war mage often works with evokers, abjurers, and other types of wizards. Evokers, in particular, sometimes tease war mages for splitting their attention between offense and defense. A war mage's typical response: \"What good is being able to throw a mighty Fireball if I die before I can cast it?\"\nSources: Xanathar's Guide to Everything",
			"features": [
				{
					"name": "Arcane Deflection",
					"level": 2,
					"description": "At 2nd level, you have learned to weave your magic to fortify yourself against harm. When you are hit by an attack or you fail a saving throw, you can use your reaction to gain a +2 bonus to your AC against that attack or a +4 bonus to that saving throw.\nWhen you use this feature, you can't cast spells other than cantrips until the end of your next turn."
				},
				{
					"name": "Tactical Wit",
					"level": 2,
					"description": "Starting at 2nd level, your keen ability to assess tactical situations allows you to act quickly in battle. You can give yourself a bonus to your initiative rolls equal to your Intelligence modifier."
				},
				{
					"name": "Power Surge",
					"level": 6,
					"description": "Starting at 6th level, you can store magical energy within yourself to later empower your damaging spells.\nYou can store a maximum number of power surges equal to your Intelligence modifier (minimum of one). Whenever you finish a long rest, your number of power surges resets to one. Whenever you successfully end a spell with Dispel Magic or Counterspell, you gain one power surge, as you steal magic from the spell you foiled. If you end a short rest with no power surges, you gain one power surge.\nOnce per turn when you deal damage to a creature or object with a wizard spell, you can spend one power surge to deal extra force damage to that target. The extra damage equals half your wizard level."
				},
				{
					"name": "Durable Magic",
					"level": 10,
					"description": "Beginning at 10th level, the magic you channel helps ward off harm. While you maintain concentration on a spell, you have a +2 bonus to AC and all saving throws."
				},
				{
					"name": "Deflecting Shroud",
					"level": 14,
					"description": "At 14th level, your Arcane Deflection becomes infused with deadly magic. When you use your Arcane Deflection feature, you can cause magical energy to arc from you. Up to three creatures of your choice within 60 feet of you each take force damage equal to half your wizard level."
				}
			]
		}
	]
};

export default wizard;
