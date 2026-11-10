// Spells that a custom magic item lets its carrier cast (2014), whatever their class: a bracelet that casts Shield a number of times
// equal to the proficiency bonus, a staff with Fireball. They come from the item's `spells` list:
//   item.spells  [{ name, level, ability, uses }]
//     name     a 2014 spell
//     level    the level it is cast at (empty: the spell's own level); a higher level makes upcast spells bigger
//     ability  the ability its save DC and spell attack use: 'str'..'cha' (empty: the carrier's own spellcasting ability, if they have one)
//     uses     { max: number | null, perProficiency: bool, on: 'Short rest' | 'Long rest' | 'Dawn' } (none: no limit, cast at will)
// Casting one never spends a spell slot; it spends one of the spell's own uses. An item that needs attunement works only while attuned.
import { getAttunedNames, getCustomGear, getOwnedItems } from './equipment';
import { getSpellRecord } from './spells2014';

export const itemSpellKey = (item, spell) => `${item.name}::spell::${spell.name}`;

// The names of the items carried: given (the sheet's inventory), or what the character owns.
const carriedNames = (character, carried) => carried || new Set(getOwnedItems(character).filter((i) => i.quantity > 0).map((i) => i.name));

// Every spell the carried items grant, as spell records with what the sheet needs to cast it:
// [{ ...spell record, level, castLevel, fromItem, itemSpell, uses, ability, active }]
//   level is the spell's own level (where it is listed); castLevel is the level it is cast at; active is false while an item that
//   needs attunement is not attuned.
export function getItemSpells(character, carried) {
	if (character.edition !== '2014') return [];
	const have = carriedNames(character, carried);
	const attuned = getAttunedNames(character, have);
	const out = [];
	getCustomGear(character).filter((item) => have.has(item.name) && Array.isArray(item.spells)).forEach((item) => {
		item.spells.forEach((grant) => {
			const record = getSpellRecord(grant.name);
			if (!record) return;
			const castLevel = Math.max(record.level, Math.floor(Number(grant.level)) || record.level);
			out.push({
				...record,
				castLevel,
				fromItem: item.name,
				itemSpell: grant,
				uses: grant.uses || null,
				ability: grant.ability || '',
				active: !item.attunement || attuned.includes(item.name),
			});
		});
	});
	return out;
}
