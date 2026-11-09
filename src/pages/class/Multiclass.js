import * as React from 'react';
import {
	Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Card, CardContent, Chip, FormControl, FormControlLabel, IconButton,
	InputLabel, ListSubheader, MenuItem, Select, Switch, Tooltip, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCharacter } from '../../context/CharacterContext';
import { getEditionData } from '../../data';
import skills from '../../data/skills';
import { musicalInstruments } from '../../data/toolLists';
import {
	getClass, getFinalAbilities, getHitDice, getLevel, getProficiencyBonus, getProficientSkills, getSpellSlots,
} from '../../utils/characterCalc';
import { fillHpRolls, rollAllHitDice } from '../../utils/hitPoints';
import {
	MAX_LEVEL, describePrereq, emptyExtraClass, getClassLevelOf, getClassViews, getMulticlass, getMulticlassProficiencies, meetsPrereq,
} from '../../utils/multiclass';
import ClassTable from './ClassTable';
import ClassLevels from './ClassLevels';

const list = (items, none = 'nothing new') => (items.length ? items.join(', ') : none);

// What a later class gives, as text.
function gainsText(className) {
	const p = getMulticlassProficiencies(className);
	const parts = [];
	if (p.armor.length) parts.push(p.armor.join(', ').toLowerCase());
	if (p.weapons.length) parts.push(p.weapons.join(', ').toLowerCase());
	if (p.tools.length) parts.push(p.tools.join(', ').toLowerCase());
	if (p.skills) parts.push(p.skills.from === 'any' ? 'one skill of your choice' : "one skill from the class's skill list");
	if (p.instrument) parts.push('one musical instrument of your choice');
	return list(parts, 'no new proficiencies');
}

