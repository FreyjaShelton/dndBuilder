const fighter = {
	"name": "Fighter",
	"hitDie": 10,
	"startingGold": "5d4 x 10",
	"subclassName": "Martial Archetype",
	"suggestedAbilities": "Strength or Dexterity, Constitution or Intelligence",
	"primaryAbility": [
		"Strength",
		"Dexterity"
	],
	"spellcastingAbility": "",
	"subclassLevel": 3,
	"subclassFeatureLevels": [
		7,
		10,
		15,
		18
	],
	"armorProficiencies": "All armor, shields",
	"weaponProficiencies": "Simple weapons, martial weapons",
	"toolProficiencies": "None",
	"savingThrows": [
		"Strength",
		"Constitution"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"Acrobatics",
			"Animal Handling",
			"Athletics",
			"History",
			"Insight",
			"Intimidation",
			"Perception",
			"Survival"
		],
		"raw": "Choose two skills from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival"
	},
	"startingEquipment": [
		"(a) Chain Mail or (b) leather armor, longbow, and 20 arrows",
		"(a) a martial weapon and a shield or (b) two martial weapons",
		"(a) a light crossbow and 20 bolts or (b) two handaxes",
		"(a) a dungeoneer's pack or (b) an explorer's pack"
	],
	"table": {
		"caption": "The Fighter",
		"columns": [
			"Level",
			"Proficiency Bonus",
			"Features"
		],
		"rows": [
			[
				"1st",
				"+2",
				"Fighting Style, Second Wind"
			],
			[
				"2nd",
				"+2",
				"Action Surge (x1)"
			],
			[
				"3rd",
				"+2",
				"Martial Archetype"
			],
			[
				"4th",
				"+2",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"5th",
				"+3",
				"Extra Attack (x1)"
			],
			[
				"6th",
				"+3",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"7th",
				"+3",
				"Martial Archetype feature"
			],
			[
				"8th",
				"+3",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"9th",
				"+4",
				"Indomitable (x1)"
			],
			[
				"10th",
				"+4",
				"Martial Archetype feature"
			],
			[
				"11th",
				"+4",
				"Extra Attack (x2)"
			],
			[
				"12th",
				"+4",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"13th",
				"+5",
				"Indomitable (x2)"
			],
			[
				"14th",
				"+5",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"15th",
				"+5",
				"Martial Archetype feature"
			],
			[
				"16th",
				"+5",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"17th",
				"+6",
				"Action Surge (x2), Indomitable (x3)"
			],
			[
				"18th",
				"+6",
				"Martial Archetype feature"
			],
			[
				"19th",
				"+6",
				"Ability Score Improvement, Martial Versatility (Optional)"
			],
			[
				"20th",
				"+6",
				"Extra Attack (x3)"
			]
		]
	},
	"features": [
		{
			"name": "Fighting Style",
			"levels": [
				1
			],
			"description": "You adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.\n• Archery (PHB). You gain a +2 bonus to attack rolls you make with ranged weapons.\n• Blind Fighting (TCE). You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.\n• Defense (PHB). While you are wearing armor, you gain a +1 bonus to AC.\n• Dueling (PHB). When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.\n• Great Weapon Fighting (PHB). When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.\n• Interception (TCE). When a creature you can see hits a target, other than you, within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction.\n• Protection (PHB). When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.\n• Superior Technique (TCE). You learn one maneuver of your choice from among those available to the Battle Master archetype. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice.)\n• You gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.\n• Thrown Weapon Fighting (TCE). You can draw a weapon that has the thrown property as part of the attack you make with the weapon.\n• In addition, when you hit with a ranged attack using a thrown weapon, you gain a +2 bonus to the damage roll.\n• Two-Weapon Fighting (PHB). When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.\n• Unarmed Fighting (TCE). Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier on a hit. If you aren't wielding any weapons or a shield when you make the attack roll, the d6 becomes a d8.\n• At the start of each of your turns, you can deal 1d4 bludgeoning damage to one creature grappled by you.\n• Close Quarters Shooter (UA). When making a ranged attack while you are within 5 feet of a hostile creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half cover and three-quarters cover against targets within 30 feet of you. You have a +1 bonus to attack rolls on ranged attacks.\n• Mariner (UA). As long as you are not wearing heavy armor or using a shield, you have a swimming speed and a climbing speed equal to your normal speed, and you gain a +1 bonus to armor class.\n• Tunnel Fighter (UA). As a bonus action, you can enter a defensive stance that lasts until the start of your next turn. While in your defensive stance, you can make opportunity attacks without using your reaction, and you can use your reaction to make a melee attack against a creature that moves more than 5 feet while within your reach.",
			"options": [
				{
					"name": "Archery",
					"source": "PHB",
					"description": "You gain a +2 bonus to attack rolls you make with ranged weapons."
				},
				{
					"name": "Blind Fighting",
					"source": "TCE",
					"description": "You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you."
				},
				{
					"name": "Defense",
					"source": "PHB",
					"description": "While you are wearing armor, you gain a +1 bonus to AC."
				},
				{
					"name": "Dueling",
					"source": "PHB",
					"description": "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."
				},
				{
					"name": "Great Weapon Fighting",
					"source": "PHB",
					"description": "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit."
				},
				{
					"name": "Interception",
					"source": "TCE",
					"description": "When a creature you can see hits a target, other than you, within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction."
				},
				{
					"name": "Protection",
					"source": "PHB",
					"description": "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield."
				},
				{
					"name": "Superior Technique",
					"source": "TCE",
					"description": "You learn one maneuver of your choice from among those available to the Battle Master archetype. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice.)"
				},
				{
					"name": "Thrown Weapon Fighting",
					"source": "TCE",
					"description": "You can draw a weapon that has the thrown property as part of the attack you make with the weapon."
				},
				{
					"name": "Two-Weapon Fighting",
					"source": "PHB",
					"description": "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."
				},
				{
					"name": "Unarmed Fighting",
					"source": "TCE",
					"description": "Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier on a hit. If you aren't wielding any weapons or a shield when you make the attack roll, the d6 becomes a d8."
				},
				{
					"name": "Close Quarters Shooter",
					"source": "UA",
					"description": "When making a ranged attack while you are within 5 feet of a hostile creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half cover and three-quarters cover against targets within 30 feet of you. You have a +1 bonus to attack rolls on ranged attacks."
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
				}
			]
		},
		{
			"name": "Second Wind",
			"levels": [
				1
			],
			"description": "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.\nOnce you use this feature, you must finish a short or long rest before you can use it again."
		},
		{
			"name": "Action Surge",
			"levels": [
				2,
				17
			],
			"description": "Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action.\nOnce you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn."
		},
		{
			"name": "Martial Archetype",
			"levels": [
				3
			],
			"description": "At 3rd level, you choose an archetype that you strive to emulate in your combat styles and techniques. The archetype you choose grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.\nArchetype | Source\nArcane Archer | Xanathar's Guide to Everything\nBanneret | Sword Coast Adventurer's Guide\nBattle Master | Player's Handbook\nCavalier | Xanathar's Guide to Everything\nChampion | Player's Handbook\nEcho Knight | Explorer's Guide to Wildemount\nEldritch Knight | Player's Handbook\nPsi Warrior | Tasha's Cauldron of Everything\nRune Knight | Tasha's Cauldron of Everything\nSamurai | Xanathar's Guide to Everything\nArchived Unearthed Arcana\nArcane Archer (2016) | Unearthed Arcana 23 - Fighter\nArcane Archer (2017) | Unearthed Arcana 39 - Revised Subclasses\nBrute | Unearthed Arcana 46 - Three Subclasses\nCavalier | Unearthed Arcana 40 - Revised Class Options\nKnight | Unearthed Arcana 23 - Fighter\nMonster Hunter | Unearthed Arcana 13 - Gothic Heroes\nPsi Knight | Unearthed Arcana 71 - Psionic Options Revisited\nPsychic Warrior | Unearthed Arcana 66 - Fighter, Rogue, Wizard\nRune Knight | Unearthed Arcana 64 - Fighter, Ranger, Rogue\nSamurai | Unearthed Arcana 23 - Fighter\nScout | Unearthed Arcana 12 - Kits of Old\nSharpshooter | Unearthed Arcana 23 - Fighter"
		},
		{
			"name": "Ability Score Improvement",
			"levels": [
				4,
				6,
				8,
				12,
				14,
				16,
				19
			],
			"description": "When you reach 4th level, and again at 6th, 8th, 12th, 14th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature."
		},
		{
			"name": "Martial Versatility",
			"levels": [
				4,
				6,
				8,
				12,
				14,
				16,
				19
			],
			"optional": true,
			"description": "Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can do one of the following, as you shift the focus of your martial practice:\n• Replace a fighting style you know with another fighting style available to fighters.\n• If you know any maneuvers from the Battle Master archetype, you can replace one maneuver you know with a different maneuver."
		},
		{
			"name": "Extra Attack",
			"levels": [
				5,
				11,
				20
			],
			"description": "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.\nThe number of attacks increases to three when you reach 11th level in this class and to four when you reach 20th level in this class."
		},
		{
			"name": "Indomitable",
			"levels": [
				9,
				13,
				17
			],
			"description": "Beginning at 9th level, you can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can't use this feature again until you finish a long rest.\nYou can use this feature twice between long rests starting at 13th level and three times between long rests starting at 17th level."
		}
	],
	"subclasses": [
		{
			"name": "Battle Master",
			"slug": "battle-master",
			"source": "Player's Handbook",
			"summary": "Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge.",
			"features": [
				{
					"name": "Combat Superiority",
					"level": 3,
					"description": "When you choose this archetype at 3rd level, you learn maneuvers that are fueled by special dice called superiority dice.\nManeuvers. You learn three maneuvers of your choice. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack. You learn two additional maneuvers of your choice at 7th, 10th, and 15th level. Each time you learn new maneuvers, you can also replace one maneuver you know with a different one.\nSuperiority Dice. You have four superiority dice, which are d8s. A superiority die is expended when you use it. You regain all of your expended superiority dice when you finish a short or long rest. You gain another superiority die at 7th level and one more at 15th level.\nSaving Throws. Some of your maneuvers require your target to make a saving throw to resist the maneuver's effects. The saving throw DC is calculated as follows:\nManeuver save DC = 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice)",
					"options": [
						{
							"name": "Maneuvers",
							"description": "You learn three maneuvers of your choice. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack. You learn two additional maneuvers of your choice at 7th, 10th, and 15th level. Each time you learn new maneuvers, you can also replace one maneuver you know with a different one."
						},
						{
							"name": "Superiority Dice",
							"description": "You have four superiority dice, which are d8s. A superiority die is expended when you use it. You regain all of your expended superiority dice when you finish a short or long rest. You gain another superiority die at 7th level and one more at 15th level."
						},
						{
							"name": "Saving Throws",
							"description": "Some of your maneuvers require your target to make a saving throw to resist the maneuver's effects. The saving throw DC is calculated as follows:"
						}
					]
				},
				{
					"name": "Student of War",
					"level": 3,
					"description": "At 3rd level, you gain proficiency with one type of artisan's tools of your choice."
				},
				{
					"name": "Know Your Enemy",
					"level": 7,
					"description": "Starting at 7th level, if you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice:\n• Strength score\n• Dexterity score\n• Constitution score\n• Armor Class\n• Current hit points\n• Total class levels, if any\n• Fighter class levels, if any"
				},
				{
					"name": "Improved Combat Superiority",
					"level": 10,
					"description": "At 10th level, your superiority dice turn into d10s. At 18th level, they turn into d12s."
				},
				{
					"name": "Relentless",
					"level": 15,
					"description": "Starting at 15th level, when you roll initiative and have no superiority dice remaining, you regain 1 superiority die."
				}
			]
		},
		{
			"name": "Arcane Archer",
			"slug": "arcane-archer",
			"source": "Xanathar's Guide to Everything",
			"summary": "An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of their most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements. Over the centuries, the methods of these elf archers have been learned by members of other races who can also balance arcane aptitude with archery.",
			"features": [
				{
					"name": "Arcane Archer Lore",
					"level": 3,
					"description": "At 3rd level, you learn magical theory or some of the secrets of nature – typical for practitioners of of this elven martial tradition. You choose to gain proficiency in either the Arcana or the Nature skill, and you choose to learn either the Prestidigitation or Druidcraft cantrip."
				},
				{
					"name": "Arcane Shot",
					"level": 3,
					"description": "At 3rd level, you learn to unleash special magical effects with some of your shots. When you gain this feature, you learn two Arcane Shot options of your choice (see \"Arcane Shot Options\" below).\nOnce per turn when you fire an arrow from a shortbow or longbow as part of the Attack action, you can apply one of your Arcane Shot options to that arrow. You decide to use the option when the arrow hits, unless the option doesn't involve an attack roll. You have two uses of this ability, and you regain all expended uses of it when you finish a short or long rest.\nYou gain an additional Arcane Shot option of your choice when you reach certain levels in this class: 7th, 10th, 15th, and 18th level. Each option also improves when you become an 18th-level fighter."
				},
				{
					"name": "Magic Arrow",
					"level": 7,
					"description": "At 7th level, you gain the ability to infuse arrows with magic. Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. The magic fades from the arrow immediately after it hits or misses its target."
				},
				{
					"name": "Curving Shot",
					"level": 7,
					"description": "At 7th level, you learn how to direct an errant arrow toward a new target. When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target."
				},
				{
					"name": "Ever-Ready Shot",
					"level": 15,
					"description": "Starting at 15th level, your magical archery is available whenever battle starts. If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it."
				},
				{
					"name": "Arcane Shot Options",
					"level": 18,
					"description": "The Arcane Shot feature lets you choose options for it at certain levels. The options are presented here in alphabetical order. They are all magical effects, and each one is associated with one of the schools of magic.\nIf an option requires a saving throw, your Arcane Shot save DC equals 8 + your proficiency bonus + your Intelligence modifier.\nBanishing Arrow. You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, its speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied.\nAfter you reach 18th level in this class, a target also takes 2d6 force damage when the arrow hits it.\nBeguiling Arrow. Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 2d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw.\nThe psychic damage increases to 4d6 when you reach 18th level in this class.\nBursting Arrow. You imbue your arrow with force energy drawn from the school of evocation. The arrow detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 force damage each.\nThe force damage increases to 4d6 when you reach 18th level in this class.\nEnfeebling Arrow. You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn.\nThe necrotic damage increases to 4d6 when you reach 18th level in this class.\nGrasping Arrow. When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 2d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again.\nThe poison damage and slashing damage both increase to 4d6 when you reach 18th level in this class.\nPiercing Arrow. You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow fires forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 1d6 piercing damage. On a successful save, a target takes half as much damage.\nThe piercing damage increases to 2d6 when you reach 18th level in this class.\nSeeking Arrow. Using divination magic, you grant your arrow the ability to seek out your target, allowing the arrow to curve and twist its path in search of its prey. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. On a failed save, it takes damage as if it were hit by the arrow, plus an extra 1d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location.\nThe force damage increases to 2d6 when you reach 18th level in this class.\nShadow Arrow. You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn.\nThe psychic damage increases to 4d6 when you reach 18th level in this class.",
					"options": [
						{
							"name": "Banishing Arrow",
							"description": "You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, its speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied."
						},
						{
							"name": "Beguiling Arrow",
							"description": "Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 2d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw."
						},
						{
							"name": "Bursting Arrow",
							"description": "You imbue your arrow with force energy drawn from the school of evocation. The arrow detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 force damage each."
						},
						{
							"name": "Enfeebling Arrow",
							"description": "You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn."
						},
						{
							"name": "Grasping Arrow",
							"description": "When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 2d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again."
						},
						{
							"name": "Piercing Arrow",
							"description": "You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow fires forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 1d6 piercing damage. On a successful save, a target takes half as much damage."
						},
						{
							"name": "Seeking Arrow",
							"description": "Using divination magic, you grant your arrow the ability to seek out your target, allowing the arrow to curve and twist its path in search of its prey. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. On a failed save, it takes damage as if it were hit by the arrow, plus an extra 1d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location."
						},
						{
							"name": "Shadow Arrow",
							"description": "You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn."
						}
					]
				}
			]
		},
		{
			"name": "Banneret",
			"slug": "banneret",
			"source": "Sword Coast Adventurer's Guide",
			"summary": "A banneret is a knight who inspires greatness in others by committing brave deeds in battle. The mere presence of one in a hamlet is enough to cause some orcs and bandits to seek easier prey. A lone banneret is a skilled warrior, but a banneret leading a band of allies can transform even the most poorly equipped militia into a ferocious war band.\nAs a banneret spearheads an attack, their actions can awaken reserves of courage and conviction in allies that they never suspected they had.\nBanneret serves as the generic name for the Purple Dragon Knight archetype if you use it in campaign settings other than the Forgotten Realms or to model warlords other than Purple Dragon Knights.",
			"features": [
				{
					"name": "Rallying Cry",
					"level": 3,
					"description": "When you choose this archetype at 3rd level, you learn how to inspire your allies to fight on past their injuries.\nWhen you use your Second Wind feature, you can choose up to three creatures within 60 feet of you that are allied with you. Each one regains hit points equal to your fighter level, provided that the creature can see or hear you."
				},
				{
					"name": "Royal Envoy",
					"level": 7,
					"description": "Knights of high standing are expected to conduct themselves with grace.\nAt 7th level, you gain proficiency in the Persuasion skill. If you are already proficient in it, you gain proficiency in one of the following skills of your choice: Animal Handling, Insight, Intimidation, or Performance.\nYour proficiency bonus is doubled for any ability check you make that uses Persuasion. You receive this benefit regardless of the skill proficiency you gain from this feature."
				},
				{
					"name": "Inspiring Surge",
					"level": 10,
					"description": "Starting at 10th level, when you use your Action Surge feature, you can choose one creature within 60 feet of you that is allied with you. That creature can make one melee or ranged weapon attack with its reaction, provided that it can see or hear you.\nStarting at 18th level, you can choose two allies within 60 feet of you, rather than one."
				},
				{
					"name": "Bulwark",
					"level": 15,
					"description": "Beginning at 15th level, you can extend the benefit of your Indomitable feature to an ally. When you decide to use Indomitable to reroll an Intelligence, a Wisdom, or a Charisma saving throw and you aren't incapacitated, you can choose one ally within 60 feet of you that also failed its saving throw against the same effect. If that creature can see or hear you, it can reroll its saving throw and must use the new roll."
				}
			]
		},
		{
			"name": "Cavalier",
			"slug": "cavalier",
			"source": "Xanathar's Guide to Everything",
			"summary": "Usually born among the nobility and raised at court, a cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner. Cavaliers also learn how to guard those in their charge from harm, often serving as the protectors of their superiors and of the weak. Compelled to right wrongs or earn prestige, many of these fighters leave their lives of comfort to embark on glorious adventure.",
			"features": [
				{
					"name": "Bonus Proficiency",
					"level": 3,
					"description": "When you choose this archetype at 3rd level, you gain proficiency in one of the following skills of your choice: Animal Handling, History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice."
				},
				{
					"name": "Born to the Saddle",
					"level": 3,
					"description": "Starting at 3rd level, your mastery as a rider becomes apparent. You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you're not incapacitated.\nFinally, mounting or dismounting a creature costs you only 5 feet of movement, rather than half your speed."
				},
				{
					"name": "Unwavering Mark",
					"level": 3,
					"description": "Starting at 3rd level, you can menace your foes, foiling their attacks and punishing them for harming others. When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. This effect ends early if you are incapacitated or you die, or if someone else marks the creature.\nWhile it is within 5 feet of you, a creature marked by you has disadvantage on any attack roll that doesn't target you.\nIn addition, if a creature marked by you deals damage to anyone other than you, you can make a special melee weapon attack against the marked creature as a bonus action on your next turn. You have advantage on the attack roll, and if it hits, the attack's weapon deals extra damage to the target equal to half your fighter level.\nRegardless of the number of creatures you mark, you can make this special attack a number of times equal to your Strength modifier (a minimum of once), and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Warding Maneuver",
					"level": 7,
					"description": "At 7th level, you learn to fend off strikes directed at you, your mount, or other creatures nearby. If you or a creature you can see within 5 feet of you is hit by an attack, you can roll 1d8 as a reaction if you're wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target's AC against that attack. If the attack still hits, the target has resistance against the attack's damage.\nYou can use this feature a number of times equal to your Constitution modifier (a minimum of once), and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Hold the Line",
					"level": 10,
					"description": "At 10th level, you become a master of locking down your enemies. Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target's speed is reduced to 0 until the end of the current turn."
				},
				{
					"name": "Ferocious Charger",
					"level": 15,
					"description": "Starting at 15th level, you can run down your foes, whether you're mounted or not. If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone. You can use this feature only once on each of your turns."
				},
				{
					"name": "Vigilant Defender",
					"level": 18,
					"description": "Starting at 18th level, you respond to danger with extraordinary vigilance. In combat, you get a special reaction that you can take once on every creature's turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can't use it on the same turn that you take your normal reaction."
				}
			]
		},
		{
			"name": "Champion",
			"slug": "champion",
			"source": "Player's Handbook",
			"summary": "The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.",
			"features": [
				{
					"name": "Improved Critical",
					"level": 3,
					"description": "Beginning when you choose this archetype at 3rd level, your weapon attacks score a critical hit on a roll of 19 or 20."
				},
				{
					"name": "Remarkable Athlete",
					"level": 7,
					"description": "Starting at 7th level, you can add half your proficiency bonus (rounded up) to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus.\nIn addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier."
				},
				{
					"name": "Additional Fighting Style",
					"level": 10,
					"description": "At 10th level, you can choose a second option from the Fighting Style class feature."
				},
				{
					"name": "Superior Critical",
					"level": 15,
					"description": "Starting at 15th level, your weapon attacks score a critical hit on a roll of 18-20."
				},
				{
					"name": "Survivor",
					"level": 18,
					"description": "At 18th level, you attain the pinnacle of resilience in battle. At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left. You don't gain this benefit if you have 0 hit points."
				}
			]
		},
		{
			"name": "Echo Knight",
			"slug": "echo-knight",
			"source": "Explorer's Guide to Wildemount",
			"summary": "A mysterious and feared frontline warrior of the Kryn Dynasty, the Echo Knight has mastered the art of using dunamis to summon the fading shades of unrealized timelines to aid them in battle. Surrounded by echoes of their own might, they charge into the fray as a cycling swarm of shadows and strikes.",
			"features": [
				{
					"name": "Manifest Echo",
					"level": 3,
					"description": "At 3rd level, you can use a bonus action to magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you're incapacitated.\nYour echo has AC 14 + your proficiency bonus, 1 hit point, and immunity to all conditions. If it has to make a saving throw, it uses your saving throw bonus for the roll. It is the same size as you, and it occupies its space. On your turn, you can mentally command the echo to move up to 30 feet in any direction (no action required). If your echo is ever more than 30 feet from you at the end of your turn, it is destroyed.\n• As a bonus action, you can teleport, magically swapping places with your echo at a cost of 15 feet of your movement, regardless of the distance between the two of you.\n• When you take the Attack action on your turn, any attack you make with that action can originate from your space or the echo's space. You make this choice for each attack.\n• When a creature that you can see within 5 feet of your echo moves at least 5 feet away from it, you can use your reaction to make an opportunity attack against that creature as if you were in the echo's space."
				},
				{
					"name": "Unleash Incarnation",
					"level": 3,
					"description": "At 3rd level, you can heighten your echo's fury. Whenever you take the Attack action, you can make one additional melee attack from the echo's position.\nYou can use this feature a number of times equal to your Constitution modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Echo Avatar",
					"level": 7,
					"description": "Starting at 7th level, you can temporarily transfer your consciousness to your echo. As an action, you can see through your echo's eyes and hear through its ears. During this time, you are deafened and blinded. You can sustain this effect for up to 10 minutes, and you can end it at any time (requires no action). While your echo is being used in this way, it can be up to 1,000 feet away from you without being destroyed."
				},
				{
					"name": "Shadow Martyr",
					"level": 10,
					"description": "Starting at 10th level, you can make your echo throw itself in front of an attack directed at another creature that you can see. Before the attack roll is made, you can use your reaction to teleport the echo to an unoccupied space within 5 feet of the targeted creature. The attack roll that triggered the reaction is instead made against your echo.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Reclaim Potential",
					"level": 15,
					"description": "By 15th level, you've learned to absorb the fleeting magic of your echo. When an echo of yours is destroyed by taking damage, you can gain a number of temporary hit points equal to 2d6 + your Constitution modifier, provided you don't already have temporary hit points.\nYou can use this feature a number of times equal to your Constitution modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Legion of One",
					"level": 18,
					"description": "At 18th level, you can use a bonus action to create two echos with your Manifest Echo feature, and these echoes can co-exist. If you try to create a third echo, the previous two echoes are destroyed. Anything you can do from one echo's position can be done from the other's instead.\nIn addition, when you roll initiative and have no uses of your Unleash Incarnation feature left, you regain one use of that feature."
				}
			]
		},
		{
			"name": "Eldritch Knight",
			"slug": "eldritch-knight",
			"source": "Player's Handbook",
			"summary": "The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards. They focus their study on two of the eight schools of magic: abjuration and evocation. Abjuration spells grant an Eldritch Knight additional protection in battle, and evocation spells deal damage to many foes at once, extending the fighter's reach in combat. These knights learn a comparatively small number of spells, committing them to memory instead of keeping them in a spellbook.",
			"features": [
				{
					"name": "Eldritch Knight Spellcasting",
					"level": 3,
					"description": "Fighter Level | Cantrips Known | Spells Known | 1st | 2nd | 3rd | 4th\n3rd | 2 | 3 | 2 | - | - | -\n4th | 2 | 4 | 3 | - | - | -\n5th | 2 | 4 | 3 | - | - | -\n6th | 2 | 4 | 3 | - | - | -\n7th | 2 | 5 | 4 | 2 | - | -\n8th | 2 | 6 | 4 | 2 | - | -\n9th | 2 | 6 | 4 | 2 | - | -\n10th | 3 | 7 | 4 | 3 | - | -\n11th | 3 | 8 | 4 | 3 | - | -\n12th | 3 | 8 | 4 | 3 | - | -\n13th | 3 | 9 | 4 | 3 | 2 | -\n14th | 3 | 10 | 4 | 3 | 2 | -\n15th | 3 | 10 | 4 | 3 | 2 | -\n16th | 3 | 11 | 4 | 3 | 3 | -\n17th | 3 | 11 | 4 | 3 | 3 | -\n18th | 3 | 11 | 4 | 3 | 3 | -\n19th | 3 | 12 | 4 | 3 | 3 | 1\n20th | 3 | 13 | 4 | 3 | 3 | 1"
				},
				{
					"name": "Spellcasting",
					"level": 3,
					"description": "When you reach 3rd level, you augment your martial prowess with the ability to cast spells.\nCANTRIPS\nYou learn two cantrips of your choice from the wizard spell list. You learn an additional wizard cantrip of your choice at 10th level.\nSPELL SLOTS\nThe Eldritch Knight Spellcasting table shows how many spell slots you have to cast your wizard spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nFor example, if you know the 1st-level spell Shield and have a 1st-level and a 2nd-level spell slot available, you can cast Shield using either slot.\nSPELLS KNOWN OF 1ST LEVEL AND HIGHER\nYou know three 1st-level wizard spells of your choice, two of which you must choose from the abjuration and evocation spells on the wizard spell list.\nThe Spells Known column of the Eldritch Knight Spellcasting table shows when you learn more wizard spells of 1st level or higher. Each of these spells must be an abjuration or evocation spell of your choice, and must be of a level for which you have spell slots. For instance, when you reach 7th level in this class, you can learn one new spell of 1st or 2nd level.\nThe spells you learn at 8th, 14th, and 20th level can come from any school of magic.\nWhenever you gain a level in this class, you can replace one of the wizard spells you know with another spell of your choice from the wizard spell list. The new spell must be of a level for which you have spell slots, and it must be an abjuration or evocation spell, unless you're replacing the spell you gained at 3rd, 8th, 14th, or 20th level from any school of magic.\nSPELLCASTING ABILITY\nIntelligence is your spellcasting ability for your wizard spells, since you learn your spells through study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for a wizard spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Intelligence modifier\nSpell attack modifier = your proficiency bonus + your Intelligence modifier"
				},
				{
					"name": "Weapon Bond",
					"level": 3,
					"description": "At 3rd level, you learn a ritual that creates a magical bond between yourself and one weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. The weapon must be within your reach throughout the ritual, at the conclusion of which you touch the weapon and forge the bond.\nOnce you have bonded a weapon to yourself, you can't be disarmed of that weapon unless you are incapacitated. If it is on the same plane of existence, you can summon that weapon as a bonus action on your turn, causing it to teleport instantly to your hand.\nYou can have up to two bonded weapons, but can summon only one at a time with your bonus action. If you attempt to bond with a third weapon, you must break the bond with one of the other two."
				},
				{
					"name": "War Magic",
					"level": 7,
					"description": "Beginning at 7th level, when you use your action to cast a cantrip, you can make one weapon attack as a bonus action."
				},
				{
					"name": "Eldritch Strike",
					"level": 10,
					"description": "At 10th level, you learn how to make your weapon strikes undercut a creature's resistance to your spells. When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn."
				},
				{
					"name": "Arcane Charge",
					"level": 15,
					"description": "At 15th level, you gain the ability to teleport up to 30 feet to an unoccupied space you can see when you use your Action Surge. You can teleport before or after the additional action."
				},
				{
					"name": "Improved War Magic",
					"level": 18,
					"description": "Starting at 18th level, when you use your action to cast a spell, you can make one weapon attack as a bonus action."
				}
			]
		},
		{
			"name": "Psi Warrior",
			"slug": "psi-warrior",
			"source": "Tasha's Cauldron of Everything",
			"summary": "Awake to the psionic power within, a Psi Warrior is a fighter who augments their physical might with psi-infused weapon strikes, telekinetic lashes, and barriers of mental force. Many githyanki train to become such warriors, as do some of the most disciplined high elves. In the world of Eberron, many young kalashtar dream of becoming Psi Warriors.\nAs a Psi Warrior, you might have honed your psionic abilities through solo discipline, unlocked it under the tutelage of a master, or refined it at an academy dedicated to wielding the mind's power as both weapon and shield.",
			"features": [
				{
					"name": "Psionic Power",
					"level": 3,
					"description": "At 3rd level, you harbor a wellspring of psionic energy within yourself. This energy is represented by your Psionic Energy dice, which are each a d6. You have a number of these dice equal to twice your proficiency bonus, and they fuel various psionic powers you have, which are detailed below.\nSome of your powers expend the Psionic Energy die they use, as specified in a power's description, and you can't use a power if it requires you to use a die when your dice are all expended. You regain all your expended Psionic Energy dice when you finish a long rest. In addition, as a bonus action, you can regain one expended Psionic Energy die, but you can't do so again until you finish a short or long rest.\nWhen you reach certain levels in this class, the size of your Psionic Energy dice increases: at 5th level (d8), 11th level (d10), and 17th level (d12).\nThe powers below use your Psionic Energy dice.\nProtective Field. When you or another creature you can see within 30 feet of you takes damage, you can use your reaction to expend one Psionic Energy die, roll the die, and reduce the damage taken by the number rolled plus your Intelligence modifier (minimum reduction of 1), as you create a momentary shield of telekinetic force.\nPsionic Strike. You can propel your weapons with psionic force. Once on each of your turns, immediately after you hit a target within 30 feet of you with an attack and deal damage to it with a weapon, you can expend one Psionic Energy die, rolling it and dealing force damage to the target equal to the number rolled plus your Intelligence modifier.\nTelekinetic Movement. You can move an object or a creature with your mind. As an action, you target one loose object that is Large or smaller or one willing creature, other than yourself. If you can see the target and it is within 30 feet of you, you can move it up to 30 feet to an unoccupied space you can see. Alternatively, if it is a Tiny object, you can move it to or from your hand. Either way, you can move the target horizontally, vertically, or both. Once you take this action, you can't do so again until you finish a short or long rest, unless you expend a Psionic Energy die to take it again.",
					"options": [
						{
							"name": "Protective Field",
							"description": "When you or another creature you can see within 30 feet of you takes damage, you can use your reaction to expend one Psionic Energy die, roll the die, and reduce the damage taken by the number rolled plus your Intelligence modifier (minimum reduction of 1), as you create a momentary shield of telekinetic force."
						},
						{
							"name": "Psionic Strike",
							"description": "You can propel your weapons with psionic force. Once on each of your turns, immediately after you hit a target within 30 feet of you with an attack and deal damage to it with a weapon, you can expend one Psionic Energy die, rolling it and dealing force damage to the target equal to the number rolled plus your Intelligence modifier."
						},
						{
							"name": "Telekinetic Movement",
							"description": "You can move an object or a creature with your mind. As an action, you target one loose object that is Large or smaller or one willing creature, other than yourself. If you can see the target and it is within 30 feet of you, you can move it up to 30 feet to an unoccupied space you can see. Alternatively, if it is a Tiny object, you can move it to or from your hand. Either way, you can move the target horizontally, vertically, or both. Once you take this action, you can't do so again until you finish a short or long rest, unless you expend a Psionic Energy die to take it again."
						}
					]
				},
				{
					"name": "Telekinetic Adept",
					"level": 7,
					"description": "By the 7th level, You have mastered new ways to use your telekinetic abilities, detailed below.\nPsi-Powered Leap. As a bonus action, you can propel your body with your mind. You gain a flying speed equal to twice your walking speed until the end of the current turn. Once you take this bonus action, you can't do so again until you finish a short or long rest, unless you expend a Psionic Energy die to take it again.\nTelekinetic Thrust. When you deal damage to a target with your Psionic Strike, you can force the target to make a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Intelligence modifier. If the save fails, you can knock the target prone or move it up to 10 feet in any direction horizontally.",
					"options": [
						{
							"name": "Psi-Powered Leap",
							"description": "As a bonus action, you can propel your body with your mind. You gain a flying speed equal to twice your walking speed until the end of the current turn. Once you take this bonus action, you can't do so again until you finish a short or long rest, unless you expend a Psionic Energy die to take it again."
						},
						{
							"name": "Telekinetic Thrust",
							"description": "When you deal damage to a target with your Psionic Strike, you can force the target to make a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Intelligence modifier. If the save fails, you can knock the target prone or move it up to 10 feet in any direction horizontally."
						}
					]
				},
				{
					"name": "Guarded Mind",
					"level": 10,
					"description": "Starting at 10th level, the psionic energy flowing through you has bolstered your mind. You have resistance to psychic damage. Moreover, if you start your turn charmed or frightened, you can expend a Psionic Energy die and end every effect on yourself subjecting you to those conditions."
				},
				{
					"name": "Bulwark of Force",
					"level": 15,
					"description": "At 15th level, you can shield yourself and others with telekinetic force. As a bonus action, you can choose creatures, which can include you, that you can see within 30 feet of you, up to a number of creatures equal to your Intelligence modifier (minimum of one creature). Each of the chosen creatures is protected by half cover for 1 minute or until you're incapacitated.\nOnce you take this bonus action, you can't do so again until you finish a long rest, unless you expend a Psionic Energy die to take it again."
				},
				{
					"name": "Telekinetic Master",
					"level": 18,
					"description": "By 18th level, your ability to move creatures and objects with your mind is matched by few. You can cast the Telekinesis spell, requiring no components, and your spellcasting ability for the spell is Intelligence. On each of your turns while you concentrate on the spell, including the turn when you cast it, you can make one attack with a weapon as a bonus action.\nOnce you cast the spell with this feature, you can't do so again until you finish a long rest, unless you expend a Psionic Energy die to cast it again."
				}
			]
		},
		{
			"name": "Rune Knight",
			"slug": "rune-knight",
			"source": "Tasha's Cauldron of Everything",
			"summary": "Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants. Rune cutters can be found among any family of giants, and you likely learned your methods first or second hand from such a mystical artisan. Whether you found the giant's work carved into a hill or cave, learned of the runes from a sage, or met the giant in person, you studied the giant's craft and learned how to apply magic runes to empower your equipment.",
			"features": [
				{
					"name": "Bonus Proficiencies",
					"level": 3,
					"description": "When you choose this archetype at 3rd level, you gain proficiency with smith's tools, and you learn to speak, read, and write Giant."
				},
				{
					"name": "Rune Carver",
					"level": 3,
					"description": "Starting at 3rd level, you can use magic runes to enhance your gear. You learn two runes of your choice, from among the runes described below, and each time you gain a level in this class, you can replace one rune you know with a different one from this feature. When you reach certain levels in this class, you learn additional runes, as shown in the Runes Known table.\nRunes Known | \nFighter Level | Number of Runes\n3rd | 2\n7th | 3\n10th | 4\n15th | 5\nWhenever you finish a long rest, you can touch a number of objects equal to the number of runes you know, and you inscribe a different rune onto each of the objects. To be eligible, an object must be a weapon, a suit of armor, a shield, a piece of jewelry, or something else you can wear or hold in a hand. Your rune remains on an object until you finish a long rest, and an object can bear only one of your runes at a time.\nThe following runes are available to you when you learn a rune. If a rune has a level requirement, you must be at least that level in this class to learn the rune. If a rune requires a saving throw, your Rune Magic save DC equals 8 + your proficiency bonus + your Constitution modifier.\n• Cloud Rune. This rune emulates the deceptive magic used by some cloud giants. While wearing or carrying an object inscribed with this rune, you have advantage on Dexterity (Sleight of Hand) checks and Charisma (Deception) checks.\n• In addition, when you or a creature you can see within 30 feet of you is hit by an attack roll, you can use your reaction to invoke the rune and choose a different creature within 30 feet of you, other than the attacker. The chosen creature becomes the target of the attack, using the same roll. This magic can transfer the attack's effects regardless of the attack's range. Once you invoke this rune, you can't do so again until you finish a short or long rest.\n• Fire Rune. This rune's magic channels the masterful craftsmanship of great smiths. While wearing or carrying an object inscribed with this rune, your proficiency bonus is doubled for any ability check you make that uses your proficiency with a tool.\n• In addition, when you hit a creature with an attack using a weapon, you can invoke the rune to summon fiery shackles: the target takes an extra 2d6 fire damage, and it must succeed on a Strength saving throw or be restrained for 1 minute. While restrained by the shackles, the target takes 2d6 fire damage at the start of each of its turns. The target can repeat the saving throw at the end of each of its turns, banishing the shackles on a success. Once you invoke this rune, you can't do so again until you finish a short or long rest.\n• Frost Rune. This rune's magic evokes the might of those who survive in the wintry wilderness, such as frost giants. While wearing or carrying an object inscribed with this rune, you have advantage on Wisdom (Animal Handling) checks and Charisma (Intimidation) checks.\n• In addition, you can invoke the rune as a bonus action to increase your sturdiness. For 10 minutes, you gain a +2 bonus to all ability checks and saving throws that use Strength or Constitution. Once you invoke this rune, you can't do so again until you finish a short or long rest.\n• Stone Rune. This rune's magic channels the judiciousness associated with stone giants. While wearing or carrying an object inscribed with this rune, you have advantage on Wisdom (Insight) checks, and you have darkvision out to a range of 120 feet.\n• In addition, when a creature you can see ends its turn within 30 feet of you, you can use your reaction to invoke the rune and force the creature to make a Wisdom saving throw. Unless the save succeeds, the creature is charmed by you for 1 minute. While charmed in this way, the creature has a speed of 0 and is incapacitated, descending into a dreamy stupor. The creature repeats the saving throw at the end of each of its turns, ending the effect on a success. Once you invoke this rune, you can't do so again until you finish a short or long rest.\n• Hill Rune (7th Level or Higher). This rune's magic bestows a resilience reminiscent of a hill giant. While wearing or carrying an object that bears this rune, you have advantage on saving throws against being poisoned, and you have resistance against poison damage.\n• In addition, you can invoke the rune as a bonus action, gaining resistance to bludgeoning, piercing, and slashing damage for 1 minute. Once you invoke this rune, you can't do so again until you finish a short or long rest.\n• Storm Rune (7th Level or Higher). Using this rune, you can glimpse the future like a storm giant seer. While wearing or carrying an object inscribed with this rune, you have advantage on Intelligence (Arcana) checks, and you can't be surprised as long as you aren't incapacitated.\n• In addition, you can invoke the rune as a bonus action to enter a prophetic state for 1 minute or until you're incapacitated. Until the state ends, when you or another creature you can see within 60 feet of you makes an attack roll, a saving throw, or an ability check, you can use your reaction to cause the roll to have advantage or disadvantage. Once you invoke this rune, you can't do so again until you finish a short or long rest.",
					"options": [
						{
							"name": "Cloud Rune",
							"description": "This rune emulates the deceptive magic used by some cloud giants. While wearing or carrying an object inscribed with this rune, you have advantage on Dexterity (Sleight of Hand) checks and Charisma (Deception) checks."
						},
						{
							"name": "Fire Rune",
							"description": "This rune's magic channels the masterful craftsmanship of great smiths. While wearing or carrying an object inscribed with this rune, your proficiency bonus is doubled for any ability check you make that uses your proficiency with a tool."
						},
						{
							"name": "Frost Rune",
							"description": "This rune's magic evokes the might of those who survive in the wintry wilderness, such as frost giants. While wearing or carrying an object inscribed with this rune, you have advantage on Wisdom (Animal Handling) checks and Charisma (Intimidation) checks."
						},
						{
							"name": "Stone Rune",
							"description": "This rune's magic channels the judiciousness associated with stone giants. While wearing or carrying an object inscribed with this rune, you have advantage on Wisdom (Insight) checks, and you have darkvision out to a range of 120 feet."
						},
						{
							"name": "Hill Rune",
							"prerequisite": "7th Level or Higher",
							"description": "This rune's magic bestows a resilience reminiscent of a hill giant. While wearing or carrying an object that bears this rune, you have advantage on saving throws against being poisoned, and you have resistance against poison damage."
						},
						{
							"name": "Storm Rune",
							"prerequisite": "7th Level or Higher",
							"description": "Using this rune, you can glimpse the future like a storm giant seer. While wearing or carrying an object inscribed with this rune, you have advantage on Intelligence (Arcana) checks, and you can't be surprised as long as you aren't incapacitated."
						}
					]
				},
				{
					"name": "Giant's Might",
					"level": 3,
					"description": "At 3rd level, you have learned how to imbue yourself with the might of giants. As a bonus action, you magically gain the following benefits, which last for 1 minute:\n• If you are smaller than Large, you become Large, along with anything you are wearing. If you lack the room to become Large, your size doesn't change.\n• You have advantage on Strength checks and Strength saving throws.\n• Once on each of your turns, one of your attacks with a weapon or an unarmed strike can deal an extra 1d6 damage to a target on a hit.\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Runic Shield",
					"level": 7,
					"description": "At 7th level, you learn to invoke your rune magic to protect your allies. When another creature you can see within 60 feet of you is hit by an attack roll, you can use your reaction to force the attacker to reroll the d20 and use the new roll.\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Great Stature",
					"level": 10,
					"description": "By 10th level, the magic of your runes permanently alters you. When you gain this feature, roll 3d4. You grow a number of inches in height equal to the roll.\nMoreover, the extra damage you deal with your Giant's Might feature increases to 1d8."
				},
				{
					"name": "Master of Runes",
					"level": 15,
					"description": "At 15th level, you can invoke each rune you know from your Rune Carver feature twice, rather than once, and you regain all expended uses when you finish a short or long rest."
				},
				{
					"name": "Runic Juggernaut",
					"level": 18,
					"description": "At 18th level, you learn how to amplify your rune-powered transformation. As a result, the extra damage you deal with the Giant's Might feature increases to 1d10. Moreover, when you use that feature, your size can increase to Huge, and while you are that size, your reach increases by 5 feet."
				}
			]
		},
		{
			"name": "Samurai",
			"slug": "samurai",
			"source": "Xanathar's Guide to Everything",
			"summary": "The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies. A samurai's resolve is nearly unbreakable, and the enemies in a samurai's path have two choices: yield or die fighting.",
			"features": [
				{
					"name": "Bonus Proficiency",
					"level": 3,
					"description": "When you choose this archetype at 3rd level, you gain proficiency in one of the following skills of your choice: History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice."
				},
				{
					"name": "Fighting Spirit",
					"level": 3,
					"description": "Starting at 3rd level, your intensity in battle can shield you and help you strike true. As a bonus action on your turn, you can give yourself advantage on all weapon attack rolls until the end of the current turn. When you do so, you also gain 5 temporary hit points. The number of hit points increases when you reach certain levels in this class, increasing to 10 at 10th level and 15 at 15th level.\nYou can use this feature three times. You regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Elegant Courtier",
					"level": 7,
					"description": "Starting at 7th level, your discipline and attention to detail allow you to excel in social situations. Whenever you make a Charisma (Persuasion) check, you gain a bonus to the check equal to your Wisdom modifier.\nYour self-control also causes you to gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice)."
				},
				{
					"name": "Tireless Spirit",
					"level": 10,
					"description": "Starting at 10th level, when you roll initiative and have no uses of Fighting Spirit remaining, you regain one use."
				},
				{
					"name": "Rapid Strike",
					"level": 15,
					"description": "Starting at 15th level, you learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action. You can do so no more than once per turn."
				},
				{
					"name": "Strength Before Death",
					"level": 18,
					"description": "Starting at 18th level, your fighting spirit can delay the grasp of death. If you take damage that reduces you to 0 hit points, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn. While you have 0 hit points during that extra turn, taking damage causes death saving throw failures as normal, and three death saving throw failures can still kill you. When the extra turn ends, you fall unconscious if you still have 0 hit points.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		}
	]
};

export default fighter;
