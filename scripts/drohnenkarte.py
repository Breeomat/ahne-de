#!/usr/bin/env python3
"""Karte für den Drohnenflug (Darstellung „Modern“, Startseite) erzeugen.

Quelle ist die Grundkarte von stockhausen-online (scripts/dorfkarte.py dort, Daten © OpenStreetMap-Mitwirkende, ODbL).
Dieses Skript übernimmt sie und bettet die Farben (Abendflug-Look) direkt ins SVG ein:

    python3 scripts/drohnenkarte.py ../stockhausen-online/src/assets/dorfkarte/basis.svg

Schreibt public/drohne/stockhausen.svg. Nur nötig, wenn sich die Grundkarte geändert hat.
"""
import sys
from pathlib import Path

ZIEL = Path(__file__).resolve().parent.parent / 'public/drohne/stockhausen.svg'

STIL = """<style>
.k-grund{fill:#0d181b}.k-acker{fill:#15252a}.k-wiese{fill:#132c25}.k-wald{fill:#0e3023}.k-gebuesch{fill:#122c20}
.k-wohnen{fill:#1a2430}.k-gewerbe{fill:#1e2232}.k-friedhof{fill:#142c27}.k-parken{fill:#1d2530}.k-sport{fill:#12503a}
.k-wasser{fill:#1b5b8a}.k-fluss{fill:none;stroke:#1b5b8a;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.k-bach{fill:none;stroke:#2a77ad;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.k-haus{fill:#2a4250;stroke:#6fd6c6;stroke-width:.35;stroke-opacity:.7}
.k-feldweg,.k-weg,.k-treppe,.k-zufahrt,.k-wohnstrasse,.k-hauptstrasse,[class$='-rand']{fill:none;stroke-linecap:round;stroke-linejoin:round}
.k-feldweg{stroke:#3f6a62;stroke-width:1.2;stroke-dasharray:4 3}.k-weg{stroke:#4f8077;stroke-width:1.2;stroke-dasharray:2 2}
.k-treppe{stroke:#4f8077;stroke-width:2.5;stroke-dasharray:1 1.5}
.k-zufahrt-rand{stroke:#081012;stroke-width:5}.k-zufahrt{stroke:#33505a;stroke-width:3.5}
.k-wohnstrasse-rand{stroke:#081012;stroke-width:9}.k-wohnstrasse{stroke:#3b5c66;stroke-width:7}
.k-hauptstrasse-rand{stroke:#081012;stroke-width:12}.k-hauptstrasse{stroke:#c9a75a;stroke-width:10}
.k-name{font:600 9px system-ui,-apple-system,'Segoe UI',sans-serif;fill:#bff3e8;paint-order:stroke;stroke:#0d181b;stroke-width:3;stroke-linejoin:round;dominant-baseline:central;letter-spacing:.04em}
</style>"""

quelle = Path(sys.argv[1]).read_text(encoding='utf-8')
kopf_ende = quelle.index('>') + 1
svg = quelle[:kopf_ende].replace(' class="dorfkarte__basis"', '') + STIL + quelle[kopf_ende:]
ZIEL.write_text(svg, encoding='utf-8')
print(f'{ZIEL} geschrieben ({len(svg) // 1024} KB)')
