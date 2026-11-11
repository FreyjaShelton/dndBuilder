// Hand-written corrections to the generated race data (data.generated.json), mostly traits that ask the player to
// choose something but were generated without a picker, or whose detected effects were wrong.
//
// Extra trait fields used here (read by utils/raceChoices.js):
//   choose: 'option' + options  one pick from a list; each option can carry its own effects
//   choiceLabel                 label for the picker (defaults to the trait name)
//   minLevel                    the pick only counts as missing once the character reaches this level
// Extra effect fields: speeds ({ climb: 'walk', fly: 30 }), armor (['Light']), weaponChoices ([{ count, category }]),
// replaceAsi (an asi object that replaces the race's whole ability score increase), toolChoices from: 'any'.

const spell = (name, level, characterLevel = 1) => ({ name, level, characterLevel });

// "• Name. Text" lines at the end of a description, turned into options; returns the description without them.
function splitBullets(description, names) {
	const options = [];
	let rest = description;
	names.forEach((name) => {
		const re = new RegExp(`\\n• ${name}(?: \\([^)]*\\))?\\. ([^\\n]*)`);
		const m = rest.match(re);
		if (!m) throw new Error(`Race fix: option "${name}" not found`);
		options.push({ name, description: m[1] });
		rest = rest.replace(m[0], '');
	});
	return { description: rest, options };
}

