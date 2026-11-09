import * as React from 'react';
import {
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';

const norm = (s) => s.replace(/\s+/g, ' ');

// A class's progression table (proficiency bonus, features, spell slots...) with the current level highlighted.
export default function ClassTable({ cls, level }) {
	return (
		<TableContainer sx={{ maxHeight: 360, marginTop: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
			<Table size="small" stickyHeader sx={{ '& .MuiTableCell-root': { padding: { xs: '6px 8px', sm: '6px 16px' }, fontSize: { xs: 12, sm: 14 } } }}>
				<TableHead>
					<TableRow>
						{cls.table.columns.map((c, i) => (
							<TableCell key={i} sx={{ backgroundColor: 'background.paper', whiteSpace: { xs: 'normal', sm: 'nowrap' }, minWidth: norm(c) === 'Features' ? 170 : undefined }}>
								{norm(c).replace('Spell Slots per Spell Level ', '').replace('Proficiency Bonus', 'Prof.')}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{cls.table.rows.map((row, i) => (
						<TableRow key={i} selected={i + 1 === level}>
							{row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
