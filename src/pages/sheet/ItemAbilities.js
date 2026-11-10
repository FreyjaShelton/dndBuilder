import * as React from 'react';
import { Box, Button, Checkbox, Chip, Collapse, FormControlLabel, Typography } from '@mui/material';
import { MAX_ATTUNED, describeMagicItem } from '../../utils/equipment';
import { ABILITY_NAMES } from '../../utils/abilityScore';
import { abilityMaxUses, abilityUsesKey, chargesLeft, getMagicItems } from './itemCharges';

function Bubbles({ total, used, onChange, label }) {
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
						aria-label={`${label} ${i + 1}`}
						sx={{
							width: { xs: 26, sm: 18 }, height: { xs: 26, sm: 18 }, borderRadius: '50%', border: 2, borderColor: 'secondary.main', cursor: 'pointer',
							backgroundColor: available ? 'secondary.main' : 'transparent',
						}}
					/>
				);
			})}
		</Box>
	);
}

function Ability({ item, ability, left, dc, prof, charges, setCharges, onUse }) {
	const cost = Number(ability.cost) || 0;
	const usesMax = abilityMaxUses(ability, prof);
	const usesUsed = usesMax === null ? 0 : Math.min(usesMax, Number(charges[abilityUsesKey(item, ability)]) || 0);
	const enough = (cost === 0 || left >= cost) && (usesMax === null || usesUsed < usesMax);
	const passive = ability.activation === 'Passive';
	const save = ability.save ? `${ABILITY_NAMES[ability.save] ? ABILITY_NAMES[ability.save].slice(0, 3).toUpperCase() : ability.save} save${ability.dc ? ` DC ${ability.dc}` : dc ? ` DC ${dc}` : ''}` : '';
	return (
		<Box sx={{ borderTop: 1, borderColor: 'divider', padding: '8px 0' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Typography sx={{ fontWeight: 600, flex: '1 1 140px' }}>{ability.name}</Typography>
				{ability.activation && <Chip size="small" variant="outlined" label={ability.activation} />}
				{cost > 0 && <Chip size="small" variant="outlined" color={left >= cost ? 'secondary' : 'default'} label={`${cost} charge${cost === 1 ? '' : 's'}`} />}
				{ability.resource && <Chip size="small" variant="outlined" label={ability.resource} />}
				{save && <Chip size="small" variant="outlined" label={save} />}
				{!passive && (
					<Button size="small" variant="contained" disabled={!enough} onClick={() => onUse(item, ability)}>
						{ability.dice ? `Use (${ability.dice})` : 'Use'}
					</Button>
				)}
			</Box>
			{usesMax !== null && (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginTop: 0.5 }}>
					<Typography variant="caption" sx={{ minWidth: 90 }}>Uses {usesMax - usesUsed}/{usesMax}</Typography>
					<Bubbles total={usesMax} used={usesUsed} label={`${ability.name} use`} onChange={(u) => setCharges({ [abilityUsesKey(item, ability)]: Math.max(0, Math.min(usesMax, u)) })} />
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{ability.uses.perProficiency ? 'A number of times equal to your proficiency bonus' : ''}{ability.uses.on ? `${ability.uses.perProficiency ? ', r' : 'R'}esets after a ${ability.uses.on === 'Dawn' ? 'dawn' : ability.uses.on.toLowerCase()}` : ''}
					</Typography>
				</Box>
			)}
			{ability.description && <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary', marginTop: 0.5 }}>{ability.description}</Typography>}
		</Box>
	);
}

const BONUS_TEXT = { ac: 'Armor Class', spellSaveDc: 'spell save DC', spellAttack: 'spell attack rolls', saves: 'saving throws' };
const bonusText = (bonuses) => Object.entries(bonuses || {}).filter(([, v]) => Number(v)).map(([k, v]) => `${Number(v) > 0 ? '+' : ''}${v} ${BONUS_TEXT[k] || k}`).join(', ');

// The custom magic items the character carries: their description, attunement, charges and abilities, on the Actions tab.
export default function ItemAbilities({ character, play, setPlay, onUse, spellSaveDc, prof }) {
	const entries = getMagicItems(character, play.items, play.charges);
	const [open, setOpen] = React.useState({});
	if (!entries.length) return null;
	const charges = play.charges || {};
	const setCharges = (patch) => setPlay({ charges: { ...charges, ...patch } });
	const attuned = Array.isArray(play.attuned) ? play.attuned : [];
	const toggleAttune = (name) => setPlay({ attuned: attuned.includes(name) ? attuned.filter((n) => n !== name) : [...attuned, name] });

	return (
		<Box sx={{ marginTop: 3 }}>
			<Typography variant="subtitle2" sx={{ color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 1 }}>Magic items</Typography>
			{entries.map(({ item, used }) => {
				const max = Number(item.charges?.max) || 0;
				const left = chargesLeft(item, used);
				const rule = item.charges;
				const isAttuned = attuned.includes(item.name);
				const groups = [...new Set((item.abilities || []).map((a) => a.group || ''))];
				const bonuses = bonusText(item.bonuses);
				return (
					<Box key={item.name} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, padding: 1.5, marginBottom: 1.5 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
							<Typography sx={{ fontWeight: 700, flex: 1 }}>{item.name}</Typography>
							{item.attunement && (
								<FormControlLabel
									sx={{ marginRight: 0 }}
									control={<Checkbox size="small" checked={isAttuned} disabled={!isAttuned && attuned.length >= MAX_ATTUNED} onChange={() => toggleAttune(item.name)} />}
									label={<Typography variant="body2">Attuned</Typography>}
								/>
							)}
						</Box>
						{describeMagicItem(item) && <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{describeMagicItem(item)}</Typography>}
						{bonuses && (
							<Typography variant="body2" sx={{ marginTop: 0.5, color: item.attunement && !isAttuned ? 'text.disabled' : 'success.main' }}>
								{bonuses}{item.attunement && !isAttuned ? ' (while attuned)' : ''}
							</Typography>
						)}
						{max > 0 && (
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginTop: 1 }}>
								<Typography variant="body2" sx={{ minWidth: 90 }}>Charges {left}/{max}</Typography>
								<Bubbles total={max} used={used} label="Charge" onChange={(u) => setCharges({ [item.name]: Math.max(0, Math.min(max, u)) })} />
								{rule.recharge && (
									<Typography variant="caption" sx={{ color: 'text.secondary' }}>
										Regains {String(rule.recharge).toLowerCase() === 'all' ? 'all charges' : `${rule.recharge} charges`} {rule.on === 'Dawn' ? 'at dawn' : `after a ${(rule.on || 'Long rest').toLowerCase()}`}
									</Typography>
								)}
							</Box>
						)}
						{item.description && (
							<>
								<Button size="small" onClick={() => setOpen((o) => ({ ...o, [item.name]: !o[item.name] }))} sx={{ paddingX: 0.5, minWidth: 0 }}>{open[item.name] ? 'Hide description' : 'Description'}</Button>
								<Collapse in={!!open[item.name]} unmountOnExit>
									<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginBottom: 1 }}>{item.description}</Typography>
								</Collapse>
							</>
						)}
						{groups.map((group) => (
							<Box key={group || 'abilities'} sx={{ marginTop: 1 }}>
								{group && <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>{group}</Typography>}
								{(item.abilities || []).filter((a) => (a.group || '') === group).map((ability, i) => (
									<Ability
										key={`${ability.name}${i}`} item={item} ability={ability} left={left} dc={spellSaveDc} prof={prof}
										charges={charges} setCharges={setCharges} onUse={onUse}
									/>
								))}
							</Box>
						))}
					</Box>
				);
			})}
		</Box>
	);
}
