import * as React from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SpellPicker2014 from '../spells/SpellPicker2014';
import { getAlwaysPrepared, getGrantedSpellSources, getSpellSections } from '../../utils/spells2014';
import useSpellDetails from '../../utils/useSpellDetails';

// The sheet's Spells tab while editing: the same spell picker the builder uses, for the prepared list only.
// Changes are kept on the sheet while playing; they reach the builder when the player goes back to it (see sheetSync.js).
// classIndex says which class's list this is (0 is the first class; a multiclassed character has one list per class that prepares).
export default function PreparedSpellsEditor({ character, setPrepared, classIndex = 0, onDone }) {
	const details = useSpellDetails();
	const section = getSpellSections(character).find((s) => s.prepared && s.classIndex === classIndex);
	const always = getAlwaysPrepared(character);
	if (!section) return null;
	const isWizard = section.className === 'Wizard';

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginBottom: 1 }}>
				<Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>Edit prepared spells</Typography>
				<Button variant="contained" size="small" startIcon={<CheckIcon />} onClick={onDone}>Done</Button>
			</Box>
			<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 2 }}>
				{isWizard
					? 'Choose which spells from your spellbook you have prepared. You can change this after a long rest.'
					: `Choose which ${section.className} spells you have prepared. You can change this after a long rest.`}
			</Typography>
			<SpellPicker2014
				section={section}
				details={details}
				taken={getGrantedSpellSources(character)}
				onChange={(update) => setPrepared(update, classIndex)}
			/>
			{always.length > 0 && (
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
					<Typography variant="caption" sx={{ color: 'text.secondary', marginRight: 0.5 }}>
						Always prepared, {always[0].from} (not counted above):
					</Typography>
					{always.map((s) => <Chip key={s.name} size="small" label={s.name} />)}
				</Box>
			)}
			<Box sx={{ marginTop: 2 }}>
				<Button variant="contained" size="small" startIcon={<CheckIcon />} onClick={onDone}>Done</Button>
			</Box>
		</Box>
	);
}
