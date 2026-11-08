// Option lists that live on their own pages of the rules reference.
// maneuvers: Battle Master | disciplines: Way of the Four Elements | invocations: Warlock

export const maneuvers = [
	{
		"name": "Ambush",
		"description": "When you make a Dexterity (Stealth) check or an initiative roll, you can expend one superiority die and add the die to the roll, provided you aren't incapacitated."
	},
	{
		"name": "Bait and Switch",
		"description": "When you're within 5 feet of a creature on your turn, you can expend one superiority die and switch places with that creature, provided you spend at least 5 feet of movement and the creature is willing and isn't incapacitated. This movement doesn't provoke opportunity attacks.\nRoll the superiority die. Until the start of your next turn, you or the other creature (your choice) gains a bonus to AC equal to the number rolled."
	},
	{
		"name": "Brace",
		"description": "When a creature you can see moves into the reach you have with the melee weapon you're wielding, you can use your reaction to expend one superiority die and make one attack against the creature, using that weapon. If the attack hits, add the superiority die to the weapon's damage roll."
	},
	{
		"name": "Commander's Strike",
		"description": "When you take the Attack action on your turn, you can forgo one of your attacks and use a bonus action to direct one of your companions to strike. When you do so, choose a friendly creature who can see or hear you and expend one superiority die. That creature can immediately use its reaction to make one weapon attack, adding the superiority die to the attack's damage roll."
	},
	{
		"name": "Commanding Presence",
		"description": "When you make a Charisma (Intimidation), a Charisma (Performance), or a Charisma (Persuasion) check, you can expend one superiority die and add the superiority die to the ability check."
	},
	{
		"name": "Disarming Attack",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to disarm the target, forcing it to drop one item of your choice that it's holding. You add the superiority die to the attack's damage roll, and the target must make a Strength saving throw. On a failed save, it drops the object you choose. The object lands at its feet."
	},
	{
		"name": "Distracting Strike",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to distract the creature, giving your allies an opening. You add the superiority die to the attack's damage roll. The next attack roll against the target by an attacker other than you has advantage if the attack is made before the start of your next turn."
	},
	{
		"name": "Evasive Footwork",
		"description": "When you move, you can expend one superiority die, rolling the die and adding the number rolled to your AC until you stop moving."
	},
	{
		"name": "Feinting Attack",
		"description": "You can expend one superiority die and use a bonus action on your turn to feint, choosing one creature within 5 feet of you as your target. You have advantage on your next attack roll against that creature this turn. If that attack hits, add the superiority die to the attack's damage roll."
	},
	{
		"name": "Goading Attack",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to goad the target into attacking you. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, the target has disadvantage on all attack rolls against targets other than you until the end of your next turn."
	},
	{
		"name": "Grappling Strike",
		"description": "Immediately after you hit a creature with a melee attack on your turn, you can expend one superiority die and then try to grapple the target as a bonus action (see the Player's Handbook for rules on grappling). Add the superiority die to your Strength (Athletics) check."
	},
	{
		"name": "Lunging Attack",
		"description": "When you make a melee weapon attack on your turn, you can expend one superiority die to increase your reach for that attack by 5 feet. If you hit, you add the superiority die to the attack's damage roll."
	},
	{
		"name": "Maneuvering Attack",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to maneuver one of your comrades into a more advantageous position. You add the superiority die to the attack's damage roll, and you choose a friendly creature who can see or hear you. That creature can use its reaction to move up to half its speed without provoking opportunity attacks from the target of your attack."
	},
	{
		"name": "Menacing Attack",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to frighten the target. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turn."
	},
	{
		"name": "Parry",
		"description": "When another creature damages you with a melee attack, you can use your reaction and expend one superiority die to reduce the damage by the number you roll on your superiority die + your Dexterity modifier."
	},
	{
		"name": "Precision Attack",
		"description": "When you make a weapon attack roll against a creature, you can expend one superiority die to add it to the roll. You can use this maneuver before or after making the attack roll, but before any effects of the attack are applied."
	},
	{
		"name": "Pushing Attack",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to drive the target back. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you push the target up to 15 feet away from you."
	},
	{
		"name": "Quick Toss",
		"description": "As a bonus action, you can expend one superiority die and make a ranged attack with a weapon that has the thrown property. You can draw the weapon as part of making this attack. If you hit, add the superiority die to the weapon's damage roll."
	},
	{
		"name": "Rally",
		"description": "On your turn, you can use a bonus action and expend one superiority die to bolster the resolve of one of your companions. When you do so, choose a friendly creature who can see or hear you. That creature gains temporary hit points equal to the superiority die roll + your Charisma modifier."
	},
	{
		"name": "Riposte",
		"description": "When a creature misses you with a melee attack, you can use your reaction and expend one superiority die to make a melee weapon attack against the creature. If you hit, you add the superiority die to the attack's damage roll."
	},
	{
		"name": "Sweeping Attack",
		"description": "When you hit a creature with a melee weapon attack, you can expend one superiority die to attempt to damage another creature with the same attack. Choose another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to the number you roll on your superiority die. The damage is of the same type dealt by the original attack."
	},
	{
		"name": "Tactical Assessment",
		"description": "When you make an Intelligence (Investigation), an Intelligence (History), or a Wisdom (Insight) check, you can expend one superiority die and add the superiority die to the ability check."
	},
	{
		"name": "Trip Attack",
		"description": "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to knock the target down. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you knock the target prone."
	}
];

