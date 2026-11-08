import * as React from 'react';
import {
	Box, Card, CardContent, Checkbox, Chip, Collapse, IconButton, InputAdornment, TextField, ToggleButton,
	ToggleButtonGroup, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { getClass, getSpellSlots, getSpellcastingStats } from '../../utils/characterCalc';
import { formatSigned } from '../../utils/abilityScore';
import {
	getCantripLimit, getClassSpells, getMaxSpellLevel, getPreparedLimit, getSpellbookLimit,
	isSpellcaster, usesSpellbook,
} from '../../utils/spells';

const levelLabel = (l) => (l === 0 ? 'Cantrip' : `Level ${l}`);

function SpellRow({ spell, checked, disabled, onToggle }) {
	const [open, setOpen] = React.useState(false);
	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
				<Checkbox checked={checked} disabled={disabled && !checked} onChange={() => onToggle(spell.name)} />
				<Typography
					onClick={() => { if (checked || !disabled) onToggle(spell.name); }}
					sx={{ flex: 1, fontWeight: checked ? 600 : 400, cursor: 'pointer', userSelect: 'none' }}
				>
					{spell.name}
				</Typography>
				<Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
					<Chip size="small" label={spell.school} variant="outlined" />
					{spell.concentration && <Chip size="small" label="C" title="Concentration" />}
					{spell.ritual && <Chip size="small" label="R" title="Ritual" />}
					{spell.material && <Chip size="small" label="M" title={`Material: ${spell.material}`} />}
				</Box>
				<IconButton
					size="small"
					onClick={() => setOpen(!open)}
					aria-label={`Details for ${spell.name}`}
					sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
				>
					<ExpandMoreIcon />
				</IconButton>
			</Box>
			<Collapse in={open} unmountOnExit>
				<Box sx={{ padding: 1.5, paddingTop: 0, marginLeft: 5 }}>
					<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
						{levelLabel(spell.level)} {spell.school} · {spell.castingTime} · {spell.range} · {spell.components} · {spell.duration}
					</Typography>
					<Typography variant="body2" sx={{ marginTop: 0.5, whiteSpace: 'pre-line' }}>{spell.description}</Typography>
					{spell.higherLevels && (
						<Typography variant="body2" sx={{ marginTop: 0.5, whiteSpace: 'pre-line', color: 'text.secondary' }}>
							{spell.higherLevels}
						</Typography>
					)}
				</Box>
			</Collapse>
		</Box>
	);
}

// A searchable, level-filterable list of spells with a pick limit.
function SpellPicker({ title, spells, selected, limit, onToggle, levels }) {
	const [query, setQuery] = React.useState('');
	const [level, setLevel] = React.useState('all');
	const shown = spells.filter((s) => (level === 'all' || s.level === level)
		&& s.name.toLowerCase().includes(query.trim().toLowerCase()));
	const over = selected.length > limit;
	return (
		<Card sx={{ backgroundColor: 'background.paper', marginBottom: 3 }}>
			<CardContent sx={{ padding: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1.5 }}>
					<Typography variant="h6">{title}</Typography>
					<Chip
						label={`${selected.length} / ${limit}`}
						color={over ? 'error' : selected.length === limit ? 'success' : 'default'}
						size="small"
					/>
				</Box>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 1 }}>
					<TextField
						size="small"
						placeholder="Search spells"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
						sx={{ flex: '1 1 200px' }}
					/>
					{levels.length > 1 && (
						<ToggleButtonGroup
							exclusive
							size="small"
							value={level}
							onChange={(_, v) => { if (v !== null) setLevel(v); }}
							sx={{ flexWrap: 'wrap' }}
						>
							<ToggleButton value="all">All</ToggleButton>
							{levels.map((l) => <ToggleButton key={l} value={l}>{l}</ToggleButton>)}
						</ToggleButtonGroup>
					)}
				</Box>
				<Box sx={{ maxHeight: 420, overflowY: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
					{shown.length === 0 && (
						<Typography variant="body2" sx={{ padding: 2, color: 'text.secondary' }}>No spells match.</Typography>
					)}
					{shown.map((s) => (
						<SpellRow
							key={s.name}
							spell={s}
							checked={selected.includes(s.name)}
							disabled={selected.length >= limit}
							onToggle={onToggle}
						/>
					))}
				</Box>
			</CardContent>
		</Card>
	);
}

