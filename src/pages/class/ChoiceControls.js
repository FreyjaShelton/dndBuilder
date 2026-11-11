import * as React from 'react';
import {
	Autocomplete, Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import { getEditionData } from '../../data';
import { ABILITY_KEYS, ABILITY_NAMES } from '../../utils/abilityScore';
import { getProficientSkills } from '../../utils/characterCalc';
import FeatSpellChoices from '../spells/FeatSpellChoices';
import { SKILLED_COUNT, SKILLED_FROM } from '../../utils/customOrigin';
import {
	allLanguages, getChoiceOptions, getClassSkillPool, getOptionDescription, resolveCount,
} from '../../utils/classChoices';

const abilityName = (k) => ABILITY_NAMES[k];

// "+1 Intelligence, Wisdom or Charisma", "+1 Strength", "+1 to any ability score": what a feat does to the ability scores.
function abilityIncreaseText(feat) {
	const inc = feat && feat.abilityIncrease;
	if (!inc || !inc.options.length) return '';
	const amount = '+' + (inc.amount || 1);
	if (inc.options.length === ABILITY_KEYS.length) return amount + ' to any ability score';
	const names = inc.options.map(abilityName);
	return amount + ' ' + (names.length > 1 ? names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1] : names[0]);
}
const LONG_LIST = 12;

// One of a list, as a plain dropdown. `options`: [{ name, label?, group? }].
function OptionSelect({ label, value, options, onChange, description }) {
	return (
		<Box sx={{ marginTop: 1.5 }}>
			<Autocomplete
				size="small"
				options={options}
				value={options.find((o) => o.name === value) || null}
				getOptionLabel={(o) => o.label || o.name}
				isOptionEqualToValue={(a, b) => a.name === b.name}
				groupBy={options.some((o) => o.group) ? (o) => o.group : undefined}
				onChange={(_, o) => onChange(o ? o.name : '')}
				renderInput={(params) => <TextField {...params} label={label} />}
			/>
			{description && <Typography variant="body2" sx={{ marginTop: 1, color: 'text.secondary', whiteSpace: 'pre-line' }}>{description}</Typography>}
		</Box>
	);
}

// Several of a list. Short lists use a normal multi-select; long ones (spells, invocations) are searchable.
function MultiSelect({ label, value, options, count, onChange, descriptions }) {
	const picked = Array.isArray(value) ? value : [];
	const heading = `${label} (choose ${count})`;
	const status = (
		<Typography variant="caption" sx={{ color: picked.length === count ? 'text.secondary' : 'warning.main' }}>
			{picked.length} of {count} chosen
		</Typography>
	);
	const details = picked.map((n) => descriptions?.(n)).some(Boolean) && (
		<Box sx={{ marginTop: 1 }}>
			{picked.map((n) => (descriptions(n) ? (
				<Typography key={n} variant="body2" sx={{ color: 'text.secondary', marginBottom: 0.75, whiteSpace: 'pre-line' }}>
					<strong>{n}.</strong> {descriptions(n)}
				</Typography>
			) : null))}
		</Box>
	);
	if (options.length > LONG_LIST) {
		return (
			<Box sx={{ marginTop: 1.5 }}>
				<Autocomplete
					multiple
					size="small"
					disableCloseOnSelect
					options={options}
					value={options.filter((o) => picked.includes(o.name))}
					getOptionLabel={(o) => o.label || o.name}
					isOptionEqualToValue={(a, b) => a.name === b.name}
					groupBy={options.some((o) => o.group) ? (o) => o.group : undefined}
					getOptionDisabled={(o) => picked.length >= count && !picked.includes(o.name)}
					onChange={(_, list) => onChange(list.map((o) => o.name).slice(0, count))}
					renderTags={(list, getTagProps) => list.map((o, i) => {
						const { key, ...rest } = getTagProps({ index: i });
						return <Chip key={key} size="small" label={o.name} {...rest} />;
					})}
					renderInput={(params) => <TextField {...params} label={heading} />}
				/>
				{status}
				{details}
			</Box>
		);
	}
	return (
		<Box sx={{ marginTop: 1.5 }}>
			<FormControl size="small" fullWidth>
				<InputLabel>{heading}</InputLabel>
				<Select
					multiple
					label={heading}
					value={picked}
					onChange={(e) => onChange(e.target.value.slice(-count))}
					renderValue={(sel) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{sel.map((s) => <Chip key={s} size="small" label={s} />)}</Box>
					)}
				>
					{options.map((o) => <MenuItem key={o.name} value={o.name}>{o.label || o.name}</MenuItem>)}
				</Select>
			</FormControl>
			{status}
			{details}
		</Box>
	);
}

