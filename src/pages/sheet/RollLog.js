import * as React from 'react';
import { Box, Collapse, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { rollExpression } from './dice';

// Floating roll history. The newest roll is always visible; the rest unfold on demand.
export default function RollLog({ entries, onFreeRoll }) {
	const [open, setOpen] = React.useState(false);
	const [expr, setExpr] = React.useState('');
	const latest = entries[0];

	const submit = (e) => {
		e.preventDefault();
		if (!expr.trim()) return;
		const result = rollExpression(expr);
		if (result) onFreeRoll(expr.trim(), result);
		setExpr('');
	};

	return (
		<Paper
			elevation={6}
			sx={{
				position: 'fixed', right: 16, bottom: 16, width: { xs: 'calc(100% - 32px)', sm: 340 }, zIndex: 1300,
				border: 1, borderColor: 'divider', padding: 1.5,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<CasinoIcon fontSize="small" color="primary" />
				<Box sx={{ flex: 1, minWidth: 0 }}>
					{latest ? (
						<>
							<Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>{latest.label}</Typography>
							<Typography variant="body2" noWrap>
								<strong style={{ fontSize: 18 }}>{latest.total}</strong>{' '}
								<span style={{ opacity: 0.7 }}>{latest.detail}</span>
								{latest.flag && <strong style={{ marginLeft: 6, color: latest.flag === 'Critical!' ? '#8bd48b' : '#f08a8a' }}>{latest.flag}</strong>}
							</Typography>
						</>
					) : (
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>Click any bonus to roll it</Typography>
					)}
				</Box>
				<IconButton size="small" onClick={() => setOpen(!open)} aria-label="Toggle roll history">
					{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				</IconButton>
			</Box>
			<Collapse in={open} unmountOnExit>
				<Box sx={{ maxHeight: 220, overflowY: 'auto', marginTop: 1 }}>
					{entries.slice(1).map((e) => (
						<Typography key={e.id} variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
							<strong>{e.total}</strong> — {e.label} ({e.detail})
						</Typography>
					))}
					{entries.length <= 1 && <Typography variant="caption" sx={{ color: 'text.secondary' }}>No earlier rolls.</Typography>}
				</Box>
			</Collapse>
			<form onSubmit={submit}>
				<TextField
					size="small"
					fullWidth
					placeholder="Roll dice, e.g. 2d6+3"
					value={expr}
					onChange={(e) => setExpr(e.target.value)}
					sx={{ marginTop: 1 }}
					InputProps={{ endAdornment: <InputAdornment position="end"><IconButton type="submit" size="small"><CasinoIcon fontSize="small" /></IconButton></InputAdornment> }}
				/>
			</form>
		</Paper>
	);
}
