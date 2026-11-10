// Ready-made custom items for the Equipment step's "Start from an existing item" list (2014). Each is a complete custom item
// (see utils/equipment.js): picking one copies it whole, and every field can still be changed.
export const CUSTOM_ITEM_PRESETS = [
	{
		name: 'Heart of the Storm',
		group: 'Weapons',
		itemType: 'Wondrous item',
		rarity: 'Rare',
		category: 'Martial',
		kind: 'Melee',
		damage: '2d6',
		damageType: 'Slashing / Bludgeoning / Lightning',
		properties: [],
		range: '20/60',
		cost: '',
		weight: 0,
		// the Kusarigama attacks and damages with Charisma, and a ranged attack with it counts as a spell attack
		ability: 'cha',
		spellAttack: true,
		alwaysProficient: true,
		charges: { max: 3, recharge: '1d4', on: 'Long rest' },
		abilities: [
			{
				name: 'Static disruption', activation: 'Reaction', cost: 1, dice: '', diceLabel: '', save: '', dc: '',
				description: 'When landing a strike on a creature with this weapon, you can expend 1 charge to distract it. Until the start of your next turn, the next attack against the creature is made with advantage.',
			},
			{
				name: 'Electro magnetism', activation: 'Reaction', cost: 2, dice: '1d6', diceLabel: 'added to the attack roll', save: '', dc: '',
				description: 'When you miss an attack with this weapon, you may channel the lightning through the chain to arc it back at the target. Expend 2 charges to add 1d6 to the attack roll, potentially changing the outcome.',
			},
			{
				name: 'Roaring winds', activation: 'Reaction', cost: 3, dice: '3d12', diceLabel: 'lightning damage', save: 'dex', dc: '',
				description: 'Expend 3 charges to channel the force of the wind, allowing you to teleport to an unoccupied space that you can see within 60 feet. Every creature within a 10 foot radius centered on that point must succeed on a Dexterity saving throw or take 3d12 lightning damage. They take half as much on a successful save.',
			},
		],
		description: 'Kusarigama (2d6 + Charisma modifier slashing, bludgeoning or lightning damage). Range 20/60.\n\n'
			+ 'This weapon strikes swiftly and silently like an owl, while possessing heavy sweeping power like a bear\'s arms. Gilded outlines of lightning decorate its chain leading to a polished silver sickle.\n\n'
			+ 'When making a ranged attack with this weapon, a bolt of lightning rides the chain delivering an electric strike to the target. This is considered a spell attack roll.\n\n'
			+ 'Blessed by the elementals, this Kusarigama holds a max of 3 charges and regains 1d4 charges after a long rest. As a reaction you can do any of the 3 options below.',
	},
	{
		name: 'Blessing of the Tempest',
		base: 'Staff',
		group: 'Spellcasting Focus',
		itemType: 'Relic',
		rarity: 'Rare',
		attunement: true,
		cost: '',
		weight: 4,
		// bump this when the item below changes: a copy that has not been edited is replaced by the new version (see customItemLibrary.seed)
		revision: 2,
		// Stormborn Rune: while attuned, +1 to spell save DC and spell attack rolls
		bonuses: { spellSaveDc: 1, spellAttack: 1 },
		abilities: [
			{
				name: 'Winters Flurry', activation: 'Short rest', cost: 0, dice: '1d4', diceLabel: 'sorcery points regained', save: '', dc: '',
				uses: { max: null, perProficiency: true, on: 'Long rest' },
				description: 'Snowflakes dance with magic within a small cyclone. During a short rest, regain 1d4 sorcery points. This can be used a number of times equal to your proficiency bonus. All uses reset after a long rest.',
			},
			{
				name: 'Ashen Roots', activation: 'Reaction', cost: 0, dice: '', diceLabel: '', save: '', dc: '',
				uses: { max: 1, perProficiency: false, on: 'Long rest' },
				description: 'Soil from the earth blessed by the heat of lightning. When you are reduced to 0 hit points, instead drop to 1 hit point. This can be used once per long rest.',
			},
			{
				name: 'Stormborn Rune', activation: 'Passive', cost: 0, dice: '', diceLabel: '', save: '', dc: '',
				description: 'While attuned to this staff you gain a +1 bonus to Spell Save DC and Spell Attack Rolls.',
			},
			{
				name: 'Destructive Wrath', activation: 'Bonus action', cost: 0, resource: '6 sorcery points', dice: '', diceLabel: '', save: '', dc: '',
				description: 'As a bonus action, when rolling lightning or thunder damage, you can spend 6 sorcery points to deal maximum damage.',
			},
		],
		description: 'Arcane focus (staff). Requires attunement.\n\n'
			+ 'Struck by lightning, this thick twisted branch from the base of a Ginkgo tree is charged with a magical aura. It is adorned with a set of glass vials and charms containing gifts from a miracle encounter. '
			+ 'These charms float around the staff as though they are the winds creating a cyclone.',
	},
];
