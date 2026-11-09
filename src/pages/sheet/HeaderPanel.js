import * as React from 'react';
import {
	Box, Button, Card, CardContent, Checkbox, Chip, LinearProgress, Menu, MenuItem, TextField, Typography,
} from '@mui/material';
import { signed } from './dice';
import { hitDiceLeftByDie } from './derive';

export const CONDITIONS = [
	'Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible',
	'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious',
];

function Stat({ label, value, onClick }) {
	return (
		<Box
			onClick={onClick}
			sx={{
				textAlign: 'center', minWidth: { xs: 0, sm: 78 }, padding: 1, border: 1, borderColor: 'divider', borderRadius: 2,
				cursor: onClick ? 'pointer' : 'default', '&:hover': onClick ? { borderColor: 'primary.main' } : {},
			}}
		>
			<Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Typography>
			<Typography variant="h6" sx={{ lineHeight: 1.2 }}>{value}</Typography>
		</Box>
	);
}

export default function HeaderPanel({ character, d, play, setPlay, hp, onRoll, onRest }) {
	const [amount, setAmount] = React.useState('');
	const [condAnchor, setCondAnchor] = React.useState(null);
	const hpPercent = d.hpMax ? Math.max(0, Math.min(100, (play.hpCurrent / d.hpMax) * 100)) : 0;
	const dying = d.hpMax > 0 && play.hpCurrent === 0;
	const hitDiceTotal = d.hitDice.reduce((sum, x) => sum + x.count, 0) || d.level;
	const hitDiceLeft = Math.max(0, hitDiceTotal - play.hitDiceUsed);
	const hitDiceText = hitDiceLeftByDie(d.hitDice, play.hitDiceUsed).map((x) => `${x.count}d${x.die}`).join(' + ') || '0';
	const n = Number(amount);

	return (
		<Card sx={{ backgroundColor: 'background.paper' }}>
			<CardContent sx={{ padding: 2.5 }}>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 2, marginBottom: 2 }}>
					<Typography variant="h5" sx={{ fontWeight: 700 }}>{character.info.name || 'Unnamed Character'}</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						{[d.race && (d.subrace?.name || d.race.name), d.cls && d.classSummary, d.background && d.background.name].filter(Boolean).join(' · ')}
					</Typography>
				</Box>

				<Box sx={{ display: { xs: 'grid', sm: 'flex' }, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', flexWrap: 'wrap', gap: 1.5, marginBottom: 2 }}>
					<Stat label="Armor Class" value={d.ac} />
					<Stat label="Initiative" value={signed(d.initiative)} onClick={() => onRoll('Initiative', d.initiative)} />
					<Stat label="Speed" value={`${d.speed} ft`} />
					<Stat label="Proficiency" value={signed(d.prof)} />
					<Stat label="Passive Perc." value={d.passivePerception} />
					<Box sx={{ textAlign: 'center', minWidth: { xs: 0, sm: 78 }, padding: 1, border: 1, borderColor: play.inspiration ? 'primary.main' : 'divider', borderRadius: 2 }}>
						<Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>Inspiration</Typography>
						<Box><Checkbox size="small" checked={play.inspiration} onChange={(e) => setPlay({ inspiration: e.target.checked })} sx={{ padding: 0.5 }} /></Box>
					</Box>
				</Box>

				<Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, padding: 1.5 }}>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
						<Box sx={{ minWidth: 150 }}>
							<Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>Hit Points</Typography>
							<Typography variant="h4" sx={{ lineHeight: 1.1 }}>
								{play.hpCurrent}<span style={{ opacity: 0.5, fontSize: 20 }}> / {d.hpMax}</span>
								{play.hpTemp > 0 && <span style={{ color: '#6ab0f3', fontSize: 18 }}>  +{play.hpTemp} temp</span>}
							</Typography>
						</Box>
						<TextField
							size="small"
							type="number"
							label="Amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							sx={{ width: 110 }}
						/>
						<Button variant="outlined" color="error" disabled={!(n > 0)} onClick={() => { hp.damage(n); setAmount(''); }}>Damage</Button>
						<Button variant="outlined" color="success" disabled={!(n > 0)} onClick={() => { hp.heal(n); setAmount(''); }}>Heal</Button>
						<Button variant="outlined" disabled={!(n >= 0) || amount === ''} onClick={() => { hp.setTemp(n); setAmount(''); }}>Set temp HP</Button>
					</Box>
					<LinearProgress
						variant="determinate"
						value={hpPercent}
						color={hpPercent > 50 ? 'success' : hpPercent > 25 ? 'warning' : 'error'}
						sx={{ marginTop: 1.5, height: 8, borderRadius: 4 }}
					/>
					{dying && (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, marginTop: 1.5 }}>
							<Typography variant="body2" sx={{ fontWeight: 600 }}>Death saves</Typography>
							{[['successes', 'Successes', 'success'], ['failures', 'Failures', 'error']].map(([key, label, color]) => (
								<Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography variant="caption" sx={{ marginRight: 0.5 }}>{label}</Typography>
									{[1, 2, 3].map((i) => (
										<Checkbox
											key={i}
											size="small"
											color={color}
											checked={play.deathSaves[key] >= i}
											onChange={() => hp.setDeathSave(key, play.deathSaves[key] >= i ? i - 1 : i)}
											sx={{ padding: 0.25 }}
										/>
									))}
								</Box>
							))}
							<Button size="small" variant="outlined" onClick={hp.rollDeathSave}>Roll death save</Button>
						</Box>
					)}
				</Box>

				<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, marginTop: 2 }}>
					<Typography variant="body2" sx={{ color: 'text.secondary' }}>
						Hit Dice: {d.hitDice.length > 1 ? `${hitDiceText} left of ${hitDiceTotal}` : `${hitDiceLeft}/${hitDiceTotal} d${d.hitDie}`}
					</Typography>
					<Button size="small" variant="outlined" disabled={hitDiceLeft === 0} onClick={hp.spendHitDie}>Spend hit die</Button>
					<Box sx={{ flex: 1 }} />
					<Button size="small" variant="outlined" onClick={(e) => setCondAnchor(e.currentTarget)}>
						Conditions{play.conditions.length ? ` (${play.conditions.length})` : ''}
					</Button>
					<Menu anchorEl={condAnchor} open={!!condAnchor} onClose={() => setCondAnchor(null)}>
						{CONDITIONS.map((c) => (
							<MenuItem
								key={c}
								dense
								onClick={() => setPlay({
									conditions: play.conditions.includes(c) ? play.conditions.filter((x) => x !== c) : [...play.conditions, c],
								})}
							>
								<Checkbox size="small" checked={play.conditions.includes(c)} sx={{ padding: 0.5, marginRight: 1 }} />
								{c}
							</MenuItem>
						))}
					</Menu>
					<Button size="small" variant="contained" onClick={() => onRest('short')}>Short rest</Button>
					<Button size="small" variant="contained" onClick={() => onRest('long')}>Long rest</Button>
				</Box>
				{play.conditions.length > 0 && (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, marginTop: 1.5 }}>
						{play.conditions.map((c) => (
							<Chip key={c} size="small" color="warning" label={c} onDelete={() => setPlay({ conditions: play.conditions.filter((x) => x !== c) })} />
						))}
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
