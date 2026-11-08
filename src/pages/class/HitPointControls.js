import * as React from 'react';
import { Box, Button, Menu, MenuItem, TextField, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { getCalculatedHitPoints, getHitPoints } from '../../utils/characterCalc';
import { averageHitDie, parseHpOverride, rollAllHitDice, rollOneLevel } from '../../utils/hitPoints';

// Hit points for the class step: a text field holding the total (type to set it by hand), plus ways to get a
// calculated total: the average, roll every level, or roll one level at a time.
export default function HitPointControls({ character, cls, updateClass }) {
	const { level, hpMethod, hpRolls, hpOverride } = character.classInfo;
	const total = getHitPoints(character);
	const calculated = getCalculatedHitPoints(character);
	const overridden = parseHpOverride(hpOverride) !== null;
	const rolling = hpMethod === 'roll';
	const [draft, setDraft] = React.useState(String(total));
	const [editing, setEditing] = React.useState(false);
	const [menuAnchor, setMenuAnchor] = React.useState(null);

	// follow the calculated total while the field is not being typed in
	React.useEffect(() => { if (!editing) setDraft(String(total)); }, [total, editing]);

	const commit = () => {
		setEditing(false);
		const n = parseHpOverride(draft);
		if (n === null) { setDraft(String(total)); return; }
		updateClass({ hpOverride: n === calculated ? '' : n });
	};

	const average = () => updateClass({ hpMethod: 'average', hpRolls: [], hpOverride: '' });
	const rollAll = () => updateClass((ci) => ({ hpMethod: 'roll', hpRolls: rollAllHitDice(cls.hitDie, ci.level), hpOverride: '' }));
	const rollOne = (target) => {
		setMenuAnchor(null);
		updateClass((ci) => ({ hpMethod: 'roll', hpRolls: rollOneLevel(ci.hpRolls, cls.hitDie, ci.level, target), hpOverride: '' }));
	};

	const levelValue = (l) => (rolling && hpRolls && hpRolls[l - 2]) || null;
	const rollList = Array.from({ length: Math.max(0, level - 1) }, (_, i) => levelValue(i + 2) || `avg ${averageHitDie(cls.hitDie)}`).join(', ');

	let caption;
	if (overridden) caption = `Set by hand. The calculated total is ${calculated}; press Average or a roll button to use a calculated total again.`;
	else if (rolling) caption = `Level 1 is the maximum (${cls.hitDie}).${level > 1 ? ` Levels 2-${level}: ${rollList}.` : ''} Your Constitution modifier is added to each level.`;
	else caption = `Level 1 is the maximum (${cls.hitDie}); each later level adds the average (${averageHitDie(cls.hitDie)}). Your Constitution modifier is added to each level.`;

	return (
		<>
			<TextField
				label="Hit points"
				size="small"
				value={draft}
				onFocus={() => setEditing(true)}
				onChange={(e) => { if (/^\d{0,4}$/.test(e.target.value)) setDraft(e.target.value); }}
				onBlur={commit}
				onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
				sx={{ width: 120 }}
				slotProps={{ htmlInput: { inputMode: 'numeric', 'aria-label': 'Hit points' } }}
			/>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
				<Button size="small" variant={!rolling && !overridden ? 'contained' : 'outlined'} onClick={average}>Average</Button>
				<Button size="small" variant={rolling && !overridden ? 'contained' : 'outlined'} startIcon={<CasinoIcon />} onClick={rollAll} disabled={level < 2}>
					Roll all
				</Button>
				<Button size="small" variant="outlined" startIcon={<CasinoIcon />} onClick={(e) => setMenuAnchor(e.currentTarget)} disabled={level < 2}>
					Roll one level
				</Button>
				<Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)} slotProps={{ paper: { sx: { maxHeight: 360 } } }}>
					{Array.from({ length: Math.max(0, level - 1) }, (_, i) => i + 2).map((l) => (
						<MenuItem key={l} onClick={() => rollOne(l)}>
							Level {l}
							<Typography component="span" variant="caption" sx={{ marginLeft: 1.5, color: 'text.secondary' }}>
								{levelValue(l) ? `rolled ${levelValue(l)}` : `average ${averageHitDie(cls.hitDie)}`}
							</Typography>
						</MenuItem>
					))}
				</Menu>
			</Box>
			<Typography variant="caption" sx={{ flexBasis: '100%', color: 'text.secondary' }}>{caption}</Typography>
		</>
	);
}
