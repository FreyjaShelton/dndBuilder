import * as React from 'react';
import {
	Autocomplete, Box, Chip, FormControl, InputLabel, Link, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { ABILITY_KEYS, ABILITY_NAMES } from '../../utils/abilityScore';
import { getProficientSkills } from '../../utils/characterCalc';
import { getEditionData } from '../../data';
import { allLanguages, getRaceChoices, getRaceLanguages } from '../../utils/raceChoices';
import { FeatPicker } from '../class/ChoiceControls';

const toOptions = (names) => names.map((name) => ({ name }));

function OptionPicker({ label, value, options, onChange }) {
	const hit = options.find((o) => o.name === value);
	return (
		<Box>
			<FormControl size="small" fullWidth>
				<InputLabel>{label}</InputLabel>
				<Select label={label} value={hit ? value : ''} onChange={(e) => onChange(e.target.value)} MenuProps={{ PaperProps: { sx: { maxHeight: 360 } } }}>
					{options.map((o) => <MenuItem key={o.name} value={o.name}>{o.name}</MenuItem>)}
				</Select>
			</FormControl>
			{hit?.description && <Typography variant="body2" sx={{ marginTop: 1, color: 'text.secondary', whiteSpace: 'pre-line' }}>{hit.description}</Typography>}
		</Box>
	);
}

function MultiPicker({ label, value, options, count, onChange }) {
	const picked = Array.isArray(value) ? value : [];
	const heading = `${label} (choose ${count})`;
	return (
		<Box>
			<Autocomplete
				multiple
				size="small"
				disableCloseOnSelect
				options={options}
				value={options.filter((o) => picked.includes(o.name))}
				getOptionLabel={(o) => o.name}
				isOptionEqualToValue={(a, b) => a.name === b.name}
				getOptionDisabled={(o) => picked.length >= count && !picked.includes(o.name)}
				onChange={(_, list) => onChange(list.map((o) => o.name).slice(0, count))}
				renderTags={(list, getTagProps) => list.map((o, i) => {
					const { key, ...rest } = getTagProps({ index: i });
					return <Chip key={key} size="small" label={o.name} {...rest} />;
				})}
				renderInput={(params) => <TextField {...params} label={heading} />}
			/>
			<Typography variant="caption" sx={{ color: picked.length === count ? 'text.secondary' : 'warning.main' }}>{picked.length} of {count} chosen</Typography>
		</Box>
	);
}

// Ability picks: one dropdown per increase, so "two other scores +1" is two dropdowns.
function AbilitiesControl({ def, value, onChange }) {
	const picks = Array.isArray(value) ? value : [];
	const slots = def.groups.flatMap((g) => Array.from({ length: g.count }, () => g.amount));
	return (
		<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
			{slots.map((amount, i) => (
				<FormControl key={i} size="small" sx={{ minWidth: 170, flex: 1 }}>
					<InputLabel>{`Ability +${amount}`}</InputLabel>
					<Select
						label={`Ability +${amount}`}
						value={picks[i] || ''}
						onChange={(e) => { const next = [...picks]; next[i] = e.target.value; onChange(next.slice(0, slots.length)); }}
					>
						{ABILITY_KEYS.filter((k) => !def.exclude.includes(k) && (picks[i] === k || !picks.includes(k))).map((k) => (
							<MenuItem key={k} value={k}>{ABILITY_NAMES[k]}</MenuItem>
						))}
					</Select>
				</FormControl>
			))}
		</Box>
	);
}

// The Monsters of the Multiverse rule: +2 and +1 to two different scores, or +1 to three different scores.
function FlexAbilitiesControl({ value, onChange }) {
	const v = value || { mode: 'twoOne' };
	const select = (label, field, index) => (
		<FormControl size="small" sx={{ minWidth: 150, flex: 1 }} key={label}>
			<InputLabel>{label}</InputLabel>
			<Select
				label={label}
				value={(index === undefined ? v[field] : (v.picks || [])[index]) || ''}
				onChange={(e) => {
					if (index === undefined) onChange({ ...v, [field]: e.target.value });
					else { const picks = [...(v.picks || [])]; picks[index] = e.target.value; onChange({ ...v, picks }); }
				}}
			>
				{ABILITY_KEYS.map((k) => <MenuItem key={k} value={k}>{ABILITY_NAMES[k]}</MenuItem>)}
			</Select>
		</FormControl>
	);
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
			<ToggleButtonGroup size="small" exclusive value={v.mode} onChange={(_, m) => { if (m) onChange({ mode: m }); }} sx={{ flexWrap: 'wrap' }}>
				<ToggleButton value="twoOne">+2 and +1</ToggleButton>
				<ToggleButton value="oneOneOne">+1, +1 and +1</ToggleButton>
			</ToggleButtonGroup>
			{v.mode === 'twoOne' ? (
				<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{select('Ability +2', 'plus2')}{select('Different ability +1', 'plus1')}</Box>
			) : (
				<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{[0, 1, 2].map((i) => select(`Ability ${i + 1} (+1)`, 'picks', i))}</Box>
			)}
		</Box>
	);
}

