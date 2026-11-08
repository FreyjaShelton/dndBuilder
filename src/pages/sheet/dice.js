export const rollDie = (sides) => 1 + Math.floor(Math.random() * sides);

// Parses "2d6+3", "1d8 - 1", "d20", or a plain number. Anything after the expression (e.g. a
// damage type) is ignored.
export function parseDice(expr) {
	const text = String(expr || '').trim();
	const m = text.match(/^(\d*)d(\d+)\s*(?:([+-])\s*(\d+))?/i);
	if (m) {
		return {
			count: m[1] === '' ? 1 : Number(m[1]),
			sides: Number(m[2]),
			mod: m[3] ? (m[3] === '-' ? -1 : 1) * Number(m[4]) : 0,
		};
	}
	const n = text.match(/^([+-]?\d+)/);
	return n ? { count: 0, sides: 0, mod: Number(n[1]) } : null;
}

export function rollExpression(expr, { crit = false } = {}) {
	const p = parseDice(expr);
	if (!p) return null;
	const count = crit ? p.count * 2 : p.count;
	const rolls = Array.from({ length: count }, () => rollDie(p.sides));
	const total = rolls.reduce((a, b) => a + b, 0) + p.mod;
	return { rolls, mod: p.mod, total, sides: p.sides };
}

// d20 roll with a flat bonus; mode is 'normal' | 'advantage' | 'disadvantage'.
export function rollD20(bonus, mode = 'normal') {
	const first = rollDie(20);
	const second = mode === 'normal' ? null : rollDie(20);
	const kept = second === null ? first : mode === 'advantage' ? Math.max(first, second) : Math.min(first, second);
	return {
		rolls: second === null ? [first] : [first, second],
		kept,
		bonus,
		total: kept + bonus,
		mode,
		natural20: kept === 20,
		natural1: kept === 1,
	};
}

export const signed = (n) => (n >= 0 ? `+${n}` : `${n}`);

export function describeD20(r) {
	const dice = r.mode === 'normal' ? `d20(${r.kept})` : `d20(${r.rolls.join(', ')}) keep ${r.kept}`;
	return `${dice} ${signed(r.bonus)}`;
}
