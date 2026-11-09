import * as React from 'react';
import { Box, Button, Menu, MenuItem, TextField, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { getCalculatedHitPoints, getClass, getHitPoints } from '../../utils/characterCalc';
import { averageHitDie, parseHpOverride, rollAllHitDice, rollOneLevel } from '../../utils/hitPoints';
import { getClassLevelOf, getClassViews } from '../../utils/multiclass';

// Every level whose hit points are not the fixed maximum, in order: the first class from its level 2, later classes from their
// level 1. rolls live in that class's hpRolls (the first class: classInfo.hpRolls, a later class: its entry in classInfo.multiclass.classes).
function getRollSlots(character) {
	const views = getClassViews(character);
	const slots = [];
	views.forEach((view, i) => {
		const cls = getClass(view);
		if (!cls) return;
		const first = i === 0 ? 2 : 1;
		for (let l = first; l <= getClassLevelOf(view); l += 1) {
			slots.push({
				index: i, slot: view.__slot ?? -1, rollIndex: l - first, die: cls.hitDie, rolls: view.classInfo.hpRolls,
				label: views.length > 1 ? `${cls.name} level ${l}` : `Level ${l}`,
			});
		}
	});
	return slots;
}

// How many rolls each class keeps: { [slot]: count } (slot -1 is the first class)
const rollCounts = (slots) => slots.reduce((acc, s) => ({ ...acc, [s.slot]: (acc[s.slot] || 0) + 1 }), {});

// A new classInfo patch that replaces the rolls of every class: make(slot, die, count, currentRolls) -> rolls
function replaceRolls(ci, slots, make) {
	const counts = rollCounts(slots);
	const dieOf = (slot) => slots.find((s) => s.slot === slot)?.die;
	const patch = { hpRolls: make(-1, dieOf(-1), counts[-1] || 0, ci.hpRolls) };
	if (ci.multiclass?.classes) {
		patch.multiclass = {
			...ci.multiclass,
			classes: ci.multiclass.classes.map((c, k) => (dieOf(k) ? { ...c, hpRolls: make(k, dieOf(k), counts[k] || 0, c.hpRolls) } : c)),
		};
	}
	return patch;
}

// Hit points for the class step: a text field holding the total (type to set it by hand), plus ways to get a
// calculated total: the average, roll every level, or roll one level at a time.
export default function HitPointControls({ character, cls, updateClass }) {
	const { hpMethod, hpOverride } = character.classInfo;
	const total = getHitPoints(character);
	const calculated = getCalculatedHitPoints(character);
	const overridden = parseHpOverride(hpOverride) !== null;
	const rolling = hpMethod === 'roll';
	const slots = getRollSlots(character);
	const multi = getClassViews(character).length > 1;
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

	const average = () => updateClass((ci) => ({ hpMethod: 'average', hpOverride: '', ...replaceRolls(ci, slots, () => []) }));
	const rollAll = () => updateClass((ci) => ({ hpMethod: 'roll', hpOverride: '', ...replaceRolls(ci, slots, (_slot, die, count) => rollAllHitDice(die, count + 1)) }));
	const rollOne = (target) => {
		setMenuAnchor(null);
		updateClass((ci) => ({
			hpMethod: 'roll', hpOverride: '',
			...replaceRolls(ci, slots, (slot, die, count, rolls) => (slot === target.slot ? rollOneLevel(rolls, die, count + 1, target.rollIndex + 2) : fillKept(rolls, count))),
		}));
	};
	// keep a class's existing rolls as they are (padded with "average" markers)
	const fillKept = (rolls, count) => Array.from({ length: count }, (_, i) => (Array.isArray(rolls) && rolls[i]) || null);

	const levelValue = (s) => (rolling && s.rolls && s.rolls[s.rollIndex]) || null;
	const rollText = (s) => levelValue(s) || `avg ${averageHitDie(s.die)}`;
	const rollList = slots.map(rollText).join(', ');

	let caption;
	if (overridden) caption = `Set by hand. The calculated total is ${calculated}; press Average or a roll button to use a calculated total again.`;
	else if (multi) {
		caption = `Your first level is the maximum of your first class's hit die (${cls.hitDie}). Every other level, in any class, adds the average (or a roll) of that class's die`
			+ `${rolling ? `: ${slots.map((s) => `${s.label} ${rollText(s)}`).join(', ')}` : ''}. Your Constitution modifier is added to each level.`;
	} else if (rolling) caption = `Level 1 is the maximum (${cls.hitDie}).${slots.length ? ` Levels 2-${slots.length + 1}: ${rollList}.` : ''} Your Constitution modifier is added to each level.`;
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
				<Button size="small" variant={rolling && !overridden ? 'contained' : 'outlined'} startIcon={<CasinoIcon />} onClick={rollAll} disabled={!slots.length}>
					Roll all
				</Button>
				<Button size="small" variant="outlined" startIcon={<CasinoIcon />} onClick={(e) => setMenuAnchor(e.currentTarget)} disabled={!slots.length}>
					Roll one level
				</Button>
				<Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)} slotProps={{ paper: { sx: { maxHeight: 360 } } }}>
					{slots.map((s) => (
						<MenuItem key={`${s.slot}:${s.rollIndex}`} onClick={() => rollOne(s)}>
							{s.label}
							<Typography component="span" variant="caption" sx={{ marginLeft: 1.5, color: 'text.secondary' }}>
								{levelValue(s) ? `rolled ${levelValue(s)}` : `average ${averageHitDie(s.die)}`}
							</Typography>
						</MenuItem>
					))}
				</Menu>
			</Box>
			<Typography variant="caption" sx={{ flexBasis: '100%', color: 'text.secondary' }}>{caption}</Typography>
		</>
	);
}
