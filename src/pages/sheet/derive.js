import {
	getAbilityMods, getArmorClass, getAttacks, getBackground, getClass, getFinalAbilities, getHitPoints,
	getLevel, getProficiencyBonus, getRace, getSavingThrows, getSkillBonuses, getSpeed, getSpellSlots,
	getSpellcastingStats, getSubrace,
} from '../../utils/characterCalc';
import { getSelectedSpells } from '../../utils/spells';

// Everything the sheet displays, computed from the built character.
export function derive(character) {
	const cls = getClass(character);
	const level = getLevel(character);
	const mods = getAbilityMods(character);
	const prof = getProficiencyBonus(level);
	const skills = getSkillBonuses(character);
	const perception = skills.find((s) => s.name === 'Perception');
	return {
		cls, level, mods, prof, skills,
		race: getRace(character),
		subrace: getSubrace(character),
		background: getBackground(character),
		finals: getFinalAbilities(character),
		saves: getSavingThrows(character),
		hpMax: cls ? getHitPoints(character) : 0,
		ac: getArmorClass(character),
		speed: getSpeed(character),
		initiative: mods.dex,
		passivePerception: 10 + (perception ? perception.bonus : 0),
		attacks: getAttacks(character),
		spellStats: getSpellcastingStats(character),
		slots: getSpellSlots(character),
		spells: getSelectedSpells(character),
		hitDie: cls ? cls.hitDie : 8,
	};
}
