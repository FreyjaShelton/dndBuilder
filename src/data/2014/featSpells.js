// Spells granted by 2014 feats, generated from the 5e.tools feat data. Do not edit by hand.
// feat -> { variantLabel, variants: [{ name, ability, fixed: [{ name, use }], picks: [{ count, use, level, classes, schools, ritual, attack, from }] }] }
// A feat with several variants (Magic Initiate's class, Initiate of High Sorcery's moon...) asks for the variant first.
export const featSpells = {
	"Aberrant Dragonmark": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "con",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Sorcerer"
						]
					},
					{
						"count": 1,
						"use": "rest",
						"level": 1,
						"classes": [
							"Sorcerer"
						]
					}
				]
			}
		]
	},
	"Adept of the Black Robes": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 2,
						"schools": [
							"Enchantment",
							"Necromancy"
						]
					}
				]
			}
		]
	},
	"Adept of the Red Robes": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 2,
						"schools": [
							"Illusion",
							"Transmutation"
						]
					}
				]
			}
		]
	},
	"Adept of the White Robes": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 2,
						"schools": [
							"Abjuration",
							"Divination"
						]
					}
				]
			}
		]
	},
	"Artificer Initiate": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "int",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Artificer"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Artificer"
						]
					}
				]
			}
		]
	},
	"Cartomancer": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": null,
				"fixed": [
					{
						"name": "Prestidigitation",
						"use": "known"
					}
				],
				"picks": []
			}
		]
	},
	"Divinely Favored": {
		"variantLabel": "Alignment",
		"variants": [
			{
				"name": "Evil",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Augury",
						"use": "daily"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Cleric"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Warlock"
						]
					}
				]
			},
			{
				"name": "Good",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Augury",
						"use": "daily"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Cleric"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Cleric"
						]
					}
				]
			},
			{
				"name": "Neutral",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Augury",
						"use": "daily"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Cleric"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid"
						]
					}
				]
			}
		]
	},
	"Drow High Magic": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "cha",
				"fixed": [
					{
						"name": "Detect Magic",
						"use": "will"
					},
					{
						"name": "Levitate",
						"use": "daily"
					},
					{
						"name": "Dispel Magic",
						"use": "daily"
					}
				],
				"picks": []
			}
		]
	},
	"Fey Teleportation": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "int",
				"fixed": [
					{
						"name": "Misty Step",
						"use": "daily"
					}
				],
				"picks": []
			}
		]
	},
	"Fey Touched": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "inherit",
				"fixed": [
					{
						"name": "Misty Step",
						"use": "daily"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"schools": [
							"Enchantment",
							"Divination"
						]
					}
				]
			}
		]
	},
	"Gift of the Metallic Dragon": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Cure Wounds",
						"use": "daily"
					}
				],
				"picks": []
			}
		]
	},
	"Initiate of High Sorcery": {
		"variantLabel": "Moon",
		"variants": [
			{
				"name": "Nuitari",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Wizard"
						]
					},
					{
						"count": 2,
						"use": "daily",
						"from": [
							"Dissonant Whispers",
							"False Life",
							"Hex",
							"Ray of Sickness"
						]
					}
				]
			},
			{
				"name": "Lunitari",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Wizard"
						]
					},
					{
						"count": 2,
						"use": "daily",
						"from": [
							"Color Spray",
							"Disguise Self",
							"Feather Fall",
							"Longstrider"
						]
					}
				]
			},
			{
				"name": "Solinari",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Wizard"
						]
					},
					{
						"count": 2,
						"use": "daily",
						"from": [
							"Comprehend Languages",
							"Detect Evil and Good",
							"Protection from Evil and Good",
							"Shield"
						]
					}
				]
			}
		]
	},
	"Magic Initiate": {
		"variantLabel": "Spell list",
		"variants": [
			{
				"name": "Bard",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "known",
						"level": 0,
						"classes": [
							"Bard"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard"
						]
					}
				]
			},
			{
				"name": "Cleric",
				"ability": "wis",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "known",
						"level": 0,
						"classes": [
							"Cleric"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Cleric"
						]
					}
				]
			},
			{
				"name": "Druid",
				"ability": "wis",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "known",
						"level": 0,
						"classes": [
							"Druid"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid"
						]
					}
				]
			},
			{
				"name": "Sorcerer",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "known",
						"level": 0,
						"classes": [
							"Sorcerer"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Sorcerer"
						]
					}
				]
			},
			{
				"name": "Warlock",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "known",
						"level": 0,
						"classes": [
							"Warlock"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Warlock"
						]
					}
				]
			},
			{
				"name": "Wizard",
				"ability": "int",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "known",
						"level": 0,
						"classes": [
							"Wizard"
						]
					},
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Wizard"
						]
					}
				]
			}
		]
	},
	"Outlands Envoy": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": null,
				"fixed": [
					{
						"name": "Misty Step",
						"use": "daily"
					},
					{
						"name": "Tongues",
						"use": "daily"
					}
				],
				"picks": []
			}
		]
	},
	"Ritual Caster": {
		"variantLabel": "Spell list",
		"variants": [
			{
				"name": "Bard",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard"
						],
						"ritual": true
					}
				]
			},
			{
				"name": "Cleric",
				"ability": "wis",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "daily",
						"level": 1,
						"classes": [
							"Cleric"
						],
						"ritual": true
					}
				]
			},
			{
				"name": "Druid",
				"ability": "wis",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid"
						],
						"ritual": true
					}
				]
			},
			{
				"name": "Sorcerer",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "daily",
						"level": 1,
						"classes": [
							"Sorcerer"
						],
						"ritual": true
					}
				]
			},
			{
				"name": "Warlock",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "daily",
						"level": 1,
						"classes": [
							"Warlock"
						],
						"ritual": true
					}
				]
			},
			{
				"name": "Wizard",
				"ability": "int",
				"fixed": [],
				"picks": [
					{
						"count": 2,
						"use": "daily",
						"level": 1,
						"classes": [
							"Wizard"
						],
						"ritual": true
					}
				]
			}
		]
	},
	"Scion of the Outer Planes": {
		"variantLabel": "Plane",
		"variants": [
			{
				"name": "Chaotic Outer Plane",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Minor Illusion",
						"use": "known"
					}
				],
				"picks": []
			},
			{
				"name": "Evil Outer Plane",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Chill Touch",
						"use": "known"
					}
				],
				"picks": []
			},
			{
				"name": "Good Outer Plane",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Sacred Flame",
						"use": "known"
					}
				],
				"picks": []
			},
			{
				"name": "Lawful Outer Plane",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Guidance",
						"use": "known"
					}
				],
				"picks": []
			},
			{
				"name": "The Outlands",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Mage Hand",
						"use": "known"
					}
				],
				"picks": []
			}
		]
	},
	"Shadow Touched": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "inherit",
				"fixed": [
					{
						"name": "Invisibility",
						"use": "daily"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"schools": [
							"Illusion",
							"Necromancy"
						]
					}
				]
			}
		]
	},
	"Spell Sniper": {
		"variantLabel": "Spell list",
		"variants": [
			{
				"name": "Bard",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Bard"
						],
						"attack": true
					}
				]
			},
			{
				"name": "Cleric",
				"ability": "wis",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Cleric"
						],
						"attack": true
					}
				]
			},
			{
				"name": "Druid",
				"ability": "wis",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Druid"
						],
						"attack": true
					}
				]
			},
			{
				"name": "Sorcerer",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Sorcerer"
						],
						"attack": true
					}
				]
			},
			{
				"name": "Warlock",
				"ability": "cha",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Warlock"
						],
						"attack": true
					}
				]
			},
			{
				"name": "Wizard",
				"ability": "int",
				"fixed": [],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Wizard"
						],
						"attack": true
					}
				]
			}
		]
	},
	"Strixhaven Initiate": {
		"variantLabel": "College",
		"variants": [
			{
				"name": "Lorehold 1",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Light",
						"use": "known"
					},
					{
						"name": "Sacred Flame",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Cleric",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Lorehold 2",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Light",
						"use": "known"
					},
					{
						"name": "Thaumaturgy",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Cleric",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Lorehold 3",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Sacred Flame",
						"use": "known"
					},
					{
						"name": "Thaumaturgy",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Cleric",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Prismari 1",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Fire Bolt",
						"use": "known"
					},
					{
						"name": "Prestidigitation",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard",
							"Sorcerer"
						]
					}
				]
			},
			{
				"name": "Prismari 2",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Fire Bolt",
						"use": "known"
					},
					{
						"name": "Ray of Frost",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard",
							"Sorcerer"
						]
					}
				]
			},
			{
				"name": "Prismari 3",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Prestidigitation",
						"use": "known"
					},
					{
						"name": "Ray of Frost",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard",
							"Sorcerer"
						]
					}
				]
			},
			{
				"name": "Quandrix 1",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Druidcraft",
						"use": "known"
					},
					{
						"name": "Guidance",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Quandrix 2",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Druidcraft",
						"use": "known"
					},
					{
						"name": "Mage Hand",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Quandrix 3",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Guidance",
						"use": "known"
					},
					{
						"name": "Mage Hand",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Silverquill 1",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Sacred Flame",
						"use": "known"
					},
					{
						"name": "Thaumaturgy",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard",
							"Cleric"
						]
					}
				]
			},
			{
				"name": "Silverquill 2",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Sacred Flame",
						"use": "known"
					},
					{
						"name": "Vicious Mockery",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard",
							"Cleric"
						]
					}
				]
			},
			{
				"name": "Silverquill 3",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Thaumaturgy",
						"use": "known"
					},
					{
						"name": "Vicious Mockery",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Bard",
							"Cleric"
						]
					}
				]
			},
			{
				"name": "Witherbloom 1",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Chill Touch",
						"use": "known"
					},
					{
						"name": "Druidcraft",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Witherbloom 2",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Chill Touch",
						"use": "known"
					},
					{
						"name": "Spare the Dying",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid",
							"Wizard"
						]
					}
				]
			},
			{
				"name": "Witherbloom 3",
				"ability": {
					"choose": [
						"int",
						"wis",
						"cha"
					]
				},
				"fixed": [
					{
						"name": "Druidcraft",
						"use": "known"
					},
					{
						"name": "Spare the Dying",
						"use": "known"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "daily",
						"level": 1,
						"classes": [
							"Druid",
							"Wizard"
						]
					}
				]
			}
		]
	},
	"Strixhaven Mascot": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": null,
				"fixed": [
					{
						"name": "Find Familiar",
						"use": "ritual"
					}
				],
				"picks": []
			}
		]
	},
	"Svirfneblin Magic": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "int",
				"fixed": [
					{
						"name": "Nondetection",
						"use": "will"
					},
					{
						"name": "Blindness/Deafness",
						"use": "daily"
					},
					{
						"name": "Blur",
						"use": "daily"
					},
					{
						"name": "Disguise Self",
						"use": "daily"
					}
				],
				"picks": []
			}
		]
	},
	"Telekinetic": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "inherit",
				"fixed": [
					{
						"name": "Mage Hand",
						"use": "known"
					}
				],
				"picks": []
			}
		]
	},
	"Telepathic": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "inherit",
				"fixed": [
					{
						"name": "Detect Thoughts",
						"use": "daily"
					}
				],
				"picks": []
			}
		]
	},
	"Wood Elf Magic": {
		"variantLabel": null,
		"variants": [
			{
				"name": "",
				"ability": "wis",
				"fixed": [
					{
						"name": "Longstrider",
						"use": "daily"
					},
					{
						"name": "Pass Without Trace",
						"use": "daily"
					}
				],
				"picks": [
					{
						"count": 1,
						"use": "known",
						"level": 0,
						"classes": [
							"Druid"
						]
					}
				]
			}
		]
	}
};

