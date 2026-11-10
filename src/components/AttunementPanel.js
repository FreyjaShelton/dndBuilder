import * as React from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { MAX_ATTUNED, describeMagicItem } from '../utils/equipment';

// The magic items a character is attuned to (a character can be attuned to three at most), with the carried items that
// could be attuned. Used on the Equipment step and on the interactive sheet's Inventory tab.
//   candidates  carried items that need attunement ({ name, itemType, rarity, ... })
//   attuned     names currently attuned to (already limited to carried items that need it)
//   onChange    called with the new list of names
export default function AttunementPanel({ candidates, attuned, onChange }) {
	const byName = new Map(candidates.map((i) => [i.name, i]));
	const slots = Array.from({ length: MAX_ATTUNED }, (_, i) => attuned[i] || null);
	const full = attuned.length >= MAX_ATTUNED;
	const waiting = candidates.filter((i) => !attuned.includes(i.name));

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
				<Typography variant="h6">Attunement</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>{attuned.length} of {MAX_ATTUNED} slots used</Typography>
			</Box>
			<Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 0.5 }}>
				You can be attuned to at most {MAX_ATTUNED} magic items at once. An item that needs attunement gives you its bonuses and lets you use its abilities only while you are attuned to it.
			</Typography>
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: `repeat(${MAX_ATTUNED}, minmax(0, 1fr))` }, gap: 1, marginTop: 1.5 }}>
				{slots.map((name, i) => {
					const item = name ? byName.get(name) : null;
					return (
						<Box
							key={i}
							data-testid={`attunement-slot-${i + 1}`}
							sx={{ border: 1, borderStyle: item ? 'solid' : 'dashed', borderColor: item ? 'secondary.main' : 'divider', borderRadius: 2, padding: 1.25, minHeight: 78, display: 'flex', flexDirection: 'column', gap: 0.5 }}
						>
							{item ? (
								<>
									<Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>{item.name}</Typography>
									{describeMagicItem(item) && <Typography variant="caption" sx={{ color: 'text.secondary' }}>{describeMagicItem(item)}</Typography>}
									<Box sx={{ flex: 1 }} />
									<Button size="small" onClick={() => onChange(attuned.filter((n) => n !== item.name))} sx={{ alignSelf: 'flex-start', paddingX: 0.5, minWidth: 0 }}>End attunement</Button>
								</>
							) : (
								<Typography variant="body2" sx={{ color: 'text.disabled', margin: 'auto' }}>Empty slot</Typography>
							)}
						</Box>
					);
				})}
			</Box>
			{candidates.length === 0 && (
				<Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1.5 }}>
					None of the items you carry needs attunement. A custom item can be marked “requires attunement” when you create or edit it.
				</Typography>
			)}
			{waiting.length > 0 && (
				<Box sx={{ marginTop: 1.5 }}>
					<Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>Not attuned</Typography>
					{waiting.map((item) => (
						<Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', padding: '4px 0' }}>
							<Typography sx={{ flex: '1 1 160px' }}>{item.name}</Typography>
							{item.rarity && <Chip size="small" variant="outlined" label={item.rarity} />}
							<Button size="small" variant="outlined" disabled={full} onClick={() => onChange([...attuned, item.name])}>Attune</Button>
						</Box>
					))}
					{full && <Typography variant="caption" sx={{ color: 'text.secondary' }}>All {MAX_ATTUNED} slots are in use. End attunement with an item to attune to another.</Typography>}
				</Box>
			)}
		</Box>
	);
}
