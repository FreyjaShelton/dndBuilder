// Fills DnD_Beyond_Character_Sheet.pdf (a five page fillable sheet: main page, features and equipment, more features
// and equipment, background and notes, spells) from a built character. Works for 2014 and 2024 characters.
// The sheet's fields are looked up by name with spacing and case ignored (some names carry trailing spaces); the spell
// page is a table whose rows are listed in beyondSpellRows.js.
import { ABILITY_KEYS, formatSigned, getModifier } from '../../utils/abilityScore';
import {
	getAbilityMods, getArmorClass, getArmorProficiencies, getAttacks, getBackground, getClass, getClassFeatureNames, getFinalAbilities,
	getHitPoints, getLanguages, getLevel, getOriginFeats, getProficiencyBonus, getRace, getSavingThrows, getSenseRanges, getSkillBonuses, getSpeeds,
	getSpellcastingStats, getSpellcastingStatsList, getSpellSlots, getSubrace, getWeaponProficiencies, getCarriedGold, getClassToolProficiencies,
	getHitDice, is2024,
} from '../../utils/characterCalc';
import { getEditionData } from '../../data';
import { getClassLevelOf, getClassViews } from '../../utils/multiclass';
import { getActiveChoiceDefs, getChoiceValues, getSheetFeatures } from '../../utils/classChoices';
import { getBackgroundChoiceSummaries, getBackgroundTools } from '../../utils/backgroundChoices';
import { getRaceChoiceSummaries, getRaceSpellInfo, getRaceTools } from '../../utils/raceChoices';
import { getCharacterFeats, getFeatGrantedSpells } from '../../utils/featSpells';
import { describeItemBonuses, describeMagicItem, getAttunedNames, getCustomGear, getOwnedItems, getTotalWeight, getWeaponData, getWornArmorName } from '../../utils/equipment';
import { abilityMaxUses, itemMaxCharges } from '../sheet/itemCharges';
import { getItemSpells } from '../../utils/itemSpells';
import { splitGold } from '../../utils/currency';
import { getSelectedSpells } from '../../utils/spells';
import { getAlwaysPrepared } from '../../utils/spells2014';
import SPELL_ROWS from './beyondSpellRows';

const norm = (s) => String(s).replace(/\s+/g, ' ').trim().toLowerCase();

// ---- text helpers ------------------------------------------------------------------------------------------------

// The standard PDF font can only draw WinAnsi characters; anything else would make the whole sheet fail.
function makeSafe(font) {
	const set = new Set(font.getCharacterSet());
	const map = { '‑': '-', '−': '-', '→': '->', '≥': '>=', '≤': '<=', ' ': ' ', '​': '', '⁠': '' };
	return (text) => String(text === undefined || text === null ? '' : text).replace(/[\s\S]/gu, (ch) => {
		if (ch === '\n') return ch;
		if (map[ch] !== undefined) return map[ch];
		return set.has(ch.codePointAt(0)) ? ch : '?';
	});
}

// Greedy word wrap using the font's real widths; honors existing line breaks.
function wrapText(font, text, size, width) {
	const lines = [];
	String(text).split('\n').forEach((para) => {
		if (para === '') { lines.push(''); return; }
		let line = '';
		para.split(/\s+/).filter(Boolean).forEach((word) => {
			const next = line ? `${line} ${word}` : word;
			if (font.widthOfTextAtSize(next, size) <= width) { line = next; return; }
			if (line) lines.push(line);
			// a single word wider than the box is cut
			let rest = word;
			while (font.widthOfTextAtSize(rest, size) > width && rest.length > 1) {
				let n = rest.length - 1;
				while (n > 1 && font.widthOfTextAtSize(rest.slice(0, n), size) > width) n -= 1;
				lines.push(rest.slice(0, n));
				rest = rest.slice(n);
			}
			line = rest;
		});
		lines.push(line);
	});
	return lines;
}

const firstSentences = (text, max) => {
	const flat = String(text).replace(/\s+/g, ' ').trim();
	if (flat.length <= max) return flat;
	const cut = flat.slice(0, max);
	const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
	return stop > max * 0.5 ? cut.slice(0, stop + 1) : `${cut.replace(/\s+\S*$/, '')}...`;
};

// ---- the filler -------------------------------------------------------------------------------------------------------

