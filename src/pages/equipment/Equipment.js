import * as React from 'react';
import {
	Box, Button, Card, CardContent, Checkbox, Chip, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Tab, Table,
	TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, ToggleButton, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PageHeader from '../../components/PageHeader';
import { useCharacter } from '../../context/CharacterContext';
import { getStepEyebrow } from '../../data/wizardSteps';
import { getArmorClass, getAttacks, getBackground, getClass } from '../../utils/characterCalc';
import { formatGold, parseCostToGold } from '../../utils/currency';
import {
	formatItemStats, getItemIndex, getOwnedItems, getPurchasedItems, getRemainingGold, getSelected, getStartingGold, getTotalWeight,
	getWearDefaults, getWornArmorName, hasShield, isKit,
} from '../../utils/equipment';
import { getKitPending, getKitPlan, getKitState, getOptionPacks, getPickOptions, getSelectedOption, pickId } from '../../utils/startingKit';
import { getStartingWealth, rollStartingWealth } from '../../utils/startingWealth';
import { OptionPicker } from '../race/RaceChoices2014';

const BORDER = '1px solid rgba(255, 255, 255, 0.08)';

// Applies an equipment change and keeps the worn armor and carried shield consistent with what is now owned.
const withWear = (character, eq, patch) => {
	const before = { ...character, equipment: eq };
	const after = { ...character, equipment: { ...eq, ...patch } };
	return { ...patch, ...getWearDefaults(before, after) };
};

function StartingGold({ character, updateEquipment }) {
	const cls = getClass(character);
	const wealth = getStartingWealth(character);
	const { goldMethod } = character.equipment;
	const gold = getStartingGold(character);
	const remaining = getRemainingGold(character);
	const kit = isKit(character);

	const choose = (patch) => updateEquipment((eq) => withWear(character, eq, patch));

	return (
		<Box sx={{ padding: 2, backgroundColor: 'action.hover', borderRadius: 2, marginBottom: 3 }}>
			<Typography variant="subtitle2">Starting gold</Typography>
			{!cls || !wealth ? (
				<Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 0.5 }}>
					Choose a class first to determine starting gold.
				</Typography>
			) : (
				<>
					<Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 0.5 }}>
						{cls.name}: {wealth.kind === 'dice' ? `${wealth.text} (average ${wealth.average} gp)` : `${wealth.gold} gp`} instead of the class and background equipment.
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, marginTop: 1.5, flexWrap: 'wrap' }}>
						<Button
							variant={goldMethod === 'average' ? 'contained' : 'outlined'}
							size="small"
							onClick={() => choose({ goldMethod: 'average', gold: wealth.average })}
						>
							{wealth.kind === 'dice' ? `Use average (${wealth.average} gp)` : `Take ${wealth.gold} gp`}
						</Button>
						{wealth.kind === 'dice' && (
							<Button
								variant={goldMethod === 'roll' ? 'contained' : 'outlined'}
								size="small"
								onClick={() => choose({ goldMethod: 'roll', gold: rollStartingWealth(wealth) })}
							>
								{goldMethod === 'roll' ? 'Reroll' : 'Roll'} {wealth.count}d{wealth.sides}{wealth.multiplier > 1 ? ` × ${wealth.multiplier}` : ''}
							</Button>
						)}
						<Button variant={kit ? 'contained' : 'outlined'} size="small" onClick={() => choose({ goldMethod: 'kit' })}>
							Take the starting kit
						</Button>
						{gold !== '' && (
							<>
								<Typography variant="body1" sx={{ fontWeight: 700 }}>
									{formatGold(gold)} {kit ? 'with your kit' : 'starting'}
								</Typography>
								<Typography variant="body1" sx={{ fontWeight: 700, color: remaining < 0 ? 'error.main' : 'text.primary' }}>
									{formatGold(remaining)} remaining
								</Typography>
							</>
						)}
					</Box>
				</>
			)}
		</Box>
	);
}

