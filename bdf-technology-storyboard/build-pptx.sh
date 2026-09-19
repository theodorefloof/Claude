#!/usr/bin/env bash
# Build an editable .pptx: every slide is the exported SVG (vector, PowerPoint can
# "Convert to Shape"), with a high-resolution PNG as the universal fallback.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
CHR=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
PNG="$ROOT/dist/${DECK_PNG:-png}"; SVGDIR="$ROOT/dist/${DECK_SVG:-svg}"
mkdir -p "$PNG"

# 1. rasterise each exported SVG at 2x for the fallback image
for f in "$SVGDIR"/slide-*.svg; do
  n=$(basename "$f" .svg)
  printf '<html><body style="margin:0"><img src="file://%s" width="1600" height="900"></body></html>' "$f" > "$PNG/$n.html"
  "$CHR" --headless --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
     --window-size=1600,990 --screenshot="$PNG/$n.raw.png" "file://$PNG/$n.html" >/dev/null 2>&1
done
python3 - "$PNG" <<'PY'
import glob, os, sys
from PIL import Image
for f in sorted(glob.glob(os.path.join(sys.argv[1], '*.raw.png'))):
    Image.open(f).crop((0, 0, 3200, 1800)).save(f.replace('.raw.png', '.png'))
    os.remove(f)
for f in glob.glob(os.path.join(sys.argv[1], '*.html')):
    os.remove(f)
print('rasterised', len(glob.glob(os.path.join(sys.argv[1], '*.png'))), 'slides')
PY

# 2. lay the PNGs into a widescreen deck
node "$ROOT/build-pptx.js"

# 3. attach the SVGs so PowerPoint shows vectors and can convert them to shapes
python3 "$ROOT/add-svg-blips.py"
