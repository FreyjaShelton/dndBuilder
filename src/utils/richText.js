// Rich text for the descriptions of custom items (the item's description and what each of its abilities does).
//
// A description is stored as a small, safe piece of HTML: paragraphs (<p>), line breaks (<br>), <strong>, <em>, <u>, <s>, and bulleted
// or numbered lists (<ul>, <ol>, <li>), with no attributes at all. Descriptions written before the editor existed are plain text
// (with line breaks), and every function here accepts those too, so nothing saved earlier needs converting.
//
// Descriptions also arrive from outside the app (an imported item file, a character downloaded from Google Drive, text pasted into the
// editor), so anything that is shown goes through sanitizeHtml first: only the tags above survive, and no attribute does.

const escapeHtml = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Does the text start with one of the tags the editor writes? (Otherwise it is plain text.)
const RICH_START = /^\s*<(p|ul|ol|h[1-6]|div|strong|em|b|i|u|s|br)\b/i;
export const isRichText = (value) => RICH_START.test(String(value || ''));

// Tags that are kept in a line of text, under the tag they become.
const INLINE_TAGS = { STRONG: 'strong', B: 'strong', EM: 'em', I: 'em', U: 'u', S: 's', STRIKE: 's', DEL: 's' };
// Tags that hold whole lines or other blocks.
const CONTAINER_TAGS = new Set(['P', 'DIV', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'PRE', 'TABLE', 'TBODY', 'THEAD', 'TR', 'TD', 'TH', 'BODY', 'HTML', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'FIGURE', 'HEADER', 'FOOTER', 'MAIN', 'ASIDE', 'NAV']);
const HEADINGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
const LISTS = { UL: 'ul', OL: 'ol' };
// Tags dropped together with everything inside them.
const DROPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'EMBED', 'HEAD', 'TITLE', 'META', 'LINK', 'SVG', 'MATH', 'TEXTAREA', 'SELECT', 'BUTTON', 'INPUT']);

const isListOrContainer = (node) => node.nodeType === 1 && (LISTS[node.nodeName] || CONTAINER_TAGS.has(node.nodeName));

// The inside of a line: text and the inline tags, anything else unwrapped.
function inlineHtml(node) {
	if (node.nodeType === 3) return escapeHtml(node.data);
	if (node.nodeType !== 1 || DROPPED_TAGS.has(node.nodeName)) return '';
	if (node.nodeName === 'BR') return '<br>';
	const inside = Array.from(node.childNodes).map(inlineHtml).join('');
	const tag = INLINE_TAGS[node.nodeName];
	if (tag) return inside.trim() ? `<${tag}>${inside}</${tag}>` : inside;
	// a block met inside a line (a paragraph inside a pasted <b>...): its text goes on, ended by a line break
	return isListOrContainer(node) && inside ? `${inside}<br>` : inside;
}

// One list item: its text, and any list nested in it.
function listItemHtml(li) {
	let out = '';
	Array.from(li.childNodes).forEach((child) => {
		if (child.nodeType === 1 && LISTS[child.nodeName]) out += listHtml(child);
		else out += inlineHtml(child);
	});
	return out.replace(/(<br>)+$/, '');
}

function listHtml(list) {
	const tag = LISTS[list.nodeName];
	const items = [];
	Array.from(list.childNodes).forEach((child) => {
		if (child.nodeType === 1 && child.nodeName === 'LI') items.push(`<li>${listItemHtml(child)}</li>`);
		else if (child.nodeType === 1 && LISTS[child.nodeName]) {
			// a list placed straight inside a list (what the browser makes when an item is indented) belongs to the item before it
			const nested = listHtml(child);
			if (nested && items.length) items[items.length - 1] = items[items.length - 1].replace(/<\/li>$/, `${nested}</li>`);
			else if (nested) items.push(`<li>${nested}</li>`);
		}
	});
	return items.length ? `<${tag}>${items.join('')}</${tag}>` : '';
}

