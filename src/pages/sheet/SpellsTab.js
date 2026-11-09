import * as React from 'react';
import {
	Alert, Box, Button, Chip, Collapse, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { signed } from './dice';
import { getPreparedLimit2014, getPreparedSpells } from '../../utils/spells2014';
import { getClassViews } from '../../utils/multiclass';
import PreparedSpellsEditor from './PreparedSpellsEditor';

function SlotBubbles({ total, used, onChange }) {
	return (
		<Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
			{Array.from({ length: total }, (_, i) => {
				const available = i < total - used;
				return (
					<Box
						key={i}
						onClick={() => onChange(available ? used + 1 : used - 1)}
						role="checkbox"
						aria-checked={available}
						sx={{
							width: { xs: 26, sm: 18 }, height: { xs: 26, sm: 18 }, borderRadius: '50%', border: 2, borderColor: 'primary.main', cursor: 'pointer',
							backgroundColor: available ? 'primary.main' : 'transparent',
						}}
					/>
				);
			})}
		</Box>
	);
}

const damageOf = (spell) => {
	const m = spell.description.match(/(\d+d\d+(?:\s*\+\s*\d+)?)\s+([A-Z][a-z]+)\s+damage/);
	return m ? { expr: m[1].replace(/\s+/g, ''), type: m[2] } : null;
};
const saveOf = (spell) => {
	const m = spell.description.match(/(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/);
	return m ? m[1].slice(0, 3).toUpperCase() : null;
};

function SpellCard({ spell, d, castLevels, onCast, onAttack, onDamage }) {
	const [open, setOpen] = React.useState(false);
	const [anchor, setAnchor] = React.useState(null);
	// a multiclassed character's spell uses the save DC and attack bonus of the class it was learned with
	const stats = (d.spellStatsList || []).find((x) => x.index === spell.casterIndex) || d.spellStats;
	const dmg = damageOf(spell);
	const save = saveOf(spell);
	const hasAttack = /spell attack/i.test(spell.description);
	const isCantrip = spell.level === 0;

	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '6px 0' }}>
			{/* clicking anywhere on the spell (not just the arrow) opens its description; the buttons below do their own thing */}
			<Box
				onClick={() => setOpen(!open)}
				sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', cursor: 'pointer' }}
			>
				<Typography sx={{ flex: '1 1 140px', fontWeight: 600 }}>{spell.name}</Typography>
				<Typography variant="caption" sx={{ color: 'text.secondary' }}>{spell.castingTime.split(',')[0]} · {spell.range}</Typography>
				{spell.concentration && <Chip size="small" label="C" title="Concentration" />}
				{spell.ritual && <Chip size="small" label="R" title="Ritual" />}
				{save && <Chip size="small" variant="outlined" label={`${save} save DC ${stats.saveDc}`} />}
				<Box component="span" onClick={(e) => e.stopPropagation()} sx={{ display: 'contents' }}>
					{hasAttack && (
						<Button size="small" variant="outlined" onClick={() => onAttack(`${spell.name} attack`, stats.attackBonus)}>
							Attack {signed(stats.attackBonus)}
						</Button>
					)}
					{dmg && (
						<Button size="small" variant="outlined" onClick={() => onDamage(`${spell.name} (${dmg.type})`, dmg.expr)}>
							{dmg.expr}
						</Button>
					)}
					{isCantrip ? (
						<Button size="small" variant="contained" onClick={() => onCast(spell, 0)}>Cast</Button>
					) : (
						<>
							<Button size="small" variant="contained" disabled={castLevels.length === 0} onClick={(e) => setAnchor(e.currentTarget)}>Cast</Button>
							<Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
								{castLevels.map((c) => (
									<MenuItem key={`${c.pact ? 'pact' : 'slot'}${c.level}`} dense onClick={() => { setAnchor(null); onCast(spell, c.level, c.pact ? 'pact' : undefined); }}>
										Level {c.level} {c.pact ? 'Pact Magic slot' : 'slot'}
									</MenuItem>
								))}
							</Menu>
						</>
					)}
				</Box>
				<IconButton size="small" aria-label={open ? 'Hide spell description' : 'Show spell description'} aria-expanded={open} sx={{ transform: open ? 'rotate(180deg)' : 'none' }}>
					<ExpandMoreIcon />
				</IconButton>
			</Box>
			<Collapse in={open} unmountOnExit>
				<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', marginTop: 0.5 }}>
					{spell.school} · {spell.components} · {spell.duration}
				</Typography>
				<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginTop: 0.5 }}>{spell.description}</Typography>
				{spell.higherLevels && (
					<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginTop: 0.5, color: 'text.secondary' }}>{spell.higherLevels}</Typography>
				)}
			</Collapse>
		</Box>
	);
}

