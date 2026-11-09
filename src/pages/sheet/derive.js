import {
	getAbilityMods, getArmorClass, getAttacks, getBackground, getClass, getFinalAbilities, getHitPoints,
	getLevel, getProficiencyBonus, getRace, getSavingThrows, getSkillBonuses, getSpeed, getSpellSlots,
	getSpellcastingStats, getSubrace,
} from '../../utils/characterCalc';
import { getSelectedSpells } from '../../utils/spells';
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
	return {
		cls, level, mods, prof, skills,
		equipping: usesEquipping(character),
		race: getRace(character),
		subrace: getSubrace(character),
		background: getBackground(character),
		finals: getFinalAbilities(character),
		saves: getSavingThrows(character),
		hpMax: cls ? getHitPoints(character) : 0,
		ac: getArmorClass(character, equipped ? { armor: equipped.armor, shield: equipped.shield } : undefined),
		speed: getSpeed(character),
		initiative: mods.dex,
		passivePerception: 10 + (perception ? perception.bonus : 0),
		attacks: getAttacks(character, equipped ? equipped.weapons : undefined),
		spellStats: getSpellcastingStats(character),
		slots: getSpellSlots(character),
		spells: getSelectedSpells(character),
		hitDie: cls ? cls.hitDie : 8,
	};
}
