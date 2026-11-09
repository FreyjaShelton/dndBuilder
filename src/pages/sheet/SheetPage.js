import * as React from 'react';
import { Box, Button, Container, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { useCharacter } from '../../context/CharacterContext';
import { rollD20, rollExpression, describeD20 } from './dice';
import { defaultPlay, loadSaved, persist } from './storage';
import { derive, hitDiceLeftByDie } from './derive';
import { getClassViews } from '../../utils/multiclass';
import { withEquipFlags } from './inventory';
import { viewCharacter } from './sheetSync';
import { getSpellRoll, rollSpell } from './spellDice';
import HeaderPanel from './HeaderPanel';
import AbilityPanels, { RollModeToggle } from './AbilityPanels';
import ActionsTab from './ActionsTab';
import SpellsTab from './SpellsTab';
import InventoryTab from './InventoryTab';
import FeaturesTab from './FeaturesTab';
import NotesTab from './NotesTab';
import RollLog from './RollLog';
import CharacterLibrary from '../../components/CharacterLibrary';
import useSpellDetails from '../../utils/useSpellDetails';

const TABS = ['Actions', 'Spells', 'Inventory', 'Features', 'Notes'];

export default function SheetPage() {
	const { character, characterId, playRevision, importCharacter, syncFromSheet } = useCharacter();
	const [play, setPlayState] = React.useState(null);
	// which character (and revision of it) `play` belongs to, so a stale play state is never saved onto another character
	const [playKey, setPlayKey] = React.useState(null);
	const [log, setLog] = React.useState([]);
	const [tabName, setTabName] = React.useState(null);
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const tabNames = isMobile ? ['Stats', ...TABS] : TABS;
	const activeTab = tabName && tabNames.includes(tabName) ? tabName : tabNames[0];
	const fileInput = React.useRef(null);
	const built = !!character.classInfo.className;
	const currentKey = `${characterId}:${playRevision}`;

	// Leaving the sheet for the builder carries what changed here (inventory, prepared spells) over to the rest of the app.
	// Until then the sheet keeps its own copy, so playing never rearranges the builder underneath.
	const syncRef = React.useRef(syncFromSheet);
	syncRef.current = syncFromSheet;
	React.useEffect(() => () => syncRef.current(), []);

	// Load the in-play state saved with this character (HP, spent slots...) when the sheet opens or the open
	// character changes. If the build has changed since it was saved, start fresh.
	React.useEffect(() => {
		if (!built || playKey === currentKey) return;
		const saved = loadSaved(characterId);
		// the sheet state belongs to the build it was recorded against; compare with the saved build, not the in-memory one
		const same = saved?.play && saved.playBase === JSON.stringify(saved.character);
		const loaded = same ? { ...defaultPlay(character), ...saved.play } : defaultPlay(character);
		// sheets saved before equipping existed get equipped flags from the builder's selection
		setPlayState({ ...loaded, items: withEquipFlags(character, loaded.items) });
		setPlayKey(currentKey);
	}, [built, character, characterId, currentKey, playKey]);

	React.useEffect(() => {
		if (play && playKey === currentKey) persist(characterId, { character, play });
	}, [character, characterId, play, playKey, currentKey]);

	const spellDetails = useSpellDetails();
	// spell text loads on demand, so the sheet recomputes once it arrives
	// what is equipped in the inventory decides the armor class and the attack list
	const items = play ? play.items : null;
	// the spells prepared on the sheet stand in for the builder's until the sheet is closed
	const preparedOnSheet = play ? play.prepared : undefined;
	const preparedMoreOnSheet = play ? play.preparedMore : undefined;
	const view = React.useMemo(
		() => viewCharacter(character, { prepared: preparedOnSheet, preparedMore: preparedMoreOnSheet }),
		[character, preparedOnSheet, preparedMoreOnSheet],
	);
	const d = React.useMemo(() => derive(view, items), [view, items, spellDetails]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!play || playKey !== currentKey) {
		return (
			<Container maxWidth="sm" sx={{ paddingTop: 8, textAlign: 'center' }}>
				<Typography variant="h5" sx={{ marginBottom: 1 }}>No character yet</Typography>
				<Typography color="text.secondary" sx={{ marginBottom: 3 }}>Build a character first, then open the interactive sheet from the Finalize step.</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
					<Button variant="contained" href="#/">Go to the builder</Button>
					<CharacterLibrary />
				</Box>
			</Container>
		);
	}

	const setPlay = (patch) => setPlayState((p) => ({ ...p, ...patch }));
	// The prepared spells of one class (index 0 is the first class, 1+ the classes taken after it) are kept on the sheet:
	// play.prepared for the first class, play.preparedMore[index] for the others.
	const setPrepared = (update, index = 0) => setPlayState((p) => {
		const classView = getClassViews(character)[index];
		const saved = (classView?.classInfo.choices || {}).prepared || [];
		if (index === 0) return { ...p, prepared: update(Array.isArray(p.prepared) ? p.prepared : saved) };
		const more = p.preparedMore || {};
		return { ...p, preparedMore: { ...more, [index]: update(Array.isArray(more[index]) ? more[index] : saved) } };
	});
	const addLog = (label, total, detail, flag) => setLog((l) => [{ id: Date.now() + Math.random(), label, total, detail, flag }, ...l].slice(0, 40));

	const roll = (label, bonus) => {
		const r = rollD20(bonus, play.rollMode);
		addLog(label, r.total, describeD20(r), r.natural20 ? 'Critical!' : r.natural1 ? 'Fumble' : undefined);
		return r;
	};
	const damage = (label, expr, crit = false) => {
		const r = rollExpression(expr, { crit });
		if (!r) return;
		const dice = r.sides ? `[${r.rolls.join(', ')}]${r.mod ? ` ${r.mod > 0 ? '+' : ''}${r.mod}` : ''}` : `${r.mod}`;
		addLog(label, r.total, dice);
	};
	const freeRoll = (expr, r) => addLog(expr, r.total, r.sides ? `[${r.rolls.join(', ')}]${r.mod ? ` ${r.mod > 0 ? '+' : ''}${r.mod}` : ''}` : `${r.mod}`);

	const hp = {
		damage: (n) => setPlayState((p) => {
			const absorbed = Math.min(p.hpTemp, n);
			const rest = n - absorbed;
			const dyingHit = p.hpCurrent === 0 && n > 0;
			return {
				...p,
				hpTemp: p.hpTemp - absorbed,
				hpCurrent: Math.max(0, p.hpCurrent - rest),
				deathSaves: dyingHit ? { ...p.deathSaves, failures: Math.min(3, p.deathSaves.failures + 1) } : p.deathSaves,
			};
		}),
		heal: (n) => setPlayState((p) => ({
			...p,
			hpCurrent: Math.min(d.hpMax, p.hpCurrent + n),
			deathSaves: p.hpCurrent === 0 ? { successes: 0, failures: 0 } : p.deathSaves,
		})),
		setTemp: (n) => setPlay({ hpTemp: n }),
		setDeathSave: (key, value) => setPlay({ deathSaves: { ...play.deathSaves, [key]: value } }),
		rollDeathSave: () => {
			const r = rollD20(0, 'normal');
			if (r.natural20) {
				setPlay({ hpCurrent: 1, deathSaves: { successes: 0, failures: 0 } });
				addLog('Death save', r.total, describeD20(r), 'Critical! Regain 1 HP');
			} else {
				const failuresAdded = r.natural1 ? 2 : r.total < 10 ? 1 : 0;
				const saves = {
					successes: Math.min(3, play.deathSaves.successes + (r.total >= 10 && !r.natural1 ? 1 : 0)),
					failures: Math.min(3, play.deathSaves.failures + failuresAdded),
				};
				setPlay({ deathSaves: saves });
				addLog('Death save', r.total, describeD20(r), r.total >= 10 && !r.natural1 ? 'Success' : 'Failure');
			}
		},
		spendHitDie: () => {
			// the biggest hit die that is left is spent first (a multiclassed character can have several sizes)
			const die = hitDiceLeftByDie(d.hitDice, play.hitDiceUsed)[0]?.die || d.hitDie;
			const r = rollExpression(`1d${die}`);
			const heal = Math.max(1, r.total + d.mods.con);
			setPlayState((p) => ({ ...p, hitDiceUsed: p.hitDiceUsed + 1, hpCurrent: Math.min(d.hpMax, p.hpCurrent + heal) }));
			addLog('Hit die', heal, `d${die}(${r.rolls[0]}) ${d.mods.con >= 0 ? '+' : ''}${d.mods.con} HP`);
		},
	};

	const rest = (type) => {
		if (type === 'short') {
			setPlay({ pactUsed: 0 });
			addLog('Short rest', '—', 'Pact Magic slots restored');
		} else {
			setPlayState((p) => ({
				...p,
				hpCurrent: d.hpMax,
				hpTemp: 0,
				deathSaves: { successes: 0, failures: 0 },
				slotsUsed: {},
				pactUsed: 0,
				concentration: '',
				hitDiceUsed: Math.max(0, p.hitDiceUsed - Math.max(1, Math.floor(d.level / 2))),
			}));
			addLog('Long rest', '—', 'HP, spell slots and half your hit dice restored');
		}
	};

	// source 'pact' spends a Pact Magic slot; otherwise a regular slot of that level is used
	const cast = (spell, level, source) => {
		if (level > 0) {
			if (source === 'pact' || d.slots.type === 'pact') setPlay({ pactUsed: play.pactUsed + 1 });
			else setPlay({ slotsUsed: { ...play.slotsUsed, [level]: (play.slotsUsed[level] || 0) + 1 } });
		}
		if (spell.concentration) setPlay({ concentration: spell.name });
		const how = level > 0 ? `level ${level} ${source === 'pact' || d.slots.type === 'pact' ? 'pact slot' : 'slot'}` : 'cantrip';
		// a spell with damage or healing dice rolls them: bigger with a higher slot (or the caster's level for a cantrip)
		const stats = (d.spellStatsList || []).find((x) => x.index === spell.casterIndex) || d.spellStats;
		const dice = getSpellRoll(spell, { slotLevel: level, characterLevel: d.level, abilityMod: stats ? d.mods[stats.abilityKey] : 0 });
		if (dice) {
			const rolled = rollSpell(dice);
			addLog(`Cast ${spell.name}`, rolled.total, `${rolled.detail} · ${how}`);
		} else {
			addLog(`Cast ${spell.name}`, '—', how);
		}
	};

	const exportJson = () => {
		const blob = new Blob([JSON.stringify({ character, play }, null, 2)], { type: 'application/json' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = `${(character.info.name || 'character').replace(/\s+/g, '-')}.json`;
		a.click();
		URL.revokeObjectURL(a.href);
	};
	const importJson = (file) => {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const data = JSON.parse(reader.result);
				if (!data.character?.classInfo) throw new Error('not a character file');
				importCharacter(data);
			} catch (e) {
				window.alert('That file is not a saved dndBuilder character.');
			}
		};
		reader.readAsText(file);
	};

	return (
		<Box sx={{ minHeight: '100vh', paddingBottom: 16 }}>
			<Container maxWidth="lg" sx={{ paddingTop: 2 }}>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
					<Button startIcon={<ArrowBackIcon />} href="#/finalize">Back to builder</Button>
					<Box sx={{ flex: 1 }} />
					<CharacterLibrary />
					<Button startIcon={<DownloadIcon />} onClick={exportJson}>Export</Button>
					<Button startIcon={<UploadIcon />} onClick={() => fileInput.current?.click()}>Import</Button>
					<input
						ref={fileInput}
						type="file"
						accept="application/json,.json"
						hidden
						onChange={(e) => { if (e.target.files[0]) importJson(e.target.files[0]); e.target.value = ''; }}
					/>
				</Box>

				<HeaderPanel character={character} d={d} play={play} setPlay={setPlay} hp={hp} onRoll={roll} onRest={rest} />

				<Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '340px minmax(0, 1fr)' }, gap: 2, marginTop: 2, alignItems: 'start' }}>
					{!isMobile && <AbilityPanels d={d} play={play} setPlay={setPlay} onRoll={roll} />}
					<Box>
						{isMobile && <Box sx={{ marginBottom: 1.5 }}><RollModeToggle play={play} setPlay={setPlay} /></Box>}
						<Tabs value={activeTab} onChange={(_, v) => setTabName(v)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
							{tabNames.map((t) => <Tab key={t} label={t} value={t} />)}
						</Tabs>
						{activeTab === 'Stats' && <AbilityPanels d={d} play={play} setPlay={setPlay} onRoll={roll} showRollMode={false} />}
						{activeTab === 'Actions' && <ActionsTab d={d} onAttack={roll} onDamage={damage} />}
						{activeTab === 'Spells' && <SpellsTab character={view} setPrepared={setPrepared} d={d} play={play} setPlay={setPlay} onCast={cast} onAttack={roll} onDamage={damage} />}
						{activeTab === 'Inventory' && <InventoryTab character={character} d={d} play={play} setPlay={setPlay} />}
						{activeTab === 'Features' && <FeaturesTab character={character} d={d} />}
						{activeTab === 'Notes' && <NotesTab character={character} play={play} setPlay={setPlay} />}
					</Box>
				</Box>
			</Container>
			<RollLog entries={log} onFreeRoll={freeRoll} />
		</Box>
	);
}
