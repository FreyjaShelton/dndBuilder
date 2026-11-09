import * as React from 'react';
import {
	Accordion, AccordionDetails, AccordionSummary, Box, Chip, FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardSelector from '../../components/CardSelector';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { getEditionData } from '../../data';
import { getLevel, is2024 } from '../../utils/characterCalc';
import { getClassViews, MAX_LEVEL } from '../../utils/multiclass';
import { fillHpRolls, rollAllHitDice } from '../../utils/hitPoints';
import HitPointControls from './HitPointControls';
import ClassLevels from './ClassLevels';
import ClassTable from './ClassTable';
import Multiclass from './Multiclass';

function Stat({ label, children }) {
	return (
		<Typography variant="body2" sx={{ marginTop: 0.5 }}>
			<strong>{label}:</strong> {children}
		</Typography>
	);
}

export default function Class() {
	const { character, updateClass, updateSkills, updateSpells } = useCharacter();
	const { className, level } = character.classInfo;
	const classes = getEditionData(character.edition).classes;
	const cls = classes[className];
	// the levels taken in later classes (multiclassing) use up part of the 20
	const otherLevels = getLevel(character) - Number(level || 1);
	const maxLevel = Math.max(1, MAX_LEVEL - Math.max(0, otherLevels));
	const multiclassed = getClassViews(character).length > 1;

	const handleClassChange = (event) => {
		const next = classes[event.target.value];
		// rolls belong to the old class's hit die, so roll again for the new one
		updateClass((ci) => ({
			className: event.target.value, subclass: '', optionalFeatures: [], choices: {}, hpOverride: '',
			hpRolls: ci.hpMethod === 'roll' && next ? rollAllHitDice(next.hitDie, ci.level) : [],
			// a class can't be both the first class and a later one
			...(ci.multiclass ? { multiclass: { ...ci.multiclass, classes: (ci.multiclass.classes || []).filter((c) => c.className !== event.target.value) } } : {}),
		}));
		updateSkills({ classChoices: [] });
		updateSpells({ cantrips: [], prepared: [], spellbook: [] });
	};

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Class', character)}
				title="Class"
				subtitle="Your class defines your hit points, proficiencies, and what you can do."
			/>
			<CardSelector title="Choose a class" value={className} onChange={handleClassChange}>
				{Object.keys(classes).map((name) => (
					<MenuItem key={name} value={name}>{name}</MenuItem>
				))}
				{cls && (
					<span>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, marginBottom: 2 }}>
							<FormControl sx={{ minWidth: 140 }} size="small">
							<InputLabel>Level</InputLabel>
							<Select
									label="Level"
									value={level}
									onChange={(e) => {
										const newLevel = e.target.value;
										updateClass((ci) => ({ level: newLevel, hpOverride: '', hpRolls: ci.hpMethod === 'roll' ? fillHpRolls(ci.hpRolls, cls.hitDie, newLevel) : ci.hpRolls }));
									}}
								>
								{Array.from({ length: maxLevel }, (_, i) => i + 1).map((l) => (
									<MenuItem key={l} value={l}>{l}</MenuItem>
								))}
							</Select>
						</FormControl>
								{multiclassed && <Chip color="primary" size="small" label={`Character level ${getLevel(character)}`} />}
							<HitPointControls character={character} cls={cls} updateClass={updateClass} />
							</Box>
							<Box sx={{ padding: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 1 }}>
								<Chip label={`Hit Die: d${cls.hitDie}`} size="small" />
								<Chip label={`Saves: ${cls.savingThrows.join(', ')}`} size="small" />
								{cls.spellcastingAbility && <Chip label={`Spellcasting: ${cls.spellcastingAbility}`} size="small" />}
							</Box>
							<Stat label="Primary ability">{cls.suggestedAbilities || cls.primaryAbility.join(', ')}</Stat>
							<Stat label="Armor">{cls.armorProficiencies}</Stat>
							<Stat label="Weapons">{cls.weaponProficiencies}</Stat>
							<Stat label="Tools">{cls.toolProficiencies}</Stat>
							<Stat label="Skills">{cls.skillChoices.raw}</Stat>
							{cls.startingGold && <Stat label="Starting gold (alternative)">{cls.startingGold}</Stat>}
							<Typography variant="body2" sx={{ marginTop: 1 }}><strong>Starting equipment</strong></Typography>
							{cls.startingEquipment.map((line, i) => (
								<Typography key={i} variant="body2" sx={{ marginLeft: 1 }}>• {line}</Typography>
							))}
						</Box>
						<ClassTable cls={cls} level={Number(level)} />
						{!is2024(character) && <ClassLevels key={className} character={character} updateClass={updateClass} />}
						<Box sx={{ marginTop: 2 }}>
							{is2024(character) && cls.features.filter((f) => f.description && f.level).map((f) => (
								<Accordion key={f.name} disableGutters>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography>{is2024(character) ? `Level ${f.level}: ${f.name}` : f.name}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{f.description}</Typography>
									</AccordionDetails>
								</Accordion>
							))}
						</Box>
					</span>
				)}
			</CardSelector>
			{cls && !is2024(character) && <Multiclass />}
		</>
	);
}
