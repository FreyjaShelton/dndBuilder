import * as React from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';
import { ACTION_SECTIONS, abilityMaxUses } from './itemCharges';
import { Bubbles } from './ItemAbilities';
import { getTraitActions, traitUsesKey } from '../../utils/originFeatures';

const HEADING_SX = { color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 1 };

function TraitRow({ action, prof, charges, setCharges, onUse }) {
	const [open, setOpen] = React.useState(false);
	const key = traitUsesKey(action);
	const max = action.uses ? abilityMaxUses(action, prof) : null;
	const used = max === null ? 0 : Math.min(max, Number(charges[key]) || 0);
	return (
		<Box sx={{ borderTop: 1, borderColor: 'divider', padding: '8px 0' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Box sx={{ flex: '1 1 160px', minWidth: 0 }}>
					<Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>{action.name}</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>{action.from}</Typography>
				</Box>
				<Button size="small" variant="contained" disabled={max !== null && used >= max} onClick={() => onUse(action)}>Use</Button>
			</Box>
			{max !== null && (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginTop: 0.5 }}>
					<Typography variant="caption" sx={{ minWidth: 90 }}>Uses {max - used}/{max}</Typography>
					<Bubbles total={max} used={used} label={`${action.name} use`} onChange={(u) => setCharges({ [key]: Math.max(0, Math.min(max, u)) })} />
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{action.uses.perProficiency ? 'A number of times equal to your proficiency bonus, r' : 'R'}esets after a {action.uses.on.toLowerCase()}
					</Typography>
				</Box>
			)}
			<Button size="small" onClick={() => setOpen((o) => !o)} sx={{ paddingX: 0.5, minWidth: 0 }}>{open ? 'Hide details' : 'Details'}</Button>
			<Collapse in={open} unmountOnExit>
				<Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}>{action.description}</Typography>
			</Collapse>
		</Box>
	);
}

// The racial traits used in play (Healing Hands, Radiant Soul, Breath Weapon...), under the kind of action they take. On the Actions tab.
export default function TraitActions({ character, play, setPlay, prof, onUse }) {
	const actions = getTraitActions(character);
	if (!actions.length) return null;
	const charges = play.charges || {};
	const setCharges = (patch) => setPlay({ charges: { ...charges, ...patch } });
	return (
		<Box>
			{ACTION_SECTIONS.map((section) => {
				const rows = actions.filter((a) => a.activation === section.id);
				if (!rows.length) return null;
				return (
					<Box key={section.id} sx={{ marginTop: 3 }} data-testid={`trait-actions-${section.id}`}>
						<Typography variant="subtitle2" sx={HEADING_SX}>
							{section.title} <Typography component="span" variant="caption" sx={{ textTransform: 'none', letterSpacing: 0, color: 'text.secondary' }}>from racial traits</Typography>
						</Typography>
						{rows.map((a) => <TraitRow key={a.name} action={a} prof={prof} charges={charges} setCharges={setCharges} onUse={onUse} />)}
					</Box>
				);
			})}
		</Box>
	);
}
