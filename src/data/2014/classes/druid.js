const druid = {
	"name": "Druid",
	"hitDie": 8,
	"startingGold": "2d4 x 10",
	"subclassName": "Druid Circle",
	"suggestedAbilities": "Wisdom, Constitution",
	"primaryAbility": [
		"Wisdom"
	],
	"spellcastingAbility": "Wisdom",
	"subclassLevel": 2,
	"subclassFeatureLevels": [
		6,
		10,
		14
	],
	"armorProficiencies": "Light armor, medium armor, shields (druids will not wear armor or use shields made of metal)",
	"weaponProficiencies": "Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears",
	"toolProficiencies": "Herbalism kit",
	"savingThrows": [
		"Intelligence",
		"Wisdom"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"Arcana",
			"Animal Handling",
			"Insight",
			"Medicine",
			"Nature",
			"Perception",
			"Religion",
			"Survival"
		],
		"raw": "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival"
	},
	"startingEquipment": [
		"(a) a wooden shield or (b) any simple weapon",
		"(a) a scimitar or (b) any simple melee weapon",
		"Leather Armor, an explorer's pack, and a druidic focus"
	],
	"table": {
		"caption": "The Druid",
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
				"Druidic, Spellcasting",
				"2",
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
				"Wild Shape, Druid Circle, Wild Companion (Optional)",
				"2",
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
				"2",
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
				"Wild Shape improvement, Ability Score Improvement, Cantrip Versatility (Optional)",
				"3",
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
				"3",
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
				"Druid Circle feature",
				"3",
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
				"3",
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
				"Wild Shape improvement, Ability Score Improvement, Cantrip Versatility (Optional)",
				"3",
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
				"3",
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
				"Druid Circle feature",
				"4",
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
				"4",
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
				"4",
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
				"4",
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
				"Druid Circle feature",
				"4",
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
				"4",
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
				"4",
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
				"4",
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
				"Timeless Body, Beast Spells",
				"4",
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
				"4",
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
				"Archdruid",
				"4",
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
			"name": "Druidic",
			"levels": [
				1
			],
			"description": "You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message's presence with a successful DC 15 Wisdom (Perception) check but can't decipher it without magic."
		},
		{
			"name": "Spellcasting",
			"levels": [
				1
			],
			"description": "Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.\nCANTRIPS\nAt 1st level, you know two cantrips of your choice from the druid spell list. You learn additional druid cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Druid table.\nPREPARING AND CASTING SPELLS\nThe Druid table shows how many spell slots you have to cast your druid spells of 1st level and higher. To cast one of these druid spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nYou prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. When you do so, choose a number of druid spells equal to your Wisdom modifier + your Druid level (minimum of one spell). The spells must be of a level for which you have spell slots.\nFor example, if you are a 3rd-level druid, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\nYou can also change your list of prepared spells when you finish a long rest. Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.\nSPELLCASTING ABILITY\nWisdom is your spellcasting ability for your druid spells, since your magic draws upon your devotion and attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a druid spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Wisdom modifier\nSpell attack modifier = your proficiency bonus + your Wisdom modifier\nRITUAL CASTING\nYou can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared.\nSPELLCASTING FOCUS\nYou can use a druidic focus as a spellcasting focus for your druid spells."
		},
		{
			"name": "Wild Shape",
			"levels": [
				2
			],
			"description": "Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest.\nYour druid level determines the beasts you can transform into, as shown in the Beast Shapes table. At 2nd level, for example, you can transform into any beast that has a challenge rating of 1/4 or lower that doesn't have a flying or swimming speed.\nBeast Shapes\nLevel | Max. CR | Limitations | Example\n2nd | 1/4 | No flying or swimming speed | Wolf\n4th | 1/2 | No flying speed | Crocodile\n8th | 1 |  | Giant eagle\nYou can stay in a beast shape for a number of hours equal to half your druid level (rounded down). You then revert to your normal form unless you expend another use of this feature. You can revert to your normal form earlier by using a bonus action on your turn. You automatically revert if you fall unconscious, drop to 0 hit points, or die.\nWhile you are transformed, the following rules apply:\n• Your game statistics are replaced by the statistics of the beast, but you retain your alignment, personality, and Intelligence, Wisdom, and Charisma scores. You also retain all of your skill and saving throw proficiencies, in addition to gaining those of the creature. If the creature has the same proficiency as you and the bonus in its stat block is higher than yours, use the creature's bonus instead of yours. If the creature has any legendary or lair actions, you can't use them.\n• When you transform, you assume the beast's hit points and Hit Dice. When you revert to your normal form, you return to the number of hit points you had before you transformed. However, if you revert as a result of dropping to 0 hit points, any excess damage carries over to your normal form, For example, if you take 10 damage in animal form and have only 1 hit point left, you revert and take 9 damage. As long as the excess damage doesn't reduce your normal form to 0 hit points, you aren't knocked unconscious.\n• You can't cast spells, and your ability to speak or take any action that requires hands is limited to the capabilities of your beast form. Transforming doesn't break your concentration on a spell you've already cast, however, or prevent you from taking actions that are part of a spell, such as Call Lightning, that you've already cast.\n• You retain the benefit of any features from your class, race, or other source and can use them if the new form is physically capable of doing so. However, you can't use any of your special senses, such as darkvision, unless your new form also has that sense.\n• You choose whether your equipment falls to the ground in your space, merges into your new form, or is worn by it. Worn equipment functions as normal, but the DM decides whether it is practical for the new form to wear a piece of equipment, based on the creature's shape and size. Your equipment doesn't change size or shape to match the new form, and any equipment that the new form can't wear must either fall to the ground or merge with it. Equipment that merges with the form has no effect until you leave the form."
		},
		{
			"name": "Druid Circle",
			"levels": [
				2
			],
			"description": "At 2nd level, you choose to identify with a circle of druids. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level.\nCircle | Source\nDreams | Xanathar's Guide to Everything\nLand | Player's Handbook\nMoon | Player's Handbook\nShepherd | Xanathar's Guide to Everything\nSpores | Guildmaster's Guide to Ravnica Tasha's Cauldron of Everything\nStars | Tasha's Cauldron of Everything\nWildfire | Tasha's Cauldron of Everything\nUnearthed Arcana\nPrimeval | Unearthed Arcana 83 - Giant Options\nArchived Unearthed Arcana\nMage of Prismari | Unearthed Arcana 79 - Mages of Strixhaven\nMage of Witherbloom | Unearthed Arcana 79 - Mages of Strixhaven\nStars | Unearthed Arcana 69 - Subclasses, Part 3\nTwilight | Unearthed Arcana 22 - Druid\nWildfire | Unearthed Arcana 63 - Cleric, Druid, Wizard"
		},
		{
			"name": "Wild Companion",
			"levels": [
				2
			],
			"optional": true,
			"description": "At 2nd level, you gain the ability to summon a spirit that assumes an animal form: as an action, you can expend a use of your Wild Shape feature to cast the Find Familiar spell, without material components.\nWhen you cast the spell in this way, the familiar is a fey instead of a beast, and the familiar disappears after a number of hours equal to half your druid level."
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
			"description": "Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace one cantrip you learned from this class's Spellcasting feature with another cantrip from the druid spell list."
		},
		{
			"name": "Timeless Body",
			"levels": [
				18
			],
			"description": "Starting at 18th level, the primal magic that you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year."
		},
		{
			"name": "Beast Spells",
			"levels": [
				18
			],
			"description": "Beginning at 18th level, you can cast many of your druid spells in any shape you assume using Wild Shape. You can perform the somatic and verbal components of a druid spell while in a beast shape, but you aren't able to provide material components."
		},
		{
			"name": "Archdruid",
			"levels": [
				20
			],
			"description": "At 20th level, you can use your Wild Shape an unlimited number of times.\nAdditionally, you can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren't consumed by a spell. You gain this benefit in both your normal shape and your beast shape from Wild Shape."
		}
	],
	"subclasses": [
		{
			"name": "Dreams",
			"slug": "dreams",
			"source": "Xanathar's Guide to Everything",
			"summary": "Druids who are members of the Circle of Dreams hail from regions that have strong ties to the Feywild and its dreamlike realms. The druids' guardianship of the natural world makes for a natural alliance between them and good-aligned fey. These druids seek to fill the world with dreamy wonder. Their magic mends wounds and brings joy to downcast hearts, and the realms they protect are gleaming, fruitful places, where dream and reality blur together and where the weary can find rest.",
			"features": [
				{
					"name": "Balm of the Summer Court",
					"level": 2,
					"description": "At 2nd level, you become imbued with the blessings of the Summer Court. You are a font of energy that offers respite from injuries. You have a pool of fey energy represented by a number of d6s equal to your druid level.\nAs a bonus action, you can choose an ally you can see within 120 feet of you and spend a number of those dice equal to half your druid level or less. Roll the spent dice and add them together. The target regains a number of hit points equal to the total. The target also gains 1 temporary hit point per die spent.\nYou regain the expended dice when you finish a long rest."
				},
				{
					"name": "Hearth of Moonlight and Shadow",
					"level": 6,
					"description": "At 6th level, home can be wherever you are. During a short or long rest, you can invoke the shadowy power of the Gloaming Court to help guard your respite. At the start of the rest, you touch a point in space, and an invisible, 30-foot-radius sphere of magic appears, centered on that point. Total cover blocks the sphere.\nWhile within the sphere, you and your allies gain a +5 bonus to Dexterity (Stealth) and Wisdom (Perception) checks, and any light from open flames in the sphere (a campfire, torches, or the like) isn't visible outside it.\nThe sphere vanishes at the end of the rest or when you leave the sphere."
				},
				{
					"name": "Hidden Paths",
					"level": 10,
					"description": "Starting at 10th level, you can use the hidden, magical pathways that some fey use to traverse space in a blink of an eye. As a bonus action on your turn, you can teleport up to 60 feet to an unoccupied space you can see. Alternatively, you can use your action to teleport one willing creature you touch up to 30 feet to an unoccupied space you can see.\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Walker in Dreams",
					"level": 14,
					"description": "At 14th level, the magic of the Feywild grants you the ability to travel mentally or physically through dreamlands.\nWhen you finish a short rest, you can cast one of the following spells, without expending a spell slot or requiring material components: Dream (with you as the messenger), Scrying, or Teleportation Circle.\nThis use of Teleportation Circle is special. Rather than opening a portal to a permanent teleportation circle, it opens a portal to the last location where you finished a long rest on your current plane of existence. If you haven't taken a long rest on your current plane, the spell fails but isn't wasted.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Land",
			"slug": "land",
			"source": "Player's Handbook",
			"summary": "The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle's wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle's mysterious rites.",
			"features": [
				{
					"name": "Bonus Cantrip",
					"level": 2,
					"description": "When you choose this circle at 2nd level, you learn one additional druid cantrip of your choice. This cantrip doesn't count against the number of druid cantrips you know."
				},
				{
					"name": "Natural Recovery",
					"level": 2,
					"description": "Starting at 2nd level, you can regain some of your magical energy by sitting in meditation and communing with nature. During a short rest, you choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher. You can't use this feature again until you finish a long rest.\nFor example, when you are a 4th-level druid, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level slot or two 1st-level slots."
				},
				{
					"name": "Circle Spells",
					"level": 3,
					"description": "Your mystical connection to the land infuses you with the ability to cast certain spells. At 3rd, 5th, 7th, and 9th level you gain access to circle spells connected to the land where you became a druid. Choose that land – arctic, coast, desert, forest, grassland, mountain, swamp, or Underdark – and consult the associated list of spells.\nOnce you gain access to a circle spell, you always have it prepared, and it doesn't count against the number of spells you can prepare each day. If you gain access to a spell that doesn't appear on the druid spell list, the spell is nonetheless a druid spell for you.\nArctic\nDruid Level | Circle Spells\n3rd | Hold Person, Spike Growth\n5th | Sleet Storm, Slow\n7th | Freedom of Movement, Ice Storm\n9th | Commune with Nature, Cone of Cold\nCoast\nDruid Level | Circle Spells\n3rd | Mirror Image, Misty Step\n5th | Water Breathing, Water Walk\n7th | Control Water, Freedom of Movement\n9th | Conjure Elemental, Scrying\nDesert\nDruid Level | Circle Spells\n3rd | Blur, Silence\n5th | Create Food and Water, Protection from Energy\n7th | Blight, Hallucinatory Terrain\n9th | Insect Plague, Wall of Stone\nForest\nDruid Level | Circle Spells\n3rd | Barkskin, Spider Climb\n5th | Call Lightning, Plant Growth\n7th | Divination, Freedom of Movement\n9th | Commune with Nature, Tree Stride\nGrassland\nDruid Level | Circle Spells\n3rd | Invisibility, Pass Without Trace\n5th | Daylight, Haste\n7th | Divination, Freedom of Movement\n9th | Dream, Insect Plague\nMountain\nDruid Level | Circle Spells\n3rd | Spider Climb, Spike Growth\n5th | Lightning Bolt, Meld into Stone\n7th | Stone Shape, Stoneskin\n9th | Passwall, Wall of Stone\nSwamp\nDruid Level | Circle Spells\n3rd | Darkness, Melf's Acid Arrow\n5th | Water Walk, Stinking Cloud\n7th | Freedom of Movement, Locate Creature\n9th | Insect Plague, Scrying\nUnderdark\nDruid Level | Circle Spells\n3rd | Spider Climb, Web\n5th | Gaseous Form, Stinking Cloud\n7th | Greater Invisibility, Stone Shape\n9th | Cloudkill, Insect Plague"
				},
				{
					"name": "Land's Stride",
					"level": 6,
					"description": "Starting at 6th level, moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.\nIn addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such as those created by the Entangle spell."
				},
				{
					"name": "Nature's Ward",
					"level": 10,
					"description": "When you reach 10th level, you can't be charmed or frightened by elementals or fey, and you are immune to poison and disease."
				},
				{
					"name": "Nature's Sanctuary",
					"level": 14,
					"description": "When you reach 14th level, creatures of the natural world sense your connection to nature and become hesitant to attack you. When a beast or plant creature attacks you, that creature must make a Wisdom saving throw against your druid spell save DC. On a failed save, the creature must choose a different target, or the attack automatically misses. On a successful save, the creature is immune to this effect for 24 hours.\nThe creature is aware of this effect before it makes its attack against you."
				}
			]
		},
		{
			"name": "Moon",
			"slug": "moon",
			"source": "Player's Handbook",
			"summary": "Their order gathers under the full moon to share news and trade warnings. They haunt the deepest parts of the wilderness, where they might go for weeks on end before crossing paths with another humanoid creature, let alone another druid.\nChangeable as the moon, a druid of this circle might prowl as a great cat one night, soar over the treetops as an eagle the next day, and crash through the undergrowth in bear form to drive off a trespassing monster. The wild is in the druid's blood.",
			"features": [
				{
					"name": "Combat Wild Shape",
					"level": 2,
					"description": "When you choose this circle at 2nd level, you gain the ability to use Wild Shape on your turn as a bonus action, rather than as an action.\nAdditionally, while you are transformed by Wild Shape, you can use a bonus action to expend one spell slot to regain 1d8 hit points per level of the spell slot expended."
				},
				{
					"name": "Circle Forms",
					"level": 2,
					"description": "The rites of your circle grant you the ability to transform into more dangerous animal forms. Starting at 2nd level, you can use your Wild Shape to transform into a beast with a challenge rating as high as 1. You ignore the Max. CR column of the Beast Shapes table, but must abide by the other limitations there.\nStarting at 6th level, you can transform into a beast with a challenge rating as high as your druid level divided by 3, rounded down."
				},
				{
					"name": "Primal Strike",
					"level": 6,
					"description": "Starting at 6th level, your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
				},
				{
					"name": "Elemental Wild Shape",
					"level": 10,
					"description": "At 10th level, you can expend two uses of Wild Shape at the same time to transform into an air elemental, an earth elemental, a fire elemental, or a water elemental."
				},
				{
					"name": "Thousand Forms",
					"level": 14,
					"description": "By 14th level, you have learned to use magic to alter your physical form in more subtle ways. You can cast the Alter Self spell at will."
				}
			]
		},
		{
			"name": "Shepherd",
			"slug": "shepherd",
			"source": "Xanathar's Guide to Everything",
			"summary": "Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid. These druids recognize that all living things play a role in the natural world, yet they focus on protecting animals and fey creatures that have difficulty defending themselves. Shepherds, as they are known, see such creatures as their charges. They ward off monsters that threaten them, rebuke hunters who kill more prey than necessary, and prevent civilization from encroaching on rare animal habitats and on sites sacred to the fey.\nMany of these druids are happiest far from cities and towns, content to spend their days in the company of animals and the fey creatures of the wilds. Members of this circle become adventurers to oppose forces that threaten their charges or to seek knowledge and power that will help them safeguard their charges better. Wherever these druids go, the spirits of the wilderness are with them.",
			"features": [
				{
					"name": "Speech of the Woods",
					"level": 2,
					"description": "At 2nd level, you gain the ability to converse with beasts and many fey.\nYou learn to speak, read, and write Sylvan. In addition, beasts can understand your speech, and you gain the ability to decipher their noises and motions. Most beasts lack the intelligence to convey or understand sophisticated concepts, but a friendly beast could relay what it has seen or heard in the recent past. This ability doesn't grant you any special friendship with beasts, though you can combine this ability with gifts to curry favor with them as you would with any nonplayer character."
				},
				{
					"name": "Spirit Totem",
					"level": 2,
					"description": "Starting at 2nd level, you gain the ability to call forth nature spirits and use them to influence the world around you.\nAs a bonus action, you can magically summon an incorporeal spirit to a point you can see within 60 feet of you. The spirit creates an aura in a 30-foot radius around that point. It counts as neither a creature nor an object, though it has the spectral appearance of the creature it represents. As a bonus action, you can move the spirit up to 60 feet to a point you can see.\nThe spirit persists for 1 minute. Once you use this feature, you can't use it again until you finish a short or long rest.\nThe effect of the spirit's aura depends on the type of spirit you summon from the options below.\nBear Spirit. The bear spirit grants you and your allies its might and endurance. Each creature of your choice in the aura when the spirit appears gains temporary hit points equal to 5 + your druid level. In addition, you and your allies gain advantage on Strength checks and Strength saving throws while in the aura.\nHawk Spirit. The hawk spirit is a consummate hunter, aiding you and your allies with its keen sight. When a creature makes an attack roll against a target in the spirit's aura, you can use your reaction to grant advantage to that attack roll. In addition, you and your allies have advantage on Wisdom (Perception) checks while in the aura.\nUnicorn Spirit. The unicorn spirit lends its protection to those nearby. You and your allies gain advantage on all ability checks made to detect creatures in the spirit's aura. In addition, if you cast a spell using a spell slot that restores hit points to any creature inside or outside the aura, each creature of your choice in the aura also regains hit points equal to your druid level.",
					"options": [
						{
							"name": "Bear Spirit",
							"description": "The bear spirit grants you and your allies its might and endurance. Each creature of your choice in the aura when the spirit appears gains temporary hit points equal to 5 + your druid level. In addition, you and your allies gain advantage on Strength checks and Strength saving throws while in the aura."
						},
						{
							"name": "Hawk Spirit",
							"description": "The hawk spirit is a consummate hunter, aiding you and your allies with its keen sight. When a creature makes an attack roll against a target in the spirit's aura, you can use your reaction to grant advantage to that attack roll. In addition, you and your allies have advantage on Wisdom (Perception) checks while in the aura."
						},
						{
							"name": "Unicorn Spirit",
							"description": "The unicorn spirit lends its protection to those nearby. You and your allies gain advantage on all ability checks made to detect creatures in the spirit's aura. In addition, if you cast a spell using a spell slot that restores hit points to any creature inside or outside the aura, each creature of your choice in the aura also regains hit points equal to your druid level."
						}
					]
				},
				{
					"name": "Mighty Summoner",
					"level": 6,
					"description": "At 6th level, beasts and fey that you conjure are more resilient than normal. Any beast or fey summoned or created by a spell that you cast gains two benefits:\n• The creature appears with more hit points than normal: 2 extra hit points per Hit Die it has.\n• The damage from its natural weapons is considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks and damage."
				},
				{
					"name": "Guardian Spirit",
					"level": 10,
					"description": "Beginning at 10th level, your Spirit Totem safeguards the beasts and fey that you call forth with your magic. When a beast or fey that you summoned or created with a spell ends its turn in your Spirit Totem aura, that creature regains a number of hit points equal to half your druid level."
				},
				{
					"name": "Faithful Summons",
					"level": 14,
					"description": "Starting at 14th level, the nature spirits you commune with protect you when you are the most defenseless. If you are reduced to 0 hit points or are incapacitated against your will, you can immediately gain the benefits of Conjure Animals as if it were cast with a 9th-level spell slot. It summons four beasts of your choice that are challenge rating 2 or lower. The conjured beasts appear within 20 feet of you. If they receive no commands from you, they protect you from harm and attack your foes. The spell lasts for 1 hour, requiring no concentration, or until you dismiss it (no action required).\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Spores",
			"slug": "spores",
			"source": "Guildmaster's Guide to Ravnica, Tasha's Cauldron of Everything",
			"summary": "They see within mold and other fungi the ability to transform lifeless material into abundant, albeit somewhat strange, life. These druids believe that life and death are parts of a grand cycle, with one leading to the other and then back again. Death isn't the end of life, but instead a change of state that sees life shift into a new form.\nThey see nothing inherently wrong with undeath, which they consider to be a companion to life and death. But these druids believe that the natural cycle is healthiest when each segment of it is vibrant and changing. Undead that seek to replace all life with undeath, or that try to avoid passing to a final rest, violate the cycle and must be thwarted.",
			"features": [
				{
					"name": "Circle Spells",
					"level": 2,
					"description": "Your symbiotic link to fungi and your ability to tap into the cycle of life and death grants you access to certain spells. At 2nd level, you learn the Chill Touch cantrip.\nAt 3rd, 5th, 7th, and 9th level you gain access to the spells listed for that level in the Circle of Spores Spells table. Once you gain access to one of these spells, you always have it prepared, and it doesn't count against the number of spells you can prepare each day. If you gain access to a spell that doesn't appear on the druid spell list, the spell is nonetheless a druid spell for you.\nCircle of Spores Spells\nDruid Level | Circle Spells\n2nd | Chill Touch\n3rd | Blindness/Deafness, Gentle Repose\n5th | Animate Dead, Gaseous Form\n7th | Blight, Confusion\n9th | Cloudkill, Contagion"
				},
				{
					"name": "Halo of Spores",
					"level": 2,
					"description": "Starting at 2nd level, you are surrounded by invisible, necrotic spores that are harmless until you unleash them on a creature nearby. When a creature you can see moves into a space within 10 feet of you or starts its turn there, you can use your reaction to deal 1d4 necrotic damage to that creature unless it succeeds on a Constitution saving throw against your spell save DC. The necrotic damage increases to 1d6 at 6th level, 1d8 at 10th level, and 1d10 at 14th level."
				},
				{
					"name": "Symbiotic Entity",
					"level": 2,
					"description": "Also at 2nd level, you gain the ability to channel magic into your spores. As an action, you can expend a use of your Wild Shape feature to awaken those spores, rather than transforming into a beast form, and you gain 4 temporary hit points for each level you have in this class. While this feature is active, you gain the following benefits:\n• When you deal your Halo of Spores damage, roll the damage die a second time and add it to the total.\n• Your melee weapon attacks deal an extra 1d6 necrotic damage to any target they hit.\nThese benefits last for 10 minutes, until you lose all these temporary hit points. or until you use your Wild Shape again."
				},
				{
					"name": "Fungal Infestation",
					"level": 6,
					"description": "At 6th level, your spores gain the ability to infest a corpse and animate it. If a beast or a humanoid that is Small or Medium dies within 10 feet of you, you can use your reaction to animate it, causing it to stand up immediately with 1 hit point. The creature uses the Zombie stat block in the Monster Manual. It remains animate for 1 hour, after which time it collapses and dies.\nIn combat, the zombie's turn comes immediately after yours. It obeys your mental commands, and the only action it can take is the Attack action, making one melee attack.\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Spreading Spores",
					"level": 10,
					"description": "At 10th level, you gain the ability to seed an area with deadly spores. As a bonus action while your Symbiotic Entity feature is active, you can hurl spores up to 30 feet away, where they swirl in a 10-foot cube for 1 minute. The spores disappear early if you use this feature again, if you dismiss them as a bonus action, or if your Symbiotic Entity feature is no longer active.\nWhenever a creature moves into the cube or starts its turn there, that creature takes your Halo of Spores damage, unless the creature succeeds on a Constitution saving throw against your spell save DC. A creature can take this damage no more than once per turn.\nWhile the cube of spores persists, you can't use your Halo of Spores reaction."
				},
				{
					"name": "Fungal Body",
					"level": 14,
					"description": "At 14th level, the fungal spores in your body alter you: you can't be blinded, deafened, frightened, or poisoned, and any critical hit against you counts as a normal hit instead, unless you're incapacitated."
				}
			]
		},
		{
			"name": "Stars",
			"slug": "stars",
			"source": "Tasha's Cauldron of Everything",
			"summary": "These druids have tracked heavenly patterns since time immemorial, discovering secrets hidden amid the constellations. By revealing and understanding these secrets, the Circle of the Stars seeks to harness the powers of the cosmos.\nMany druids of this circle keep records of the constellations and the stars' effects on the world. Some groups document these observations at megalithic sites, which serve as enigmatic libraries of lore. These repositories might take the form of stone circles, pyramids, petroglyphs, and underground temples; any construction durable enough to protect the circle's sacred knowledge even against a great cataclysm.",
			"features": [
				{
					"name": "Star Map",
					"level": 2,
					"description": "At 2nd level, you've created a star chart as part of your heavenly studies. It is a Tiny object and can serve as a spellcasting focus for your druid spells. You determine its form by rolling on the Star Map table or by choosing one.\nWhile holding this map, you have these benefits:\n• You know the Guidance cantrip.\n• You have the Guiding Bolt spell prepared. It counts as a druid spell for you, and it doesn't count against the number of spells you can have prepared.\n• You can cast Guiding Bolt without expending a spell slot. You can do so a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\nIf you lose the map, you can perform a 1-hour ceremony to magically create a replacement. This ceremony can be performed during a short or long rest, and it destroys the previous map.\nd6 | Map Form\n1 | A scroll covered with depictions of constellations\n2 | A stone tablet with fine holes drilled through it\n3 | A speckled owlbear hide, tooled with raised marks\n4 | A collection of maps bound in an ebony cover\n5 | A crystal that projects starry patterns when placed before a light\n6 | Glass disks that depict constellations"
				},
				{
					"name": "Starry Form",
					"level": 2,
					"description": "At 2nd level, you gain the ability to harness constellations' power to alter your form. As a bonus action, you can expend a use of your Wild Shape feature to take on a starry form, rather than transforming into a beast.\nWhile in your starry form, you retain your game statistics, but your body becomes luminous; your joints glimmer like stars, and glowing lines connect them as on a star chart. This form sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The form lasts for 10 minutes. It ends early if you dismiss it (no action required), are incapacitated, die, or use this feature again.\nWhenever you assume your starry form, choose which of the following constellations glimmers on your body; your choice gives you certain benefits while in the form:\nArcher. A constellation of an archer appears on you. When you activate this form, and as a bonus action on your subsequent turns while it lasts, you can make a ranged spell attack, hurling a luminous arrow that targets one creature within 60 feet of you. On a hit, the attack deals radiant damage equal to 1d8 + your Wisdom modifier.\nChalice. A constellation of a life-giving goblet appears on you. Whenever you cast a spell using a spell slot that restores hit points to a creature, you or another creature within 30 feet of you can regain hit points equal to 1d8 + your Wisdom modifier.\nDragon. A constellation of a wise dragon appears on you. When you make an Intelligence or a Wisdom check or a Constitution saving throw to maintain concentration on a spell, you can treat a roll of 9 or lower on the d20 as a 10.",
					"options": [
						{
							"name": "Archer",
							"description": "A constellation of an archer appears on you. When you activate this form, and as a bonus action on your subsequent turns while it lasts, you can make a ranged spell attack, hurling a luminous arrow that targets one creature within 60 feet of you. On a hit, the attack deals radiant damage equal to 1d8 + your Wisdom modifier."
						},
						{
							"name": "Chalice",
							"description": "A constellation of a life-giving goblet appears on you. Whenever you cast a spell using a spell slot that restores hit points to a creature, you or another creature within 30 feet of you can regain hit points equal to 1d8 + your Wisdom modifier."
						},
						{
							"name": "Dragon",
							"description": "A constellation of a wise dragon appears on you. When you make an Intelligence or a Wisdom check or a Constitution saving throw to maintain concentration on a spell, you can treat a roll of 9 or lower on the d20 as a 10."
						}
					]
				},
				{
					"name": "Cosmic Omen",
					"level": 6,
					"description": "When you reach 6th level, you learn to use your star map to divine the will of the cosmos. Whenever you finish a long rest, you can consult your Star Map for omens. When you do so, roll a die. Until you finish your next long rest, you gain access to a special reaction based on whether you rolled an even or an odd number on the die:\nWeal (even). Whenever a creature you can see within 30 feet of you is about to make an attack roll, a saving throw, or an ability check, you can use your reaction to roll a d6 and add the number rolled to the total.\nWoe (odd). Whenever a creature you can see within 30 feet of you is about to make an attack roll, a saving throw, or an ability check, you can use your reaction to roll a d6 and subtract the number rolled from the total.\nYou can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
					"options": [
						{
							"name": "Weal (even)",
							"description": "Whenever a creature you can see within 30 feet of you is about to make an attack roll, a saving throw, or an ability check, you can use your reaction to roll a d6 and add the number rolled to the total."
						},
						{
							"name": "Woe (odd)",
							"description": "Whenever a creature you can see within 30 feet of you is about to make an attack roll, a saving throw, or an ability check, you can use your reaction to roll a d6 and subtract the number rolled from the total."
						}
					]
				},
				{
					"name": "Twinkling Constellations",
					"level": 10,
					"description": "At 10th level, the constellations of your Starry Form improve. The 1d8 of the Archer and the Chalice becomes 2d8, and while the Dragon is active, you have a flying speed of 20 feet and can hover.\nMoreover, at the start of each of your turns while in your Starry Form, you can change which constellation glimmers on your body."
				},
				{
					"name": "Full of Stars",
					"level": 14,
					"description": "At 14th level, while in your Starry Form, you become partially incorporeal, giving you resistance to bludgeoning, piercing, and slashing damage."
				}
			]
		},
		{
			"name": "Wildfire",
			"slug": "wildfire",
			"source": "Tasha's Cauldron of Everything",
			"summary": "Druids within the Circle of Wildfire understand that destruction is sometimes the precursor of creation, such as when a forest fire promotes later growth. These druids bond with a primal spirit that harbors both destructive and creative power, allowing the druids to create controlled flames that burn away one thing but give life to another.",
			"features": [
				{
					"name": "Circle Spells",
					"level": 2,
					"description": "When you join this circle at 2nd level, you have formed a bond with a wildfire spirit, a primal being of creation and destruction. Your link with this spirit grants you access to some spells when you reach certain levels in this class, as shown on the Circle of Wildfire Spells table.\nOnce you gain access to one of these spells, you always have it prepared, and it doesn't count against the number of spells you can prepare each day. If you gain access to a spell that doesn't appear on the Druid Spell List, the spell is nonetheless a druid spell for you.\nDruid Level | Spells\n2nd | Burning Hands, Cure Wounds\n3rd | Flaming Sphere, Scorching Ray\n5th | Plant Growth, Revivify\n7th | Aura of Life, Fire Shield\n9th | Flame Strike, Mass Cure Wounds"
				},
				{
					"name": "Summon Wildfire Spirit",
					"level": 2,
					"description": "At 2nd level, You can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your wildfire spirit, rather than assuming a beast form.\nThe spirit appears in an unoccupied space of your choice that you can see within 30 feet of you. Each creature within 10 feet of the spirit (other than you) when it appears must succeed on a Dexterity saving throw against your spell save DC or take 2d6 fire damage.\nThe spirit is friendly to you and your companions and obeys your commands. See this creature's game statistics in the Wildfire Spirit stat block, which uses your proficiency bonus (PB) in several places. You determine the spirit's appearance. Some spirits take the form of a humanoid figure made of gnarled branches covered in flame, while others look like beasts wreathed in fire.\nIn combat, the spirit shares your initiative count, but it takes its turn immediately after yours. The only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the spirit can take any action of its choice, not just Dodge.\nThe spirit manifests for 1 hour, until it is reduced to 0 hit points, until you use this feature to summon the spirit again, or until you die.\nWildfire Spirit\nSmall elemental\nArmor Class: 13 (natural armor)\nHit Points: 5 + five times your druid level\nSpeed: 30 ft., fly 30 ft. (hover)\nSTR | DEX | CON | INT | WIS | CHA\n10 (+0) | 14 (+2) | 14 (+2) | 13 (+1) | 15 (+2) | 11 (+0)\nDamage Immunities: fire\nCondition Immunities: charmed, frightened, grappled, prone, restrained\nSenses: darkvision 60 ft., passive Perception 12\nLanguages: understands the languages you speak\nChallenge: —\nProficiency Bonus: equals your bonus\nActions\nFlame Seed. Ranged Weapon Attack: your spell attack modifier to hit, range 60 ft., one target you can see. Hit: 1d6 + PB fire damage.\nFiery Teleportation. The spirit and each willing creature of your choice within 5 feet of it teleport up to 15 feet to unoccupied spaces you can see. Then each creature within 5 feet of the space that the spirit left must succeed on a Dexterity saving throw against your spell save DC or take 1d6 + PB fire damage."
				},
				{
					"name": "Enhanced Bond",
					"level": 6,
					"description": "At 6th level, the bond with your wildfire spirit enhances your destructive and restorative spells. Whenever you cast a spell that deals fire damage or restores hit points while your wildfire spirit is summoned, roll a d8, and you gain a bonus equal to the number rolled to one damage or healing roll of the spell.\nIn addition, when you cast a spell with a range other than self, the spell can originate from you or your wildfire spirit."
				},
				{
					"name": "Cauterizing Flames",
					"level": 10,
					"description": "At 10th level, you gain the ability to turn death into magical flames that can heal or incinerate. When a Small or larger creature dies within 30 feet of you or your wildfire spirit, a harmless spectral flame springs forth in the dead creature's space and flickers there for 1 minute. When a creature you can see enters that space, you can use your reaction to extinguish the spectral flame there and either heal the creature or deal fire damage to it. The healing or damage equals 2d10 + your Wisdom modifier.\nYou can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Blazing Revival",
					"level": 14,
					"description": "At 14th level, the bond with your wildfire spirit can save you from death. If the spirit is within 120 feet of you when you are reduced to 0 hit points and thereby fall unconscious, you can cause the spirit to drop to 0 hit points. You then regain half your hit points and immediately rise to your feet.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		}
	]
};

export default druid;
