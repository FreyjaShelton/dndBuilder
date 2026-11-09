import * as React from 'react';
import {
	Box, Button, Card, CardContent, Checkbox, Chip, Collapse, IconButton, InputAdornment, LinearProgress, Switch,
	FormControlLabel, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { findSpell, levelTitle } from '../../utils/spells2014';

const INITIAL_ROWS = 150;

function SpellDetails({ spell, details }) {
	if (!details) return <Typography variant="body2" color="text.secondary">Loading spell text…</Typography>;
	if (Object.keys(details).length === 0) return <Typography variant="body2" color="text.secondary">Spell text could not be loaded. Reload the page to try again.</Typography>;
	const d = details[spell.name];
	if (!d) return <Typography variant="body2" color="text.secondary">No details available.</Typography>;
	return (
		<Box sx={{ padding: '4px 8px 12px 48px' }}>
			<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', marginBottom: 0.5 }}>
				{levelTitle(spell.level).replace('Cantrips', 'Cantrip')} · {spell.school} · {d.source} · {spell.classes.join(', ')}
			</Typography>
			<Typography variant="body2"><strong>Casting time:</strong> {d.castingTime}</Typography>
			<Typography variant="body2"><strong>Range:</strong> {d.range}</Typography>
			<Typography variant="body2"><strong>Components:</strong> {d.components}</Typography>
			<Typography variant="body2" sx={{ marginBottom: 1 }}><strong>Duration:</strong> {d.duration}</Typography>
			<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{d.description}</Typography>
			{d.higherLevels && (
				<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginTop: 1, color: 'text.secondary' }}>
					<strong>At higher levels.</strong> {d.higherLevels}
				</Typography>
			)}
		</Box>
	);
}

// Memoised on plain values so picking one spell re-renders only the rows that changed.
const Row = React.memo(function Row({ name, checked, disabled, onToggle, details, showLevel }) {
	const [open, setOpen] = React.useState(false);
	const spell = findSpell(name) || { name, level: 0, school: '', classes: [] };
	const d = details?.[name];
	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
				<Checkbox checked={checked} disabled={disabled && !checked} onChange={() => onToggle(name)} />
				<Typography
					onClick={() => { if (checked || !disabled) onToggle(name); }}
					sx={{ flex: 1, minWidth: 0, fontWeight: checked ? 600 : 400, cursor: 'pointer', userSelect: 'none' }}
				>
					{name}
				</Typography>
				<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
					{showLevel && <Chip size="small" variant="outlined" label={spell.level === 0 ? 'Cantrip' : `L${spell.level}`} />}
					<Chip size="small" variant="outlined" label={spell.school} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
					{d?.concentration && <Chip size="small" label="C" title="Concentration" />}
					{d?.ritual && <Chip size="small" label="R" title="Ritual" />}
				</Box>
				<IconButton size="small" aria-label={`Details for ${name}`} onClick={() => setOpen(!open)} sx={{ transform: open ? 'rotate(180deg)' : 'none' }}>
					<ExpandMoreIcon />
				</IconButton>
			</Box>
			<Collapse in={open} unmountOnExit><SpellDetails spell={spell} details={details} /></Collapse>
		</Box>
	);
});

