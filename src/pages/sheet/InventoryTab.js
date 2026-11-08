import * as React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { getEditionData } from '../../data';

const COINS = [['pp', 'PP'], ['gp', 'GP'], ['ep', 'EP'], ['sp', 'SP'], ['cp', 'CP']];

export default function InventoryTab({ character, d, play, setPlay }) {
	const { weapons, armor, gear } = getEditionData(character.edition).equipment;
	const { equipment } = character;
	const rows = [];
	if (equipment.armor) {
		const a = armor.find((x) => x.name === equipment.armor);
		rows.push({ name: `${equipment.armor} (worn)`, weight: a ? a.weight : 0 });
	}
	if (equipment.shield) rows.push({ name: 'Shield (equipped)', weight: armor.find((x) => x.type === 'Shield')?.weight || 0 });
	equipment.weapons.forEach((n) => rows.push({ name: n, weight: weapons.find((w) => w.name === n)?.weight || 0 }));
	equipment.gear.forEach((n) => rows.push({ name: n, weight: gear.find((g) => g.name === n)?.weight || 0 }));
	const total = rows.reduce((sum, r) => sum + r.weight, 0);
	const capacity = (Number(d.finals.str) || 0) * 15;

	return (
		<Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, marginBottom: 3 }}>
				{COINS.map(([key, label]) => (
					<TextField
						key={key}
						size="small"
						type="number"
						label={label}
						value={play.currency[key]}
						onChange={(e) => setPlay({ currency: { ...play.currency, [key]: Math.max(0, Number(e.target.value) || 0) } })}
						sx={{ width: 90 }}
					/>
				))}
			</Box>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Item</TableCell>
						<TableCell align="right">Weight (lb)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((r, i) => (
						<TableRow key={`${r.name}-${i}`}>
							<TableCell>{r.name}</TableCell>
							<TableCell align="right">{r.weight}</TableCell>
						</TableRow>
					))}
					{rows.length === 0 && (
						<TableRow><TableCell colSpan={2} sx={{ color: 'text.secondary' }}>Nothing selected on the builder&apos;s Equipment step.</TableCell></TableRow>
					)}
				</TableBody>
			</Table>
			<Typography variant="body2" sx={{ marginTop: 2, color: total > capacity && capacity ? 'error.main' : 'text.secondary' }}>
				Carried {Math.round(total * 100) / 100} lb{capacity ? ` of ${capacity} lb capacity (Strength × 15)` : ''}
			</Typography>
		</Box>
	);
}
