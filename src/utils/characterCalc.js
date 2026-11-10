import { getEditionData } from '../data';
import skills from '../data/skills';
import { ABILITY_KEYS, ABILITY_NAMES, getModifier, formatSigned } from './abilityScore';
import { getArmorData, getItemBonuses, getOwnedItems, getRemainingGold, getWeaponData, getWeaponNames, getWornArmorName, hasShield } from './equipment';
import { averageHitDie, parseHpOverride } from './hitPoints';
import { getBackgroundLanguages, getBackgroundSkillList, resolveBackground } from './backgroundChoices';
import {
	getRaceAbilityBonuses, getRaceArmor, getRaceArmorProficiencies, getRaceHpPerLevel, getRaceLanguages, getRaceSkills, getRaceTraitTexts,
	getRaceWeaponProficiencies, getSubraceRecord, isCustomizing, resolveRace,
} from './raceChoices';
import {
	casterKind, casterLevelContribution, getClassLevelOf, getClassViews, getExtraClassViews, getMulticlassProficiencies, getTotalLevel, multiclassSlots,
	thirdCasterSlots,
} from './multiclass';
import { getChoiceLanguages, getChoiceSkills, getChoiceWeaponProficiencies, getChosenFeats, getSubclassProficiencyText, getClassAbilityEffects, getExpertiseSkills } from './classChoices';

const abilityKeyByName = Object.fromEntries(Object.entries(ABILITY_NAMES).map(([k, v]) => [v, k]));
const norm = (s) => String(s).replace(/\s+/g, ' ').trim();

export const is2024 = (character) => character.edition === '2024';
const rules = (character) => getEditionData(character.edition);

export function getRace(character) {
	if (!is2024(character)) return resolveRace(character);
	return rules(character).races[character.race.name] || null;
}

export function getSubrace(character) {
	if (!is2024(character)) return getSubraceRecord(character);
	const race = getRace(character);
	return race?.subraces.find((s) => s.name === character.race.subrace) || null;
}

export function getClass(character) {
	return rules(character).classes[character.classInfo.className] || null;
}

export function getBackground(character) {
	if (!is2024(character)) return resolveBackground(character);
	return rules(character).backgrounds[character.background.name] || null;
}

// The character level: all the levels in every class added together (a multiclassed character's proficiency bonus, hit points and
// the like depend on it).
export function getLevel(character) {
	return getTotalLevel(character);
}

// The level in the one class this character (or class view, see multiclass.js) is looking at: what the class table is read at.
export function getClassLevel(character) {
	return getClassLevelOf(character);
}

export function getProficiencyBonus(level) {
	return Math.ceil(level / 4) + 1;
}

// 2014: bonuses come from race/subrace (plus the player's picks for "choose N" races).
// 2024: bonuses come from the background: +2/+1 or +1/+1/+1 among its listed abilities.
export function getAbilityBonuses(character) {
	const bonuses = getBaseAbilityBonuses(character);
	if (!is2024(character)) {
		// 2014: add Ability Score Improvements, half-feats and fixed class increases chosen on the Class page.
		const { bonuses: classBonuses } = getClassAbilityEffects(character);
		ABILITY_KEYS.forEach((k) => { bonuses[k] += classBonuses[k]; });
	}
	return bonuses;
}

function getBaseAbilityBonuses(character) {
	const bonuses = Object.fromEntries(ABILITY_KEYS.map((k) => [k, 0]));
	if (is2024(character)) {
		const bg = getBackground(character);
		if (!bg) return bonuses;
		const bgInfo = character.background;
		const allowed = bg.abilityScores;
		if (bgInfo.abilityMode === 'oneOneOne') {
			const picks = bg.name === 'Custom' ? [bgInfo.abilityPlus2, bgInfo.abilityPlus1, bgInfo.abilityPlus1b] : allowed;
			new Set(picks.filter((k) => k && allowed.includes(k))).forEach((k) => { bonuses[k] += 1; });
		} else {
			if (bgInfo.abilityPlus2 && allowed.includes(bgInfo.abilityPlus2)) bonuses[bgInfo.abilityPlus2] += 2;
			if (bgInfo.abilityPlus1 && allowed.includes(bgInfo.abilityPlus1) && bgInfo.abilityPlus1 !== bgInfo.abilityPlus2) {
				bonuses[bgInfo.abilityPlus1] += 1;
			}
		}
		return bonuses;
	}
	return getRaceAbilityBonuses(character);
}

