// Hand-written corrections to the generated background data (backgrounds.generated.json): features that grant a
// feat or ask for a choice the generator left as plain text. Read by utils/backgroundChoices.js.
//
// Extra fields:
//   feat: { trait, fixed } a feat the background grants, or { trait, from: [names] } a pick from a short list;
//         variantPrefix limits the feat's spell variants (a Lorehold Student takes Strixhaven Initiate as Lorehold)
//   options: [{ id, label, options: [{ name, description, effects }], optional, variant }] extra picks; `variant`
//         shows the pick only with that variant. Option effects: tools (fixed names), toolPicks ([{ count, from }]),
//         languagePicks (n), dropToolPicks (true: the background's own tool picks no longer apply)
//   variant.effects.replaceSkills: { Athletics: 'Investigation' }
//   languages.pick.onlyIfKnown: the pick only applies if the character already speaks that language

const opt = (name, effects, description) => ({ name, ...(description ? { description } : {}), ...(effects ? { effects } : {}) });
const tools = (...names) => ({ tools: names });
const pickOne = (...from) => ({ toolPicks: [{ count: 1, from }] });

export default function applyBackgroundFixes(list, raceNames) {
	const bg = (name) => {
		const b = list.find((x) => x.name === name);
		if (!b) throw new Error(`Background fix: no background ${name}`);
		return b;
	};
	const setFeat = (name, feat) => {
		const b = bg(name);
		if (!b.features.some((f) => f.name === feat.trait)) throw new Error(`Background fix: ${name} has no feature ${feat.trait}`);
		b.feat = feat;
	};

	// Feats granted by a background feature
	setFeat('Rewarded', { trait: "Fortune's Favor", from: ['Lucky', 'Magic Initiate', 'Skilled'] });
	setFeat('Ruined', { trait: 'Still Standing', from: ['Alert', 'Skilled', 'Tough'] });
	setFeat('Giant Foundling', { trait: 'Strike of the Giants', fixed: 'Strike of the Giants' });
	setFeat('Rune Carver', { trait: 'Rune Shaper', fixed: 'Rune Shaper' });
	setFeat('Knight of Solamnia', { trait: 'Squire of Solamnia', fixed: 'Squire of Solamnia' });
	setFeat('Mage of High Sorcery', { trait: 'Initiate of High Sorcery', fixed: 'Initiate of High Sorcery' });
	setFeat('Gate Warden', { trait: 'Planar Infusion', fixed: 'Scion of the Outer Planes' });
	setFeat('Planar Philospher', { trait: 'Conviction', fixed: 'Scion of the Outer Planes' });
	setFeat('Wildspacer', { trait: 'Wildspace Adaptation', fixed: 'Tough' });
	['Lorehold', 'Prismari', 'Quandrix', 'Silverquill', 'Witherbloom'].forEach((college) => {
		setFeat(`${college} Student`, { trait: `${college} Initiate`, fixed: 'Strixhaven Initiate', variantPrefix: college });
	});

	// Dragon Casualty: the former occupation decides the tool proficiency
	const casualty = bg('Dragon Casualty');
	const origin = casualty.features.find((f) => f.name === 'Origin');
	origin.rolls = [];
	origin.isChoice = true; // picked in the choices card, so not the background's main feature
	casualty.tools.manual = false;
	casualty.options = [{
		id: 'origin',
		label: 'Origin (decides your tool proficiency)',
		options: [
			opt('Dockworker/Fisherman', tools('Vehicles (water)')),
			opt('Tradesperson/Merchant', pickOne('@artisan')),
			opt('Black Fist Soldier', pickOne('@gaming', 'Vehicles (land)')),
			opt('Adventurer/Visitor', tools('Vehicles (land)')),
			opt('Entertainer', pickOne('@instrument')),
			opt('Scholar/Healer', pickOne("Alchemist's supplies", 'Herbalism kit')),
			opt('Criminal', pickOne("Thieves' tools", 'Forgery kit', 'Disguise kit')),
			opt('Unskilled Laborer', pickOne('@gaming')),
		],
	}];

	// House Agent: the House Tool Proficiencies table (Eberron: Rising from the Last War)
	const agent = bg('House Agent');
	agent.tools.manual = false;
	agent.options = [{
		id: 'house',
		label: 'House (decides your tool proficiencies)',
		options: [
			opt('Cannith', tools("Alchemist's supplies", "Tinker's tools")),
			opt('Deneith', { tools: ['Vehicles (land)'], toolPicks: [{ count: 1, from: ['@gaming'] }] }),
			opt('Ghallanda', tools("Brewer's supplies", "Cook's utensils")),
			opt('Jorasco', tools("Alchemist's supplies", 'Herbalism kit')),
			opt('Kundarak', tools("Thieves' tools", "Tinker's tools")),
			opt('Lyrandar', tools("Navigator's tools", 'Vehicles (air and sea)')),
			opt('Medani', tools('Disguise kit', "Thieves' tools")),
			opt('Orien', { tools: ['Vehicles (land)'], toolPicks: [{ count: 1, from: ['@gaming'] }] }),
			opt('Phiarlan', { tools: ['Disguise kit'], toolPicks: [{ count: 1, from: ['@instrument'] }] }),
			opt('Sivis', tools("Calligrapher's supplies", 'Forgery kit')),
			opt('Tharashk', { tools: ["Thieves' tools"], toolPicks: [{ count: 1, from: ['@gaming'] }] }),
			opt('Thuranni', { tools: ["Poisoner's kit"], toolPicks: [{ count: 1, from: ['@instrument'] }] }),
			opt('Vadalis', tools('Herbalism kit', 'Vehicles (land)')),
		],
	}];

	// Anthropologist: Cultural Chameleon asks for the race whose culture you adopted
	bg('Anthropologist').options = [{
		id: 'culture',
		label: 'Cultural Chameleon: adopted culture',
		options: raceNames.map((name) => opt(name)),
	}];

	// Guild Merchant variant: navigator's tools or an extra language instead of artisan's tools
	bg('Guild Artisan').options = [{
		id: 'merchant',
		label: "Guild Merchant: instead of artisan's tools",
		variant: 'Guild Merchant',
		optional: true,
		options: [
			opt("Artisan's tools (no change)"),
			opt("Navigator's tools", { dropToolPicks: true, tools: ["Navigator's tools"] }),
			opt('An additional language', { dropToolPicks: true, languagePicks: 1 }),
		],
	}];

	// City Watch's Investigator variant: Investigation rather than Athletics
	bg('City Watch').variants.find((v) => v.name === 'Investigator').effects = { replaceSkills: { Athletics: 'Investigation' } };

	// Faction Agent: Insight is already granted, so it is not one of the picks
	const faction = bg('Faction Agent').skills.picks[0];
	faction.from = faction.from.filter((s) => s !== 'Insight');

	// Clan Crafter: Dwarvish, or another language only if you already speak Dwarvish
	bg('Clan Crafter').languages.pick.onlyIfKnown = 'Dwarvish';

	return list;
}
