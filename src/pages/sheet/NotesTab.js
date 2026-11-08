import * as React from 'react';
import { Box, TextField, Typography } from '@mui/material';

export default function NotesTab({ character, play, setPlay }) {
	const { background, info } = character;
	const details = [
		['Personality traits', background.personalityTraits],
		['Ideals', background.ideals],
		['Bonds', background.bonds],
		['Flaws', background.flaws],
		['Backstory', info.backstory],
		['Appearance', ['age', 'height', 'weight', 'eyes', 'skin', 'hair'].filter((k) => info[k]).map((k) => `${k}: ${info[k]}`).join(', ')],
	].filter(([, v]) => v);

	return (
		<Box>
			<TextField
				label="Session notes"
				multiline
				minRows={6}
				fullWidth
				value={play.notes}
				onChange={(e) => setPlay({ notes: e.target.value })}
			/>
			{details.map(([title, text]) => (
				<Box key={title} sx={{ marginTop: 2 }}>
					<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{title}</Typography>
					<Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{text}</Typography>
				</Box>
			))}
		</Box>
	);
}
