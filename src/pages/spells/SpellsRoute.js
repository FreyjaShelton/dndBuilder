import * as React from 'react';
import { useCharacter } from '../../context/CharacterContext';
import Spells from './Spells';
import Spells2014 from './Spells2014';

// The Spells step has one page per edition: 2024 keeps its original page, 2014 has its own.
export default function SpellsRoute() {
	const { character } = useCharacter();
	return character.edition === '2014' ? <Spells2014 /> : <Spells />;
}
