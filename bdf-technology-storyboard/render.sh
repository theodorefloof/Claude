#!/usr/bin/env bash
# Render each slide to a 1600x900 PNG for visual QA. Usage: ./render.sh [first] [last]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
CHR=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
QA="$ROOT/${DECK_QA:-qa}"; mkdir -p "$QA"; rm -f "$QA"/slide*.png "$QA"/slide*.html
HTML="$ROOT/dist/${DECK_NAME:-technology-storyboard}.html"
FIRST=${1:-1}; LAST=${2:-99}
python3 - "$HTML" "$QA" "$FIRST" "$LAST" <<'PY'
import re,sys,os
html=open(sys.argv[1]).read(); qa=sys.argv[2]; a=int(sys.argv[3]); b=int(sys.argv[4])
head=html.split('<body>')[0]
slides=re.findall(r'(<section class="slide".*?</section>)', html, re.S)
for i,s in enumerate(slides,1):
    if not (a<=i<=b): continue
    open(os.path.join(qa,'slide%02d.html'%i),'w').write(head+'<body style="background:#fff;margin:0">'+
        s.replace('margin:0 auto 28px','margin:0')+'</body></html>')
print("%d slides in deck"%len(slides))
PY
# chromium reserves ~90px of window for chrome even headless -> render tall, then crop
for f in "$QA"/slide*.html; do
  n=$(basename "$f" .html)
  "$CHR" --headless --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
     --window-size=1600,990 --screenshot="$QA/$n.raw.png" "file://$f" >/dev/null 2>&1
done
python3 - "$QA" <<'PY'
import glob,os
from PIL import Image
for f in sorted(glob.glob(os.path.join(__import__('sys').argv[1],'*.raw.png'))):
    im=Image.open(f).crop((0,0,1600,900)); out=f.replace('.raw.png','.png'); im.save(out); os.remove(f)
    print(out)
PY
