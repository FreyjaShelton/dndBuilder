// The "starting kit": the equipment a class and background hand out instead of starting gold.
// The class and background text is parsed into rows. A row is either fixed ("an explorer's pack and four javelins")
// or a choice between options ("(a) a rapier or (b) a longsword"). Items are matched to the item catalog;
// open picks ("any martial weapon", "a holy symbol") become dropdowns, and anything unmatched stays as a custom item.
//
// character.equipment.kit = { choices: { [rowId]: optionKey }, picks: { [pickId]: itemName } }
import { getEditionData } from '../data';
import { getItemIndex } from './itemIndex';

const NUMBERS = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const toNumber = (w) => NUMBERS[String(w).toLowerCase()] || Number(w) || 1;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const norm = (s) => String(s || '').toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim();

// scraped text carries stray markers ("quill Weight:0", "vestments:0")
const tidy = (s) => String(s || '')
	.replace(/[‘’]/g, "'")
	.replace(/\s*Weight:\s*[\d.]+/gi, '')
	.replace(/\s*Value:\s*[\d.,]+\s*[a-z]+/gi, '')
	.replace(/(\w):\d+\b/g, '$1')
	.replace(/\s*\(if proficient\)/gi, '')
	.replace(/\s+\)/g, ')')
	.replace(/\s+/g, ' ')
	.replace(/^[\s,;]+|[\s,;.]+$/g, '');

// Splits at the separators that sit outside parentheses.
function splitTop(rawText, separators) {
	const text = String(rawText).replace(/[ \s]+/g, ' ');
	const parts = [];
	let depth = 0;
	let current = '';
	for (let i = 0; i < text.length; i += 1) {
		const ch = text[i];
		if (ch === '(') depth += 1;
		if (ch === ')') depth = Math.max(0, depth - 1);
		if (depth === 0) {
			const hit = separators.find((s) => text.slice(i, i + s.length).toLowerCase() === s);
			if (hit) { parts.push(current); current = ''; i += hit.length - 1; continue; }
		}
		current += ch;
	}
	parts.push(current);
	return parts.map((p) => p.trim().replace(/^(?:and|or)\s+/i, '')).filter(Boolean);
}

// ---- open picks ---------------------------------------------------------------------------------------------

const FOCUS = {
	'holy symbol': ['Amulet', 'Emblem', 'Reliquary'],
	'arcane focus': ['Crystal', 'Orb', 'Rod', 'Staff', 'Wand'],
	'druidic focus': ['Sprig of Mistletoe', 'Totem', 'Wooden Staff', 'Yew Wand'],
};

// Names an open pick can be filled with, for a pick key like 'weapon:Martial:Melee', 'holy symbol', 'instrument'.
export function getPickOptions(edition, key) {
	const { all, byName } = getItemIndex(edition);
	if (key.startsWith('weapon:')) {
		const [, category, kind] = key.split(':');
		return all.filter((i) => i.group === 'Weapons' && i.category === category && (!kind || i.kind === kind)).map((i) => i.name);
	}
	if (FOCUS[key]) return FOCUS[key].filter((n) => byName.has(n));
	const groups = { instrument: ['Musical Instruments'], artisan: ["Artisan's Tools"], gaming: ['Gaming Sets'], 'artisan+instrument': ["Artisan's Tools", 'Musical Instruments'] }[key] || [];
	return all.filter((i) => groups.includes(i.group)).map((i) => i.name);
}