// only: limit the list to these feat names (a background that offers a choice of three feats)
function FeatPicker({ edition, value, onChange, only, label }) {
	const feats = getEditionData(edition).feats.filter((f) => !only || only.includes(f.name));
	const sources = ["Player's Handbook", "Xanathar's Guide to Everything", "Tasha's Cauldron of Everything"];
	const rank = (s) => { const i = sources.indexOf(s); return i < 0 ? sources.length : i; };
	const sorted = [...feats].sort((a, b) => rank(a.source) - rank(b.source) || a.name.localeCompare(b.name));
	return (
		<Autocomplete
			size="small"
			options={sorted}
			value={feats.find((f) => f.name === value) || null}
			groupBy={(f) => f.source || 'Other'}
			getOptionLabel={(f) => f.name}
			isOptionEqualToValue={(a, b) => a.name === b.name}
			onChange={(_, f) => onChange(f ? f.name : '')}
			renderOption={(props, f) => {
				const { key, ...rest } = props;
				return (
					<li key={key} {...rest}>
						<Box>
							<Typography variant="body2">{f.name}</Typography>
							{f.prerequisite && <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Prerequisite: {f.prerequisite}</Typography>}
								{edition === '2014' && abilityIncreaseText(f) && <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Ability score increase: {abilityIncreaseText(f)}</Typography>}
						</Box>
					</li>
				);
			}}
			renderInput={(params) => <TextField {...params} label={label || 'Feat'} />}
		/>
	);
}

