import * as React from 'react';
import {
	Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Chip, Collapse, FormControl, FormControlLabel, InputLabel,
	Link, ListSubheader, MenuItem, Select, Switch, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChoiceControl, { AsiControl } from './ChoiceControls';
import {
	getChoiceValues, getLevelEntries, getSubclass, resolveCount,
} from '../../utils/classChoices';
import { getClass } from '../../utils/characterCalc';

const SOURCE_ORDER = ["Player's Handbook", "Xanathar's Guide to Everything", "Tasha's Cauldron of Everything"];
const rank = (s) => { const i = SOURCE_ORDER.indexOf(s); return i < 0 ? SOURCE_ORDER.length : i; };

function Description({ text, label = 'Details' }) {
	const [open, setOpen] = React.useState(false);
	if (!text) return null;
	return (
		<Box sx={{ marginTop: 0.5 }}>
			<Button size="small" onClick={() => setOpen(!open)} sx={{ paddingX: 0.5, minWidth: 0 }}>{open ? 'Hide' : label}</Button>
			<Collapse in={open} unmountOnExit>
				<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginTop: 0.5 }}>{text}</Typography>
			</Collapse>
		</Box>
	);
}

function SubclassPicker({ cls, character, updateClass }) {
	const current = character.classInfo.subclass || '';
	const sub = getSubclass(character);
	const grouped = [...cls.subclasses].sort((a, b) => rank(a.source) - rank(b.source) || a.name.localeCompare(b.name));
	const items = [];
	let lastSource = null;
	grouped.forEach((s) => {
		const source = s.source || 'Other';
		if (source !== lastSource) { items.push(<ListSubheader key={`h-${source}`}>{s.homebrew ? 'Homebrew (not official D&D content)' : source}</ListSubheader>); lastSource = source; }
		items.push(<MenuItem key={s.slug} value={s.name}>{s.name}{s.homebrew ? ' (Homebrew)' : ''}</MenuItem>);
	});
	return (
		<Box sx={{ marginTop: 1.5 }}>
			<FormControl size="small" fullWidth>
				<InputLabel>{cls.subclassName}</InputLabel>
				<Select
					label={cls.subclassName}
					value={current}
					onChange={(e) => updateClass({ subclass: e.target.value })}
					MenuProps={{ PaperProps: { sx: { maxHeight: 420 } } }}
				>
					{items}
				</Select>
			</FormControl>
			{sub && (
				<Box sx={{ marginTop: 1 }}>
					{sub.homebrew && (
							<Alert severity="warning" sx={{ marginBottom: 1 }}>
								<strong>Homebrew.</strong> {sub.name} is custom content, not official D&amp;D material. Check with your DM before using it.
								{sub.sourceUrl && <> <Link href={sub.sourceUrl} target="_blank" rel="noopener noreferrer">View the original</Link>.</>}
							</Alert>
						)}
						<Typography variant="caption" sx={{ color: 'text.secondary' }}>{sub.homebrew ? 'Homebrew' : sub.source}</Typography>
					<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{sub.summary}</Typography>
				</Box>
			)}
		</Box>
	);
}

function FeatureCard({ entry, character, cls, updateClass }) {
	const values = getChoiceValues(character);
	const setChoice = (id, value) => updateClass((ci) => ({ choices: { ...(ci.choices || {}), [id]: typeof value === 'function' ? value((ci.choices || {})[id]) : value } }));
	const toggleOptional = (on) => updateClass((ci) => {
		const current = ci.optionalFeatures || [];
		return { optionalFeatures: on ? [...current.filter((n) => n !== entry.name), entry.name] : current.filter((n) => n !== entry.name) };
	});
	const dimmed = entry.kind === 'class' && entry.optional && !entry.enabled;
	return (
		<Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1.5, padding: 1.5, marginBottom: 1, opacity: dimmed ? 0.65 : 1 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Typography sx={{ fontWeight: 600 }}>{entry.label}</Typography>
				{entry.kind === 'subclass' && <Chip size="small" color={entry.homebrew ? 'warning' : 'primary'} variant="outlined" label={entry.source} />}
				{entry.optional && <Chip size="small" variant="outlined" label="Optional" />}
				{entry.repeat && <Chip size="small" variant="outlined" label="Continues" />}
			</Box>
			{entry.optional && (
				<FormControlLabel
					sx={{ marginLeft: 0 }}
					control={<Switch size="small" checked={entry.enabled} onChange={(e) => toggleOptional(e.target.checked)} />}
					label={<Typography variant="body2">Use this optional feature (Tasha&apos;s Cauldron of Everything)</Typography>}
				/>
			)}
			{entry.kind === 'subclassPick' && <SubclassPicker cls={cls} character={character} updateClass={updateClass} />}
			{entry.kind === 'asi' && (
				<AsiControl character={character} value={values[entry.key]} onChange={(v) => setChoice(entry.key, v)} />
			)}
			{entry.enabled !== false && (entry.choices || []).map((def) => (
				<ChoiceControl
					key={def.id}
					def={def}
					entry={entry}
					character={character}
					value={values[def.id]}
					onChange={(v) => setChoice(def.id, v)}
				/>
			))}
			{entry.enabled !== false && (entry.spellChoices || []).length > 0 && (
				<Typography variant="body2" sx={{ marginTop: 1.5, color: 'text.secondary' }}>
					You choose the spells for this feature on the <Link href="#/spells">Spells</Link> step.
				</Typography>
			)}
			{entry.kind !== 'asi' && <Description text={entry.repeat ? 'This feature improves at this level. See its full text at the earlier level.' : entry.description} />}
		</Box>
	);
}