export const disciplines = [
	{
		"name": "Breath of Winter",
		"prerequisite": "17th Level",
		"description": "You can spend 6 ki points to cast Cone of Cold."
	},
	{
		"name": "Clench of the North Wind",
		"prerequisite": "6th Level",
		"description": "You can spend 3 ki points to cast Hold Person."
	},
	{
		"name": "Elemental Attunement",
		"description": "You can use your action to briefly control elemental forces within 30 feet of you, causing one of the following effects of your choice:\n• Create a harmless, instantaneous sensory effect related to air, earth, fire, or water such as a shower of sparks, a puff of wind, a spray of light mist, or a gentle rumbling of stone.\n• Instantaneously light or snuff out a candle, a torch, or a small campfire.\n• Chill or warm up to 1 pound of nonliving material for up to 1 hour.\n• Cause earth, fire, water, or mist that can fit within a 1-foot cube to shape itself into a crude form you designate for 1 minute."
	},
	{
		"name": "Eternal Mountain Defense",
		"prerequisite": "17th Level",
		"description": "You can spend 5 ki points to cast Stoneskin, targeting yourself."
	},
	{
		"name": "Fangs of the Fire Snake",
		"description": "When you use the Attack action on your turn, you can spend 1 ki point to cause tendrils of flame to stretch out from your fists and feet. Your reach with your unarmed strikes increases by 10 feet for that action, as well as the rest of the turn. A hit with such an attack deals fire damage instead of bludgeoning damage, and if you spend 1 ki point when the attack hits, it also deals an extra 1d10 fire damage."
	},
	{
		"name": "Fist of Four Thunders",
		"description": "You can spend 2 ki points to cast Thunderwave."
	},
	{
		"name": "Fist of Unbroken Air",
		"description": "You can create a blast of compressed air that strikes like a mighty fist. As an action, you can spend 2 ki points and choose a creature within 30 feet of you. That creature must make a Strength saving throw. On a failed save, the creature takes 3d10 bludgeoning damage, plus an extra 1d10 bludgeoning damage for each additional ki point you spend, and you can push the creature up to 20 feet away from you and knock it prone. On a successful save, the creature takes half as much damage, and you don't push it or knock it prone."
	},
	{
		"name": "Flames of the Phoenix",
		"prerequisite": "11th Level",
		"description": "You can spend 4 ki points to cast Fireball."
	},
	{
		"name": "Gong of the Summit",
		"prerequisite": "6th Level",
		"description": "You can spend 3 ki points to cast Shatter."
	},
	{
		"name": "Mist Stance",
		"prerequisite": "11th Level",
		"description": "You can spend 4 ki points to cast Gaseous Form, targeting yourself."
	},
	{
		"name": "Ride the Wind",
		"prerequisite": "11th Level",
		"description": "You can spend 4 ki points to cast Fly, targeting yourself."
	},
	{
		"name": "River of Hungry Flame",
		"prerequisite": "17th Level",
		"description": "You can spend 5 ki points to cast Wall of Fire."
	},
	{
		"name": "Rush of the Gale Spirits",
		"description": "You can spend 2 ki points to cast Gust of Wind."
	},
	{
		"name": "Shape the Flowing River",
		"description": "As an action, you can spend 1 ki point to choose an area of ice or water no larger than 30 feet on a side within 120 feet of you. You can change water to ice within the area and vice versa, and you can reshape ice in the area in any manner you choose. You can raise or lower the ice's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. For example, if you affect a 30-foot square, you can create a pillar up to 15 feet high, raise or lower the square's elevation by up to 15 feet, dig a trench up to 15 feet deep, and so on. You can't shape the ice to trap or injure a creature in the area."
	},
	{
		"name": "Sweeping Cinder Strike",
		"description": "You can spend 2 ki points to cast Burning Hands."
	},
	{
		"name": "Water Whip",
		"description": "You can spend 2 ki points as an action to create a whip of water that shoves and pulls a creature to unbalance it. A creature that you can see that is within 30 feet of you must make a Dexterity saving throw. On a failed save, the creature takes 3d10 bludgeoning damage, plus an extra 1d10 bludgeoning damage for each additional ki point you spend, and you can either knock it prone or pull it up to 25 feet closer to you. On a successful save, the creature takes half as much damage, and you don't pull it or knock it prone."
	},
	{
		"name": "Wave of Rolling Earth",
		"prerequisite": "17th Level",
		"description": "You can spend 6 ki points to cast Wall of Stone."
	}
];

