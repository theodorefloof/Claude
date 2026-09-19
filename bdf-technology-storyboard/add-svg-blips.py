#!/usr/bin/env python3
"""Attach the vector page to every picture in the deck.

PowerPoint stores an SVG image as a normal raster blip plus an `asvg:svgBlip`
extension pointing at the SVG part. Renderers that understand it draw the
vector (and offer Graphics Format > Convert to Shape); everything else falls
back to the PNG. This rewrites the pptx that build-pptx.js produced to add
that extension to each slide's picture.
"""
import os
import re
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
PPTX = os.path.join(ROOT, 'dist', os.environ.get('DECK_NAME', 'technology-storyboard') + '.pptx')
SVGDIR = os.path.join(ROOT, 'dist', os.environ.get('DECK_SVG', 'svg'))

SVG_NS = 'http://schemas.microsoft.com/office/drawing/2016/SVG/main'
SVG_EXT_URI = '{96DAC541-7B7A-43D3-8B79-37D633B846F1}'
REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
IMAGE_REL = REL_NS + '/image'


def slide_index(name):
    return int(re.search(r'slide(\d+)\.xml$', name).group(1))


def main():
    if not os.path.exists(PPTX):
        sys.exit('run build-pptx.js first')
    src = PPTX + '.tmp'
    shutil.move(PPTX, src)

    zin = zipfile.ZipFile(src)
    names = zin.namelist()
    parts = {n: zin.read(n) for n in names}
    zin.close()

    slides = sorted([n for n in names if re.match(r'ppt/slides/slide\d+\.xml$', n)],
                    key=slide_index)
    if len(slides) < 1:
        print('warning: expected 15 slides, found %d' % len(slides))

    added = 0
    for n in slides:
        idx = slide_index(n)
        svg_path = os.path.join(SVGDIR, 'slide-%02d.svg' % idx)
        if not os.path.exists(svg_path):
            print('no svg for slide %d, leaving the raster only' % idx)
            continue

        # 1. the SVG becomes a media part of its own
        media = 'ppt/media/page%02d.svg' % idx
        parts[media] = open(svg_path, 'rb').read()

        # 2. register it in the slide's relationships, next to the png
        rels_name = 'ppt/slides/_rels/slide%d.xml.rels' % idx
        rels = parts[rels_name].decode('utf-8')
        used = [int(m) for m in re.findall(r'Id="rId(\d+)"', rels)]
        rid = 'rId%d' % (max(used) + 1 if used else 1)
        rels = rels.replace(
            '</Relationships>',
            '<Relationship Id="%s" Type="%s" Target="../media/page%02d.svg"/>'
            '</Relationships>' % (rid, IMAGE_REL, idx))
        parts[rels_name] = rels.encode('utf-8')

        # 3. hang the svgBlip off the picture's existing blip
        xml = parts[n].decode('utf-8')
        m = re.search(r'<a:blip\b[^>]*?(/>|>\s*</a:blip>)', xml)
        if not m:
            print('slide %d: no picture blip found, skipped' % idx)
            continue
        blip = m.group(0)
        open_tag = blip[:blip.index('>') + 1]
        if open_tag.endswith('/>'):
            open_tag = open_tag[:-2] + '>'
        ext = ('<a:extLst><a:ext uri="%s">'
               '<asvg:svgBlip xmlns:asvg="%s" r:embed="%s"/>'
               '</a:ext></a:extLst>' % (SVG_EXT_URI, SVG_NS, rid))
        xml = xml.replace(blip, open_tag + ext + '</a:blip>', 1)
        parts[n] = xml.encode('utf-8')
        added += 1

    # 4. the package has to know what an .svg is
    ct = parts['[Content_Types].xml'].decode('utf-8')
    if 'Extension="svg"' not in ct:
        ct = ct.replace('<Types ', '<Types ', 1)
        ct = re.sub(r'(<Types[^>]*>)',
                    r'\1<Default Extension="svg" ContentType="image/svg+xml"/>',
                    ct, count=1)
        parts['[Content_Types].xml'] = ct.encode('utf-8')

    order = [p for p in names if p in parts] + [p for p in parts if p not in names]
    with zipfile.ZipFile(PPTX, 'w', zipfile.ZIP_DEFLATED) as zout:
        for p in order:
            zout.writestr(p, parts[p])

    os.remove(src)
    print('attached vector pages to %d of %d slides' % (added, len(slides)))


if __name__ == '__main__':
    main()
