import * as React from 'react';
import { Box, Card, CardContent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ABILITY_KEYS, ABILITY_NAMES } from '../../utils/abilityScore';
import { signed } from './dice';

function Row({ proficient, label, hint, bonus, onRoll }) {
	return (
		<Box
			onClick={onRoll}
			sx={{
				display: 'flex', alignItems: 'center', gap: 1, padding: '3px 6px', borderRadius: 1, cursor: 'pointer',
				'&:hover': { backgroundColor: 'action.hover' },
			}}
		>
			<Box
				sx={{
					width: 10, height: 10, borderRadius: '50%', border: 1, borderColor: 'text.secondary',
					backgroundColor: proficient ? 'primary.main' : 'transparent', flexShrink: 0,
				}}
			/>
			<Typography variant="body2" sx={{ width: 34, textAlign: 'right', fontWeight: 600 }}>{signed(bonus)}</Typography>
			<Typography variant="body2" sx={{ flex: 1 }}>{label}</Typography>
			{hint && <Typography variant="caption" sx={{ color: 'text.secondary' }}>{hint}</Typography>}
		</Box>
	);
}

export default function AbilityPanels({ d, play, setPlay, onRoll }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<ToggleButtonGroup
				exclusive
				fullWidth
				size="small"
				value={play.rollMode}
				onChange={(_, v) => { if (v) setPlay({ rollMode: v }); }}
			>
				<ToggleButton value="disadvantage">Disadvantage</ToggleButton>
				<ToggleButton value="normal">Normal</ToggleButton>
				<ToggleButton value="advantage">Advantage</ToggleButton>
			</ToggleButtonGroup>

			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
				{ABILITY_KEYS.map((k) => (
					<Box
						key={k}
						onClick={() => onRoll(`${ABILITY_NAMES[k]} check`, d.mods[k])}
						sx={{
							textAlign: 'center', padding: 1, border: 1, borderColor: 'divider', borderRadius: 2, cursor: 'pointer',
							backgroundColor: 'background.paper', '&:hover': { borderColor: 'primary.main' },
						}}
					>
						<Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>{k}</Typography>
						<Typography variant="h5" sx={{ lineHeight: 1.1 }}>{signed(d.mods[k])}</Typography>
						<Typography variant="caption" sx={{ color: 'text.secondary' }}>{d.finals[k] === '' ? '—' : d.finals[k]}</Typography>
					</Box>
				))}
			</Box>

			<Card sx={{ backgroundColor: 'background.paper' }}>
				<CardContent sx={{ padding: 1.5, '&:last-child': { paddingBottom: 1.5 } }}>
					<Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>Saving Throws</Typography>
					{d.saves.map((s) => (
						<Row key={s.key} proficient={s.proficient} label={s.name} bonus={s.bonus} onRoll={() => onRoll(`${s.name} save`, s.bonus)} />
					))}
				</CardContent>
			</Card>

			<Card sx={{ backgroundColor: 'background.paper' }}>
				<CardContent sx={{ padding: 1.5, '&:last-child': { paddingBottom: 1.5 } }}>
					<Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>Skills</Typography>
					{d.skills.map((s) => (
						<Row
							key={s.key}
							proficient={s.proficient}
							label={s.name}
							hint={s.ability.toUpperCase()}
							bonus={s.bonus}
							onRoll={() => onRoll(`${s.name} check`, s.bonus)}
						/>
					))}
				</CardContent>
			</Card>
		</Box>
	);
}
