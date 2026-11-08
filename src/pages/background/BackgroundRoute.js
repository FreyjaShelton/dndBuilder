import * as React from 'react';
import { useCharacter } from '../../context/CharacterContext';
import Background from './Background';
import Background2014 from './Background2014';

// 2014 has its own Background page (every official background, proficiency picks, specialty rolls);
// 2024 keeps the original page with its ability score bonuses and Origin feats.
export default function BackgroundRoute() {
	const { character } = useCharacter();
	return character.edition === '2014' ? <Background2014 /> : <Background />;
}
