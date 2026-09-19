# Technology section storyboard

Draft visual pages for the technology section of the pitch, built from the Blake x Pat discussion
transcript. Two decks, one build pipeline.

| Deck | Pages | For | Start here |
|---|---|---|---|
| Internal storyboard | 15 | Working through the story. Every gap flagged in amber. | `dist/technology-storyboard.pdf` |
| Client version | 12 | Submittable. No internal flags. | `dist/technology-client.pdf` |

**Then read:** [`ASSUMPTIONS-AND-OPEN-ITEMS.md`](ASSUMPTIONS-AND-OPEN-ITEMS.md) for the internal
deck, [`BEFORE-YOU-SEND.md`](BEFORE-YOU-SEND.md) for the client one.

## Internal storyboard, page by page

| | Page | The point it makes |
|---|---|---|
| 01 | The objection | MAKE is not a platform we build for you. It is running now. The only new work is connecting it to your stack. Sets the legend used by every later diagram. |
| 02 | Modular production | Efficiency comes from making components once and recombining them, not from making each asset faster. |
| 03 | Three routes | Assisted, augmented and automated are routes through one system, chosen per deliverable at triage. Not stages, not human versus machine. |
| 04 | MAKE today | The orchestration layer already exists. Proprietary core, open edges. Everything new is on the client side of the diagram. |
| 05 | One connected space | How our internal efficiency converts into something the client feels. |
| 06 | Modularity | A brief uses the modules it needs. Three briefs, three different subsets. |
| 07 | Anatomy of a module | The four answers every module owes the reader, worked through for the one module the discussion names. |
| 08 | AI tasks | The working parts, placed across pre-production, production and post. |
| 09 | Your DAM | The client's DAM stays the source of truth. MAKE produces around it and registers everything back. |
| 10 | Ordering, not re-briefing | A second market's order traced back to components market one already produced. |
| 11 | The back catalogue | The real dependency, and the fact that we do not yet have a technical answer. |
| 12 | Today, integration, next | Three states, one legend. Roadmap at theme level, no dates. |
| 13 | Effort and efficiency | Client effort front-loaded and bounded, ours rising. Directional, unnumbered. |
| 14 | Running order | What the written submission carries, and where the live session takes over. |
| 15 | Scenario board | Live only. Labelled storyboard slots, nothing fabricated. |

Pages 01 to 13 are the written submission. Pages 14 and 15 cover the live session.

## Client version, page by page

| | Page | The point it makes |
|---|---|---|
| 01 | The platform is already built | What exists now, before anything is connected. |
| 02 | Make the parts once | Nine components, six outputs, one routing traced in full. |
| 03 | Three routes | Assisted, augmented and automated, sharing one approval gate. |
| 04 | One layer connects it | Your systems, MAKE, our tools. Described by category, never by product name. |
| 05 | Only the parts you need | The module rack. Four named from the call, four left as fields to complete. |
| 06 | Before, during and after production | Where the AI tasks sit, and where people stay in the loop. |
| 07 | Why the integration matters | The library at the end of the chain versus the library at the start of it. Nothing gets made twice. |
| 08 | Your DAM stays the source of truth | Everything produced returns to it: the work, the components, the record. |
| 09 | Ordering, not re-briefing | The second market orders what already exists. |
| 10 | Your existing library | Getting started does not depend on tidying the archive first. |
| 11 | Today, connect, next | Three states, theme level, no dates. |
| 12 | The live session | You choose two scenarios, we run them live. |

## Visual language

**Internal deck**, carried across every diagram and introduced on page 01:

- **solid black outline** exists today, in use on our work now
- **dashed black outline** integration work, connecting MAKE to the client's stack
- **dotted grey outline** roadmap theme, direction only, no dates
- **amber** open, we owe an answer. Flagged, never hidden.
- **blue** client-owned: their DAM, their tools, their team

Content components are lettered chips (A to I) and recur on pages 02, 09, 10 and 11, so the same
nine parts can be followed from brief to second-market order.

**Client deck** drops amber entirely, because nothing goes to a client marked unresolved. It keeps
black for what happens, grey for what is being replaced, and one accent (`#1D5C8C`) that means
either "yours" or "the one thing to look at on this page". Swapping that single value re-skins the
deck. The seasonal launch film example from page 02 recurs on pages 07 and 09.

## Rebuilding

The four scripts take `DECK_SRC`, `DECK_NAME`, `DECK_SVG`, `DECK_PNG` and `DECK_QA`, so both decks
run through the same pipeline. Defaults build the internal deck.

```bash
# internal storyboard
./build.sh && ./render.sh && ./export-svg.sh && ./build-pptx.sh

# client version
DECK_SRC=client-src DECK_NAME=technology-client ./build.sh
DECK_NAME=technology-client DECK_QA=qa-client ./render.sh
DECK_NAME=technology-client DECK_SVG=client-svg ./export-svg.sh
DECK_NAME=technology-client DECK_SVG=client-svg DECK_PNG=client-png ./build-pptx.sh
```

`render.sh` writes one PNG per page for visual checking. The PDF comes from Chromium:

```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless --disable-gpu --no-sandbox \
  --no-pdf-header-footer --virtual-time-budget=45000 \
  --print-to-pdf=dist/technology-client.pdf dist/technology-client.html
```

Pages are authored as fixed 1600 x 900 px layouts, which maps exactly to PowerPoint widescreen at
120 px per inch. Geometry is inline SVG; text is an absolutely positioned HTML layer over it.
`export-svg.js` measures the rendered text and converts it to real SVG text, so the exported files
are fully editable vectors rather than pictures. `add-svg-blips.py` then hangs those vectors off the
PowerPoint image parts, so PowerPoint shows vector artwork and Convert to Shape works, with the PNG
as a fallback for anything that cannot read SVG.
