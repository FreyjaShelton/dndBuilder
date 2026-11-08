// Google Drive sync, done entirely in the browser: Google Identity Services for sign-in and the
// Drive REST API for files. Same approach as the budget app: the OAuth Client ID is baked in at
// build time (REACT_APP_GOOGLE_CLIENT_ID in .env), and files live in the hidden per-app folder
// (drive.appdata scope), so the app can't see or touch anything else in the user's Drive.

const GIS_SRC = 'https://accounts.google.com/gsi/client';
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const TOKEN_KEY = 'dndBuilder.gdriveToken';
const API = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';
const FILE_SUFFIX = ' (dndBuilder).json';

export const getClientId = () => process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

let gisPromise = null;

// Load Google's sign-in script ahead of time so the sign-in popup opens straight from a click.
export function preloadGoogle() {
	if (window.google?.accounts?.oauth2) return Promise.resolve();
	if (!gisPromise) {
		gisPromise = new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = GIS_SRC;
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => { gisPromise = null; reject(new Error("Couldn't load Google sign-in. Check your connection.")); };
			document.head.appendChild(script);
		});
	}
	return gisPromise;
}

// A still-valid access token from earlier in this browser session, if any.
function currentToken() {
	try {
		const t = JSON.parse(window.sessionStorage.getItem(TOKEN_KEY) || 'null');
		if (t && t.exp > Date.now() + 60000) return t.token;
	} catch (e) { /* storage unavailable */ }
	return null;
}

function clearToken() {
	try { window.sessionStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
}

// Opens Google's consent popup. Must be reached from a click handler.
async function signIn() {
	await preloadGoogle();
	return new Promise((resolve, reject) => {
		const client = window.google.accounts.oauth2.initTokenClient({
			client_id: getClientId(),
			scope: SCOPE,
			callback: (resp) => {
				if (resp.error) {
					reject(new Error(resp.error_description || `Google sign-in failed: ${resp.error}`));
					return;
				}
				try {
					window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify({ token: resp.access_token, exp: Date.now() + (Number(resp.expires_in) || 3600) * 1000 }));
				} catch (e) { /* the token just won't survive a reload */ }
				resolve(resp.access_token);
			},
			error_callback: (err) => reject(new Error(
				err?.type === 'popup_closed' ? 'The Google sign-in window was closed.'
					: err?.type === 'popup_failed_to_open' ? 'Your browser blocked the Google sign-in popup. Allow popups for this site and try again.'
						: err?.message || 'Google sign-in failed.',
			)),
		});
		client.requestAccessToken({ prompt: '' });
	});
}

async function getToken() {
	if (!getClientId()) throw new Error('Google Drive is not set up for this site (no Client ID).');
	return currentToken() || signIn();
}

async function driveFetch(url, options = {}) {
	const token = await getToken();
	const res = await fetch(url, { ...options, headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` } });
	if (res.status === 401) {
		clearToken();
		throw new Error('Google session expired. Try again.');
	}
	if (!res.ok) {
		let detail = '';
		try { detail = (await res.json()).error?.message || ''; } catch (e) { /* not json */ }
		throw new Error(`Google Drive error (${res.status}). ${detail}`.trim());
	}
	return res;
}

export const driveFileName = (character) => `${(character.info?.name || 'Unnamed Character').trim()}${FILE_SUFFIX}`;

const quote = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

async function findByName(name) {
	const q = encodeURIComponent(`name='${quote(name)}' and trashed=false`);
	const res = await driveFetch(`${API}?spaces=appDataFolder&q=${q}&fields=files(id)&orderBy=modifiedTime desc&pageSize=1`);
	return (await res.json()).files?.[0]?.id || null;
}

// Saves the data as a JSON file in the app folder, updating the file of the same name if there is one
// (so saving from another device updates the same character instead of duplicating it).
export async function saveToDrive(name, data) {
	const body = JSON.stringify(data, null, 2);
	const existing = await findByName(name);
	if (existing) {
		await driveFetch(`${UPLOAD}/${existing}?uploadType=media`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body,
		});
		return { id: existing, created: false };
	}
	const boundary = `dndbuilder${Date.now()}`;
	const metadata = { name, parents: ['appDataFolder'], mimeType: 'application/json' };
	const multipart = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`
		+ `--${boundary}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${boundary}--`;
	const res = await driveFetch(`${UPLOAD}?uploadType=multipart&fields=id`, {
		method: 'POST',
		headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
		body: multipart,
	});
	const { id } = await res.json();
	return { id, created: true };
}

// Characters this app has saved to the signed-in user's Drive, newest first.
export async function listDriveCharacters() {
	const q = encodeURIComponent(`name contains '${quote(FILE_SUFFIX)}' and trashed=false`);
	const res = await driveFetch(`${API}?spaces=appDataFolder&q=${q}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=50`);
	return (await res.json()).files || [];
}

export async function loadFromDrive(file) {
	const res = await driveFetch(`${API}/${file.id}?alt=media`);
	return res.json();
}
