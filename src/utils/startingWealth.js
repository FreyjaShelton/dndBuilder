import { getClass } from './characterCalc';

// 2014 classes list dice ("5d4 x 10", Monk "5d4"); 2024 classes list fixed amounts inside their equipment
// options ("(B) 75 GP"). Returns { kind: 'dice', count, sides, multiplier, average } | { kind: 'fixed', gold } | null.
export function getStartingWealth(character) {
	const cls = getClass(character);
	if (!cls) return null;
	const dice = String(cls.startingGold || '').match(/(\d+)\s*d\s*(\d+)(?:\s*[x×*]\s*(\d+))?/i);
	if (dice) {
		const count = Number(dice[1]);
		const sides = Number(dice[2]);
		const multiplier = dice[3] ? Number(dice[3]) : 1;
		return { kind: 'dice', count, sides, multiplier, average: Math.round((count * (sides + 1) / 2) * multiplier), text: `${count}d${sides}${dice[3] ? ` × ${multiplier}` : ''} gp` };
	}
	const fixed = (cls.startingEquipment || []).map((l) => String(l).match(/^\(\w\)\s*(\d+)\s*GP$/i)).find(Boolean);
	if (fixed) return { kind: 'fixed', gold: Number(fixed[1]), average: Number(fixed[1]), text: `${fixed[1]} gp` };
	return null;
}

export function rollStartingWealth(wealth) {
	if (!wealth || wealth.kind !== 'dice') return wealth ? wealth.gold : 0;
	let total = 0;
	for (let i = 0; i < wealth.count; i += 1) total += Math.floor(Math.random() * wealth.sides) + 1;
	return total * wealth.multiplier;
}