function matchPick(lower) {
	let m = lower.match(/^(?:any )?(?:other )?(simple|martial)(?: (melee|ranged))? weapons?$/);
	if (m) return { key: `weapon:${cap(m[1])}:${m[2] ? cap(m[2]) : ''}`, label: `${cap(m[1])}${m[2] ? ` ${m[2]}` : ''} weapon` };
	if (FOCUS[lower]) return { key: lower, label: cap(lower) };
	if (/^(?:any other )?musical instrument(?: of your choice)?$/.test(lower)) return { key: 'instrument', label: 'Musical instrument' };
	if (/^artisan's tools or musical instrument/.test(lower)) return { key: 'artisan+instrument', label: "Artisan's tools or musical instrument" };
	if (/^artisan's tools(?: of your choice)?$/.test(lower)) return { key: 'artisan', label: "Artisan's tools" };
	if (/^gaming set/.test(lower)) return { key: 'gaming', label: 'Gaming set' };
	return null;
}

// ---- catalog lookup -----------------------------------------------------------------------------------------

const ALIASES = { 'wooden shield': 'Shield', staff: 'Quarterstaff' };

function lookup(edition, name) {
	const { all, byName } = getItemIndex(edition);
	const n = norm(name);
	if (ALIASES[n] && byName.has(ALIASES[n])) return byName.get(ALIASES[n]);
	const variants = [n, n.replace(/ies$/, 'y'), n.replace(/es$/, ''), n.replace(/s$/, '')];
	for (const v of variants) {
		const hit = all.find((i) => norm(i.name) === v) || all.find((i) => norm(i.name).startsWith(`${v} (`));
		if (hit) return hit;
	}
	return null;
}

function findAmmo(edition, kind, count) {
	const lists = {
		arrow: ['Arrows (20)'], bolt: ['Crossbow Bolts (20)', 'Bolts (20)'], 'sling bullet': ['Sling Bullets (20)'], needle: ['Blowgun Needles (50)', 'Needles (50)'],
	};
	const key = Object.keys(lists).find((k) => kind.startsWith(k));
	const { byName } = getItemIndex(edition);
	const name = (lists[key] || []).find((n) => byName.has(n));
	if (!name) return [{ custom: `${cap(kind)}`, quantity: count }];
	const size = Number(name.match(/\((\d+)\)/)[1]);
	return [{ name, quantity: Math.max(1, Math.ceil(count / size)) }];
}

// One piece of equipment text -> { items: [spec], gold }. A spec is { name, quantity } (catalog item),
// { custom, quantity } (named only) or { pick, label, quantity } (a dropdown to fill in).
export function parseClause(raw, edition) {
	let t = tidy(raw).replace(/^(?:and|or)\s+/i, '');
	if (!t) return { items: [], gold: 0 };
	let m = t.match(/^(?:(?:a|an)\s+)?(?:(?:belt )?pouch|purse)?\s*(?:containing\s+)?(\d+)\s*gp$/i);
	if (m) return { items: [], gold: Number(m[1]) };

	// "50 feet of silk rope" is one coil of rope, not fifty of something
	m = t.match(/^(\d+)[- ]f(?:ee|oo)t of (.*)$/i);
	if (m) {
		const coil = lookup(edition, `${m[2]} (${m[1]} feet)`);
		return { items: [coil ? { name: coil.name, quantity: 1 } : { custom: cap(t), quantity: 1 }], gold: 0 };
	}

	let quantity = 1;
	m = t.match(/^(a|an|one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(.*)$/i);
	if (m) { quantity = toNumber(m[1]); t = m[2]; }
	t = t.replace(/^(?:sets?|pairs?) of\s+/i, '').replace(/\s*\((?:one )?of your choice\)/i, '').trim();

	let lower = norm(t);
	m = lower.match(/^quiver of (\w+) (arrows|bolts)/);
	if (m) return { items: [...[lookup(edition, 'quiver') ? { name: lookup(edition, 'quiver').name, quantity: 1 } : { custom: 'Quiver', quantity: 1 }], ...findAmmo(edition, m[2].replace(/s$/, ''), toNumber(m[1]))], gold: 0 };
	m = lower.match(/^(arrows?|bolts?|crossbow bolts?|sling bullets?|needles?)(?:\s*\((\d+)\))?$/);
	if (m) return { items: findAmmo(edition, m[1].replace(/s$/, '').replace('crossbow ', ''), toNumber(m[2] || quantity)), gold: 0 };

	// "Item (detail)": the detail is a quantity ("10 sheets"), the real item ("Arcane Focus (crystal)") or just a note
	let base = t;
	const pm = t.match(/^(.*?)\s*\((.*)\)$/);
	if (pm) {
		base = pm[1];
		const sheets = pm[2].match(/^(\d+)\s+sheets?$/i);
		if (sheets) quantity *= Number(sheets[1]);
		const inner = lookup(edition, pm[2]);
		if (inner && !lookup(edition, base)) return { items: [{ name: inner.name, quantity }], gold: 0 };
	}
	lower = norm(base);
	const pick = matchPick(lower);
	if (pick) return { items: [{ pick: pick.key, label: pick.label, quantity }], gold: 0 };
	const item = lookup(edition, base);
	if (item) return { items: [{ name: item.name, quantity }], gold: 0 };
	return { items: [{ custom: cap(t), quantity }], gold: 0 };
}

function parseList(text, edition) {
	const items = [];
	let gold = 0;
	splitTop(text, [',', ' and ']).forEach((clause) => {
		const r = parseClause(clause, edition);
		items.push(...r.items);
		gold += r.gold;
	});
	return { items, gold };
}

// ---- the plan: rows of fixed items and choices ------------------------------------------------------------------

// A row with nothing to show (just coins, like "a pouch containing 15 gp") is hidden but still counts toward the gold.
const row = (id, title, options) => ({ id, title, kind: options.length > 1 ? 'choice' : 'fixed', options, hidden: options.every((o) => o.items.length === 0) });
const option = (key, label, text, edition) => ({ key, label, ...parseList(text, edition) });

function classRows(cls, edition) {
	const lines = cls.startingEquipment || [];
	if (edition === '2024') {
		const opts = lines.map((l) => l.match(/^\(([A-Z])\)\s*(.*)$/)).filter(Boolean)
			.filter((m) => !/^\d+\s*GP$/i.test(m[2].trim()))
			.map((m) => option(m[1], m[2].replace(/,?\s*and\s+\d+\s*GP$/i, ''), m[2], edition));
		return opts.length ? [row('class', 'Class equipment', opts)] : [];
	}
	return lines.map((line, i) => {
		const marks = [...line.matchAll(/\(([a-z])\)\s*/gi)];
		if (marks.length < 2) return row(`class${i}`, 'Class equipment', [option('x', tidy(line), line, edition)]);
		const opts = marks.map((mk, j) => {
			const text = line.slice(mk.index + mk[0].length, j + 1 < marks.length ? marks[j + 1].index : line.length).replace(/[,;]?\s*(?:\bor\b)?\s*$/i, '');
			return option(mk[1].toLowerCase(), tidy(text), text, edition);
		});
		return row(`class${i}`, 'Class equipment', opts);
	});
}

function backgroundRows(bg, edition) {
	if (!bg) return [];
	if (edition === '2024') {
		const text = bg.equipmentOptions?.A;
		return text ? [row('bg', 'Background equipment', [option('A', tidy(text), text, edition)])] : [];
	}
	if (!bg.equipment) return [];
	return splitTop(bg.equipment, [',']).map((clause, i) => {
		const alts = /such as|stuffed full/i.test(clause) ? [clause] : splitTop(clause, [' or ']);
		if (alts.length > 1) return row(`bg${i}`, 'Background equipment', alts.map((a, j) => option(String.fromCharCode(97 + j), tidy(a), a, edition)));
		return row(`bg${i}`, 'Background equipment', [option('x', tidy(clause), clause, edition)]);
	});
}

const plans = new Map();

// { class: rows, background: rows, backgroundGold } for the character's edition, class and background.
export function getKitPlan(character) {
	const edition = character.edition;
	const data = getEditionData(edition);
	const cls = data.classes[character.classInfo?.className];
	const bg = data.backgrounds[character.background?.name];
	const key = `${edition}|${cls?.name || ''}|${bg?.name || ''}`;
	if (!plans.has(key)) {
		plans.set(key, {
			class: cls ? classRows(cls, edition) : [],
			background: backgroundRows(bg, edition),
			backgroundGold: edition === '2014' ? bg?.gold || 0 : 0,
		});
	}
	return plans.get(key);
}

const allRows = (plan) => [...plan.class, ...plan.background];

export const getKitState = (character) => character.equipment?.kit || { choices: {}, picks: {} };

export function getSelectedOption(character, kitRow) {
	const chosen = getKitState(character).choices?.[kitRow.id];
	return kitRow.options.find((o) => o.key === chosen) || kitRow.options[0];
}

export const pickId = (kitRow, opt, specIndex, slot) => `${kitRow.id}:${opt.key}:${specIndex}:${slot}`;

// The coins that come with the kit: the background's purse (2014) or the gold listed with the chosen class and background kit.
export function getKitGold(character) {
	const plan = getKitPlan(character);
	const fromRows = allRows(plan).reduce((sum, r) => sum + (getSelectedOption(character, r)?.gold || 0), 0);
	const bgRowsGold = plan.background.reduce((sum, r) => sum + (getSelectedOption(character, r)?.gold || 0), 0);
	return bgRowsGold === 0 && plan.backgroundGold ? fromRows + plan.backgroundGold : fromRows;
}

// Open picks that have no item chosen yet.
export function getKitPending(character) {
	const picks = getKitState(character).picks || {};
	let pending = 0;
	allRows(getKitPlan(character)).forEach((r) => {
		const opt = getSelectedOption(character, r);
		opt.items.forEach((spec, si) => {
			if (spec.pick) for (let slot = 0; slot < spec.quantity; slot += 1) if (!picks[pickId(r, opt, si, slot)]) pending += 1;
		});
	});
	return pending;
}

// The items the kit gives, resolved against the catalog: [{ ...item, quantity, fromKit: true }].
export function getKitItems(character) {
	if (character.equipment?.goldMethod !== 'kit') return [];
	const { byName } = getItemIndex(character.edition);
	const picks = getKitState(character).picks || {};
	const merged = new Map();
	const add = (key, entry) => {
		if (merged.has(key)) merged.get(key).quantity += entry.quantity;
		else merged.set(key, entry);
	};
	allRows(getKitPlan(character)).forEach((r) => {
		const opt = getSelectedOption(character, r);
		opt.items.forEach((spec, si) => {
			if (spec.pick) {
				for (let slot = 0; slot < spec.quantity; slot += 1) {
					const name = picks[pickId(r, opt, si, slot)];
					if (name && byName.has(name)) add(name, { ...byName.get(name), quantity: 1, fromKit: true });
				}
			} else if (spec.name) {
				add(spec.name, { ...byName.get(spec.name), quantity: spec.quantity, fromKit: true });
			} else {
				add(`custom:${spec.custom}`, { name: spec.custom, group: 'Kit item', cost: '', weight: 0, quantity: spec.quantity, custom: true, fromKit: true });
			}
		});
	});
	return [...merged.values()];
}