// Pending = a choice that hasn't been made yet for this level.
const MULTI_KINDS = ['multi', 'spells', 'skills', 'languages', 'expertise', 'tools'];

function isDone(def, v, character) {
	if (!v) return false;
	if (!MULTI_KINDS.includes(def.kind)) return true;
	return Array.isArray(v) && v.length >= resolveCount(def, character);
}

function pendingCount(level, values, character) {
	let n = 0;
	const groups = {}; // either-or choices (a skill or a language) count once, and are done when either is
	level.entries.forEach((e) => {
		if (e.kind === 'subclassPick' && !values.__subclass) n += 1;
		if (e.kind === 'asi' && !isAsiDone(values[e.key])) n += 1;
		if (e.enabled !== false) (e.choices || []).forEach((d) => {
			const done = isDone(d, values[d.id], character);
			if (d.group) groups[d.group] = groups[d.group] || done;
			else if (!done) n += 1;
		});
	});
	return n + Object.values(groups).filter((done) => !done).length;
}

function isAsiDone(v) {
	if (!v) return false;
	if (v.type === 'two') return !!v.a;
	if (v.type === 'split') return !!v.a && !!v.b;
	if (v.type === 'feat') return !!v.feat;
	return false;
}

export default function ClassLevels({ character, updateClass }) {
	const cls = getClass(character);
	const levels = getLevelEntries(character);
	const values = { ...getChoiceValues(character), __subclass: character.classInfo.subclass };
	const [open, setOpen] = React.useState({});
	const seenChoiceLevels = React.useRef(new Set());

	// Levels that need a decision open themselves the first time they appear (for example, the later
	// levels of a subclass once it is picked); after that the user is in charge of what is open.
	const choiceLevels = levels
		.filter((lv) => lv.entries.some((e) => e.kind === 'asi' || e.kind === 'subclassPick' || (e.enabled !== false && (e.choices || []).length)))
		.map((lv) => lv.level);
	const choiceKey = choiceLevels.join(',');
	React.useEffect(() => {
		const fresh = choiceLevels.filter((l) => !seenChoiceLevels.current.has(l));
		if (!fresh.length) return;
		fresh.forEach((l) => seenChoiceLevels.current.add(l));
		setOpen((o) => ({ ...o, ...Object.fromEntries(fresh.map((l) => [l, true])) }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [choiceKey]);

	if (!cls || !levels.length) return null;
	return (
		<Box sx={{ marginTop: 3 }}>
			<Typography variant="h6" sx={{ marginBottom: 1 }}>Level by level</Typography>
			<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1.5 }}>
				Everything your {cls.name} gets from level 1 to {levels.length}. Pick your options where a dropdown appears.
			</Typography>
			{levels.map((lv) => {
				const pending = pendingCount(lv, values, character);
				return (
					<Accordion
						key={lv.level}
						disableGutters
						expanded={!!open[lv.level]}
						onChange={(_, isOpen) => setOpen((o) => ({ ...o, [lv.level]: isOpen }))}
						slotProps={{ transition: { unmountOnExit: true } }}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', width: '100%', paddingRight: 1 }}>
								<Typography sx={{ fontWeight: 700, minWidth: 64 }}>Level {lv.level}</Typography>
								<Typography variant="body2" sx={{ color: 'text.secondary', flex: 1, minWidth: 0 }}>
									{lv.entries.map((e) => e.label).join(', ') || '—'}
								</Typography>
								{pending > 0 && <Chip size="small" color="warning" variant="outlined" label={`${pending} to choose`} />}
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: 1 }}>
								Proficiency bonus +{lv.proficiencyBonus}
							</Typography>
							{lv.entries.map((entry) => (
								<FeatureCard key={entry.key} entry={entry} character={character} cls={cls} updateClass={updateClass} />
							))}
							{lv.entries.length === 0 && <Typography variant="body2" sx={{ color: 'text.secondary' }}>No new features.</Typography>}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</Box>
	);
}
