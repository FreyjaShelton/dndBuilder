// Google Drive sync, done entirely in the browser: Google Identity Services for sign-in and the
// Drive REST API for files. Uses the narrow drive.file scope, so the app can only see files it
// created itself (not the rest of the user's Drive).

const GIS_SRC = 'https://accounts.google.com/gsi/client';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const CLIENT_ID_KEY = 'dndBuilder.googleClientId';
const FILE_MAP_KEY = 'dndBuilder.driveFiles.v1';
const APP_PROP = { dndBuilder: 'character' };

let tokenClient = null;
let tokenClientId = null;
let accessToken = null;
let tokenExpiresAt = 0;
let gisPromise = null;

export function getClientId() {
	try {
		return window.localStorage.getItem(CLIENT_ID_KEY) || process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
	} catch (e) {
		return process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
	}
}

export function setClientId(id) {
	try {
		if (id) window.localStorage.setItem(CLIENT_ID_KEY, id.trim());
		else window.localStorage.removeItem(CLIENT_ID_KEY);
	} catch (e) {
		// ignore: storage unavailable
	}
	tokenClient = null;
	accessToken = null;
	tokenExpiresAt = 0;
}

function loadGis() {
	if (window.google?.accounts?.oauth2) return Promise.resolve();
	if (!gisPromise) {
		gisPromise = new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = GIS_SRC;
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => { gisPromise = null; reject(new Error('Could not load Google sign-in. Check your connection.')); };
			document.head.appendChild(script);
		});
	}
	return gisPromise;
}

// Resolves with a valid access token, prompting the user to sign in / consent when needed.
async function getToken() {
	const clientId = getClientId();
	if (!clientId) throw new Error('Google Drive is not set up yet (no Client ID).');
	if (accessToken && Date.now() < tokenExpiresAt - 30000) return accessToken;
	await loadGis();
	return new Promise((resolve, reject) => {
		if (!tokenClient || tokenClientId !== clientId) {
			tokenClientId = clientId;
			tokenClient = window.google.accounts.oauth2.initTokenClient({
				client_id: clientId,
				scope: SCOPE,
				callback: () => {},
			});
		}
		tokenClient.callback = (resp) => {
			if (resp.error) {
				reject(new Error(resp.error === 'popup_closed' ? 'Sign-in was cancelled.' : `Google sign-in failed: ${resp.error}`));
				return;
			}
			accessToken = resp.access_token;
			tokenExpiresAt = Date.now() + (Number(resp.expires_in) || 3600) * 1000;
			resolve(accessToken);
		};
		tokenClient.error_callback = (err) => reject(new Error(err?.type === 'popup_closed' ? 'Sign-in was cancelled.' : 'Google sign-in could not start.'));
		tokenClient.requestAccessToken({ prompt: accessToken ? '' : 'consent' });
	});
}

async function driveFetch(url, options = {}) {
	const token = await getToken();
	const res = await fetch(url, { ...options, headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` } });
	if (res.status === 401) {
		accessToken = null;
		throw new Error('Google session expired. Try again.');
	}
	if (!res.ok) {
		let detail = '';
		try { detail = (await res.json()).error?.message || ''; } catch (e) { /* not json */ }
		throw new Error(`Google Drive error (${res.status}). ${detail}`.trim());
	}
	return res;
}

const fileMap = () => {
	try { return JSON.parse(window.localStorage.getItem(FILE_MAP_KEY)) || {}; } catch (e) { return {}; }
};
export const getKnownFileId = (name) => fileMap()[name] || null;
const rememberFile = (name, id) => {
	try { window.localStorage.setItem(FILE_MAP_KEY, JSON.stringify({ ...fileMap(), [name]: id })); } catch (e) { /* ignore */ }
};

export const driveFileName = (character) => `${(character.info?.name || 'Unnamed Character').trim()} (dndBuilder).json`;

// Saves the data as a JSON file, updating the same file if this character was saved before.
export async function saveToDrive(name, data) {
	const body = JSON.stringify(data, null, 2);
	const knownId = getKnownFileId(name);
	if (knownId) {
		try {
			await driveFetch(`https://www.googleapis.com/upload/drive/v3/files/${knownId}?uploadType=media`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body,
			});
			return { id: knownId, created: false };
		} catch (e) {
			if (!/\(404\)/.test(e.message)) throw e;
			// the file was deleted from Drive; fall through and create a new one
		}
	}
	const boundary = `dndbuilder${Date.now()}`;
	const metadata = { name, mimeType: 'application/json', appProperties: APP_PROP };
	const multipart = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`
		+ `--${boundary}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${boundary}--`;
	const res = await driveFetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
		method: 'POST',
		headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
		body: multipart,
	});
	const { id } = await res.json();
	rememberFile(name, id);
	return { id, created: true };
}

// Characters this app has saved to the signed-in user's Drive, newest first.
export async function listDriveCharacters() {
	const q = encodeURIComponent("appProperties has { key='dndBuilder' and value='character' } and trashed=false");
	const res = await driveFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=50`);
	return (await res.json()).files || [];
}

export async function loadFromDrive(file) {
	const res = await driveFetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`);
	const data = await res.json();
	rememberFile(file.name, file.id);
	return data;
}