// One group of spell picks (cantrips, spells known, prepared...).
// section: { title, subtitle, note, count, options, value, openEnded? }
// openEnded: `count` is what the class gives for free, but more can be added (a wizard's spellbook can hold any number of copied spells).
// onChange receives an updater (currentNames) => newNames, so two quick clicks never overwrite each other.
export default function SpellPicker2014({ section, onChange, details }) {
	const { title, subtitle, note, count, options, value, openEnded } = section;
	const [query, setQuery] = React.useState('');
	const [levelFilter, setLevelFilter] = React.useState('all');
	const [chosenOnly, setChosenOnly] = React.useState(false);
	const [showAll, setShowAll] = React.useState(false);

	const optionNames = React.useMemo(() => new Set(options.map((o) => o.name)), [options]);
	const levels = React.useMemo(() => [...new Set(options.map((o) => (findSpell(o.name) || { level: 0 }).level))].sort((a, b) => a - b), [options]);
	const picked = value.filter((n) => optionNames.has(n));
	const full = !openEnded && picked.length >= count;
	const extra = openEnded ? Math.max(0, picked.length - count) : 0;

	// toggle never changes identity, so the memoised rows stay put; it reads the latest limits from refs
	const latest = React.useRef({});
	latest.current = { count: openEnded ? Infinity : count, optionNames, onChange };
	const toggle = React.useCallback((name) => {
		latest.current.onChange((current) => {
			const valid = (current || []).filter((n) => latest.current.optionNames.has(n));
			if (valid.includes(name)) return valid.filter((n) => n !== name);
			return valid.length >= latest.current.count ? valid : [...valid, name];
		});
	}, []);

	const q = query.trim().toLowerCase();
	const filtered = options.filter((o) => (
		(!q || o.name.toLowerCase().includes(q))
		&& (levelFilter === 'all' || (findSpell(o.name) || {}).level === levelFilter)
		&& (!chosenOnly || picked.includes(o.name))
	));
	const limited = !showAll && !q && levelFilter === 'all' && !chosenOnly && filtered.length > INITIAL_ROWS;
	const rows = limited ? filtered.slice(0, INITIAL_ROWS) : filtered;

	return (
		<Card sx={{ marginBottom: 2, backgroundColor: 'background.paper' }}>
			<CardContent>
				<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
					{subtitle && <Typography variant="body2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>}
					<Box sx={{ flex: 1 }} />
					<Chip
						size="small"
						color={picked.length === count || extra > 0 ? 'success' : 'warning'}
						variant={picked.length === count || extra > 0 ? 'filled' : 'outlined'}
						label={extra > 0 ? `${count} / ${count} + ${extra} extra` : `${picked.length} / ${count}`}
					/>
				</Box>
				<LinearProgress
					variant="determinate"
					value={Math.min(100, (picked.length / Math.max(1, count)) * 100)}
					color={picked.length >= count && openEnded ? 'success' : picked.length === count ? 'success' : 'primary'}
					sx={{ height: 4, borderRadius: 1, marginY: 1 }}
				/>
				{note && <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', marginBottom: 1 }}>{note}</Typography>}

				{picked.length > 0 && (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginBottom: 1.5 }}>
						{picked.map((n) => <Chip key={n} size="small" label={n} onDelete={() => toggle(n)} />)}
					</Box>
				)}

				<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', marginBottom: 1 }}>
					<TextField
						size="small"
						placeholder="Search spells"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						sx={{ flex: '1 1 200px' }}
						slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
					/>
					<FormControlLabel
						control={<Switch size="small" checked={chosenOnly} onChange={(e) => setChosenOnly(e.target.checked)} />}
						label={<Typography variant="body2">Chosen only</Typography>}
					/>
					{picked.length > 0 && <Button size="small" onClick={() => onChange(() => [])}>Clear</Button>}
				</Box>
				{levels.length > 1 && (
					<ToggleButtonGroup
						size="small"
						exclusive
						value={levelFilter}
						onChange={(_, v) => { if (v !== null) setLevelFilter(v); }}
						sx={{ flexWrap: 'wrap', marginBottom: 1 }}
					>
						<ToggleButton value="all">All</ToggleButton>
						{levels.map((l) => <ToggleButton key={l} value={l}>{l === 0 ? 'Cantrip' : l}</ToggleButton>)}
					</ToggleButtonGroup>
				)}

				<Box sx={{ maxHeight: { xs: 420, sm: 480 }, overflowY: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
					{rows.map((o) => (
						<Row
							key={o.name}
							name={o.name}
							checked={picked.includes(o.name)}
							disabled={full}
							onToggle={toggle}
							details={details}
							showLevel={levels.length > 1}
						/>
					))}
					{rows.length === 0 && <Typography variant="body2" sx={{ padding: 2, color: 'text.secondary' }}>No spells match.</Typography>}
					{limited && (
						<Box sx={{ padding: 1, textAlign: 'center' }}>
							<Button size="small" onClick={() => setShowAll(true)}>Show all {filtered.length} spells</Button>
						</Box>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
