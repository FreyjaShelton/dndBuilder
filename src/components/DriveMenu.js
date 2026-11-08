import * as React from 'react';
import {
	Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemButton,
	ListItemText, Menu, MenuItem, Snackbar, Typography,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import {
	driveFileName, getClientId, listDriveCharacters, loadFromDrive, preloadGoogle, saveToDrive,
} from '../utils/googleDrive';

// Save the current character to / open one from the user's Google Drive.
// getPayload() returns the object to save ({ character, play? }); onImport(data) receives a
// loaded one.
export default function DriveMenu({ getPayload, onImport, buttonProps = {} }) {
	const [anchor, setAnchor] = React.useState(null);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [files, setFiles] = React.useState(null);
	const [busy, setBusy] = React.useState(false);
	const [toast, setToast] = React.useState(null);
	const configured = !!getClientId();

	React.useEffect(() => {
		if (configured) preloadGoogle().catch(() => {});
	}, [configured]);

	const report = (severity, message) => setToast({ severity, message });

	const save = async () => {
		setAnchor(null);
		setBusy(true);
		try {
			const payload = getPayload();
			const name = driveFileName(payload.character);
			const { created } = await saveToDrive(name, payload);
			report('success', created ? `Saved "${name}" to your Google Drive.` : `Updated "${name}" in your Google Drive.`);
		} catch (e) {
			report('error', e.message);
		} finally {
			setBusy(false);
		}
	};

	const openList = async () => {
		setAnchor(null);
		setOpenDialog(true);
		setFiles(null);
		try {
			setFiles(await listDriveCharacters());
		} catch (e) {
			setOpenDialog(false);
			report('error', e.message);
		}
	};

	const load = async (file) => {
		setBusy(true);
		try {
			const data = await loadFromDrive(file);
			if (!data?.character?.classInfo) throw new Error('That file is not a saved dndBuilder character.');
			onImport(data);
			setOpenDialog(false);
			report('success', `Opened "${file.name}".`);
		} catch (e) {
			report('error', e.message);
		} finally {
			setBusy(false);
		}
	};

	return (
		<>
			<Button
				startIcon={busy ? <CircularProgress size={16} /> : <CloudIcon />}
				onClick={(e) => setAnchor(e.currentTarget)}
				disabled={!configured}
				title={configured ? undefined : 'Google Drive is not set up for this site (no Client ID).'}
				{...buttonProps}
			>
				Google Drive
			</Button>
			<Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
				<MenuItem onClick={save}>Save to Google Drive</MenuItem>
				<MenuItem onClick={openList}>Open from Google Drive…</MenuItem>
			</Menu>

			<Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
				<DialogTitle>Open from Google Drive</DialogTitle>
				<DialogContent dividers>
					{files === null && <Box sx={{ textAlign: 'center', padding: 3 }}><CircularProgress /></Box>}
					{files && files.length === 0 && (
						<Typography color="text.secondary">No saved characters found. Use &ldquo;Save to Google Drive&rdquo; first.</Typography>
					)}
					{files && files.length > 0 && (
						<List disablePadding>
							{files.map((f) => (
								<ListItemButton key={f.id} onClick={() => load(f)} disabled={busy}>
									<ListItemText primary={f.name.replace(' (dndBuilder).json', '')} secondary={`Saved ${new Date(f.modifiedTime).toLocaleString()}`} />
								</ListItemButton>
							))}
						</List>
					)}
				</DialogContent>
				<DialogActions><Button onClick={() => setOpenDialog(false)}>Close</Button></DialogActions>
			</Dialog>

			<Snackbar open={!!toast} autoHideDuration={6000} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				{toast ? <Alert severity={toast.severity} onClose={() => setToast(null)} sx={{ width: '100%' }}>{toast.message}</Alert> : undefined}
			</Snackbar>
		</>
	);
}