function ExtraClass({ slot, view, character, classes, scores, enforce, taken }) {
	const { updateExtraClass, updateClass, updateMulticlass } = useCharacter();
	const entry = character.classInfo.multiclass.classes[slot];
	const cls = classes[entry.className];
	const total = getLevel(character);
	const maxLevel = MAX_LEVEL - (total - (view ? getClassLevelOf(view) : 0));
	const rolling = character.classInfo.hpMethod === 'roll';
	const proficiencies = getMulticlassProficiencies(entry.className);
	const alreadyProficient = getProficientSkills(character).filter((s) => s !== entry.skill);
	const skillPool = !proficiencies.skills ? [] : proficiencies.skills.from === 'any' || !cls
		? skills.map((s) => s.name)
		: (cls.skillChoices.from === 'any' ? skills.map((s) => s.name) : cls.skillChoices.from);

	// the classes the character already has (the first class and the other slots): their prerequisites must be met too
	const others = [character.classInfo.className, ...character.classInfo.multiclass.classes.filter((_, i) => i !== slot).map((c) => c.className)].filter(Boolean);
	const blockedByCurrent = enforce ? others.find((n) => !meetsPrereq(n, scores)) : null;
	const reason = (name) => {
		if (!enforce) return '';
		if (!meetsPrereq(name, scores)) return `needs ${describePrereq(name)}`;
		if (blockedByCurrent) return `your ${blockedByCurrent} needs ${describePrereq(blockedByCurrent)}`;
		return '';
	};

	const pickClass = (name) => {
		const next = classes[name];
		updateExtraClass(slot, {
			...emptyExtraClass(name),
			hpRolls: rolling && next ? rollAllHitDice(next.hitDie, 2) : [],
		});
		updateClass({ hpOverride: '' });
	};
	const setLevel = (level) => {
		updateExtraClass(slot, (c) => ({ level, hpRolls: rolling && cls ? fillHpRolls(c.hpRolls, cls.hitDie, level + 1) : c.hpRolls }));
		updateClass({ hpOverride: '' });
	};
	const remove = () => {
		updateMulticlass((mc) => ({ classes: mc.classes.filter((_, i) => i !== slot) }));
		updateClass({ hpOverride: '' });
	};

	return (
		<Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, padding: 2, marginTop: 2 }}>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
				<FormControl size="small" sx={{ minWidth: 220, flex: 1 }}>
					<InputLabel>{slot === 0 ? 'Second class' : `Class ${slot + 2}`}</InputLabel>
					<Select
						label={slot === 0 ? 'Second class' : `Class ${slot + 2}`}
						value={entry.className}
						onChange={(e) => pickClass(e.target.value)}
						MenuProps={{ PaperProps: { sx: { maxHeight: 420 } } }}
					>
						{Object.keys(classes).map((name) => {
							const why = taken.includes(name) && name !== entry.className ? 'already taken' : reason(name);
							return (
								<MenuItem key={name} value={name} disabled={!!why && name !== entry.className}>
									{name}
									{why && <Typography component="span" variant="caption" sx={{ marginLeft: 1, color: 'text.secondary' }}>({why})</Typography>}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				{cls && (
					<FormControl size="small" sx={{ minWidth: 110 }}>
						<InputLabel>Levels</InputLabel>
						<Select label="Levels" value={Math.min(entry.level, maxLevel)} onChange={(e) => setLevel(e.target.value)}>
							{Array.from({ length: Math.max(1, maxLevel) }, (_, i) => i + 1).map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
						</Select>
					</FormControl>
				)}
				<Tooltip title="Remove this class">
					<IconButton aria-label="Remove this class" onClick={remove}><DeleteIcon /></IconButton>
				</Tooltip>
			</Box>

			{!cls && <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1.5 }}>Choose the class you take your next levels in.</Typography>}

			{cls && (
				<>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1.5 }}>
						<Chip size="small" label={`Hit Die: d${cls.hitDie}`} />
						{cls.spellcastingAbility && <Chip size="small" label={`Spellcasting: ${cls.spellcastingAbility}`} />}
						<Chip size="small" variant="outlined" label={`Prerequisite: ${describePrereq(cls.name)}`} />
					</Box>
					<Typography variant="body2" sx={{ marginTop: 1 }}>
						<strong>Proficiencies gained by multiclassing:</strong> {gainsText(cls.name)}.
						{proficiencies.note && <> {proficiencies.note}</>}
					</Typography>
					{(proficiencies.skills || proficiencies.instrument) && (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 1.5 }}>
							{proficiencies.skills && (
								<FormControl size="small" sx={{ minWidth: 220 }}>
									<InputLabel>{proficiencies.skills.from === 'any' ? 'Skill (your choice)' : 'Skill (from the class list)'}</InputLabel>
									<Select
										label={proficiencies.skills.from === 'any' ? 'Skill (your choice)' : 'Skill (from the class list)'}
										value={entry.skill || ''}
										onChange={(e) => updateExtraClass(slot, { skill: e.target.value })}
										MenuProps={{ PaperProps: { sx: { maxHeight: 360 } } }}
									>
										<MenuItem value=""><em>None yet</em></MenuItem>
										{skillPool.map((name) => (
											<MenuItem key={name} value={name} disabled={alreadyProficient.includes(name)}>
												{name}{alreadyProficient.includes(name) && <Typography component="span" variant="caption" sx={{ marginLeft: 1 }}>(already proficient)</Typography>}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
							{proficiencies.instrument && (
								<FormControl size="small" sx={{ minWidth: 220 }}>
									<InputLabel>Musical instrument</InputLabel>
									<Select label="Musical instrument" value={entry.instrument || ''} onChange={(e) => updateExtraClass(slot, { instrument: e.target.value })}>
										<MenuItem value=""><em>None yet</em></MenuItem>
										{musicalInstruments.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
									</Select>
								</FormControl>
							)}
						</Box>
					)}
					<Accordion disableGutters sx={{ marginTop: 2 }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>{cls.name} class table</Typography></AccordionSummary>
						<AccordionDetails sx={{ paddingTop: 0 }}>
							<ClassTable cls={cls} level={entry.level} />
						</AccordionDetails>
					</Accordion>
					{view && (
						<ClassLevels
							key={`${slot}:${cls.name}`}
							character={view}
							updateClass={(patch) => updateExtraClass(slot, patch)}
						/>
					)}
				</>
			)}
		</Box>
	);
}

// The multiclassing section of the Class step (2014 rules, Player's Handbook chapter 6).
export default function Multiclass() {
	const { character, updateMulticlass, updateClass } = useCharacter();
	const classes = getEditionData(character.edition).classes;
	const { enabled, ignorePrereqs, classes: entries } = getMulticlass(character);
	const enforce = !ignorePrereqs;
	const views = getClassViews(character);
	const total = getLevel(character);
	const scores = Object.fromEntries(Object.entries(getFinalAbilities(character)).map(([k, v]) => [k, Number(v) || 0]));
	const taken = [character.classInfo.className, ...entries.map((e) => e.className)].filter(Boolean);
	const primary = getClass(character);
	if (!primary) return null;
	const unmet = enforce ? taken.filter((n) => !meetsPrereq(n, scores)) : [];
	const dice = getHitDice(character);
	const slots = getSpellSlots(character);
	const canAdd = total < MAX_LEVEL && taken.length < Object.keys(classes).length && entries.every((e) => e.className);

	const toggle = (on) => {
		updateMulticlass((mc) => ({ enabled: on, classes: mc.classes || [] }));
		updateClass({ hpOverride: '' });
	};

	return (
		<Card sx={{ backgroundColor: 'background.paper', marginTop: 3 }}>
			<CardContent sx={{ padding: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
					<Typography variant="h6" sx={{ flex: 1 }}>Multiclassing</Typography>
					<FormControlLabel
						sx={{ marginRight: 0 }}
						control={<Switch checked={enabled} onChange={(e) => toggle(e.target.checked)} />}
						label="Use multiclassing"
					/>
				</Box>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>
					Take levels in more than one class instead of only raising your first. Your character level is all your class levels added together (at most {MAX_LEVEL}).
				</Typography>

				{enabled && (
					<>
						<FormControlLabel
							sx={{ display: 'block', marginTop: 1 }}
							control={<Switch size="small" checked={enforce} onChange={(e) => updateMulticlass({ ignorePrereqs: !e.target.checked })} />}
							label={<Typography variant="body2">Require the ability score prerequisites</Typography>}
						/>
						<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', marginBottom: 1 }}>
							To take a class you need a score of 13 in the right abilities for it and for every class you already have (for example a Barbarian
							who wants to be a Druid needs Strength 13 and Wisdom 13). Turn this off to ignore the prerequisites.
						</Typography>

						{unmet.length > 0 && entries.length > 0 && (
							<Alert severity="warning" sx={{ marginTop: 1 }}>
								{unmet.map((n) => `${n} needs ${describePrereq(n)}`).join('; ')}. Raise your ability scores on the Abilities step, or turn the prerequisites off.
							</Alert>
						)}

						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
							<Chip color="primary" label={`Character level ${total}`} />
							<Chip variant="outlined" label={views.map((v) => `${v.classInfo.className} ${getClassLevelOf(v)}`).join(' / ')} />
							<Chip variant="outlined" label={`Proficiency bonus +${getProficiencyBonus(total)}`} />
							<Chip variant="outlined" label={`Hit dice: ${dice.map((d) => `${d.count}d${d.die}`).join(' + ')}`} />
							{slots && slots.type === 'standard' && slots.combined !== undefined && (
								<Chip variant="outlined" label={`Spellcaster level ${slots.combined}`} />
							)}
						</Box>

						{entries.map((entry, slot) => (
							<ExtraClass
								key={slot}
								slot={slot}
								view={views.find((v) => v.__slot === slot)}
								character={character}
								classes={classes}
								scores={scores}
								enforce={enforce}
								taken={taken}
							/>
						))}

						<Box sx={{ marginTop: 2 }}>
							<Button variant="outlined" startIcon={<AddIcon />} disabled={!canAdd} onClick={() => updateMulticlass((mc) => ({ classes: [...mc.classes, emptyExtraClass('')] }))}>
								Add a class
							</Button>
							{total >= MAX_LEVEL && <Typography variant="caption" sx={{ marginLeft: 1.5, color: 'text.secondary' }}>You are already level {MAX_LEVEL}. Lower a class level to make room.</Typography>}
						</Box>

						<Accordion disableGutters sx={{ marginTop: 3 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>How multiclassing works</Typography></AccordionSummary>
							<AccordionDetails>
								<Rules />
							</AccordionDetails>
						</Accordion>
					</>
				)}
			</CardContent>
		</Card>
	);
}

function Rules() {
	const items = [
		['Hit points', 'Your first level in your first class gives that class\'s maximum hit die. Every other level, in any class, adds the average or a roll of that class\'s hit die, plus your Constitution modifier.'],
		['Hit dice', 'The hit dice of all your classes are pooled. Dice of the same size combine; different sizes are tracked separately.'],
		['Proficiency bonus', 'Based on your total character level, not your level in one class.'],
		['Proficiencies', 'A class after your first only gives you part of its starting proficiencies (shown on each class above). Saving throws and starting equipment come from your first class only.'],
		['Spell slots', 'Add your levels in bard, cleric, druid, sorcerer and wizard, half your paladin and ranger levels (rounded down), half your artificer levels (rounded up) and a third of your fighter or rogue levels if you are an Eldritch Knight or Arcane Trickster (rounded down). Use that total on the Multiclass Spellcaster table. Warlock Pact Magic slots stay separate, but both kinds of slot can cast spells from any of your classes.'],
		['Spells known and prepared', 'Worked out class by class, as if you were a single-class member of each. Each spell uses the spellcasting ability of the class it was learned with. A cantrip that grows stronger uses your character level.'],
		['Channel Divinity', 'If two classes give you Channel Divinity you get the options of both, but not extra uses. You gain more uses only at class levels that say so.'],
		['Extra Attack', 'Extra Attack from more than one class does not add up: two attacks at most, unless the Fighter\'s own version gives more.'],
		['Unarmored Defense', 'If you already have Unarmored Defense (Barbarian or Monk) you cannot gain it again from another class. Your armor class uses the first one you took.'],
	];
	return (
		<Box>
			{items.map(([title, text]) => (
				<Typography key={title} variant="body2" sx={{ marginBottom: 1 }}><strong>{title}.</strong> {text}</Typography>
			))}
			<ListSubheader disableSticky sx={{ paddingLeft: 0, background: 'transparent', lineHeight: 2 }}>Prerequisites</ListSubheader>
			<Typography variant="body2">
				Barbarian: Strength 13 · Bard: Charisma 13 · Cleric: Wisdom 13 · Druid: Wisdom 13 · Fighter: Strength 13 or Dexterity 13 · Monk: Dexterity 13 and Wisdom 13 ·
				Paladin: Strength 13 and Charisma 13 · Ranger: Dexterity 13 and Wisdom 13 · Rogue: Dexterity 13 · Sorcerer: Charisma 13 · Warlock: Charisma 13 · Wizard: Intelligence 13
				· Artificer: Intelligence 13
			</Typography>
		</Box>
	);
}