// Ability Score Improvement: +2 to one score, +1 to two scores, or a feat.
// value: { type: 'two', a } | { type: 'split', a, b } | { type: 'feat', feat, ability }
function AsiControl({ character, value, onChange }) {
	const v = value || {};
	const feat = v.type === 'feat' ? getEditionData(character.edition).feats.find((f) => f.name === v.feat) : null;
	const abilitySelect = (label, field, options, exclude) => (
		<FormControl size="small" sx={{ minWidth: 160, flex: 1 }}>
			<InputLabel>{label}</InputLabel>
			<Select label={label} value={v[field] || ''} onChange={(e) => onChange({ ...v, [field]: e.target.value })}>
				{options.filter((k) => k !== exclude).map((k) => <MenuItem key={k} value={k}>{abilityName(k)}</MenuItem>)}
			</Select>
		</FormControl>
	);
	return (
		<Box sx={{ marginTop: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
			<FormControl size="small" fullWidth>
				<InputLabel>Choose one</InputLabel>
				<Select label="Choose one" value={v.type || ''} onChange={(e) => onChange({ type: e.target.value })}>
					<MenuItem value="two">Increase one ability score by 2</MenuItem>
					<MenuItem value="split">Increase two ability scores by 1</MenuItem>
					<MenuItem value="feat">Take a feat</MenuItem>
				</Select>
			</FormControl>
			{v.type === 'two' && <Box sx={{ display: 'flex', gap: 1.5 }}>{abilitySelect('Ability (+2)', 'a', ABILITY_KEYS)}</Box>}
			{v.type === 'split' && (
				<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
					{abilitySelect('First ability (+1)', 'a', ABILITY_KEYS, v.b)}
					{abilitySelect('Second ability (+1)', 'b', ABILITY_KEYS, v.a)}
				</Box>
			)}
			{v.type === 'feat' && (
				<>
					<FeatPicker edition={character.edition} value={v.feat} onChange={(name) => onChange({ type: 'feat', feat: name, ability: '' })} />
					{feat?.abilityIncrease && feat.abilityIncrease.options.length > 1 && (
						<Box sx={{ display: 'flex' }}>{abilitySelect('Ability score +1', 'ability', feat.abilityIncrease.options)}</Box>
					)}
					{feat?.abilityIncrease && feat.abilityIncrease.options.length === 1 && (
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							This feat also raises {abilityName(feat.abilityIncrease.options[0])} by 1.
						</Typography>
					)}
					{feat && (
						<Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}>
							{feat.prerequisite ? `Prerequisite: ${feat.prerequisite}\n` : ''}{feat.description}
						</Typography>
					)}
					{feat?.name === 'Skilled' && (() => {
						// skills the character already has are left out (except this feat's own picks)
						const taken = new Set(getProficientSkills(character));
						(v.skilled || []).forEach((s) => taken.delete(s));
						return (
							<MultiSelect
								label="Skilled: skills or tools"
								value={v.skilled}
								options={SKILLED_FROM.filter((n) => !taken.has(n)).map((name) => ({ name }))}
								count={SKILLED_COUNT}
								onChange={(list) => onChange({ ...v, skilled: list.slice(0, SKILLED_COUNT) })}
							/>
						);
					})()}
					{feat && (
						<FeatSpellChoices
							featName={feat.name}
							character={character}
							edition={character.edition}
							state={v.spells}
							onChange={(update) => onChange((prev) => ({ ...(prev || {}), spells: update((prev || {}).spells) }))}
						/>
					)}
				</>
			)}
		</Box>
	);
}

// Renders one choice definition (from data/2014/classChoices) inside a feature card.
export default function ChoiceControl({ def, entry, character, value, onChange }) {
	const toOptions = (names) => names.map((name) => ({ name }));
	if (def.kind === 'option') {
		const options = getChoiceOptions(def, entry, character);
		return <OptionSelect label={def.label} value={value || ''} options={options} onChange={onChange} description={def.spells ? '' : getOptionDescription(def, entry, character, value)} />;
	}
	if (def.kind === 'multi' || def.kind === 'spells') {
		const count = resolveCount(def, character);
		const options = getChoiceOptions(def, entry, character);
		const note = def.countNote ? <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>{def.countNote}</Typography> : null;
		return (
			<>
				<MultiSelect
					label={def.label}
					value={value}
					options={options}
					count={count}
					onChange={onChange}
					descriptions={def.spells ? undefined : (n) => getOptionDescription(def, entry, character, n)}
				/>
				{note}
			</>
		);
	}
	if (def.kind === 'skill') {
		const pool = getClassSkillPool(character, def);
		const taken = new Set(getProficientSkills(character));
		if (value) taken.delete(value);
		return <OptionSelect label={def.label} value={value || ''} options={toOptions(pool.filter((s) => !taken.has(s)))} onChange={onChange} />;
	}
	if (def.kind === 'skills') {
		const pool = getClassSkillPool(character, def);
		const taken = new Set(getProficientSkills(character));
		(Array.isArray(value) ? value : []).forEach((s) => taken.delete(s));
		return <MultiSelect label={def.label} value={value} options={toOptions(pool.filter((s) => !taken.has(s)))} count={resolveCount(def, character)} onChange={onChange} />;
	}
	if (def.kind === 'languages' || def.kind === 'tools') {
		const pool = def.from || (def.kind === 'tools' ? [] : allLanguages);
		return <MultiSelect label={def.label} value={value} options={toOptions(pool)} count={resolveCount(def, character)} onChange={onChange} />;
	}
	if (def.kind === 'expertise') {
		const proficient = getProficientSkills(character);
		const extra = def.extra || [];
		return <MultiSelect label={def.label} value={value} options={toOptions([...proficient, ...extra])} count={resolveCount(def, character)} onChange={onChange} />;
	}
	return null;
}

export { AsiControl, FeatPicker, abilityIncreaseText };
