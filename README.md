# D&D Builder

A D&D 5e character builder in the spirit of D&D Beyond. It walks you through every step of building a character, fills in several printable PDF character sheets for you, and gives you an interactive character sheet to play with. Characters and custom items are saved in your browser and can sync across devices through Google Drive.

It runs entirely in the browser. There is no backend and no database.

## Features

- **Guided character creation.** A step-by-step wizard covers edition, basic info, ability scores, race/species, class, spells, background, skills, equipment and finalizing.
- **Two rulesets.** Build with the 2014 5th Edition rules (the default) or the 2024 revised core rules. The 2024 ruleset is still a work in progress.
- **Automatic PDF character sheets.** Three fillable sheets are filled in from your character: a "Standard" sheet modelled on the D&D Beyond layout, the classic 2014 sheet and a 2024 sheet. Any sheet can be generated for any character.
- **Interactive character sheet.** A playable sheet with Actions, Spells, Inventory, Features and Notes tabs, a dice roller and roll log, hit points, spell slots, hit dice, item charges, attunement and short and long rests.
- **Multiple characters.** A character library holds as many characters as you like, and you can switch between them at any time.
- **Google Drive sync.** Characters and the custom item library sync across devices using your own Google Drive.
- **JSON import and export.** Back up a character, including its in-play state, to a `.json` file and load it again later. Custom items can also be shared one at a time as `.item.json` files.
- **Custom items (2014).** Create your own weapons, armor and magic items, with ready-made presets to start from.

## The creation steps

| Step | What you do |
| --- | --- |
| Edition | Choose 2014 or 2024 rules. All later options follow this choice. |
| Home | Name, player, alignment, appearance and backstory. |
| Abilities | Standard array, point buy, rolled (4d6, drop lowest) or manual entry. |
| Race / Species | Pick a race and subrace (2014) or a species (2024), and make any choices it grants. |
| Class | Choose a class, subclass and level, optional features, and hit point method. Multiclassing is supported. |
| Spells | Pick cantrips and prepared or known spells. In 2014 this step only appears for characters that can cast spells, which can depend on the subclass (for example Eldritch Knight). |
| Background | Choose a background, or build a custom one. Pick personality traits, ideals, bonds and flaws. |
| Skills | Choose class skill proficiencies. |
| Equipment | Take the starting kit or starting gold, buy gear, add custom items and manage attunement. |
| Finalize | Preview and download the filled-in PDF, and open the interactive sheet. |

## How it works

### Rules data

All rules data is bundled with the app as static JavaScript and JSON in [src/data](src/data), split by edition (`2014/` and `2024/`). Nothing is fetched from a rules website at runtime.

The data was gathered from two sources:

- **Primary source:** [5e.tools](https://5e.tools/index.html). This supplies most class, equipment, item, infusion and feat-spell data.
- **Secondary source:** [dnd5e.wikidot.com](https://dnd5e.wikidot.com/). This fills in what the primary source lacked, such as the 2014 backgrounds and races.

Files that came straight from a source are marked with a header comment such as `Generated from 5e.tools ... Do not edit by hand`. The `*.generated.json` files are the same kind of output. Hand corrections live in separate `*Fixes.js` / `fixes.js` files next to the data (for example `races/fixes.js` and `backgroundFixes.js`), so that regenerating the data does not wipe them out. There is also a small amount of homebrew content in [src/data/2014/homebrew](src/data/2014/homebrew).

[src/data/index.js](src/data/index.js) exposes each edition's classes, races, backgrounds, equipment, feats and spells through `getEditionData(edition)`, and the rest of the app asks it for data instead of importing a ruleset directly.

### Character model and calculations

The whole character is one plain JSON object. It is held by a React context in [src/context/CharacterContext.js](src/context/CharacterContext.js). Each page edits its own part of that object.

Everything the app displays is derived from that object rather than stored. [src/utils/characterCalc.js](src/utils/characterCalc.js) and its neighbours work out final ability scores, armor class, hit points, saving throws, skill bonuses, proficiencies, attacks, spell slots and spellcasting stats. The PDF fillers and the interactive sheet all call the same functions, so every output agrees with the others. Switching edition resets the edition-specific parts of the character, so a 2014 race cannot leak into a 2024 character.

### PDF generation

The Finalize step uses [pdf-lib](https://pdf-lib.js.org/) to fill the fillable PDFs in [src/pages/finalize](src/pages/finalize) in the browser:

- `fillBeyondSheet.js` fills the five-page standard sheet (main page, features and equipment, background and notes, spells).
- `fillSheet2024.js` fills the 2024 sheet, using the coordinates in `sheet2024Layout.js`.
- The 2014 sheet is filled directly in `Finalize.js`, with its spell fields mapped in `spellFields2014.js`.

### Interactive sheet

The sheet at `#/sheet` lives in [src/pages/sheet](src/pages/sheet). `derive.js` computes everything it shows from the character. Play state (current HP, spent spell slots, charges, equipped items and so on) is kept separately from the character and stored with it in the library. If the character is rebuilt in a way that invalidates that state, the sheet starts fresh. When you go back to the builder, `sheetSync.js` carries inventory and prepared spell changes back into the character, so the Equipment and Spells steps and the PDF reflect what happened at the table.

### Saving and the character library

Each character is stored in its own `localStorage` key, with a small index recording what sync needs to know (name, summary, last update, whether it is a draft, and so on). See [src/utils/library.js](src/utils/library.js). A character is a draft until you first reach the Finalize step, and drafts never sync.

### Google Drive sync

Sync runs in the browser using Google Identity Services and the Drive REST API ([src/utils/googleDrive.js](src/utils/googleDrive.js), [src/utils/driveSync.js](src/utils/driveSync.js)).

- Files are stored in the hidden per-app folder (`drive.appdata` scope). The app cannot see or change anything else in your Drive, and no server is involved.
- Each character is one file named `<name> (dndBuilder).json`. The custom item library is one more file.
- Each sync pass compares every character with its Drive file by version. If only one side changed, that change is copied across. If both changed, the newer one wins. New characters are copied across, and deletions are carried over.
- A character uploads when you reach Finalize, and changes on the interactive sheet upload after a short quiet period. A sync also runs when the app opens, when the Characters list is opened and when you click **Sync now**.
- Google sign-in tokens last about an hour, so you may need to sign in again from the sync window.

If no Google client ID is configured, the app still works and saves everything on the device. Drive sync is simply shown as not set up.

### Custom items

The Equipment step lets you create custom items (2014): weapons, armor and wondrous or other magic items, with bonuses, attunement, charges, abilities and item-granted spells. The library of custom items is shared by all characters on the device and syncs through Drive. Each character keeps its own copy, so a character still works on its own without the library. Items can be exported and imported as `.item.json` files, and a set of presets is in [src/data/2014/customItemPresets.js](src/data/2014/customItemPresets.js).

## Tech stack

- React 19 with Create React App (`react-scripts`)
- Material UI (MUI) 6 with Emotion
- React Router 7, using a hash router so it works on static hosting
- pdf-lib for PDF filling
- Deployed as static assets with Cloudflare Workers (`wrangler.jsonc`)

## Getting started

You need Node.js and npm.

```bash
npm install
```

```bash
npm start
```

The app opens at http://localhost:3000.

In development, two finished level 20 test characters (a Wizard and a Fighter, from [src/dev](src/dev)) are added to the library so you can try the sheet, PDFs and sync without building a character first. Set `REACT_APP_BLANK_CHARACTER=true` to start empty instead. Production builds never include these characters.

Other scripts:

```bash
npm run build
```

```bash
npm test
```

### Google Drive setup

Drive sync needs an OAuth client ID.

1. In Google Cloud Console, go to APIs & Services, then Credentials, and create an OAuth client ID of type Web application.
2. Add your site's address and `http://localhost:3000` under Authorized JavaScript origins.
3. Put the client ID in `.env`:

```
REACT_APP_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

A client ID is visible to anyone who loads the page, so it is not a secret.

### Deployment

`npm run build` writes the site to `build/`. The Worker defined in [wrangler.jsonc](wrangler.jsonc) serves that folder as a single-page app. Access control is configured in the Cloudflare dashboard (Cloudflare Access), not in this repository.

## Project layout

```
src/
  index.js            Routes and app providers
  context/            Character state (CharacterContext)
  data/               Rules data for 2014 and 2024, plus the wizard step list
  pages/              One folder per wizard step, plus finalize/ (PDFs) and sheet/ (interactive sheet)
  components/         Shared pieces (character library, attunement panel, page header)
  utils/              Calculations, the character library, custom items and Google Drive sync
  dev/                Test characters used by the dev server
```

## Notes

- 2024 support is a work in progress, and several features (custom items, the full interactive sheet sync) are 2014-first.
- This is a fan project. D&D rules content belongs to Wizards of the Coast.
