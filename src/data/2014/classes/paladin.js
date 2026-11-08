const paladin = {
	"name": "Paladin",
	"hitDie": 10,
	"startingGold": "5d4 x 10",
	"subclassName": "Sacred Oath",
	"suggestedAbilities": "Strength, Charisma",
	"primaryAbility": [
		"Strength",
		"Charisma"
	],
	"spellcastingAbility": "Charisma",
	"subclassLevel": 3,
	"subclassFeatureLevels": [
		7,
		15,
		20
	],
	"armorProficiencies": "All armor, shields",
	"weaponProficiencies": "Simple weapons, martial weapons",
	"toolProficiencies": "None",
	"savingThrows": [
		"Wisdom",
		"Charisma"
	],
	"skillChoices": {
		"count": 2,
		"from": [
			"Athletics",
			"Insight",
			"Intimidation",
			"Medicine",
			"Persuasion",
			"Religion"
		],
		"raw": "Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion"
	},
	"startingEquipment": [
		"(a) a martial weapon and a shield or (b) two martial weapons",
		"(a) five javelins or (b) any simple melee weapon",
		"(a) a priest's pack or (b) an explorer's pack",
		"Chain Mail and a holy symbol"
	],
	"table": {
		"caption": "The Paladin",
		"columns": [
			"Level",
			"Proficiency Bonus",
			"Features",
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
				"Divine Sense, Lay on Hands",
				"-",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"2nd",
				"+2",
				"Fighting Style, Spellcasting, Divine Smite",
				"2",
				"-",
				"-",
				"-",
				"-"
			],
			[
				"3rd",
				"+2",
				"Divine Health, Sacred Oath, Harness Divine Power (Optional)",
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
				"2",
				"-",
				"-",
				"-"
			],
			[
				"6th",
				"+3",
				"Aura of Protection",
				"4",
				"2",
				"-",
				"-",
				"-"
			],
			[
				"7th",
				"+3",
				"Sacred Oath feature",
				"4",
				"3",
				"-",
				"-",
				"-"
			],
			[
				"8th",
				"+3",
				"Ability Score Improvement, Martial Versatility (Optional)",
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
				"4",
				"3",
				"2",
				"-",
				"-"
			],
			[
				"10th",
				"+4",
				"Aura of Courage",
				"4",
				"3",
				"2",
				"-",
				"-"
			],
			[
				"11th",
				"+4",
				"Improved Divine Smite",
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
				"4",
				"3",
				"3",
				"1",
				"-"
			],
			[
				"14th",
				"+5",
				"Cleansing Touch",
				"4",
				"3",
				"3",
				"1",
				"-"
			],
			[
				"15th",
				"+5",
				"Sacred Oath feature",
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
				"4",
				"3",
				"3",
				"3",
				"1"
			],
			[
				"18th",
				"+6",
				"Aura improvements",
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
				"4",
				"3",
				"3",
				"3",
				"2"
			],
			[
				"20th",
				"+6",
				"Sacred Oath feature",
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
			"name": "Divine Sense",
			"levels": [
				1
			],
			"description": "The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the Hallow spell.\nYou can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses."
		},
		{
			"name": "Lay on Hands",
			"levels": [
				1
			],
			"description": "Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x 5.\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.\nThis feature has no effect on undead and constructs."
		},
		{
			"name": "Fighting Style",
			"levels": [
				2
			],
			"description": "Starting at 2nd level, you adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.\n• Blessed Warrior. You learn two cantrips of your choice from the cleric spell list. They count as paladin spells for you, and Charisma is your spellcasting ability for them. Whenever you gain a level in this class, you can replace one of these cantrips with another cantrip from the cleric spell list.\n• Blind Fighting. You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.\n• Defense. While you are wearing armor, you gain a +1 bonus to AC.\n• Dueling. When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.\n• Great Weapon Fighting. When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.\n• Interception. When a creature you can see hits a target, other than you, within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction.\n• Protection. When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.\n• Close Quarters Shooter (UA). When making a ranged attack while you are within 5 feet of a hostile creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half cover and three-quarters cover against targets within 30 feet of you. You have a +1 bonus to attack rolls on ranged attacks.\n• Mariner (UA). As long as you are not wearing heavy armor or using a shield, you have a swimming speed and a climbing speed equal to your normal speed, and you gain a +1 bonus to armor class.\n• Thrown Weapon Fighting (UA). You can draw a weapon that has the thrown property as part of the attack you make with the weapon.\n• In addition, when you hit with a ranged attack using a thrown weapon, you gain a +1 bonus to the damage roll.\n• Tunnel Fighter (UA). As a bonus action, you can enter a defensive stance that lasts until the start of your next turn. While in your defensive stance, you can make opportunity attacks without using your reaction, and you can use your reaction to make a melee attack against a creature that moves more than 5 feet while within your reach.\n• Unarmed Fighting (UA). Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier. If you strike with two free hands, the d6 becomes a d8.\n• When you successfully start a grapple, you can deal 1d4 bludgeoning damage to the grappled creature. Until the grapple ends, you can also deal this damage to the creature whenever you hit it with a melee attack.",
			"options": [
				{
					"name": "Blessed Warrior",
					"description": "You learn two cantrips of your choice from the cleric spell list. They count as paladin spells for you, and Charisma is your spellcasting ability for them. Whenever you gain a level in this class, you can replace one of these cantrips with another cantrip from the cleric spell list."
				},
				{
					"name": "Blind Fighting",
					"description": "You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you."
				},
				{
					"name": "Defense",
					"description": "While you are wearing armor, you gain a +1 bonus to AC."
				},
				{
					"name": "Dueling",
					"description": "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."
				},
				{
					"name": "Great Weapon Fighting",
					"description": "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit."
				},
				{
					"name": "Interception",
					"description": "When a creature you can see hits a target, other than you, within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction."
				},
				{
					"name": "Protection",
					"description": "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield."
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
					"name": "Thrown Weapon Fighting",
					"source": "UA",
					"description": "You can draw a weapon that has the thrown property as part of the attack you make with the weapon."
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
			"description": "By 2nd level, you have learned to draw on divine magic through meditation and prayer to cast spells as a cleric does.\nPREPARING AND CASTING SPELLS\nThe Paladin table shows how many spell slots you have to cast your paladin spells. To cast one of your paladin spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.\nYou prepare the list of paladin spells that are available for you to cast, choosing from the paladin spell list. When you do so, choose a number of paladin spells equal to your Charisma modifier + half your paladin level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.\nFor example, if you are a 5th-level paladin, you have four 1st-level and two 2nd-level spell slots. With a Charisma of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell Cure Wounds, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.\nYou can change your list of prepared spells when you finish a long rest. Preparing a new list of paladin spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.\nSPELLCASTING ABILITY\nCharisma is your spellcasting ability for your paladin spells, since their power derives from the strength of your convictions. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a paladin spell you cast and when making an attack roll with one.\nSpell save DC = 8 + your proficiency bonus + your Charisma modifier\nSpell attack modifier = your proficiency bonus + your Charisma modifier\nSPELLCASTING FOCUS\nYou can use a holy symbol as a spellcasting focus for your paladin spells."
		},
		{
			"name": "Divine Smite",
			"levels": [
				2
			],
			"description": "Starting at 2nd level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend, to a maximum of 6d8."
		},
		{
			"name": "Divine Health",
			"levels": [
				3
			],
			"description": "By 3rd level, the divine magic flowing through you makes you immune to disease."
		},
		{
			"name": "Sacred Oath",
			"levels": [
				3
			],
			"description": "When you reach 3rd level, you swear the oath that binds you as a paladin forever. Up to this time you have been in a preparatory stage, committed to the path but not yet sworn to it. Your choice grants you features at 3rd level and again at 7th, 15th, and 20th level. Those features include oath spells and the Channel Divinity feature.\nOath | Source\nAncients | Player's Handbook\nConquest | Xanathar's Guide to Everything\nCrown | Sword Coast Adventurer's Guide\nDevotion | Player's Handbook\nGlory | Mythic Odysseys of Theros Tasha's Cauldron of Everything\nRedemption | Xanathar's Guide to Everything\nVengeance | Player's Handbook\nWatchers | Tasha's Cauldron of Everything\nOathbreaker | Dungeon Master's Guide\nArchived Unearthed Arcana\nTreachery | Unearthed Arcana 26 - Paladin\nRedemption | Unearthed Arcana 35 - A Trio of Subclasses\nWatchers | Unearthed Arcana 67 - Subclasses, Part 1\nHeroism | Unearthed Arcana 62 - Bard and Paladin\nOATH SPELLS\nEach oath has a list of associated spells. You gain access to these spells at the levels specified in the oath description. Once you gain access to an oath spell, you always have it prepared. Oath spells don't count against the number of spells you can prepare each day.\nIf you gain an oath spell that doesn't appear on the paladin spell list, the spell is nonetheless a paladin spell for you.\nCHANNEL DIVINITY\nYour oath allows you to channel divine energy to fuel magical effects. Each Channel Divinity option provided by your oath explains how to use it.\nWhen you use your Channel Divinity, you choose which option to use. You must then finish a short or long rest to use your Channel Divinity again.\nSome Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your paladin spell save DC."
		},
		{
			"name": "Harness Divine Power",
			"levels": [
				3
			],
			"optional": true,
			"description": "Also at 3rd level, you can expend a use of your Channel Divinity to fuel your spells. As a bonus action, you touch your holy symbol, utter a prayer, and regain one expended spell slot, the level of which can be no higher than half your proficiency bonus (rounded up). The number of times you can use this feature is based on the level you've reached in this class: 3rd level, once; 7th level, twice; and 15th level, thrice. You regain all expended uses when you finish a long rest."
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
			"description": "Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace a fighting style you know with another fighting style available to paladins. This replacement represents a shift of focus in your martial practice."
		},
		{
			"name": "Extra Attack",
			"levels": [
				5
			],
			"description": "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn."
		},
		{
			"name": "Aura of Protection",
			"levels": [
				6
			],
			"description": "Starting at 6th level, whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1). You must be conscious to grant this bonus.\nAt 18th level, the range of this aura increases to 30 feet."
		},
		{
			"name": "Aura of Courage",
			"levels": [
				10
			],
			"description": "Starting at 10th level, you and friendly creatures within 10 feet of you can't be frightened while you are conscious.\nAt 18th level, the range of this aura increases to 30 feet."
		},
		{
			"name": "Improved Divine Smite",
			"levels": [
				11
			],
			"description": "By 11th level, you are so suffused with righteous might that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage."
		},
		{
			"name": "Cleansing Touch",
			"levels": [
				14
			],
			"description": "Beginning at 14th level, you can use your action to end one spell on yourself or on one willing creature that you touch.\nYou can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain expended uses when you finish a long rest."
		}
	],
	"subclasses": [
		{
			"name": "Ancients",
			"slug": "ancients",
			"source": "Player's Handbook",
			"summary": "The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of the light in the cosmic struggle against darkness because they love the beautiful and life-giving things of the world, not necessarily because they believe in principles of honor, courage, and justice. They adorn their armor and clothing with images of growing things-leaves, antlers, or flowers-to reflect their commitment to preserving life and light in the world.",
			"features": [
				{
					"name": "Tenets of the Ancients",
					"level": 3,
					"description": "The tenets of the Oath of the Ancients have been preserved for uncounted centuries. This oath emphasizes the principles of good above any concerns of law or chaos. Its four central principles are simple.\nKindle the Light. Through your acts of mercy, kindness, and forgiveness, kindle the light of hope in the world, beating back despair.\nShelter the Light. Where there is good, beauty, love, and laughter in the world, stand against the wickedness that would swallow it. Where life flourishes, stand against the forces that would render it barren.\nPreserve Your Own Light. Delight in song and laughter, in beauty and art. If you allow the light to die in your own heart, you can't preserve it in the world.\nBe the Light. Be a glorious beacon for all who live in despair. Let the light of your joy and courage shine forth in all your deeds.",
					"options": [
						{
							"name": "Kindle the Light",
							"description": "Through your acts of mercy, kindness, and forgiveness, kindle the light of hope in the world, beating back despair."
						},
						{
							"name": "Shelter the Light",
							"description": "Where there is good, beauty, love, and laughter in the world, stand against the wickedness that would swallow it. Where life flourishes, stand against the forces that would render it barren."
						},
						{
							"name": "Preserve Your Own Light",
							"description": "Delight in song and laughter, in beauty and art. If you allow the light to die in your own heart, you can't preserve it in the world."
						},
						{
							"name": "Be the Light",
							"description": "Be a glorious beacon for all who live in despair. Let the light of your joy and courage shine forth in all your deeds."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of the Ancients Spells\nPaladin Level | Spells\n3rd | Ensnaring Strike, Speak with Animals\n5th | Moonbeam, Misty Step\n9th | Plant Growth, Protection from Energy\n13th | Ice Storm, Stoneskin\n17th | Commune with Nature, Tree Stride"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Nature's Wrath. You can use your Channel Divinity to invoke primeval forces to ensnare a foe. As an action, you can cause spectral vines to spring up and reach for a creature within 10 feet of you that you can see. The creature must succeed on a Strength or Dexterity saving throw (its choice) or be restrained. While restrained by the vines, the creature repeats the saving throw at the end of each of its turns. On a success, it frees itself and the vines vanish.\n• Turn the Faithless. You can use your Channel Divinity to utter ancient words that are painful for fey and fiends to hear. As an action, you present your holy symbol, and each fey or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.\nIf the creature's true form is concealed by an illusion, shapeshifting, or other effect, that form is revealed while it is turned."
				},
				{
					"name": "Aura of Warding",
					"level": 7,
					"description": "Beginning at 7th level, ancient magic lies so heavily upon you that it forms an eldritch ward. You and friendly creatures within 10 feet of you have resistance to damage from spells.\nAt 18th level, the range of this aura increases to 30 feet."
				},
				{
					"name": "Undying Sentinel",
					"level": 15,
					"description": "Starting at 15th level, when you are reduced to 0 hit points and are not killed outright, you can choose to drop to 1 hit point instead. Once you use this ability, you can't use it again until you finish a long rest.\nAdditionally, you suffer none of the drawbacks of old age, and you can't be aged magically."
				},
				{
					"name": "Elder Champion",
					"level": 20,
					"description": "At 20th level, you can assume the form of an ancient force of nature, taking on an appearance you choose. For example, your skin might turn green or take on a bark-like texture, your hair might become leafy or moss-like, or you might sprout antlers or a lion-like mane.\nUsing your action, you undergo a transformation. For 1 minute, you gain the following benefits:\n• At the start of each of your turns, you regain 10 hit points.\n• Whenever you cast a paladin spell that has a casting time of 1 action, you can cast it using a bonus action instead.\n• Enemy creatures within 10 feet of you have disadvantage on saving throws against your paladin spells and Channel Divinity options.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Conquest",
			"slug": "conquest",
			"source": "Xanathar's Guide to Everything",
			"summary": "The Oath of Conquest calls to paladins who seek glory in battle and the subjugation of their enemies. It isn't enough for these paladins to establish order. They must crush the forces of chaos. Sometimes called knight tyrants or iron mongers, those who swear this oath gather into grim orders that serve gods or philosophies of war and well-ordered might.\nSome of these paladins go so far as to consort with the powers of the Nine Hells, valuing the rule of law over the balm of mercy. The archdevil Bel, warlord of Avernus, counts many of these paladins – called hell knights – as his most ardent supporters. Hell knights cover their armor with trophies taken from fallen enemies, a grim warning to any who dare oppose them and the decrees of their lords. These knights are often most fiercely resisted by other paladins of this oath, who believe that the hell knights have wandered too far into darkness.",
			"features": [
				{
					"name": "Tenets of Conquest",
					"level": 3,
					"description": "A paladin who takes this oath has the tenets of conquest seared on the upper arm.\nDouse the Flame of Hope. It is not enough to merely defeat an enemy in battle. Your victory must be so overwhelming that your enemies' will to fight is shattered forever. A blade can end a life. Fear can end an empire.\nRule with an Iron Fist. Once you have conquered, tolerate no dissent. Your word is law. Those who obey it shall be favored. Those who defy it shall be punished as an example to all who might follow.\nStrength Above All. You shall rule until a stronger one arises. Then you must grow mightier and meet the challenge, or fall to your own ruin.",
					"options": [
						{
							"name": "Douse the Flame of Hope",
							"description": "It is not enough to merely defeat an enemy in battle. Your victory must be so overwhelming that your enemies' will to fight is shattered forever. A blade can end a life. Fear can end an empire."
						},
						{
							"name": "Rule with an Iron Fist",
							"description": "Once you have conquered, tolerate no dissent. Your word is law. Those who obey it shall be favored. Those who defy it shall be punished as an example to all who might follow."
						},
						{
							"name": "Strength Above All",
							"description": "You shall rule until a stronger one arises. Then you must grow mightier and meet the challenge, or fall to your own ruin."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of Conquest Spells\nPaladin Level | Spells\n3rd | Armor of Agathys, Command\n5th | Hold Person, Spiritual Weapon\n9th | Bestow Curse, Fear\n13th | Dominate Beast, Stoneskin\n17th | Cloudkill, Dominate Person"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Conquering Presence. You can use your Channel Divinity to exude a terrifying presence. As an action, you force each creature of your choice that you can see within 30 feet of you to make a Wisdom saving throw. On a failed save, a creature becomes frightened of you for 1 minute. The frightened creature can repeat this saving throw at the end of each of its turns, ending the effect on itself on a success.\n• Guided Strike. You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses."
				},
				{
					"name": "Aura of Conquest",
					"level": 7,
					"description": "Starting at 7th level, you constantly emanate a menacing aura while you're not incapacitated. The aura extends 10 feet from you in every direction, but not through total cover.\nIf a creature is frightened of you, its speed is reduced to 0 while in the aura, and that creature takes psychic damage equal to half your paladin level if it starts its turn there.\nAt 18th level, the range of this aura increases to 30 feet."
				},
				{
					"name": "Scornful Rebuke",
					"level": 15,
					"description": "Starting at 15th level, those who dare to strike you are psychically punished for their audacity. Whenever a creature hits you with an attack, that creature takes psychic damage equal to your Charisma modifier (minimum of 1) if you're not incapacitated."
				},
				{
					"name": "Invincible Conqueror",
					"level": 20,
					"description": "At 20th level, you gain the ability to harness extraordinary martial prowess. As an action, you can magically become an avatar of conquest, gaining the following benefits for 1 minute:\n• You have resistance to all damage.\n• When you take the Attack action on your turn, you can make one additional attack as part of that action.\n• Your melee weapon attacks score a critical hit on a roll of 19 or 20 on the d20.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Crown",
			"slug": "crown",
			"source": "Sword Coast Adventurer's Guide",
			"summary": "The Oath of the Crown is sworn to the ideals of civilization, be it the spirit of a nation, fealty to a sovereign, or service to a deity of law and rulership. The paladins who swear this oath dedicate themselves to serving society and, in particular, the just laws that hold society together. These paladins are the watchful guardians on the walls, standing against the chaotic tides of barbarism that threaten to tear down all that civilization has built, and are commonly known as guardians, exemplars, or sentinels. Often, paladins who swear this oath are members of an order of knighthood in service to a nation or a sovereign, and undergo their oath as part of their admission to the order's ranks.",
			"features": [
				{
					"name": "Tenets of the Crown",
					"level": 3,
					"description": "The tenets of the Oath of the Crown are often set by the sovereign to which their oath is sworn, but generally emphasize the following tenets.\nLaw. The law is paramount. It is the mortar that holds the stones of civilization together, and it must be respected.\nLoyalty. Your word is your bond. Without loyalty, oaths and laws are meaningless.\nCourage. You must be willing to do what needs to be done for the sake of order, even in the face of overwhelming odds. If you don't act, then who will?\nResponsibility. You must deal with the consequences of your actions, and you are responsible for fulfilling your duties and obligations.",
					"options": [
						{
							"name": "Law",
							"description": "The law is paramount. It is the mortar that holds the stones of civilization together, and it must be respected."
						},
						{
							"name": "Loyalty",
							"description": "Your word is your bond. Without loyalty, oaths and laws are meaningless."
						},
						{
							"name": "Courage",
							"description": "You must be willing to do what needs to be done for the sake of order, even in the face of overwhelming odds. If you don't act, then who will?"
						},
						{
							"name": "Responsibility",
							"description": "You must deal with the consequences of your actions, and you are responsible for fulfilling your duties and obligations."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of the Crown Spells\nPaladin Level | Spells\n3rd | Command, Compelled Duel\n5th | Warding Bond, Zone of Truth\n9th | Aura of Vitality, Spirit Guardians\n13th | Banishment, Guardian of Faith\n17th | Circle of Power, Geas"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Champion Challenge. As a bonus action, you issue a challenge that compels other creatures to do battle with you. Each creature of your choice that you can see within 30 feet of you must make a Wisdom saving throw. On a failed save, a creature can't willingly move more than 30 feet away from you. This effect ends on the creature if you are incapacitated or die or if the creature is more than 30 feet away from you.\n• Turn the Tide. As a bonus action, you can bolster injured creatures with your Channel Divinity. Each creature of your choice that can hear you within 30 feet of you regains hit points equal to 1d6 + your Charisma modifier (minimum of 1) if it has no more than half of its hit points."
				},
				{
					"name": "Divine Allegiance",
					"level": 7,
					"description": "Starting at 7th level, when a creature within 5 feet of you takes damage, you can use your reaction to magically substitute your own health for that of the target creature, causing that creature not to take the damage. Instead, you take the damage. This damage to you can't be reduced or prevented in any way."
				},
				{
					"name": "Unyielding Saint",
					"level": 15,
					"description": "Starting at 15th level, you have advantage on saving throws to avoid becoming paralyzed or stunned."
				},
				{
					"name": "Exalted Champion",
					"level": 20,
					"description": "At 20th level, your presence on the field of battle is an inspiration to those dedicated to your cause. You can use your action to gain the following benefits for 1 hour:\n• You have resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.\n• Your allies have advantage on death saving throws while within 30 feet of you.\n• You have advantage on Wisdom saving throws, as do your allies within 30 feet of you.\nThis effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Devotion",
			"slug": "devotion",
			"source": "Player's Handbook",
			"summary": "The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor, acting with honor in pursuit of justice and the greater good. They hold themselves to the highest standards of conduct, and some, for better or worse, hold the rest of the world to the same standards. Many who swear this oath are devoted to gods of law and good and use their gods' tenets as the measure of their devotion. They hold angels – the perfect servants of good – as their ideals, and incorporate images of angelic wings into their helmets or coats of arms.",
			"features": [
				{
					"name": "Tenets of Devotion",
					"level": 3,
					"description": "Though the exact words and strictures of the Oath of Devotion vary, paladins of this oath share these tenets.\nHonesty. Don't lie or cheat. Let your word be your promise.\nCourage. Never fear to act, though caution is wise.\nCompassion. Aid others, protect the weak, and punish those who threaten them. Show mercy to your foes, but temper it with wisdom.\nHonor. Treat others with fairness, and let your honorable deeds be an example to them. Do as much good as possible while causing the least amount of harm.\nDuty. Be responsible for your actions and their consequences, protect those entrusted to your care, and obey those who have just authority over you.",
					"options": [
						{
							"name": "Honesty",
							"description": "Don't lie or cheat. Let your word be your promise."
						},
						{
							"name": "Courage",
							"description": "Never fear to act, though caution is wise."
						},
						{
							"name": "Compassion",
							"description": "Aid others, protect the weak, and punish those who threaten them. Show mercy to your foes, but temper it with wisdom."
						},
						{
							"name": "Honor",
							"description": "Treat others with fairness, and let your honorable deeds be an example to them. Do as much good as possible while causing the least amount of harm."
						},
						{
							"name": "Duty",
							"description": "Be responsible for your actions and their consequences, protect those entrusted to your care, and obey those who have just authority over you."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of Devotion Spells\nPaladin Level | Spells\n3rd | Protection from Evil and Good, Sanctuary\n5th | Lesser Restoration, Zone of Truth\n9th | Beacon of Hope, Dispel Magic\n13th | Freedom of Movement, Guardian of Faith\n17th | Commune, Flame Strike"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Sacred Weapon. As an action, you can imbue one weapon that you are holding with positive energy, using your Channel Divinity. For 1 minute, you add your Charisma modifier to attack rolls made with that weapon (with a minimum bonus of +1). The weapon also emits bright light in a 20-foot radius and dim light 20 feet beyond that. If the weapon is not already magical, it becomes magical for the duration.\nYou can end this effect on your turn as part of any other action. If you are no longer holding or carrying this weapon, or if you fall unconscious, this effect ends.\n• Turn the Unholy. As an action, you present your holy symbol and speak a prayer censuring fiends and undead, using your Channel Divinity. Each fiend or undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action."
				},
				{
					"name": "Aura of Devotion",
					"level": 7,
					"description": "Starting at 7th level, you and friendly creatures within 10 feet of you can't be charmed while you are conscious.\nAt 18th level, the range of this aura increases to 30 feet."
				},
				{
					"name": "Purity of Spirit",
					"level": 15,
					"description": "Beginning at 15th level, you are always under the effects of a Protection from Evil and Good spell."
				},
				{
					"name": "Holy Nimbus",
					"level": 20,
					"description": "At 20th level, as an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius, and dim light shines 30 feet beyond that.\nWhenever an enemy creature starts its turn in the bright light, the creature takes 10 radiant damage.\nIn addition, for the duration, you have advantage on saving throws against spells cast by fiends or undead.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Glory",
			"slug": "glory",
			"source": "Mythic Odysseys of Theros, Tasha's Cauldron of Everything",
			"summary": "Paladins who take the Oath of Glory believe they and their companions are destined to achieve glory through deeds of heroism. They train diligently and encourage their companions so they're all ready when destiny calls.",
			"features": [
				{
					"name": "Tenets Of Glory",
					"level": 3,
					"description": "The tenets of the Oath of Glory drive a paladin to attempt heroics that might one day shine in legend.\nActions over Words. Strive to be known by glorious deeds, not words.\nChallenges Are but Tests. Face hardships with courage, and encourage your allies to face them with you.\nHone the Body. Like raw stone, your body must be worked so its potential can be realized.\nDiscipline the Soul. You must marshal the discipline to overcome failings within yourself that threaten to dim the glory of you and your friends.",
					"options": [
						{
							"name": "Actions over Words",
							"description": "Strive to be known by glorious deeds, not words."
						},
						{
							"name": "Challenges Are but Tests",
							"description": "Face hardships with courage, and encourage your allies to face them with you."
						},
						{
							"name": "Hone the Body",
							"description": "Like raw stone, your body must be worked so its potential can be realized."
						},
						{
							"name": "Discipline the Soul",
							"description": "You must marshal the discipline to overcome failings within yourself that threaten to dim the glory of you and your friends."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of Glory Spells\nPaladin Level | Spells\n3rd | Guiding Bolt, Heroism\n5th | Enhance Ability, Magic Weapon\n9th | Haste, Protection From Energy\n13th | Compulsion, Freedom Of Movement\n17th | Commune, Flame Strike"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options. See the Sacred Oath class feature for how Channel Divinity works.\n• Peerless Athlete. As a bonus action, you can use your Channel Divinity to augment your athleticism. For the next 10 minutes, you have advantage on Strength (Athletics) and Dexterity (Acrobatics) checks; you can carry, push, drag, and lift twice as much weight as normal; and the distance of your long and high jumps increases by 10 feet (this extra distance costs movement as normal).\n• Inspiring Smite. Immediately after you deal damage to a creature with your Divine Smite feature, you can use your Channel Divinity as a bonus action and distribute temporary hit points to creatures of your choice within 30 feet of you, which can include you. The total number of temporary hit points equals 2d8 + your level in this class, divided among the chosen creatures however you like."
				},
				{
					"name": "Aura of Alacrity",
					"level": 7,
					"description": "At 7th level, you emanate an aura that fills you and your companions with supernatural speed, allowing you to race across a battlefield in formation. Your walking speed increases by 10 feet. In addition, if you aren't incapacitated, the walking speed of any ally who starts their turn within 5 feet of you increases by 10 feet until the end of that turn.\nWhen you reach 18th level in this class, the range of the aura increases to 10 feet."
				},
				{
					"name": "Glorious Defense",
					"level": 15,
					"description": "When you reach 15th level, you can turn defense into a sudden strike. When you or another creature you can see within 10 feet of you is hit by an attack roll, you can use your reaction to grant a bonus to the target's AC against that attack, potentially causing it to miss. The bonus equals your Charisma modifier (minimum of +1). If the attack misses, you can make one weapon attack against the attacker as part of this reaction, provided the attacker is within your weapon's range.\nYou can use this feature a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest."
				},
				{
					"name": "Living Legend",
					"level": 20,
					"description": "At 20th level, you can empower yourself with the legends — whether true or exaggerated — of your great deeds. As a bonus action, you gain the following benefits for 1 minute:\n• You are blessed with an otherworldly presence, gaining advantage on all Charisma checks.\n• Once on each of your turns when you make a weapon attack and miss, you can cause that attack to hit instead.\n• If you fail a saving throw, you can use your reaction to reroll it. You must use this new roll.\nOnce you use this feature, you can't use it again until you finish a long rest, unless you expend a 5th-level spell slot to use it again."
				}
			]
		},
		{
			"name": "Redemption",
			"slug": "redemption",
			"source": "Xanathar's Guide to Everything",
			"summary": "The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort. Paladins who dedicate themselves to this oath believe that any person can be redeemed and that the path of benevolence and justice is one that anyone can walk. These paladins face evil creatures in the hope of turning them to the light, and the paladins slay them only when such a deed will clearly save other lives. Paladins who follow this path are known as redeemers.\nRedeemers know that undead, demons, devils, and other supernatural threats can be inherently evil. Against such foes, the paladins bring the full wrath of their weapons and spells to bear. Yet the redeemers still pray that, one day, even creatures of wickedness will invite their own redemption.",
			"features": [
				{
					"name": "Tenets of Redemption",
					"level": 3,
					"description": "The tenets of the Oath of Redemption hold a paladin to a high standard of peace and justice.\nPeace. Violence is a weapon of last resort. Diplomacy and understanding are the paths to long-lasting peace.\nInnocence. All people begin life in an innocent state, and it is their environment or the influence of dark forces that drives them to evil. By setting the proper example, and working to heal the wounds of a deeply flawed world, you can set anyone on a righteous path.\nPatience. Change takes time. Those who have walked the path of the wicked must be given reminders to keep them honest and true. Once you have planted the seed of righteousness in a creature, you must work day after day to allow it to survive and then flourish.\nWisdom. Your heart and mind must stay clear, for eventually you will be forced to admit defeat. While every creature can be redeemed, some are so far along the path of evil that you have no choice but to end their lives for the greater good. Any such action must be carefully weighed and the consequences fully understood, but once you have made the decision, follow through with it knowing your path is just.",
					"options": [
						{
							"name": "Peace",
							"description": "Violence is a weapon of last resort. Diplomacy and understanding are the paths to long-lasting peace."
						},
						{
							"name": "Innocence",
							"description": "All people begin life in an innocent state, and it is their environment or the influence of dark forces that drives them to evil. By setting the proper example, and working to heal the wounds of a deeply flawed world, you can set anyone on a righteous path."
						},
						{
							"name": "Patience",
							"description": "Change takes time. Those who have walked the path of the wicked must be given reminders to keep them honest and true. Once you have planted the seed of righteousness in a creature, you must work day after day to allow it to survive and then flourish."
						},
						{
							"name": "Wisdom",
							"description": "Your heart and mind must stay clear, for eventually you will be forced to admit defeat. While every creature can be redeemed, some are so far along the path of evil that you have no choice but to end their lives for the greater good. Any such action must be carefully weighed and the consequences fully understood, but once you have made the decision, follow through with it knowing your path is just."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of Redemption Spells\nPaladin Level | Spells\n3rd | Sanctuary, Sleep\n5th | Calm Emotions, Hold Person\n9th | Counterspell, Hypnotic Pattern\n13th | Otiluke's Resilient Sphere, Stoneskin\n17th | Hold Monster, Wall of Force"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Emissary of Peace. You can use your Channel Divinity to augment your presence with divine power. As a bonus action, you grant yourself a +5 bonus to Charisma (Persuasion) checks for the next 10 minutes.\n• Rebuke the Violent. You can use your Channel Divinity to rebuke those who use violence. Immediately after an attacker within 30 feet of you deals damage with an attack against a creature other than you, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes radiant damage equal to the damage it just dealt. On a successful save, it takes half as much damage."
				},
				{
					"name": "Aura of the Guardian",
					"level": 7,
					"description": "Starting at 7th level, you can shield your allies from harm at the cost of your own health. When a creature within 10 feet of you takes damage, you can use your reaction to magically take that damage, instead of that creature taking it. This feature doesn't transfer any other effects that might accompany the damage, and this damage can't be reduced in any way.\nAt 18th level, the range of this aura increases to 30 feet."
				},
				{
					"name": "Protective Spirit",
					"level": 15,
					"description": "Starting at 15th level, a holy presence mends your wounds in combat. You regain hit points equal to 1d6 + half your paladin level if you end your turn in combat with fewer than half of your hit points remaining and you aren't incapacitated."
				},
				{
					"name": "Emissary of Redemption",
					"level": 20,
					"description": "At 20th level, you become an avatar of peace, which gives you two benefits:\n• You have resistance to all damage dealt by other creatures (their attacks, spells, and other effects).\n• Whenever a creature hits you with an attack, it takes radiant damage equal to half the damage you take from the attack.\nIf you attack a creature, cast a spell on it, or deal damage to it by any means but this feature, neither benefit works against that creature until you finish a long rest."
				}
			]
		},
		{
			"name": "Vengeance",
			"slug": "vengeance",
			"source": "Player's Handbook",
			"summary": "The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, when a thieves' guild grows too violent and powerful, when a dragon rampages through the countryside – at times like these, paladins arise and swear an Oath of Vengeance to set right that which has gone wrong. To these paladins – sometimes called avengers or dark knights – their own purity is not as important as delivering justice.",
			"features": [
				{
					"name": "Tenets of Vengeance",
					"level": 3,
					"description": "The tenets of the Oath of Vengeance vary by paladin, but all the tenets revolve around punishing wrongdoers by any means necessary. Paladins who uphold these tenets are willing to sacrifice even their own righteousness to mete out justice upon those who do evil, so the paladins are often neutral or lawful neutral in alignment. The core principles of the tenets are brutally simple.\nFight the Greater Evil. Faced with a choice of fighting my sworn foes or combating a lesser evil, I choose the greater evil.\nNo Mercy for the Wicked. Ordinary foes might win my mercy, but my sworn enemies do not.\nBy Any Means Necessary. My qualms can't get in the way of exterminating my foes.\nRestitution. If my foes wreak ruin on the world, it is because I failed to stop them. I must help those harmed by their misdeeds.",
					"options": [
						{
							"name": "Fight the Greater Evil",
							"description": "Faced with a choice of fighting my sworn foes or combating a lesser evil, I choose the greater evil."
						},
						{
							"name": "No Mercy for the Wicked",
							"description": "Ordinary foes might win my mercy, but my sworn enemies do not."
						},
						{
							"name": "By Any Means Necessary",
							"description": "My qualms can't get in the way of exterminating my foes."
						},
						{
							"name": "Restitution",
							"description": "If my foes wreak ruin on the world, it is because I failed to stop them. I must help those harmed by their misdeeds."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of Vengeance Spells\nPaladin Level | Spells\n3rd | Bane, Hunter's Mark\n5th | Hold Person, Misty Step\n9th | Haste, Protection from Energy\n13th | Banishment, Dimension Door\n17th | Hold Monster, Scrying"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Abjure Enemy. As an action, you present your holy symbol and speak a prayer of denunciation, using your Channel Divinity. Choose one creature within 60 feet of you that you can see. That creature must make a Wisdom saving throw, unless it is immune to being frightened. Fiends and undead have disadvantage on this saving throw.\nOn a failed save, the creature is frightened for 1 minute or until it takes any damage. While frightened, the creature's speed is 0, and it can't benefit from any bonus to its speed.\nOn a successful save, the creature's speed is halved for 1 minute or until the creature takes any damage.\n• Vow of Enmity. As a bonus action, you can utter a vow of enmity against a creature you can see within 10 feet of you, using your Channel Divinity. You gain advantage on attack rolls against the creature for 1 minute or until it drops to 0 hit points or falls unconscious.",
					"options": [
						{
							"name": "Abjure Enemy",
							"description": "As an action, you present your holy symbol and speak a prayer of denunciation, using your Channel Divinity. Choose one creature within 60 feet of you that you can see. That creature must make a Wisdom saving throw, unless it is immune to being frightened. Fiends and undead have disadvantage on this saving throw."
						},
						{
							"name": "Vow of Enmity",
							"description": "As a bonus action, you can utter a vow of enmity against a creature you can see within 10 feet of you, using your Channel Divinity. You gain advantage on attack rolls against the creature for 1 minute or until it drops to 0 hit points or falls unconscious."
						}
					]
				},
				{
					"name": "Relentless Avenger",
					"level": 7,
					"description": "By 7th level, your supernatural focus helps you close off a foe's retreat. When you hit a creature with an opportunity attack, you can move up to half your speed immediately after the attack and as part of the same reaction. This movement doesn't provoke opportunity attacks."
				},
				{
					"name": "Soul of Vengeance",
					"level": 15,
					"description": "Starting at 15th level, the authority with which you speak your Vow of Enmity gives you greater power over your foe. When a creature under the effect of your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against that creature if it is within range."
				},
				{
					"name": "Avenging Angel",
					"level": 20,
					"description": "At 20th level, you can assume the form of an angelic avenger. Using your action, you undergo a transformation. For 1 hour, you gain the following benefits:\n• Wings sprout from your back and grant you a flying speed of 60 feet.\n• You emanate an aura of menace in a 30-foot radius. The first time any enemy creature enters the aura or starts its turn there during a battle, the creature must succeed on a Wisdom saving throw or become frightened of you for 1 minute or until it takes any damage. Attack rolls against the frightened creature have advantage.\nOnce you use this feature, you can't use it again until you finish a long rest."
				}
			]
		},
		{
			"name": "Watchers",
			"slug": "watchers",
			"source": "Tasha's Cauldron of Everything",
			"summary": "The Oath of the Watchers binds paladins to protect mortal realms from the predations of extraplanar creatures, many of which can lay waste to mortal soldiers. Thus, the Watchers hone their minds, spirits, and bodies to be the ultimate weapons against such threats.\nPaladins who follow the Watchers' oath are ever vigilant in spotting the influence of extraplanar forces, often establishing a network of spies and informants to gather information on suspected cults. To a Watcher, keeping a healthy suspicion and awareness about one's surroundings is as natural as wearing armor in battle.",
			"features": [
				{
					"name": "Tenets of the Watchers",
					"level": 3,
					"description": "A paladin who assumes the Oath of the Watchers swears to safeguard mortal realms from otherwordly threats.\nVigilance. The threats you face are cunning, powerful, and subversive. Be ever alert for their corruption.\nLoyalty. Never accept gifts or favors from fiends or those who truck with them. Stay true to your order, your comrades, and your duty.\nDiscipline. You are the shield against the endless terrors that lie beyond the stars. Your blade must be forever sharp and your mind keen to survive what lies beyond.",
					"options": [
						{
							"name": "Vigilance",
							"description": "The threats you face are cunning, powerful, and subversive. Be ever alert for their corruption."
						},
						{
							"name": "Loyalty",
							"description": "Never accept gifts or favors from fiends or those who truck with them. Stay true to your order, your comrades, and your duty."
						},
						{
							"name": "Discipline",
							"description": "You are the shield against the endless terrors that lie beyond the stars. Your blade must be forever sharp and your mind keen to survive what lies beyond."
						}
					]
				},
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOath of the Watchers Spells\nPaladin Level | Spells\n3rd | Alarm, Detect Magic\n5th | Moonbeam, See Invisibility\n9th | Counterspell, Nondetection\n13th | Aura of Purity, Banishment\n17th | Hold Monster, Scrying"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options. See the Sacred Oath class feature for how Channel Divinity works.\n• Watcher's Will. You can use your Channel Divinity to invest your presence with the warding power of your faith. As an action, you can choose a number of creatures you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). For 1 minute, you and the chosen creatures have advantage on Intelligence, Wisdom, and Charisma saving throws.\n• Abjure the Extraplanar. You can use your Channel Divinity to castigate unworldly beings. As an action, you present your holy symbol and each aberration, celestial, elemental, fey, or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage.\nA turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly end its move in a space within 30 feet of you. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can take the Dodge action.",
					"options": [
						{
							"name": "Watcher's Will",
							"description": "You can use your Channel Divinity to invest your presence with the warding power of your faith. As an action, you can choose a number of creatures you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). For 1 minute, you and the chosen creatures have advantage on Intelligence, Wisdom, and Charisma saving throws."
						},
						{
							"name": "Abjure the Extraplanar",
							"description": "You can use your Channel Divinity to castigate unworldly beings. As an action, you present your holy symbol and each aberration, celestial, elemental, fey, or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage."
						}
					]
				},
				{
					"name": "Aura of the Sentinel",
					"level": 7,
					"description": "At 7th level, you emit an aura of alertness while you aren't incapacitated. When you and any creatures of your choice within 10 feet of you roll initiative, you all gain a bonus to initiative equal to your proficiency bonus.\nAt 18th level, the range of this aura increases to 30 feet."
				},
				{
					"name": "Vigilant Rebuke",
					"level": 15,
					"description": "At 15th level, you've learned how to chastise anyone who dares wield beguilements against you and your wards. Whenever you or a creature you can see within 30 feet of you succeeds on an Intelligence, a Wisdom, or a Charisma saving throw, you can use your reaction to deal 2d8 + your Charisma modifier force damage to the creature that forced the saving throw."
				},
				{
					"name": "Mortal Bulwark",
					"level": 20,
					"description": "At 20th level, you manifest a spark of divine power in defense of the mortal realms. As a bonus action, you gain the following benefits for 1 minute:\n• You gain truesight with a range of 120 feet.\n• You have advantage on attack rolls against aberrations, celestials, elementals, fey, and fiends.\n• When you hit a creature with an attack roll and deal damage to it, you can also force it to make a Charisma saving throw against your spell save DC. On a failed save, the creature is magically banished to its native plane of existence if it's currently not there. On a successful save, the creature can't be banished by this feature for 24 hours.\nOnce you use this bonus action, you can't use it again until you finish a long rest, unless you expend a 5th-level spell slot to use it again."
				}
			]
		},
		{
			"name": "Oathbreaker",
			"slug": "oathbreaker",
			"source": "Dungeon Master's Guide",
			"summary": "An oathbreaker is a paladin who breaks their sacred oaths to pursue some dark ambition or serve an evil power. Whatever light burned in the paladin's heart been extinguished. Only darkness remains.",
			"features": [
				{
					"name": "Oath Spells",
					"level": 3,
					"description": "You gain oath spells at the paladin levels listed.\nOathbreaker Spells\nPaladin Level | Spells\n3rd | Hellish Rebuke, Inflict Wounds\n5th | Crown of Madness, Darkness\n9th | Animate Dead, Bestow Curse\n13th | Blight, Confusion\n17th | Contagion, Dominate Person"
				},
				{
					"name": "Channel Divinity",
					"level": 3,
					"description": "When you take this oath at 3rd level, you gain the following two Channel Divinity options.\n• Control Undead. As an action, you target one undead creature you can see within 30 feet of you. The target must make a Wisdom saving throw. On a failed save, the target must obey your commands for the next 24 hours, or until you use this Channel Divinity option again. An undead whose challenge rating is equal to or greater than your paladin level is immune to this effect.\n• Dreadful Aspect. As an action, you channel the darkest emotions and focus them into a burst of magical menace. Each creature of your choice within 30 feet of you must make a Wisdom saving throw if it can see you. On a failed save, the target is frightened of you for 1 minute. If a creature frightened by this effect ends its turn more than 30 feet away from you, it can attempt another Wisdom saving throw to end the effect on it."
				},
				{
					"name": "Aura of Hate",
					"level": 7,
					"description": "Starting at 7th level you, as well any fiends and undead within 10 feet of you, gain a bonus to melee weapon damage rolls equal to your Charisma modifier (minimum of +1). A creature can benefit from this feature from only one paladin at a time.\nAt 18th level, the range of this aura increases to 30 feet."
				},
				{
					"name": "Supernatural Resistance",
					"level": 15,
					"description": "At 15th level, you gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons."
				},
				{
					"name": "Dread Lord",
					"level": 20,
					"description": "At 20th level, you can, as an action, surround yourself with an aura of gloom that lasts for 1 minute. The aura reduces any bright light in a 30-foot radius around you to dim light. Whenever an enemy that is frightened by you starts its turn in the aura, it takes 4d10 psychic damage. Additionally, you and any creatures of your choosing in the aura are draped in deeper shadow. Creatures that rely on sight have disadvantage on attack rolls against creatures draped in this shadow.\nWhile the aura lasts, you can use a bonus action on your turn to cause the shadows in the aura to attack one creature. Make a melee spell attack against the target. If the attack hits, the target takes necrotic damage equal to 3d10 + your Charisma modifier.\nAfter activating the aura, you can't do so again until you finish a long rest."
				}
			]
		}
	]
};

export default paladin;
