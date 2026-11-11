import * as React from 'react';
import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { itemSpellChargeOptions } from '../../utils/itemSpells';

// The Cast button of a spell a magic item grants (Actions and Spells tabs). `ready`: the item works and the spell has a use left.
// `chargesLeft`: the item's charges still available. A spell that spends charges can't be cast without enough of them; one that can
// be cast higher with extra charges opens a menu of how many to spend. onCast(spell, charges) — charges undefined when none are spent.
export default function ItemSpellCast({ spell, ready, chargesLeft, onCast }) {
	const [anchor, setAnchor] = React.useState(null);
	const options = itemSpellChargeOptions(spell, chargesLeft);
	const short = spell.cost > 0 && options.length === 0;
	const button = (
		<Button
			size="small"
			variant="contained"
			disabled={!ready || short}
			onClick={(e) => {
				if (options.length > 1) setAnchor(e.currentTarget);
				else onCast(spell, options[0]?.charges);
			}}
		>
			{spell.cost > 0 && options.length <= 1 ? `Cast (${spell.cost} charge${spell.cost === 1 ? '' : 's'})` : 'Cast'}
		</Button>
	);
	return (
		<>
			{short ? <Tooltip title={`Needs ${spell.cost} charge${spell.cost === 1 ? '' : 's'}; the item has ${chargesLeft} left`}><span>{button}</span></Tooltip> : button}
			<Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
				{options.map((o) => (
					<MenuItem key={o.charges} dense onClick={() => { setAnchor(null); onCast(spell, o.charges); }}>
						{o.charges} charge{o.charges === 1 ? '' : 's'}: cast at level {o.level}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
