const cleric = {
	"name": "Cleric",
	"hitDie": 8,
	"startingGold": "5d4 x 10",
	"subclassName": "Divine Domain",
	"suggestedAbilities": "Wisdom, Strength or Constitution",
	"primaryAbility": [
		"Wisdom"
	],
	"spellcastingAbility": "Wisdom",
	"subclassLevel": 1,
	"subclassFeatureLevels": [
		2,
		6,
		8,
		17
	],
	"armorProficiencies": "Light armor, medium armor, shields",
	"weaponProficiencies": "All simple weapons",
	"toolProficiencies": "None",
	"savingThrows": [
		"Wisdom",
		"Charisma"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"History",
			"Insight",
			"Medicine",
			"Persuasion",
			"Religion"
		],
		"raw": "Choose two from History, Insight, Medicine, Persuasion, and Religion"
	},
	"startingEquipment": [
		"(a) a mace or (b) a warhammer (if proficient)",
		"(a) Scale Mail, (b) Leather Armor, or (c) Chain Mail (if proficient)",
		"(a) a light crossbow and 20 bolts or (b) any simple weapon",
		"(a) a priest's pack or (b) an explorer's pack",
		"A shield and a holy symbol"
	],
	"table": {
		"caption": "The Cleric",
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
				"Spellcasting, Divine Domain",
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
				"Channel Divinity (x1), Divine Domain feature, Harness Divine Power (Optional)",
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
				"",
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
				"Ability Score Improvement, Cantrip Versatility (Optional)",
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
				"Destroy Undead (CR 1/2)",
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
				"Channel Divinity (x2), Divine Domain feature",
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
				"Ability Score Improvement, Destroy Undead (CR 1), Divine Domain feature, Cantrip Versatility (Optional)",
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
				"Divine Intervention",
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
				"Destroy Undead (CR 2)",
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
				"Ability Score Improvement, Cantrip Versatility (Optional)",
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
				"Destroy Undead (CR 3)",
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
				"Ability Score Improvement, Cantrip Versatility (Optional)",
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
				"Destroy Undead (CR 4), Divine Domain feature",
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
				"Channel Divinity (x3)",
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
				"Ability Score Improvement, Cantrip Versatility (Optional)",
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
				"Divine Intervention improvement",
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
			"description": "As a conduit for divine power, you can cast cleric spells.\nCANTRIPS\nAt 1st level, you know three cantrips of your choice from the cleric spell list. You learn additional cleric cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Cleric table.\nSPELL SLOTS\nThe Cleric table shows how many spell slots you have to cast your cleric spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nYou prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.\nFor example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.\nSPELLCASTING ABILITY\nWisdom is your spellcasting ability for your cleric spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a cleric spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a cleric spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier\nSpell attack modifier = your proficiency bonus + your Wisdom modifier\nRITUAL CASTING\nYou can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared.\nSPELLCASTING FOCUS\nYou can use a holy symbol as a spellcasting focus for your cleric spells."
		},
		{
			"name": "Divine Domain",
			"levels": [
				1
			],
			"description": "At 1st level, you choose a domain shaped by your choice of Deity and the gifts they grant you. Your choice grants you domain spells and other features when you choose it at 1st level. It also grants you additional ways to use Channel Divinity when you gain that feature at 2nd level, and additional benefits at 6th, 8th, and 17th levels.\nDomain | Source\nArcana | Sword Coast Adventurer's Guide\nDeath | Dungeon Master's Guide\nForge | Xanathar's Guide to Everything\nGrave | Xanathar's Guide to Everything\nKnowledge | Player's Handbook\nLife | Player's Handbook\nLight | Player's Handbook\nNature | Player's Handbook\nOrder | Guildmaster's Guide to Ravnica Tasha's Cauldron of Everything\nPeace | Tasha's Cauldron of Everything\nTempest | Player's Handbook\nTrickery | Player's Handbook\nTwilight | Tasha's Cauldron of Everything\nWar | Player's Handbook\nThe following domains are designed for the Amonkhet Planeshift articles, and are not part of any official release.\nSolidarity | Amonkhet\nStrength | Amonkhet\nAmbition | Amonkhet\nZeal | Amonkhet\nUnearthed Arcana\nFate | Unearthed Arcana 85 - Wonders of the Multiverse\nArchived Unearthed Arcana\nCity | Unearthed Arcana 7 - Modern Magic\nProtection | Unearthed Arcana 22 - Cleric\nTwilight | Unearthed Arcana 63 - Cleric, Druid, Wizard\nUnity | Unearthed Arcana 68 - Subclasses, Part 2\nDOMAIN SPELLS\nEach domain has a list of spells-its domain spells that you gain at the cleric levels noted in the domain description. Once you gain a domain spell, you always have it prepared, and it doesn't count against the number of spells you can prepare each day.\nIf you have a domain spell that doesn't appear on the cleric spell list, the spell is nonetheless a cleric spell for you."
		},
		{
			"name": "Channel Divinity",
			"levels": [
				2,
				6,
				18
			],
			"description": "At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels, as noted in the domain description.\nWhen you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again.\nSome Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your cleric spell save DC.\nBeginning at 6th level, you can use your Channel Divinity twice between rests, and beginning at 18th level, you can use it three times between rests. When you finish a short or long rest, you regain your expended uses.\nCHANNEL DIVINITY: TURN UNDEAD\nAs an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action."
		},
		{
			"name": "Harness Divine Power",
			"levels": [
				2
			],
			"optional": true,
			"description": "At 2nd level, you can expend a use of your Channel Divinity to fuel your spells. As a bonus action, you touch your holy symbol, utter a prayer, and regain one expended spell slot, the level of which can be no higher than half your proficiency bonus (rounded up). The number of times you can use this feature is based on the level you've reached in this class: 2nd level, once; 6th level, twice; and 18th level, thrice. You regain all expended uses when you finish a long rest."
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
			"name": "Cantrip Versatility",
			"levels": [
				4,
				8,
				12,
				16,
				19
			],
			"optional": true,
			"description": "Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace one cantrip you learned from this class's Spellcasting feature with another cantrip from the cleric spell list."
		},
		{
			"name": "Destroy Undead",
			"levels": [
				5,
				8,
				11,
				14,
				17
			],
			"description": "Starting at 5th level, when an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below a certain threshold, as shown in the Cleric table above."
		},
		{
			"name": "Blessed Strikes",
			"levels": [
				8
			],
			"optional": true,
			"description": "Replaces the Divine Strike or Potent Spellcasting feature\nWhen you reach 8th level, you are blessed with divine might in battle. When a creature takes damage from one of your cantrips or weapon attacks, you can also deal 1d8 radiant damage to that creature. Once you deal this damage, you can't use this feature again until the start of your next turn."
		},
		{
			"name": "Divine Intervention",
			"levels": [
				10
			],
			"description": "Beginning at 10th level, you can call on your deity to intervene on your behalf when your need is great.\nImploring your deity's aid requires you to use your action. Describe the assistance you seek, and roll percentile dice. If you roll a number equal to or lower than your cleric level, your deity intervenes. The DM chooses the nature of the intervention; the effect of any cleric spell or cleric domain spell would be appropriate. If your deity intervenes, you can't use this feature again for 7 days. Otherwise, you can use it again after you finish a long rest.\nAt 20th level, your call for intervention succeeds automatically, no roll required."
		}
	],
	"subclasses": [
		{
			"name": "Arcana",
			"slug": "arcana",
			"source": "Sword Coast Adventurer's Guide",
			"summary": "Magic is an energy that suffuses the multiverse and that fuels both destruction and creation. Gods of the Arcana domain know the secrets and potential of magic intimately. For some of these gods, magical knowledge is a great responsibility that comes with a special understanding of the nature of reality. Other gods of Arcana see magic as pure power, to be used as its wielder sees fit.\nThe gods of this domain are often associated with knowledge, as learning and arcane power tend to go hand-in-hand. In the Realms, deities of this domain include Azuth and Mystra, as well as Corellon Larethian of the elven pantheon. In other worlds, this domain includes Hecate, Math Mathonwy, and Isis; the triple moon gods of Solinari, Lunitari, and Nuitari of Krynn; and Boccob, Vecna, and Wee Jas of Greyhawk.",
			"features": [
				{
					"name": "Arcana Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Detect Magic, Magic Missile\n3rd | Magic Weapon, Nystul's Magic Aura\n5th | Dispel Magic, Magic Circle\n7th | Arcane Eye, Leomund's Secret Chest\n9th | Planar Binding, Teleportation Circle"
				},
				{
					"name": "Arcane Initiate",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain proficiency in the Arcana skill, and you gain two cantrips of your choice from the wizard spell list. For you, these cantrips count as cleric cantrips."
				},
				{
					"name": "Channel Divinity: Arcane Abjuration",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to abjure otherworldly creatures.\nAs an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly end its move in a space within 30 feet of you. It also can't take reactions. For its action, it can only use the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.\nAfter you reach 5th level, when a creature fails its saving throw against your Arcane Abjuration feature, the creature is banished for 1 minute (as in the Banishment spell, no concentration required) if it isn't on its plane of origin and its challenge rating is at or below a certain threshold, as shown on the Arcane Banishment table.\nArcane Banishment\nCleric Level | Banishes Creatures of CR…\n5th | 1/2 or lower\n8th | 1 or lower\n11th | 2 or lower\n14th | 3 or lower\n17th | 4 or lower"
				},
				{
					"name": "Spell Breaker",
					"level": 6,
					"description": "Starting at 6th level, when you restore hit points to an ally with a spell of 1st level or higher, you can also end one spell of your choice on that creature. The level of the spell you end must be equal to or lower than the level of the spell slot you use to cast the healing spell."
				},
				{
					"name": "Potent Spellcasting",
					"level": 8,
					"description": "Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip."
				},
				{
					"name": "Arcane Mastery",
					"level": 17,
					"description": "At 17th level, you choose four spells from the wizard spell list, one from each of the following levels: 6th, 7th, 8th, and 9th. You add them to your list of domain spells. Like your other domain spells, they are always prepared and count as cleric spells for you."
				}
			]
		},
		{
			"name": "Death",
			"slug": "death",
			"source": "Dungeon Master's Guide",
			"summary": "The Death domain is concerned with the forces that cause death, as well as the negative energy that gives rise to undead creatures. Deities such as Chemosh, Myrkul, and Wee Jas are patrons of necromancers, death knights, liches, mummy lords, and vampires. Gods of the Death domain also embody murder (Anubis, Bhaal, and Pyremius), pain (Iuz or Loviatar), disease or poison (Incabulos, Talona, or Morgion), and the underworld (Hades and Hel).",
			"features": [
				{
					"name": "Death Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | False Life, Ray of Sickness\n3rd | Blindness/Deafness, Ray of Enfeeblement\n5th | Animate Dead, Vampiric Touch\n7th | Blight, Death Ward\n9th | Antilife Shell, Cloudkill"
				},
				{
					"name": "Bonus Proficiency",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain proficiency with martial weapons."
				},
				{
					"name": "Reaper",
					"level": 1,
					"description": "At 1st level, you learn one necromancy cantrip of your choice from any spell list. When you cast a necromancy cantrip that normally targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other."
				},
				{
					"name": "Channel Divinity: Touch of Death",
					"level": 2,
					"description": "Starting at 2nd level, you can use Channel Divinity to destroy another creature's life force by touch. When you hit a creature with a melee attack, you can use Channel Divinity to deal extra necrotic damage to the target. The damage equals 5 + twice your cleric level."
				},
				{
					"name": "Inescapable Destruction",
					"level": 6,
					"description": "Starting at 6th level, your ability to channel negative energy becomes more potent. Necrotic damage dealt by your cleric spells and Channel Divinity options ignores resistance to necrotic damage."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with necrotic energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 necrotic damage to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Improved Reaper",
					"level": 17,
					"description": "Starting at 17th level, when you cast a necromancy spell of 1st through 5th level that targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other. If the spell consumes its material components, you must provide them for each target."
				}
			]
		},
		{
			"name": "Forge",
			"slug": "forge",
			"source": "Xanathar's Guide to Everything",
			"summary": "The gods of the forge are patrons of artisans who work with metal, from a humble blacksmith who keeps a village in horseshoes and plow blades to the mighty elf artisan whose diamond-tipped arrows of mithral have felled demon lords. The gods of the forge teach that, with patience and hard work, even the most intractable metal can be transformed from a lump of ore to a beautifully wrought object. Clerics of these deities search for objects lost to the forces of darkness, liberate mines overrun by orcs, and uncover rare and wondrous materials necessary to create potent magic items. Followers of these gods take great pride in their work, and they are willing to craft and use heavy armor and powerful weapons to protect them. Deities of this domain include Gond, Reorx, Onatar, Moradin, Hephaestus, and Goibhniu.",
			"features": [
				{
					"name": "Forge Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Identify, Searing Smite\n3rd | Heat Metal, Magic Weapon\n5th | Elemental Weapon, Protection from Energy\n7th | Fabricate, Wall of Fire\n9th | Animate Objects, Creation"
				},
				{
					"name": "Bonus Proficiencies",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain proficiency with heavy armor and smith's tools."
				},
				{
					"name": "Blessing of the Forge",
					"level": 1,
					"description": "At 1st level, you gain the ability to imbue magic into a weapon or armor. At the end of a long rest, you can touch one nonmagical object that is a suit of armor or a simple or martial weapon. Until the end of your next long rest or until you die, the object becomes a magic item, granting a +1 bonus to AC if it's armor or a +1 bonus to attack and damage rolls if it's a weapon.\nOnce you use this feature, you can't use it again until you finish a long rest."
				},
				{
					"name": "Channel Divinity: Artisan's Blessing",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to create simple items.\nYou conduct an hour-long ritual that crafts a nonmagical item that must include some metal: a simple or martial weapon, a suit of armor, ten pieces of ammunition, a set of tools, or another metal object. The creation is completed at the end of the hour, coalescing in an unoccupied space of your choice on a surface within 5 feet of you.\nThe thing you create can be something that is worth no more than 100 gp. As part of this ritual, you must lay out metal, which can include coins, with a value equal to the creation. The metal irretrievably coalesces and transforms into the creation at the ritual's end, magically forming even nonmetal parts of the creation.\nThe ritual can create a duplicate of a nonmagical item that contains metal, such as a key, if you possess the original during the ritual."
				},
				{
					"name": "Soul of the Forge",
					"level": 6,
					"description": "Starting at 6th level, your mastery of the forge grants you special abilities:\n• You gain resistance to fire damage.\n• While wearing heavy armor, you gain a +1 bonus to AC."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with the fiery power of the forge. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 fire damage to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Saint of Forge and Fire",
					"level": 17,
					"description": "At 17th level, your blessed affinity with fire and metal becomes more powerful:\n• You gain immunity to fire damage.\n• While wearing heavy armor, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks."
				}
			]
		},
		{
			"name": "Grave",
			"slug": "grave",
			"source": "Xanathar's Guide to Everything",
			"summary": "To these deities, death and the afterlife are a foundational part of the multiverse's workings. To resist death, or to desecrate the dead's rest, is an abomination. Deities of the grave include Kelemvor, Wee Jas, the ancestral spirits of the Undying Court, Hades, Anubis, and Osiris. These deities teach their followers to respect the dead and pay them due homage. Followers of these deities seek to put restless spirits to rest, destroy the undead wherever they find them, and ease the suffering of dying creatures. Their magic also allows them to stave off a creature's death, though they refuse to use such magic to extend a creature's lifespan beyond its mortal limits.",
			"features": [
				{
					"name": "Grave Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Bane, False Life\n3rd | Gentle Repose, Ray of Enfeeblement\n5th | Revivify, Vampiric Touch\n7th | Blight, Death Ward\n9th | Antilife Shell, Raise Dead"
				},
				{
					"name": "Circle of Mortality",
					"level": 1,
					"description": "At 1st level, you gain the ability to manipulate the line between life and death. When you would normally roll one or more dice to restore hit points with a spell to a creature at 0 hit points, you instead use the highest number possible for each die.\nIn addition, you learn the Spare the Dying cantrip, which doesn't count against the number of cleric cantrips you know. For you, it has a range of 30 feet, and you can cast it as a bonus action."
				},
				{
					"name": "Eyes of the Grave",
					"level": 1,
					"description": "At 1st level, you gain the ability to occasionally sense the presence of the undead, whose existence is an insult to the natural cycle of life. As an action, you can open your awareness to magically detect undead. Until the end of your next turn, you know the location of any undead within 60 feet of you that isn't behind total cover and that isn't protected from divination magic. This sense doesn't tell you anything about a creature's capabilities or identity.\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Channel Divinity: Path to the Grave",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to mark another creature's life force for termination.\nAs an action, you choose one creature you can see within 30 feet of you, cursing it until the end of your next turn. The next time you or an ally of yours hits the cursed creature with an attack, the creature has vulnerability to all of that attack's damage, and then the curse ends."
				},
				{
					"name": "Sentinel at Death's Door",
					"level": 6,
					"description": "At 6th level, you gain the ability to impede death's progress. As a reaction when you or an ally that you can see within 30 feet of you suffers a critical hit, you can turn that attack into a normal hit. Any effects triggered by a critical hit are canceled.\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Potent Spellcasting",
					"level": 8,
					"description": "Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip."
				},
				{
					"name": "Keeper of Souls",
					"level": 17,
					"description": "At 17th level, you can seize a trace of vitality from a parting soul and use it to heal the living. When an enemy you can see dies within 30 feet of you, you or one ally of your choice that is within 30 feet of you regains hit points equal to the enemy's number of Hit Dice. You can use this feature only if you aren't incapacitated. Once you use it, you can't do so again until the start of your next turn."
				}
			]
		},
		{
			"name": "Knowledge",
			"slug": "knowledge",
			"source": "Player's Handbook",
			"summary": "The gods of knowledge – including Oghma, Boccob, Gilean, Aureon, and Thoth – value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention. Some deities hoard knowledge and keep its secrets to themselves. And some promise their followers that they will gain tremendous power if they unlock the secrets of the multiverse. Followers of these gods study esoteric lore, collect old tomes, delve into the secret places of the earth, and learn all they can. Some gods of knowledge promote the practical knowledge of craft and invention, including smith deities like Gond, Reorx, Onatar, Moradin, Hephaestus, and Goibhniu.\nKefnet's task is to pass on this teaching of the God-Pharaoh and elucidate its meaning. He teaches that the afterlife will be inhabited only by those who have proved by their wits that they are worthy of dwelling in the glorious presence of the God-Pharaoh. He trains acolytes and initiates to push their limits and challenge their mental capacity with spells of ever-greater power.",
			"features": [
				{
					"name": "Knowledge Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Command, Identify\n3rd | Augury, Suggestion\n5th | Nondetection, Speak with Dead\n7th | Arcane Eye, Confusion\n9th | Legend Lore, Scrying"
				},
				{
					"name": "Blessings of Knowledge",
					"level": 1,
					"description": "At 1st level, you learn two languages of your choice. You also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion.\nYour proficiency bonus is doubled for any ability check you make that uses either of those skills."
				},
				{
					"name": "Channel Divinity: Knowledge of the Ages",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool."
				},
				{
					"name": "Channel Divinity: Read Thoughts",
					"level": 6,
					"description": "At 6th level, you can use your Channel Divinity to read a creature's thoughts. You can then use your access to the creature's mind to command it.\nAs an action, choose one creature that you can see within 60 feet of you. That creature must make a Wisdom saving throw. If the creature succeeds on the saving throw, you can't use this feature on it again until you finish a long rest.\nIf the creature fails its save, you can read its surface thoughts (those foremost in its mind, reflecting its current emotions and what it is actively thinking about) when it is within 60 feet of you. This effect lasts for 1 minute.\nDuring that time, you can use your action to end this effect and cast the Suggestion spell on the creature without expending a spell slot. The target automatically fails its saving throw against the spell."
				},
				{
					"name": "Potent Spellcasting",
					"level": 8,
					"description": "Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip."
				},
				{
					"name": "Visions of the Past",
					"level": 17,
					"description": "Starting at 17th level, you can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy glimpses of recent events. You can meditate in this way for a number of minutes equal to your Wisdom score and must maintain concentration during that time, as if you were casting a spell.\nOnce you use this feature, you can't use it again until you finish a short or long rest.\nObject Reading. Holding an object as you meditate, you can see visions of the object's previous owner. After meditating for 1 minute, you learn how the owner acquired and lost the object, as well as the most recent significant event involving the object and that owner. If the object was owned by another creature in the recent past (within a number of days equal to your Wisdom score), you can spend 1 additional minute for each owner to learn the same information about that creature.\nArea Reading. As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score. For each minute you meditate, you learn about one significant event, beginning with the most recent. Significant events typically involve powerful emotions, such as battles and betrayals, marriages and murders, births and funerals. However, they might also include more mundane events that are nevertheless important in your current situation.",
					"options": [
						{
							"name": "Object Reading",
							"description": "Holding an object as you meditate, you can see visions of the object's previous owner. After meditating for 1 minute, you learn how the owner acquired and lost the object, as well as the most recent significant event involving the object and that owner. If the object was owned by another creature in the recent past (within a number of days equal to your Wisdom score), you can spend 1 additional minute for each owner to learn the same information about that creature."
						},
						{
							"name": "Area Reading",
							"description": "As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score. For each minute you meditate, you learn about one significant event, beginning with the most recent. Significant events typically involve powerful emotions, such as battles and betrayals, marriages and murders, births and funerals. However, they might also include more mundane events that are nevertheless important in your current situation."
						}
					]
				}
			]
		},
		{
			"name": "Life",
			"slug": "life",
			"source": "Player's Handbook",
			"summary": "The Life domain focuses on the vibrant positive energy – one of the fundamental forces of the universe – that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath. Almost any non-evil deity can claim influence over this domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as Ilmater, Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrci).",
			"features": [
				{
					"name": "Life Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Bless, Cure Wounds\n3rd | Lesser Restoration, Spiritual Weapon\n5th | Beacon of Hope, Revivify\n7th | Death Ward, Guardian of Faith\n9th | Mass Cure Wounds, Raise Dead"
				},
				{
					"name": "Bonus Proficiency",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain proficiency with heavy armor."
				},
				{
					"name": "Disciple of Life",
					"level": 1,
					"description": "Also starting at 1st level, your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell's level."
				},
				{
					"name": "Channel Divinity: Preserve Life",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to heal the badly injured.\nAs an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can't use this feature on an undead or a construct."
				},
				{
					"name": "Blessed Healer",
					"level": 6,
					"description": "Beginning at 6th level, the healing spells you cast on others heal you as well. When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell's level."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Supreme Healing",
					"level": 17,
					"description": "Starting at 17th level, when you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die. For example, instead of restoring 2d6 hit points to a creature, you restore 12."
				}
			]
		},
		{
			"name": "Light",
			"slug": "light",
			"source": "Player's Handbook",
			"summary": "Gods of light – including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakhty – promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. Some of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others are tireless sentinels whose eyes pierce every shadow and see through every deception. Some are deities of beauty and artistry, who teach that art is a vehicle for the soul's improvement. Clerics of a god of light are enlightened souls infused with radiance and the power of their gods' discerning vision, charged with chasing away lies and burning away darkness.",
			"features": [
				{
					"name": "Light Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Burning Hands, Faerie Fire\n3rd | Flaming Sphere, Scorching Ray\n5th | Daylight, Fireball\n7th | Guardian of Faith, Wall of Fire\n9th | Flame Strike, Scrying"
				},
				{
					"name": "Bonus Cantrip",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain the Light cantrip if you don't already know it. This cantrip doesn't count against the number of cleric cantrips you know."
				},
				{
					"name": "Warding Flare",
					"level": 1,
					"description": "Also at 1st level, you can interpose divine light between yourself and an attacking enemy. When you are attacked by a creature within 30 feet of you that you can see, you can use your reaction to impose disadvantage on the attack roll, causing light to flare before the attacker before it hits or misses. An attacker that can't be blinded is immune to this feature.\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Channel Divinity: Radiance of the Dawn",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to harness sunlight, banishing darkness and dealing radiant damage to your foes.\nAs an action, you present your holy symbol, and any magical darkness within 30 feet of you is dispelled. Additionally, each hostile creature within 30 feet of you must make a Constitution saving throw. A creature takes radiant damage equal to 2d10 + your cleric level on a failed saving throw, and half as much damage on a successful one. A creature that has total cover from you is not affected."
				},
				{
					"name": "Improved Flare",
					"level": 6,
					"description": "Starting at 6th level, you can also use your Warding Flare feature when a creature that you can see within 30 feet of you attacks a creature other than you."
				},
				{
					"name": "Potent Spellcasting",
					"level": 8,
					"description": "Starting at 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip."
				},
				{
					"name": "Corona of Light",
					"level": 17,
					"description": "Starting at 17th level, you can use your action to activate an aura of sunlight that lasts for 1 minute or until you dismiss it using another action. You emit bright light in a 60-foot radius and dim light 30 feet beyond that. Your enemies in the bright light have disadvantage on saving throws against any spell that deals fire or radiant damage."
				}
			]
		},
		{
			"name": "Nature",
			"slug": "nature",
			"source": "Player's Handbook",
			"summary": "Gods of nature are as varied as the natural world itself; from inscrutable gods of the deep forests (such as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly deities associated with particular springs and groves (such as Eldath). Druids revere nature as a whole and might serve one of these deities, practicing mysterious rites and reciting all-but-forgotten prayers in their own secret tongue. But many of these gods have clerics as well, champions who take a more active role in advancing the interests of a particular nature god. These clerics might hunt the evil monstrosities that despoil the woodlands, bless the harvest of the faithful, or wither the crops of those who anger their gods.",
			"features": [
				{
					"name": "Nature Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Animal Friendship, Speak with Animals\n3rd | Barkskin, Spike Growth\n5th | Plant Growth, Wind Wall\n7th | Dominate Beast, Grasping Vine\n9th | Insect Plague, Tree Stride"
				},
				{
					"name": "Acolyte of Nature",
					"level": 1,
					"description": "At 1st level, you learn one cantrip of your choice from the druid spell list. This cantrip counts as a cleric cantrip for you, but it doesn't count against the number of cleric cantrips you know. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival."
				},
				{
					"name": "Bonus Proficiency",
					"level": 1,
					"description": "Also at 1st level, you gain proficiency with heavy armor."
				},
				{
					"name": "Channel Divinity: Charm Animals and Plants",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to charm animals and plants.\nAs an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate."
				},
				{
					"name": "Dampen Elements",
					"level": 6,
					"description": "Starting at 6th level, when you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 cold, fire, or lightning damage (your choice) to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Master of Nature",
					"level": 17,
					"description": "At 17th level, you gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn."
				}
			]
		},
		{
			"name": "Order",
			"slug": "order",
			"source": "Guildmaster's Guide to Ravnica, Tasha's Cauldron of Everything",
			"summary": "The Order Domain represents discipline, as well as devotion to the laws that govern a society, an institution, or a philosophy. Clerics of Order meditate on logic and justice as they serve their gods, examples of which appear in the Order Deities table.\nClerics of Order believe that well-crafted laws establish legitimate hierarchies, and those selected by law to lead must be obeyed. Those who obey must do so to the best of their ability, and if those who lead fail to protect the law, they must be replaced. In this manner, law weaves a web of obligations that create order and security in a chaotic multiverse.",
			"features": [
				{
					"name": "Order Deities",
					"level": 1,
					"description": "Example Deity | Pantheon\nAureon | Eberron\nBane | Forgotten Realms\nMajere | Dragonlance\nPholtus | Greyhawk\nTyr | Forgotten Realms\nWee Jas | Greyhawk"
				},
				{
					"name": "Order Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Command, Heroism\n3rd | Hold Person, Zone of Truth\n5th | Mass Healing Word, Slow\n7th | Compulsion, Locate Creature\n9th | Commune, Dominate Person"
				},
				{
					"name": "Bonus Proficiencies",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain proficiency with heavy armor. You also gain proficiency in the Intimidation or Persuasion skill (your choice)."
				},
				{
					"name": "Voice of Authority",
					"level": 1,
					"description": "Starting at 1st level, you can invoke the power of law to embolden an ally to attack. If you cast a spell with a spell slot of 1st level or higher and target an ally with the spell, that ally can use their reaction immediately after the spell to make one weapon attack against a creature of your choice that you can see.\nIf the spell targets more than one ally, you choose the ally who can make the attack."
				},
				{
					"name": "Channel Divinity: Order's Demand",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to exert an intimidating presence over others.\nAs an action, you present your holy symbol, and each creature of your choice that can see or hear you within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you until the end of your next turn or until the charmed creature takes any damage. You can also cause any of the charmed creatures to drop what they are holding when they fail the saving throw."
				},
				{
					"name": "Embodiment of the Law",
					"level": 6,
					"description": "At 6th level, you become remarkably adept at channeling magical energy to compel others.\nIf you cast a spell of the enchantment school using a spell slot of 1st level or higher, you can change the spell's casting time to 1 bonus action for this casting, provided the spell's casting time is normally 1 action.\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 psychic damage to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Order's Wrath",
					"level": 17,
					"description": "Starting at 17th level, enemies you designate for destruction wilt under the combined efforts of you and your allies. If you deal your Divine Strike damage to a creature on your turn, you can curse that creature until the start of your next turn. The next time one of your allies hits the cursed creature with an attack, the target also takes 2d8 psychic damage, and the curse ends. You can curse a creature in this way only once per turn."
				}
			]
		},
		{
			"name": "Peace",
			"slug": "peace",
			"source": "Tasha's Cauldron of Everything",
			"summary": "The balm of peace thrives at the heart of healthy communities, between friendly nations, and in the souls of the kindhearted. The gods of peace inspire people of all sorts to resolve conflict and to stand up against those forces that try to prevent peace from flourishing. See the Peace Deities table for a list of some of the gods associated with this domain.\nClerics of the Peace Domain preside over the signing of treaties, and they are often asked to arbitrate in disputes. These clerics' blessings draw people together and help them shoulder one another's burdens, and the clerics' magic aids those who are driven to fight for the way of peace.",
			"features": [
				{
					"name": "Peace Deities",
					"level": 1,
					"description": "Example Deity | Pantheon\nAngharradh | Elven\nBerronar Truesilver | Dwarven\nBoldrei | Eberron\nCyrrollalee | Halfling\nEldath | Forgotten Realms\nGaerdal Ironhand | Gnomish\nPaladine | Dragonlance\nRao | Greyhawk"
				},
				{
					"name": "Peace Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Heroism, Sanctuary\n3rd | Aid, Warding Bond\n5th | Beacon of Hope, Sending\n7th | Aura of Purity, Otiluke's Resilient Sphere\n9th | Greater Restoration, Rary's Telepathic Bond"
				},
				{
					"name": "Implement of Peace",
					"level": 1,
					"description": "When you choose this domain at 1st level, you gain proficiency in the Insight, Performance, or Persuasion skill (your choice)."
				},
				{
					"name": "Emboldening Bond",
					"level": 1,
					"description": "Starting at 1st level, you can forge an empowering bond among people who are at peace with one another. As an action, you choose a number of willing creatures within 30 feet of you (this can include yourself) equal to your proficiency bonus. You create a magical bond among them for 10 minutes or until you use this feature again. While any bonded creature is within 30 feet of another, the creature can roll a d4 and add the number rolled to an attack roll, an ability check, or a saving throw it makes. Each creature can add the d4 no more than once per turn.\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Channel Divinity: Balm of Peace",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to make your very presence a soothing balm. As an action, you can move up to your speed, without provoking opportunity attacks, and when you move within 5 feet of any other creature during this action, you can restore a number of hit points to that creature equal to 2d6 + your Wisdom modifier (minimum of 1 hit point). A creature can receive this healing only once whenever you take this action."
				},
				{
					"name": "Protective Bond",
					"level": 6,
					"description": "Beginning at 6th level, the bond you forge between people helps them protect each other. When a creature affected by your Emboldening Bond feature is about to take damage, a second bonded creature within 30 feet of the first can use its reaction to teleport to an unoccupied space within 5 feet of the first creature. The second creature then takes all the damage instead."
				},
				{
					"name": "Potent Spellcasting",
					"level": 8,
					"description": "At 8th level, you add your Wisdom modifier to the damage you deal with any cleric cantrip."
				},
				{
					"name": "Expansive Bond",
					"level": 17,
					"description": "At 17th level, the benefits of your Emboldening Bond and Protective Bond features now work when the creatures are within 60 feet of each other. Moreover, when a creature uses Protective Bond to take someone else's damage, the creature has resistance to that damage."
				}
			]
		},
		{
			"name": "Tempest",
			"slug": "tempest",
			"source": "Player's Handbook",
			"summary": "Gods whose portfolios include the Tempest domain – including Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor – govern storms, sea, and, sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage. In some pantheons, a god of this domain rules over other deities and is known for swift justice delivered by thunderbolts. In the pantheons of seafaring people, gods of this domain are ocean deities and the patrons of sailors. Tempest gods send their clerics to inspire fear in the common folk, either to keep those folk on the path of righteousness or to encourage them to offer sacrifices of propitiation to ward off divine wrath.",
			"features": [
				{
					"name": "Tempest Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Fog Cloud, Thunderwave\n3rd | Gust of Wind, Shatter\n5th | Call Lightning, Sleet Storm\n7th | Control Water, Ice Storm\n9th | Destructive Wave, Insect Plague"
				},
				{
					"name": "Bonus Proficiencies",
					"level": 1,
					"description": "At 1st level, you gain proficiency with martial weapons and heavy armor."
				},
				{
					"name": "Wrath of the Storm",
					"level": 1,
					"description": "Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one.\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Channel Divinity: Destructive Wrath",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to wield the power of the storm with unchecked ferocity.\nWhen you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling."
				},
				{
					"name": "Thunderous Strike",
					"level": 6,
					"description": "At 6th level, when you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 thunder damage to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Stormborn",
					"level": 17,
					"description": "At 17th level, you have a flying speed equal to your current walking speed whenever you are not underground or indoors."
				}
			]
		},
		{
			"name": "Trickery",
			"slug": "trickery",
			"source": "Player's Handbook",
			"summary": "Gods of trickery – such as Tymora, Beshaba, Olidammara, the Traveler, Garl Glittergold, and Loki – are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They're patrons of thieves, scoundrels, gamblers, rebels, and liberators. Their clerics are a disruptive force in the world, puncturing pride, mocking tyrants, stealing from the rich, freeing captives, and flouting hollow traditions. They prefer subterfuge, pranks, deception, and theft rather than direct confrontation.",
			"features": [
				{
					"name": "Trickery Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Charm Person, Disguise Self\n3rd | Mirror Image, Pass without Trace\n5th | Blink, Dispel Magic\n7th | Dimension Door, Polymorph\n9th | Dominate Person, Modify Memory"
				},
				{
					"name": "Blessing of the Trickster",
					"level": 1,
					"description": "Starting when you choose this domain at 1st level, you can use your action to touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again."
				},
				{
					"name": "Channel Divinity: Invoke Duplicity",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to create an illusory duplicate of yourself.\nAs an action, you create a perfect illusion of yourself that lasts for 1 minute, or until you lose your concentration (as if you were concentrating on a spell). The illusion appears in an unoccupied space that you can see within 30 feet of you. As a bonus action on your turn, you can move the illusion up to 30 feet to a space you can see, but it must remain within 120 feet of you.\nFor the duration, you can cast spells as though you were in the illusion's space, but you must use your own senses. Additionally, when both you and your illusion are within 5 feet of a creature that can see the illusion, you have advantage on attack rolls against that creature, given how distracting the illusion is to the target."
				},
				{
					"name": "Channel Divinity: Cloak of Shadows",
					"level": 6,
					"description": "Starting at 6th level, you can use your Channel Divinity to vanish.\nAs an action, you become invisible until the end of your next turn. You become visible if you attack or cast a spell."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with poison – a gift from your deity. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 poison damage to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Improved Duplicity",
					"level": 17,
					"description": "At 17th level, you can create up to four duplicates of yourself, instead of one, when you use Invoke Duplicity. As a bonus action on your turn, you can move any number of them up to 30 feet, to a maximum range of 120 feet."
				}
			]
		},
		{
			"name": "Twilight",
			"slug": "twilight",
			"source": "Tasha's Cauldron of Everything",
			"summary": "The twilit transition from light into darkness often brings calm and even joy, as the day's labors end and the hours of rest begin. The darkness can also bring terrors, but the gods of twilight guard against the horrors of the night.\nClerics who serve these deities-examples of which appear on the Twilight Deities table-bring comfort to those who seek rest and protect them by venturing into the encroaching darkness to ensure that the dark is a comfort, not a terror.",
			"features": [
				{
					"name": "Twilight Deities",
					"level": 1,
					"description": "Example Deity | Pantheon\nBoldrei | Eberron\nCelestian | Greyhawk\nDol Arrah | Eberron\nHelm | Forgotten Realms\nIlmater | Forgotten Realms\nMishakal | Dragonlance\nSelûne | Forgotten Realms\nYondalla | Halfling"
				},
				{
					"name": "Twilight Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Faerie Fire, Sleep\n3rd | Moonbeam, See Invisibility\n5th | Aura of Vitality, Leomund's Tiny Hut\n7th | Aura of Life, Greater Invisibility\n9th | Circle of Power, Mislead"
				},
				{
					"name": "Bonus Proficiencies",
					"level": 1,
					"description": "At 1st level, you gain proficiency with martial weapons and heavy armor."
				},
				{
					"name": "Eyes of Night",
					"level": 1,
					"description": "Starting at 1st level, you can see through the deepest gloom. You have darkvision out to a range of 300 feet. In that radius, you can see in dim light as if it were bright light and in darkness as if it were dim light.\nAs an action, you can magically share the darkvision of this feature with willing creatures you can see within 10 feet of you, up to a number of creatures equal to your Wisdom modifier (minimum of one creature). The shared darkvision lasts for 1 hour. Once you share it, you can't do so again until you finish a long rest, unless you expend a spell slot of any level to share it again."
				},
				{
					"name": "Vigilant Blessing",
					"level": 1,
					"description": "At 1st level, the night has taught you to be vigilant. As an action, you give one creature you touch (including possibly yourself) advantage on the next initiative roll the creature makes. This benefit ends immediately after the roll or if you use this feature again."
				},
				{
					"name": "Channel Divinity: Twilight Sanctuary",
					"level": 2,
					"description": "At 2nd level, you can use your Channel Divinity to refresh your allies with soothing twilight.\nAs an action, you present your holy symbol, and a sphere of twilight emanates from you. The sphere is centered on you, has a 30-foot radius, and is filled with dim light. The sphere moves with you, and it lasts for 1 minute or until you are incapacitated or die. Whenever a creature (including you) ends its turn in the sphere, you can grant that creature one of these benefits:\n• You grant it temporary hit points equal to 1d6 plus your cleric level.\n• You end one effect on it causing it to be charmed or frightened."
				},
				{
					"name": "Steps of Night",
					"level": 6,
					"description": "Starting at 6th level, you can draw on the mystical power of night to rise into the air. As a bonus action when you are in dim light or darkness, you can magically give yourself a flying speed equal to your walking speed for 1 minute. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Twilight Shroud",
					"level": 17,
					"description": "At 17th level, the twilight that you summon offers a protective embrace: you and your allies have half cover while in the sphere created by your Twilight Sanctuary."
				}
			]
		},
		{
			"name": "War",
			"slug": "war",
			"source": "Player's Handbook",
			"summary": "It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds. The clerics of such gods excel in battle, inspiring others to fight the good fight or offering acts of violence as prayers. Gods of war include champions of honor and chivalry (such as Torm, Heironeous, and Kiri-Jolith) as well as gods of destruction and pillage (such as Erythnul, the Fury, Gruumsh, and Ares) and gods of conquest and domination (such as Bane, Hextor, and Maglubiyet). Other war gods (such as Tempus, Nike, and Nuada) take a more neutral stance, promoting war in all its manifestations and supporting warriors in any circumstance.",
			"features": [
				{
					"name": "War Domain Spells",
					"level": 1,
					"description": "Cleric Level | Spells\n1st | Divine Favor, Shield of Faith\n3rd | Magic Weapon, Spiritual Weapon\n5th | Crusader's Mantle, Spirit Guardians\n7th | Freedom of Movement, Stoneskin\n9th | Flame Strike, Hold Monster"
				},
				{
					"name": "Bonus Proficiency",
					"level": 1,
					"description": "At 1st level, you gain proficiency with martial weapons and heavy armor."
				},
				{
					"name": "War Priest",
					"level": 1,
					"description": "From 1st level, your god delivers bolts of inspiration to you while you are engaged in battle. When you use the Attack action, you can make one weapon attack as a bonus action.\nYou can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Channel Divinity: Guided Strike",
					"level": 2,
					"description": "Starting at 2nd level, you can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses."
				},
				{
					"name": "Channel Divinity: War God's Blessing",
					"level": 6,
					"description": "At 6th level, when a creature within 30 feet of you makes an attack roll, you can use your reaction to grant that creature a +10 bonus to the roll, using your Channel Divinity. You make this choice after you see the roll, but before the DM says whether the attack hits or misses."
				},
				{
					"name": "Divine Strike",
					"level": 8,
					"description": "At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 damage of the same type dealt by the weapon to the target. When you reach 14th level, the extra damage increases to 2d8."
				},
				{
					"name": "Avatar of Battle",
					"level": 17,
					"description": "At 17th level, you gain resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks."
				}
			]
		}
	]
};

export default cleric;
