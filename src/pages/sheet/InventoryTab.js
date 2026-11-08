import * as React from 'react';
import {
	Autocomplete, Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
	createFilterOptions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCatalog, newItemId } from './inventory';

const COINS = [['pp', 'PP'], ['gp', 'GP'], ['ep', 'EP'], ['sp', 'SP'], ['cp', 'CP']];
const filter = createFilterOptions({ limit: 50 });
const round = (n) => Math.round(n * 100) / 100;

export default function InventoryTab({ character, d, play, setPlay }) {
	const catalog = React.useMemo(() => getCatalog(character.edition), [character.edition]);
	const items = play.items || [];
	const [name, setName] = React.useState('');
	const [qty, setQty] = React.useState(1);

	const total = items.reduce((sum, i) => sum + (Number(i.weight) || 0) * (Number(i.qty) || 0), 0);
	const capacity = (Number(d.finals.str) || 0) * 15;

	const setItems = (next) => setPlay({ items: next });
	const setQtyOf = (id, value) => setItems(items.map((i) => (i.id === id ? { ...i, qty: Math.max(0, Math.floor(Number(value) || 0)) } : i)));
	const setWeightOf = (id, value) => setItems(items.map((i) => (i.id === id ? { ...i, weight: value === '' ? '' : Math.max(0, Number(value) || 0) } : i)));
	const remove = (id) => setItems(items.filter((i) => i.id !== id));

	const add = () => {
		const trimmed = name.trim();
		const amount = Math.max(1, Math.floor(Number(qty) || 1));
		if (!trimmed) return;
		const known = catalog.find((c) => c.name.toLowerCase() === trimmed.toLowerCase());
		const label = known ? known.name : trimmed;
		const existing = items.find((i) => i.name.toLowerCase() === label.toLowerCase() && !i.note);
		if (existing) {
			setItems(items.map((i) => (i.id === existing.id ? { ...i, qty: (Number(i.qty) || 0) + amount } : i)));
		} else {
			setItems([...items, { id: newItemId(), name: label, qty: amount, weight: known ? known.weight : 0, ...(known ? {} : { custom: true }) }]);
		}
		setName('');
		setQty(1);
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, marginBottom: 3 }}>
				{COINS.map(([key, label]) => (
					<TextField
						key={key}
						size="small"
						type="number"
						label={label}
						value={play.currency[key]}
						onChange={(e) => setPlay({ currency: { ...play.currency, [key]: Math.max(0, Number(e.target.value) || 0) } })}
						sx={{ width: 90 }}
					/>
				))}
			</Box>

			<Box sx={{ display: 'flex', gap: 1, marginBottom: 2, alignItems: 'flex-start' }}>
				<Autocomplete
					freeSolo
					size="small"
					fullWidth
					options={catalog}
					getOptionLabel={(o) => (typeof o === 'string' ? o : o.name)}
					inputValue={name}
					onInputChange={(_, v) => setName(v)}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);
						const typed = params.inputValue.trim();
						if (typed && !options.some((o) => o.name.toLowerCase() === typed.toLowerCase())) {
							filtered.push({ name: typed, custom: true });
						}
						return filtered;
					}}
					renderOption={(props, o) => {
						const { key, ...rest } = props;
						return (
							<li key={key} {...rest}>
								{o.custom ? `Add custom item “${o.name}”` : o.name}
								{!o.custom && o.weight ? <Typography component="span" variant="caption" sx={{ marginLeft: 1, color: 'text.secondary' }}>{o.weight} lb</Typography> : null}
							</li>
						);
					}}
					onChange={(_, v) => { if (v) setName(typeof v === 'string' ? v : v.name); }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Add an item"
							placeholder="Search items or type a custom one"
						/>
					)}
				/>
				<TextField
					size="small"
					type="number"
					label="Qty"
					value={qty}
					onChange={(e) => setQty(e.target.value)}
					slotProps={{ htmlInput: { min: 1 } }}
					sx={{ width: 84, flexShrink: 0 }}
				/>
				<Button variant="contained" startIcon={<AddIcon />} onClick={add} disabled={!name.trim()} sx={{ flexShrink: 0, height: 40 }}>
					Add
				</Button>
			</Box>

			<Table size="small" sx={{ '& .MuiTableCell-root': { paddingX: { xs: 0.5, sm: 2 } } }}>
				<TableHead>
					<TableRow>
						<TableCell>Item</TableCell>
						<TableCell align="center" sx={{ width: { xs: 64, sm: 90 } }}>Qty</TableCell>
						<TableCell align="center" sx={{ width: { xs: 72, sm: 96 } }}>Lb each</TableCell>
						<TableCell sx={{ width: 48, padding: 0 }} />
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((i) => (
						<TableRow key={i.id}>
							<TableCell>
								{i.name}
								{i.note && <Typography component="span" variant="caption" sx={{ marginLeft: 0.75, color: 'text.secondary' }}>({i.note})</Typography>}
							</TableCell>
							<TableCell align="center">
								<TextField
									size="small"
									type="number"
									value={i.qty}
									onChange={(e) => setQtyOf(i.id, e.target.value)}
									slotProps={{ htmlInput: { min: 0, 'aria-label': `Quantity of ${i.name}` } }}
									sx={{ width: { xs: 60, sm: 72 } }}
								/>
							</TableCell>
							<TableCell align="center">
								{i.custom ? (
									<TextField
										size="small"
										type="number"
										value={i.weight}
										onChange={(e) => setWeightOf(i.id, e.target.value)}
										slotProps={{ htmlInput: { min: 0, step: 'any', 'aria-label': `Weight of ${i.name} in pounds` } }}
										sx={{ width: { xs: 68, sm: 80 } }}
									/>
								) : (Number(i.weight) || 0)}
							</TableCell>
							<TableCell sx={{ padding: 0 }}>
								<IconButton size="small" aria-label={`Remove ${i.name}`} onClick={() => remove(i.id)}><DeleteIcon fontSize="small" /></IconButton>
							</TableCell>
						</TableRow>
					))}
					{items.length === 0 && (
						<TableRow><TableCell colSpan={4} sx={{ color: 'text.secondary' }}>Nothing in your inventory yet. Add an item above.</TableCell></TableRow>
					)}
				</TableBody>
			</Table>
			<Typography variant="body2" sx={{ marginTop: 2, color: total > capacity && capacity ? 'error.main' : 'text.secondary' }}>
				Carried {round(total)} lb{capacity ? ` of ${capacity} lb capacity (Strength × 15)` : ''}
			</Typography>
		</Box>
	);
}