export function getFinalAbilities(character) {
	const bonuses = getAbilityBonuses(character);
	const { cap } = getClassAbilityEffects(character);
	// Manual scores (2014) are used exactly as typed: no 20 cap, so a 22 from a magic item stays 22.
	const manual = !is2024(character) && character.abilities.generationMethod === 'Manual';
	return Object.fromEntries(ABILITY_KEYS.map((k) => {
		const base = character.abilities[k];
		if (base === '') return [k, ''];
		const total = Number(base) + bonuses[k];
		return [k, manual ? total : Math.min(cap[k], total)];
	}));
}

export function getAbilityMods(character) {
	const finals = getFinalAbilities(character);
	return Object.fromEntries(ABILITY_KEYS.map((k) => [k, getModifier(finals[k])]));
}

// Skills the species grants outright or lets the player pick.
export function getRacialSkills(character) {
	if (!is2024(character)) return getRaceSkills(character);
	const race = getRace(character);
	if (!race) return [];
	const picked = character.race.skillChoices;
	if (is2024(character)) {
		if (race.name === 'Human' || race.name === 'Elf') return picked.slice(0, 1);
		return [];
	}
	const granted = [];
	if (race.name === 'Elf') granted.push('Perception');
	if (race.name === 'Half-Orc') granted.push('Intimidation');
	if (race.name === 'Half-Elf') granted.push(...picked.slice(0, 2));
	return granted;
}

// How many racial skill picks the player makes on the Race page, and from which skills.
export function getRacialSkillPicks(character) {
	const race = getRace(character);
	if (!race) return null;
	if (is2024(character)) {
		if (race.name === 'Human') return { count: 1, from: skills.map((s) => s.name), label: 'Skillful (choose 1 skill)' };
		if (race.name === 'Elf') return { count: 1, from: ['Insight', 'Perception', 'Survival'], label: 'Keen Senses (choose 1 skill)' };
		return null;
	}
	if (race.name === 'Half-Elf') return { count: 2, from: skills.map((s) => s.name), label: 'Skill Versatility (choose 2 skills)' };
	return null;
}

export function getBackgroundSkills(character) {
	if (!is2024(character)) return getBackgroundSkillList(character);
	const bg = getBackground(character);
	if (!bg) return [];
	return bg.name === 'Custom' ? character.background.customSkills.slice(0, 2) : bg.skills;
}

// 2014: the player can override the automatic skill proficiencies (class picks, background, species, class features)
// and choose exactly which skills the character is proficient in, and which have expertise.
export const isSkillOverride = (character) => !is2024(character) && !!character.skills?.override;

export function getProficientSkills(character) {
	if (isSkillOverride(character)) return [...new Set(character.skills.manual || [])];
	const all = [
		...getBackgroundSkills(character),
		...getRacialSkills(character),
		...character.skills.classChoices,
		...getChoiceSkills(character),
		...getExtraClassViews(character).map((v) => v.classInfo.skill).filter(Boolean), // the skill a later class (bard, ranger, rogue) adds
	];
	return [...new Set(all)];
}

// Feats the 2024 character has from origin sources (background feat, Human's Versatile).
export function getOriginFeats(character) {
	if (!is2024(character)) return [];
	const bg = getBackground(character);
	const feats = [];
	if (bg) feats.push(bg.name === 'Custom' ? character.background.originFeat : bg.feat);
	if (character.race.name === 'Human' && character.race.originFeat) feats.push(character.race.originFeat);
	return feats.filter(Boolean);
}

function columnIndex(cls, matcher) {
	return cls.table.columns.findIndex((c) => matcher.test(norm(c)));
}

