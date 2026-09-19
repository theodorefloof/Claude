/* Lay the rasterised storyboard pages into a 16:9 PowerPoint deck.
   add-svg-blips.py then attaches the vector version of each page. */
const fs = require('fs');
const path = require('path');
const Pptx = require('pptxgenjs');

const ROOT = __dirname;
const PNG = path.join(ROOT, 'dist', process.env.DECK_PNG || 'png');
const OUT = path.join(ROOT, 'dist', (process.env.DECK_NAME || 'technology-storyboard') + '.pptx');

const TITLES = [
  'MAKE is running now',
  'Modular content production',
  'Three routes through one system',
  'MAKE, the orchestration layer',
  'One connected space',
  'Modularity, a brief uses what it needs',
  'Anatomy of a module',
  'AI tasks across pre, production and post',
  'Your DAM stays the source of truth',
  'Ordering, not re-briefing',
  'The historic back catalogue, open',
  'Today, integration, next',
  'Effort and efficiency, directional',
  'Written submission and live session',
  'Scenario selection board, live only',
];

const pres = new Pptx();
pres.layout = 'LAYOUT_WIDE';            // 13.333in x 7.5in, the same 16:9 as the pages
pres.author = 'Technology section storyboard';
pres.title = 'Technology section storyboard v1';
pres.subject = 'Rough visual storyboard for narrative agreement';

const files = fs.readdirSync(PNG).filter((f) => f.endsWith('.png')).sort();
files.forEach((f, i) => {
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addImage({
    path: path.join(PNG, f),
    x: 0, y: 0, w: 13.333, h: 7.5,
    altText: TITLES[i] || `Storyboard page ${i + 1}`,
  });
});

pres.writeFile({ fileName: OUT }).then(() => {
  console.log(`wrote ${OUT} (${files.length} slides)`);
});