// Spell lists the picks filter on that the spell index does not carry.
export const artificerSpells = ["Acid Splash","Aid","Air Bubble","Alarm","Alter Self","Animate Objects","Arcane Eye","Arcane Lock","Bigby's Hand","Blink","Blur","Booming Blade","Catnap","Circle of Power","Continual Flame","Create Food and Water","Create Spelljamming Helm","Creation","Cure Wounds","Dancing Lights","Darkvision","Detect Magic","Disguise Self","Dispel Magic","Dragon's Breath","Elemental Weapon","Enhance Ability","Enlarge/Reduce","Expeditious Retreat","Fabricate","Faerie Fire","False Life","Feather Fall","Fire Bolt","Fly","Freedom of Movement","Glyph of Warding","Grease","Greater Restoration","Green-Flame Blade","Guidance","Haste","Heat Metal","Identify","Intellect Fortress","Invisibility","Jump","Kinetic Jaunt","Leomund's Secret Chest","Lesser Restoration","Levitate","Light","Lightning Lure","Longstrider","Mage Hand","Magic Mouth","Magic Weapon","Mending","Message","Mordenkainen's Faithful Hound","Mordenkainen's Private Sanctum","Otiluke's Resilient Sphere","Poison Spray","Prestidigitation","Protection from Energy","Protection from Poison","Purify Food and Drink","Ray of Frost","Resistance","Revivify","Rope Trick","Sanctuary","See Invisibility","Shocking Grasp","Spare the Dying","Spider Climb","Stone Shape","Stoneskin","Summon Construct","Sword Burst","Tasha's Caustic Brew","Thorn Whip","Thunderclap","True Strike","Vortex Warp","Wall of Stone","Water Breathing","Water Walk","Web"];
export const ritualSpells = ["Alarm","Ceremony","Comprehend Languages","Detect Magic","Detect Poison and Disease","Find Familiar","Identify","Illusory Script","Purify Food and Drink","Speak with Animals","Tenser's Floating Disk","Unseen Servant"];
export const attackCantrips = ["Booming Blade","Chill Touch","Eldritch Blast","Fire Bolt","Green-Flame Blade","Magic Stone","Primal Savagery","Produce Flame","Ray of Frost","Shocking Grasp","Thorn Whip"];

export default featSpells;
