// HOMEBREW: not official D&D content. A custom Sorcerous Origin, copied from the creator's D&D Beyond page.
// https://www.dndbeyond.com/subclasses/1226230-elemental-bloodline
//
// Fields beyond the usual subclass shape:
//   homebrew       true: shown with a "Homebrew" label wherever the subclass appears
//   sourceUrl      where the text came from
//   bonusSpells    spells the subclass adds depending on a choice: { choice: <choice id>, byChoice: { <option>: { <sorcerer level>: [spells] } } }
//   grants         proficiencies the subclass gives: { armor: 'text', weaponChoice: <choice id of the picked weapon> }
const NAMES = {
	Water: { 1: ['Healing Word'], 3: ['Lesser Restoration'], 5: ['Sleet Storm'], 7: ['Control Water'], 9: ['Cone of Cold'] },
	Earth: { 1: ['Mage Armor'], 3: ['Hold Person'], 5: ['Slow'], 7: ["Otiluke's Resilient Sphere"], 9: ['Creation'] },
	Fire: { 1: ['Faerie Fire'], 3: ['Flame Blade'], 5: ['Fireball'], 7: ['Fire Shield'], 9: ['Flame Strike'] },
	Air: { 1: ['Shield'], 3: ['Invisibility'], 5: ['Fly'], 7: ['Freedom of Movement'], 9: ['Telekinesis'] },
	Lightning: { 1: ['Color Spray'], 3: ['Misty Step'], 5: ['Blink'], 7: ['Dimension Door'], 9: ['Mislead'] },
};

const spellRows = [1, 3, 5, 7, 9].map((lv) => {
	const ord = { 1: '1st', 3: '3rd', 5: '5th', 7: '7th', 9: '9th' }[lv];
	return `${ord} | ${['Water', 'Earth', 'Fire', 'Air', 'Lightning'].map((k) => NAMES[k][lv].join(', ')).join(' | ')}`;
}).join('\n');

