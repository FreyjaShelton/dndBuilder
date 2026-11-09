import * as React from 'react';
import {
	Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Card, CardContent, Chip, FormControl, FormControlLabel, InputLabel,
	ListSubheader, MenuItem, Select, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { ABILITY_KEYS, ABILITY_NAMES, formatSigned } from '../../utils/abilityScore';
import {
	allLanguages, canCustomizeOrigin, getBaseTraits, getCustomize, getDefaultIncreaseTargets, getEffectiveAsi, getRaceBaseLanguages, getRaceCategories,
	getRaceChoiceDefs, getRaceChoices, getRaceIncreases, getRaceLanguages, getRacePending, getRaceRecord, getRaceSize, getRaceSpeeds, getRacialProficiencies,
	getSubraceRecord, getSubraceTraits, getVersion, isCustomizing,
} from '../../utils/raceChoices';
import { getSwapOptions, parseSwap, profId } from '../../utils/customOrigin';
import { getRaceSpellSections } from '../../utils/spells2014';
import useSpellDetails from '../../utils/useSpellDetails';
import SpellPicker2014 from '../spells/SpellPicker2014';
import RaceChoice from './RaceChoices2014';

const RESET = { subrace: '', version: '', abilityChoices: [], skillChoices: [], lineage: '', originFeat: '', choices: {}, customize: null };

function asiText(asi) {
	const parts = Object.entries(asi.fixed).map(([k, v]) => `${ABILITY_NAMES[k]} ${formatSigned(v)}`);
	if (parts.length === 6 && Object.values(asi.fixed).every((v) => v === 1)) return 'All ability scores +1';
	asi.choose.forEach((g) => parts.push(`${g.count === 1 ? 'one' : g.count} ability score${g.count === 1 ? '' : 's'} of your choice ${formatSigned(g.amount)}`));
	if (asi.flex) parts.push('+2 and +1 (or +1, +1, +1) to scores of your choice');
	return parts.join(', ') || 'None (set by your choices)';
}

// The race's ability increases as the sheet will use them: the player's own assignment when the origin is customized.
function customAsiText(character, asi) {
	const amounts = isCustomizing(character) ? getRaceIncreases(character) : [];
	if (!amounts.length) return asiText(asi);
	const targets = getCustomize(character).asi || [];
	return `${amounts.map((amount, i) => (targets[i] ? `${ABILITY_NAMES[targets[i]]} ${formatSigned(amount)}` : `(not assigned) ${formatSigned(amount)}`)).join(', ')} (customized)`;
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

// "Customizing Your Origin" (Tasha's Cauldron of Everything): reassign the racial ability score increases, swap the
// languages and swap the racial proficiencies, following the book's rules (see utils/customOrigin.js).
function CustomizeOrigin({ character, updateRace }) {
	const customize = getCustomize(character) || {};
	const on = !!customize.on;
	const increases = getRaceIncreases(character);
	const targets = increases.map((_, i) => (customize.asi || [])[i] || '');
	const baseLanguages = getRaceBaseLanguages(character);
	const profs = getRacialProficiencies(character);

	const set = (fn) => updateRace((race) => ({ customize: { ...(race.customize || {}), ...fn(race.customize || {}) } }));
	const toggle = (checked) => {
		if (!checked) { set(() => ({ on: false })); return; }
		set((c) => ({ on: true, asi: (c.asi || []).length ? c.asi : getDefaultIncreaseTargets(character), languages: c.languages || {}, swaps: c.swaps || {} }));
	};
	const setTarget = (i, key) => set((c) => {
		const next = increases.map((_, j) => (c.asi || [])[j] || '');
		next[i] = key;
		return { asi: next };
	});
	const setLanguage = (lang, value) => set((c) => ({ languages: { ...(c.languages || {}), [lang]: value === lang ? undefined : value } }));
	const setSwap = (id, value) => set((c) => ({ swaps: { ...(c.swaps || {}), [id]: value || undefined } }));

	const profLabel = (p) => (p.kind === 'armor' ? `${p.name} armor` : p.name);
	const kindLabel = (p) => (p.kind === 'weapon' ? `${p.category} weapon` : p.kind === 'armor' ? 'Armor' : p.kind === 'skill' ? 'Skill' : 'Tool');

	return (
		<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Box>
					<FormControlLabel control={<Switch checked={on} onChange={(e) => toggle(e.target.checked)} />} label="Customize your origin" />
					<Typography variant="body2" color="text.secondary">
						{on
							? 'Optional rule from Tasha\u2019s Cauldron of Everything: your race\u2019s ability score increases, languages and proficiencies are only suggestions. Change them below. You can also ignore any personality or alignment suggestions in the race description; your character\u2019s personality is entirely yours.'
							: 'Turn on to move your race\u2019s ability score increases to other abilities, swap its languages, and swap its proficiencies (Tasha\u2019s Cauldron of Everything).'}
					</Typography>
				</Box>
				{on && (
					<>
						{increases.length > 0 ? (
							<Box>
								<Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'primary.main' }}>Ability score increases</Typography>
								<Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginBottom: 1 }}>
									Put each increase on any ability. Two increases can&rsquo;t go on the same ability, and a score can&rsquo;t go above 20.
								</Typography>
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
									{increases.map((amount, i) => (
										<FormControl key={i} size="small" sx={{ minWidth: 190 }}>
											<InputLabel shrink>{`Increase ${i + 1}: ${formatSigned(amount)}`}</InputLabel>
											<Select notched label={`Increase ${i + 1}: ${formatSigned(amount)}`} value={targets[i]} onChange={(e) => setTarget(i, e.target.value)} displayEmpty>
												<MenuItem value=""><em>Choose</em></MenuItem>
												{ABILITY_KEYS.filter((k) => k === targets[i] || !targets.includes(k)).map((k) => <MenuItem key={k} value={k}>{ABILITY_NAMES[k]}</MenuItem>)}
											</Select>
										</FormControl>
									))}
								</Box>
							</Box>
						) : (
							<Typography variant="body2" color="text.secondary">This race&rsquo;s ability score increases are already yours to assign (see Your choices).</Typography>
						)}

						{baseLanguages.length > 0 && (
							<Box>
								<Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'primary.main' }}>Languages</Typography>
								<Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginBottom: 1 }}>Replace any language your race knows with another from the list.</Typography>
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
									{baseLanguages.map((lang) => (
										<FormControl key={lang} size="small" sx={{ minWidth: 190 }}>
											<InputLabel>{lang}</InputLabel>
											<Select label={lang} value={(customize.languages || {})[lang] || lang} onChange={(e) => setLanguage(lang, e.target.value)}>
												{allLanguages.map((l) => <MenuItem key={l} value={l}>{l === lang ? `${l} (keep)` : l}</MenuItem>)}
											</Select>
										</FormControl>
									))}
								</Box>
							</Box>
						)}

						<Box>
							<Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'primary.main' }}>Proficiencies</Typography>
							{profs.length === 0 ? (
								<Typography variant="body2" color="text.secondary">Your race doesn&rsquo;t give fixed proficiencies to swap.</Typography>
							) : (
								<>
									<Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginBottom: 1 }}>
										Swap rules: a skill for another skill; armor or a martial weapon for a simple or martial weapon or a tool; a simple weapon or a tool for a simple weapon or a tool.
									</Typography>
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
										{profs.map((p) => {
											const id = profId(p);
											const options = getSwapOptions(p);
											const current = parseSwap(p, (customize.swaps || {})[id]);
											const value = current ? `${current.kind}:${current.name}` : '';
											const label = `${kindLabel(p)}: ${profLabel(p)}`;
											return (
												<FormControl key={id} size="small" sx={{ minWidth: 240 }}>
													<InputLabel shrink>{label}</InputLabel>
													<Select notched label={label} value={value} displayEmpty onChange={(e) => setSwap(id, e.target.value)} MenuProps={{ PaperProps: { sx: { maxHeight: 380 } } }}>
														<MenuItem value=""><em>Keep {profLabel(p)}</em></MenuItem>
														{options.skills.length > 0 && <ListSubheader>Skills</ListSubheader>}
														{options.skills.map((n) => <MenuItem key={`skill:${n}`} value={`skill:${n}`}>{n}</MenuItem>)}
														{options.weapons.length > 0 && <ListSubheader>Weapons</ListSubheader>}
														{options.weapons.map((n) => <MenuItem key={`weapon:${n}`} value={`weapon:${n}`}>{n}</MenuItem>)}
														{options.tools.length > 0 && <ListSubheader>Tools</ListSubheader>}
														{options.tools.map((n) => <MenuItem key={`tool:${n}`} value={`tool:${n}`}>{n}</MenuItem>)}
													</Select>
												</FormControl>
											);
										})}
									</Box>
								</>
							)}
						</Box>
					</>
				)}
			</CardContent>
		</Card>
	);
}

