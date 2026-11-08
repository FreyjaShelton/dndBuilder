import * as React from 'react';
import { useCharacter } from '../../context/CharacterContext';
import Race from './Race';
import Race2014 from './Race2014';

// 2014 has its own Race page (versions, subraces, dropdown choices); 2024 keeps the species page.
export default function RaceRoute() {
	const { character } = useCharacter();
	return character.edition === '2014' ? <Race2014 /> : <Race />;
}