const elementalBloodline = {
	className: 'Sorcerer',
	subclass: {
		name: 'Elemental Bloodline',
		slug: 'elemental-bloodline',
		source: 'Homebrew',
		homebrew: true,
		sourceUrl: 'https://www.dndbeyond.com/subclasses/1226230-elemental-bloodline',
		summary: 'Your innate magic comes from an ancient primordial elemental. This power was originally found in the Genasi tribe, Theuros, where they have learned to harness their elemental power and channel it through the weapons that they use. While in their elemental form, Elementalists are able to use their innate magical abilities to ward off harm and influence the battlefield around them.',
		bonusSpells: { choice: 'elementalAncestor', byChoice: NAMES },
		grants: { armor: 'Light armor, shields (Elemental Warrior)', weaponChoice: 'elementalWeapon' },
		features: [
			{
				name: 'Elemental Ancestor',
				level: 1,
				description: `At 1st level, you choose one type of elemental as your ancestor. You learn additional spells when you reach certain levels in this class, as shown on the Elemental Spells table. Each of these spells counts as a sorcerer spell for you, but it doesn't count against the number of sorcerer spells you know.
Whenever you gain a sorcerer level, you can replace one spell you gained from this feature with another spell of the same level. The new spell must be a spell from the sorcerer, ranger, or druid spell list.
The elemental type is used by features you gain later.
Elemental Spells
Sorcerer Level | Water Spells | Earth Spells | Fire Spells | Air Spells | Lightning Spells
${spellRows}
You can speak, read, and write Primordial. Additionally, whenever you make a Charisma check when interacting with elementals, your proficiency bonus is doubled if it applies to the check.`,
			},
			{
				name: 'Elemental Warrior',
				level: 1,
				description: "Starting at 1st level, you gain proficiency with light armor and shields, and you gain proficiency with one martial weapon of your choice. Whenever you finish a long rest, you can touch up to 2 weapons that you are proficient with. When you attack with those weapons, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls.",
			},
			{
				name: 'Elemental Form',
				level: 3,
				description: `This is the 3rd-level part of Elemental Warrior. When you reach 3rd level, you can harness the innate elemental power inside of you, provided you aren't wearing medium or heavy armor. It imbues you with mystical powers.
You can use a bonus action to enter your Elemental Form, which lasts for 1 minute. It ends early if you are incapacitated or if you don medium or heavy armor. You can also dismiss the Elemental Form at any time (no action required).
You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest.
While your Elemental Form is active, you gain the following benefits:
• You gain a bonus to your AC equal to your Charisma modifier (minimum of +1).
• You have advantage on saving throws against being grappled, restrained, or paralyzed.
• You gain an additional bonus from the table below based on your elemental bloodline.
Elemental Bloodline | Bonus
Water | You can move across difficult terrain created by ice or snow without spending extra movement. The ground you walk across becomes temporarily icy, any space you move through becomes difficult terrain until the end of your next turn.
Earth | You can move across difficult terrain made of earth or stone without spending extra movement. You can move through solid earth or stone as if it was air and without destabilizing it, but you can't end your movement there. If you do so, you are ejected to the nearest unoccupied space, and you are stunned until the end of your next turn.
Fire | When you move within 5 feet of a creature they take fire damage equal to your charisma modifier (minimum of 1) from your trail of heat. A creature can take this damage only once during a turn.
Air | You can enter a hostile creature's space and stop there. You can move through a space as narrow as 1 inch wide without squeezing.
Lightning | Your movement speed is increased by 10 feet and your movement does not provoke opportunity attacks.`,
			},
			{
				name: 'Extra Attack',
				level: 6,
				description: 'Starting at 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks.',
			},
			{
				name: 'Elemental Rebound',
				level: 14,
				description: `Starting at 14th level, you can spend 2 sorcery points as a reaction when you take damage to gain resistance to the triggering damage type until the start of your next turn. An additional effect based on your Elemental Bloodline from the table below happens as well.
Elemental Bloodline | Effect
Water | Choose one creature within 30 feet. They must succeed on a Strength save or become restrained in ice for 1 minute.
Earth | Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature is pushed 20 feet away from you in a straight line and is knocked prone. On a successful save, the creature is pushed 10 feet away from you and is not knocked prone.
Fire | Each creature in a 15-foot cone in a direction of your choosing must make a Dexterity saving throw. A creature takes 3d10 fire damage on a failed save, or half as much damage on a successful one.
Air | You can move up to your movement speed without provoking any opportunity attacks. Any creature you move through must pass a Constitution save or be knocked prone.
Lightning | You can redistribute half of the original damage from the triggering attack between any number of creatures within 30 feet of you as lightning damage. Each creature must pass a dex save or take the damage and if they take 15 or more damage they are stunned until the end of your next turn.`,
			},
			{
				name: 'Elemental Infusion',
				level: 18,
				description: `Starting at 18th level, when you take the Attack action while in your elemental form, you can spend 1 sorcery point to attack three times, instead of twice, as well as infuse your attacks with an ability based on your elemental bloodline. You can use this ability once per turn.
Elemental Bloodline | Ability
Water | The target has disadvantage on the next attack they make before the end of their next turn and they can't take a reaction until the end of their next turn.
Earth | Each creature in a 10-foot cube originating from you must succeed on a Constitution saving throw or take 2d8 bludgeoning damage and be knocked prone.
Fire | The target takes extra fire damage equal to your sorcerer level and must succeed on a dexterity saving throw or be ignited. While ignited, the target takes 1d10 fire damage at the start of their turn. They can use an action to put out the flames.
Air | You can push the target of your attack up to 20 feet away from you in a straight line. If they hit a wall or other obstacle, they take 2d6 bludgeoning damage. If they hit another creature, they both take the damage. In addition, they must pass a Constitution save or fall prone.
Lightning | You can choose up to two creatures within 15 feet of the target. If the attack roll beats their AC as well, then they take all of the damage from the attack as lightning damage.`,
			},
		],
	},
};

export default elementalBloodline;