// The blocks inside a node: runs of text become paragraphs, lists stay lists, containers are looked into.
function blocksHtml(parent, bold) {
	const out = [];
	let run = '';
	const flush = () => {
		// a line with only a line break in it is a blank line the writer left; a break at the end of a line of text is nothing
		const hasText = run.replace(/<br>/g, '').trim() !== '';
		if (hasText || /<br>/.test(run)) {
			const text = hasText ? run.replace(/(<br>)+$/, '') : '<br>';
			out.push(`<p>${bold && hasText ? `<strong>${text}</strong>` : text}</p>`);
		}
		run = '';
	};
	Array.from(parent.childNodes).forEach((child) => {
		if (child.nodeType === 1 && LISTS[child.nodeName]) { flush(); out.push(listHtml(child)); }
		else if (child.nodeType === 1 && CONTAINER_TAGS.has(child.nodeName) && !DROPPED_TAGS.has(child.nodeName)) { flush(); out.push(blocksHtml(child, bold || HEADINGS.has(child.nodeName))); }
		else run += inlineHtml(child);
	});
	flush();
	return out.join('');
}

// The safe version of any HTML (see the top of this file).
export function sanitizeHtml(html) {
	const text = String(html || '');
	if (!text.trim()) return '';
	const doc = new DOMParser().parseFromString(`<body>${text}</body>`, 'text/html');
	let out = blocksHtml(doc.body, false);
	// blank paragraphs at the start and the end are only left-over space
	const blank = '<p><br></p>';
	while (out.startsWith(blank)) out = out.slice(blank.length);
	while (out.endsWith(blank)) out = out.slice(0, -blank.length);
	return out;
}

// Plain text as HTML: blank lines separate paragraphs and single line breaks stay line breaks.
function plainToHtml(text) {
	return String(text).replace(/\r\n?/g, '\n').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
}

// The HTML to show for a stored description, plain or rich (always safe to put on the page).
export function richToHtml(value) {
	const text = String(value || '');
	if (!text.trim()) return '';
	return isRichText(text) ? sanitizeHtml(text) : plainToHtml(text);
}

// The text of a description with its layout kept in plain characters (paragraphs on their own lines, "• " before list items),
// for the printed sheet.
export function richToPlain(value) {
	const text = String(value || '');
	if (!text.trim()) return '';
	if (!isRichText(text)) return text.replace(/\r\n?/g, '\n').trim();
	const doc = new DOMParser().parseFromString(`<body>${sanitizeHtml(text)}</body>`, 'text/html');
	const lines = [];
	const inlineText = (node) => Array.from(node.childNodes).map((c) => {
		if (c.nodeType === 3) return c.data;
		if (c.nodeName === 'BR') return '\n';
		if (LISTS[c.nodeName]) return '';
		return inlineText(c);
	}).join('');
	const walkList = (list, depth) => {
		let n = 0;
		Array.from(list.children).forEach((li) => {
			n += 1;
			lines.push(`${'  '.repeat(depth)}${list.nodeName === 'OL' ? `${n}.` : '•'} ${inlineText(li).trim()}`);
			Array.from(li.children).filter((c) => LISTS[c.nodeName]).forEach((sub) => walkList(sub, depth + 1));
		});
	};
	Array.from(doc.body.children).forEach((block) => {
		if (LISTS[block.nodeName]) walkList(block, 0);
		else lines.push(inlineText(block).trim());
	});
	return lines.join('\n').trim();
}

// Is there nothing in the description but space (an editor left with an empty paragraph)?
export const isRichEmpty = (value) => !richToPlain(value).trim();

// What to store for a description (plain or rich): the safe HTML, or '' when it is empty.
export function normalizeRichText(value) {
	const clean = richToHtml(value);
	return isRichEmpty(clean) ? '' : clean;
}

// The same for the raw HTML of the editor's text box (always HTML, never plain text).
export function normalizeEditorHtml(html) {
	const clean = sanitizeHtml(html);
	return isRichEmpty(clean) ? '' : clean;
}
