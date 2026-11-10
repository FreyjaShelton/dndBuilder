import * as React from 'react';
import {
	Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
	FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { getItemIndex } from '../../utils/itemIndex';
import spellIndex from '../../data/2014/spellIndex';
import {
	carryCustomItem, checkCustomName, deleteCustomItem, formatItemStats, getAttunedNames, getCustomGear, getSelected, getWearDefaults, newCustomItem,
	refreshCustomCopy,
} from '../../utils/equipment';
import customItemLibrary from '../../utils/customItemLibrary';

const LIBRARY_GROUP = 'Your custom items';

const BORDER = '1px solid rgba(255, 255, 255, 0.08)';
const WEAPON_PROPERTIES = ['Ammunition', 'Finesse', 'Heavy', 'Light', 'Loading', 'Reach', 'Special', 'Thrown', 'Two-Handed', 'Versatile'];
const DAMAGE_TYPES = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
const ARMOR_TYPES = ['Light', 'Medium', 'Heavy', 'Shield'];
const ITEM_TYPES = ['Wondrous item', 'Weapon', 'Armor', 'Ring', 'Rod', 'Staff', 'Wand', 'Potion', 'Scroll', 'Adventuring gear'];
const RARITIES = ['Common', 'Uncommon', 'Rare', 'Very rare', 'Legendary', 'Artifact'];
const ACTIVATIONS = ['Action', 'Bonus action', 'Reaction', 'Free', 'Short rest', 'Passive'];
const RECHARGE_WHEN = ['Long rest', 'Short rest', 'Dawn'];
const ABILITY_KEYS = [['str', 'Strength'], ['dex', 'Dexterity'], ['con', 'Constitution'], ['int', 'Intelligence'], ['wis', 'Wisdom'], ['cha', 'Charisma']];
// the 2014 spells a custom item can grant: their names, and the level each one is
const SPELL_LEVEL = new Map(spellIndex.map((s) => [s.name, s.level]));
const SPELL_NAMES = spellIndex.map((s) => s.name).sort((a, b) => a.localeCompare(b));
const splitTypes = (text) => String(text || '').split(/\s*(?:\/|,|\bor\b)\s*/i).map((t) => t.trim()).filter(Boolean);
const num = (v) => (v === '' || v === undefined || v === null ? 0 : Number(v) || 0);

// How an item's charges come back: not at all, all of them, a fixed number, or a dice roll (stored as '', 'all', '2' or '1d4').
const DICE = /^\d*d\d+(\s*[+-]\s*\d+)?$/i;
const regainModeOf = (recharge) => {
	const s = String(recharge || '').trim().toLowerCase();
	return !s ? 'none' : s === 'all' ? 'all' : /^\d+$/.test(s) ? 'number' : 'dice';
};
const regainText = (charges) => {
	const mode = charges?.regainMode ?? regainModeOf(charges?.recharge);
	const raw = String(charges?.recharge || '').trim();
	return mode === 'none' ? '' : mode === 'all' ? 'all' : mode === 'number' ? String(Math.max(1, Math.floor(num(raw)) || 1)) : raw;
};

// Keeps only the fields that make sense for the item's category, with the right types.
function cleanItem(draft) {
	const perProficiency = !!draft.charges?.perProficiency;
	const maxCharges = Math.max(0, Math.floor(num(draft.charges?.max)));
	const abilities = (draft.abilities || []).filter((a) => String(a.name || '').trim()).map((a) => ({
		name: a.name.trim(), activation: a.activation || '', cost: Math.max(0, Math.floor(num(a.cost))), dice: String(a.dice || '').trim(), diceLabel: String(a.diceLabel || '').trim(),
		save: a.save || '', dc: a.dc === '' || a.dc === undefined || a.dc === null ? '' : Math.max(0, Math.floor(num(a.dc))), description: a.description || '',
		...(String(a.resource || '').trim() ? { resource: a.resource.trim() } : {}),
		...(a.uses && (a.uses.perProficiency || num(a.uses.max) > 0) ? { uses: { max: a.uses.perProficiency ? null : Math.floor(num(a.uses.max)), perProficiency: !!a.uses.perProficiency, on: a.uses.on || 'Long rest' } } : {}),
	}));
	const seenSpells = new Set();
	const spells = (draft.spells || []).filter((s) => SPELL_LEVEL.has(s.name) && !seenSpells.has(s.name) && seenSpells.add(s.name)).map((s) => ({
		name: s.name,
		...(Number(s.level) > SPELL_LEVEL.get(s.name) ? { level: Math.min(9, Math.floor(Number(s.level))) } : {}),
		...(s.ability ? { ability: s.ability } : {}),
		...(s.uses && (s.uses.perProficiency || num(s.uses.max) > 0) ? { uses: { max: s.uses.perProficiency ? null : Math.floor(num(s.uses.max)), perProficiency: !!s.uses.perProficiency, on: s.uses.on || 'Long rest' } } : {}),
	}));
	const bonuses = Object.fromEntries(['ac', 'spellSaveDc', 'spellAttack', 'saves'].map((k) => [k, num(draft.bonuses?.[k])]).filter(([, v]) => v));
	const out = {
		name: draft.name.trim(), group: draft.group, cost: String(draft.cost || '').trim(), weight: Math.max(0, Number(draft.weight) || 0),
		homebrew: true, ...(draft.base ? { base: draft.base } : {}), ...(draft.description ? { description: draft.description } : {}),
		...(draft.itemType ? { itemType: draft.itemType } : {}), ...(draft.rarity ? { rarity: draft.rarity } : {}), ...(draft.attunement ? { attunement: true } : {}),
		...(perProficiency || maxCharges > 0 ? { charges: { max: perProficiency ? null : maxCharges, perProficiency, recharge: regainText(draft.charges), on: draft.charges?.on || 'Long rest' } } : {}),
		...(abilities.length ? { abilities } : {}),
		...(spells.length ? { spells } : {}),
		...(Object.keys(bonuses).length ? { bonuses } : {}),
	};
	if (draft.group === 'Weapons') {
		const properties = (draft.properties || []).filter(Boolean);
		return {
			...out, category: draft.category || 'Simple', kind: draft.kind || 'Melee', damage: String(draft.damage || '').trim(), damageType: draft.damageType || '', properties,
			...(properties.includes('Versatile') && draft.versatileDamage ? { versatileDamage: String(draft.versatileDamage).trim() } : {}),
			...(draft.range ? { range: String(draft.range).trim() } : {}),
			...(draft.ability ? { ability: draft.ability } : {}),
			...(num(draft.attackBonus) ? { attackBonus: num(draft.attackBonus) } : {}), ...(num(draft.damageBonus) ? { damageBonus: num(draft.damageBonus) } : {}),
			...(draft.spellAttack ? { spellAttack: true } : {}), ...(draft.alwaysProficient ? { alwaysProficient: true } : {}),
		};
	}
	if (draft.group === 'Armor') {
		const type = draft.type || 'Light';
		const cap = draft.dexCap === null || draft.dexCap === '' || draft.dexCap === undefined ? null : Math.max(0, Number(draft.dexCap) || 0);
		return {
			...out, type, ac: Math.max(0, Number(draft.ac) || 0), dexCap: type === 'Shield' ? null : cap, strengthRequirement: Math.max(0, Number(draft.strengthRequirement) || 0),
			stealthDisadvantage: !!draft.stealthDisadvantage,
		};
	}
	return out;
}

// How often something can be used between rests: no limit, a number equal to the proficiency bonus, or a number of your own, and
// when the uses come back. `uses` is { max, perProficiency, on } or undefined (no limit); onChange gets the new one.
function UsesFields({ uses, onChange }) {
	const mode = !uses ? 'none' : uses.perProficiency ? 'proficiency' : 'custom';
	const setMode = (next) => {
		if (next === 'none') { onChange(undefined); return; }
		const on = uses?.on || 'Long rest';
		onChange(next === 'proficiency' ? { max: null, perProficiency: true, on } : { max: Number(uses?.max) > 0 ? uses.max : 1, perProficiency: false, on });
	};
	return (
		<>
			<FormControl size="small" sx={{ flex: '1 1 150px' }}>
				<InputLabel>Limited uses</InputLabel>
				<Select label="Limited uses" value={mode} onChange={(e) => setMode(e.target.value)}>
					<MenuItem value="none">No limit</MenuItem>
					<MenuItem value="proficiency">Proficiency bonus</MenuItem>
					<MenuItem value="custom">Custom</MenuItem>
				</Select>
			</FormControl>
			{mode === 'custom' && (
				<TextField label="Number of uses" size="small" type="number" value={uses.max ?? ''} onChange={(e) => onChange({ ...uses, max: e.target.value })} slotProps={{ htmlInput: { min: 1 } }} sx={{ flex: '0 1 120px' }} />
			)}
			{mode !== 'none' && (
				<FormControl size="small" sx={{ flex: '1 1 120px' }}>
					<InputLabel>Uses reset after</InputLabel>
					<Select label="Uses reset after" value={uses.on || 'Long rest'} onChange={(e) => onChange({ ...uses, on: e.target.value })}>
						{RECHARGE_WHEN.map((w) => <MenuItem key={w} value={w}>{w}</MenuItem>)}
					</Select>
				</FormControl>
			)}
		</>
	);
}

function ItemEditor({ character, groups, catalog, libraryItems, original, onClose, onSave }) {
	const libraryNames = libraryItems.map((i) => i.name);
	const editing = !!original;
	const [draft, setDraft] = React.useState(() => (original
		? {
			...original, properties: [...(original.properties || [])], abilities: (original.abilities || []).map((a) => ({ ...a, uses: a.uses ? { ...a.uses } : undefined })),
			spells: (original.spells || []).map((s) => ({ ...s, uses: s.uses ? { ...s.uses } : undefined })),
			charges: original.charges ? { ...original.charges } : undefined, bonuses: original.bonuses ? { ...original.bonuses } : undefined,
		}
		: newCustomItem(character, '', libraryNames)));
	const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
	const setBonus = (patch) => setDraft((d) => ({ ...d, bonuses: { ...(d.bonuses || {}), ...patch } }));
	// an ability's (or a spell's) limited uses: undefined removes the limit
	const withUses = (obj, uses) => { const next = { ...obj }; delete next.uses; return uses ? { ...next, uses } : next; };
	const setAbilityUses = (i, uses) => setDraft((d) => ({ ...d, abilities: (d.abilities || []).map((a, k) => (k === i ? withUses(a, uses) : a)) }));
	const setSpell = (i, patch) => setDraft((d) => ({ ...d, spells: (d.spells || []).map((s, k) => (k === i ? { ...s, ...patch } : s)) }));
	const setSpellUses = (i, uses) => setDraft((d) => ({ ...d, spells: (d.spells || []).map((s, k) => (k === i ? withUses(s, uses) : s)) }));
	const addSpell = () => setDraft((d) => ({ ...d, spells: [...(d.spells || []), { name: '', level: '', ability: '', uses: { max: null, perProficiency: true, on: 'Long rest' } }] }));
	const removeSpell = (i) => setDraft((d) => ({ ...d, spells: (d.spells || []).filter((_, k) => k !== i) }));
	const setCharges = (patch) => setDraft((d) => ({ ...d, charges: { max: 0, perProficiency: false, recharge: '', on: 'Long rest', ...(d.charges || {}), ...patch } }));
	// how the item's charges are counted: none, a number equal to the proficiency bonus, or a number of your own
	const chargesMode = !draft.charges ? 'none' : draft.charges.perProficiency ? 'proficiency' : 'custom';
	const regainMode = draft.charges?.regainMode ?? regainModeOf(draft.charges?.recharge);
	const setRegainMode = (mode) => setDraft((d) => {
		const was = d.charges?.regainMode ?? regainModeOf(d.charges?.recharge);
		const keep = was === mode ? String(d.charges?.recharge || '') : '';
		const recharge = mode === 'none' ? '' : mode === 'all' ? 'all' : keep || (mode === 'number' ? '1' : '1d4');
		return { ...d, charges: { ...d.charges, regainMode: mode, recharge } };
	});
	const regainError = chargesMode !== 'none' && regainMode === 'dice' && !DICE.test(String(draft.charges?.recharge || '').trim()) ? 'Use dice like 1d4 or 2d6+1' : '';
	const setChargesMode = (mode) => setDraft((d) => {
		const { charges, ...rest } = d;
		if (mode === 'none') return rest;
		return { ...rest, charges: { recharge: '', on: 'Long rest', ...(charges || {}), perProficiency: mode === 'proficiency', max: mode === 'proficiency' ? null : Number(charges?.max) > 0 ? charges.max : 1 } };
	});
	const setAbility = (i, patch) => setDraft((d) => ({ ...d, abilities: (d.abilities || []).map((a, k) => (k === i ? { ...a, ...patch } : a)) }));
	const addAbility = () => setDraft((d) => ({ ...d, abilities: [...(d.abilities || []), { name: '', activation: 'Action', cost: 0, dice: '', diceLabel: '', save: '', dc: '', description: '', resource: '' }] }));
	const removeAbility = (i) => setDraft((d) => ({ ...d, abilities: (d.abilities || []).filter((_, k) => k !== i) }));
	// names are unique across everything you have made, not just this character
	const nameError = checkCustomName(character, draft.name, original?.name || '', libraryNames.filter((n) => n !== original?.name));
	const [picked, setPicked] = React.useState(null);
	const baseItem = picked;

	// choosing a different starting item refills everything from it (one of your own custom items is copied whole, as a new item)
	const pickBase = (item) => {
		setPicked(item);
		const own = item && item.group === LIBRARY_GROUP ? libraryItems.find((i) => i.libId === item.libId) : null;
		if (!own) { setDraft(newCustomItem(character, item ? item.name : '', libraryNames)); return; }
		let name = `${own.name} (copy)`;
		for (let n = 2; checkCustomName(character, name, '', libraryNames); n += 1) name = `${own.name} (copy ${n})`;
		const copy = JSON.parse(JSON.stringify(own));
		delete copy.libId;
		delete copy.updatedAt;
		setDraft({ ...copy, name, homebrew: true });
	};

	const weapon = draft.group === 'Weapons';
	const armor = draft.group === 'Armor';
	const shield = armor && draft.type === 'Shield';

	return (
		<Dialog open onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle>{editing ? `Edit ${original.name}` : 'Create a custom item'}</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '8px !important' }}>
				{!editing ? (
					<Autocomplete
						size="small"
						options={[...libraryItems.map((i) => ({ ...i, group: LIBRARY_GROUP })), ...catalog]}
						value={baseItem}
						groupBy={(o) => o.group}
						getOptionLabel={(o) => o.name}
						isOptionEqualToValue={(a, b) => a.name === b.name}
						onChange={(_, o) => pickBase(o)}
						renderInput={(params) => <TextField {...params} label="Start from an existing item (optional)" helperText="Everything below is copied from it and can be changed." />}
					/>
				) : null}

				<TextField label="Name" size="small" value={draft.name} onChange={(e) => set({ name: e.target.value })} error={!!nameError} helperText={nameError || ' '} autoFocus />

				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
					<FormControl size="small" sx={{ flex: '1 1 180px' }}>
						<InputLabel>Category</InputLabel>
						<Select label="Category" value={draft.group} onChange={(e) => set({ group: e.target.value })}>
							{groups.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
						</Select>
					</FormControl>
					<TextField label="Cost" size="small" value={draft.cost || ''} onChange={(e) => set({ cost: e.target.value })} placeholder="15 gp" sx={{ flex: '1 1 100px' }} />
					<TextField
						label="Weight (lb.)" size="small" type="number" value={draft.weight ?? ''} onChange={(e) => set({ weight: e.target.value })}
						slotProps={{ htmlInput: { min: 0, step: 0.25 } }} sx={{ flex: '1 1 100px' }}
					/>
				</Box>

				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
					<Autocomplete
						freeSolo size="small" options={ITEM_TYPES} value={draft.itemType || ''} sx={{ flex: '1 1 180px' }}
						onInputChange={(_, v) => set({ itemType: v })}
						renderInput={(params) => <TextField {...params} label="Item type (optional)" placeholder="Wondrous item" />}
					/>
					<FormControl size="small" sx={{ flex: '1 1 140px' }}>
						<InputLabel>Rarity</InputLabel>
						<Select label="Rarity" value={draft.rarity || ''} onChange={(e) => set({ rarity: e.target.value })}>
							<MenuItem value=""><em>None</em></MenuItem>
							{RARITIES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
						</Select>
					</FormControl>
					<FormControlLabel control={<Checkbox checked={!!draft.attunement} onChange={(e) => set({ attunement: e.target.checked })} />} label="Requires attunement" />
				</Box>

				{weapon && (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, border: BORDER, borderRadius: 2 }}>
						<Typography variant="subtitle2">Weapon</Typography>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<FormControl size="small" sx={{ flex: '1 1 130px' }}>
								<InputLabel>Training</InputLabel>
								<Select label="Training" value={draft.category || 'Simple'} onChange={(e) => set({ category: e.target.value })}>
									<MenuItem value="Simple">Simple</MenuItem>
									<MenuItem value="Martial">Martial</MenuItem>
								</Select>
							</FormControl>
							<FormControl size="small" sx={{ flex: '1 1 130px' }}>
								<InputLabel>Melee or ranged</InputLabel>
								<Select label="Melee or ranged" value={draft.kind || 'Melee'} onChange={(e) => set({ kind: e.target.value })}>
									<MenuItem value="Melee">Melee</MenuItem>
									<MenuItem value="Ranged">Ranged</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<TextField label="Damage" size="small" value={draft.damage || ''} onChange={(e) => set({ damage: e.target.value })} placeholder="1d8" sx={{ flex: '1 1 100px' }} />
							<Autocomplete
								multiple freeSolo size="small" options={DAMAGE_TYPES} value={splitTypes(draft.damageType)} sx={{ flex: '2 1 220px' }}
								onChange={(_, v) => set({ damageType: v.join(' / ') })}
								renderInput={(params) => <TextField {...params} label="Damage type(s)" placeholder="Add another to let the wielder choose" />}
							/>
						</Box>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
							<FormControl size="small" sx={{ flex: '1 1 220px' }}>
								<InputLabel>Attack and damage ability</InputLabel>
								<Select label="Attack and damage ability" value={draft.ability || ''} onChange={(e) => set({ ability: e.target.value })}>
									<MenuItem value=""><em>Automatic (Strength, or Dexterity for finesse and ranged)</em></MenuItem>
									{ABILITY_KEYS.map(([k, n]) => <MenuItem key={k} value={k}>{n}</MenuItem>)}
								</Select>
							</FormControl>
							<TextField label="Magic bonus to hit" size="small" type="number" value={draft.attackBonus ?? ''} onChange={(e) => set({ attackBonus: e.target.value })} sx={{ flex: '1 1 110px' }} />
							<TextField label="Magic bonus to damage" size="small" type="number" value={draft.damageBonus ?? ''} onChange={(e) => set({ damageBonus: e.target.value })} sx={{ flex: '1 1 110px' }} />
						</Box>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<FormControlLabel control={<Checkbox checked={!!draft.spellAttack} onChange={(e) => set({ spellAttack: e.target.checked })} />} label="Counts as a spell attack" />
							<FormControlLabel control={<Checkbox checked={!!draft.alwaysProficient} onChange={(e) => set({ alwaysProficient: e.target.checked })} />} label="Always proficient with it" />
						</Box>
						<Autocomplete
							multiple freeSolo size="small" options={WEAPON_PROPERTIES} value={draft.properties || []}
							onChange={(_, v) => set({ properties: v })}
							renderInput={(params) => <TextField {...params} label="Properties" placeholder="Add a property" />}
						/>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							{(draft.properties || []).includes('Versatile') && (
								<TextField label="Versatile damage (two hands)" size="small" value={draft.versatileDamage || ''} onChange={(e) => set({ versatileDamage: e.target.value })} placeholder="1d10" sx={{ flex: '1 1 160px' }} />
							)}
							<TextField label="Range (normal/long)" size="small" value={draft.range || ''} onChange={(e) => set({ range: e.target.value })} placeholder="20/60" sx={{ flex: '1 1 140px' }} />
						</Box>
					</Box>
				)}

				{armor && (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, border: BORDER, borderRadius: 2 }}>
						<Typography variant="subtitle2">{shield ? 'Shield' : 'Armor'}</Typography>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
							<FormControl size="small" sx={{ flex: '1 1 130px' }}>
								<InputLabel>Type</InputLabel>
								<Select label="Type" value={draft.type || 'Light'} onChange={(e) => set({ type: e.target.value })}>
									{ARMOR_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
								</Select>
							</FormControl>
							<TextField
								label={shield ? 'Armor Class bonus' : 'Base Armor Class'} size="small" type="number" value={draft.ac ?? ''} onChange={(e) => set({ ac: e.target.value })}
								slotProps={{ htmlInput: { min: 0 } }} sx={{ flex: '1 1 130px' }}
							/>
						</Box>
						{!shield && (
							<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
								<TextField
									label="Max Dexterity bonus" size="small" type="number" value={draft.dexCap ?? ''} onChange={(e) => set({ dexCap: e.target.value === '' ? null : e.target.value })}
									helperText="Leave empty for no limit, 0 for none" slotProps={{ htmlInput: { min: 0 } }} sx={{ flex: '1 1 160px' }}
								/>
								<TextField
									label="Strength needed" size="small" type="number" value={draft.strengthRequirement ?? 0} onChange={(e) => set({ strengthRequirement: e.target.value })}
									slotProps={{ htmlInput: { min: 0 } }} sx={{ flex: '1 1 130px' }}
								/>
								<FormControlLabel control={<Checkbox checked={!!draft.stealthDisadvantage} onChange={(e) => set({ stealthDisadvantage: e.target.checked })} />} label="Stealth disadvantage" />
							</Box>
						)}
					</Box>
				)}

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, border: BORDER, borderRadius: 2 }}>
					<Typography variant="subtitle2">Bonuses it gives (optional)</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary', marginTop: -1 }}>
						Added to your numbers while you carry it{draft.attunement ? ' and are attuned to it' : ''}.
					</Typography>
					<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
						<TextField label="Armor Class" size="small" type="number" value={draft.bonuses?.ac ?? ''} onChange={(e) => setBonus({ ac: e.target.value })} sx={{ flex: '1 1 100px' }} />
						<TextField label="Spell save DC" size="small" type="number" value={draft.bonuses?.spellSaveDc ?? ''} onChange={(e) => setBonus({ spellSaveDc: e.target.value })} sx={{ flex: '1 1 100px' }} />
						<TextField label="Spell attack rolls" size="small" type="number" value={draft.bonuses?.spellAttack ?? ''} onChange={(e) => setBonus({ spellAttack: e.target.value })} sx={{ flex: '1 1 100px' }} />
						<TextField label="Saving throws" size="small" type="number" value={draft.bonuses?.saves ?? ''} onChange={(e) => setBonus({ saves: e.target.value })} sx={{ flex: '1 1 100px' }} />
					</Box>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, border: BORDER, borderRadius: 2 }}>
					<Typography variant="subtitle2">Charges (optional)</Typography>
					<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
						<FormControl size="small" sx={{ flex: '1 1 160px' }}>
							<InputLabel>Maximum charges</InputLabel>
							<Select label="Maximum charges" value={chargesMode} onChange={(e) => setChargesMode(e.target.value)}>
								<MenuItem value="none">No charges</MenuItem>
								<MenuItem value="proficiency">Proficiency bonus</MenuItem>
								<MenuItem value="custom">Custom</MenuItem>
							</Select>
						</FormControl>
						{chargesMode === 'custom' && (
							<TextField label="Number of charges" size="small" type="number" value={draft.charges?.max ?? ''} onChange={(e) => setCharges({ max: e.target.value })} slotProps={{ htmlInput: { min: 1 } }} sx={{ flex: '0 1 130px' }} />
						)}
						{chargesMode !== 'none' && (
							<>
								<FormControl size="small" sx={{ flex: '1 1 150px' }}>
									<InputLabel>Regains</InputLabel>
									<Select label="Regains" value={regainMode} onChange={(e) => setRegainMode(e.target.value)}>
										<MenuItem value="none">Doesn't regain</MenuItem>
										<MenuItem value="all">All charges</MenuItem>
										<MenuItem value="number">Fixed number</MenuItem>
										<MenuItem value="dice">Dice roll</MenuItem>
									</Select>
								</FormControl>
								{regainMode === 'number' && (
									<TextField label="Charges regained" size="small" type="number" value={draft.charges?.recharge ?? ''} onChange={(e) => setCharges({ recharge: e.target.value })} slotProps={{ htmlInput: { min: 1 } }} sx={{ flex: '0 1 130px' }} />
								)}
								{regainMode === 'dice' && (
									<TextField label="Dice regained" size="small" value={draft.charges?.recharge ?? ''} onChange={(e) => setCharges({ recharge: e.target.value })} placeholder="1d4" error={!!regainError} helperText={regainError || ' '} sx={{ flex: '0 1 150px' }} />
								)}
								{regainMode !== 'none' && (
									<FormControl size="small" sx={{ flex: '1 1 130px' }}>
										<InputLabel>When</InputLabel>
										<Select label="When" value={draft.charges?.on || 'Long rest'} onChange={(e) => setCharges({ on: e.target.value })}>
											{RECHARGE_WHEN.map((w) => <MenuItem key={w} value={w}>{w}</MenuItem>)}
										</Select>
									</FormControl>
								)}
							</>
						)}
					</Box>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, border: BORDER, borderRadius: 2 }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="subtitle2" sx={{ flex: 1 }}>Abilities (optional)</Typography>
						<Button size="small" startIcon={<AddIcon />} onClick={addAbility}>Add an ability</Button>
					</Box>
					<Typography variant="caption" sx={{ color: 'text.secondary', marginTop: -1 }}>
						Things the item lets you do. On the interactive sheet each one has a Use button that spends its charges and rolls its dice.
					</Typography>
					{(draft.abilities || []).map((a, i) => (
						<Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, padding: 1.5, border: BORDER, borderRadius: 2 }}>
							<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
								<TextField label="Name" size="small" value={a.name} onChange={(e) => setAbility(i, { name: e.target.value })} sx={{ flex: '2 1 180px' }} />
								<FormControl size="small" sx={{ flex: '1 1 120px' }}>
									<InputLabel>Uses</InputLabel>
									<Select label="Uses" value={a.activation || ''} onChange={(e) => setAbility(i, { activation: e.target.value })}>
										<MenuItem value=""><em>Not set</em></MenuItem>
										{ACTIVATIONS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
									</Select>
								</FormControl>
								<TextField label="Charges" size="small" type="number" value={a.cost ?? 0} onChange={(e) => setAbility(i, { cost: e.target.value })} slotProps={{ htmlInput: { min: 0 } }} sx={{ flex: '0 1 90px' }} />
								<Tooltip title="Remove this ability"><IconButton size="small" aria-label="Remove this ability" onClick={() => removeAbility(i)}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
							</Box>
								<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
									<TextField label="Other cost (not tracked)" size="small" value={a.resource || ''} onChange={(e) => setAbility(i, { resource: e.target.value })} placeholder="6 sorcery points" sx={{ flex: '1 1 150px' }} />
									<UsesFields uses={a.uses} onChange={(uses) => setAbilityUses(i, uses)} />
								</Box>
							<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
								<TextField label="Dice rolled (optional)" size="small" value={a.dice || ''} onChange={(e) => setAbility(i, { dice: e.target.value })} placeholder="3d12" sx={{ flex: '1 1 120px' }} />
								<TextField label="What the dice are" size="small" value={a.diceLabel || ''} onChange={(e) => setAbility(i, { diceLabel: e.target.value })} placeholder="lightning damage" sx={{ flex: '2 1 160px' }} />
								<FormControl size="small" sx={{ flex: '1 1 120px' }}>
									<InputLabel>Saving throw</InputLabel>
									<Select label="Saving throw" value={a.save || ''} onChange={(e) => setAbility(i, { save: e.target.value })}>
										<MenuItem value=""><em>None</em></MenuItem>
										{ABILITY_KEYS.map(([k, n]) => <MenuItem key={k} value={k}>{n}</MenuItem>)}
									</Select>
								</FormControl>
								<TextField label="DC" size="small" type="number" value={a.dc ?? ''} onChange={(e) => setAbility(i, { dc: e.target.value })} helperText="Empty: your spell save DC" slotProps={{ htmlInput: { min: 0 } }} sx={{ flex: '0 1 110px' }} />
							</Box>
							<TextField label="What it does" size="small" multiline minRows={2} maxRows={6} value={a.description || ''} onChange={(e) => setAbility(i, { description: e.target.value })} />
						</Box>
					))}
				</Box>

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, border: BORDER, borderRadius: 2 }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Typography variant="subtitle2" sx={{ flex: 1 }}>Spells (optional)</Typography>
							<Button size="small" startIcon={<AddIcon />} onClick={addSpell}>Add a spell</Button>
						</Box>
						<Typography variant="caption" sx={{ color: 'text.secondary', marginTop: -1 }}>
							Spells the item lets whoever carries it cast, whatever their class. They appear on the interactive sheet's Spells tab, and casting one uses up one of its own uses, never a spell slot.
						</Typography>
						{(draft.spells || []).map((s, i) => (
							<Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, padding: 1.5, border: BORDER, borderRadius: 2 }}>
								<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
									<Autocomplete
										size="small" options={SPELL_NAMES} value={s.name || null} sx={{ flex: '2 1 200px' }}
										onChange={(_, v) => setSpell(i, { name: v || '', level: '' })}
										renderOption={(props, name) => { const { key, ...rest } = props; return <li key={key} {...rest}>{name}<Typography component="span" variant="caption" sx={{ marginLeft: 1, color: 'text.secondary' }}>{SPELL_LEVEL.get(name) === 0 ? 'cantrip' : `level ${SPELL_LEVEL.get(name)}`}</Typography></li>; }}
										renderInput={(params) => <TextField {...params} label="Spell" />}
									/>
									{SPELL_LEVEL.has(s.name) && SPELL_LEVEL.get(s.name) < 9 && SPELL_LEVEL.get(s.name) > 0 && (
										<FormControl size="small" sx={{ flex: '1 1 130px' }}>
											<InputLabel>Cast at level</InputLabel>
											<Select label="Cast at level" value={Number(s.level) > SPELL_LEVEL.get(s.name) ? s.level : ''} onChange={(e) => setSpell(i, { level: e.target.value })}>
												<MenuItem value=""><em>Its own level ({SPELL_LEVEL.get(s.name)})</em></MenuItem>
												{Array.from({ length: 9 - SPELL_LEVEL.get(s.name) }, (_, k) => SPELL_LEVEL.get(s.name) + 1 + k).map((l) => <MenuItem key={l} value={l}>Level {l}</MenuItem>)}
											</Select>
										</FormControl>
									)}
									<Tooltip title="Remove this spell"><IconButton size="small" aria-label="Remove this spell" onClick={() => removeSpell(i)}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
								</Box>
								<Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
									<UsesFields uses={s.uses} onChange={(uses) => setSpellUses(i, uses)} />
									<FormControl size="small" sx={{ flex: '1 1 170px' }}>
										<InputLabel>Casting ability</InputLabel>
										<Select label="Casting ability" value={s.ability || ''} onChange={(e) => setSpell(i, { ability: e.target.value })}>
											<MenuItem value=""><em>Your spellcasting ability</em></MenuItem>
											{ABILITY_KEYS.map(([k, n]) => <MenuItem key={k} value={k}>{n}</MenuItem>)}
										</Select>
									</FormControl>
								</Box>
							</Box>
						))}
					</Box>

				<TextField label="Description" size="small" multiline minRows={2} maxRows={8} value={draft.description || ''} onChange={(e) => set({ description: e.target.value })} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" disabled={!!nameError || !!regainError} onClick={() => onSave(cleanItem(draft), original?.name)}>{editing ? 'Save' : 'Create'}</Button>
			</DialogActions>
		</Dialog>
	);
}