export const invocations = [
	{
		"name": "Agonizing Blast",
		"prerequisite": "eldritch blast cantrip",
		"source": "Player's Handbook",
		"description": "When you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit."
	},
	{
		"name": "Armor of Shadows",
		"source": "Player's Handbook",
		"description": "You can cast mage armor on yourself at will, without expending a spell slot or material components."
	},
	{
		"name": "Ascendant Step",
		"prerequisite": "9th level",
		"source": "Player's Handbook",
		"description": "You can cast levitate on yourself at will, without expending a spell slot or material components.",
		"minLevel": 9
	},
	{
		"name": "Aspect of the Moon",
		"prerequisite": "Pact of the Tome feature",
		"source": "Xanathar's Guide to Everything",
		"description": "You no longer need to sleep and can't be forced to sleep by any means. To gain the benefits of a long rest, you can spend all 8 hours doing light activity, such as reading your Book of Shadows and keeping watch.",
		"pact": "Tome"
	},
	{
		"name": "Beast Speech",
		"description": "You can cast speak with animals at will, without expending a spell slot."
	},
	{
		"name": "Beguiling Influence",
		"description": "You gain proficiency in the Deception and Persuasion skills."
	},
	{
		"name": "Bewitching Whispers",
		"prerequisite": "7th level",
		"description": "You can cast compulsion once using a warlock spell slot. You can't do so again until you finish a long rest.",
		"minLevel": 7
	},
	{
		"name": "Bond of the Talisman",
		"prerequisite": "12th level, Pact of the Talisman feature",
		"source": "Tasha's Cauldron of Everything",
		"description": "While someone else is wearing your talisman, you can use your action to teleport to the unoccupied space closest to them, provided the two of you are on the same plane of existence. The wearer of your talisman can do the same thing, using their action to teleport to you. The teleportation can be used a number of times equal to your proficiency bonus, and all expended uses are restored when you finish a long rest.",
		"minLevel": 12,
		"pact": "Talisman"
	},
	{
		"name": "Book of Ancient Secrets",
		"prerequisite": "Pact of the Tome feature",
		"description": "You can now inscribe magical rituals in your Book of Shadows. Choose two 1st-level spells that have the ritual tag from any class's spell list (the two needn't be from the same list). The spells appear in the book and don't count against the number of spells you know. With your Book of Shadows in hand, you can cast the chosen spells as rituals. You can't cast the spells except as rituals, unless you've learned them by some other means. You can also cast a warlock spell you know as a ritual if it has the ritual tag.\nOn your adventures, you can add other ritual spells to your Book of Shadows. When you find such a spell, you can add it to the book if the spell's level is equal to or less than half your warlock level (rounded up) and if you can spare the time to transcribe the spell. For each level of the spell, the transcription process takes 2 hours and costs 50 gp for the rare inks needed to inscribe it.",
		"pact": "Tome"
	},
	{
		"name": "Chains of Carceri",
		"prerequisite": "15th level, Pact of the Chain feature",
		"source": "Player's Handbook",
		"description": "You can cast hold monster at will – targeting a celestial, fiend, or elemental – without expending a spell slot or material components. You must finish a long rest before you can use this invocation on the same creature again.",
		"minLevel": 15,
		"pact": "Chain"
	},
	{
		"name": "Cloak of Flies",
		"prerequisite": "5th level",
		"source": "Xanathar's Guide to Everything",
		"description": "As a bonus action, you can surround yourself with a magical aura that looks like buzzing flies. The aura extends 5 feet from you in every direction, but not through total cover. It lasts until you're incapacitated or you dismiss it as a bonus action.\nThe aura grants you advantage on Charisma (Intimidation) checks but disadvantage on all other Charisma checks. Any other creature that starts its turn in the aura takes poison damage equal to your Charisma modifier (minimum of 0 damage).\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		"minLevel": 5
	},
	{
		"name": "Devil's Sight",
		"source": "Player's Handbook",
		"description": "You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet."
	},
	{
		"name": "Dreadful Word",
		"prerequisite": "7th level",
		"source": "Player's Handbook",
		"description": "You can cast confusion once using a warlock spell slot. You can't do so again until you finish a long rest.",
		"minLevel": 7
	},
	{
		"name": "Eldritch Mind",
		"source": "Tasha's Cauldron of Everything",
		"description": "You have advantage on Constitution saving throws that you make to maintain your concentration on a spell."
	},
	{
		"name": "Eldritch Sight",
		"source": "Player's Handbook",
		"description": "You can cast detect magic at will, without expending a spell slot or material components."
	},
	{
		"name": "Eldritch Smite",
		"prerequisite": "5th level, Pact of the Blade feature",
		"source": "Xanathar's Guide to Everything",
		"description": "Once per turn when you hit a creature with your pact weapon, you can expend a warlock spell slot to deal an extra 1d8 force damage to the target, plus another 1d8 per level of the spell slot, and you can knock the target prone if it is Huge or smaller.",
		"minLevel": 5,
		"pact": "Blade"
	},
	{
		"name": "Eldritch Spear",
		"prerequisite": "eldritch blast cantrip",
		"source": "Player's Handbook",
		"description": "When you cast eldritch blast, its range is 300 feet."
	},
	{
		"name": "Eyes of the Rune Keeper",
		"source": "Player's Handbook",
		"description": "You can read all writing."
	},
	{
		"name": "Far Scribe",
		"prerequisite": "5th level, Pact of the Tome feature",
		"source": "Tasha's Cauldron of Everything",
		"description": "A new page appears in your Book of Shadows. With your permission, a creature can use its action to write its name on that page, which can contain a number of names equal to your proficiency bonus.\nYou can cast the sending spell, targeting a creature whose name is on the page, without using a spell slot and without using material components. To do so, you must write the message on the page. The target hears the message in their mind, and if the target replies, their message appears on the page, rather than in your mind. The writing disappears after 1 minute.\nAs an action, you can magically erase a name on the page by touching it.",
		"minLevel": 5,
		"pact": "Tome"
	},
	{
		"name": "Fiendish Vigor",
		"source": "Player's Handbook",
		"description": "You can cast false life on yourself at will as a 1st-level spell, without expending a spell slot or material components."
	},
	{
		"name": "Gaze of Two Minds",
		"source": "Player's Handbook",
		"description": "You can use your action to touch a willing humanoid and perceive through its senses until the end of your next turn. As long as the creature is on the same plane of existence as you, you can use your action on subsequent turns to maintain this connection, extending the duration until the end of your next turn. While perceiving through the other creature's senses, you benefit from any special senses possessed by that creature, and you are blinded and deafened to your own surroundings."
	},
	{
		"name": "Ghostly Gaze",
		"prerequisite": "7th level",
		"source": "Xanathar's Guide to Everything",
		"description": "As an action, you gain the ability to see through solid objects to a range of 30 feet. Within that range, you have darkvision if you don't already have it. This special sight lasts for 1 minute or until your concentration ends (as if you were concentrating on a spell). During that time, you perceive objects as ghostly, transparent images.\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		"minLevel": 7
	},
	{
		"name": "Gift of the Depths",
		"prerequisite": "5th level",
		"source": "Xanathar's Guide to Everything",
		"description": "You can breathe underwater, and you gain a swimming speed equal to your walking speed.\nYou can also cast water breathing without expending a spell slot. You regain the ability to do so when you finish a long rest.",
		"minLevel": 5
	},
	{
		"name": "Gift of the Ever-Living Ones",
		"prerequisite": "Pact of the Chain feature",
		"source": "Xanathar's Guide to Everything",
		"description": "Whenever you regain hit points while your familiar is within 100 feet of you, treat any dice rolled to determine the hit points you regain as having rolled their maximum value for you.",
		"pact": "Chain"
	},
	{
		"name": "Gift of the Protectors",
		"prerequisite": "9th level, Pact of the Tome feature",
		"source": "Tasha's Cauldron of Everything",
		"description": "A new page appears in your Book of Shadows. With your permission, a creature can use its action to write its name on that page, which can contain a number of names equal to your proficiency bonus.\nWhen any creature whose name is on the page is reduced to 0 hit points but not killed outright, the creature magically drops to 1 hit point instead. Once this magic is triggered, no creature can benefit from it until you finish a long rest.\nAs an action, you can magically erase a name on the page by touching it.",
		"minLevel": 9,
		"pact": "Tome"
	},
	{
		"name": "Grasp of Hadar",
		"prerequisite": "eldritch blast cantrip",
		"source": "Xanathar's Guide to Everything",
		"description": "Once on each of your turns when you hit a creature with your eldritch blast, you can move that creature in a straight line 10 feet closer to yourself."
	},
	{
		"name": "Improved Pact Weapon",
		"prerequisite": "Pact of the Blade feature",
		"source": "Xanathar's Guide to Everything",
		"description": "You can use any weapon you summon with your Pact of the Blade feature as a spellcasting focus for your warlock spells.\nIn addition, the weapon gains a +1 bonus to its attack and damage rolls, unless it is a magic weapon that already has a bonus to those rolls.\nFinally, the weapon you conjure can be a shortbow, longbow, light crossbow, or heavy crossbow.",
		"pact": "Blade"
	},
	{
		"name": "Investment of the Chain Master",
		"prerequisite": "Pact of the Chain feature",
		"source": "Tasha's Cauldron of Everything",
		"description": "When you cast find familiar, you infuse the summoned familiar with a measure of your eldritch power, granting the creature the following benefits:\n• The familiar gains either a flying speed or a swimming speed (your choice) of 40 feet.\n• As a bonus action, you can command the familiar to take the Attack action.\n• The familiar's weapon attacks are considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks.\n• If the familiar forces a creature to make a saving throw, it uses your spell save DC.\n• When the familiar takes damage, you can use your reaction to grant it resistance against that damage.",
		"pact": "Chain"
	},
	{
		"name": "Lance of Lethargy",
		"prerequisite": "eldritch blast cantrip",
		"source": "Xanathar's Guide to Everything",
		"description": "Once on each of your turns when you hit a creature with your eldritch blast, you can reduce that creature's speed by 10 feet until the end of your next turn."
	},
	{
		"name": "Lifedrinker",
		"prerequisite": "12th level, Pact of the Blade feature",
		"source": "Player's Handbook",
		"description": "When you hit a creature with your pact weapon, the creature takes extra necrotic damage equal to your Charisma modifier (minimum 1).",
		"minLevel": 12,
		"pact": "Blade"
	},
	{
		"name": "Maddening Hex",
		"prerequisite": "5th level, hex spell or a warlock feature that curses",
		"source": "Xanathar's Guide to Everything",
		"description": "As a bonus action, you cause a psychic disturbance around the target cursed by your hex spell or by a warlock feature of yours, such as Hexblade's Curse and Sign of Ill Omen. When you do so, you deal psychic damage to the cursed target and each creature of your choice within 5 feet of it. The psychic damage equals your Charisma modifier (minimum of 1 damage). To use this invocation, you must be able to see the cursed target, and it must be within 30 feet of you.",
		"minLevel": 5
	},
	{
		"name": "Mask of Many Faces",
		"source": "Player's Handbook",
		"description": "You can cast disguise self at will, without expending a spell slot."
	},
	{
		"name": "Master of Myriad Forms",
		"prerequisite": "15th level",
		"source": "Player's Handbook",
		"description": "You can cast alter self at will, without expending a spell slot.",
		"minLevel": 15
	},
	{
		"name": "Minions of Chaos",
		"prerequisite": "9th level",
		"source": "Player's Handbook",
		"description": "You can cast conjure elemental once using a warlock spell slot. You can't do so again until you finish a long rest.",
		"minLevel": 9
	},
	{
		"name": "Mire the Mind",
		"prerequisite": "5th level",
		"source": "Player's Handbook",
		"description": "You can cast slow once using a warlock spell slot. You can't do so again until you finish a long rest.",
		"minLevel": 5
	},
	{
		"name": "Misty Visions",
		"source": "Player's Handbook",
		"description": "You can cast silent image at will, without expending a spell slot or material components."
	},
	{
		"name": "One with Shadows",
		"prerequisite": "5th level",
		"source": "Player's Handbook",
		"description": "When you are in an area of dim light or darkness, you can use your action to become invisible until you move or take an action or a reaction.",
		"minLevel": 5
	},
	{
		"name": "Otherworldly Leap",
		"prerequisite": "9th level",
		"source": "Player's Handbook",
		"description": "You can cast jump at will, without expending a spell slot.",
		"minLevel": 9
	},
	{
		"name": "Protection of the Talisman",
		"prerequisite": "7th level, Pact of the Talisman feature",
		"source": "Tasha's Cauldron of Everything",
		"description": "When the wearer of your talisman fails a saving throw, they can add a d4 to the roll, potentially turning the save into a success. This benefit can be used a number of times equal to your proficiency bonus, and all expended uses are restored when you finish a long rest.",
		"minLevel": 7,
		"pact": "Talisman"
	},
	{
		"name": "Rebuke of the Talisman",
		"prerequisite": "Pact of the Talisman feature",
		"source": "Tasha's Cauldron of Everything",
		"description": "When the wearer of your talisman is hit by an attacker you can see within 30 feet of you, you can use your reaction to deal psychic damage to the attacker equal to your proficiency bonus and push it up to 10 feet away from the talisman's wearer.",
		"pact": "Talisman"
	},
	{
		"name": "Relentless Hex",
		"prerequisite": "7th level, hex spell or a warlock feature that curses",
		"source": "Xanathar's Guide to Everything",
		"description": "Your curse creates a temporary bond between you and your target. As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see within 5 feet of the target cursed by your hex spell or by a warlock feature of yours, such as Hexblade's Curse and Sign of Ill Omen. To teleport in this way, you must be able to see the cursed target.",
		"minLevel": 7
	},
	{
		"name": "Repelling Blast",
		"prerequisite": "eldritch blast cantrip",
		"source": "Player's Handbook",
		"description": "When you hit a creature with eldritch blast, you can push the creature up to 10 feet away from you in a straight line."
	},
	{
		"name": "Sculptor of Flesh",
		"prerequisite": "7th level",
		"source": "Player's Handbook",
		"description": "You can cast polymorph once using a warlock spell slot. You can't do so again until you finish a long rest.",
		"minLevel": 7
	},
	{
		"name": "Shroud of Shadow",
		"prerequisite": "15th level",
		"source": "Xanathar's Guide to Everything",
		"description": "You can cast invisibility at will, without expending a spell slot.",
		"minLevel": 15
	},
	{
		"name": "Sign of Ill Omen",
		"prerequisite": "5th level",
		"source": "Player's Handbook",
		"description": "You can cast bestow curse once using a warlock spell slot. You can't do so again until you finish a long rest.",
		"minLevel": 5
	},
	{
		"name": "Thief of Five Fates",
		"source": "Player's Handbook",
		"description": "You can cast bane once using a warlock spell slot. You can't do so again until you finish a long rest."
	},
	{
		"name": "Thirsting Blade",
		"prerequisite": "5th level, Pact of the Blade feature",
		"source": "Player's Handbook",
		"description": "You can attack with your pact weapon twice, instead of once, whenever you take the Attack action on your turn.",
		"minLevel": 5,
		"pact": "Blade"
	},
	{
		"name": "Tomb of Levistus",
		"prerequisite": "5th level",
		"source": "Xanathar's Guide to Everything",
		"description": "As a reaction when you take damage, you can entomb yourself in ice, which melts away at the end of your next turn. You gain 10 temporary hit points per warlock level, which take as much of the triggering damage as possible. Immediately after you take the damage, you gain vulnerability to fire damage, your speed is reduced to 0, and you are incapacitated. These effects, including any remaining temporary hit points, all end when the ice melts.\nOnce you use this invocation, you can't use it again until you finish a short or long rest.",
		"minLevel": 5
	},
	{
		"name": "Trickster's Escape",
		"prerequisite": "7th level",
		"source": "Xanathar's Guide to Everything",
		"description": "You can cast freedom of movement once on yourself without expending a spell slot. You regain the ability to do so when you finish a long rest.",
		"minLevel": 7
	},
	{
		"name": "Undying Servitude",
		"prerequisite": "5th-level warlock",
		"source": "Tasha's Cauldron of Everything",
		"description": "You can cast animate dead without using a spell slot. Once you do so, you can't cast it in this way again until you finish a long rest."
	},
	{
		"name": "Visions of Distant Realms",
		"prerequisite": "15th level",
		"source": "Player's Handbook",
		"description": "You can cast arcane eye at will, without expending a spell slot.",
		"minLevel": 15
	},
	{
		"name": "Voice of the Chain Master",
		"prerequisite": "Pact of the Chain feature",
		"source": "Player's Handbook",
		"description": "You can communicate telepathically with your familiar and perceive through your familiar's senses as long as you are on the same plane of existence. Additionally, while perceiving through your familiar's senses, you can also speak through your familiar in your own voice, even if your familiar is normally incapable of speech.",
		"pact": "Chain"
	},
	{
		"name": "Whispers of the Grave",
		"prerequisite": "9th level",
		"source": "Player's Handbook",
		"description": "You can cast speak with dead at will, without expending a spell slot.",
		"minLevel": 9
	},
	{
		"name": "Witch Sight",
		"prerequisite": "15th level",
		"source": "Player's Handbook",
		"description": "You can see the true form of any shapechanger or creature concealed by illusion or transmutation magic while the creature is within 30 feet of you and within line of sight.",
		"minLevel": 15
	}
];