export function getClassTableRow(cls, level) {
	return cls?.table.rows[level - 1] || null;
}

// Feature names listed for a class up to and including `level`, from the class table.
export function getClassFeatureNames(cls, level) {
	const col = columnIndex(cls, /^Features$/);
	const names = [];
	for (let l = 1; l <= level; l++) {
		const cell = cls.table.rows[l - 1]?.[col] || '';
		cell.split(/,\s*(?![^()]*\))/).map((s) => s.trim()).filter((s) => s && s !== '-' && s !== '—').forEach((n) => names.push(n));
	}
	return names;
}

// ---- Spellcasting ---------------------------------------------------------------------------------------------------
// The functions with "Class" in their name read ONE class (the character itself, or one of its class views, see multiclass.js);
// the others cover the whole character.

// What a class contributes to the spell slot calculation, or null if it does not cast.
function getClassCasting(view) {
	const cls = getClass(view);
	if (!cls) return null;
	if (cls.spellcastingAbility) return { className: cls.name, ability: cls.spellcastingAbility };
	// Eldritch Knights and Arcane Tricksters cast with Intelligence though their class does not (2014)
	if (!is2024(view) && casterKind(cls.name, view.classInfo.subclass, getClassLevel(view)) === 'third') {
		return { className: `${cls.name} (${view.classInfo.subclass})`, ability: 'Intelligence' };
	}
	return null;
}

// { type: 'standard', slots: {1: n..9: n} } | { type: 'pact', count, level } | null — for one class, read from its table
export function getClassSpellSlots(view) {
	const cls = getClass(view);
	if (!cls) return null;
	const level = getClassLevel(view);
	if (!cls.spellcastingAbility) {
		return !is2024(view) && casterKind(cls.name, view.classInfo.subclass, level) === 'third' ? { type: 'standard', slots: thirdCasterSlots(level) } : null;
	}
	const row = getClassTableRow(cls, level);
	if (cls.name === 'Warlock') {
		const count = Number(row[columnIndex(cls, /^Spell Slots$/)]) || 0;
		const slotLevel = parseInt(row[columnIndex(cls, /^Slot Level$/)], 10) || 0;
		return { type: 'pact', count, level: slotLevel };
	}
	const slots = {};
	for (let sl = 1; sl <= 9; sl++) {
		const idx = cls.table.columns.findIndex((c) => new RegExp(`^Spell Slots per Spell Level ${sl}(st|nd|rd|th)$`).test(norm(c)));
		const v = idx >= 0 ? Number(row[idx]) : 0;
		slots[sl] = Number.isFinite(v) ? v : 0;
	}
	return { type: 'standard', slots };
}

// The character's spell slots. One spellcasting class follows its own table; with several, the Multiclass Spellcaster table is
// used for the combined level, and a warlock's Pact Magic slots stay separate:
// { type: 'standard', slots: {1: n..9: n}, combined?: casterLevel, pact?: { count, level } } | { type: 'pact', count, level } | null
export function getSpellSlots(character) {
	const views = getClassViews(character);
	if (views.length === 1) return getClassSpellSlots(views[0]);
	const parts = views.map((v) => ({ v, kind: casterKind(v.classInfo.className, v.classInfo.subclass, getClassLevel(v)) })).filter((p) => p.kind);
	const regular = parts.filter((p) => p.kind !== 'pact');
	const pactPart = parts.find((p) => p.kind === 'pact');
	let result = null;
	if (regular.length === 1) {
		result = getClassSpellSlots(regular[0].v);
	} else if (regular.length > 1) {
		const casterLevel = regular.reduce((sum, p) => sum + casterLevelContribution(p.kind, getClassLevel(p.v)), 0);
		result = { type: 'standard', slots: multiclassSlots(casterLevel), combined: casterLevel };
	}
	if (pactPart) {
		const pact = getClassSpellSlots(pactPart.v);
		return result ? { ...result, pact: { count: pact.count, level: pact.level } } : pact;
	}
	return result;
}

