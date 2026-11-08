import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getEditionData } from '../../data';
import { getClassFeatureNames, getOriginFeats } from '../../utils/characterCalc';
import { getSheetFeatures } from '../../utils/classChoices';
import { getRaceChoiceSummaries } from '../../utils/raceChoices';

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

export default function FeaturesTab({ character, d }) {
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
			{feats.length > 0 && (
				<Section title="Feats">
					{feats.map((f) => <Entry key={f.name} title={f.name}>{f.description}</Entry>)}
				</Section>
			)}
			{d.background?.feature?.name && (
				<Section title="Background feature">
					<Entry title={d.background.feature.name}>{d.background.feature.description}</Entry>
				</Section>
			)}
		</Box>
	);
}
