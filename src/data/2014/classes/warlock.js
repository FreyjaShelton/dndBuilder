const warlock = {
	"name": "Warlock",
	"hitDie": 8,
	"startingGold": "4d4 x 10",
	"subclassName": "Otherworldly Patron",
	"suggestedAbilities": "Charisma, Consitution",
	"primaryAbility": [
		"Charisma"
	],
	"spellcastingAbility": "Charisma",
	"subclassLevel": 1,
	"subclassFeatureLevels": [
		6,
		10,
		14
	],
	"armorProficiencies": "Light armor",
	"weaponProficiencies": "Simple weapons",
	"toolProficiencies": "None",
	"savingThrows": [
		"Wisdom",
		"Charisma"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"Arcana",
			"Deception",
			"History",
			"Intimidation",
			"Investigation",
			"Nature",
			"Religion"
		],
		"raw": "Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion"
	},
	"startingEquipment": [
		"(a) a light crossbow and 20 bolts or (b) any simple weapon",
		"(a) a component pouch or (b) an arcane focus",
		"(a) a scholar's pack or (b) a dungeoneer's pack",
		"Leather Armor, any simple weapon, and two daggers"
	],
	"table": {
		"caption": "The Warlock",
		"columns": [
			"Level",
			"Proficiency Bonus",
			"Features",
			"Cantrips Known",
			"Spells Known",
			"Spell Slots",
			"Slot Level",
			"Invocations Known"
		],
		"rows": [
			[
				"1st",
				"+2",
				"Otherworldly Patron, Pact Magic",
				"2",
				"2",
				"1",
				"1st",
				"-"
			],
			[
				"2nd",
				"+2",
				"Eldritch Invocations",
				"2",
				"3",
				"2",
				"1st",
				"2"
			],
			[
				"3rd",
				"+2",
				"Pact Boon",
				"2",
				"4",
				"2",
				"2nd",
				"2"
			],
			[
				"4th",
				"+2",
				"Ability Score Improvement, Eldritch Versatility (Optional)",
				"3",
				"5",
				"2",
				"2nd",
				"2"
			],
			[
				"5th",
				"+3",
				"",
				"3",
				"6",
				"2",
				"3rd",
				"3"
			],
			[
				"6th",
				"+3",
				"Otherworldly Patron feature",
				"3",
				"7",
				"2",
				"3rd",
				"3"
			],
			[
				"7th",
				"+3",
				"",
				"3",
				"8",
				"2",
				"4th",
				"4"
			],
			[
				"8th",
				"+3",
				"Ability Score Improvement, Eldritch Versatility (Optional)",
				"3",
				"9",
				"2",
				"4th",
				"4"
			],
			[
				"9th",
				"+4",
				"",
				"3",
				"10",
				"2",
				"5th",
				"5"
			],
			[
				"10th",
				"+4",
				"Otherworldly Patron feature",
				"4",
				"10",
				"2",
				"5th",
				"5"
			],
			[
				"11th",
				"+4",
				"Mystic Arcanum (6th level)",
				"4",
				"11",
				"3",
				"5th",
				"5"
			],
			[
				"12th",
				"+4",
				"Ability Score Improvement, Eldritch Versatility (Optional)",
				"4",
				"11",
				"3",
				"5th",
				"6"
			],
			[
				"13th",
				"+5",
				"Mystic Arcanum (7th level)",
				"4",
				"12",
				"3",
				"5th",
				"6"
			],
			[
				"14th",
				"+5",
				"Otherworldly Patron feature",
				"4",
				"12",
				"3",
				"5th",
				"6"
			],
			[
				"15th",
				"+5",
				"Mystic Arcanum (8th level)",
				"4",
				"13",
				"3",
				"5th",
				"7"
			],
			[
				"16th",
				"+5",
				"Ability Score Improvement, Eldritch Versatility (Optional)",
				"4",
				"13",
				"3",
				"5th",
				"7"
			],
			[
				"17th",
				"+6",
				"Mystic Arcanum (9th level)",
				"4",
				"14",
				"4",
				"5th",
				"7"
			],
			[
				"18th",
				"+6",
				"",
				"4",
				"14",
				"4",
				"5th",
				"8"
			],
			[
				"19th",
				"+6",
				"Ability Score Improvement, Eldritch Versatility (Optional)",
				"4",
				"15",
				"4",
				"5th",
				"8"
			],
			[
				"20th",
				"+6",
				"Eldritch Master",
				"4",
				"15",
				"4",
				"5th",
				"8"
			]
		]
	},
	"features": [
		{
			"name": "Otherworldly Patron",
			"levels": [
				1
			],
			"description": "At 1st level, you have struck a bargain with an otherworldly being of your choice. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.\nPatron | Source\nArchfey | Player's Handbook\nCelestial | Xanathar's Guide to Everything\nFathomless | Tasha's Cauldron of Everything\nFiend | Player's Handbook\nGenie | Tasha's Cauldron of Everything\nGreat Old One | Player's Handbook\nHexblade | Xanathar's Guide to Everything\nUndead | Van Richten's Guide to Ravenloft\nUndying | Sword Coast Adventurer's Guide\nUnearthed Arcana\nMage of Lorehold | Unearthed Arcana 79 - Mages of Strixhaven\nMage of Silverquill | Unearthed Arcana 79 - Mages of Strixhaven\nMage of Witherbloom | Unearthed Arcana 79 - Mages of Strixhaven\nArchived Unearthed Arcana\nCelestial | Unearthed Arcana 40 - Revised Class Options\nGenie | Unearthed Arcana 72 - Subclasses Revisited\nGhost in the Machine | Unearthed Arcana 7 - Modern Magic\nHexblade | Unearthed Arcana 29 - Warlock and Wizard\nLurker in the Deep | Unearthed Arcana 61 - Sorcerer and Warlock\nNoble Genie | Unearthed Arcana 67 - Subclasses, Part 1\nRaven Queen | Unearthed Arcana 29 - Warlock and Wizard\nSeeker | Unearthed Arcana 16 - The Faithful\nUndead | Unearthed Arcana 74 - Subclasses, Part 4\nUndying Light | Unearthed Arcana 10 - Light, Dark, Underdark!"
		},
		{
			"name": "Pact Magic",
			"levels": [
				1
			],
			"description": "Your arcane research and the magic bestowed on you by your patron have given you facility with spells.\nCANTRIPS\nYou know two cantrips of your choice from the warlock spell list. You learn additional warlock cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Warlock table.\nSPELL SLOTS\nThe Warlock table shows how many spell slots you have to cast your warlock spells of 1st through 5th level. The table also shows what the level of those slots is; all of your spell slots are the same level. To cast one of your warlock spells of 1st level or higher, you must expend a spell slot. You regain all expended spell slots when you finish a short or long rest.\nFor example, when you are 5th level, you have two 3rd-level spell slots. To cast the 1st-level spell witch bolt, you must spend one of those slots, and you cast it as a 3rd-level spell.\nSPELLS KNOWN OF 1ST LEVEL AND HIGHER\nAt 1st level, you know two 1st-level spells of your choice from the warlock spell list.\nThe Spells Known column of the Warlock table shows when you learn more warlock spells of your choice of 1st level or higher. A spell you choose must be of a level no higher than what's shown in the table's Slot Level column for your level. When you reach 6th level, for example, you learn a new warlock spell, which can be 1st, 2nd, or 3rd level.\nAdditionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots.\nSPELLCASTING ABILITY\nCharisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a warlock spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Charisma modifier\nSpell attack modifier = your proficiency bonus + your Charisma modifier\nSPELLCASTING FOCUS\nYou can use an arcane focus as a spellcasting focus for your warlock spells."
		},
		{
			"name": "Eldritch Invocations",
			"levels": [
				2
			],
			"description": "In your study of occult lore, you have unearthed Eldritch Invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability.\nAt 2nd level, you gain two eldritch invocations of your choice. When you gain certain warlock levels, you gain additional invocations of your choice, as shown in the Invocations Known column of the Warlock table. A level prerequisite refers to your level in this class.\nAdditionally, when you gain a level in this class, you can choose one of the invocations you know and replace it with another invocation that you could learn at that level."
		},
		{
			"name": "Pact Boon",
			"levels": [
				3
			],
			"description": "At 3rd level, your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features of your choice.\n• Pact of the Blade\n• You can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it. You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.\n• Your pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die.\n• You can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest.\n• You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can't affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks.\n• Pact of the Chain\n• You learn the find familiar spell and can cast it as a ritual. The spell doesn't count against your number of spells known.\n• When you cast the spell, you can choose one of the normal forms for your familiar or one of the following special forms: imp, pseudodragon, quasit, or sprite.\n• Additionally, when you take the Attack action, you can forgo one of your own attacks to allow your familiar to make one attack with its reaction.\n• Pact of the Tome\n• Your patron gives you a grimoire called a Book of Shadows. When you gain this feature, choose three cantrips from any class's spell list (the three needn't be from the same list). While the book is on your person, you can cast those cantrips at will. They don't count against your number of cantrips known. If they don't appear on the warlock spell list, they are nonetheless warlock spells for you.\n• If you lose your Book of Shadows, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and it destroys the previous book. The book turns to ash when you die.\n• Pact of the Talisman\n• Your patron gives you an amulet, a talisman that can aid the wearer when the need is great. When the wearer fails an ability check, they can add a d4 to the roll, potentially turning the roll into a success. This benefit can be used a number of times equal to your proficiency bonus, and all expended uses are restored when you finish a long rest.\n• If you lose the talisman, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and it destroys the previous amulet. The talisman turns to ash when you die.\n• Pact of the Star Chain (UA)\n• Prerequisite: Seeker Patron\n• The Seeker grants you a chain forged from starlight, decorated with seven gleaming motes of brightness. While the chain is on your person, you know the augury spell and can cast it as a ritual. The spell doesn't count against your number of spells known.\n• Additionally, you can invoke the Seeker's power to gain advantage on an Intelligence check while you carry this item. Once you use this ability, you cannot use it again until you complete a short or long rest.\n• If you lose your Star Chain, you can perform a 1-hour ceremony to receive a replacement from the Seeker. The ceremony can be performed during a short or long rest, and it destroys the previous chain. The chain disappears in a flash of light when you die.\n• The exact form of this item might be different depending on your patron. The Star Chain is inspired by the Greyhawk deity Celestian."
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
			"name": "Eldritch Versatility",
			"levels": [
				4,
				8,
				12,
				16,
				19
			],
			"optional": true,
			"description": "Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can do one of the following, representing a change of focus in your occult studies:\n• Replace one cantrip you learned from this class's Pact Magic feature with another cantrip from the warlock spell list.\n• Replace the option you chose for the Pact Boon feature with one of that feature's other options.\n• If you're 12th level or higher, replace one spell from your Mystic Arcanum feature with another warlock spell of the same level.\nIf this change makes you ineligible for any of your Eldritch Invocations, you must also replace them now, choosing invocations for which you qualify."
		},
		{
			"name": "Mystic Arcanum",
			"levels": [
				11,
				13,
				15,
				17
			],
			"description": "At 11th level, your patron bestows upon you a magical secret called an arcanum. Choose one 6th-level spell from the warlock spell list as this arcanum.\nYou can cast your arcanum spell once without expending a spell slot. You must finish a long rest before you can do so again.\nAt higher levels, you gain more warlock spells of your choice that can be cast in this way: one 7th-level spell at 13th level, one 8th-level spell at 15th level, and one 9th-level spell at 17th level. You regain all uses of your Mystic Arcanum when you finish a long rest."
		},
		{
			"name": "Eldritch Master",
			"levels": [
				20
			],
			"description": "At 20th level, you can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots. You can spend 1 minute entreating your patron for aid to regain all your expended spell slots from your Pact Magic feature. Once you regain spell slots with this feature, you must finish a long rest before you can do so again."
		}
	],
	"subclasses": [
		{
			"name": "Archfey",
			"slug": "archfey",
			"source": "Player's Handbook",
			"summary": "Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born. This being's motivations are often inscrutable, and sometimes whimsical, and might involve a striving for greater magical power or the settling of age-old grudges. Beings of this sort include the Prince of Frost; the Queen of Air and Darkness, ruler of the Gloaming Court; Titania of the Summer Court; her consort Oberon, the Green Lord; Hyrsam, the Prince of Fools; and ancient hags.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Archfey lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nArchfey Expanded Spells\nSpell Level | Spells\n1st | Faerie Fire, Sleep\n2nd | Calm Emotions, Phantasmal Force\n3rd | Blink, Plant Growth\n4th | Dominate Beast, Greater Invisibility\n5th | Dominate Person, Seeming"
				},
				{
					"name": "Fey Presence",
					"level": 1,
					"description": "Starting at 1st level, your patron bestows upon you the ability to project the beguiling and fearsome presence of the fey. As an action, you can cause each creature in a 10-foot cube originating from you to make a Wisdom saving throw against your warlock spell save DC. The creatures that fail their saving throws are all charmed or frightened by you (your choice) until the end of your next turn.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Misty Escape",
					"level": 6,
					"description": "Starting at 6th level, you can vanish in a puff of mist in response to harm. When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet to an unoccupied space you can see. You remain invisible until the start of your next turn or until you attack or cast a spell.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Beguiling Defenses",
					"level": 10,
					"description": "Beginning at 10th level, your patron teaches you how to turn the mind-affecting magic of your enemies against them. You are immune to being charmed, and when another creature attempts to charm you, you can use your reaction to attempt to turn the charm back on that creature. The creature must succeed on a Wisdom saving throw against your warlock spell save DC or be charmed by you for 1 minute or until the creature takes any damage."
				},
				{
					"name": "Dark Delirium",
					"level": 14,
					"description": "Starting at 14th level, you can plunge a creature into an illusory realm. As an action, choose a creature that you can see within 60 feet of you. It must make a Wisdom saving throw against your warlock spell save DC. On a failed save, it is charmed or frightened by you (your choice) for 1 minute or until your concentration is broken (as if you are concentrating on a spell). This effect ends early if the creature takes any damage.\nUntil this illusion ends, the creature thinks it is lost in a misty realm, the appearance of which you choose. The creature can see and hear only itself, you, and the illusion.\nYou must finish a short or long rest before you can use this feature again."
				}
			]
		},
		{
			"name": "Celestial",
			"slug": "celestial",
			"source": "Xanathar's Guide to Everything",
			"summary": "You have bound yourself to an ancient empyrean, solar, ki-rin, unicorn, or other entity that resides in the planes of everlasting bliss. Your pact with that being allows you to experience the barest touch of the holy light that illuminates the multiverse.\nYou might find yourself driven to annihilate the undead, to defeat fiends, and to protect the innocent. At times, your heart might also be filled with a longing for the celestial realm of your patron, a desire to wander that paradise for the rest of your days. But you know that your mission is among mortals for now and that your pact binds you to bring light to the dark places of the world.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Celestial lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nCelestial Expanded Spells\nSpell Level | Spells\n1st | Cure Wounds, Guiding Bolt\n2nd | Flaming Sphere, Lesser Restoration\n3rd | Daylight, Revivify\n4th | Guardian of Faith, Wall of Fire\n5th | Flame Strike, Greater Restoration"
				},
				{
					"name": "Bonus Cantrips",
					"level": 1,
					"description": "At 1st level, you learn the Light and Sacred Flame cantrips. They count as warlock cantrips for you, but they don't count against your number of cantrips known."
				},
				{
					"name": "Healing Light",
					"level": 1,
					"description": "At 1st level, you gain the ability to channel celestial energy to heal wounds. You have a pool of d6s that you spend to fuel this healing. The number of dice in the pool equals 1 + your warlock level.\nAs a bonus action, you can heal one creature you can see within 60 feet of you, spending dice from the pool. The maximum number of dice you can spend at once equals your Charisma modifier (minimum of one die). Roll the dice you spend, add them together, and restore a number of hit points equal to the total.\nYour pool regains all expended dice when you finish a long rest."
				},
				{
					"name": "Radiant Soul",
					"level": 6,
					"description": "Starting at 6th level, your link to the Celestial allows you to serve as a conduit for radiant energy. You have resistance to radiant damage, and when you cast a spell that deals radiant or fire damage, you add your Charisma modifier to one radiant or fire damage roll of that spell against one of its targets."
				},
				{
					"name": "Celestial Resistance",
					"level": 10,
					"description": "Starting at 10th level, you gain temporary hit points whenever you finish a short or long rest. These temporary hit points equal your warlock level + your Charisma modifier. Additionally, choose up to five creatures you can see at the end of the rest. Those creatures each gain temporary hit points equal to half your warlock level + your Charisma modifier."
				},
				{
					"name": "Searing Vengeance",
					"level": 14,
					"description": "Starting at 14th level, the radiant energy you channel allows you to resist death. When you have to make a death saving throw at the start of your turn, you can instead spring back to your feet with a burst of radiant energy. You regain hit points equal to half your hit point maximum, and then you stand up if you so choose. Each creature of your choice that is within 30 feet of you takes radiant damage equal to 2d8 + your Charisma modifier, and is blinded until the end of the current turn.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Fathomless",
			"slug": "fathomless",
			"source": "Tasha's Cauldron of Everything",
			"summary": "An entity of the ocean, the Elemental Plane of Water, or another otherworldly sea now allows you to draw on its thalassic power. Is it merely using you to learn about terrestrial realms, or does it want you to open cosmic floodgates and drown the world?\nPerhaps you were born into a generational cult that venerates the Fathomless and its spawn. Or you might have been shipwrecked and on the brink of drowning when your patron's grasp offered you a chance at life. Whatever the reason for your pact, the sea and its unknown depths call to you.\nEntities of the deep that might empower a warlock include krakens, ancient water elementals, godlike hallucinations dreamed into being by kuo-toa, merfolk demigods, and sea hag covens.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Fathomless lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nFathomless Expanded Spells\nSpell Level | Spells\n1st | Create or Destroy Water, Thunderwave\n2nd | Gust of Wind, Silence\n3rd | Lightning Bolt, Sleet Storm\n4th | Control Water, Summon Elemental (Water only)\n5th | Bigby's Hand (appears as a tentacle), Cone of Cold"
				},
				{
					"name": "Tentacle of the Deep",
					"level": 1,
					"description": "At 1st level, you can magically summon a spectral tentacle that strikes at your foes. As a bonus action, you create a 10-foot-long tentacle at a point you can see within 60 feet of you. The tentacle lasts for 1 minute or until you use this feature to create another tentacle.\nWhen you create the tentacle, you can make a melee spell attack against one creature within 10 feet of it. On a hit, the target takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn. When you reach 10th level in this class, the damage increases to 2d8.\nAs a bonus action on your turn, you can move the tentacle up to 30 feet and repeat the attack.\nYou can summon the tentacle a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Gift of the Sea",
					"level": 1,
					"description": "Also at 1st level, you gain a swimming speed of 40 feet, and you can breathe underwater."
				},
				{
					"name": "Oceanic Soul",
					"level": 6,
					"description": "At 6th level, you are now even more at home in the depths. You gain resistance to cold damage. In addition, when you are fully submerged, any creature that is also fully submerged can understand your speech, and you can understand theirs."
				},
				{
					"name": "Guardian Coil",
					"level": 6,
					"description": "At 6th level, your Tentacle of the Deeps can defend you and others, interposing itself between them and harm. When you or a creature you can see takes damage while within 10 feet of the tentacle, you can use your reaction to choose one of those creatures and reduce the damage to that creature by 1d8. When you reach 10th level in this class, the damage reduced by the tentacle increases to 2d8."
				},
				{
					"name": "Grasping Tentacles",
					"level": 10,
					"description": "Starting at 10th level, you learn the spell Evard's Black Tentacles. It counts as a warlock spell for you, but it doesn't count against the number of spells you know. You can also cast it once without using a spell slot, and you regain the ability to do so when you finish a long rest.\nWhenever you cast this spell, your patron's magic bolsters you, granting you a number of temporary hit points equal to your warlock level. Moreover, damage can't break your concentration on this spell."
				},
				{
					"name": "Fathomless Plunge",
					"level": 14,
					"description": "When you reach 14th level, you can magically open temporary conduits to watery destinations. As an action, you can teleport yourself and up to five other willing creatures that you can see within 30 feet of you. Amid a whirl of tentacles, you all vanish and then reappear up to 1 mile away in a body of water you've seen (pond size or larger) or within 30 feet of it, each of you appearing in an unoccupied space within 30 feet of the others.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				}
			]
		},
		{
			"name": "Fiend",
			"slug": "fiend",
			"source": "Player's Handbook",
			"summary": "You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you. Fiends powerful enough to forge a pact include demon lords such as Demogorgon, Orcus, Fraz'Urb-luu, and Baphomet; archdevils such as Asmodeus, Dispater, Mephistopheles, and Belial; pit fiends and balors that are especially mighty; and ultroloths and other lords of the yugoloths.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Fiend lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nFiend Expanded Spells\nSpell Level | Spells\n1st | Burning Hands, Command\n2nd | Blindness/Deafness, Scorching Ray\n3rd | Fireball, Stinking Cloud\n4th | Fire Shield, Wall of Fire\n5th | Flame Strike, Hallow"
				},
				{
					"name": "Dark One's Blessing",
					"level": 1,
					"description": "Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1)."
				},
				{
					"name": "Dark One's Own Luck",
					"level": 6,
					"description": "Starting at 6th level, you can call on your patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll. You can do so after seeing the initial roll but before any of the roll's effects occur.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Fiendish Resilience",
					"level": 10,
					"description": "Starting at 10th level, you can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one with this feature. Damage from magical weapons or silver weapons ignores this resistance."
				},
				{
					"name": "Hurl Through Hell",
					"level": 14,
					"description": "Starting at 14th level, when you hit a creature with an attack, you can use this feature to instantly transport the target through the lower planes. The creature disappears and hurtles through a nightmare landscape.\nAt the end of your next turn, the target returns to the space it previously occupied, or the nearest unoccupied space. If the target is not a fiend, it takes 10d10 psychic damage as it reels from its horrific experience.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Genie",
			"slug": "the-genie",
			"source": "Tasha's Cauldron of Everything",
			"summary": "Such entities rule vast fiefs on the Elemental Planes and have great influence over lesser genies and elemental creatures. Noble genies are varied in their motivations, but most are arrogant and wield power that rivals that of lesser deities. They delight in turning the table on mortals, who often bind genies into servitude, and readily enter into pacts that expand their reach.\nYou choose your patron's kind or determine it randomly, using the Genie Kind table.",
			"features": [
				{
					"name": "Genie Kind",
					"level": 1,
					"description": "d4 | Kind | Element\n1 | Dao | Earth\n2 | Djinni | Air\n3 | Efreeti | Fire\n4 | Marid | Water"
				},
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "At 1st level, the Genie lets you choose from an expanded list of spells when you learn a warlock spell. The Genie Expanded Spells table shows the genie spells that are added to the warlock spell list for you, along with the spells associated in the table with your patron's kind: dao, djinni, efreeti, or marid.\nGenie Expanded Spells\nSpell Level | Genie Spells | Dao Spells | Djinni Spells | Efreeti Spells | Marid Spells\n1st | Detect Evil and Good | Sanctuary | Thunderwave | Burning Hands | Fog Cloud\n2nd | Phantasmal Force | Spike Growth | Gust of Wind | Scorching Ray | Blur\n3rd | Create Food and Water | Meld into Stone | Wind Wall | Fireball | Sleet Storm\n4th | Phantasmal Killer | Stone Shape | Greater Invisibility | Fire Shield | Control Water\n5th | Creation | Wall of Stone | Seeming | Flame Strike | Cone of Cold\n9th | Wish | — | — | — | —"
				},
				{
					"name": "Genie's Vessel",
					"level": 1,
					"description": "Also at 1st level, your patron gifts you a magical vessel that grants you a measure of the genie's power. The vessel is a Tiny object, and you can use it as a spellcasting focus for your warlock spells. You decide what the object is, or you can determine what it is randomly by rolling on the Genie's Vessel table.\nGenie's Vessel\nd6 | Vessel\n1 | Oil lamp\n2 | Urn\n3 | Ring with a compartment\n4 | Stoppered bottle\n5 | Hollow statuette\n6 | Ornate lantern\nWhile you are touching the vessel, you can use it in the following ways:\n• Bottled Respite: As an action, you can magically vanish and enter your vessel, which remains in the space you left. The interior of the vessel is an extradimensional space in the shape of a 20-foot-radius cylinder, 20 feet high, and resembles your vessel. The interior is appointed with cushions and low tables and is a comfortable temperature. While inside, you can hear the area around your vessel as if you were in its space. You can remain inside the vessel up to a number of hours equal to twice your proficiency bonus. You exit the vessel early if you use a bonus action to leave, if you die, or if the vessel is destroyed. When you exit the vessel, you appear in the unoccupied space closest to it. Any objects left in the vessel remain there until carried out, and if the vessel is destroyed, every object stored there harmlessly appears in the unoccupied spaces closest to the vessel's former space. Once you enter the vessel, you can't enter again until you finish a long rest.\n• Genie's Wrath: Once during each of your turns when you hit with an attack roll, you can deal extra damage to the target equal to your proficiency bonus. The type of this damage is determined by your patron: bludgeoning (dao), thunder (djinni), fire (efreeti), or cold (marid).\nThe vessel's AC equals your spell save DC. Its hit points equal your warlock level plus your proficiency bonus, and it is immune to poison and psychic damage.\nIf the vessel is destroyed or you lose it, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and the previous vessel is destroyed if it still exists. The vessel vanishes in a flare of elemental power when you die."
				},
				{
					"name": "Elemental Gift",
					"level": 6,
					"description": "At 6th level, you begin to take on characteristics of your patron's kind. You now have resistance to a damage type determined by your patron's kind: bludgeoning (dao), thunder (djinni), fire (efreeti), or cold (marid).\nIn addition, as a bonus action, you can give yourself a flying speed of 30 feet that lasts for 10 minutes, during which you can hover. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Sanctuary Vessel",
					"level": 10,
					"description": "At 10th level, when you enter your Genie's Vessel via the Bottled Respite feature, you can now choose up to five willing creatures that you can see within 30 feet of you, and the chosen creatures are drawn into the vessel with you.\nAs a bonus action, you can eject any number of creatures from the vessel, and everyone is ejected if you leave or die or if the vessel is destroyed.\nIn addition, anyone (including you) who remains within the vessel for at least 10 minutes gains the benefit of finishing a short rest, and anyone can add your proficiency bonus to the number of hit points they regain if they spend any Hit Dice as part of a short rest there."
				},
				{
					"name": "Limited Wish",
					"level": 14,
					"description": "At 14th level, you entreat your patron to grant you a small wish. As an action, you can speak your desire to your Genie's Vessel, requesting the effect of one spell that is 6th level or lower and has a casting time of 1 action. The spell can be from any class's spell list, and you don't need to meet the requirements in that spell, including costly components: the spell simply takes effect as part of this action.\nOnce you use this feature, you can't use it again until you finish 1d4 long rests."
				}
			]
		},
		{
			"name": "Great Old One",
			"slug": "great-old-one",
			"source": "Player's Handbook",
			"summary": "Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. It might come from the Far Realm, the space beyond reality, or it could be one of the elder gods known only in legends. Its motives are incomprehensible to mortals, and its knowledge so immense and ancient that even the greatest libraries pale in comparison to the vast secrets it holds. The Great Old One might be unaware of your existence or entirely indifferent to you, but the secrets you have learned allow you to draw your magic from it.\nEntities of this type include Ghaunadar, called That Which Lurks; Tharizdun, the Chained God; Dendar, the Night Serpent; Zargon, the Returner; Great Cthulhu; and other unfathomable beings.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Great Old One lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nGreat Old One Expanded Spells\nSpell Level | Spells\n1st | Dissonant Whispers, Tasha's Hideous Laughter\n2nd | Detect Thoughts, Phantasmal Force\n3rd | Clairvoyance, Sending\n4th | Dominate Beast, Evard's Black Tentacles\n5th | Dominate Person, Telekinesis"
				},
				{
					"name": "Awakened Mind",
					"level": 1,
					"description": "Starting at 1st level, your alien knowledge gives you the ability to touch the minds of other creatures. You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language."
				},
				{
					"name": "Entropic Ward",
					"level": 6,
					"description": "At 6th level, you learn to magically ward yourself against attack and to turn an enemy's failed strike into good luck for yourself. When a creature makes an attack roll against you, you can use your reaction to impose disadvantage on that roll. If the attack misses you, your next attack roll against the creature has advantage if you make it before the end of your next turn.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				},
				{
					"name": "Thought Shield",
					"level": 10,
					"description": "Starting at 10th level, your thoughts can't be read by telepathy or other means unless you allow it. You also have resistance to psychic damage, and whenever a creature deals psychic damage to you, that creature takes the same amount of damage that you do."
				},
				{
					"name": "Create Thrall",
					"level": 14,
					"description": "At 14th level, you gain the ability to infect a humanoid's mind with the alien magic of your patron. You can use your action to touch an incapacitated humanoid. That creature is then charmed by you until a Remove Curse spell is cast on it, the charmed condition is removed from it, or you use this feature again.\nYou can communicate telepathically with the charmed creature as long as the two of you are on the same plane of existence."
				}
			]
		},
		{
			"name": "Hexblade",
			"slug": "hexblade",
			"source": "Xanathar's Guide to Everything",
			"summary": "You have made your pact with a mysterious entity from the Shadowfell – a force that manifests in sentient magic weapons carved from the stuff of shadow. The mighty sword Blackrazor is the most notable of these weapons, which have been spread across the multiverse over the ages. The shadowy force behind these weapons can offer power to warlocks who form pacts with it. Many hexblade warlocks create weapons that emulate those formed in the Shadowfell. Others forgo such arms, content to weave the dark magic of that plane into their spellcasting.\nBecause the Raven Queen is known to have forged the first of these weapons, many sages speculate that she and the force are one and that the weapons, along with hexblade warlocks, are tools she uses to manipulate events on the Material Plane to her inscrutable ends.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Hexblade lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nHexblade Expanded Spells\nSpell Level | Spells\n1st | Shield, Wrathful Smite\n2nd | Blur, Branding Smite\n3rd | Blink, Elemental Weapon\n4th | Phantasmal Killer, Staggering Smite\n5th | Banishing Smite, Cone of Cold"
				},
				{
					"name": "Hexblade's Curse",
					"level": 1,
					"description": "Starting at 1st level, you gain the ability to place a baleful curse on someone. As a bonus action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute. The curse ends early if the target dies, you die, or you are incapacitated. Until the curse ends, you gain the following benefits:\n• You gain a bonus to damage rolls against the cursed target. The bonus equals your proficiency bonus.\n• Any attack roll you make against the cursed target is a critical hit on a roll of 19 or 20 on the d20.\n• If the cursed target dies, you regain hit points equal to your warlock level + your Charisma modifier (minimum of 1 hit point).\nYou can't use this feature again until you finish a short or long rest."
				},
				{
					"name": "Hex Warrior",
					"level": 1,
					"description": "At 1st level, you acquire the training necessary to effectively arm yourself for battle. You gain proficiency with medium armor, shields, and martial weapons.\nThe influence of your patron also allows you to mystically channel your will through a particular weapon. Whenever you finish a long rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls. This benefit lasts until you finish a long rest. If you later gain the Pact of the Blade feature, this benefit extends to every pact weapon you conjure with that feature, no matter the weapon's type."
				},
				{
					"name": "Accursed Specter",
					"level": 6,
					"description": "Starting at 6th level, you can curse the soul of a person you slay, temporarily binding it in your service. When you slay a humanoid, you can cause its spirit to rise from its corpse as a specter, the statistics of which are in the Monster Manual. When the specter appears, it gains temporary hit points equal to half your warlock level. Roll initiative for the specter, which has its own turns. It obeys your verbal commands, and it gains a special bonus to its attack rolls equal to your Charisma modifier (minimum of +0).\nThe specter remains in your service until the end of your next long rest, at which point it vanishes to the afterlife.\nOnce you bind a specter with this feature, you can't use the feature again until you finish a long rest."
				},
				{
					"name": "Armor of Hexes",
					"level": 10,
					"description": "At 10th level, your hex grows more powerful. If the target cursed by your Hexblade's Curse hits you with an attack roll, you can use your reaction to roll a d6. On a 4 or higher, the attack instead misses you, regardless of its roll."
				},
				{
					"name": "Master of Hexes",
					"level": 14,
					"description": "Starting at 14th level, you can spread your Hexblade's Curse from a slain creature to another creature. When the creature cursed by your Hexblade's Curse dies, you can apply the curse to a different creature you can see within 30 feet of you, provided you aren't incapacitated. When you apply the curse in this way, you don't regain hit points from the death of the previously cursed creature."
				}
			]
		},
		{
			"name": "Undead",
			"slug": "undead",
			"source": "Van Richten's Guide to Ravenloft",
			"summary": "You've made a pact with a deathless being, a creature that defies the cycle and life and death, forsaking its mortal shell so it might eternally pursue its unfathomable ambitions. For such beings, time and morality are fleeting things, the concerns of those for whom grains of sand still rush through life's hourglass. Having once been mortal themselves, these ancient undead know firsthand the paths of ambition and the routes past the doors of death. They eagerly share this profane knowledge, along with other secrets, with those who work their will among the living.\nBeings of this type include the demilich Acererak, the vampire tyrant Kas the Bloody-Handed, the githyanki lich-queen Vlaakith, the dracolich Dragotha, the undead pharaoh Ankhtepot, and the elusive Darklord, Azalin Rex.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "At 1st level, the Undead lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nUndead Expanded Spells\nSpell Level | Spells\n1st | Bane, False Life\n2nd | Blindness/Deafness, Phantasmal Force\n3rd | Phantom Steed, Speak with Dead\n4th | Death Ward, Greater Invisibility\n5th | Antilife Shell, Cloudkill"
				},
				{
					"name": "Form of Dread",
					"level": 1,
					"description": "At 1st level, you manifest an aspect of your patron's dreadful power. As a bonus action, you transform for 1 minute. You gain the following benefits while transformed:\n• You gain temporary hit points equal to 1d10 + your warlock level.\n• Once during each of your turns, when you hit a creature with an attack, you can force it to make a Wisdom saving throw, and if the saving throw fails, the target is frightened of you until the end of your next turn.\n• You are immune to the frightened condition.\nYou can transform a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\nThe appearance of your Form of Dread reflects some aspect of your patron. For example, your form could be a shroud of shadows forming the crown and robes of your lich patron, or your body might glow with glyphs from ancient funerary rites and be surrounded by desert winds, suggesting your mummy patron."
				},
				{
					"name": "Grave Touched",
					"level": 6,
					"description": "At 6th level, your patron's powers have a profound effect on your body and magic. You don't need to eat, drink, or breathe.\nIn addition, once during each of your turns, when you hit a creature with an attack and roll damage against the creature, you can replace the damage type with necrotic damage. While you are using your Form of Dread, you can roll one additional damage die when determining the necrotic damage the target takes."
				},
				{
					"name": "Necrotic Husk",
					"level": 10,
					"description": "At 10th level, Your connection to undeath and necrotic energy now saturates your body. You have resistance to necrotic damage. If you are transformed using your Form of Dread, you instead become immune to necrotic damage.\nIn addition, when you are reduced to 0 hit points, you can use your reaction to drop to 1 hit point instead and cause your body to erupt with deathly energy. Each creature of your choice that is within 30 feet of you takes necrotic damage equal to 2d10 + your warlock level. You then gain 1 level of exhaustion. Once you use this reaction, you can't do so again until you finish 1d4 long rests."
				},
				{
					"name": "Spirit Projection",
					"level": 14,
					"description": "At 14th level, your spirit can become untethered from your physical form. As an action, you can project your spirit from your body. The body you leave behind is unconscious and in a state of suspended animation.\nYour spirit resembles your mortal form in almost every way, replicating game statistics but not your possessions. Any damage or other effects that apply to your spirit or physical body affects the other. Your spirit can remain outside your body for up to 1 hour or until your concentration is broken (as if concentrating on a spell). When your projection ends, your spirit returns to your body or your body magically teleports to your spirit's space (your choice).\nWhile projecting your spirit, you gain the following benefits:\n• Your spirit and body gain resistance to bludgeoning, piercing, and slashing damage.\n• When you cast a spell of the conjuration or necromancy school, the spell doesn't require verbal or somatic components or material components that lack a gold cost.\n• You have a flying speed equal to your walking speed and can hover. You can move through creatures and objects as if they were difficult terrain, but you take 1d10 force damage if you end your turn inside a creature or an object.\n• While you are using your Form of Dread, once during each of your turns when you deal necrotic damage to a creature, you regain hit points equal to half the amount of necrotic damage dealt.\nOnce you use this feature, you can't do so again until you finish a long rest."
				}
			]
		},
		{
			"name": "Undying",
			"slug": "undying",
			"source": "Sword Coast Adventurer's Guide",
			"summary": "Death holds no sway over your patron, who has unlocked the secrets of everlasting life, although such a prize – like all power – comes at a price. Once mortal, the Undying has seen mortal lifetimes pass like the seasons, like the flicker of endless days and nights. It has the secrets of the ages to share, secrets of life and death. Beings of this sort include Vecna, Lord of the Hand and the Eye; the dread Iuz; the lich-queen Vol; the Undying Court of Aerenal; Vlaakith, lich-queen of the githyanki; and the deathless wizard Fistandantalus.\nIn the Realms, Undying patrons include Larloch the Shadow King, legendary master of Warlock's Crypt, and Gilgeam, the God-King of Unther.",
			"features": [
				{
					"name": "Expanded Spell List",
					"level": 1,
					"description": "The Undying lets you choose from an expanded list of spells when you learn a warlock spell. The following spells are added to the warlock spell list for you.\nUndying Expanded Spells\nSpell Level | Spells\n1st | False Life, Ray of Sickness\n2nd | Blindness/Deafness, Silence\n3rd | Feign Death, Speak with Dead\n4th | Aura of Life, Death Ward\n5th | Contagion, Legend Lore"
				},
				{
					"name": "Among the Dead",
					"level": 1,
					"description": "Starting at 1st level, you learn the Spare the Dying cantrip, which counts as a warlock cantrip for you. You also have advantage on saving throws against any disease.\nAdditionally, undead have difficulty harming you. If an undead targets you directly with an attack or a harmful spell, that creature must make a Wisdom saving throw against your spell save DC (an undead needn't make the save when it includes you in an area effect, such as the explosion of Fireball). On a failed save, the creature must choose a new target or forfeit targeting someone instead of you, potentially wasting the attack or spell. On a successful save, the creature is immune to this effect for 24 hours. An undead is also immune to this effect for 24 hours if you target it with an attack or a harmful spell."
				},
				{
					"name": "Defy Death",
					"level": 6,
					"description": "Starting at 6th level, you can give yourself vitality when you cheat death or when you help someone else cheat it. You can regain hit points equal to 1d8 + your Constitution modifier (minimum of 1 hit point) when you succeed on a death saving throw or when you stabilize a creature with Spare the Dying.\nOnce you use this feature, you can't use it again until you finish a long rest."
				},
				{
					"name": "Undying Nature",
					"level": 10,
					"description": "Beginning at 10th level, you can hold your breath indefinitely, and you don't require food, water, or sleep, although you still require rest to reduce exhaustion and still benefit from finishing short and long rests.\nIn addition, you age at a slower rate. For every 10 years that pass, your body ages only 1 year, and you are immune to being magically aged."
				},
				{
					"name": "Indestructible Life",
					"level": 14,
					"description": "When you reach 14th level, you partake of some of the true secrets of the Undying. On your turn, you can use a bonus action to regain hit points equal to 1d8 + your warlock level. Additionally, if you put a severed body part of yours back in place when you use this feature, the part reattaches.\nOnce you use this feature, you can't use it again until you finish a short or long rest."
				}
			]
		}
	]
};

export default warlock;
