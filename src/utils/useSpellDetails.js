import * as React from 'react';
import { getLoadedSpellDetails, loadSpellDetails } from './spells2014';

// The 2014 spell details (casting time, range, description...), loaded the first time they are needed.
// Returns null until they arrive, or an empty object if they could not be loaded (spell lists still work).
export default function useSpellDetails() {
	const [details, setDetails] = React.useState(getLoadedSpellDetails());
	React.useEffect(() => {
		let alive = true;
		loadSpellDetails()
			.then((d) => { if (alive) setDetails(d); })
			.catch(() => { if (alive) setDetails({}); });
		return () => { alive = false; };
	}, []);
	return details;
}