export default function SpellsTab({ character, setPrepared, d, play, setPlay, onCast, onAttack, onDamage }) {
	// the class whose prepared list is being edited (its index), or null
	const [editing, setEditing] = React.useState(null);
	if (!d.spellStats) {
		return <Typography color="text.secondary">{d.cls ? `${d.cls.name}s don't cast spells.` : 'No class selected.'}</Typography>;
	}
	const statsList = d.spellStatsList && d.spellStatsList.length ? d.spellStatsList : [d.spellStats];
	const multi = getClassViews(character).length > 1;
	// clerics, druids, paladins and wizards prepare spells and can change them (after a long rest); a multiclassed character
	// has a list for each class that prepares
	const preparedClasses = character.edition === '2014'
		? getClassViews(character).map((v, i) => ({ index: i, name: v.classInfo.className, limit: getPreparedLimit2014(v), count: getPreparedSpells(v).length })).filter((x) => x.limit > 0)
		: [];
	if (editing !== null && preparedClasses.some((x) => x.index === editing)) {
		return <PreparedSpellsEditor character={character} setPrepared={setPrepared} classIndex={editing} onDone={() => setEditing(null)} />;
	}
	const slots = d.slots;
	// regular slots (a single class's own, or the combined multiclass ones) and Pact Magic slots, which are kept apart
	const regular = slots.type === 'standard' ? slots.slots : null;
	const pact = slots.type === 'pact' ? slots : slots.pact || null;
	const levels = regular ? Object.entries(regular).filter(([, n]) => n > 0).map(([l, n]) => [Number(l), n]) : [];
	const castLevelsFor = (spell) => {
		const out = [];
		if (regular) for (let l = spell.level; l <= 9; l++) if ((regular[l] || 0) - (play.slotsUsed[l] || 0) > 0) out.push({ level: l });
		if (pact && pact.level >= spell.level && pact.count - play.pactUsed > 0) out.push({ level: pact.level, pact: true });
		return out;
	};
	const groups = [...new Set(d.spells.map((s) => s.level))].sort((a, b) => a - b);

	return (
		<Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
				{statsList.map((s) => (
					<React.Fragment key={s.index || 0}>
						{multi && <Chip size="small" color="primary" label={s.className} />}
						<Chip size="small" label={`${s.ability} casting`} />
						<Chip size="small" label={`Save DC ${s.saveDc}`} />
						<Chip size="small" label={`Spell attack ${signed(s.attackBonus)}`} />
					</React.Fragment>
				))}
				{preparedClasses.map((x, k) => (
					<React.Fragment key={x.index}>
						<Chip size="small" label={`${multi ? `${x.name} prepared` : 'Prepared'} ${x.count} / ${x.limit}`} />
						<Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => setEditing(x.index)} sx={k === 0 ? { marginLeft: 'auto' } : undefined}>
							{multi ? `Edit ${x.name} prepared spells` : 'Edit prepared spells'}
						</Button>
					</React.Fragment>
				))}
			</Box>

			{play.concentration && (
				<Alert severity="info" sx={{ marginBottom: 2 }} action={<Button color="inherit" size="small" onClick={() => setPlay({ concentration: '' })}>End</Button>}>
					Concentrating on {play.concentration}
				</Alert>
			)}

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2 }}>
				{slots.combined !== undefined && (
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						Combined spellcaster level {slots.combined} (Multiclass Spellcaster table). These slots cast spells from any of your classes.
					</Typography>
				)}
				{levels.map(([lvl, total]) => (
					<Box key={lvl} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography variant="body2" sx={{ width: 120 }}>Level {lvl}</Typography>
						<SlotBubbles
							total={total}
							used={play.slotsUsed[lvl] || 0}
							onChange={(u) => setPlay({ slotsUsed: { ...play.slotsUsed, [lvl]: Math.max(0, Math.min(total, u)) } })}
						/>
					</Box>
				))}
				{pact && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography variant="body2" sx={{ width: 120 }}>Pact slots (L{pact.level})</Typography>
						<SlotBubbles total={pact.count} used={play.pactUsed} onChange={(u) => setPlay({ pactUsed: Math.max(0, Math.min(pact.count, u)) })} />
					</Box>
				)}
			</Box>

			{d.spells.length === 0 && (
				<Typography variant="body2" color="text.secondary">No spells chosen yet — pick them on the builder&apos;s Spells step.</Typography>
			)}
			{groups.map((lvl) => (
				<Box key={lvl} sx={{ marginBottom: 2 }}>
					<Typography variant="subtitle2" sx={{ color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1 }}>
						{lvl === 0 ? 'Cantrips' : `Level ${lvl}`}
					</Typography>
					{d.spells.filter((s) => s.level === lvl).map((s) => (
						<SpellCard
							key={s.name}
							spell={s}
							d={d}
							castLevels={s.level === 0 ? [] : castLevelsFor(s)}
							onCast={onCast}
							onAttack={onAttack}
							onDamage={onDamage}
						/>
					))}
				</Box>
			))}
		</Box>
	);
}
