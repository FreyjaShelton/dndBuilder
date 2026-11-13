import {
	getAbilityMods, getArmorClass, getAttacks, getBackground, getClass, getFinalAbilities, getHitDice, getHitPoints, getInitiative,
	getLevel, getProficiencyBonus, getRace, getSavingThrows, getSenseRanges, getSkillBonuses, getSpeed, getSpeeds, getSpellSlots,
	getSpellcastingStats, getSpellcastingStatsList, getSubrace,
} from '../../utils/characterCalc';
import { getClassSummary } from '../../utils/multiclass';
import { getSelectedSpells } from '../../utils/spells';
import { getItemSpells } from '../../utils/itemSpells';
import { getEquipped, usesEquipping } from './inventory';

// Everything the sheet displays, computed from the built character. In 2014 the armor, shield and weapons equipped in
// the sheet's inventory (play.items) decide the armor class and the attack list; otherwise the builder's choices do.
export function derive(character, items) {
	const equipped = usesEquipping(character) && items ? getEquipped(character, items) : null;
	const cls = getClass(character);
	const level = getLevel(character);
	const mods = getAbilityMods(character);
	const prof = getProficiencyBonus(level);
	const skills = getSkillBonuses(character);
	const perception = skills.find((s) => s.name === 'Perception');
	const hitDice = getHitDice(character);
	return {
		cls, level, mods, prof, skills,
		classSummary: getClassSummary(character), // "Fighter 3 / Wizard 2" (just "Fighter 5" for a single class)
		hitDice, // [{ die, count }], biggest die first
		equipping: usesEquipping(character),
		race: getRace(character),
		subrace: getSubrace(character),
		background: getBackground(character),
		finals: getFinalAbilities(character),
		saves: getSavingThrows(character),
		hpMax: cls ? getHitPoints(character) : 0,
		ac: getArmorClass(character, equipped ? { armor: equipped.armor, shield: equipped.shield } : undefined),
		speed: getSpeed(character),
		speeds: getSpeeds(character), // every movement speed, in feet (walk, swim, climb, fly, burrow)
		senses: getSenseRanges(character), // darkvision and other senses, in feet
		initiative: getInitiative(character),
		passivePerception: 10 + (perception ? perception.bonus : 0),
		attacks: getAttacks(character, equipped ? equipped.weapons : undefined),
		spellStats: getSpellcastingStats(character), // the first class that casts
		spellStatsList: getSpellcastingStatsList(character), // one entry for each class that casts
		slots: getSpellSlots(character),
		spells: getSelectedSpells(character),
		// spells that carried magic items let the character cast (the sheet's inventory says what is carried)
		itemSpells: getItemSpells(character, items ? new Set(items.filter((i) => Number(i.qty) > 0).map((i) => i.name)) : undefined),
		hitDie: hitDice.length ? hitDice[0].die : 8,
	};
}


// The hit dice not yet spent: the biggest dice are spent first. [{ die, count }]
export function hitDiceLeftByDie(hitDice, used) {
	let toSpend = Math.max(0, used || 0);
	return hitDice.map(({ die, count }) => {
		const spent = Math.min(count, toSpend);
		toSpend -= spent;
		return { die, count: count - spent };
	}).filter((x) => x.count > 0);
}
