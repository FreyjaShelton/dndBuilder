import * as React from 'react';
import {
	Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, CardContent, Chip, FormControl, InputLabel,
	MenuItem, Select, TextField, Typography,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { getProficientSkills } from '../../utils/characterCalc';
import {
	getBackgroundChoiceDefs, getBackgroundChoices, getBackgroundLanguages, getBackgroundList, getBackgroundPending,
	getBackgroundRecord, getBackgroundSkillList, getBackgroundTools, getVariant,
} from '../../utils/backgroundChoices';
import { MultiPicker, OptionPicker } from '../race/RaceChoices2014';

const toOptions = (names) => names.map((name) => ({ name }));
const RESET = { variant: '', choices: {}, customSkills: [], abilityPlus2: '', abilityPlus1: '', abilityPlus1b: '', originFeat: '' };

// Suggested personality traits / ideals / bonds / flaws: a text box that stays free-form, plus a dropdown of
// the background's suggestions (and a dice button) that add a line to it.
function Characteristic({ label, field, suggestions, value, onChange }) {
	const lines = (value || '').split('\n').map((l) => l.trim()).filter(Boolean);
	const add = (text) => { if (text && !lines.includes(text)) onChange([...lines, text].join('\n')); };
	return (
		<Box sx={{ marginTop: 2.5 }}>
			<Typography variant="subtitle2" sx={{ color: 'primary.main', marginBottom: 1 }}>{label}</Typography>
			{suggestions.length > 0 && (
				<Box sx={{ display: 'flex', gap: 1, marginBottom: 1, alignItems: 'center' }}>
					<Autocomplete
						size="small"
						fullWidth
						options={suggestions}
						value={null}
						blurOnSelect
						clearOnBlur
						onChange={(_, v) => { if (v) add(v); }}
						renderInput={(params) => <TextField {...params} placeholder={`Add a suggested ${label.toLowerCase().replace(/s$/, '')}`} />}
						renderOption={(props, o) => { const { key, ...rest } = props; return <li key={key} {...rest}><Typography variant="body2">{o}</Typography></li>; }}
					/>
					<Button size="small" startIcon={<CasinoIcon />} onClick={() => add(suggestions[Math.floor(Math.random() * suggestions.length)])} sx={{ flexShrink: 0 }}>
						Roll
					</Button>
				</Box>
			)}
			<TextField
				value={value || ''}
				onChange={(e) => onChange(e.target.value)}
				multiline
				minRows={2}
				fullWidth
				placeholder={`Write your own ${label.toLowerCase()}`}
				name={field}
			/>
		</Box>
	);
}

export default function Background2014() {
	const { character, updateBackground } = useCharacter();
	const { background } = character;
	const rec = getBackgroundRecord(character);
	const variant = getVariant(character);
	const defs = getBackgroundChoiceDefs(character);
	const values = getBackgroundChoices(character);
	const pending = getBackgroundPending(character);
	const isCustom = rec?.name === 'Custom';
	const list = React.useMemo(() => getBackgroundList().map((b) => ({ name: b.name, source: b.source })), []);

	const setChoice = (id, v) => updateBackground((b) => ({ choices: { ...(b.choices || {}), [id]: v } }));
	const pick = (name) => updateBackground({ name: name || '', ...RESET });
	const langs = rec ? getBackgroundLanguages(character) : null;
	const tools = rec ? getBackgroundTools(character) : [];
	const skills = rec ? getBackgroundSkillList(character) : [];
	const proficient = new Set(getProficientSkills(character));

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Background', character)}
				title="Background"
				subtitle="Where you came from: skill, tool and language proficiencies, a feature, and roleplaying hooks. Pick your options in the dropdowns that appear."
			/>
			<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
				<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Autocomplete
						options={list}
						value={list.find((o) => o.name === background.name) || null}
						groupBy={(o) => o.source}
						getOptionLabel={(o) => o.name}
						isOptionEqualToValue={(a, b) => a.name === b.name}
						onChange={(_, o) => pick(o ? o.name : '')}
						renderInput={(params) => <TextField {...params} label="Choose a background" />}
					/>
					{rec && rec.variants.length > 0 && (
						<Box>
							<FormControl fullWidth size="small">
								<InputLabel>Variant (optional)</InputLabel>
								<Select label="Variant (optional)" value={variant ? variant.name : ''} displayEmpty onChange={(e) => updateBackground({ variant: e.target.value })}>
									<MenuItem value=""><em>None</em></MenuItem>
									{rec.variants.map((v) => <MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>)}
								</Select>
							</FormControl>
							{variant && <Typography variant="body2" sx={{ marginTop: 1, color: 'text.secondary', whiteSpace: 'pre-line' }}>{variant.description}</Typography>}
						</Box>
					)}
					{isCustom && (
						<TextField label="Background name" value={background.customName || ''} onChange={(e) => updateBackground({ customName: e.target.value })} fullWidth />
					)}
				</CardContent>
			</Card>

			{rec && (
				<>
					<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
						<CardContent>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 1.5 }}>
								<Chip size="small" label={`Skills: ${skills.join(', ') || 'none yet'}`} />
								{(tools.length > 0 || rec.tools.manual) && <Chip size="small" label={`Tools: ${[...tools, ...(rec.tools.manual ? [rec.tools.text] : [])].join(', ')}`} />}
								{(langs.fixed.length > 0 || langs.pickCount > 0) && (
									<Chip size="small" label={`Languages: ${[...langs.fixed, ...langs.picked].join(', ')}${langs.pickCount > langs.picked.length ? ` (+${langs.pickCount - langs.picked.length} to choose)` : ''}`} />
								)}
								{rec.gold !== null && rec.gold !== undefined && <Chip size="small" label={`Starting gold: ${rec.gold} gp`} />}
								<Chip size="small" variant="outlined" label={rec.source} />
							</Box>
							{rec.description && <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{rec.description}</Typography>}
							{rec.equipment && <Typography variant="body2" sx={{ marginTop: 1.5 }}><strong>Equipment.</strong> {rec.equipment}</Typography>}
						</CardContent>
					</Card>

					{defs.some((d) => d.kind !== 'variant') && (
						<Card sx={{ backgroundColor: 'background.paper', marginBottom: 2 }}>
							<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography variant="h6" sx={{ fontWeight: 700 }}>Your choices</Typography>
									{pending > 0 && <Chip size="small" color="warning" variant="outlined" label={`${pending} to choose`} />}
								</Box>
								{defs.filter((d) => d.kind !== 'variant').map((d) => {
									if (d.kind === 'skills') {
										const taken = new Set(proficient);
										(values[d.id] || []).forEach((s) => taken.delete(s));
										return <MultiPicker key={d.id} label={d.label} value={values[d.id]} options={toOptions(d.from.filter((s) => !taken.has(s)))} count={d.count} onChange={(v) => setChoice(d.id, v)} />;
									}
									if (d.kind === 'tools' || d.kind === 'languages') {
										const fixed = new Set(d.kind === 'languages' ? langs.fixed : []);
										return <MultiPicker key={d.id} label={d.label} value={values[d.id]} options={toOptions(d.from.filter((x) => !fixed.has(x)))} count={d.count} onChange={(v) => setChoice(d.id, v)} />;
									}
									if (d.kind === 'roll') {
										return (
											<Box key={d.id} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
												<Box sx={{ flex: 1 }}>
													<OptionPicker label={`${d.label} (optional, ${d.die})`} value={values[d.id] || ''} options={toOptions(d.options)} onChange={(v) => setChoice(d.id, v)} />
												</Box>
												<Button size="small" startIcon={<CasinoIcon />} onClick={() => setChoice(d.id, d.options[Math.floor(Math.random() * d.options.length)])} sx={{ marginTop: 0.5, flexShrink: 0 }}>Roll</Button>
											</Box>
										);
									}
									return null;
								})}
							</CardContent>
						</Card>
					)}

					{rec.features.length > 0 && (
						<>
							<Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 1 }}>Features</Typography>
							{rec.features.map((f) => (
								<Accordion key={f.name} disableGutters sx={{ backgroundColor: 'transparent' }}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 600 }}>{f.name}</Typography></AccordionSummary>
									<AccordionDetails><Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{f.description}</Typography></AccordionDetails>
								</Accordion>
							))}
						</>
					)}

					{isCustom && (
						<Box sx={{ marginTop: 2 }}>
							<TextField label="Tool and language proficiencies" value={background.customProficiency || ''} onChange={(e) => updateBackground({ customProficiency: e.target.value })} fullWidth />
						</Box>
					)}

					<Typography variant="h6" sx={{ fontWeight: 700, marginTop: 3 }}>Roleplaying</Typography>
					<Characteristic label="Personality traits" field="personalityTraits" suggestions={rec.traits.personality} value={background.personalityTraits} onChange={(v) => updateBackground({ personalityTraits: v })} />
					<Characteristic label="Ideals" field="ideals" suggestions={rec.traits.ideals} value={background.ideals} onChange={(v) => updateBackground({ ideals: v })} />
					<Characteristic label="Bonds" field="bonds" suggestions={rec.traits.bonds} value={background.bonds} onChange={(v) => updateBackground({ bonds: v })} />
					<Characteristic label="Flaws" field="flaws" suggestions={rec.traits.flaws} value={background.flaws} onChange={(v) => updateBackground({ flaws: v })} />
				</>
			)}
		</>
	);
}