export default function applyRaceFixes(list) {
	const race = (name) => list.find((r) => r.name === name);
	const version = (name, id) => race(name).versions.find((v) => v.id === id);
	const trait = (name, id, traitName, subName) => {
		const v = version(name, id);
		const traits = subName ? v.subraces.find((s) => s.name === subName).traits : v.traits;
		const t = traits.find((x) => x.name === traitName);
		if (!t) throw new Error(`Race fix: ${name} (${id}) has no trait ${traitName}`);
		return t;
	};

	// Aasimar (Monsters of the Multiverse): pick a Celestial Revelation at 3rd level
	Object.assign(trait('Aasimar', 'mpmm', 'Celestial Revelation'), { choose: 'option', minLevel: 3 });

	// Eladrin: your season decides what Fey Step adds from 3rd level
	Object.assign(trait('Eladrin', 'mtof', 'Fey Step'), { choose: 'option', choiceLabel: 'Season', minLevel: 3 });
	const mpmmFeyStep = trait('Eladrin', 'mpmm', 'Fey Step');
	Object.assign(mpmmFeyStep, splitBullets(mpmmFeyStep.description, ['Autumn', 'Winter', 'Spring', 'Summer']), { choose: 'option', choiceLabel: 'Season', minLevel: 3 });

	// Shifter (Monsters of the Multiverse): the shifting benefit is chosen with the race
	const shifting = trait('Shifter', 'mpmm', 'Shifting');
	Object.assign(shifting, splitBullets(shifting.description, ['Beasthide', 'Longtooth', 'Swiftstride', 'Wildhunt']), { choose: 'option', choiceLabel: 'Shifting benefit' });
	delete shifting.effects; // the +10 speed only applies while shifted (Swiftstride)

	// Simic Hybrid: one enhancement at 1st level and another at 5th
	const hybrid = version('Simic Hybrid', 'simic-hybrid-features');
	const enhancements = trait('Simic Hybrid', 'simic-hybrid-features', 'Animal Enhancements');
	const all = splitBullets(enhancements.description, ['Manta Glide', 'Nimble Climber', 'Underwater Adaptation', 'Grappling Appendages', 'Carapace', 'Acid Spit']);
	const fx = { 'Nimble Climber': { speeds: { climb: 'walk' } }, 'Underwater Adaptation': { speeds: { swim: 'walk' } } };
	const opts = all.options.map((o) => (fx[o.name] ? { ...o, effects: fx[o.name] } : o));
	hybrid.traits.splice(hybrid.traits.indexOf(enhancements), 1,
		{ name: 'Animal Enhancement', description: all.description.replace(' and one at 5th level', ''), choose: 'option', choiceLabel: 'Animal enhancement (1st level)', options: opts.slice(0, 3) },
		{ name: 'Animal Enhancement (5th Level)', description: 'At 5th level, you choose another animal enhancement. You can pick one of the 5th-level enhancements or a 1st-level one you don\'t already have.', choose: 'option', choiceLabel: 'Animal enhancement (5th level)', minLevel: 5, options: opts });

	// Variant Tiefling (Sword Coast Adventurer's Guide): built on the Asmodeus tiefling (Charisma +2, Intelligence +1,
	// Infernal Legacy) with optional Feral scores and one of Devil's Tongue, Hellfire or Winged in place of Infernal Legacy.
	const variant = version('Tiefling', 'phb').subraces.find((s) => s.name === 'Variant Tiefling');
	const legacy = trait('Tiefling', 'phb', 'Infernal Legacy', 'Bloodline of Asmodeus');
	const vt = Object.fromEntries(variant.traits.map((t) => [t.name, t]));
	variant.asi = { fixed: { int: 1 }, choose: [], text: 'Your Intelligence score increases by 1.' };
	variant.traits = [
		vt.Appearance,
		{
			name: 'Feral',
			description: 'You can choose the Feral variant ability scores instead of the usual ones.',
			choose: 'option',
			choiceLabel: 'Ability scores',
			options: [
				{ name: 'Standard', description: 'Your Charisma score increases by 2, and your Intelligence score increases by 1.' },
				{ name: 'Feral', description: vt.Feral.description, effects: { replaceAsi: { fixed: { dex: 2, int: 1 }, choose: [] } } },
			],
		},
		{
			name: 'Infernal Legacy',
			description: 'Keep the Infernal Legacy trait, or replace it with Devil\'s Tongue, Hellfire, or Winged.',
			choose: 'option',
			choiceLabel: 'Legacy',
			options: [
				{ name: 'Infernal Legacy', description: legacy.description, effects: legacy.effects },
				{ name: "Devil's Tongue", description: vt["Devil's Tongue"].description, effects: vt["Devil's Tongue"].effects },
				{ name: 'Hellfire', description: vt.Hellfire.description, effects: { spells: [spell('Thaumaturgy', 0), spell('Burning Hands', 1, 3), spell('Darkness', 2, 5)] } },
				{ name: 'Winged', description: vt.Winged.description, effects: { speeds: { fly: 30 } } },
			],
		},
	];

	// Astral Elf: one of three cantrips
	const astralFire = (t) => Object.assign(t, {
		choose: 'option',
		choiceLabel: 'Astral Fire cantrip',
		options: ['Dancing Lights', 'Light', 'Sacred Flame'].map((name) => ({ name, effects: { spells: [spell(name, 0)] } })),
	});
	astralFire(trait('Elf', 'phb', 'Astral Fire', 'Astral Elf'));
	astralFire(trait('Astral Elf', 'astral-adventurer-s-guide', 'Astral Fire'));

	// Githyanki (Mordenkainen's Tome of Foes): one skill OR one tool, plus a language
	Object.assign(trait('Githyanki', 'mtof', 'Decadent Mastery'), {
		effects: { languageChoices: 1 },
		choose: 'option',
		choiceLabel: 'Skill or tool',
		options: [
			{ name: 'Skill', effects: { skillChoices: [{ count: 1, from: 'any' }] } },
			{ name: 'Tool', effects: { toolChoices: [{ count: 1, from: 'any' }] } },
		],
	});

	// Hobgoblin (Volo's): two martial weapons of your choice and light armor
	trait('Hobgoblin', 'vgtm', 'Martial Training').effects = { weaponChoices: [{ count: 2, category: 'Martial' }], armor: ['Light'] };

	// Skill picks that were detected with the wrong count
	trait('Kenku', 'mpmm', 'Kenku Recall').effects = { skillChoices: [{ count: 2, from: 'any' }] };
	['Dhampir', 'Hexblood', 'Reborn'].forEach((name) => {
		trait(name, 'van-richten-s-guide-to-ravenloft', 'Ancestral Legacy').effects = { skillChoices: [{ count: 2, from: 'any' }] };
	});

	// Satyr: Performance AND Persuasion, not a pick between them
	['mpmm', 'mythic-odysseys-of-theros'].forEach((id) => {
		trait('Satyr', id, 'Reveler').effects = { skills: ['Performance', 'Persuasion'], toolChoices: [{ count: 1, from: 'instrument' }] };
	});

	// "Tool of your choice" means any tool, not only artisan's tools
	trait('Warforged', 'eberron-rising-from-the-last-war', 'Specialized Design').effects.toolChoices = [{ count: 1, from: 'any' }];
	trait('Vedalken', 'guildmaster-s-guide-to-ravnica', 'Tireless Precision').effects.toolChoices = [{ count: 1, from: 'any' }];
	trait('Autognome', 'spelljammer-adventures-in-space-astral-adventurer-s-guide', 'Specialized Design').effects.toolChoices = [{ count: 2, from: 'any' }];

	// "+2 and +1, or +1 to three scores" was detected as both the flexible choice and an extra +2 pick
	const dragonborn = version('Dragonborn', 'phb');
	['Chromatic', 'Metallic', 'Gem'].forEach((name) => { dragonborn.subraces.find((s) => s.name === name).asi.choose = []; });
	['Dhampir', 'Hexblood', 'Reborn'].forEach((name) => { version(name, 'van-richten-s-guide-to-ravenloft').asi.choose = []; });

	// Rock Gnome: the tool is tinker's tools
	trait('Gnome', 'phb', 'Tinker', 'Rock').effects = { toolsFixed: ["Tinker's tools"] };

	return list;
}
