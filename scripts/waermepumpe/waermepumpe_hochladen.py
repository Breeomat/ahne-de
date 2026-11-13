#!/usr/bin/env python3
"""Waermepumpen-Bericht vom Vortag erzeugen und auf www.ahne.de/waermepumpe/ veroeffentlichen.

Laeuft auf dem PC neben waermepumpen_auswertung.py (gleicher Ordner, gleicher Ordner "logs", dazu
waermepumpen_strom_verlauf.csv in logs oder daneben fuer Strom und COP, falls vorhanden), z. B. jede Nacht
um 1 Uhr per Windows-Aufgabenplanung (waermepumpe_hochladen.bat). Nur Python-Standardbibliothek.

Ablauf: Logs des Vortags lesen -> auf eine Messung je Minute ausduennen (Schaltvorgaenge bleiben erhalten)
-> HTML-Bericht mit waermepumpen_auswertung.py bauen -> per GitHub-API als public/waermepumpe/index.html ins
Repository breeomat/ahne-de schreiben. Der Commit loest die Veroeffentlichung der Webseite aus.

Zugang: ein GitHub-Token (fein-granular, nur Repository ahne-de, Recht "Contents: Read and write") in der Datei
github_token.txt neben diesem Skript oder in der Umgebungsvariablen AHNE_GITHUB_TOKEN.

Aufruf:
    python waermepumpe_hochladen.py                    # Vortag hochladen
    python waermepumpe_hochladen.py --tag 2026-11-06   # bestimmten Tag hochladen
    python waermepumpe_hochladen.py --nur-datei test.html   # nur Datei schreiben, nichts hochladen
"""
import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta

HIER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HIER)
import waermepumpen_auswertung as wa  # noqa: E402

REPO = "breeomat/ahne-de"
ZIEL = "public/waermepumpe/index.html"
ZWEIG = "main"
RASTER_S = 60


def token_lesen():
    t = os.environ.get("AHNE_GITHUB_TOKEN", "").strip()
    datei = os.path.join(HIER, "github_token.txt")
    if not t and os.path.exists(datei):
        with open(datei, encoding="utf-8") as f:
            t = f.read().strip()
    if not t:
        sys.exit("Kein GitHub-Token: github_token.txt neben dem Skript anlegen oder AHNE_GITHUB_TOKEN setzen.")
    return t


