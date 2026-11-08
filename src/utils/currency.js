// Values are tracked in gold pieces; one gp is worth 10 sp or 100 cp.
const GOLD_PER_UNIT = { pp: 10, gp: 1, ep: 0.5, sp: 0.1, cp: 0.01 };

// "15 gp" -> 15, "5 sp" -> 0.5, "" -> 0
export function parseCostToGold(cost) {
	if (!cost) return 0;
	const match = String(cost).trim().match(/^([\d,]*\.?\d+)\s*(pp|gp|ep|sp|cp)$/i);
	if (!match) return 0;
	return Number(match[1].replace(/,/g, '')) * GOLD_PER_UNIT[match[2].toLowerCase()];
}

const round2 = (value) => Math.round(value * 100) / 100;

export function formatGold(value) {
	if (value === '' || value === null || value === undefined || Number.isNaN(Number(value))) return '';
	return `${round2(Number(value))} gp`;
}

// 12.35 gp -> { gp: 12, sp: 3, cp: 5 }
export function splitGold(value) {
	const total = Math.max(0, Math.round((Number(value) || 0) * 100));
	return { gp: Math.floor(total / 100), sp: Math.floor((total % 100) / 10), cp: total % 10 };
}