export function getCantripsKnown(character) {
	const cls = getClass(character);
	if (!cls) return 0;
	const idx = columnIndex(cls, /^Cantrips( Known)?$/);
	return idx >= 0 ? Number(getClassTableRow(cls, getClassLevel(character))[idx]) || 0 : 0;
}

// Number of level 1+ spells the class prepares (the 'Prepared Spells' column), or 0.
export function getPreparedSpellsLimit(character) {
	const cls = getClass(character);
	if (!cls) return 0;
	const idx = columnIndex(cls, /^Prepared Spells$/);
	return idx >= 0 ? Number(getClassTableRow(cls, getClassLevel(character))[idx]) || 0 : 0;
}

// { className, ability, abilityKey, saveDc, attackBonus, index } for one class (null if it does not cast). The proficiency bonus
// is the character's, so it follows the total level.
export function getClassSpellcastingStats(view) {
	const casting = getClassCasting(view);
	if (!casting) return null;
	const key = abilityKeyByName[casting.ability];
	const mod = getAbilityMods(view)[key];
	const prof = getProficiencyBonus(getLevel(view));
	return {
		className: casting.className, ability: casting.ability, abilityKey: key, index: view.__index || 0,
		// magic items can add to both (a staff that gives +1 to spell save DC and spell attack rolls)
		saveDc: 8 + prof + mod + getItemBonuses(view).spellSaveDc, attackBonus: prof + mod + getItemBonuses(view).spellAttack,
	};
}

// One entry for each class that casts spells, the first class first.
export const getSpellcastingStatsList = (character) => getClassViews(character).map((v) => getClassSpellcastingStats(v)).filter(Boolean);

// The spellcasting numbers of the class passed in (a class view), or of the first class that casts.
export function getSpellcastingStats(character) {
	if (character.__root) return getClassSpellcastingStats(character);
	return getSpellcastingStatsList(character)[0] || null;
}

// The maximum hit points: a total typed in by hand if there is one, otherwise the calculated total.
export function getHitPoints(character) {
	if (!getClass(character)) return null;
	return parseHpOverride(character.classInfo.hpOverride) ?? getCalculatedHitPoints(character);
}

// Hit points worked out from the hit dice, the chosen method (average or rolled), Constitution, race and feats.
// The first level of the first class is the hit die maximum; every other level, in any class, is the average or the rolled value.
export function getCalculatedHitPoints(character) {
	const cls = getClass(character);
	if (!cls) return null;
	const level = getLevel(character);
	const conMod = getAbilityMods(character).con;
	const racialHp = is2024(character) ? (character.race.name === 'Dwarf' ? level : 0) : getRaceHpPerLevel(character) * level;
	const { hpMethod } = character.classInfo;
	const toughFeat = !is2024(character) && getChosenFeats(character).includes('Tough') ? 2 * level : 0;
	let base = Math.max(1, cls.hitDie + conMod);
	getClassViews(character).forEach((view, i) => {
		const viewClass = getClass(view);
		if (!viewClass) return;
		const average = averageHitDie(viewClass.hitDie);
		const rolls = view.classInfo.hpRolls;
		// the first class's rolls start at its level 2; a later class's start at its level 1
		const first = i === 0 ? 2 : 1;
		for (let l = first; l <= getClassLevel(view); l += 1) {
			const roll = hpMethod === 'roll' && Array.isArray(rolls) ? rolls[l - first] : 0;
			base += Math.max(1, (roll || average) + conMod);
		}
	});
	return base + racialHp + toughFeat;
}

// The hit dice the character has, biggest die first: [{ die, count }]
export function getHitDice(character) {
	const byDie = new Map();
	getClassViews(character).forEach((view) => {
		const cls = getClass(view);
		if (cls) byDie.set(cls.hitDie, (byDie.get(cls.hitDie) || 0) + getClassLevel(view));
	});
	return [...byDie.entries()].map(([die, count]) => ({ die, count })).sort((a, b) => b.die - a.die);
}

export function getSpeed(character) {
	return getRace(character)?.speed ?? '';
}