// Cantrips the race grants (High Elf, Fairy...) are picked here with the same picker as the Spells step.
// A separate component so the spell text only loads when there is a pick to make.
function RaceSpellPickers({ character, updateRace }) {
	const details = useSpellDetails();
	return getRaceSpellSections(character).map((section) => (
		<SpellPicker2014
			key={section.id}
			section={section}
			details={details}
			onChange={(updater) => updateRace((race) => ({ choices: { ...(race.choices || {}), [section.id]: updater((race.choices || {})[section.id] || []) } }))}
		/>
	));
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

	const setChoice = (id, value) => updateRace((race) => ({ choices: { ...(race.choices || {}), [id]: typeof value === 'function' ? value((race.choices || {})[id]) : value } }));
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
								onChange={(e) => updateRace({ version: e.target.value, subrace: '', choices: {}, abilityChoices: [], skillChoices: [], customize: null })}
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
								onChange={(e) => updateRace({ subrace: e.target.value, choices: {}, abilityChoices: [], skillChoices: [], customize: null })}
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
								<Chip size="small" label={`Ability: ${customAsiText(character, asi)}`} />
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

					{canCustomizeOrigin(character) && <CustomizeOrigin character={character} updateRace={updateRace} />}

					{defs.some((d) => d.kind !== 'spells') && (
						<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
							<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography variant="h6" sx={{ fontWeight: 700 }}>Your choices</Typography>
									{pending > 0 && <Chip size="small" color="warning" variant="outlined" label={`${pending} to choose`} />}
								</Box>
								{defs.filter((d) => d.kind !== 'spells').map((def) => (
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

					{defs.some((d) => d.kind === 'spells') && <RaceSpellPickers character={character} updateRace={updateRace} />}

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