function createFiller(form, font) {
	const safe = makeSafe(font);
	const byName = new Map(form.getFields().map((f) => [norm(f.getName()), f]));
	const missing = new Set();
	const lookup = (name) => {
		const f = byName.get(norm(name));
		if (!f) { missing.add(name); return null; }
		return f;
	};
	const rectOf = (field) => field.acroField.getWidgets()[0].getRectangle();

	return {
		missing,
		safe,
		size: (name) => { const f = lookup(name); return f ? rectOf(f) : null; },
		// A single line that shrinks to fit its box.
		text(name, value, { max = 9, min = 4.5 } = {}) {
			const f = lookup(name);
			if (!f) return;
			const str = safe(value).replace(/\s*\n\s*/g, ' ').trim();
			if (!str) return;
			const { width, height } = rectOf(f);
			let size = Math.min(max, Math.abs(height) * 0.78);
			while (size > min && font.widthOfTextAtSize(str, size) > width - 3) size -= 0.25;
			f.setFontSize(size);
			f.setText(str);
		},
		// Several lines in a box: the biggest font (down to `min`) at which all of it fits; extra text is cut.
		block(name, value, { max = 8, min = 4.5, lineHeight = 1.15 } = {}) {
			const f = lookup(name);
			if (!f) return;
			const str = safe(value).trim();
			if (!str) return;
			const { width, height } = rectOf(f);
			const w = width - 5;
			const h = Math.abs(height) - 3;
			let size = max;
			let lines = wrapText(font, str, size, w);
			while (size > min && lines.length * size * lineHeight > h) { size -= 0.25; lines = wrapText(font, str, size, w); }
			const capacity = Math.max(1, Math.floor(h / (size * lineHeight)));
			f.setFontSize(size);
			f.setText(lines.slice(0, capacity).join('\n'));
		},
		// text from the rules data can hold characters the standard font cannot draw (a real minus sign), so it is made safe first
		wrapText: (text, size, width) => wrapText(font, safe(text), size, width),
		widthOf: (text, size) => font.widthOfTextAtSize(safe(text), size),
	};
}

// ---- small derivations -----------------------------------------------------------------------------------------------

