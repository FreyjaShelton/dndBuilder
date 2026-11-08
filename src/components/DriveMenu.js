import * as React from 'react';
import {
	Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemButton,
	ListItemText, Menu, MenuItem, Snackbar, TextField, Typography,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import {
	driveFileName, getClientId, listDriveCharacters, loadFromDrive, saveToDrive, setClientId,
} from '../utils/googleDrive';

// Save the current character to / open one from the user's Google Drive.
// getPayload() returns the object to save ({ character, play? }); onImport(data) receives a
// loaded one.
export default function DriveMenu({ getPayload, onImport, buttonProps = {} }) {
	const [anchor, setAnchor] = React.useState(null);
	const [setupOpen, setSetupOpen] = React.useState(false);
	const [clientIdInput, setClientIdInput] = React.useState(getClientId());
	const [openDialog, setOpenDialog] = React.useState(false);
	const [files, setFiles] = React.useState(null);
	const [busy, setBusy] = React.useState(false);
	const [toast, setToast] = React.useState(null);

	const report = (severity, message) => setToast({ severity, message });
	const needSetup = () => {
		if (getClientId()) return false;
		setSetupOpen(true);
		return true;
	};

	const save = async () => {
		setAnchor(null);
		if (needSetup()) return;
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
		if (needSetup()) return;
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
			<Button startIcon={busy ? <CircularProgress size={16} /> : <CloudIcon />} onClick={(e) => setAnchor(e.currentTarget)} {...buttonProps}>
				Google Drive
			</Button>
			<Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
				<MenuItem onClick={save}>Save to Google Drive</MenuItem>
				<MenuItem onClick={openList}>Open from Google Drive…</MenuItem>
				<MenuItem onClick={() => { setAnchor(null); setClientIdInput(getClientId()); setSetupOpen(true); }}>Drive settings…</MenuItem>
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

			<Dialog open={setupOpen} onClose={() => setSetupOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Google Drive setup</DialogTitle>
				<DialogContent dividers>
					<Typography variant="body2" sx={{ marginBottom: 1.5 }}>
						Saving to Google Drive needs a Google OAuth <strong>Client ID</strong> for this site. The app only
						asks for access to files it creates itself, never the rest of your Drive.
					</Typography>
					<Typography variant="body2" component="div" sx={{ marginBottom: 2, color: 'text.secondary' }}>
						1. In the Google Cloud Console, create a project and enable the <em>Google Drive API</em>.<br />
						2. Set up the OAuth consent screen, then create an <em>OAuth client ID</em> of type <em>Web application</em>.<br />
						3. Add this site&apos;s address ({window.location.origin}) under <em>Authorized JavaScript origins</em>.<br />
						4. Paste the Client ID below.
					</Typography>
					<TextField
						fullWidth
						size="small"
						label="Client ID"
						placeholder="1234567890-abc123.apps.googleusercontent.com"
						value={clientIdInput}
						onChange={(e) => setClientIdInput(e.target.value)}
					/>
					{!getClientId() && <Alert severity="info" sx={{ marginTop: 2 }}>Google Drive is off until a Client ID is set.</Alert>}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setClientId(''); setClientIdInput(''); }}>Clear</Button>
					<Button onClick={() => setSetupOpen(false)}>Cancel</Button>
					<Button variant="contained" onClick={() => { setClientId(clientIdInput); setSetupOpen(false); report('success', clientIdInput.trim() ? 'Client ID saved.' : 'Client ID cleared.'); }}>
						Save
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar open={!!toast} autoHideDuration={6000} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				{toast ? <Alert severity={toast.severity} onClose={() => setToast(null)} sx={{ width: '100%' }}>{toast.message}</Alert> : undefined}
			</Snackbar>
		</>
	);
}
