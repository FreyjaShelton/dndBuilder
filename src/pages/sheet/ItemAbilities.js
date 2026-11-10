import * as React from 'react';
import { Box, Button, Checkbox, Chip, Collapse, FormControlLabel, Typography } from '@mui/material';
import { MAX_ATTUNED, describeMagicItem, getAttunedNames, toggleAttunement } from '../../utils/equipment';
import { ABILITY_NAMES } from '../../utils/abilityScore';
import { itemSpellKey } from '../../utils/itemSpells';
import { abilityMaxUses, abilityUsesKey, chargesLeft, getItemActions, getMagicItems, itemSpellStats } from './itemCharges';

const HEADING_SX = { color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 1 };

export function Bubbles({ total, used, onChange, label }) {
	return (
		<Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
			{Array.from({ length: total }, (_, i) => {
				const available = i < total - used;
				return (
					<Box
						key={i}
						onClick={() => onChange(available ? used + 1 : used - 1)}
						role="checkbox"
						aria-checked={available}
						aria-label={`${label} ${i + 1}`}
						sx={{
							width: { xs: 26, sm: 18 }, height: { xs: 26, sm: 18 }, borderRadius: '50%', border: 2, borderColor: 'secondary.main', cursor: 'pointer',
							backgroundColor: available ? 'secondary.main' : 'transparent',
						}}
					/>
				);
			})}
		</Box>
	);
}

// One use of an item's ability: what it is, what it costs, its limited uses, and the button that spends them and rolls its dice.
function Ability({ item, ability, active, left, dc, prof, charges, setCharges, onUse }) {
	const cost = Number(ability.cost) || 0;
	const usesMax = abilityMaxUses(ability, prof);
	const usesUsed = usesMax === null ? 0 : Math.min(usesMax, Number(charges[abilityUsesKey(item, ability)]) || 0);
	const enough = active && (cost === 0 || left >= cost) && (usesMax === null || usesUsed < usesMax);
	const [open, setOpen] = React.useState(false);
	const save = ability.save ? `${ABILITY_NAMES[ability.save] ? ABILITY_NAMES[ability.save].slice(0, 3).toUpperCase() : ability.save} save${ability.dc ? ` DC ${ability.dc}` : dc ? ` DC ${dc}` : ''}` : '';
	return (
		<Box sx={{ borderTop: 1, borderColor: 'divider', padding: '8px 0', opacity: active ? 1 : 0.6 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Box sx={{ flex: '1 1 160px', minWidth: 0 }}>
					<Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>{ability.name}</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.name}</Typography>
				</Box>
				{!active && <Chip size="small" color="warning" variant="outlined" label="Needs attunement" />}
				{cost > 0 && <Chip size="small" variant="outlined" color={left >= cost ? 'secondary' : 'default'} label={`${cost} charge${cost === 1 ? '' : 's'}`} />}
				{ability.resource && <Chip size="small" variant="outlined" label={ability.resource} />}
				{save && <Chip size="small" variant="outlined" label={save} />}
				<Button size="small" variant="contained" disabled={!enough} onClick={() => onUse(item, ability)}>
					{ability.dice ? `Use (${ability.dice})` : 'Use'}
				</Button>
			</Box>
			{usesMax !== null && (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginTop: 0.5 }}>
					<Typography variant="caption" sx={{ minWidth: 90 }}>Uses {usesMax - usesUsed}/{usesMax}</Typography>
					<Bubbles total={usesMax} used={usesUsed} label={`${ability.name} use`} onChange={(u) => setCharges({ [abilityUsesKey(item, ability)]: Math.max(0, Math.min(usesMax, u)) })} />
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{ability.uses.perProficiency ? 'A number of times equal to your proficiency bonus' : ''}{ability.uses.on ? `${ability.uses.perProficiency ? ', r' : 'R'}esets after a ${ability.uses.on === 'Dawn' ? 'dawn' : ability.uses.on.toLowerCase()}` : ''}
					</Typography>
				</Box>
			)}
			{ability.description && (
				<>
					<Button size="small" onClick={() => setOpen((o) => !o)} sx={{ paddingX: 0.5, minWidth: 0 }}>{open ? 'Hide details' : 'Details'}</Button>
					<Collapse in={open} unmountOnExit>
						<Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}>{ability.description}</Typography>
					</Collapse>
				</>
			)}
		</Box>
	);
}

