// Hit point rolls. Level 1 always gives the maximum of the hit die; every later level adds either the
// fixed average (half the die + 1) or a rolled die, plus the Constitution modifier (at least 1 HP per level).
// classInfo.hpRolls[level - 2] holds the roll for that level, or null/missing to use the average for it.
// classInfo.hpOverride is a total typed in by hand (blank = use the calculated total).
export const averageHitDie = (die) => Math.floor(die / 2) + 1;

export const rollHitDie = (die) => Math.floor(Math.random() * die) + 1;

// One roll for each level from 2 up to `level`.
export const rollAllHitDice = (die, level) => Array.from({ length: Math.max(0, level - 1) }, () => rollHitDie(die));

// Keeps the rolls already made (for levels that still exist). New levels are rolled when every earlier level was
// rolled (the character is rolling for everything); otherwise they use the average like the levels before them.
export function fillHpRolls(rolls, die, level) {
	const kept = Array.isArray(rolls) ? rolls.slice(0, Math.max(0, level - 1)) : [];
	const missing = Math.max(0, level - 1 - kept.length);
	const allRolled = kept.every(Boolean);
	return [...kept, ...(allRolled ? rollAllHitDice(die, missing + 1).slice(0, missing) : Array.from({ length: missing }, () => null))];
}

// Rolls just one level (2..level), leaving every other level as it was (a level that was never rolled stays average).
export function rollOneLevel(rolls, die, level, target) {
	const next = Array.from({ length: Math.max(0, level - 1) }, (_, i) => (Array.isArray(rolls) && rolls[i]) || null);
	if (target >= 2 && target <= level) next[target - 2] = rollHitDie(die);
	return next;
}

// A total typed by hand, or null when the calculated total applies.
export function parseHpOverride(value) {
	if (value === undefined || value === null || value === '') return null;
	const n = Math.floor(Number(value));
	return Number.isFinite(n) && n >= 1 ? n : null;
}
