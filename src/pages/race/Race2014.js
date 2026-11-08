import * as React from 'react';
import {
	Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Card, CardContent, Chip, FormControl, InputLabel,
	ListSubheader, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { ABILITY_NAMES, formatSigned } from '../../utils/abilityScore';
import {
	getBaseTraits, getEffectiveAsi, getRaceCategories, getRaceChoiceDefs, getRaceChoices, getRaceLanguages, getRacePending,
	getRaceRecord, getRaceSize, getRaceSpeeds, getSubraceRecord, getSubraceTraits, getVersion,
} from '../../utils/raceChoices';
import RaceChoice from './RaceChoices2014';

const RESET = { subrace: '', version: '', abilityChoices: [], skillChoices: [], lineage: '', originFeat: '', choices: {} };

function asiText(asi) {
	const parts = Object.entries(asi.fixed).map(([k, v]) => `${ABILITY_NAMES[k]} ${formatSigned(v)}`);
	if (parts.length === 6 && Object.values(asi.fixed).every((v) => v === 1)) return 'All ability scores +1';
	asi.choose.forEach((g) => parts.push(`${g.count === 1 ? 'one' : g.count} ability score${g.count === 1 ? '' : 's'} of your choice ${formatSigned(g.amount)}`));
	if (asi.flex) parts.push('+2 and +1 (or +1, +1, +1) to scores of your choice');
	return parts.join(', ') || 'None (set by your choices)';
}

const speedText = (speeds) => Object.entries(speeds).map(([k, v]) => (k === 'walk' ? `${v} ft.` : `${k} ${v} ft.`)).join(', ');

function TraitList({ traits, source }) {
	return traits.map((t) => (
		<Accordion key={`${source}-${t.name}`} disableGutters sx={{ backgroundColor: 'transparent' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography sx={{ fontWeight: 600 }}>{t.name}</Typography>
				{source && <Chip size="small" variant="outlined" label={source} sx={{ marginLeft: 1 }} />}
			</AccordionSummary>
			<AccordionDetails>
				<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{t.description}</Typography>
				{t.options && t.choose !== 'option' && t.options.map((o) => (
					<Typography key={o.name} variant="body2" sx={{ marginTop: 0.5, whiteSpace: 'pre-line' }}>• <strong>{o.name}.</strong> {o.description}</Typography>
				))}
			</AccordionDetails>
		</Accordion>
	));
}

function Tables({ tables }) {
	if (!tables?.length) return null;
	return tables.map((t, ti) => {
		const rows = t.rows.filter((r) => r.some(Boolean));
		if (rows.length < 2) return null;
		const width = Math.max(...rows.map((r) => r.length));
		return (
			<Box key={ti} sx={{ overflowX: 'auto', marginTop: 1.5 }}>
				{t.caption && <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t.caption}</Typography>}
				<Table size="small">
					<TableHead><TableRow>{Array.from({ length: width }, (_, i) => <TableCell key={i}>{rows[0][i] || ''}</TableCell>)}</TableRow></TableHead>
					<TableBody>
						{rows.slice(1).map((r, ri) => <TableRow key={ri}>{Array.from({ length: width }, (_, i) => <TableCell key={i}>{r[i] || ''}</TableCell>)}</TableRow>)}
					</TableBody>
				</Table>
			</Box>
		);
	});
}

export default function Race2014() {
	const { character, updateRace } = useCharacter();
	const rec = getRaceRecord(character);
	const version = getVersion(character);
	const sub = getSubraceRecord(character);
	const defs = getRaceChoiceDefs(character);
	const values = getRaceChoices(character);
	const pending = getRacePending(character);
	const categories = React.useMemo(() => getRaceCategories(), []);
	const raceOptions = React.useMemo(() => Object.entries(categories).flatMap(([category, names]) => names.map((name) => ({ name, category }))), [categories]);

	const setChoice = (id, value) => updateRace((race) => ({ choices: { ...(race.choices || {}), [id]: value } }));
	const pickRace = (name) => updateRace({ name: name || '', ...RESET });
	const asi = rec ? getEffectiveAsi(character) : null;
	const langs = rec ? getRaceLanguages(character) : null;

	// subraces, grouped by the book they come from
	const subGroups = React.useMemo(() => {
		const groups = [];
		(version?.subraces || []).forEach((s) => {
			const g = groups.find((x) => x.source === s.source);
			if (g) g.items.push(s); else groups.push({ source: s.source, items: [s] });
		});
		return groups;
	}, [version]);

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Race', character)}
				title="Race"
				subtitle="Your race sets ability bonuses, speed, languages and innate traits. Pick your options in the dropdowns that appear."
			/>
			<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
				<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Autocomplete
						options={raceOptions}
						value={raceOptions.find((o) => o.name === character.race.name) || null}
						groupBy={(o) => o.category}
						getOptionLabel={(o) => o.name}
						isOptionEqualToValue={(a, b) => a.name === b.name}
						onChange={(_, o) => pickRace(o ? o.name : '')}
						renderInput={(params) => <TextField {...params} label="Choose a race" />}
					/>
					{rec && rec.versions.length > 1 && (
						<FormControl fullWidth size="small">
							<InputLabel>Version</InputLabel>
							<Select
								label="Version"
								value={version.id}
								onChange={(e) => updateRace({ version: e.target.value, subrace: '', choices: {}, abilityChoices: [], skillChoices: [] })}
							>
								{rec.versions.map((v) => (
									<MenuItem key={v.id} value={v.id}>
										{v.source || 'Original'}{v.id === rec.defaultVersion ? ' (default)' : ''}{/Mordenkainen Presents/.test(v.source) ? ' · flexible ability scores' : ''}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
					{rec && version.subraces.length > 0 && (
						<FormControl fullWidth size="small">
							<InputLabel>Subrace</InputLabel>
							<Select
								label="Subrace"
								value={sub ? sub.name : ''}
								displayEmpty
								onChange={(e) => updateRace({ subrace: e.target.value, choices: {}, abilityChoices: [], skillChoices: [] })}
								MenuProps={{ PaperProps: { sx: { maxHeight: 420 } } }}
							>
								<MenuItem value=""><em>None</em></MenuItem>
								{subGroups.flatMap((g) => [
									<ListSubheader key={`h-${g.source}`}>{g.source}</ListSubheader>,
									...g.items.map((s) => <MenuItem key={s.name} value={s.name}>{s.name}</MenuItem>),
								])}
							</Select>
						</FormControl>
					)}
				</CardContent>
			</Card>

			{rec && (
				<>
					<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
						<CardContent>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 1.5 }}>
								<Chip size="small" label={`Ability: ${asiText(asi)}`} />
								<Chip size="small" label={`Size: ${getRaceSize(character)}`} />
								<Chip size="small" label={`Speed: ${speedText(getRaceSpeeds(character))}`} />
								<Chip size="small" label={`Languages: ${langs.fixed.join(', ')}${langs.pickCount ? ` + ${langs.pickCount} of your choice` : ''}`} />
							</Box>
							{version.description && <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{version.description}</Typography>}
							{sub && sub.description && (
								<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginTop: 1.5, color: 'text.secondary' }}>
									<strong>{sub.name}.</strong> {sub.description}
								</Typography>
							)}
						</CardContent>
					</Card>

					{defs.length > 0 && (
						<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
							<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography variant="h6" sx={{ fontWeight: 700 }}>Your choices</Typography>
									{pending > 0 && <Chip size="small" color="warning" variant="outlined" label={`${pending} to choose`} />}
								</Box>
								{defs.map((def) => (
									<Box key={def.id}>
										{def.kind !== 'option' && def.kind !== 'skills' && def.kind !== 'tools' && def.kind !== 'languages' && def.kind !== 'feat' && def.kind !== 'spells' && (
											<Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'primary.main' }}>{def.label}</Typography>
										)}
										{def.kind === 'feat' && <Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'primary.main' }}>{def.trait}: choose a feat</Typography>}
										<RaceChoice def={def} character={character} value={values[def.id]} onChange={setChoice} />
									</Box>
								))}
							</CardContent>
						</Card>
					)}

					<Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 1 }}>Traits</Typography>
					<TraitList traits={getBaseTraits(character)} source="" />
					{sub && <TraitList traits={getSubraceTraits(character)} source={sub.name} />}
					{(version.age || version.alignment) && (
						<Accordion disableGutters sx={{ backgroundColor: 'transparent' }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 600 }}>Age and alignment</Typography></AccordionSummary>
							<AccordionDetails>
								{version.age && <Typography variant="body2" sx={{ marginBottom: 1 }}><strong>Age.</strong> {version.age}</Typography>}
								{version.alignment && <Typography variant="body2"><strong>Alignment.</strong> {version.alignment}</Typography>}
							</AccordionDetails>
						</Accordion>
					)}
					{((version.tables || []).length > 0 || (sub?.tables || []).length > 0) && (
						<Accordion disableGutters sx={{ backgroundColor: 'transparent' }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 600 }}>Tables</Typography></AccordionSummary>
							<AccordionDetails>
								<Tables tables={version.tables} />
								<Tables tables={sub?.tables} />
							</AccordionDetails>
						</Accordion>
					)}
				</>
			)}
		</>
	);
}
