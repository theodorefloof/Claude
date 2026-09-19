/* Injected into the built deck by export-svg.sh.
   Converts each slide into a standalone, fully editable SVG:
     - the slide's existing inline <svg> geometry is kept as-is
     - bordered / filled HTML boxes become <rect>s
     - every rendered text LINE becomes an <svg:text> at its measured position
   Result is parked in a hidden textarea whose id is the marker below, for --dump-dom. */
(function () {
 try {
  var MARK = 'svgpayload';
  var BRK = '@@' + 'SLIDEBREAK' + '@@';
  var NS = 'http://www.w3.org/2000/svg';
  // Liberation Sans / Arial hhea metrics, used to place the baseline inside a line box
  var ASC = 0.905, DESC = 0.212;

  function px(v) { return Math.round(parseFloat(v) * 100) / 100; }
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function opaque(c) { return c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent'; }
  function dash(style, w) {
    if (style === 'dashed') return (w * 4).toFixed(1) + ' ' + (w * 3).toFixed(1);
    if (style === 'dotted') return (w * 1.2).toFixed(1) + ' ' + (w * 2.4).toFixed(1);
    return null;
  }

  function boxRects(slide, origin, out) {
    var els = slide.querySelectorAll('div, span');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], cs = getComputedStyle(el);
      var bw = parseFloat(cs.borderTopWidth) || 0;
      var bg = cs.backgroundColor;
      if (!opaque(bg) && bw < 0.4) continue;
      var r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      var x = px(r.left - origin.left), y = px(r.top - origin.top);
      var a = ['x="' + x + '"', 'y="' + y + '"',
               'width="' + px(r.width) + '"', 'height="' + px(r.height) + '"'];
      var rad = parseFloat(cs.borderTopLeftRadius) || 0;
      if (rad > 0) a.push('rx="' + px(Math.min(rad, r.height / 2)) + '"');
      a.push('fill="' + (opaque(bg) ? bg : 'none') + '"');
      if (bw >= 0.4) {
        a.push('stroke="' + cs.borderTopColor + '"');
        a.push('stroke-width="' + px(bw) + '"');
        var d = dash(cs.borderTopStyle, bw);
        if (d) a.push('stroke-dasharray="' + d + '"');
      } else {
        a.push('stroke="none"');
      }
      out.push('<rect ' + a.join(' ') + '/>');
    }
  }

  /* group the characters of a text node into rendered lines */
  function lines(node) {
    var t = node.nodeValue, res = [], rng = document.createRange();
    var cur = null;
    for (var i = 0; i < t.length; i++) {
      rng.setStart(node, i); rng.setEnd(node, i + 1);
      var r = rng.getClientRects()[0];
      if (!r || r.width === 0 && t[i].trim() === '') {
        if (cur) cur.txt += t[i];
        continue;
      }
      if (!cur || Math.abs(r.top - cur.top) > 1.5) {
        cur = { top: r.top, bottom: r.bottom, left: r.left, right: r.right, txt: t[i] };
        res.push(cur);
      } else {
        cur.txt += t[i];
        cur.left = Math.min(cur.left, r.left);
        cur.right = Math.max(cur.right, r.right);
        cur.bottom = Math.max(cur.bottom, r.bottom);
      }
    }
    return res.filter(function (l) { return l.txt.trim() !== ''; });
  }

  function textNodes(slide, origin, out) {
    var walk = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walk.nextNode())) {
      if (!n.nodeValue.trim()) continue;
      if (n.parentElement.closest('svg')) continue;      // already vector
      var cs = getComputedStyle(n.parentElement);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      var fs = parseFloat(cs.fontSize);
      var align = cs.textAlign;
      var ls = parseFloat(cs.letterSpacing) || 0;
      var tt = cs.textTransform;
      var ln = lines(n);
      for (var j = 0; j < ln.length; j++) {
        var L = ln[j];
        var h = L.bottom - L.top;
        var baseline = L.top + (h - (ASC + DESC) * fs) / 2 + ASC * fs;
        var anchor = 'start', x = L.left;
        if (align === 'center') { anchor = 'middle'; x = (L.left + L.right) / 2; }
        else if (align === 'right' || align === 'end') { anchor = 'end'; x = L.right; }
        var txt = L.txt.replace(/ /g, ' ');
        if (tt === 'uppercase') txt = txt.toUpperCase();
        var a = ['x="' + px(x - origin.left) + '"',
                 'y="' + px(baseline - origin.top) + '"',
                 'fill="' + cs.color + '"',
                 'font-family="Arial, Helvetica, sans-serif"',
                 'font-size="' + px(fs) + '"'];
        if (parseInt(cs.fontWeight, 10) >= 600) a.push('font-weight="700"');
        if (cs.fontStyle === 'italic') a.push('font-style="italic"');
        if (ls) a.push('letter-spacing="' + px(ls) + '"');
        if (anchor !== 'start') a.push('text-anchor="' + anchor + '"');
        a.push('xml:space="preserve"');
        out.push('<text ' + a.join(' ') + '>' + esc(txt) + '</text>');
      }
    }
  }

  /* bake CSS-class styling on the vector geometry into presentation attributes,
     so each exported file stands alone in Illustrator, Figma or PowerPoint */
  var SHAPES = {RECT:1, LINE:1, PATH:1, CIRCLE:1, ELLIPSE:1, POLYGON:1, POLYLINE:1, G:1, USE:1};
  var PROPS = ['fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin'];
  function bake(liveSvg) {
    var clone = liveSvg.cloneNode(true);
    var live = liveSvg.querySelectorAll('*'), cl = clone.querySelectorAll('*');
    for (var i = 0; i < live.length; i++) {
      var tag = live[i].tagName.toUpperCase();
      if (cl[i].hasAttribute('class')) cl[i].removeAttribute('class');
      if (!SHAPES[tag]) continue;
      if (live[i].closest('defs')) continue;      // defs carry their own attributes
      var cs = getComputedStyle(live[i]);
      for (var k = 0; k < PROPS.length; k++) {
        var v = cs.getPropertyValue(PROPS[k]);
        if (!v || v === 'none' && PROPS[k] !== 'fill' && PROPS[k] !== 'stroke') continue;
        if (PROPS[k] === 'stroke-dasharray' && v === 'none') continue;
        cl[i].setAttribute(PROPS[k], v.replace(/px/g, ''));
      }
    }
    return clone.innerHTML;
  }

  var slides = document.querySelectorAll('section.slide');
  var all = [];
  for (var s = 0; s < slides.length; s++) {
    var slide = slides[s];
    var origin = slide.getBoundingClientRect();
    var canvas = slide.querySelector('svg.canvas');
    var inner = canvas ? bake(canvas) : '';
    var out = [];
    boxRects(slide, origin, out);
    textNodes(slide, origin, out);
    all.push(
      '<svg xmlns="' + NS + '" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
      'width="1600" height="900" viewBox="0 0 1600 900">\n' +
      '<rect x="0" y="0" width="1600" height="900" fill="#ffffff"/>\n' +
      '<g id="geometry">' + inner + '</g>\n' +
      '<g id="boxes-and-text">\n' + out.join('\n') + '\n</g>\n</svg>'
    );
  }
  emit(all.join('\n' + BRK + '\n'));
 } catch (e) { emit('EXPORT-ERROR: ' + (e && e.stack || e)); }
 function emit(v) {
   var ta = document.createElement('textarea');
   ta.setAttribute('id', MARK);
   ta.textContent = v;
   document.body.appendChild(ta);
 }
})();
