// Google Drive access, done entirely in the browser: Google Identity Services for sign-in and the Drive REST
// API for files. Same approach as the budget app: the OAuth Client ID is baked in at build time
// (REACT_APP_GOOGLE_CLIENT_ID in .env), and files live in the hidden per-app folder (drive.appdata scope), so
// the app can't see or touch anything else in the user's Drive. Nothing is stored on a server.
//
// Each character is one file, "<name> (dndBuilder).json". The character's id is kept in the file's
// appProperties so a rename on one device updates the same file instead of making a copy.

const GIS_SRC = 'https://accounts.google.com/gsi/client';
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const TOKEN_KEY = 'dndBuilder.gdriveToken';
const API = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';
export const FILE_SUFFIX = ' (dndBuilder).json';
const SILENT_TIMEOUT_MS = 8000;

export const getClientId = () => process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

export class AuthError extends Error {}

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

// A still-valid access token from earlier (kept across reloads and tabs; Google's tokens last about an hour).
export function currentToken() {
	try {
		const t = JSON.parse(window.localStorage.getItem(TOKEN_KEY) || 'null');
		if (t && t.exp > Date.now() + 60000) return t.token;
	} catch (e) { /* storage unavailable */ }
	return null;
}

export function clearToken() {
	try { window.localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
}

// Asks Google for an access token. prompt '' may show the account / consent popup (so call it from a click);
// prompt 'none' never shows anything and fails when Google needs the user to interact.
function requestToken(prompt) {
	return preloadGoogle().then(() => new Promise((resolve, reject) => {
		if (!getClientId()) { reject(new Error('Google Drive is not set up for this site (no Client ID).')); return; }
		let done = false;
		const finish = (fn, value) => { if (!done) { done = true; clearTimeout(timer); fn(value); } };
		const timer = prompt === 'none' ? setTimeout(() => finish(reject, new AuthError('Google needs you to sign in again.')), SILENT_TIMEOUT_MS) : null;
		const client = window.google.accounts.oauth2.initTokenClient({
			client_id: getClientId(),
			scope: SCOPE,
			callback: (resp) => {
				if (resp.error) {
					finish(reject, prompt === 'none'
						? new AuthError('Google needs you to sign in again.')
						: new Error(resp.error_description || `Google sign-in failed: ${resp.error}`));
					return;
				}
				try {
					window.localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: resp.access_token, exp: Date.now() + (Number(resp.expires_in) || 3600) * 1000 }));
				} catch (e) { /* the token just won't survive a reload */ }
				finish(resolve, resp.access_token);
			},
			error_callback: (err) => finish(reject, prompt === 'none'
				? new AuthError('Google needs you to sign in again.')
				: new Error(
					err?.type === 'popup_closed' ? 'The Google sign-in window was closed.'
						: err?.type === 'popup_failed_to_open' ? 'Your browser blocked the Google sign-in popup. Allow popups for this site and try again.'
							: err?.message || 'Google sign-in failed.',
				)),
		});
		client.requestAccessToken({ prompt });
	}));
}

export const signIn = () => requestToken('');
export const silentSignIn = () => requestToken('none');

async function api(url, init = {}) {
	const token = currentToken();
	if (!token) throw new AuthError('Google sign-in expired.');
	const res = await fetch(url, { ...init, headers: { ...(init.headers || {}), Authorization: `Bearer ${token}` } });
	if (res.status === 401) {
		clearToken();
		throw new AuthError('Google sign-in expired.');
	}
	if (!res.ok) {
		let detail = '';
		try { detail = (await res.json()).error?.message || ''; } catch (e) { /* not json */ }
		const error = new Error(`Google Drive error (${res.status}). ${detail}`.trim());
		error.status = res.status;
		throw error;
	}
	return res;
}

// Every character file in the app folder: { id, name, version, modifiedTime, appProperties }.
export async function listFiles() {
	const files = [];
	let pageToken = '';
	do {
		const params = new URLSearchParams({
			spaces: 'appDataFolder',
			q: 'trashed=false',
			fields: 'nextPageToken,files(id,name,version,modifiedTime,appProperties)',
			pageSize: '100',
		});
		if (pageToken) params.set('pageToken', pageToken);
		const body = await (await api(`${API}?${params}`)).json();
		files.push(...(body.files || []).filter((f) => f.name.endsWith(FILE_SUFFIX)));
		pageToken = body.nextPageToken || '';
	} while (pageToken);
	return files;
}

export async function downloadFile(id) {
	return (await api(`${API}/${id}?alt=media`)).json();
}

// Creates the file, or updates it when `id` is given. Returns { id, version }.
export async function writeFile({ id, name, appProperties, content }) {
	const boundary = `dndbuilder${Date.now()}${Math.floor(Math.random() * 1e6)}`;
	const metadata = { name, mimeType: 'application/json', appProperties, ...(id ? {} : { parents: ['appDataFolder'] }) };
	const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`
		+ `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(content)}\r\n--${boundary}--`;
	const res = await api(`${id ? `${UPLOAD}/${id}` : UPLOAD}?uploadType=multipart&fields=id,version`, {
		method: id ? 'PATCH' : 'POST',
		headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
		body,
	});
	return res.json();
}

export async function deleteFile(id) {
	try {
		await api(`${API}/${id}`, { method: 'DELETE' });
	} catch (e) {
		if (e.status !== 404) throw e; // already gone
	}
}

export const fileNameFor = (name) => `${(name || 'Unnamed character').replace(/[\\/:*?"<>|]/g, '-').trim()}${FILE_SUFFIX}`;