const ABILITY_ABBR = { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' };
const ABILITY_BY_NAME = { strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA' };

const ABILITY_FIELDS = {
	str: { score: 'STR', mod: 'STRmod', prof: 'StrProf', save: 'ST Strength' },
	dex: { score: 'DEX', mod: 'DEXmod', prof: 'DexProf', save: 'ST Dexterity' },
	con: { score: 'CON', mod: 'CONmod', prof: 'ConProf', save: 'ST Constitution' },
	int: { score: 'INT', mod: 'INTmod', prof: 'IntProf', save: 'ST Intelligence' },
	wis: { score: 'WIS', mod: 'WISmod', prof: 'WisProf', save: 'ST Wisdom' },
	cha: { score: 'CHA', mod: 'CHamod', prof: 'ChaProf', save: 'ST Charisma' },
};

// skill key -> [bonus field, proficiency marker field, ability label field]
const SKILL_FIELDS = {
	acrobatics: ['Acrobatics', 'AcrobaticsProf', 'AcrobaticsMod'],
	animalHandling: ['Animal', 'AnimalHandlingProf', 'AnimalMod'],
	arcana: ['Arcana', 'ArcanaProf', 'ArcanaMod'],
	athletics: ['Athletics', 'AthleticsProf', 'AthleticsMod'],
	deception: ['Deception', 'DeceptionProf', 'DeceptionMod'],
	history: ['History', 'HistoryProf', 'HistoryMod'],
	insight: ['Insight', 'InsightProf', 'InsightMod'],
	intimidation: ['Intimidation', 'IntimidationProf', 'IntimidationMod'],
	investigation: ['Investigation', 'InvestigationProf', 'InvestigationMod'],
	medicine: ['Medicine', 'MedicineProf', 'MedicineMod'],
	nature: ['Nature', 'NatureProf', 'NatureMod'],
	perception: ['Perception', 'PerceptionProf', 'PerceptionMod'],
	performance: ['Performance', 'PerformanceProf', 'PerformanceMod'],
	persuasion: ['Persuasion', 'PersuasionProf', 'PersuasionMod'],
	religion: ['Religion', 'ReligionProf', 'ReligionMod'],
	sleightOfHand: ['SleightofHand', 'SleightOfHandProf', 'SleightofHandMod'],
	stealth: ['Stealth', 'StealthProf', 'StealthMod'],
	survival: ['Survival', 'SurvivalProf', 'SurvivalMod'],
};

const traitsOf = (character) => {
	const race = getRace(character);
	const sub = getSubrace(character);
	return [...(race?.traits || []), ...(sub?.traits || [])];
};

// Senses such as "Darkvision 60 ft.": the race's traits plus what carried magic items add (see getSenseRanges).
export function getSenses(character) {
	return Object.entries(getSenseRanges(character)).map(([k, r]) => `${k.charAt(0).toUpperCase()}${k.slice(1)} ${r} ft.`);
}

// Damage resistances / immunities and "advantage on saving throws against..." lines from the race's traits.
export function getDefenses(character) {
	const resist = [];
	const saves = [];
	traitsOf(character).forEach((t) => {
		const text = String(t.description || '').replace(/\s+/g, ' ');
		text.split(/[.!]\s+/).forEach((s) => {
			const r = s.match(/resistance to ([a-z, and]+?) damage/i);
			if (r) resist.push(`Resistance: ${r[1].replace(/\s+/g, ' ')}`);
			if (/immun(e|ity) to/i.test(s) && !/spell|can't|cannot/i.test(s.slice(0, 20))) resist.push(firstSentences(s, 70));
			if (/advantage on saving throws against/i.test(s)) saves.push(firstSentences(s.replace(/^You have /i, '').replace(/^you /i, ''), 90));
		});
	});
	return { defenses: [...new Set(resist)].join('\n'), saves: [...new Set(saves)].join('\n') };
}

const castingTimeShort = (t) => {
	const s = String(t || '').split(',')[0].trim();
	let m = s.match(/^(\d+)\s*(bonus action|action|reaction)/i);
	if (m) return `${m[1]}${{ 'bonus action': 'BA', action: 'A', reaction: 'R' }[m[2].toLowerCase()]}`;
	m = s.match(/^(\d+)\s*(minute|hour)s?/i);
	if (m) return `${m[1]}${m[2][0].toLowerCase()}`;
	return s.slice(0, 5);
};
const rangeShort = (r) => String(r || '').replace(/\s*feet/gi, ' ft').replace(/-foot/gi, '-ft').replace(/\s*miles?/gi, ' mi').replace(/Self \((.*)\)/, 'Self/$1');
const durationShort = (d) => String(d || '').replace(/Concentration, up to /i, 'C: ').replace(/Instantaneous/i, 'Instant').replace(/ minutes?/gi, 'm').replace(/ hours?/gi, 'h').replace(/ rounds?/gi, 'rd').replace(/ days?/gi, 'd').replace(/Until dispelled/i, 'Until dispelled');
const componentsShort = (c) => String(c || '').replace(/\s*\(.*\)/, '').replace(/\s*,\s*/g, ',').replace(/\s+/g, '');

// What the spell asks of its target: a saving throw ability, a spell attack roll, or nothing.
function saveOrHit(spell, attackBonus) {
	const text = String(spell.description || '');
	const save = text.match(/\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/i);
	if (save) return ABILITY_BY_NAME[save[1].toLowerCase()];
	if (/\b(ranged|melee) spell attack\b/i.test(text)) return attackBonus === undefined ? 'ATK' : formatSigned(attackBonus);
	return '--';
}

function spellSourceOf(character, spell, className, always, grants) {
	if (always.has(spell.name)) return always.get(spell.name);
	if (grants.has(spell.name)) return grants.get(spell.name);
	if (spell.classes && className && !spell.classes.includes(className)) return 'Other';
	return className || '';
}

// Where each non-class spell comes from (a feat, the species, a subclass), for the Source column.
function spellOrigins(character) {
	const always = new Map();
	const grants = new Map();
	if (!is2024(character)) {
		try { getAlwaysPrepared(character).forEach((sp) => always.set(sp.name, sp.from)); } catch (e) { /* no subclass spells */ }
		try { getFeatGrantedSpells(character).forEach((sp) => grants.set(sp.name, sp.from)); } catch (e) { /* no feat spells */ }
		try {
			const raceName = getSubrace(character)?.name || getRace(character)?.name || 'Species';
			getRaceSpellInfo(character).fixed.forEach((sp) => grants.set(sp.name, raceName));
			Object.entries(character.race?.choices || {}).filter(([k]) => /^cantrip:/.test(k)).forEach(([, v]) => (v || []).forEach((n) => grants.set(n, raceName)));
		} catch (e) { /* no racial spells */ }
	}
	return { always, grants };
}

const ordinal = (n) => ({ 1: '1st', 2: '2nd', 3: '3rd' }[n] || `${n}th`);

// ---- the main function -------------------------------------------------------------------------------------------------------

export function fillBeyondSheet(pdfDoc, character, font) {
	const form = pdfDoc.getForm();
	const f = createFiller(form, font);
	const { info } = character;
	const cls = getClass(character);
	const race = getRace(character);
	const subrace = getSubrace(character);
	const bg = getBackground(character);
	const level = getLevel(character);
	const finals = getFinalAbilities(character);
	const mods = getAbilityMods(character);
	const prof = getProficiencyBonus(level);
	const picked = !!cls;
	const edition2024 = is2024(character);
	// "Champion Fighter 3 / Evocation Wizard 2": each class with its level (and subclass, in 2014)
	const classLabel = picked ? getClassViews(character).filter((v) => v.classInfo.className).map((v) => {
		const sub = !edition2024 && v.classInfo.subclass ? v.classInfo.subclass : '';
		return `${sub ? `${sub} ` : ''}${v.classInfo.className} ${getClassLevelOf(v)}`;
	}).join(' / ') : '';
	const classNames = getClassViews(character).map((v) => v.classInfo.className);
	const speciesLabel = race ? (subrace ? subrace.name : race.name) : '';
	const bgLabel = bg ? (bg.name === 'Custom' ? character.background.customName : bg.name) : '';

	// ---- page headers (repeated on each page)
	[['CharacterName', ''], ['CharacterName', '2'], ['CharacterName', '3'], ['CharacterName', '4']].forEach(([n, i]) => f.text(`${n}${i}`, info.name, { max: 13 }));
	['', '2', '3'].forEach((i) => {
		f.text(`CLASS  LEVEL${i}`, classLabel, { max: 9 });
		f.text(`PLAYER NAME${i}`, info.player, { max: 9 });
		f.text(`RACE${i}`, speciesLabel, { max: 9 });
		f.text(`BACKGROUND${i}`, bgLabel, { max: 9 });
	});

	// ---- abilities, saves, skills
	const saves = getSavingThrows(character);
	ABILITY_KEYS.forEach((k) => {
		const af = ABILITY_FIELDS[k];
		if (finals[k] !== '') {
			f.text(af.score, finals[k], { max: 15 });
			f.text(af.mod, formatSigned(getModifier(finals[k])), { max: 9 });
		}
		const s = saves.find((x) => x.key === k);
		if (s && finals[k] !== '') {
			f.text(af.save, formatSigned(s.bonus), { max: 8 });
			if (picked && s.proficient) f.text(af.prof, '•', { max: 8 });
		}
	});
	const skillBonuses = getSkillBonuses(character);
	skillBonuses.forEach((s) => {
		const fields = SKILL_FIELDS[s.key];
		if (!fields) return;
		f.text(fields[2], ABILITY_ABBR[s.ability], { max: 6 });
		if (finals[s.ability] === '') return;
		f.text(fields[0], formatSigned(s.bonus), { max: 8 });
		if (s.expertise) f.text(fields[1], 'E', { max: 7 });
		else if (s.proficient) f.text(fields[1], 'P', { max: 7 });
	});
	const skillBonus = (key) => skillBonuses.find((s) => s.key === key)?.bonus ?? 0;
	if (finals.wis !== '') f.text('Passive1', 10 + skillBonus('perception'), { max: 11 });
	if (finals.wis !== '') f.text('Passive2', 10 + skillBonus('insight'), { max: 11 });
	if (finals.int !== '') f.text('Passive3', 10 + skillBonus('investigation'), { max: 11 });
	f.block('AdditionalSenses', getSenses(character).join('\n'), { max: 8 });

	// ---- combat numbers
	if (finals.dex !== '') f.text('Init', formatSigned(mods.dex), { max: 14 });
	f.text('AC', picked || finals.dex !== '' ? getArmorClass(character) : '', { max: 15 });
	if (picked) f.text('ProfBonus', formatSigned(prof), { max: 11 });
	const casting = getSpellcastingStats(character);
	const castingList = getSpellcastingStatsList(character);
	if (casting) {
		f.text('AbilitySaveScore1', casting.ability.slice(0, 3).toUpperCase(), { max: 7 });
		f.text('AbilitySaveDC', casting.saveDc, { max: 11 });
	}
	// a second spellcasting class gets the sheet's second set of boxes
	if (castingList[1]) {
		f.text('AbilitySaveScore2', castingList[1].ability.slice(0, 3).toUpperCase(), { max: 7 });
		f.text('AbilitySaveDC2', castingList[1].saveDc, { max: 11 });
	}
	if (race) {
		// walking first, then any other speed the race or a magic item gives
		const names = { walk: 'Walking', swim: 'Swimming', climb: 'Climbing', fly: 'Flying', burrow: 'Burrowing' };
		const speeds = getSpeeds(character);
		f.block('Speed', Object.keys(names).filter((k) => k in speeds).map((k) => `${speeds[k]} ft. (${names[k]})`).join('\n'), { max: 9 });
	}
	if (picked) {
		f.text('MaxHP', getHitPoints(character), { max: 15 });
		f.text('Total', getHitDice(character).map((x) => `${x.count}d${x.die}`).join(' + '), { max: 9 });
	}
	const { defenses, saves: saveNotes } = getDefenses(character);
	f.block('Defenses', defenses, { max: 7.5 });
	f.block('SaveModifiers', saveNotes, { max: 7 });

	// ---- attacks: weapons first, then attack-roll cantrips
	const weaponData = getWeaponData(character);
	const rows = getAttacks(character).map((a) => {
		const w = weaponData.find((x) => x.name === a.name);
		const props = w ? [...(w.properties || []), w.range ? `range ${w.range}` : ''].filter(Boolean).join(', ') : '';
		// a weapon with several damage types ("2d6+3 Slashing / Bludgeoning / Lightning") would not fit the box: shorten the types
		const damage = a.damage.includes(' / ') ? a.damage.replace(/^(\S+) (.*)$/,(_, dice, types) => `${dice} ${types.split(' / ').map((t) => t.slice(0, 4)).join('/')}`) : a.damage;
		return { name: a.name, bonus: a.attackBonus, damage, notes: [a.spellAttack ? 'Spell attack' : '', props, a.mastery ? `Mastery: ${a.mastery}` : ''].filter(Boolean).join('; ') };
	});
	// spells that carried magic items let the character cast are listed too (their Source column names the item)
	const classSpells = getSelectedSpells(character);
	const spells = [...classSpells, ...getItemSpells(character).filter((s) => !classSpells.some((c) => c.name === s.name))];
	if (casting) {
		// attack cantrips deal more dice at 5th, 11th and 17th level
		const cantripTier = 1 + (level >= 5 ? 1 : 0) + (level >= 11 ? 1 : 0) + (level >= 17 ? 1 : 0);
		spells.filter((s) => s.level === 0 && /\b(ranged|melee) spell attack\b/i.test(s.description || '')).forEach((s) => {
			const dmg = String(s.description).match(/(\d+)d(\d+)\s+(\w+)\s+damage/i);
			const scales = /5th level/i.test(`${s.higherLevels || ''} ${s.description || ''}`);
			const damage = dmg ? `${Number(dmg[1]) * (scales ? cantripTier : 1)}d${dmg[2]} ${dmg[3]}` : '';
			rows.push({ name: s.name, bonus: formatSigned(casting.attackBonus), damage, notes: `Cantrip; ${rangeShort(s.range)}; ${componentsShort(s.components)}` });
		});
	}
	rows.slice(0, 6).forEach((r, i) => {
		const n = i + 1;
		f.text(n === 1 ? 'Wpn Name' : `Wpn Name ${n}`, r.name, { max: 9 });
		f.text(`Wpn${n} AtkBonus`, r.bonus, { max: 9 });
		f.text(`Wpn${n} Damage`, r.damage, { max: 8 });
		f.text(`Wpn Notes ${n}`, r.notes, { max: 7.5 });
	});

	// ---- proficiencies and languages
	const toolNames = [];
	if (!edition2024) {
		const classTools = getClassToolProficiencies(character);
		if (classTools) toolNames.push(classTools);
	} else if (cls && cls.toolProficiencies && !/^none$/i.test(cls.toolProficiencies)) toolNames.push(cls.toolProficiencies);
	if (!edition2024) {
		const values = getChoiceValues(character);
		getActiveChoiceDefs(character).filter((d) => d.kind === 'tools').forEach((d) => (values[d.id] || []).forEach((t) => toolNames.push(t)));
		toolNames.push(...new Set(getRaceTools(character)), ...new Set(getBackgroundTools(character)));
	} else if (bg?.name === 'Custom' && character.background.customProficiency) toolNames.push(character.background.customProficiency);
	else if (bg?.toolProficiencies) toolNames.push(bg.toolProficiencies);
	if (picked) {
		const profText = [
			'=== ARMOR ===', getArmorProficiencies(character) || 'None', '',
			'=== WEAPONS ===', getWeaponProficiencies(character) || 'None', '',
			'=== TOOLS ===', [...new Set(toolNames)].join(', ') || 'None', '',
			'=== LANGUAGES ===', getLanguages(character).join('; '),
		].join('\n');
		f.block('ProficienciesLang', profText, { max: 8 });
	}

	// ---- features, traits and feats across the six feature columns (pages 2 and 3)
	const featureBlocks = [];
	if (picked) {
		featureBlocks.push({ title: `=== ${[...new Set(classNames.filter(Boolean))].join(' / ').toUpperCase()} FEATURES ===`, items: (edition2024 ? getClassFeatureNames(cls, level).map((n) => ({ name: n, text: '' })) : getSheetFeatures(character).map((x) => ({ name: x.label, text: x.description || '' }))) });
	}
	if (race) {
		const items = traitsOf(character).map((t) => ({ name: t.name, text: t.description || '' }));
		if (!edition2024) getRaceChoiceSummaries(character).forEach((l) => items.push({ name: l, text: '' }));
		if (items.length) featureBlocks.push({ title: `=== ${(speciesLabel || 'SPECIES').toUpperCase()} TRAITS ===`, items });
	}
	const feats = edition2024 ? getOriginFeats(character) : getCharacterFeats(character).map((x) => x.feat);
	if (feats.length) {
		const featData = getEditionData(character.edition).feats || [];
		featureBlocks.push({ title: '=== FEATS ===', items: [...new Set(feats)].map((n) => ({ name: n, text: (featData.find((x) => x.name === n) || {}).description || '' })) });
	}
	const bgItems = [];
	if (!edition2024 && bg?.features) bg.features.filter((x) => x.description).forEach((x) => bgItems.push({ name: `${x.name} (${bg.name})`, text: x.description }));
	else if (bg?.feature?.name) bgItems.push({ name: `${bg.feature.name} (${bg.name})`, text: bg.feature.description || '' });
	if (!edition2024) getBackgroundChoiceSummaries(character).forEach((l) => bgItems.push({ name: l, text: '' }));
	if (bgItems.length) featureBlocks.push({ title: `=== ${(bgLabel || 'BACKGROUND').toUpperCase()} ===`, items: bgItems });
	// the player's own magic items: what they are, their charges and abilities
	const carriedNames = new Set(getOwnedItems(character).map((i) => i.name));
	const magic = getCustomGear(character).filter((i) => carriedNames.has(i.name) && (i.description || i.abilities?.length || i.spells?.length || itemMaxCharges(i, prof) > 0 || i.bonuses));
	const attunedNow = getAttunedNames(character, carriedNames);
	const bonusLine = describeItemBonuses;
	const usesLine = (a) => { const max = abilityMaxUses(a, prof); return max === null ? '' : ` [${max}/${a.uses.on ? a.uses.on.toLowerCase() : 'rest'}]`; };
	if (magic.length) {
		featureBlocks.push({
			title: '=== MAGIC ITEMS ===',
			items: magic.map((item) => ({
				name: [item.name, describeMagicItem(item) && `(${describeMagicItem(item)})`, item.attunement && (attunedNow.includes(item.name) ? '[attuned]' : '[not attuned]')].filter(Boolean).join(' '),
				text: [
					itemMaxCharges(item, prof) > 0 ? `Charges: ${itemMaxCharges(item, prof)}${item.charges.recharge ? `, regains ${item.charges.recharge} after a ${String(item.charges.on || 'Long rest').toLowerCase()}` : ''}.` : '',
					bonusLine(item.bonuses) ? `Bonus${item.attunement ? ' while attuned' : ''}: ${bonusLine(item.bonuses)}.` : '',
					item.description || '',
					...(item.spells || []).map((sp) => { const max = abilityMaxUses(sp, prof); return `Casts ${sp.name}${Number(sp.level) > 0 ? ` at level ${sp.level}` : ''}: ${max === null ? 'no limit' : `${max}/${sp.uses.on ? sp.uses.on.toLowerCase() : 'rest'}`}${sp.ability ? ` (${sp.ability.toUpperCase()})` : ''}.`; }),
					...(item.abilities || []).map((a) => [`${a.name}${a.activation ? ` (${a.activation.toLowerCase()})` : ''}${a.cost ? ` [${a.cost} charge${a.cost === 1 ? '' : 's'}]` : ''}${usesLine(a)}:`, a.description, a.dice ? `Roll ${a.dice} ${a.diceLabel || ''}.` : ''].filter(Boolean).join(' ')),
				].filter(Boolean).join('\n'),
			})),
		});
	}
	fillFeatureColumns(f, featureBlocks);

	// A short list of key features and traits for the ACTIONS boxes on page 1.
	if (picked) {
		const classLines = featureBlocks[0] ? featureBlocks[0].items.map((x) => x.name) : [];
		f.block('Actions1', ['=== CLASS FEATURES ===', ...classLines].join('\n'), { max: 8 });
	}
	if (race) f.block('Actions2', [`=== ${(speciesLabel || 'SPECIES').toUpperCase()} TRAITS ===`, ...traitsOf(character).map((t) => t.name)].join('\n'), { max: 8 });

	// ---- equipment and coins (pages 2 and 3)
	const owned = getOwnedItems(character);
	const worn = getWornArmorName(character);
	owned.slice(0, 56).forEach((item, i) => {
		const w = (Number(item.weight) || 0) * (item.quantity || 1);
		f.text(`Eq Name${i}`, `${item.name}${item.name === worn ? ' (worn)' : ''}`, { max: 8.5 });
		f.text(`Eq Qty${i}`, item.quantity || 1, { max: 8.5 });
		if (w) f.text(`Eq Weight${i}`, Math.round(w * 100) / 100, { max: 8.5 });
	});
	// the magic items the character is attuned to (the sheet has room for three)
	attunedNow.forEach((name, i) => {
		const item = owned.find((x) => x.name === name);
		const n = i + 1;
		f.text(`Attuned Name${n}`, name, { max: 8.5 });
		f.text(`Attuned Qty${n}`, item.quantity || 1, { max: 8.5 });
		if (Number(item.weight)) f.text(n === 3 ? 'AttunedWeight3' : `Attuned Weight${n}`, Math.round(Number(item.weight) * (item.quantity || 1) * 100) / 100, { max: 8.5 });
	});
	const coins = { cp: 0, sp: 0, ep: 0, pp: 0, ...splitGold(getCarriedGold(character) || 0) };
	['cp', 'sp', 'ep', 'gp', 'pp'].forEach((k) => { if (coins[k]) f.text(k.toUpperCase(), coins[k], { max: 11 }); });
	const carried = Math.round(getTotalWeight(character) * 100) / 100;
	if (owned.length) f.text('Weight Carried', `${carried} lb.`, { max: 8 });
	if (Number(finals.str)) {
		f.text('Encumbered', `${finals.str * 5} lb.`, { max: 8 });
		f.text('PushDragLift', `${finals.str * 30} lb.`, { max: 8 });
	}

	// ---- background and appearance (page 4)
	f.text('SIZE', race ? (race.size || '') : '', { max: 9 });
	f.text('AGE', info.age, { max: 9 });
	f.text('HEIGHT', info.height, { max: 9 });
	f.text('WEIGHT', info.weight, { max: 9 });
	f.text('ALIGNMENT', info.alignment, { max: 9 });
	f.text('SKIN', info.skin, { max: 9 });
	f.text('EYES', info.eyes, { max: 9 });
	f.text('HAIR', info.hair, { max: 9 });
	f.block('PersonalityTraits', character.background.personalityTraits, { max: 8.5 });
	f.block('Ideals', character.background.ideals, { max: 8.5 });
	f.block('Bonds', character.background.bonds, { max: 8.5 });
	f.block('Flaws', character.background.flaws, { max: 8.5 });
	f.block('Backstory', info.backstory, { max: 9 });

	// ---- spells (page 5)
	if (casting && cls) {
		// the sheet has one casting header; a multiclassed caster lists each class's numbers side by side
		f.text('spellCastingClass0', castingList.map((c) => c.className.split(' (')[0]).join(' / '), { max: 11 });
		f.text('spellCastingAbility0', castingList.map((c) => c.ability.slice(0, 3).toUpperCase()).join('/'), { max: 13 });
		f.text('spellSaveDC0', castingList.map((c) => c.saveDc).join('/'), { max: 14 });
		f.text('spellAtkBonus0', castingList.map((c) => formatSigned(c.attackBonus)).join('/'), { max: 14 });
	}
	fillSpellTable(f, character, spells, casting, cls, castingList, classNames);

	return { missing: [...f.missing] };
}

// ---- features: paragraphs flowed down the six columns ---------------------------------------------------------------

const FEATURE_COLUMNS = ['FeaturesTraits1', 'FeaturesTraits2', 'FeaturesTraits3', 'FeaturesTraits4', 'FeaturesTraits5', 'FeaturesTraits6'];

function fillFeatureColumns(f, blocks) {
	if (!blocks.some((b) => b.items.length)) return;
	const dims = f.size(FEATURE_COLUMNS[0]);
	if (!dims) return;
	const width = dims.width - 5;
	const rowsPerColumn = (size) => Math.floor((Math.abs(dims.height) - 3) / (size * 1.12));
	// the most detailed version (full text, then trimmed, then names only) at the largest font that fits all six columns
	const variants = [
		(it) => (it.text ? `${it.name}: ${it.text.replace(/\s*\n\s*/g, ' ')}` : it.name),
		(it) => (it.text ? `${it.name}: ${firstSentences(it.text, 260)}` : it.name),
		(it) => (it.text ? `${it.name}: ${firstSentences(it.text, 110)}` : it.name),
		(it) => it.name,
	];
	const sizes = [7, 6.5, 6, 5.5, 5];
	const build = (variant) => blocks.filter((b) => b.items.length).flatMap((b) => [b.title, ...b.items.map(variant), '']);
	let chosen = null;
	for (const variant of variants) {
		const paragraphs = build(variant);
		for (const size of sizes) {
			const lines = paragraphs.flatMap((p) => f.wrapText(p, size, width));
			if (lines.length <= rowsPerColumn(size) * FEATURE_COLUMNS.length) { chosen = { size, lines }; break; }
		}
		if (chosen) break;
	}
	if (!chosen) {
		const size = 5;
		chosen = { size, lines: build(variants[3]).flatMap((p) => f.wrapText(p, size, width)) };
	}
	const per = rowsPerColumn(chosen.size);
	FEATURE_COLUMNS.forEach((name, i) => {
		const slice = chosen.lines.slice(i * per, (i + 1) * per);
		if (slice.some((l) => l.trim())) f.block(name, slice.join('\n'), { max: chosen.size, min: chosen.size - 0.5, lineHeight: 1.12 });
	});
}

// ---- spells: header rows, spells and spacer rows flowed down the table ------------------------------------------------

function fillSpellTable(f, character, spells, casting, cls, castingList, classNames) {
	if (!spells.length) return;
	const slots = getSpellSlots(character);
	const slotText = (lvl) => {
		if (lvl === 0) return '(At Will)';
		let n = 0;
		if (slots?.type === 'standard') n = slots.slots[lvl] || 0;
		else if (slots?.type === 'pact' && slots.level === lvl) n = slots.count;
		if (slots?.pact && slots.pact.level === lvl) n += slots.pact.count; // Pact Magic slots next to a multiclass caster's regular ones
		return n ? `${n} Slot${n === 1 ? '' : 's'} ${'O'.repeat(Math.min(n, 4))}` : '';
	};
	const { always, grants } = spellOrigins(character);
	spells.forEach((s) => { if (s.fromItem) grants.set(s.name, s.fromItem); });
	const className = cls?.name;
	const levels = [...new Set(spells.map((s) => s.level))].sort((a, b) => a - b);

	const build = (spacers) => {
		const out = [];
		levels.forEach((lvl, i) => {
			if (i > 0 && spacers) out.push({ kind: 'blank' });
			out.push({ kind: 'header', name: lvl === 0 ? '=== CANTRIPS ===' : `=== ${ordinal(lvl)} LEVEL ===`, source: slotText(lvl) });
			spells.filter((s) => s.level === lvl).forEach((s) => out.push({ kind: 'spell', spell: s }));
		});
		return out;
	};
	let entries = build(true);
	if (entries.length > SPELL_ROWS.length) entries = build(false);
	if (entries.length > SPELL_ROWS.length) {
		const hidden = entries.length - SPELL_ROWS.length + 1;
		entries = [...entries.slice(0, SPELL_ROWS.length - 1), { kind: 'more', name: `...and ${hidden} more (see the Spells tab)` }];
	}

	entries.forEach((e, i) => {
		const row = SPELL_ROWS[i];
		if (!row || e.kind === 'blank') return;
		if (e.kind === 'header') { f.text(row.name, e.name, { max: 8 }); f.text(row.source, e.source, { max: 8 }); return; }
		if (e.kind === 'more') { f.text(row.name, e.name, { max: 8 }); return; }
		const s = e.spell;
		f.text(row.prepared, 'O', { max: 8 });
		f.text(row.name, s.name, { max: 8 });
		// a spell is cast with the class it was learned with
		const spellClass = classNames && s.casterIndex !== undefined && classNames[s.casterIndex] ? classNames[s.casterIndex] : className;
		const spellStats = (castingList || []).find((c) => c.index === s.casterIndex) || casting;
		f.text(row.source, spellSourceOf(character, s, spellClass, always, grants), { max: 7.5 });
		f.text(row.saveHit, saveOrHit(s, spellStats?.attackBonus), { max: 7.5 });
		f.text(row.castingTime, castingTimeShort(s.castingTime), { max: 7.5 });
		f.text(row.range, rangeShort(s.range), { max: 7.5 });
		f.text(row.components, componentsShort(s.components), { max: 7.5 });
		f.text(row.duration, durationShort(s.duration), { max: 7.5 });
		f.text(row.notes, [s.concentration ? 'Concentration' : '', s.ritual ? 'Ritual' : ''].filter(Boolean).join(', '), { max: 7.5 });
	});
}
