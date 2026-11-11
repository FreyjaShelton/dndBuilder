import * as React from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { USE_TEXT, describeVariant, getFeatSpellGrant, resolveFeatSpells } from '../../utils/featSpells';
import useSpellDetails from '../../utils/useSpellDetails';
import SpellPicker2014 from './SpellPicker2014';

// The spells a feat gives (2014): a dropdown for the feat's variant (Magic Initiate's class...), the spells it grants
// automatically, and a spell picker for each spell the player chooses. Shown where the feat is chosen.
// state: { variant, picks: { [pickId]: [names] } }; onChange receives an updater (currentState) => newState.
function Body({ featName, state, onChange, variantPrefix }) {
	const details = useSpellDetails();
	const r = resolveFeatSpells(featName, state, variantPrefix);
	const { grant, variant, variants } = r;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, marginTop: 1 }}>
			<Typography variant="subtitle2" sx={{ color: 'primary.main' }}>{featName}: spells</Typography>
			{variants.length > 1 && (
				<FormControl size="small" fullWidth>
					<InputLabel>{grant.variantLabel}</InputLabel>
					<Select
						label={grant.variantLabel}
						value={variant ? variant.name : ''}
						onChange={(e) => onChange((prev) => ({ ...(prev || {}), variant: e.target.value, picks: {} }))}
						MenuProps={{ PaperProps: { sx: { maxHeight: 360 } } }}
					>
						{variants.map((v) => <MenuItem key={v.name} value={v.name} sx={{ whiteSpace: 'normal' }}>{describeVariant(v)}</MenuItem>)}
					</Select>
				</FormControl>
			)}
			{variant && (
				<>
					{r.fixed.length > 0 && (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
							<Typography variant="body2" sx={{ color: 'text.secondary' }}>You also learn</Typography>
							{r.fixed.map((f) => (
								<Chip key={f.name} size="small" label={USE_TEXT[f.use] ? `${f.name} (${USE_TEXT[f.use]})` : f.name} />
							))}
						</Box>
					)}
					{r.ability && <Typography variant="caption" sx={{ color: 'text.secondary' }}>Spellcasting ability: {r.ability}.</Typography>}
					{r.picks.map((p) => (
						<SpellPicker2014
							key={`${variant.name}:${p.id}`}
							section={{ title: p.title, subtitle: USE_TEXT[p.use] ? `Cast ${USE_TEXT[p.use]} without a spell slot` : 'Known spell', note: '', count: p.count, options: p.options, value: p.value }}
							details={details}
							onChange={(update) => onChange((prev) => ({ ...(prev || {}), picks: { ...((prev || {}).picks || {}), [p.id]: update(((prev || {}).picks || {})[p.id] || []) } }))}
						/>
					))}
				</>
			)}
		</Box>
	);
}

// A separate wrapper so the spell text only loads for feats that actually grant spells.
// variantPrefix limits the variants on offer (a Lorehold Student's Strixhaven Initiate is always Lorehold).
export default function FeatSpellChoices({ featName, edition, state, onChange, variantPrefix }) {
	if (edition !== '2014' || !getFeatSpellGrant(featName)) return null;
	return <Body featName={featName} state={state} onChange={onChange} variantPrefix={variantPrefix} />;
}