// The class and background equipment: pick between the options and fill in open choices (any martial weapon, a holy symbol...).
function KitPanel({ character, updateEquipment }) {
	const plan = getKitPlan(character);
	const picks = getKitState(character).picks || {};
	const pending = getKitPending(character);

	const change = (update) => updateEquipment((eq) => {
		const kit = update(eq.kit || { choices: {}, picks: {} });
		return withWear(character, eq, { kit });
	});
	const setChoice = (rowId, key) => change((kit) => ({
		...kit,
		choices: { ...(kit.choices || {}), [rowId]: key },
		// picks belong to the option they were made for
		picks: Object.fromEntries(Object.entries(kit.picks || {}).filter(([id]) => !id.startsWith(`${rowId}:`))),
	}));
	const setPick = (id, name) => change((kit) => ({ ...kit, picks: { ...(kit.picks || {}), [id]: name } }));

	const renderRow = (kitRow) => {
		const opt = getSelectedOption(character, kitRow);
		return (
			<Box key={kitRow.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				{kitRow.kind === 'choice' ? (
					<FormControl size="small" fullWidth>
						<InputLabel>Choose one</InputLabel>
						<Select
							label="Choose one"
							value={opt.key}
							onChange={(e) => setChoice(kitRow.id, e.target.value)}
							renderValue={(key) => { const o = kitRow.options.find((x) => x.key === key) || opt; return `${o.key.toUpperCase()}: ${o.label}`; }}
						>
							{kitRow.options.map((o) => (
								<MenuItem key={o.key} value={o.key} sx={{ whiteSpace: 'normal' }}>
									<Box>
										<Typography variant="body2">{`${o.key.toUpperCase()}: ${o.label}`}</Typography>
										{/* what is inside a pack, so the choice can be made without looking it up */}
										{getOptionPacks(character.edition, o).map((p) => (
											<Typography key={p.name} variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
												{p.name} contains: {p.contents}
											</Typography>
										))}
									</Box>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				) : (
					<Typography variant="body2">• {opt.label}</Typography>
				)}
				{getOptionPacks(character.edition, opt).map((p) => (
					<Box key={p.name} sx={{ paddingLeft: 1.5, borderLeft: BORDER }}>
						<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
							<strong>{p.name}</strong> contains: {p.contents}. You get each of these items separately, so they appear in your inventory below.
						</Typography>
					</Box>
				))}
				{opt.items.map((spec, si) => (spec.pick ? Array.from({ length: spec.quantity }, (_, slot) => {
					const id = pickId(kitRow, opt, si, slot);
					return (
						<OptionPicker
							key={id}
							label={`${spec.label}${spec.quantity > 1 ? ` ${slot + 1}` : ''}`}
							value={picks[id] || ''}
							options={getPickOptions(character.edition, spec.pick).map((name) => ({ name }))}
							onChange={(name) => setPick(id, name)}
						/>
					);
				}) : null))}
			</Box>
		);
	};

	const section = (title, rows) => rows.some((r) => !r.hidden) && (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
			<Typography variant="subtitle2" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>{title}</Typography>
			{rows.filter((r) => !r.hidden).map(renderRow)}
		</Box>
	);

	if (plan.class.length === 0 && plan.background.length === 0) {
		return (
			<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 3 }}>
				Choose a class and background to see your starting kit.
			</Typography>
		);
	}
	return (
		<Box sx={{ padding: 2, border: BORDER, borderRadius: 2, marginBottom: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>Your starting kit</Typography>
				{pending > 0 && <Chip size="small" color="warning" variant="outlined" label={`${pending} to choose`} />}
			</Box>
			{section('Class', plan.class)}
			{section('Background', plan.background)}
			<Typography variant="caption" sx={{ color: 'text.secondary' }}>
				Kit items are free and appear in the table below. Anything else you add costs gold from the coins your kit comes with.
			</Typography>
		</Box>
	);
}

export default function Equipment() {
	const { character, updateEquipment } = useCharacter();
	const { edition } = character;
	const cls = getClass(character);
	const bg = getBackground(character);
	const selected = getSelected(character);
	const owned = getOwnedItems(character);
	const worn = getWornArmorName(character);
	const shield = hasShield(character);
	const kit = isKit(character);
	const { all, groups } = React.useMemo(() => getItemIndex(edition), [edition]);
	const [search, setSearch] = React.useState('');
	const [group, setGroup] = React.useState('All');
	const attacks = getAttacks(character);

	const toggleItem = (item) => updateEquipment((eq) => {
		const list = eq.selected || [];
		const next = list.some((s) => s.name === item.name)
			? list.filter((s) => s.name !== item.name)
			: [...list, { name: item.name, group: item.group, quantity: 1 }];
		return withWear(character, eq, { selected: next });
	});

	const setQuantity = (name, quantity) => updateEquipment((eq) => ({
		selected: (eq.selected || []).map((s) => (s.name === name ? { ...s, quantity: Math.max(1, Math.floor(quantity) || 1) } : s)),
	}));

	const wearArmor = (name) => updateEquipment((eq) => ({ armor: eq.armor === name ? '' : name }));
	const carryShield = () => updateEquipment((eq) => ({ shield: !eq.shield }));

	const filtered = all.filter((item) => (group === 'All' || item.group === group) && item.name.toLowerCase().includes(search.trim().toLowerCase()));
	const weight = Math.round(getTotalWeight(character) * 100) / 100;
	const bought = getPurchasedItems(character);

	return (
		<>
			<PageHeader
				eyebrow={getStepEyebrow('Equipment', character)}
				title="Equipment"
				subtitle="Choose your weapons, armor and gear. Armor Class and attacks are calculated for you."
			/>
			{(cls || bg) && !kit && (
				<Card sx={{ backgroundColor: 'background.paper', marginBottom: 3 }}>
					<CardContent sx={{ padding: 3 }}>
						<Typography variant="subtitle2" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
							Your starting equipment (reference)
						</Typography>
						{cls && (cls.startingEquipment || []).map((line, i) => (
							<Typography key={i} variant="body2" sx={{ marginTop: 0.5 }}>• {line}</Typography>
						))}
						{bg?.equipment && <Typography variant="body2" sx={{ marginTop: 1 }}>Background: {bg.equipment}</Typography>}
					</CardContent>
				</Card>
			)}
			<Card sx={{ backgroundColor: 'background.paper' }}>
				<CardContent sx={{ padding: 3 }}>
					<StartingGold character={character} updateEquipment={updateEquipment} />
					{kit && <KitPanel character={character} updateEquipment={updateEquipment} />}

					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
						<Chip label={`${owned.length} item${owned.length === 1 ? '' : 's'}`} />
						<Chip label={`${weight} lb.`} variant="outlined" />
						{cls && <Chip label={`AC ${getArmorClass(character)}`} variant="outlined" />}
					</Box>
					{attacks.length > 0 && (
						<Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 2 }}>
							{attacks.map((a) => `${a.name} ${a.attackBonus} (${a.damage || 'no damage'})`).join(' · ')}
						</Typography>
					)}

					{owned.length > 0 && (
						<TableContainer sx={{ marginBottom: 3, border: BORDER, borderRadius: 2 }}>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell sx={{ minWidth: 180 }}>Name</TableCell>
										<TableCell sx={{ width: 150 }}>Category</TableCell>
										<TableCell sx={{ width: 110 }}>Cost</TableCell>
										<TableCell sx={{ width: 100 }}>Quantity</TableCell>
										<TableCell sx={{ width: 100 }}>Worn</TableCell>
										<TableCell sx={{ width: 48 }} />
									</TableRow>
								</TableHead>
								<TableBody>
									{owned.map((item) => (
										<TableRow key={`${item.fromKit ? 'kit' : 'own'}:${item.name}`}>
											<TableCell sx={{ fontWeight: 600 }}>
												{item.name}
												{item.fromPack && <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 400 }}>from {item.fromPack}</Typography>}
											</TableCell>
											<TableCell><Chip label={item.fromKit ? `Kit · ${item.group}` : item.group} size="small" variant="outlined" /></TableCell>
											<TableCell>
												{item.fromKit ? <Typography variant="caption" sx={{ color: 'text.secondary' }}>Included</Typography> : (
													<>
														{item.cost ? formatGold(parseCostToGold(item.cost) * item.quantity) : '—'}
														{item.quantity > 1 && item.cost && (
															<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{item.cost} each</Typography>
														)}
													</>
												)}
											</TableCell>
											<TableCell>
												{item.fromKit ? item.quantity : (
													<TextField
														type="number"
														size="small"
														value={item.quantity}
														onChange={(e) => setQuantity(item.name, Number(e.target.value))}
														slotProps={{ htmlInput: { min: 1, 'aria-label': `Quantity of ${item.name}`, style: { width: 48 } } }}
													/>
												)}
											</TableCell>
											<TableCell>
												{item.group === 'Armor' && item.type !== 'Shield' && (
													<ToggleButton size="small" value="worn" selected={worn === item.name} onChange={() => wearArmor(item.name)} sx={{ textTransform: 'none', padding: '2px 10px' }}>
														{worn === item.name ? 'Worn' : 'Wear'}
													</ToggleButton>
												)}
												{item.type === 'Shield' && (
													<ToggleButton size="small" value="shield" selected={shield} onChange={carryShield} sx={{ textTransform: 'none', padding: '2px 10px' }}>
														{shield ? 'Carried' : 'Carry'}
													</ToggleButton>
												)}
											</TableCell>
											<TableCell>
												{!item.fromKit && (
													<IconButton size="small" onClick={() => toggleItem(item)} aria-label={`Remove ${item.name}`}>
														<DeleteOutlineIcon fontSize="small" />
													</IconButton>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
					{kit && bought.length === 0 && selected.length === 0 && (
						<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: 2 }}>
							Want something extra? Search below; it comes out of your kit coins.
						</Typography>
					)}

					<TextField
						placeholder="Search equipment..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						fullWidth
						size="small"
						sx={{ marginBottom: 2 }}
						slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
					/>

					<Tabs value={group} onChange={(_, v) => setGroup(v)} variant="scrollable" scrollButtons="auto" sx={{ marginBottom: 2, minHeight: 36 }}>
						{['All', ...groups].map((g) => <Tab key={g} label={g} value={g} sx={{ minHeight: 36 }} />)}
					</Tabs>

					<Box sx={{ maxHeight: 600, overflowY: 'auto', border: BORDER, borderRadius: 2, padding: 1 }}>
						{filtered.length === 0 && (
							<Typography variant="body2" sx={{ color: 'text.secondary', padding: 2 }}>No equipment matches your search.</Typography>
						)}
						{filtered.map((item) => {
							const isSelected = selected.some((s) => s.name === item.name);
							const stats = formatItemStats(item);
							return (
								<Box key={item.name} sx={{ display: 'flex', gap: 1.5, padding: 1.5, borderBottom: BORDER, '&:last-of-type': { borderBottom: 'none' } }}>
									<Checkbox
										checked={isSelected}
										onChange={() => toggleItem(item)}
										size="small"
										inputProps={{ 'aria-label': item.name }}
										sx={{ padding: 0, alignSelf: 'flex-start', marginTop: 0.5 }}
									/>
									<Box sx={{ minWidth: 0 }}>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
											<Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
											<Chip label={item.group} size="small" variant="outlined" />
										</Box>
										<Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
											{[item.cost || '—', item.weight ? `${item.weight} lb.` : '', stats].filter(Boolean).join(' · ')}
										</Typography>
										{item.description && (
											<Typography variant="body2" sx={{ marginTop: 0.5, whiteSpace: 'pre-line' }}>{item.description}</Typography>
										)}
									</Box>
								</Box>
							);
						})}
					</Box>
				</CardContent>
			</Card>
		</>
	);
}
