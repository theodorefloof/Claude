# Technology section storyboard

A draft visual storyboard for the technology section of the pitch, built from the Blake x Pat
discussion transcript. Fifteen pages, rough styling, developed thinking.

**Start here:** `dist/technology-storyboard.pdf`
**Then read:** [`ASSUMPTIONS-AND-OPEN-ITEMS.md`](ASSUMPTIONS-AND-OPEN-ITEMS.md)

## The argument, page by page

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

## Visual language

Carried across every diagram, introduced on page 01:

- **solid black outline** exists today, in use on our work now
- **dashed black outline** integration work, connecting MAKE to the client's stack
- **dotted grey outline** roadmap theme, direction only, no dates
- **amber** open, we owe an answer. Flagged, never hidden.
- **blue** client-owned: their DAM, their tools, their team

Content components are lettered chips (A to I) and recur on pages 02, 09, 10 and 11, so the same
nine parts can be followed from brief to second-market order.

## Rebuilding

```bash
./build.sh        # src/ partials  ->  dist/technology-storyboard.html
./render.sh       # each page -> qa/slideNN.png for visual checking
./export-svg.sh   # each page -> dist/svg/slide-NN.svg (vector, real text)
./build-pptx.sh   # svg + png   -> dist/technology-storyboard.pptx
```

The PDF comes from Chromium: `chrome --headless --print-to-pdf --no-pdf-header-footer`.

Pages are authored as fixed 1600 x 900 px layouts, which maps exactly to PowerPoint widescreen at
120 px per inch. Geometry is inline SVG; text is an absolutely positioned HTML layer over it.
`export-svg.js` measures the rendered text and converts it to real SVG text, so the exported files
are fully editable vectors rather than pictures.
