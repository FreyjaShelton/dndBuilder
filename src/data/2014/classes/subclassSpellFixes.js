// Spells a subclass grants that its feature text gives in prose rather than in a spell table, so utils/spells2014.js
// can't read them from the text (see alwaysPreparedOf there). Applied in ./index.js.
//   grantedSpells  { <class level>: [spell names] }  learned automatically at that class level
//   bonusSpells    { choice, byChoice: { <option>: { <class level>: [spell names] } } }  depends on a class choice
const affinity = (spell) => ({ 1: [spell] });

const subclassSpellFixes = {
	Sorcerer: {
		// Moon Fire: "You learn the Sacred Flame spell"
		'Lunar Sorcery': { grantedSpells: { 1: ['Sacred Flame'] } },
		// Eyes of the Dark: "When you reach 3rd level in this class, you learn the darkness spell"
		'Shadow Magic': { grantedSpells: { 3: ['Darkness'] } },
		// Divine Magic: one extra spell from the affinity picked on the Class page
		'Divine Soul': {
			bonusSpells: {
				choice: 'divineAffinity',
				byChoice: {
					Good: affinity('Cure Wounds'),
					Evil: affinity('Inflict Wounds'),
					Law: affinity('Bless'),
					Chaos: affinity('Bane'),
					Neutrality: affinity('Protection from Evil and Good'),
				},
			},
		},
	},
};

export default function applySubclassSpellFixes(classes) {
	Object.entries(subclassSpellFixes).forEach(([className, subs]) => {
		Object.entries(subs).forEach(([subName, fix]) => {
			const sub = classes[className].subclasses.find((s) => s.name === subName);
			if (!sub) throw new Error(`Subclass spell fix: ${className} has no subclass ${subName}`);
			Object.assign(sub, fix);
		});
	});
	return classes;
}