// A spell a magic item lets the character cast, among the actions: cast it with the spell's own uses (never a slot).
function SpellRow({ spell, d, charges, setCharges, onCast }) {
	const key = itemSpellKey({ name: spell.fromItem }, spell);
	const usesMax = abilityMaxUses(spell, d.prof);
	const usesUsed = usesMax === null ? 0 : Math.min(usesMax, Number(charges[key]) || 0);
	const ready = spell.active && (usesMax === null || usesUsed < usesMax);
	const stats = itemSpellStats(d, spell);
	const saveMatch = String(spell.description || '').match(/(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/);
	const [open, setOpen] = React.useState(false);
	return (
		<Box sx={{ borderTop: 1, borderColor: 'divider', padding: '8px 0', opacity: spell.active ? 1 : 0.6 }} data-testid="item-spell-row">
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
				<Box sx={{ flex: '1 1 160px', minWidth: 0 }}>
					<Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>{spell.name}</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{[spell.fromItem, spell.level === 0 ? 'Cantrip' : `Level ${spell.level} spell`, spell.castLevel > spell.level ? `cast at level ${spell.castLevel}` : ''].filter(Boolean).join(' · ')}
					</Typography>
				</Box>
				{!spell.active && <Chip size="small" color="warning" variant="outlined" label="Needs attunement" />}
				{spell.concentration && <Chip size="small" variant="outlined" label="Concentration" />}
				{saveMatch && stats && <Chip size="small" variant="outlined" label={`${saveMatch[1].slice(0, 3).toUpperCase()} save DC ${stats.saveDc}`} />}
				<Button size="small" variant="contained" disabled={!ready} onClick={() => onCast(spell)}>Cast</Button>
			</Box>
			{usesMax !== null && (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginTop: 0.5 }}>
					<Typography variant="caption" sx={{ minWidth: 90 }}>Uses {usesMax - usesUsed}/{usesMax}</Typography>
					<Bubbles total={usesMax} used={usesUsed} label={`${spell.name} use`} onChange={(u) => setCharges({ [key]: Math.max(0, Math.min(usesMax, u)) })} />
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{spell.uses.perProficiency ? 'A number of times equal to your proficiency bonus' : ''}{spell.uses.on ? `${spell.uses.perProficiency ? ', r' : 'R'}esets after a ${spell.uses.on === 'Dawn' ? 'dawn' : spell.uses.on.toLowerCase()}` : ''}
					</Typography>
				</Box>
			)}
			{spell.description && (
				<>
					<Button size="small" onClick={() => setOpen((o) => !o)} sx={{ paddingX: 0.5, minWidth: 0 }}>{open ? 'Hide details' : 'Details'}</Button>
					<Collapse in={open} unmountOnExit>
						<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>{spell.castingTime} · {spell.range} · {spell.components} · {spell.duration}</Typography>
						<Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}>{spell.description}</Typography>
						{spell.higherLevels && <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: 'text.secondary', marginTop: 0.5 }}>{spell.higherLevels}</Typography>}
					</Collapse>
				</>
			)}
		</Box>
	);
}

export const BONUS_TEXT = { ac: 'Armor Class', spellSaveDc: 'spell save DC', spellAttack: 'spell attack rolls', saves: 'saving throws' };
export const bonusText = (bonuses) => Object.entries(bonuses || {}).filter(([, v]) => Number(v)).map(([k, v]) => `${Number(v) > 0 ? '+' : ''}${v} ${BONUS_TEXT[k] || k}`).join(', ');

