// Generated from 5e.tools (Tasha's Cauldron of Everything, chapter 1). Do not edit by hand.
const artificer = {
	"name": "Artificer",
	"hitDie": 8,
	"startingGold": "5d4 x 10",
	"subclassName": "Artificer Specialist",
	"suggestedAbilities": "Intelligence, Constitution or Dexterity",
	"primaryAbility": [
		"Intelligence"
	],
	"spellcastingAbility": "Intelligence",
	"subclassLevel": 3,
	"subclassFeatureLevels": [
		5,
		9,
		15
	],
	"armorProficiencies": "Light armor, medium armor, shields",
	"weaponProficiencies": "Simple weapons",
	"toolProficiencies": "Thieves' tools, tinker's tools, one type of artisan's tools of your choice",
	"savingThrows": [
		"Constitution",
		"Intelligence"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"Arcana",
			"History",
			"Investigation",
			"Medicine",
			"Nature",
			"Perception",
			"Sleight of Hand"
		],
		"raw": "Choose two from Arcana, History, Investigation, Medicine, Nature, Perception, and Sleight of Hand"
	},
	"startingEquipment": [
		"Two simple weapons",
		"A light crossbow and 20 bolts",
		"(a) studded leather armor or (b) scale mail",
		"Thieves' tools and a dungeoneer's pack"
	],
	"table": {
		"caption": "The Artificer",
		"columns": [
			"Level",
			"Proficiency Bonus",
			"Features",
			"Infusions Known",
			"Infused Items",
			"Cantrips Known",
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
				"Firearm Proficiency (Optional), Magical Tinkering, Spellcasting",
				"-",
				"-",
				"2",
				"2",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"2nd",
				"+2",
				"Infuse Item",
				"4",
				"2",
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
				"Artificer Specialist, The Right Tool for the Job",
				"4",
				"2",
				"2",
				"3",
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
				"2",
				"2",
				"3",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"5th",
				"+3",
				"Artificer Specialist feature",
				"4",
				"2",
				"2",
				"4",
				"2",
				"-",
				"-",
				"-"
			],
			[
				"6th",
				"+3",
				"Tool Expertise",
				"6",
				"3",
				"2",
				"4",
				"2",
				"-",
				"-",
				"-"
			],
			[
				"7th",
				"+3",
				"Flash of Genius",
				"6",
				"3",
				"2",
				"4",
				"3",
				"-",
				"-",
				"-"
			],
			[
				"8th",
				"+3",
				"Ability Score Improvement",
				"6",
				"3",
				"2",
				"4",
				"3",
				"-",
				"-",
				"-"
			],
			[
				"9th",
				"+4",
				"Artificer Specialist feature",
				"6",
				"3",
				"2",
				"4",
				"3",
				"2",
				"-",
				"-"
			],
			[
				"10th",
				"+4",
				"Magic Item Adept",
				"8",
				"4",
				"3",
				"4",
				"3",
				"2",
				"-",
				"-"
			],
			[
				"11th",
				"+4",
				"Spell-Storing Item",
				"8",
				"4",
				"3",
				"4",
				"3",
				"3",
				"-",
				"-"
			],
			[
				"12th",
				"+4",
				"Ability Score Improvement",
				"8",
				"4",
				"3",
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
				"4",
				"3",
				"3",
				"1",
				"-"
			],
			[
				"14th",
				"+5",
				"Magic Item Savant",
				"10",
				"5",
				"4",
				"4",
				"3",
				"3",
				"1",
				"-"
			],
			[
				"15th",
				"+5",
				"Artificer Specialist feature",
				"10",
				"5",
				"4",
				"4",
				"3",
				"3",
				"2",
				"-"
			],
			[
				"16th",
				"+5",
				"Ability Score Improvement",
				"10",
				"5",
				"4",
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
				"5",
				"4",
				"4",
				"3",
				"3",
				"3",
				"1"
			],
			[
				"18th",
				"+6",
				"Magic Item Master",
				"12",
				"6",
				"4",
				"4",
				"3",
				"3",
				"3",
				"1"
			],
			[
				"19th",
				"+6",
				"Ability Score Improvement",
				"12",
				"6",
				"4",
				"4",
				"3",
				"3",
				"3",
				"2"
			],
			[
				"20th",
				"+6",
				"Soul of Artifice",
				"12",
				"6",
				"4",
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
			"name": "Firearm Proficiency",
			"levels": [
				1
			],
			"optional": true,
			"description": "The secrets of creating and operating gunpowder weapons have been discovered in various corners of the D&D multiverse. If your Dungeon Master uses the rules on firearms in chapter 9 of the Dungeon Master's Guide and your artificer has been exposed to the operation of such weapons, your artificer is proficient with them."
		},
		{
			"name": "Magical Tinkering",
			"levels": [
				1
			],
			"description": "You've learned how to invest a spark of magic into mundane objects. To use this ability, you must have thieves' tools or artisan's tools in hand. You then touch a Tiny nonmagical object as an action and give it one of the following magical properties of your choice:\n• The object sheds bright light in a 5-foot radius and dim light for an additional 5 feet.\n• Whenever tapped by a creature, the object emits a recorded message that can be heard up to 10 feet away. You utter the message when you bestow this property on the object, and the recording can be no more than 6 seconds long.\n• The object continuously emits your choice of an odor or a nonverbal sound (wind, waves, chirping, or the like). The chosen phenomenon is perceivable up to 10 feet away.\n• A static visual effect appears on one of the object's surfaces. This effect can be a picture, up to 25 words of text, lines and shapes, or a mixture of these elements, as you like.\nThe chosen property lasts indefinitely. As an action, you can touch the object and end the property early.\nYou can bestow magic on multiple objects, touching one object each time you use this feature, though a single object can only bear one property at a time. The maximum number of objects you can affect with this feature at one time is equal to your Intelligence modifier (minimum of one object). If you try to exceed your maximum, the oldest property immediately ends, and then the new property applies."
		},
		{
			"name": "Spellcasting",
			"levels": [
				1
			],
			"description": "You've studied the workings of magic and how to cast spells, channeling the magic through objects. To observers, you don't appear to be casting spells in a conventional way; you appear to produce wonders from mundane items and outlandish inventions.\nTools Required. You produce your artificer spell effects through your tools. You must have a spellcasting focus—specifically thieves' tools or some kind of artisan's tool—in hand when you cast any spell with this Spellcasting feature (meaning the spell has an 'M' component when you cast it). You must be proficient with the tool to use it in this way. See chapter 5, \"Equipment,\" in the Player's Handbook for descriptions of these tools.\nAfter you gain the Infuse Item feature at 2nd level, you can also use any item bearing one of your infusions as a spellcasting focus.\nThe Magic of Artifice\nAs an artificer, you use tools when you cast your spells. When describing your spellcasting, think about how you're using a tool to perform the spell effect. If you cast Cure Wounds using alchemist's supplies, you could be quickly producing a salve. If you cast it using tinker's tools, you might have a miniature mechanical spider that binds wounds. When you cast Poison Spray, you could fling foul chemicals or use a wand that spits venom. The effect of the spell is the same as for a spellcaster of any other class, but your method of spellcasting is special.\nThe same principle applies when you prepare your spells. As an artificer, you don't study a spellbook or pray to prepare your spells. Instead, you work with your tools and create the specialized items you'll use to produce your effects. If you replace Cure Wounds with Heat Metal, you might be altering the device you use to heal—perhaps modifying a tool so that it channels heat instead of healing energy.\nSuch details don't limit you in any way or provide you with any benefit beyond the spell's effects. You don't have to justify how you're using tools to cast a spell. But describing your spellcasting creatively is a fun way to distinguish yourself from other spellcasters.\nCantrips (0-Level Spells). At 1st level, you know two cantrips of your choice from the artificer spell list. At higher levels, you learn additional artificer cantrips of your choice, as shown in the Cantrips Known column of the Artificer table.\nWhen you gain a level in this class, you can replace one of the artificer cantrips you know with another cantrip from the artificer spell list.\nPreparing and Casting Spells. The Artificer table shows how many spell slots you have to cast your artificer spells. To cast one of your artificer spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nYou prepare the list of artificer spells that are available for you to cast, choosing from the artificer spell list. When you do so, choose a number of artificer spells equal to your Intelligence modifier + half your artificer level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.\nFor example, if you are a 5th-level artificer, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of artificer spells requires time spent tinkering with your spellcasting focuses: at least 1 minute per spell level for each spell on your list.\nSpellcasting Ability. Intelligence is your spellcasting ability for your artificer spells; your understanding of the theory behind magic allows you to wield these spells with superior skill. You use your Intelligence whenever an artificer spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for an artificer spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Intelligence modifier\nSpell attack modifier = your proficiency bonus + your Intelligence modifier\nRitual Casting. You can cast an artificer spell as a ritual if that spell has the ritual tag and you have the spell prepared."
		},
		{
			"name": "Infuse Item",
			"levels": [
				2
			],
			"description": "You've gained the ability to imbue mundane items with certain magical infusions, turning those objects into magic items.\nInfusions Known. When you gain this feature, pick four artificer infusions to learn, choosing from the \"Artificer Infusions\" section at the end of the class's description. You learn additional infusions of your choice when you reach certain levels in this class, as shown in the Infusions Known column of the Artificer table.\nWhenever you gain a level in this class, you can replace one of the artificer infusions you learned with a new one.\nArtificer Infusions\nArtificers have invented numerous magical infusions, extraordinary processes that rapidly create magic items. To many, artificers seem like wonderworkers, accomplishing in hours what others need weeks to complete.\nThe description of each of the following infusions details the type of item that can receive it, along with whether the resulting magic item requires attunement.\nSome infusions specify a minimum artificer level. You can't learn such an infusion until you are at least that level.\nUnless an infusion's description says otherwise, you can't learn an infusion more than once.\nInfusing an Item. Whenever you finish a long rest, you can touch a nonmagical object and imbue it with one of your artificer infusions, turning it into a magic item. An infusion works on only certain kinds of objects, as specified in the infusion's description. If the item requires attunement, you can attune yourself to it the instant you infuse the item. If you decide to attune to the item later, you must do so using the normal process for attunement (see \"Attunement\" in chapter 7 of the Dungeon Master's Guide).\nYour infusion remains in an item indefinitely, but when you die, the infusion vanishes after a number of days have passed equal to your Intelligence modifier (minimum of 1 day). The infusion also vanishes if you give up your knowledge of the infusion for another one.\nYou can infuse more than one nonmagical object at the end of a long rest; the maximum number of objects appears in the Infused Items column of the Artificer table. You must touch each of the objects, and each of your infusions can be in only one object at a time. Moreover, no object can bear more than one of your infusions at a time. If you try to exceed your maximum number of infusions, the oldest infusion immediately ends, and then the new infusion applies.\nIf an infusion ends on an item that contains other things, like a bag of holding, its contents harmlessly appear in and around its space."
		},
		{
			"name": "Artificer Specialist",
			"levels": [
				3
			],
			"description": "Choose the type of specialist you are, each of which is detailed at the end of the class's description. Your choice grants you features at 5th level and again at 9th and 15th level."
		},
		{
			"name": "The Right Tool for the Job",
			"levels": [
				3
			],
			"description": "You've learned how to produce exactly the tool you need: with thieves' tools or artisan's tools in hand, you can magically create one set of artisan's tools in an unoccupied space within 5 feet of you. This creation requires 1 hour of uninterrupted work, which can coincide with a short or long rest. Though the product of magic, the tools are nonmagical, and they vanish when you use this feature again."
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
			"description": "When you reach 4th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature.\nIf your DM allows the use of feats, you may instead take a feat."
		},
		{
			"name": "Tool Expertise",
			"levels": [
				6
			],
			"description": "Your proficiency bonus is now doubled for any ability check you make that uses your proficiency with a tool."
		},
		{
			"name": "Flash of Genius",
			"levels": [
				7
			],
			"description": "You've gained the ability to come up with solutions under pressure. When you or another creature you can see within 30 feet of you makes an ability check or a saving throw, you can use your reaction to add your Intelligence modifier to the roll.\nYou can use this feature a number of times equal to your Intelligence modifier (minimum of once). You regain all expended uses when you finish a long rest."
		},
		{
			"name": "Magic Item Adept",
			"levels": [
				10
			],
			"description": "You've achieved a profound understanding of how to use and make magic items:\n• You can attune to up to four magic items at once.\n• If you craft a magic item with a rarity of common or uncommon, it takes you a quarter of the normal time, and it costs you half as much of the usual gold."
		},
		{
			"name": "Spell-Storing Item",
			"levels": [
				11
			],
			"description": "You can now store a spell in an object. Whenever you finish a long rest, you can touch one simple or martial weapon or one item that you can use as a spellcasting focus, and you store a spell in it, choosing a 1st- or 2nd-level spell from the artificer spell list that requires 1 action to cast (you needn't have it prepared).\nWhile holding the object, a creature can take an action to produce the spell's effect from it, using your spellcasting ability modifier. If the spell requires concentration, the creature must concentrate. The spell stays in the object until it's been used a number of times equal to twice your Intelligence modifier (minimum of twice) or until you use this feature again to store a spell in an object."
		},
		{
			"name": "Magic Item Savant",
			"levels": [
				14
			],
			"description": "Your skill with magic items deepens:\n• You can attune to up to five magic items at once.\n• You ignore all class, race, spell, and level requirements on attuning to or using a magic item."
		},
		{
			"name": "Magic Item Master",
			"levels": [
				18
			],
			"description": "You can now attune to up to six magic items at once."
		},
		{
			"name": "Soul of Artifice",
			"levels": [
				20
			],
			"description": "You have developed a mystical connection to your magic items, which you can draw on for protection:\n• You gain a +1 bonus to all saving throws per magic item you are currently attuned to.\n• If you're reduced to 0 hit points but not killed outright, you can use your reaction to end one of your artificer infusions, causing you to drop to 1 hit point instead of 0."
		}
	],
	"subclasses": [
		{
			"name": "Alchemist",
			"slug": "alchemist",
			"source": "Tasha's Cauldron of Everything",
			"summary": "An Alchemist is an expert at combining reagents to produce mystical effects. Alchemists use their creations to give life and to leech it away. Alchemy is the oldest of artificer traditions, and its versatility has long been valued during times of war and peace.",
			"features": [
				{
					"name": "Tool Proficiency",
					"level": 3,
					"description": "When you adopt this specialization at 3rd level, you gain proficiency with alchemist's supplies. If you already have this proficiency, you gain proficiency with one other type of artisan's tools of your choice."
				},
				{
					"name": "Alchemist Spells",
					"level": 3,
					"description": "Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Alchemist Spells table. These spells count as artificer spells for you, but they don't count against the number of artificer spells you prepare.\nArtificer Level | Spell\n3rd | Healing Word, Ray of Sickness\n5th | Flaming Sphere, Melf's Acid Arrow\n9th | Gaseous Form, Mass Healing Word\n13th | Blight, Death Ward\n17th | Cloudkill, Raise Dead"
				},
				{
					"name": "Experimental Elixir",
					"level": 3,
					"description": "Beginning at 3rd level, whenever you finish a long rest, you can magically produce an experimental elixir in an empty flask you touch. Roll on the Experimental Elixir table for the elixir's effect, which is triggered when someone drinks the elixir. As an action, a creature can drink the elixir or administer it to an incapacitated creature.\nCreating an experimental elixir requires you to have alchemist's supplies on your person, and any elixir you create with this feature lasts until it is drunk or until the end of your next long rest.\nWhen you reach certain levels in this class, you can make more elixirs at the end of a long rest: two at 6th level and three at 15th level. Roll for each elixir's effect separately. Each elixir requires its own flask.\nYou can create additional experimental elixirs by expending a spell slot of 1st level or higher for each one. When you do so, you use your action to create the elixir in an empty flask you touch, and you choose the elixir's effect from the Experimental Elixir table.\nd6 | Effect\n1 | Healing. The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.\n2 | Swiftness. The drinker's walking speed increases by 10 feet for 1 hour.\n3 | Resilience. The drinker gains a +1 bonus to AC for 10 minutes.\n4 | Boldness. The drinker can roll a d4 and add the number rolled to every attack roll and saving throw they make for the next minute.\n5 | Flight. The drinker gains a flying speed of 10 feet for 10 minutes.\n6 | Transformation. The drinker's body is transformed as if by the Alter Self spell. The drinker determines the transformation caused by the spell, the effects of which last for 10 minutes."
				},
				{
					"name": "Alchemical Savant",
					"level": 5,
					"description": "At 5th level, you develop masterful command of magical chemicals, enhancing the healing and damage you create through them. Whenever you cast a spell using your alchemist's supplies as the spellcasting focus, you gain a bonus to one roll of the spell. That roll must restore hit points or be a damage roll that deals acid, fire, necrotic, or poison damage, and the bonus equals your Intelligence modifier (minimum of +1)."
				},
				{
					"name": "Restorative Reagents",
					"level": 9,
					"description": "Starting at 9th level, you can incorporate restorative reagents into some of your works:\n• Whenever a creature drinks an experimental elixir you created, the creature gains temporary hit points equal to 2d6 + your Intelligence modifier (minimum of 1 temporary hit point).\n• You can cast Lesser Restoration without expending a spell slot and without preparing the spell, provided you use alchemist's supplies as the spellcasting focus. You can do so a number of times equal to your Intelligence modifier (minimum of once), and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Chemical Mastery",
					"level": 15,
					"description": "By 15th level, you have been exposed to so many chemicals that they pose little risk to you, and you can use them to quickly end certain ailments:\n• You gain resistance to acid damage and poison damage, and you are immune to the poisoned condition.\n• You can cast Greater Restoration and Heal without expending a spell slot, without preparing the spell, and without material components, provided you use alchemist's supplies as the spellcasting focus. Once you cast either spell with this feature, you can't cast that spell with it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Armorer",
			"slug": "armorer",
			"source": "Tasha's Cauldron of Everything",
			"summary": "An artificer who specializes as an Armorer modifies armor to function almost like a second skin. The armor is enhanced to hone the artificer's magic, unleash potent attacks, and generate a formidable defense. The artificer bonds with this armor, becoming one with it even as they experiment with it and refine its magical capabilities.",
			"grants": {
				"armor": "Heavy armor"
			},
			"features": [
				{
					"name": "Tools of the Trade",
					"level": 3,
					"description": "You gain proficiency with heavy armor. You also gain proficiency with smith's tools. If you already have this tool proficiency, you gain proficiency with one other type of artisan's tools of your choice."
				},
				{
					"name": "Armorer Spells",
					"level": 3,
					"description": "You always have certain spells prepared after you reach particular levels in this class, as shown in the Armorer Spells table. These spells count as artificer spells for you, but they don't count against the number of artificer spells you prepare.\nArtificer Level | Spell\n3rd | Magic Missile, Thunderwave\n5th | Mirror Image, Shatter\n9th | Hypnotic Pattern, Lightning Bolt\n13th | Fire Shield, Greater Invisibility\n17th | Passwall, Wall of Force"
				},
				{
					"name": "Arcane Armor",
					"level": 3,
					"description": "Your metallurgical pursuits have led to you making armor a conduit for your magic. As an action, you can turn a suit of armor you are wearing into Arcane Armor, provided you have smith's tools in hand.\nYou gain the following benefits while wearing this armor:\n• If the armor normally has a Strength requirement, the arcane armor lacks this requirement for you.\n• You can use the arcane armor as a spellcasting focus for your artificer spells.\n• The armor attaches to you and can't be removed against your will. It also expands to cover your entire body, although you can retract or deploy the helmet as a bonus action. The armor replaces any missing limbs, functioning identically to a limb it replaces.\n• You can doff or don the armor as an action. The armor continues to be Arcane Armor until you don another suit of armor or you die."
				},
				{
					"name": "Armor Model",
					"level": 3,
					"description": "You can customize your Arcane Armor. When you do so, choose one of the following armor models: Guardian or Infiltrator. The model you choose gives you special benefits while you wear it.\nEach model includes a special weapon. When you attack with that weapon, you can add your Intelligence modifier, instead of Strength or Dexterity, to the attack and damage rolls.\nYou can change the armor's model whenever you finish a short or long rest, provided you have smith's tools in hand.\nGuardian. You design your armor to be in the front line of conflict. It has the following features:\n• Thunder Gauntlets. Each of the armor's gauntlets counts as a simple melee weapon while you aren't holding anything in it, and it deals 1d8 thunder damage on a hit. A creature hit by the gauntlet has disadvantage on attack rolls against targets other than you until the start of your next turn, as the armor magically emits a distracting pulse when the creature attacks someone else.\n• Defensive Field. As a bonus action, you can gain temporary hit points equal to your level in this class, replacing any temporary hit points you already have. You lose these temporary hit points if you doff the armor. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\nInfiltrator. You customize your armor for subtle undertakings. It has the following features:\n• Lightning Launcher. A gemlike node appears on one of your armored fists or on the chest (your choice). It counts as a simple ranged weapon, with a normal range of 90 feet and a long range of 300 feet, and it deals 1d6 lightning damage on a hit. Once on each of your turns when you hit a creature with it, you can deal an extra 1d6 lightning damage to that target.\n• Powered Steps. Your walking speed increases by 5 feet.\n• Dampening Field. You have advantage on Dexterity (Stealth) checks. If the armor normally imposes disadvantage on such checks, the advantage and disadvantage cancel each other, as normal."
				},
				{
					"name": "Extra Attack",
					"level": 5,
					"description": "You can attack twice, rather than once, whenever you take the Attack action on your turn."
				},
				{
					"name": "Armor Modifications",
					"level": 9,
					"description": "You learn how to use your artificer infusions to specially modify your Arcane Armor. That armor now counts as separate items for the purposes of your Infuse Items feature: armor (the chest piece), boots, helmet, and the armor's special weapon. Each of those items can bear one of your infusions, and the infusions transfer over if you change your armor's model with the Armor Model feature. In addition, the maximum number of items you can infuse at once increases by 2, but those extra items must be part of your Arcane Armor."
				},
				{
					"name": "Perfected Armor",
					"level": 15,
					"description": "Your Arcane Armor gains additional benefits based on its model, as shown below."
				},
				{
					"name": "Guardian",
					"level": 15,
					"description": "When a Huge or smaller creature you can see ends its turn within 30 feet of you, you can use your reaction to magically force it to make a Strength saving throw against your spell save DC. On a failed save, you pull the creature up to 25 feet directly to an unoccupied space. If you pull the target to a space within 5 feet of you, you can make a melee weapon attack against it as part of this reaction.\nYou can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest."
				},
				{
					"name": "Infiltrator",
					"level": 15,
					"description": "Any creature that takes lightning damage from your Lightning Launcher glimmers with magical light until the start of your next turn. The glimmering creature sheds dim light in a 5-foot radius, and it has disadvantage on attack rolls against you, as the light jolts it if it attacks you. In addition, the next attack roll against it has advantage, and if that attack hits, the target takes an extra 1d6 lightning damage."
				}
			]
		},
		{
			"name": "Artillerist",
			"slug": "artillerist",
			"source": "Tasha's Cauldron of Everything",
			"summary": "An Artillerist specializes in using magic to hurl energy, projectiles, and explosions on a battlefield. This destructive power was valued by all the armies of the Last War. Now that the war is over, some members of this specialization have sought to build a more peaceful world by using their powers to fight the resurgence of strife in Khorvaire.\nThe gnome artificer Vi, an unlikely yet key member of House Cannith's warforged project, has been especially vocal about making things right: \"It's about time we fixed things instead of blowing them all to hell.\"",
			"features": [
				{
					"name": "Tool Proficiency",
					"level": 3,
					"description": "When you adopt this specialization at 3rd level, you gain proficiency with woodcarver's tools. If you already have this proficiency, you gain proficiency with one other type of artisan's tools of your choice."
				},
				{
					"name": "Artillerist Spells",
					"level": 3,
					"description": "Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Artillerist Spells table. These spells count as artificer spells for you, but they don't count against the number of artificer spells you prepare.\nArtificer Level | Spell\n3rd | Shield, Thunderwave\n5th | Scorching Ray, Shatter\n9th | Fireball, Wind Wall\n13th | Ice Storm, Wall of Fire\n17th | Cone of Cold, Wall of Force"
				},
				{
					"name": "Eldritch Cannon",
					"level": 3,
					"description": "At 3rd level, you learn how to create a magical cannon. Using woodcarver's tools or smith's tools, you can take an action to magically create a Small or Tiny eldritch cannon in an unoccupied space on a horizontal surface within 5 feet of you. A Small eldritch cannon occupies its space, and a Tiny one can be held in one hand.\nOnce you create a cannon, you can't do so again until you finish a long rest or until you expend a spell slot of 1st level or higher. You can have only one cannon at a time and can't create one while your cannon is present.\nThe cannon is a magical object. Regardless of size, the cannon has an AC of 18 and a number of hit points equal to five times your artificer level. It is immune to poison damage and psychic damage, and all conditions. If it is forced to make an ability check or a saving throw, treat all its ability scores as 10 (+0). If the Mending spell is cast on it, it regains 2d6 hit points. It disappears if it is reduced to 0 hit points or after 1 hour. You can dismiss it early as an action.\nWhen you create the cannon, you determine its appearance and whether it has legs. You also decide which type it is, choosing from the options on the Eldritch Cannons table. On each of your turns, you can take a bonus action to cause the cannon to activate if you are within 60 feet of it. As part of the same bonus action, you can direct the cannon to walk or climb up to 15 feet to an unoccupied space, provided it has legs.\nCannon | Activation\nFlamethrower | The cannon exhales fire in an adjacent 15-foot cone that you designate. Each creature in that area must make a Dexterity saving throw against your spell save DC, taking 2d8 fire damage on a failed save or half as much damage on a successful one. The fire ignites any flammable objects in the area that aren't being worn or carried.\nForce Ballista | Make a ranged spell attack, originating from the cannon, at one creature or object within 120 feet of it. On a hit, the target takes 2d8 force damage, and if the target is a creature, it is pushed up to 5 feet away from the cannon.\nProtector | The cannon emits a burst of positive energy that grants itself and each creature of your choice within 10 feet of it a number of temporary hit points equal to 1d8 + your Intelligence modifier (minimum of +1)."
				},
				{
					"name": "Arcane Firearm",
					"level": 5,
					"description": "At 5th level, you know how to turn a wand, staff, or rod into an arcane firearm, a conduit for your destructive spells. When you finish a long rest, you can use woodcarver's tools to carve special sigils into a wand, staff, or rod and thereby turn it into your arcane firearm. The sigils disappear from the object if you later carve them on a different item. The sigils otherwise last indefinitely.\nYou can use your arcane firearm as a spellcasting focus for your artificer spells. When you cast an artificer spell through the firearm, roll a d8, and you gain a bonus to one of the spell's damage rolls equal to the number rolled."
				},
				{
					"name": "Explosive Cannon",
					"level": 9,
					"description": "Starting at 9th level, every eldritch cannon you create is more destructive:\n• The cannon's damage rolls all increase by 1d8.\n• As an action, you can command the cannon to detonate if you are within 60 feet of it. Doing so destroys the cannon and forces each creature within 20 feet of it to make a Dexterity saving throw against your spell save DC, taking 3d8 force damage on a failed save or half as much damage on a successful one."
				},
				{
					"name": "Fortified Position",
					"level": 15,
					"description": "Starting at 15th level, you're a master at forming well-defended emplacements using Eldritch Cannon:\n• You and your allies have 3 while within 10 feet of a cannon you create with Eldritch Cannon, as a result of a shimmering field of magical protection that the cannon emits.\n• You can now have two cannons at the same time. You can create two with the same action (but not the same spell slot), and you can activate both of them with the same bonus action. You determine whether the cannons are identical to each other or different. You can't create a third cannon while you have two."
				}
			]
		},
		{
			"name": "Battle Smith",
			"slug": "battle-smith",
			"source": "Tasha's Cauldron of Everything",
			"summary": "Armies require protection, and someone has to put things back together if defenses fail. A combination of protector and medic, a Battle Smith is an expert at defending others and repairing both material and personnel. To aid in their work, Battle Smiths are usually accompanied by a steel defender, a protective companion of their own creation. Many soldiers tell stories of nearly dying before being saved by a Battle Smith and a steel defender.\nBattle Smiths played a key role in House Cannith's work on battle constructs and the original warforged, and after the Last War, these artificers led efforts to aid those who were injured in the war's horrific battles.",
			"features": [
				{
					"name": "Tool Proficiency",
					"level": 3,
					"description": "When you adopt this specialization at 3rd level, you gain proficiency with smith's tools. If you already have this proficiency, you gain proficiency with one other type of artisan's tools of your choice."
				},
				{
					"name": "Battle Smith Spells",
					"level": 3,
					"description": "Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Battle Smith Spells table. These spells count as artificer spells for you, but they don't count against the number of artificer spells you prepare.\nArtificer Level | Spell\n3rd | Heroism, Shield\n5th | Branding Smite, Warding Bond\n9th | Aura of Vitality, Conjure Barrage\n13th | Aura of Purity, Fire Shield\n17th | Banishing Smite, Mass Cure Wounds"
				},
				{
					"name": "Battle Ready",
					"level": 3,
					"description": "When you reach 3rd level, your combat training and your experiments with magic have paid off in two ways:\n• You gain proficiency with martial weapons.\n• When you attack with a magic weapon, you can use your Intelligence modifier, instead of Strength or Dexterity modifier, for the attack and damage rolls."
				},
				{
					"name": "Steel Defender",
					"level": 3,
					"description": "By 3rd level, your tinkering has borne you a faithful companion, a steel defender. It is friendly to you and your companions, and it obeys your commands. See this creature's game statistics in the steel defender stat block, which uses your proficiency bonus (PB) in several places. You determine the creature's appearance and whether it has two legs or four; your choice has no effect on its game statistics.\nIn combat, the defender shares your initiative count, but it takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the defender can take any action of its choice, not just Dodge.\nIf the Mending spell is cast on it, it regains 2d6 hit points. If it has died within the last hour, you can use your smith's tools as an action to revive it, provided you are within 5 feet of it and you expend a spell slot of 1st level or higher. The steel defender returns to life after 1 minute with all its hit points restored.\nAt the end of a long rest, you can create a new steel defender if you have your smith's tools with you. If you already have a steel defender from this feature, the first one immediately perishes. The defender also perishes if you die."
				},
				{
					"name": "Extra Attack",
					"level": 5,
					"description": "Starting at 5th level, you can attack twice, rather than once, whenever you take the Attack action on your turn."
				},
				{
					"name": "Arcane Jolt",
					"level": 9,
					"description": "At 9th level, you learn new ways to channel arcane energy to harm or heal. When either you hit a target with a magic weapon attack or your steel defender hits a target, you can channel magical energy through the strike to create one of the following effects:\n• The target takes an extra 2d6 force damage.\n• Choose one creature or object you can see within 30 feet of the target. Healing energy flows into the chosen recipient, restoring 2d6 hit points to it.\nYou can use this energy a number of times equal to your Intelligence modifier (minimum of once), but you can do so no more than once on a turn. You regain all expended uses when you finish a long rest."
				},
				{
					"name": "Improved Defender",
					"level": 15,
					"description": "At 15th level, your Arcane Jolt and steel defender become more powerful:\n• The extra damage and the healing of your Arcane Jolt both increase to 4d6.\n• Your steel defender gains a +2 bonus to Armor Class.\n• Whenever your steel defender uses its Deflect Attack, the attacker takes force damage equal to 1d4 + your Intelligence modifier."
				}
			]
		}
	]
};

export default artificer;
