import { isRichEmpty, normalizeEditorHtml, normalizeRichText, richToHtml, richToPlain, sanitizeHtml } from './richText';

describe('sanitizeHtml', () => {
	test('keeps the formatting the editor writes', () => {
		const html = '<p>A <strong>bold</strong>, <em>italic</em>, <u>underlined</u> and <s>struck</s> line</p><ul><li>one</li><li>two</li></ul><ol><li>first</li></ol>';
		expect(sanitizeHtml(html)).toBe(html);
	});

	test('removes scripts, attributes, links and event handlers', () => {
		const out = sanitizeHtml('<p onclick="x()" style="color:red">Hi <a href="javascript:alert(1)">link</a><script>alert(1)</script><img src=x onerror=alert(1)></p>');
		expect(out).toBe('<p>Hi link</p>');
	});

	test('turns b and i into strong and em, and divs into paragraphs', () => {
		expect(sanitizeHtml('<div><b>a</b> <i>b</i></div><div>second</div>')).toBe('<p><strong>a</strong> <em>b</em></p><p>second</p>');
	});

	test('wraps loose text in a paragraph and escapes it', () => {
		expect(sanitizeHtml('1 &lt; 2 &amp; 3')).toBe('<p>1 &lt; 2 &amp; 3</p>');
	});

	test('keeps nested lists and drops blank paragraphs at the ends', () => {
		expect(sanitizeHtml('<div><br></div><ul><li>a<ul><li>b</li></ul></li></ul><div><br></div>')).toBe('<ul><li>a<ul><li>b</li></ul></li></ul>');
	});

	test('an indented item (a list directly inside a list) goes inside the item before it', () => {
		expect(sanitizeHtml('<ul><li>a</li><ul><li>b</li><li>c</li></ul><li>d</li></ul>')).toBe('<ul><li>a<ul><li>b</li><li>c</li></ul></li><li>d</li></ul>');
		expect(sanitizeHtml('<ul><ul><li>b</li></ul></ul>')).toBe('<ul><li><ul><li>b</li></ul></li></ul>');
	});

	test('turns headings into bold paragraphs', () => {
		expect(sanitizeHtml('<h2>Title</h2><p>text</p>')).toBe('<p><strong>Title</strong></p><p>text</p>');
	});
});

describe('plain text from before the editor', () => {
	test('shows as paragraphs and line breaks', () => {
		expect(richToHtml('One line\nsame paragraph\n\nNew paragraph')).toBe('<p>One line<br>same paragraph</p><p>New paragraph</p>');
	});

	test('is escaped, not treated as markup', () => {
		expect(richToHtml('a < b and <script>x</script>')).toBe('<p>a &lt; b and &lt;script&gt;x&lt;/script&gt;</p>');
	});

	test('is kept as it is for the printed sheet', () => {
		expect(richToPlain('Line one\nLine two')).toBe('Line one\nLine two');
	});
});

describe('richToPlain', () => {
	test('lays out paragraphs and lists as text', () => {
		expect(richToPlain('<p>Intro</p><ul><li>one</li><li>two</li></ul><ol><li>first</li><li>second</li></ol>')).toBe('Intro\n• one\n• two\n1. first\n2. second');
	});
});

describe('empty descriptions', () => {
	test('an editor with nothing in it stores nothing', () => {
		expect(normalizeEditorHtml('<div><br></div>')).toBe('');
		expect(normalizeEditorHtml('')).toBe('');
		expect(normalizeRichText('   ')).toBe('');
		expect(isRichEmpty('<p></p>')).toBe(true);
	});

	test('a description with text is stored as safe html', () => {
		expect(normalizeRichText('Plain\ntext')).toBe('<p>Plain<br>text</p>');
		expect(normalizeEditorHtml('hello <b>there</b>')).toBe('<p>hello <strong>there</strong></p>');
	});
});
