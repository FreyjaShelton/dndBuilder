import * as React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import {
	getAbilityMods, getClass, getLevel, getProficiencyBonus, getSpellSlots, getSpellcastingStats,
} from '../../utils/characterCalc';
import { formatSigned } from '../../utils/abilityScore';
import { getSubclass } from '../../utils/classChoices';
import { getAlwaysPrepared, getSpellSections } from '../../utils/spells2014';
import { getRaceSpellInfo } from '../../utils/raceChoices';
import { USE_TEXT, getFeatGrantedSpells } from '../../utils/featSpells';
import useSpellDetails from '../../utils/useSpellDetails';
import SpellPicker2014 from './SpellPicker2014';

// Eldritch Knights and Arcane Tricksters cast with Intelligence even though their class does not.
function useCasterStats(character) {
	const stats = getSpellcastingStats(character);
	if (stats) return stats;
	const sub = getSubclass(character);
	if (!sub || !['Eldritch Knight', 'Arcane Trickster'].includes(sub.name)) return null;
	const mod = getAbilityMods(character).int;
	const prof = getProficiencyBonus(getLevel(character));
	return { className: `${getClass(character).name} (${sub.name})`, ability: 'Intelligence', saveDc: 8 + prof + mod, attackBonus: prof + mod };
}

function Stat({ label, children }) {
	return (
		<Box sx={{ minWidth: 110 }}>
			<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{label}</Typography>
			<Typography sx={{ fontWeight: 700, fontSize: 20 }}>{children}</Typography>
		</Box>
	);
}

export default function Spells2014() {
	const { character, updateClass } = useCharacter();
	const details = useSpellDetails();
	const stats = useCasterStats(character);
	const slots = getSpellSlots(character);
	const sections = getSpellSections(character);
	const always = getAlwaysPrepared(character);
	const racial = getRaceSpellInfo(character).fixed;
	const featGranted = getFeatGrantedSpells(character);
	const cls = getClass(character);
	// updater: (currentNames) => newNames, applied to the latest stored value
	const setSection = (id, updater) => updateClass((classInfo) => ({ choices: { ...(classInfo.choices || {}), [id]: updater((classInfo.choices || {})[id] || []) } }));

	const slotChips = slots?.type === 'standard'
		? Object.entries(slots.slots).filter(([, n]) => n > 0).map(([l, n]) => `Level ${l}: ${n}`)
		: slots?.type === 'pact' ? [`${slots.count} slot${slots.count === 1 ? '' : 's'} of level ${slots.level} (refresh on a short rest)`] : [];

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Spells', character)}
				title="Spells"
				subtitle={cls ? `Choose the spells your ${cls.name} knows. Tap a spell's arrow to read it.` : 'Choose a class first.'}
			/>

			{!sections.length && (
				<Typography color="text.secondary">
					{cls ? `Your ${cls.name} has no spells to choose yet. Pick a subclass or raise your level on the Class step if it should.` : 'Pick a class on the Class step first.'}
				</Typography>
			)}

			{stats && sections.length > 0 && (
				<Card sx={{ marginBottom: 2, backgroundColor: 'background.paper' }}>
					<CardContent>
						<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
							<Stat label="Spellcasting ability">{stats.ability}</Stat>
							<Stat label="Spell save DC">{stats.saveDc}</Stat>
							<Stat label="Spell attack">{formatSigned(stats.attackBonus)}</Stat>
						</Box>
						{slotChips.length > 0 && (
							<Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', marginTop: 1.5 }}>
								<Typography variant="body2" sx={{ color: 'text.secondary', marginRight: 0.5 }}>Spell slots</Typography>
								{slotChips.map((c) => <Chip key={c} size="small" label={c} />)}
							</Box>
						)}
					</CardContent>
				</Card>
			)}

			{sections.map((section) => (
				<SpellPicker2014 key={section.id} section={section} details={details} onChange={(updater) => setSection(section.id, updater)} />
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
						<Typography variant="h6" sx={{ fontWeight: 700 }}>Always prepared</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
							{always[0].from} spells are always prepared and don&apos;t count against your limit.
						</Typography>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{always.map((s) => <Chip key={s.name} size="small" label={s.name} />)}
						</Box>
					</CardContent>
				</Card>
			)}
		</>
	);
}