// Unarmored Defense comes from the first class that has it; a later class does not give it again (multiclassing rules).
const unarmoredDefenseClass = (character) => getClassViews(character).map((v) => v.classInfo.className).find((n) => n === 'Barbarian' || n === 'Monk') || '';

// `wear` ({ armor: name, shield: bool }) overrides what is worn; the interactive sheet passes what is equipped in the
// inventory. Without it, the armor and shield picked on the builder's Equipment step are used.
export function getArmorClass(character, wear) {
	const armorData = getArmorData(character); // the catalog's armor and the player's own
	const mods = getAbilityMods(character);
	const armorName = wear ? wear.armor : getWornArmorName(character);
	const shield = wear ? !!wear.shield : hasShield(character);
	const worn = armorData.find((a) => a.name === armorName && a.type !== 'Shield');
	// the best shield owned (a custom shield can give more than the standard +2)
	const shieldBonus = shield ? Math.max(2, ...getOwnedItems(character).filter((i) => i.type === 'Shield').map((i) => Number(i.ac) || 0)) : 0;
	let ac;
	if (worn) {
		const dex = worn.dexCap === null ? mods.dex : Math.min(mods.dex, worn.dexCap);
		ac = worn.ac + dex;
	} else if (unarmoredDefenseClass(character) === 'Barbarian') {
		ac = 10 + mods.dex + mods.con;
	} else if (unarmoredDefenseClass(character) === 'Monk' && !shield) {
		ac = 10 + mods.dex + mods.wis;
	} else {
		ac = 10 + mods.dex;
	}
	if (!is2024(character)) {
		// natural armor (lizardfolk, tortle...) applies only while no armor is worn; flat bonuses always apply
		const { naturalArmor, acBonus } = getRaceArmor(character);
		if (naturalArmor && !worn) ac = Math.max(ac, naturalArmor.base + (naturalArmor.ability ? mods[naturalArmor.ability] : 0));
		ac += acBonus;
	}
	return ac + shieldBonus + getItemBonuses(character).ac;
}

export function getSkillBonuses(character) {
	const mods = getAbilityMods(character);
	const prof = getProficiencyBonus(getLevel(character));
	const proficient = getProficientSkills(character);
	const expertise = is2024(character) ? [] : isSkillOverride(character) ? (character.skills.manualExpertise || []) : getExpertiseSkills(character);
	return skills.map((s) => {
		const isProf = proficient.includes(s.name);
		const isExpert = isProf && expertise.includes(s.name);
		return { ...s, proficient: isProf, expertise: isExpert, bonus: mods[s.ability] + (isProf ? prof : 0) + (isExpert ? prof : 0) };
	});
}

export function getSavingThrows(character) {
	const itemSaves = getItemBonuses(character).saves; // magic items that add to every saving throw
	const cls = getClass(character);
	const mods = getAbilityMods(character);
	const prof = getProficiencyBonus(getLevel(character));
	return ABILITY_KEYS.map((k) => {
		const isProf = !!cls && cls.savingThrows.includes(ABILITY_NAMES[k]);
		return { key: k, name: ABILITY_NAMES[k], proficient: isProf, bonus: mods[k] + (isProf ? prof : 0) + itemSaves };
	});
}

// Does a class's weapon proficiency text cover this weapon ("Simple weapons, hand crossbows, longswords")?
function classTextCovers(text, weapon) {
	const classText = text.toLowerCase();
	// a custom weapon counts as the catalog weapon it was made from ("Flame Tongue Longsword" is trained like a longsword)
	const names = [weapon.name, weapon.base].filter(Boolean).map((n) => n.toLowerCase());
	const category = weapon.category.toLowerCase();
	if (classText.includes(category)) {
		if (category === 'martial' && /finesse or light/.test(classText)) {
			if (weapon.properties.includes('Finesse') || weapon.properties.includes('Light')) return true;
		} else if (category === 'simple' || !/martial weapons that/.test(classText)) {
			return true;
		}
	}
	const singular = (w) => w.replace(/s$/, '');
	return classText.split(/,| and /).some((p) => names.includes(singular(p.trim())) || names.includes(p.trim()));
}

