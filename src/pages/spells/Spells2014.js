import * as React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { getClass, getSpellSlots, getSpellcastingStatsList } from '../../utils/characterCalc';
import { formatSigned } from '../../utils/abilityScore';
import { findSpell, getAlwaysPrepared, getGrantedSpellSources, getSpellSections } from '../../utils/spells2014';
import { getRaceSpellInfo } from '../../utils/raceChoices';
import { USE_TEXT, getFeatGrantedSpells } from '../../utils/featSpells';
import useSpellDetails from '../../utils/useSpellDetails';
import SpellPicker2014 from './SpellPicker2014';

function Stat({ label, children }) {
	return (
		<Box sx={{ minWidth: 110 }}>
			<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{label}</Typography>
			<Typography sx={{ fontWeight: 700, fontSize: 20 }}>{children}</Typography>
		</Box>
	);
}

const pactText = (p) => `${p.count} Pact Magic slot${p.count === 1 ? '' : 's'} of level ${p.level} (refresh on a short rest)`;

export default function Spells2014() {
	const { character, updateClass, updateExtraClass } = useCharacter();
	const details = useSpellDetails();
	// One set of spellcasting numbers for each class that casts (Eldritch Knights and Arcane Tricksters cast with Intelligence
	// even though their class does not).
	const statsList = getSpellcastingStatsList(character);
	const multi = statsList.length > 1;
	const slots = getSpellSlots(character);
	const sections = getSpellSections(character);
	const casterNames = [...new Set(sections.map((s) => s.className))]; // the classes that have spells to choose
	const always = getAlwaysPrepared(character);
	// spells the subclass, race or feats already give: marked in the pickers so they aren't picked twice
	const taken = getGrantedSpellSources(character);
	// a sorcerer or ranger knows its subclass spells; a cleric, druid, paladin or artificer has them prepared
	const alwaysHow = always.every((s) => s.known) ? 'known' : always.some((s) => s.known) ? 'mixed' : 'prepared';
	// grouped by spell level; a spell from a table with several columns carries the column's name (a Lunar Sorcery moon phase)
	const alwaysByLevel = Object.entries(always.reduce((acc, s) => {
		const lv = findSpell(s.name)?.level ?? 0;
		(acc[lv] ||= []).push(s);
		return acc;
	}, {})).sort(([a], [b]) => Number(a) - Number(b));
	const groupNames = [...new Set(always.map((s) => s.group).filter(Boolean))];
	const racial = getRaceSpellInfo(character).fixed;
	const featGranted = getFeatGrantedSpells(character);
	const cls = getClass(character);
	// updater: (currentNames) => newNames, applied to the latest stored value in the choices of the class the section belongs to
	const setSection = (section, updater) => {
		const apply = (classInfo) => ({ choices: { ...(classInfo.choices || {}), [section.choiceId]: updater((classInfo.choices || {})[section.choiceId] || []) } });
		if (section.slot < 0) updateClass(apply);
		else updateExtraClass(section.slot, apply);
	};

	const slotChips = [
		...(slots?.type === 'standard' ? Object.entries(slots.slots).filter(([, n]) => n > 0).map(([l, n]) => `Level ${l}: ${n}`) : []),
		...(slots?.type === 'pact' ? [pactText(slots)] : []),
		...(slots?.pact ? [pactText(slots.pact)] : []),
	];

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Spells', character)}
				title="Spells"
				subtitle={cls ? `Choose the spells your ${casterNames.join(' and ') || cls.name} ${casterNames.length > 1 ? 'know' : 'knows'}. Tap a spell's arrow to read it.` : 'Choose a class first.'}
			/>

			{!sections.length && (
				<Typography color="text.secondary">
					{cls ? `Your ${cls.name} has no spells to choose yet. Pick a subclass or raise your level on the Class step if it should.` : 'Pick a class on the Class step first.'}
				</Typography>
			)}

			{statsList.length > 0 && sections.length > 0 && (
				<Card sx={{ marginBottom: 2, backgroundColor: 'background.paper' }}>
					<CardContent>
						{statsList.map((stats) => (
							<Box key={stats.index} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: multi ? 1.5 : 0 }}>
								{multi && <Typography sx={{ fontWeight: 700, minWidth: 150 }}>{stats.className}</Typography>}
								<Stat label="Spellcasting ability">{stats.ability}</Stat>
								<Stat label="Spell save DC">{stats.saveDc}</Stat>
								<Stat label="Spell attack">{formatSigned(stats.attackBonus)}</Stat>
							</Box>
						))}
						{slotChips.length > 0 && (
							<Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', marginTop: 1.5 }}>
								<Typography variant="body2" sx={{ color: 'text.secondary', marginRight: 0.5 }}>
									{slots?.combined !== undefined ? `Spell slots (combined spellcaster level ${slots.combined})` : 'Spell slots'}
								</Typography>
								{slotChips.map((c) => <Chip key={c} size="small" label={c} />)}
							</Box>
						)}
						{multi && (
							<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', marginTop: 1 }}>
								Spells known and prepared are worked out class by class. Each spell uses the spellcasting ability of the class you learned it with.
							</Typography>
						)}
					</CardContent>
				</Card>
			)}

			{sections.map((section) => (
				<SpellPicker2014 key={section.id} section={section} details={details} taken={taken} onChange={(updater) => setSection(section, updater)} />
			))}

			{racial.length > 0 && (
				<Card sx={{ marginBottom: 2, backgroundColor: 'background.paper' }}>
					<CardContent>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>Racial spells</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
							Spells your race gives you. Cantrips are known at will; leveled ones can usually be cast once per long rest (see your racial traits). Racial cantrips you get to pick are chosen on the Race step.
						</Typography>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{racial.map((sp) => <Chip key={sp.name} size="small" label={sp.level === 0 ? `${sp.name} (cantrip)` : `${sp.name} (level ${sp.characterLevel})`} />)}
						</Box>
					</CardContent>
				</Card>
			)}

			{featGranted.length > 0 && (
				<Card sx={{ marginBottom: 2, backgroundColor: 'background.paper' }}>
					<CardContent>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>Feat spells</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
							Spells your feats give you. You choose them where you picked the feat (the Class step for an Ability Score Improvement, the Race step for a racial feat).
						</Typography>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{featGranted.map((sp) => (
								<Chip key={sp.name} size="small" label={`${sp.name} (${sp.from}${USE_TEXT[sp.use] ? `, ${USE_TEXT[sp.use]}` : ''})`} />
							))}
						</Box>
					</CardContent>
				</Card>
			)}

			{always.length > 0 && (
				<Card sx={{ marginBottom: 2, backgroundColor: 'background.paper' }}>
					<CardContent>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>{alwaysHow === 'mixed' ? 'Subclass spells' : `Always ${alwaysHow}`}</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
							{[...new Set(always.map((a) => a.from))].join(' and ')} spells are always {alwaysHow === 'mixed' ? 'known or prepared' : alwaysHow} and don&apos;t count against your limit.
						</Typography>
						{groupNames.length > 0 && (
							<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
								Each spell is tagged with its column of the subclass table ({groupNames.join(', ')}).
								{always.some((s) => s.from === 'Lunar Sorcery') && ' You know all of them. After each long rest you choose a lunar phase, and you can cast one 1st-level spell of that phase once without a spell slot.'}
							</Typography>
						)}
						{alwaysByLevel.map(([lv, list]) => (
							<Box key={lv} sx={{ marginTop: 1 }}>
								<Typography variant="subtitle2" sx={{ color: 'primary.main' }}>{Number(lv) === 0 ? 'Cantrips' : `Level ${lv}`}</Typography>
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 0.5 }}>
									{list.map((s) => (
										<Chip
											key={s.name}
											size="small"
											label={s.group ? <span>{s.name} <Box component="span" sx={{ opacity: 0.7 }}>· {s.group}</Box></span> : s.name}
										/>
									))}
								</Box>
							</Box>
						))}
					</CardContent>
				</Card>
			)}
		</>
	);
}
