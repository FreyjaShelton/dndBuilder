import * as React from 'react';
import {
	Box, Card, CardContent, Checkbox, Chip, FormControlLabel, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import skills from '../../data/skills';
import { ABILITY_NAMES, formatSigned } from '../../utils/abilityScore';
import {
	getBackgroundSkills, getClass, getProficientSkills, getRacialSkills, getSkillBonuses, is2024, isSkillOverride,
} from '../../utils/characterCalc';
import { getExpertiseSkills } from '../../utils/classChoices';
import { getExtraClassViews } from '../../utils/multiclass';

export default function Skills() {
	const { character, updateSkills } = useCharacter();
	const cls = getClass(character);
	const chosen = character.skills.classChoices;
	const fromBackground = getBackgroundSkills(character);
	const fromRace = getRacialSkills(character);
	// the skill a later class (bard, ranger, rogue) added when multiclassing is picked on the Class step
	const fromLaterClasses = getExtraClassViews(character).filter((v) => v.classInfo.skill).map((v) => ({ name: v.classInfo.skill, className: v.classInfo.className }));
	const locked = [...fromBackground, ...fromRace, ...fromLaterClasses.map((x) => x.name)];
	const options = cls
		? (cls.skillChoices.from === 'any' ? skills.map((s) => s.name) : cls.skillChoices.from)
		: [];
	const limit = cls ? cls.skillChoices.count : 0;

	const toggle = (name) => {
		if (chosen.includes(name)) updateSkills({ classChoices: chosen.filter((n) => n !== name) });
		else if (chosen.length < limit) updateSkills({ classChoices: [...chosen, name] });
	};

	const bonuses = getSkillBonuses(character);

	// 2014: override everything the class, background and species hand out and choose the proficiencies yourself
	const canOverride = !is2024(character);
	const override = isSkillOverride(character);
	const manual = character.skills.manual || [];
	const manualExpertise = character.skills.manualExpertise || [];
	const setOverride = (on) => {
		// start from what the defaults gave, so it can be adjusted rather than rebuilt
		if (on) updateSkills({ override: true, manual: getProficientSkills(character), manualExpertise: getExpertiseSkills(character) });
		else updateSkills({ override: false });
	};
	const toggleManual = (name) => {
		const has = manual.includes(name);
		updateSkills({
			manual: has ? manual.filter((n) => n !== name) : [...manual, name],
			// expertise needs proficiency
			manualExpertise: has ? manualExpertise.filter((n) => n !== name) : manualExpertise,
		});
	};
	const toggleExpertise = (name) => updateSkills({ manualExpertise: manualExpertise.includes(name) ? manualExpertise.filter((n) => n !== name) : [...manualExpertise, name] });

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Skills', character)}
				title="Skills"
				subtitle={override
					? "Override is on: tick exactly the skills your character is proficient in, and which of those have expertise."
					: "Choose your class skill proficiencies. Background and racial skills are added automatically."}
			/>
			<Card sx={{ backgroundColor: 'background.paper', marginBottom: 3 }}>
				<CardContent sx={{ padding: 3 }}>
					{canOverride && (
						<Box sx={{ marginBottom: override ? 0 : 2 }}>
							<FormControlLabel
								control={<Switch checked={override} onChange={(e) => setOverride(e.target.checked)} />}
								label="Override the default skills"
							/>
							<Typography variant="body2" color="text.secondary">
								{override
									? "Nothing is added or limited automatically: the class, background and species skills no longer apply. Tick any skills in the table below. Turn this off to go back to the defaults."
									: "Turn on to ignore the class, background and species skill rules and choose any skills yourself."}
							</Typography>
						</Box>
					)}
					{override ? null : !cls ? (
						<Typography color="text.secondary">Pick a class first to choose its skills.</Typography>
					) : (
						<>
							<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
								{cls.name}: choose {limit} ({chosen.length}/{limit})
							</Typography>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 1 }}>
								{options.map((name) => {
									const alreadyHave = locked.includes(name);
									return (
										<FormControlLabel
											key={name}
											sx={{ width: { xs: '100%', sm: '50%' }, margin: 0 }}
											control={
												<Checkbox
													checked={chosen.includes(name) || alreadyHave}
													disabled={alreadyHave || (!chosen.includes(name) && chosen.length >= limit)}
													onChange={() => toggle(name)}
												/>
											}
											label={alreadyHave ? `${name} (already proficient)` : name}
										/>
									);
								})}
							</Box>
						</>
					)}
					{bonuses.some((s) => s.fromItem) && (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
							{bonuses.filter((s) => s.fromItem).map((s) => <Chip key={`item-${s.name}`} size="small" color="secondary" variant="outlined" label={`${s.name} (magic item)`} />)}
						</Box>
					)}
					{!override && <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
						{fromBackground.map((n) => <Chip key={`bg-${n}`} size="small" label={`${n} (background)`} />)}
						{fromRace.map((n) => <Chip key={`race-${n}`} size="small" label={`${n} (race)`} />)}
						{fromLaterClasses.map((x) => <Chip key={`mc-${x.name}`} size="small" label={`${x.name} (${x.className})`} />)}
					</Box>}
				</CardContent>
			</Card>
			<TableContainer sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Skill</TableCell>
							<TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Ability</TableCell>
							<TableCell align="center">Proficient</TableCell>
							{override && <TableCell align="center">Expertise</TableCell>}
							<TableCell align="right">Bonus</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{bonuses.map((s) => (
							<TableRow key={s.key}>
								<TableCell>{s.name}<Typography component="span" variant="caption" sx={{ display: { xs: "inline", sm: "none" }, color: "text.secondary", marginLeft: 0.75 }}>{s.ability.toUpperCase()}</Typography></TableCell>
								<TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{ABILITY_NAMES[s.ability]}</TableCell>
								<TableCell align="center">
									{override ? (
										<Checkbox checked={manual.includes(s.name)} onChange={() => toggleManual(s.name)} inputProps={{ 'aria-label': `${s.name} proficiency` }} />
									) : (s.proficient ? '●' : '')}
								</TableCell>
								{override && (
									<TableCell align="center">
										<Checkbox
											checked={manualExpertise.includes(s.name)}
											disabled={!manual.includes(s.name)}
											onChange={() => toggleExpertise(s.name)}
											inputProps={{ 'aria-label': `${s.name} expertise` }}
										/>
									</TableCell>
								)}
								<TableCell align="right">{formatSigned(s.bonus)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
