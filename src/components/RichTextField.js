import * as React from 'react';
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import { RICH_TEXT_SX } from './RichText';
import { normalizeEditorHtml, richToHtml, sanitizeHtml } from '../utils/richText';

const BUTTONS = [
	{ command: 'bold', label: 'Bold', Icon: FormatBoldIcon },
	{ command: 'italic', label: 'Italic', Icon: FormatItalicIcon },
	{ command: 'underline', label: 'Underline', Icon: FormatUnderlinedIcon },
	{ command: 'strikeThrough', label: 'Strikethrough', Icon: StrikethroughSIcon },
	{ divider: true },
	{ command: 'insertUnorderedList', label: 'Bulleted list', Icon: FormatListBulletedIcon },
	{ command: 'insertOrderedList', label: 'Numbered list', Icon: FormatListNumberedIcon },
	{ divider: true },
	{ command: 'removeFormat', label: 'Clear formatting', Icon: FormatClearIcon },
];

// A text box with a formatting toolbar (bold, italic, underline, strikethrough, bulleted and numbered lists). The value it holds
// and reports is a small piece of safe HTML (see utils/richText.js), or '' when empty. A value that is plain text (a description
// written before this editor) is shown as paragraphs and becomes rich text the first time it is edited.
export default function RichTextField({ label, value, onChange, minRows = 3, maxHeight = 260, placeholder = '' }) {
	const ref = React.useRef(null);
	const sent = React.useRef(null); // the last value this editor reported: a different `value` came from outside and replaces the content
	const [active, setActive] = React.useState({});
	const [focused, setFocused] = React.useState(false);

	React.useLayoutEffect(() => {
		if (!ref.current || value === sent.current) return;
		ref.current.innerHTML = richToHtml(value);
		sent.current = value;
	}, [value]);

	const readActive = React.useCallback(() => {
		const selection = window.getSelection();
		if (!ref.current || !selection || !selection.anchorNode || !ref.current.contains(selection.anchorNode)) return;
		const next = {};
		BUTTONS.forEach((b) => { if (b.command && b.command !== 'removeFormat') { try { next[b.command] = document.queryCommandState(b.command); } catch (e) { /* not supported */ } } });
		setActive(next);
	}, []);

	React.useEffect(() => {
		document.addEventListener('selectionchange', readActive);
		return () => document.removeEventListener('selectionchange', readActive);
	}, [readActive]);

	const emit = () => {
		if (!ref.current) return;
		const next = normalizeEditorHtml(ref.current.innerHTML);
		sent.current = next;
		onChange(next);
	};

	const run = (command) => {
		if (!ref.current) return;
		ref.current.focus();
		document.execCommand(command, false, null);
		emit();
		readActive();
	};

	// In a list, Tab indents the item one level (Shift+Tab brings it back) instead of moving on to the next field. Anywhere else Tab
	// still moves on, so the keyboard is never trapped in the box.
	const keyDown = (e) => {
		if (e.key !== 'Tab' || e.ctrlKey || e.altKey || e.metaKey) return;
		const anchor = window.getSelection()?.anchorNode;
		const node = anchor && anchor.nodeType === 3 ? anchor.parentNode : anchor;
		if (!node || !ref.current?.contains(node) || !node.closest('li')) return;
		e.preventDefault();
		document.execCommand(e.shiftKey ? 'outdent' : 'indent', false, null);
		emit();
	};

	// Pasted text keeps its bold, italics and lists but nothing else (no colors, fonts or links).
	const paste = (e) => {
		e.preventDefault();
		const html = e.clipboardData.getData('text/html');
		const text = e.clipboardData.getData('text/plain');
		document.execCommand('insertHTML', false, html ? sanitizeHtml(html) : richToHtml(text));
		emit();
	};

	return (
		<Box>
			{label && <Typography variant="caption" sx={{ color: focused ? 'primary.main' : 'text.secondary', display: 'block', marginBottom: 0.5 }}>{label}</Typography>}
			<Box sx={{ border: 1, borderColor: focused ? 'primary.main' : 'rgba(255, 255, 255, 0.23)', borderRadius: 1, overflow: 'hidden' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.25, padding: 0.5, borderBottom: 1, borderColor: 'divider' }} role="toolbar" aria-label={`${label || 'Text'} formatting`}>
					{BUTTONS.map((b, i) => (b.divider
						? <Divider key={`d${i}`} orientation="vertical" flexItem sx={{ marginX: 0.5 }} />
						: (
							<Tooltip key={b.command} title={b.label}>
								<IconButton
									size="small"
									aria-label={b.label}
									aria-pressed={!!active[b.command]}
									// keep the selection in the text while the button is pressed
									onMouseDown={(e) => e.preventDefault()}
									onClick={() => run(b.command)}
									sx={{ borderRadius: 1, backgroundColor: active[b.command] ? 'action.selected' : 'transparent' }}
								>
									<b.Icon fontSize="small" />
								</IconButton>
							</Tooltip>
						)))}
				</Box>
				<Box
					ref={ref}
					role="textbox"
					aria-multiline="true"
					aria-label={label || 'Text'}
					contentEditable
					suppressContentEditableWarning
					data-placeholder={placeholder}
					onInput={emit}
					onPaste={paste}
					onKeyDown={keyDown}
					onFocus={() => { setFocused(true); try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) { /* ignore */ } }}
					onBlur={() => setFocused(false)}
					sx={{
						typography: 'body2', padding: '8px 12px', minHeight: `${minRows * 1.43 + 1}em`, maxHeight, overflowY: 'auto', outline: 'none', overflowWrap: 'anywhere',
						...RICH_TEXT_SX,
						'&:empty::before': { content: 'attr(data-placeholder)', color: 'text.disabled', pointerEvents: 'none' },
					}}
				/>
			</Box>
		</Box>
	);
}
