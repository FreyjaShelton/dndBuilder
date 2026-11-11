import * as React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { signed } from './dice';
import ItemAbilities from './ItemAbilities';
import TraitActions from './TraitActions';

export default function ActionsTab({ character, d, play, setPlay, onAttack, onDamage, onUseAbility, onCastItemSpell, onUseTrait }) {
	const strMod = d.mods.str;
	const unarmed = {
		name: 'Unarmed Strike',
		attackBonus: signed(strMod + d.prof),
		damage: `${Math.max(1, 1 + strMod)} Bludgeoning`,
		mastery: '',
	};
	const rows = [unarmed, ...d.attacks];

	return (
		<Box>
			<TableContainer>
			<Table size="small" sx={{ '& .MuiTableCell-root': { padding: { xs: '6px 4px', sm: '6px 16px' } }, '& .MuiButton-root': { fontSize: { xs: 11, sm: 13 }, padding: { xs: '2px 6px', sm: '4px 10px' } } }}>
				<TableHead>
					<TableRow>
						<TableCell>Attack</TableCell>
						<TableCell align="center">To hit</TableCell>
						<TableCell align="center">Damage</TableCell>
						<TableCell>Notes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((a) => {
						const bonus = parseInt(a.attackBonus, 10);
						return (
							<TableRow key={a.name}>
								<TableCell>{a.name}</TableCell>
								<TableCell align="center">
									<Button size="small" variant="outlined" onClick={() => onAttack(`${a.name} attack`, bonus)}>{a.attackBonus}</Button>
								</TableCell>
								<TableCell align="center">
									<Button size="small" variant="outlined" onClick={() => onDamage(`${a.name} damage`, a.damage)}>{a.damage}</Button>
									<Button size="small" sx={{ minWidth: 0, marginLeft: 0.5 }} onClick={() => onDamage(`${a.name} damage (crit)`, a.damage, true)}>Crit</Button>
								</TableCell>
								<TableCell>{[a.spellAttack && 'Spell attack', a.mastery && `Mastery: ${a.mastery}`].filter(Boolean).join(' · ')}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			</TableContainer>
			<TraitActions character={character} play={play} setPlay={setPlay} prof={d.prof} onUse={onUseTrait} />
			<ItemAbilities character={character} play={play} setPlay={setPlay} onUse={onUseAbility} onCastSpell={onCastItemSpell} spellSaveDc={d.spellStats?.saveDc} prof={d.prof} d={d} />
			{d.spellStats && (
				<Typography variant="body2" sx={{ marginTop: 2, color: 'text.secondary' }}>
					Spell attack {signed(d.spellStats.attackBonus)} · Spell save DC {d.spellStats.saveDc} — open the Spells tab to cast.
				</Typography>
			)}
			{d.attacks.length === 0 && (
				<Typography variant="body2" sx={{ marginTop: 2, color: 'text.secondary' }}>
					{d.equipping
						? 'No weapons equipped. Tick Equipped next to a weapon on the Inventory tab to see it here.'
						: 'No weapons selected. Pick some on the builder’s Equipment step to see them here.'}
				</Typography>
			)}
		</Box>
	);
}