// The Equipment step's custom items: items made up by the player, usually starting from a catalog item and changed from there
// (2014). They work like any other item: they cost gold, weigh something, and armor and weapons count for Armor Class and attacks.
export default function CustomItems({ character, updateEquipment }) {
	const [editor, setEditor] = React.useState(null); // null | { original?: item }
	const { groups, all } = React.useMemo(() => getItemIndex(character.edition), [character.edition]);
	// the items you have made: shared by every character on this device (see utils/customItemLibrary.js)
	React.useSyncExternalStore(customItemLibrary.subscribe, customItemLibrary.getVersion);
	const items = customItemLibrary.list();
	const gear = getCustomGear(character); // this character's copies
	const attunedNames = getAttunedNames(character);
	const selected = getSelected(character);
	const copyOf = (item) => gear.find((g) => g.libId === item.libId) || gear.find((g) => g.name === item.name);

	// an equipment change that keeps the worn armor and carried shield consistent with what is now owned
	const apply = (makePatch) => updateEquipment((eq) => {
		const patch = makePatch(eq);
		return { ...patch, ...getWearDefaults({ ...character, equipment: eq }, { ...character, equipment: { ...eq, ...patch } }) };
	});

	// A new item goes into the library and into this character's inventory; an edit changes the library's item, and this
	// character's copy of it (other characters pick up the change when they are opened).
	const save = (cleaned, original) => {
		const stored = customItemLibrary.save({ ...cleaned, ...(original ? { libId: original.libId } : {}) });
		apply((eq) => (original ? refreshCustomCopy(eq, stored) : carryCustomItem(eq, stored)));
		setEditor(null);
	};
	const toggle = (item) => {
		const copy = copyOf(item);
		const have = copy && selected.some((s) => s.name === copy.name);
		if (have) apply((eq) => ({ selected: (eq.selected || []).filter((s) => s.name !== copy.name) }));
		else apply((eq) => carryCustomItem(eq, item));
	};
	const remove = (item) => {
		customItemLibrary.remove(item.libId);
		const copy = copyOf(item);
		if (copy) apply((eq) => deleteCustomItem(eq, copy.name));
	};

	return (
		<Card sx={{ backgroundColor: 'background.paper', marginTop: 3 }}>
			<CardContent sx={{ padding: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
					<Typography variant="h6" sx={{ flex: 1 }}>Custom items</Typography>
					<Button variant="outlined" startIcon={<AddIcon />} onClick={() => setEditor({})}>Create a custom item</Button>
				</Box>
				<Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 0.5 }}>
					Make your own item, or start from an existing one and change anything: its name, cost, weight, damage, properties, Armor Class and more.
					Your custom items are available to every character on this device: tick one to carry it on this character.
					A custom weapon or armor counts for your attacks and Armor Class like the original, and a weapon made from a catalog weapon keeps that weapon&apos;s proficiency.
				</Typography>

				{items.length === 0 && (
					<Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 2 }}>No custom items yet.</Typography>
				)}
				<Box sx={{ marginTop: items.length ? 2 : 0 }}>
					{items.map((item) => {
						const copy = copyOf(item);
						const have = !!copy && selected.some((s) => s.name === copy.name);
						const name = copy ? copy.name : item.name;
						return (
							<Box key={item.libId} sx={{ display: 'flex', gap: 1.5, padding: 1.5, borderTop: BORDER, alignItems: 'flex-start' }}>
								<Checkbox
									checked={have}
									onChange={() => toggle(item)}
									size="small"
									inputProps={{ 'aria-label': `Carry ${item.name}` }}
									sx={{ padding: 0, marginTop: 0.5 }}
								/>
								<Box sx={{ minWidth: 0, flex: 1 }}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
										<Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
										<Chip label={item.group} size="small" variant="outlined" />
										{item.rarity && <Chip label={item.rarity} size="small" color="secondary" variant="outlined" />}
									</Box>
									<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
										{[item.cost || '—', item.weight ? `${item.weight} lb.` : '', formatItemStats(item)].filter(Boolean).join(' · ')}
									</Typography>
									{item.description && <Typography variant="body2" sx={{ marginTop: 0.5, whiteSpace: 'pre-line' }}>{item.description}</Typography>}
									{item.attunement && have && (
										<Typography variant="caption" sx={{ display: 'block', marginTop: 0.5, color: attunedNames.includes(name) ? 'success.main' : 'text.secondary' }}>
											{attunedNames.includes(name) ? 'You are attuned to this item.' : 'Requires attunement: use the Attunement section above.'}
										</Typography>
									)}
								</Box>
								<Tooltip title="Edit"><IconButton size="small" aria-label={`Edit ${item.name}`} onClick={() => setEditor({ original: item })}><EditIcon fontSize="small" /></IconButton></Tooltip>
								<Tooltip title="Delete from your custom items"><IconButton size="small" aria-label={`Delete ${item.name}`} onClick={() => remove(item)}><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
							</Box>
						);
					})}
				</Box>
				<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginTop: 1.5 }}>
					A new custom item is added to this character&apos;s inventory above and costs what you set. Untick it to leave it out of this character. Editing an item
					updates it for every character the next time that character is opened. Deleting it removes it from your list; characters that already carry it keep their copy.
				</Typography>
			</CardContent>
			{editor && <ItemEditor character={character} groups={groups} catalog={all} libraryItems={items} original={editor.original} onClose={() => setEditor(null)} onSave={save} />}
		</Card>
	);
}
