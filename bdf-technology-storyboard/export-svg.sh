#!/usr/bin/env bash
# Export each slide as a standalone editable SVG (vector geometry + real text).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
CHR=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
WORK="$ROOT/.svgwork"; rm -rf "$WORK"; mkdir -p "$WORK" "$ROOT/dist/svg"
python3 - "$ROOT/dist/technology-storyboard.html" "$ROOT/export-svg.js" "$WORK/export.html" <<'PY'
import sys
html=open(sys.argv[1]).read(); js=open(sys.argv[2]).read()
open(sys.argv[3],'w').write(html.replace('</body>','<script>\n'+js+'\n</script>\n</body>'))
PY
"$CHR" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1600,990 \
  --virtual-time-budget=20000 --dump-dom "file://$WORK/export.html" > "$WORK/dom.html" 2>/dev/null
python3 - "$WORK/dom.html" "$ROOT/dist/svg" <<'PY'
import re,sys,html,os
dom=open(sys.argv[1]).read(); out=sys.argv[2]
ms=re.findall(r'<textarea id="svgpayload">(.*?)</textarea>', dom, re.S)
if not ms: sys.exit("exporter did not run (no payload in DOM)")
blob=html.unescape(ms[-1])
if blob.startswith('EXPORT-ERROR'): sys.exit(blob[:2000])
parts=blob.split('\n@@SLIDEBREAK@@\n')
for i,p in enumerate(parts,1):
    f=os.path.join(out,'slide-%02d.svg'%i); open(f,'w').write(p)
print("wrote %d svg files"%len(parts))
PY
