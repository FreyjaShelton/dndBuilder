import * as React from 'react';
import {
	Alert, Box, Button, Chip, Collapse, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { signed } from './dice';

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
							width: 18, height: 18, borderRadius: '50%', border: 2, borderColor: 'primary.main', cursor: 'pointer',
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
	const dmg = damageOf(spell);
	const save = saveOf(spell);
	const hasAttack = /spell attack/i.test(spell.description);
	const isCantrip = spell.level === 0;

	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '6px 0' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Typography sx={{ flex: '1 1 140px', fontWeight: 600 }}>{spell.name}</Typography>
				<Typography variant="caption" sx={{ color: 'text.secondary' }}>{spell.castingTime.split(',')[0]} · {spell.range}</Typography>
				{spell.concentration && <Chip size="small" label="C" title="Concentration" />}
				{spell.ritual && <Chip size="small" label="R" title="Ritual" />}
				{save && <Chip size="small" variant="outlined" label={`${save} save DC ${d.spellStats.saveDc}`} />}
				{hasAttack && (
					<Button size="small" variant="outlined" onClick={() => onAttack(`${spell.name} attack`, d.spellStats.attackBonus)}>
						Attack {signed(d.spellStats.attackBonus)}
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
							{castLevels.map((l) => (
								<MenuItem key={l} dense onClick={() => { setAnchor(null); onCast(spell, l); }}>Level {l} slot</MenuItem>
							))}
						</Menu>
					</>
				)}
				<IconButton size="small" onClick={() => setOpen(!open)} sx={{ transform: open ? 'rotate(180deg)' : 'none' }}>
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

export default function SpellsTab({ d, play, setPlay, onCast, onAttack, onDamage }) {
	if (!d.spellStats) {
		return <Typography color="text.secondary">{d.cls ? `${d.cls.name}s don't cast spells.` : 'No class selected.'}</Typography>;
	}
	const slots = d.slots;
	const levels = slots.type === 'standard' ? Object.entries(slots.slots).filter(([, n]) => n > 0).map(([l, n]) => [Number(l), n]) : [];
	const available = (lvl) => {
		if (slots.type === 'pact') return slots.level === lvl ? slots.count - play.pactUsed : 0;
		return (slots.slots[lvl] || 0) - (play.slotsUsed[lvl] || 0);
	};
	const castLevelsFor = (spell) => {
		const out = [];
		const top = slots.type === 'pact' ? slots.level : 9;
		for (let l = spell.level; l <= top; l++) if (available(l) > 0) out.push(l);
		return out;
	};
	const groups = [...new Set(d.spells.map((s) => s.level))].sort((a, b) => a - b);

	return (
		<Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
				<Chip size="small" label={`${d.spellStats.ability} casting`} />
				<Chip size="small" label={`Save DC ${d.spellStats.saveDc}`} />
				<Chip size="small" label={`Spell attack ${signed(d.spellStats.attackBonus)}`} />
			</Box>

			{play.concentration && (
				<Alert severity="info" sx={{ marginBottom: 2 }} action={<Button color="inherit" size="small" onClick={() => setPlay({ concentration: '' })}>End</Button>}>
					Concentrating on {play.concentration}
				</Alert>
			)}

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 2 }}>
				{slots.type === 'pact' ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography variant="body2" sx={{ width: 120 }}>Pact slots (L{slots.level})</Typography>
						<SlotBubbles total={slots.count} used={play.pactUsed} onChange={(u) => setPlay({ pactUsed: Math.max(0, Math.min(slots.count, u)) })} />
					</Box>
				) : levels.map(([lvl, total]) => (
					<Box key={lvl} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography variant="body2" sx={{ width: 120 }}>Level {lvl}</Typography>
						<SlotBubbles
							total={total}
							used={play.slotsUsed[lvl] || 0}
							onChange={(u) => setPlay({ slotsUsed: { ...play.slotsUsed, [lvl]: Math.max(0, Math.min(total, u)) } })}
						/>
					</Box>
				))}
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