def ausduennen(zeilen):
    """Eine Messung je Pumpe und Minute; Zeilen mit geaendertem Schaltzustand bleiben immer."""
    behalten, letzte, roh_davor = [], {}, {}
    for z in zeilen:
        schluessel = (z["pumpe"], int(z["t"].timestamp()) // RASTER_S)
        zustand = tuple(z[k] for k in wa.BOOLS) + (z["modus"],)
        vorher = letzte.get(z["pumpe"])
        if vorher is None or vorher[0] != schluessel or vorher[1] != zustand:
            # bei einem Schaltvorgang auch die letzte Messung davor behalten (Laufzeiten bleiben genau)
            davor = roh_davor.get(z["pumpe"])
            if vorher is not None and vorher[1] != zustand and davor is not None and davor is not vorher[2]:
                behalten.append(davor)
            behalten.append(z)
            letzte[z["pumpe"]] = (schluessel, zustand, z)
        roh_davor[z["pumpe"]] = z
    behalten.sort(key=lambda z: (z["t"], z["pumpe"]))
    return behalten


def strom_des_tages(tag):
    """Strom- und Waermezaehler aus waermepumpen_strom_verlauf.csv (neben dem Skript) fuer diesen Tag
    (Messpunkte alle ca. 15 Minuten). None, wenn waermepumpen_auswertung.py noch keine Strom-Auswertung kennt."""
    if not hasattr(wa, "lese_strom"):
        return None
    # das Dashboard legt die Datei im Ordner logs ab, aeltere Fassungen neben dem Skript
    pfade = [os.path.join(HIER, "logs", "waermepumpen_strom_verlauf.csv"), os.path.join(HIER, "waermepumpen_strom_verlauf.csv")]
    pfad = next((p for p in pfade if os.path.exists(p)), None)
    alle = wa.lese_strom(pfad) if pfad else {}
    beginn = int(datetime.combine(tag, datetime.min.time()).timestamp())
    ende = beginn + 86400
    ergebnis = {}
    for pumpe, reihen in alle.items():
        heute = [r for r in reihen if beginn <= r[0] < ende]
        if heute:
            ergebnis[pumpe] = heute
    return ergebnis


def bericht(tag):
    # nur die Wärmepumpen-Logs; Strom-Verlauf, Shelly-Werte usw. im selben Ordner nicht als Log lesen
    alle_csv = wa.dateien_sammeln([])
    dateien = [d for d in alle_csv if os.path.basename(d).lower().startswith("waermepumpen_log")] or \
              [d for d in alle_csv if "strom_verlauf" not in os.path.basename(d) and not os.path.basename(d).lower().startswith("shelly")]
    if not dateien:
        sys.exit("Keine CSV-Dateien im Ordner logs gefunden.")
    zeilen, hinweise = wa.lese_logs(dateien)
    zeilen = [z for z in zeilen if z["t"].date() == tag]
    if not zeilen:
        sys.exit(f"Keine Messdaten vom {tag:%d.%m.%Y}.")
    zeilen = ausduennen(zeilen)
    des_tages = [d for d in dateien if tag.isoformat() in os.path.basename(d)] or dateien
    strom = strom_des_tages(tag)
    if strom is None:  # aeltere waermepumpen_auswertung.py ohne Strom/COP
        text = wa.html_bericht(wa.auswerten(zeilen), zeilen, hinweise, des_tages)
    else:
        text = wa.html_bericht(wa.auswerten(zeilen), zeilen, hinweise, des_tages, strom)
    # fuer die Webseite: nicht in Suchmaschinen, Titel mit Datum, Link zurueck zu ahne.de
    jetzt = datetime.now()
    text = text.replace("<title>Waermepumpen Auswertung</title>",
                        f'<meta name="robots" content="noindex"><title>Wärmepumpe {tag:%d.%m.%Y} · Marc Ahne</title>', 1)
    text = text.replace("<h1>Waermepumpen Auswertung</h1>",
                        f'<p class="m"><a href="/" style="color:inherit">← ahne.de</a></p>'
                        f"<h1>Wärmepumpe – Auswertung vom {tag:%d.%m.%Y}</h1>"
                        f'<p class="m">Automatisch erstellt am {jetzt:%d.%m.%Y um %H:%M} Uhr aus den Logdaten des Vortags.</p>', 1)
    return text


def hochladen(text, tag, token):
    url = f"https://api.github.com/repos/{REPO}/contents/{ZIEL}"
    kopf = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "waermepumpe-hochladen"}
    sha = None
    try:
        with urllib.request.urlopen(urllib.request.Request(f"{url}?ref={ZWEIG}", headers=kopf), timeout=60) as r:
            sha = json.load(r).get("sha")
    except urllib.error.HTTPError as e:
        if e.code != 404:
            sys.exit(f"GitHub antwortet beim Lesen mit {e.code}: {e.read().decode(errors='replace')[:300]}")
    daten = {"message": f"Wärmepumpe: Bericht vom {tag:%d.%m.%Y}", "branch": ZWEIG,
             "content": base64.b64encode(text.encode("utf-8")).decode("ascii")}
    if sha:
        daten["sha"] = sha
    anfrage = urllib.request.Request(url, data=json.dumps(daten).encode("utf-8"), method="PUT",
                                     headers={**kopf, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(anfrage, timeout=120) as r:
            print(f"Hochgeladen ({r.status}). In 1-2 Minuten unter https://www.ahne.de/waermepumpe/")
    except urllib.error.HTTPError as e:
        sys.exit(f"GitHub antwortet beim Hochladen mit {e.code}: {e.read().decode(errors='replace')[:300]}")


def main():
    ap = argparse.ArgumentParser(description="Waermepumpen-Bericht vom Vortag auf ahne.de veroeffentlichen.")
    ap.add_argument("--tag", help="Tag als JJJJ-MM-TT (Standard: gestern)")
    ap.add_argument("--nur-datei", help="nur in diese Datei schreiben, nicht hochladen")
    a = ap.parse_args()
    tag = date.fromisoformat(a.tag) if a.tag else date.today() - timedelta(days=1)
    text = bericht(tag)
    print(f"Bericht vom {tag:%d.%m.%Y}: {len(text) // 1024} KB")
    if a.nur_datei:
        with open(a.nur_datei, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Gespeichert: {a.nur_datei}")
    else:
        hochladen(text, tag, token_lesen())


if __name__ == "__main__":
    main()