// The carried magic items' abilities, under the kind of action they are (Actions, Bonus actions, Reactions...), then each item's
// charges, attunement and bonuses. On the Actions tab.
export default function ItemAbilities({ character, play, setPlay, onUse, onCastSpell, spellSaveDc, prof, d }) {
	const entries = getMagicItems(character, play.items, play.charges);
	const [open, setOpen] = React.useState({});
	if (!entries.length) return null;
	const charges = play.charges || {};
	const setCharges = (patch) => setPlay({ charges: { ...charges, ...patch } });
	const carried = new Set((play.items || []).filter((i) => Number(i.qty) > 0).map((i) => i.name));
	const attuned = getAttunedNames(character, carried);
	const sections = getItemActions(character, play.items, charges, attuned, (d && d.itemSpells) || []);

	return (
		<Box>
			{sections.map((section) => (
				<Box key={section.id} sx={{ marginTop: 3 }} data-testid={`item-actions-${section.id}`}>
					<Typography variant="subtitle2" sx={HEADING_SX}>{section.title} <Typography component="span" variant="caption" sx={{ textTransform: 'none', letterSpacing: 0, color: 'text.secondary' }}>from magic items</Typography></Typography>
					{section.rows.map(({ item, ability, spell, active, max, used }, i) => (spell ? (
						<SpellRow key={`spell${item.name}${spell.name}`} spell={spell} d={d} charges={charges} setCharges={setCharges} onCast={onCastSpell} />
					) : (
						<Ability
							key={`${item.name}${ability.name}${i}`} item={item} ability={ability} active={active} left={chargesLeft(max, used)} dc={spellSaveDc} prof={prof}
							charges={charges} setCharges={setCharges} onUse={onUse}
						/>
					)))}
				</Box>
			))}

			<Box sx={{ marginTop: 3 }}>
				<Typography variant="subtitle2" sx={HEADING_SX}>Magic items</Typography>
				{entries.map(({ item, max, used }) => {
					const left = chargesLeft(max, used);
					const rule = item.charges;
					const isAttuned = attuned.includes(item.name);
					const bonuses = bonusText(item.bonuses);
					const passives = (item.abilities || []).filter((a) => a.activation === 'Passive');
					return (
						<Box key={item.name} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, padding: 1.5, marginBottom: 1.5 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
								<Typography sx={{ fontWeight: 700, flex: 1 }}>{item.name}</Typography>
								{item.attunement && (
									<FormControlLabel
										sx={{ marginRight: 0 }}
										control={<Checkbox size="small" checked={isAttuned} disabled={!isAttuned && attuned.length >= MAX_ATTUNED} onChange={() => setPlay({ attuned: toggleAttunement(attuned, item.name) })} />}
										label={<Typography variant="body2">Attuned</Typography>}
									/>
								)}
							</Box>
							{describeMagicItem(item) && <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{describeMagicItem(item)}</Typography>}
							{bonuses && (
								<Typography variant="body2" sx={{ marginTop: 0.5, color: item.attunement && !isAttuned ? 'text.disabled' : 'success.main' }}>
									{bonuses}{item.attunement && !isAttuned ? ' (while attuned)' : ''}
								</Typography>
							)}
							{passives.length > 0 && (
								<Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>Always on: {passives.map((a) => a.name).join(', ')} (see the Features tab)</Typography>
							)}
							{max > 0 && (
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', marginTop: 1 }}>
									<Typography variant="body2" sx={{ minWidth: 90 }}>Charges {left}/{max}</Typography>
									<Bubbles total={max} used={used} label="Charge" onChange={(u) => setCharges({ [item.name]: Math.max(0, Math.min(max, u)) })} />
									{rule.recharge && (
										<Typography variant="caption" sx={{ color: 'text.secondary' }}>
											Regains {String(rule.recharge).toLowerCase() === 'all' ? 'all charges' : `${rule.recharge} charges`} {rule.on === 'Dawn' ? 'at dawn' : `after a ${(rule.on || 'Long rest').toLowerCase()}`}
										</Typography>
									)}
								</Box>
							)}
							{item.description && (
								<>
									<Button size="small" onClick={() => setOpen((o) => ({ ...o, [item.name]: !o[item.name] }))} sx={{ paddingX: 0.5, minWidth: 0 }}>{open[item.name] ? 'Hide description' : 'Description'}</Button>
									<Collapse in={!!open[item.name]} unmountOnExit>
										<Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginBottom: 1 }}>{item.description}</Typography>
									</Collapse>
								</>
							)}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