export function isWeaponProficient(character, weapon) {
	if (weapon.alwaysProficient) return true; // a custom item set to "Always proficient with it"
	const cls = getClass(character);
	const race = getRace(character);
	const names = [weapon.name, weapon.base].filter(Boolean);
	const lnames = names.map((n) => n.toLowerCase());
	// the first class's proficiencies, plus what each later class adds (Multiclassing Proficiencies)
	const classTexts = [cls?.weaponProficiencies || '', ...getExtraClassViews(character).map((v) => getMulticlassProficiencies(v.classInfo.className).weapons.join(', '))];
	if (classTexts.some((text) => classTextCovers(text, weapon))) return true;
	if (getChoiceWeaponProficiencies(character).some((n) => names.includes(n))) return true;
	// customized origin (2014): the race's weapon training is whatever is left after the player's swaps
	if (!is2024(character) && isCustomizing(character)) return getRaceWeaponProficiencies(character).some((n) => names.includes(n));
	const raceText = (is2024(character) ? (race?.traits || []).map((t) => t.description) : getRaceTraitTexts(character))
		.filter((d) => /proficiency with/i.test(d)).map((d) => d.toLowerCase()).join(' ');
	return lnames.some((lname) => raceText.includes(lname) || raceText.includes(`${lname}s`));
}

// `weaponNames` overrides which weapons are listed; the interactive sheet passes the ones equipped in the inventory.
export function getAttacks(character, weaponNames) {
	const weaponData = getWeaponData(character); // the catalog's weapons and the player's own
	const mods = getAbilityMods(character);
	const prof = getProficiencyBonus(getLevel(character));
	// a weapon that counts as a spell attack rolls the character's spell attack bonus (spellcasting ability, proficiency and any item
	// bonus to spell attacks), the same number the Spells tab shows. With several casting classes the best one is used.
	const casting = getSpellcastingStatsList(character);
	const spellAttackBonus = casting.length ? Math.max(...casting.map((s) => s.attackBonus)) : null;
	return (weaponNames || getWeaponNames(character)).map((name) => {
		const w = weaponData.find((x) => x.name === name);
		if (!w) return null;
		const finesse = w.properties.includes('Finesse');
		// a custom weapon can name the ability it attacks and damages with (a spell-like weapon that uses Charisma), and carry a
		// magic bonus to hit and damage
		const mod = w.ability && mods[w.ability] !== undefined ? mods[w.ability] : w.kind === 'Ranged' ? mods.dex : finesse ? Math.max(mods.str, mods.dex) : mods.str;
		const asSpell = w.spellAttack && spellAttackBonus !== null;
		const attack = (asSpell ? spellAttackBonus : mod + (w.alwaysProficient || isWeaponProficient(character, w) ? prof : 0)) + (Number(w.attackBonus) || 0);
		const damageMod = mod + (Number(w.damageBonus) || 0);
		const damage = w.damage ? `${w.damage}${damageMod ? formatSigned(damageMod) : ''} ${w.damageType}` : '';
		return { name: w.name, attackBonus: formatSigned(attack), damage, mastery: w.mastery || '', spellAttack: !!w.spellAttack };
	}).filter(Boolean);
}

// Does a proficiency text already say this (a later class's "Light armor" is covered by a first class's "All armor")?
const textCovers = (text, item) => {
	const t = text.toLowerCase();
	const i = item.toLowerCase();
	return t.includes(i) || t.includes(i.replace(/s$/, '')) || (/armor$/.test(i) && t.includes('all armor'));
};

// What the later classes add that the first class's text does not already cover.
const multiclassExtras = (character, kind, base) => {
	const out = [];
	getExtraClassViews(character).forEach((v) => getMulticlassProficiencies(v.classInfo.className)[kind].forEach((item) => {
		if (!textCovers(base, item) && !out.includes(item)) out.push(item);
	}));
	return out;
};

