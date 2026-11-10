// The app's single connection between the local character library and Google Drive.
import * as React from 'react';
import * as drive from './googleDrive';
import library from './library';
import { createSyncEngine } from './driveSync';
import customItemLibrary from './customItemLibrary';

export { library };
export const syncEngine = createSyncEngine({ library, drive, items: customItemLibrary });

let started = false;

// Call once at startup. Reconnects quietly if the user signed in before and pulls in characters from other devices.
export function startSync() {
	if (started) return;
	started = true;
	syncEngine.init();
}

export const useSyncState = () => React.useSyncExternalStore(syncEngine.subscribe, syncEngine.getState);

// Re-renders when anything in the library changes; returns the characters on this device, newest first.
export function useLibrary() {
	React.useSyncExternalStore(library.subscribe, library.getVersion);
	return { characters: library.list(), activeId: library.getActiveId() };
}
