#!/usr/bin/env bash
# Build the single-file HTML storyboard from src/ partials.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="$ROOT/src"; OUT="$ROOT/dist/technology-storyboard.html"
mkdir -p "$ROOT/dist"
DEFS="$(cat "$SRC/defs.svg")"
{
  cat "$SRC/00-head.html"
  for f in "$SRC"/s[0-9][0-9].html; do
    # inject the shared <defs> into each slide's SVG so every slide is self-contained
    python3 - "$f" "$SRC/defs.svg" <<'PY'
import sys
slide = open(sys.argv[1]).read()
defs  = open(sys.argv[2]).read().strip()
sys.stdout.write(slide.replace('<!--DEFS-->', defs))
PY
  done
  cat "$SRC/99-foot.html"
} > "$OUT"
echo "built: $OUT  ($(grep -c 'class="slide"' "$OUT") slides, $(wc -c <"$OUT") bytes)"
