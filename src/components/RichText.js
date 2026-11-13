import * as React from 'react';
import { Box } from '@mui/material';
import { richToHtml } from '../utils/richText';

// How rich text looks, shared by the editor and the places that show a description.
export const RICH_TEXT_SX = {
	'& p': { margin: 0, marginBottom: '0.6em' },
	'& p:last-child': { marginBottom: 0 },
	'& ul, & ol': { margin: 0, marginBottom: '0.6em', paddingLeft: '1.5em' },
	'& ul:last-child, & ol:last-child': { marginBottom: 0 },
	'& li > ul, & li > ol': { marginTop: '0.25em', marginBottom: 0 },
};

// A custom item's description (rich text, or plain text from before the editor): shown with its bold, italics, underline and lists.
// The HTML is cleaned by richToHtml first (only a few tags and no attributes get through), so it is safe to put on the page.
export default function RichText({ value, sx, ...rest }) {
	const html = React.useMemo(() => richToHtml(value), [value]);
	if (!html) return null;
	return (
		<Box
			component="div"
			{...rest}
			sx={{ typography: 'body2', whiteSpace: 'normal', overflowWrap: 'anywhere', ...RICH_TEXT_SX, ...sx }}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