// One of the race's choices (from getRaceChoiceDefs). onChange(id, value) must apply to the latest state.
export default function RaceChoice({ def, character, value, onChange }) {
	const taken = new Set(getProficientSkills(character));
	if (def.kind === 'abilities') return <AbilitiesControl def={def} value={value} onChange={(v) => onChange(def.id, v)} />;
	if (def.kind === 'flex') return <FlexAbilitiesControl value={value} onChange={(v) => onChange(def.id, v)} />;
	if (def.kind === 'option') return <OptionPicker label={def.label} value={value || ''} options={def.options.map((o) => (typeof o === 'string' ? { name: o } : o))} onChange={(v) => onChange(def.id, v)} />;
	if (def.kind === 'skills') {
		(Array.isArray(value) ? value : []).forEach((s) => taken.delete(s));
		return <MultiPicker label={def.label} value={value} options={toOptions(def.from.filter((s) => !taken.has(s)))} count={def.count} onChange={(v) => onChange(def.id, v)} />;
	}
	if (def.kind === 'tools') return <MultiPicker label={def.label} value={value} options={toOptions(def.from)} count={def.count} onChange={(v) => onChange(def.id, v)} />;
	if (def.kind === 'languages') {
		const fixed = new Set(getRaceLanguages(character).fixed);
		return <MultiPicker label="Languages" value={value} options={toOptions(allLanguages.filter((l) => !fixed.has(l)))} count={def.count} onChange={(v) => onChange(def.id, v)} />;
	}
	if (def.kind === 'spells') {
		const picked = Array.isArray(value) ? value : [];
		return (
			<Typography variant="body2" sx={{ color: 'text.secondary' }}>
				{def.label}: {picked.length ? <strong>{picked.join(', ')}</strong> : 'not chosen yet'}. Pick {def.count === 1 ? 'it' : 'them'} on the <Link href="#/spells">Spells</Link> step.
			</Typography>
		);
	}
	if (def.kind === 'feat') {
		const feats = getEditionData(character.edition).feats;
		const feat = feats.find((f) => f.name === value);
		const inc = feat?.abilityIncrease;
		const values = getRaceChoices(character);
		return (
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
				<FeatPicker edition={character.edition} value={value} onChange={(name) => { onChange('feat', name); onChange('featAbility', ''); }} />
				{inc && inc.options.length > 1 && (
					<FormControl size="small" sx={{ maxWidth: 260 }}>
						<InputLabel>Ability score +1</InputLabel>
						<Select label="Ability score +1" value={values.featAbility || ''} onChange={(e) => onChange('featAbility', e.target.value)}>
							{inc.options.map((k) => <MenuItem key={k} value={k}>{ABILITY_NAMES[k]}</MenuItem>)}
						</Select>
					</FormControl>
				)}
				{inc && inc.options.length === 1 && <Typography variant="body2" color="text.secondary">This feat also raises {ABILITY_NAMES[inc.options[0]]} by 1.</Typography>}
				{feat && <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}>{feat.prerequisite ? `Prerequisite: ${feat.prerequisite}\n` : ''}{feat.description}</Typography>}
			</Box>
		);
	}
	return null;
}

export { OptionPicker, MultiPicker };