export default function Spells() {
	const { character, updateSpells } = useCharacter();
	const cls = getClass(character);
	const { cantrips, prepared, spellbook } = character.spells;

	const header = (
		<PageHeader
			eyebrow={getStepEyebrow('Spells', character.edition)}
			title="Spells"
			subtitle="Choose the cantrips and spells your class knows or prepares."
		/>
	);

	if (!cls) {
		return <>{header}<Typography color="text.secondary">Pick a class first to choose its spells.</Typography></>;
	}
	if (!isSpellcaster(character)) {
		return <>{header}<Typography color="text.secondary">{cls.name}s don&apos;t cast spells, so there is nothing to choose here.</Typography></>;
	}

	const stats = getSpellcastingStats(character);
	const slots = getSpellSlots(character);
	const maxLevel = getMaxSpellLevel(character);
	const classSpells = getClassSpells(character);
	const cantripSpells = classSpells.filter((s) => s.level === 0);
	const leveledSpells = classSpells.filter((s) => s.level >= 1 && s.level <= maxLevel);
	const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);
	const wizard = usesSpellbook(character);
	const preparedPool = wizard ? leveledSpells.filter((s) => spellbook.includes(s.name)) : leveledSpells;

	const toggle = (key) => (name) => {
		const list = character.spells[key];
		const next = list.includes(name) ? list.filter((n) => n !== name) : [...list, name];
		const patch = { [key]: next };
		if (key === 'spellbook') patch.prepared = prepared.filter((n) => next.includes(n));
		updateSpells(patch);
	};

	const slotText = slots?.type === 'pact'
		? `${slots.count} level ${slots.level} slot${slots.count === 1 ? '' : 's'} (Pact Magic)`
		: Object.entries(slots?.slots || {}).filter(([, n]) => n > 0).map(([l, n]) => `L${l}: ${n}`).join('  ');

	return (
		<>
			{header}
			<Card sx={{ backgroundColor: 'background.paper', marginBottom: 3 }}>
				<CardContent sx={{ padding: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
					<Chip label={`Spellcasting ability: ${stats.ability}`} size="small" />
					<Chip label={`Spell save DC ${stats.saveDc}`} size="small" />
					<Chip label={`Spell attack ${formatSigned(stats.attackBonus)}`} size="small" />
					<Chip label={`Slots — ${slotText || 'none yet'}`} size="small" />
				</CardContent>
			</Card>

			{getCantripLimit(character) > 0 && (
				<SpellPicker
					title="Cantrips"
					spells={cantripSpells}
					selected={cantrips}
					limit={getCantripLimit(character)}
					onToggle={toggle('cantrips')}
					levels={[]}
				/>
			)}

			{wizard && (
				<SpellPicker
					title="Spellbook"
					spells={leveledSpells}
					selected={spellbook}
					limit={getSpellbookLimit(character)}
					onToggle={toggle('spellbook')}
					levels={levels}
				/>
			)}

			<SpellPicker
				title={wizard ? 'Prepared spells (from your spellbook)' : 'Prepared spells'}
				spells={preparedPool}
				selected={prepared}
				limit={getPreparedLimit(character)}
				onToggle={toggle('prepared')}
				levels={levels}
			/>
			<Typography variant="caption" sx={{ color: 'text.secondary' }}>
				Spells a species, subclass or feat gives you aren&apos;t tracked here. Changing class clears your spell choices.
			</Typography>
		</>
	);
}
