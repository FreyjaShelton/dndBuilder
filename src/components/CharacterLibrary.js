import * as React from 'react';
import {
	Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List,
	ListItem, ListItemButton, ListItemText, Paper, Tooltip, Typography,
} from '@mui/material';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCharacter } from '../context/CharacterContext';
import { getClientId, preloadGoogle } from '../utils/googleDrive';
import { syncEngine, useLibrary, useSyncState } from '../utils/cloud';

export function timeAgo(ts) {
	if (!ts) return 'never';
	const s = Math.round((Date.now() - ts) / 1000);
	if (s < 45) return 'just now';
	if (s < 3600) return `${Math.round(s / 60)} min ago`;
	if (s < 86400) return `${Math.round(s / 3600)} hr ago`;
	return new Date(ts).toLocaleString();
}

function SyncPanel({ sync, configured }) {
	const [busy, setBusy] = React.useState(false);
	const connected = syncEngine.isConnected();

	const signIn = async () => {
		setBusy(true);
		try { await syncEngine.connect(); } finally { setBusy(false); }
	};

	if (!configured) {
		return (
			<Alert severity="info">
				Google Drive sync isn&apos;t set up for this site (it needs a Google OAuth Client ID). Characters are still saved on this device.
			</Alert>
		);
	}

	if (!connected) {
		return (
			<Paper variant="outlined" sx={{ padding: 2 }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Keep your characters in Google Drive</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5, marginBottom: 1.5 }}>
					Sign in with Google once and each character saves to your Drive automatically once you reach the Finalize step. Your custom items sync too, as soon as you change them. Sign in the same way on any other device and they&apos;re all there.
					The app can only see its own hidden folder, not the rest of your Drive.
				</Typography>
				<Button variant="contained" onClick={signIn} disabled={busy} startIcon={busy ? <CircularProgress size={16} color="inherit" /> : undefined}>
					Sign in with Google
				</Button>
				{sync.error && <Alert severity="error" sx={{ marginTop: 1.5 }}>{sync.error}</Alert>}
			</Paper>
		);
	}

	return (
		<Paper variant="outlined" sx={{ padding: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
					{sync.status === 'syncing' ? 'Syncing with Google Drive…'
						: sync.status === 'needsAuth' ? 'Google Drive is paused'
							: sync.status === 'error' ? 'Google Drive sync hit a problem'
								: 'Synced with Google Drive'}
				</Typography>
				{sync.status === 'needsAuth' ? (
					<Button variant="contained" size="small" onClick={signIn} disabled={busy}>Sign in with Google</Button>
				) : (
					<Button size="small" onClick={() => syncEngine.syncNow()} disabled={sync.status === 'syncing'}>Sync now</Button>
				)}
			</Box>
			<Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
				{sync.status === 'needsAuth'
					? 'Google needs you to sign in again (this happens about once an hour on some browsers). Your characters are saved on this device and will upload as soon as you do.'
					: `Last synced ${timeAgo(sync.lastSyncAt)}. A character uploads when you reach the Finalize step, and again if you change it and finalize again. Changes on the interactive sheet upload 20 seconds after your last change.`}
			</Typography>
			{sync.error && <Alert severity={sync.status === 'error' ? 'error' : 'warning'} sx={{ marginTop: 1 }}>{sync.error}</Alert>}
			<Box sx={{ marginTop: 1 }}>
				<Button
					size="small"
					color="inherit"
					onClick={() => { if (window.confirm('Stop syncing on this device? Your characters stay here and in Google Drive.')) syncEngine.disconnect(); }}
				>
					Stop syncing on this device
				</Button>
			</Box>
		</Paper>
	);
}

// The Characters button: shows whether Google Drive is connected and opens the list of characters, which can be
// opened, deleted or started fresh, along with the Google sign-in.
export default function CharacterLibrary({ compact = false }) {
	const [open, setOpen] = React.useState(false);
	const sync = useSyncState();
	const { characters, activeId } = useLibrary();
	const { openCharacter, newCharacter, deleteCharacter } = useCharacter();
	const configured = !!getClientId();
	const connected = syncEngine.isConnected();

	React.useEffect(() => {
		if (configured) preloadGoogle().catch(() => {});
	}, [configured]);

	const icon = !connected ? <CloudOffIcon />
		: sync.status === 'syncing' ? <CircularProgress size={18} />
			: sync.status === 'needsAuth' || sync.status === 'error' ? <SyncProblemIcon color="warning" />
				: <CloudDoneIcon color="success" />;
	const tip = !connected ? 'Characters (not synced to Google Drive)'
		: sync.status === 'needsAuth' ? 'Characters: sign in to Google to keep syncing'
			: sync.status === 'error' ? `Characters: ${sync.error}`
				: 'Characters (synced with Google Drive)';

	const pick = (id) => { openCharacter(id); setOpen(false); };
	const start = () => { newCharacter(); setOpen(false); window.location.hash = '#/edition'; };
	const remove = (c) => {
		const where = connected ? ' It will also be deleted from your Google Drive.' : '';
		if (window.confirm(`Delete "${c.name}"?${where} This can't be undone.`)) deleteCharacter(c.id);
	};

	const statusOf = (c) => {
		if (!connected) return 'Only on this device';
		if (!c.finalized && !c.driveId) return 'Draft · syncs when you reach Finalize';
		if (c.dirty && !c.ready) return 'Edited · syncs when you finalize again';
		return c.dirty ? 'Waiting to sync' : 'In Google Drive';
	};

	return (
		<>
			<Tooltip title={tip}>
				<Button
					startIcon={icon}
					onClick={() => { setOpen(true); syncEngine.syncIfReady(); }}
					aria-label="Characters"
					sx={compact ? {
						minWidth: { xs: 40, sm: 64 },
						paddingX: { xs: 1, sm: 1.5 },
						'& .MuiButton-startIcon': { marginRight: { xs: 0, sm: '8px' }, marginLeft: { xs: 0, sm: '-4px' } },
					} : undefined}
				>
					<Box component="span" sx={{ display: compact ? { xs: 'none', sm: 'inline' } : 'inline' }}>Characters</Box>
				</Button>
			</Tooltip>

			<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Your characters</DialogTitle>
				<DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<SyncPanel sync={sync} configured={configured} />

					{characters.length === 0 ? (
						<Typography color="text.secondary">
							No saved characters on this device yet.{connected ? ' Anything saved to your Google Drive will appear here after it syncs.' : ''}
						</Typography>
					) : (
						<List disablePadding>
							{characters.map((c) => (
								<ListItem
									key={c.id}
									disablePadding
									secondaryAction={(
										<Tooltip title="Delete">
											<IconButton edge="end" aria-label={`Delete ${c.name}`} onClick={() => remove(c)}><DeleteOutlineIcon /></IconButton>
										</Tooltip>
									)}
								>
									<ListItemButton onClick={() => pick(c.id)} selected={c.id === activeId}>
										<ListItemText
											primary={(
												<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
													{c.name}
													{c.id === activeId && <Chip size="small" color="primary" label="Open" />}
												</Box>
											)}
											secondary={[c.summary, statusOf(c)].filter(Boolean).join(' · ')}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					)}
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'space-between' }}>
					<Button startIcon={<AddIcon />} onClick={start}>New character</Button>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
