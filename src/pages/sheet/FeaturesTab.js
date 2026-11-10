import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getEditionData } from '../../data';
import { getClassFeatureNames, getOriginFeats } from '../../utils/characterCalc';
import { getSheetFeatures } from '../../utils/classChoices';
import { getRaceChoiceSummaries } from '../../utils/raceChoices';
import { getBackgroundChoiceSummaries } from '../../utils/backgroundChoices';
import { describeMagicItem, getAttunedNames } from '../../utils/equipment';
import { abilityMaxUses, getFeatureItems } from './itemCharges';
import { bonusText } from './ItemAbilities';

const baseName = (n) => n.replace(/\s*\(.*\)\s*$/, '').trim();

function Entry({ title, children }) {
	return (
		<Accordion disableGutters sx={{ backgroundColor: 'transparent' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>{title}</Typography></AccordionSummary>
			<AccordionDetails>
				<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{children || 'No description available.'}</Typography>
			</AccordionDetails>
		</Accordion>
	);
}

function Section({ title, children }) {
	return (
		<Box sx={{ marginBottom: 3 }}>
			<Typography variant="subtitle2" sx={{ color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 0.5 }}>{title}</Typography>
			{children}
		</Box>
	);
}

// How an ability of a magic item is used, in a line: "Reaction · 2 charges · once per long rest".
function abilityFacts(ability, prof) {
	const cost = Number(ability.cost) || 0;
	const max = abilityMaxUses(ability, prof);
	return [
		ability.activation,
		cost > 0 && `${cost} charge${cost === 1 ? '' : 's'}`,
		ability.resource,
		max !== null && `${max} use${max === 1 ? '' : 's'}${ability.uses.perProficiency ? ' (your proficiency bonus)' : ''}${ability.uses.on ? ` per ${ability.uses.on === 'Dawn' ? 'dawn' : ability.uses.on.toLowerCase()}` : ''}`,
		ability.dice && `${ability.dice}${ability.diceLabel ? ` ${ability.diceLabel}` : ''}`,
		ability.save && `${String(ability.save).toUpperCase()} save${ability.dc ? ` DC ${ability.dc}` : ''}`,
	].filter(Boolean).join(' · ');
}

// The magic items the character carries, and what each one gives: bonuses, charges and every ability (the ones that are used also
// appear under Actions, Bonus actions and Reactions on the Actions tab).
function MagicItemFeatures({ character, d, play }) {
	const items = getFeatureItems(character, play.items, play.charges);
	if (!items.length) return null;
	const carried = new Set((play.items || []).filter((i) => Number(i.qty) > 0).map((i) => i.name));
	const attuned = getAttunedNames(character, carried);
	return (
		<Section title="Magic item features">
			{items.map(({ item, max }) => {
				const bonuses = bonusText(item.bonuses);
				const active = !item.attunement || attuned.includes(item.name);
				return (
					<Box key={item.name} sx={{ marginBottom: 2 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
							<Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
							{describeMagicItem(item) && <Typography variant="caption" sx={{ color: 'text.secondary' }}>{describeMagicItem(item)}</Typography>}
							{item.attunement && <Chip size="small" variant="outlined" color={active ? 'success' : 'warning'} label={active ? 'Attuned' : 'Not attuned'} />}
						</Box>
						{!active && <Typography variant="caption" sx={{ display: 'block', color: 'warning.main' }}>Attune to this item (Inventory tab) to get its bonuses and use its abilities.</Typography>}
						{bonuses && <Entry title={`Bonus: ${bonuses}`}>{`While you carry this item${item.attunement ? ' and are attuned to it' : ''}, you get ${bonuses}.`}</Entry>}
						{max > 0 && (
							<Entry title={`${max} charges${item.charges.perProficiency ? ' (your proficiency bonus)' : ''}`}>
								{`This item holds up to ${max} charges${item.charges.recharge ? ` and regains ${String(item.charges.recharge).toLowerCase() === 'all' ? 'all of them' : item.charges.recharge} after a ${String(item.charges.on || 'Long rest').toLowerCase()}` : ''}.`}
							</Entry>
						)}
						{(item.abilities || []).map((a, i) => (
							<Entry key={`${a.name}${i}`} title={`${a.name}${a.activation ? ` (${a.activation.toLowerCase()})` : ''}`}>
								{[abilityFacts(a, d.prof), a.description].filter(Boolean).join('\n\n')}
							</Entry>
						))}
					</Box>
				);
			})}
		</Section>
	);
}

export default function FeaturesTab({ character, d, play }) {
	const data = getEditionData(character.edition);
	const classFeatures = [];
	if (d.cls && character.edition === '2014') {
		getSheetFeatures(character).forEach((f) => classFeatures.push({ name: f.label, description: f.description }));
	} else if (d.cls) {
		const seen = new Set();
		getClassFeatureNames(d.cls, d.level).forEach((full) => {
			const base = baseName(full);
			if (seen.has(base)) return;
			seen.add(base);
			const match = d.cls.features.find((f) => f.name === base && f.description);
			classFeatures.push({ name: base, description: match?.description });
		});
	}
	const traits = d.race ? [...d.race.traits, ...(d.subrace?.traits || [])] : [];
	const feats = getOriginFeats(character).map((n) => {
		const base = baseName(n);
		return { name: n, description: data.feats.find((f) => f.name === base)?.description };
	});

	return (
		<Box>
			{classFeatures.length > 0 && (
				<Section title="Class features">
					{classFeatures.map((f) => <Entry key={f.name} title={f.name}>{f.description}</Entry>)}
				</Section>
			)}
			{traits.length > 0 && (
				<Section title={data.raceLabel === 'Species' ? 'Species traits' : 'Racial traits'}>
					{character.race.lineage && (
						<Typography variant="body2" sx={{ marginBottom: 0.5 }}>{d.race.lineage?.label}: <strong>{character.race.lineage}</strong></Typography>
					)}
					{character.edition === '2014' && getRaceChoiceSummaries(character).map((line) => (
						<Typography key={line} variant="body2" sx={{ marginBottom: 0.5 }}>{line}</Typography>
					))}
					{traits.map((t) => <Entry key={t.name} title={t.name}>{t.description}</Entry>)}
				</Section>
			)}
			{character.edition === '2014' && play && <MagicItemFeatures character={character} d={d} play={play} />}
			{feats.length > 0 && (
				<Section title="Feats">
					{feats.map((f) => <Entry key={f.name} title={f.name}>{f.description}</Entry>)}
				</Section>
			)}
			{character.edition === '2014' && d.background?.features?.length > 0 ? (
				<Section title={`Background: ${d.background.name}`}>
					{getBackgroundChoiceSummaries(character).map((line) => (
						<Typography key={line} variant="body2" sx={{ marginBottom: 0.5 }}>{line}</Typography>
					))}
					{d.background.features.filter((bf) => bf.description).map((bf) => <Entry key={bf.name} title={bf.name}>{bf.description}</Entry>)}
				</Section>
			) : d.background?.feature?.name && (
				<Section title="Background feature">
					<Entry title={d.background.feature.name}>{d.background.feature.description}</Entry>
				</Section>
			)}
		</Box>
	);
}