// The class's armor proficiencies, plus what each later class adds (multiclassing), anything the subclass adds (Elemental
// Bloodline's light armor and shields) and the armor training the race gives (Mountain Dwarf), which a customized origin can swap away.
export function getArmorProficiencies(character) {
	const base = getClass(character)?.armorProficiencies || '';
	const fromClasses = multiclassExtras(character, 'armor', base);
	const have = [base, ...fromClasses].join(', ').toLowerCase();
	const raceArmor = is2024(character) ? [] : getRaceArmorProficiencies(character)
		.filter((type) => !have.includes('all armor') && !have.includes(`${type.toLowerCase()} armor`)).map((type) => `${type} armor`);
	const extra = [...fromClasses, getSubclassProficiencyText(character).armor, ...raceArmor].filter(Boolean).join(', ');
	return extra ? `${base && base !== 'None' ? `${base}, ` : ''}${extra}` : base;
}

// Weapon proficiencies as text: the class's, what later classes add, weapons picked through choices and the race's weapon
// training (a customized origin can swap it).
export function getWeaponProficiencies(character) {
	const base = getClass(character)?.weaponProficiencies || '';
	const fromClasses = multiclassExtras(character, 'weapons', base);
	const have = [base, ...fromClasses].join(', ').toLowerCase();
	const weapons = getEditionData(character.edition).equipment.weapons;
	const raceWeapons = is2024(character) ? [] : getRaceWeaponProficiencies(character).filter((name) => {
		const w = weapons.find((x) => x.name === name);
		return !have.includes(name.toLowerCase()) && !(w && have.includes(`${w.category.toLowerCase()} weapons`) && !/martial weapons that/.test(have));
	});
	const extra = [...fromClasses, getSubclassProficiencyText(character).weapons, ...raceWeapons].filter(Boolean).join(', ');
	return extra ? `${base && base !== 'None' ? `${base}, ` : ''}${extra}` : base;
}

// Tool proficiencies the classes give, as text: the first class's, then what later classes add (thieves' tools, the bard's
// instrument). Background tools are listed separately.
export function getClassToolProficiencies(character) {
	const base = getClass(character)?.toolProficiencies || '';
	const parts = base && !/^none$/i.test(base) ? [base] : [];
	getExtraClassViews(character).forEach((v) => {
		getMulticlassProficiencies(v.classInfo.className).tools.forEach((t) => { if (!textCovers(parts.join(', '), t)) parts.push(t); });
		if (v.classInfo.instrument) parts.push(v.classInfo.instrument);
	});
	return parts.join(', ');
}

export function getLanguages(character) {
	const race = getRace(character);
	const bg = getBackground(character);
	const parts = [];
	if (is2024(character)) {
		parts.push('Common and two other languages of your choice');
		return parts;
	}
	if (race) {
		const l = getRaceLanguages(character);
		const open = l.pickCount - l.picked.length;
		parts.push([...l.fixed, ...l.picked].join(', ') + (open > 0 ? ` (+${open} to choose)` : ''));
	}
	if (bg) {
		const l = getBackgroundLanguages(character);
		const open = l.pickCount - l.picked.length;
		if (l.fixed.length || l.picked.length || open > 0) parts.push(`Background: ${[...l.fixed, ...l.picked].join(', ')}${open > 0 ? ` (+${open} to choose)` : ''}`);
	}
	const fromClass = getChoiceLanguages(character);
	if (fromClass.length) parts.push(`Class: ${fromClass.join(', ')}`);
	return parts;
}

export function getCarriedGold(character) {
	// coins counted on the interactive sheet win over the starting-gold arithmetic (they are in gold pieces)
	const carried = character.equipment?.carried;
	if (carried) {
		const total = (Number(carried.pp) || 0) * 10 + (Number(carried.gp) || 0) + (Number(carried.ep) || 0) * 0.5 + (Number(carried.sp) || 0) / 10 + (Number(carried.cp) || 0) / 100;
		return String(Math.round(total * 100) / 100);
	}
	// whatever is left of the starting gold after buying gear
	const left = getRemainingGold(character);
	return left === '' ? '' : String(Math.max(0, left));
}
