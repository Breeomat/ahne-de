#!/usr/bin/env python3
"""Waermepumpen-Seiten auf www.ahne.de/waermepumpe/ veroeffentlichen (laeuft jede Nacht auf dem PC).

Laeuft auf dem PC neben waermepumpen_dashboard.py und waermepumpen_auswertung.py (gleicher Ordner, Ordner "logs"
mit den Logdateien und waermepumpen_strom_verlauf.csv), z. B. jede Nacht um 1 Uhr per Windows-Aufgabenplanung
(waermepumpe_hochladen.bat). Nur Python-Standardbibliothek.

Es entstehen zwei Seiten, beide in einem Commit ins Repository breeomat/ahne-de (loest die Veroeffentlichung aus):
- public/waermepumpe/index.html: dieselbe Ansicht wie das Dashboard (Seite aus waermepumpen_dashboard.py). Dessen
  Abfragen werden vorab mit den Programmteilen des Dashboards berechnet (Logs, Strom-Verlauf, Shelly) und eingebettet;
  Stand = Zeitpunkt des Hochladens, keine Live-Abfrage.
- public/waermepumpe/bericht/index.html: Tagesauswertung des Vortags (waermepumpen_auswertung.py).
Ist waermepumpen_dashboard.py nicht da, wird nur die Tagesauswertung hochgeladen (wie frueher als index.html).

Zugang: ein GitHub-Token (fein-granular, nur Repository ahne-de, Recht "Contents: Read and write") in der Datei
github_token.txt neben diesem Skript oder in der Umgebungsvariablen AHNE_GITHUB_TOKEN.

Aufruf:
    python waermepumpe_hochladen.py                    # Dashboard + Auswertung vom Vortag hochladen
    python waermepumpe_hochladen.py --tag 2026-11-06   # Auswertung fuer einen bestimmten Tag
    python waermepumpe_hochladen.py --nur-datei test.html   # nur Dateien schreiben (test.html und test_bericht.html)
"""
import argparse
import base64
import csv
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date, datetime, timedelta

HIER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HIER)
import waermepumpen_auswertung as wa  # noqa: E402

REPO = "breeomat/ahne-de"
ZIEL_DASHBOARD = "public/waermepumpe/index.html"
ZIEL_BERICHT = "public/waermepumpe/bericht/index.html"
ZWEIG = "main"
RASTER_S = 60          # Tagesauswertung: eine Messung je Minute


def token_lesen():
    t = os.environ.get("AHNE_GITHUB_TOKEN", "").strip()
    datei = os.path.join(HIER, "github_token.txt")
    if not t and os.path.exists(datei):
        with open(datei, encoding="utf-8") as f:
            t = f.read().strip()
    if not t:
        sys.exit("Kein GitHub-Token: github_token.txt neben dem Skript anlegen oder AHNE_GITHUB_TOKEN setzen.")
    return t


def log_dateien():
    """Nur die Waermepumpen-Logs; Strom-Verlauf, Shelly-Werte usw. im selben Ordner nicht als Log lesen."""
    alle_csv = wa.dateien_sammeln([])
    return [d for d in alle_csv if os.path.basename(d).lower().startswith("waermepumpen_log")] or \
           [d for d in alle_csv if "strom_verlauf" not in os.path.basename(d) and not os.path.basename(d).lower().startswith("shelly")]


def strom_pfad():
    # das Dashboard legt die Datei im Ordner logs ab, aeltere Fassungen neben dem Skript
    pfade = [os.path.join(HIER, "logs", "waermepumpen_strom_verlauf.csv"), os.path.join(HIER, "waermepumpen_strom_verlauf.csv")]
    return next((p for p in pfade if os.path.exists(p)), None)


# ---------------------------------------------------------------- Tagesauswertung (Vortag)
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
    """Strom- und Waermezaehler fuer diesen Tag (Messpunkte alle ca. 15 Minuten).
    None, wenn waermepumpen_auswertung.py noch keine Strom-Auswertung kennt."""
    if not hasattr(wa, "lese_strom"):
        return None
    pfad = strom_pfad()
    alle = wa.lese_strom(pfad) if pfad else {}
    beginn = int(datetime.combine(tag, datetime.min.time()).timestamp())
    ende = beginn + 86400
    ergebnis = {}
    for pumpe, reihen in alle.items():
        heute = [r for r in reihen if beginn <= r[0] < ende]
        if heute:
            ergebnis[pumpe] = heute
    return ergebnis


def bericht(tag, zurueck="/", zurueck_text="← ahne.de"):
    dateien = log_dateien()
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
    # fuer die Webseite: nicht in Suchmaschinen, Titel mit Datum, Link zurueck
    jetzt = datetime.now()
    text = text.replace("<title>Waermepumpen Auswertung</title>",
                        f'<meta name="robots" content="noindex"><title>Wärmepumpe {tag:%d.%m.%Y} · Marc Ahne</title>', 1)
    text = text.replace("<h1>Waermepumpen Auswertung</h1>",
                        f'<p class="m"><a href="{zurueck}" style="color:inherit">{zurueck_text}</a></p>'
                        f"<h1>Wärmepumpe – Auswertung vom {tag:%d.%m.%Y}</h1>"
                        f'<p class="m">Automatisch erstellt am {jetzt:%d.%m.%Y um %H:%M} Uhr aus den Logdaten des Vortags.</p>', 1)
    return text


# ---------------------------------------------------------------- Dashboard-Ansicht (Schnappschuss)
def _wert(k, v, wd):
    """Wert aus der Log-CSV so umwandeln, wie das Dashboard ihn live liefert."""
    if v in (None, ""):
        return None
    if k in wd.BOOLS:
        return v.strip().lower() == "true"
    if k in wd.ZEITEN or k == "modus":
        return v
    try:
        z = round(float(v.replace(",", ".")), 1)
    except ValueError:
        return v
    if k == "starts":
        return int(z)
    return None if z <= -49 else z


def letzte_werte(wd, jetzt):
    """Letzte Messung je Pumpe aus den Logs (fuer Kacheln, Zustaende und Details), Werte wie live umgewandelt."""
    grenze = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(jetzt - 6 * 3600))
    letzte, stand = {}, {}
    for pfad in log_dateien():
        try:
            if os.path.getmtime(pfad) < jetzt - 6 * 3600:
                continue
            with open(pfad, newline="", encoding="utf-8-sig") as f:
                for r in csv.DictReader(f):
                    if (r.get("zeit") or "") < grenze or r.get("pumpe") not in wd.PUMPEN:
                        continue
                    try:
                        t = int(time.mktime(time.strptime(r["zeit"], "%Y-%m-%d %H:%M:%S")))
                    except (ValueError, KeyError, TypeError):
                        continue
                    if t >= stand.get(r["pumpe"], 0):
                        stand[r["pumpe"]] = t
                        letzte[r["pumpe"]] = {k: _wert(k, r.get(k), wd) for k in wd.WERTE}
        except OSError:
            continue
    return letzte, stand


def strom_daten(jetzt):
    """waermepumpen_strom_verlauf.csv -> Daten wie /api/strom des Dashboards."""
    pfad = strom_pfad()
    if not pfad:
        return {"aktiv": False}
    reihen = {}
    with open(pfad, newline="", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            try:
                t = int(time.mktime(time.strptime(r["zeit"], "%Y-%m-%d %H:%M:%S")))
                wm, st = float(r["wm_gesamt"]), float(r["strom_gesamt"])
            except (ValueError, KeyError, TypeError):
                continue
            hs = r.get("heizstab_strom")
            try:
                hs = float(hs) if hs not in (None, "") else None
            except ValueError:
                hs = None
            reihen.setdefault(r.get("pumpe") or "?", []).append((t, wm, st, hs))
    for v in reihen.values():
        v.sort()
    if not reihen:
        return {"aktiv": False}

    def zuwachs(rs, t0, t1):
        rs = [x for x in rs if t0 <= x[0] <= t1]
        if len(rs) < 2:
            return None
        return rs[-1][1] - rs[0][1], rs[-1][2] - rs[0][2], rs[0][0], rs[-1][0]

    def zelle(w, s):
        return {"wm": round(w, 1), "strom": round(s, 1), "cop": round(w / s, 2) if s >= 1 else None}

    heute0 = int(time.mktime(date.today().timetuple()))
    bereiche = {"Gestern": (heute0 - 86400, heute0), "7 Tage": (heute0 - 7 * 86400, jetzt)}
    zeitraeume = {}
    for name, (t0, t1) in bereiche.items():
        spalte, sw, ss, ok = {}, 0.0, 0.0, True
        for n, rs in reihen.items():
            z = zuwachs(rs, t0, t1)
            if z is None:
                ok = False
                continue
            spalte[n] = zelle(z[0], z[1])
            sw, ss = sw + z[0], ss + z[1]
        if spalte:
            if ok and len(spalte) > 1:
                spalte["Gesamt"] = zelle(sw, ss)
            zeitraeume[name] = spalte
    tage = []
    for i in range(7, 0, -1):
        t0 = heute0 - i * 86400
        t1 = t0 + 86400
        w = s = 0.0
        teil, ok = False, True
        for rs in reihen.values():
            z = zuwachs(rs, t0, t1 - 1)
            if z is None:
                ok = False
                break
            w, s = w + z[0], s + z[1]
            teil = teil or z[2] - t0 > 1800 or t1 - z[3] > 1800
        if ok and s >= 1:
            tage.append({"tag": time.strftime("%Y-%m-%d", time.localtime(t0)), "cop": round(w / s, 2),
                         "wm": round(w, 1), "strom": round(s, 1), "teilweise": teil})
    letzte = {}
    for n, rs in reihen.items():
        t, wm, st, hs = rs[-1]
        letzte[n] = {"wm_gesamt": wm, "strom_gesamt": st, "heizstab_strom": hs}
    stand = max(rs[-1][0] for rs in reihen.values())
    return {"aktiv": True, "intervall": 15, "fehler": None, "stand": stand, "letzte": letzte,
            "zeitraeume": zeitraeume, "tage": tage, "punkte": sum(len(v) for v in reihen.values())}


# Wird VOR dem Skript des Dashboards eingefuegt: beantwortet dessen Abfragen (/api, /api/strom, ...) aus den
# eingebetteten, vorab berechneten Antworten und stellt die Uhr auf den Stand des Schnappschusses.
EINSATZ = r"""<script>
(function(){
var DD=__DATEN__,ENDE=DD.ende*1000;
Date.now=function(){return ENDE};
function passend(liste,wert){var ks=Object.keys(liste).map(Number).sort(function(a,b){return a-b});
 for(var i=0;i<ks.length;i++)if(ks[i]>=wert-0.01)return liste[ks[i]];return liste[ks[ks.length-1]]}
function antwort(u){var pfad=u.split("?")[0],q=new URLSearchParams(u.split("?")[1]||"");
 if(pfad=="/api"){var t1=+q.get("bis")||DD.ende,t0=+q.get("von")||t1-6*3600;return passend(DD.api,Math.min(t1-t0,DD.ende-t0)/3600)}
 if(pfad=="/api/stromverlauf")return passend(DD.stromverlauf,+q.get("tage")||28)||null;
 return DD.einzeln[pfad]===undefined?null:DD.einzeln[pfad]}
window.fetch=function(u){var a=antwort(String(u));return Promise.resolve({ok:a!=null,status:a!=null?200:404,
 json:function(){return Promise.resolve(a==null?null:JSON.parse(JSON.stringify(a)))}})};
})();
</script>"""

# Veroeffentlicht werden hoechstens die Daten der letzten Woche (Wunsch des Seiteninhabers); laengere Zeitraeume
# verschwinden auch aus der Auswahl der Seite.
MAX_STUNDEN = 168
ZEITRAEUME_H = (1, 3, 12, 48, 168)   # Antworten fuer die Zeitraum-Knoepfe (kleinere nutzen die naechstgroessere)
STROM_TAGE = (7,)
LANG = re.compile(r"30|beginn|gesamt|monat|quartal|jahr|alle", re.I)   # Strom-Zeitraeume ueber eine Woche


def dashboard(jetzt=None):
    """Dashboard-Seite als Schnappschuss; None, wenn waermepumpen_dashboard.py nicht im Ordner liegt.
    Die Antworten berechnen die Programmteile des Dashboards selbst (Handler.do_GET), wie beim Live-Betrieb."""
    try:
        import waermepumpen_dashboard as wd
        wd.Handler, wd.SEITE, wd.daten  # noqa: B018  (ist es das erwartete Dashboard?)
    except Exception as exc:  # fehlt oder laesst sich nicht laden: nur die Tagesauswertung hochladen
        print(f"Dashboard-Ansicht übersprungen ({type(exc).__name__}: {exc})")
        return None
    jetzt = int(jetzt or time.time())
    try:
        if hasattr(wd, "lade_historie"):
            wd.lade_historie()
    except Exception as exc:
        print(f"Hinweis: Verlauf nicht geladen ({type(exc).__name__}: {exc})")
    letzte, stand = letzte_werte(wd, jetzt)
    if not letzte:
        print("Dashboard-Ansicht übersprungen (keine Logdaten der letzten Stunden)")
        return None
    for n, d in wd.daten.items():
        d["host"] = ""  # keine IP-Adressen veroeffentlichen
        d["letzte"], d["stand"], d["fehler"] = letzte.get(n), stand.get(n), None
    if strom_pfad() and hasattr(wd, "STROM"):
        wd.STROM["aktiv"] = True
        wd.STROM["stand"] = os.path.getmtime(strom_pfad())  # letzte Strommessung statt "nur Verlaufsdatei"

    gemeldet = set()

    def frage(pfad):
        h = wd.Handler.__new__(wd.Handler)
        h.path, ergebnis = pfad, {}
        h._send = lambda code, ctype, body: ergebnis.update(code=code, body=body)
        try:
            h.do_GET()
            return json.loads(ergebnis["body"]) if ergebnis.get("code") == 200 else None
        except Exception as exc:
            meldung = f"Hinweis: {pfad.split('?')[0]} nicht verfügbar ({type(exc).__name__}: {exc})"
            if meldung not in gemeldet:
                gemeldet.add(meldung)
                print(meldung)
            return None

    api = {h: frage(f"/api?von={jetzt - h * 3600}&bis={jetzt}") for h in ZEITRAEUME_H}
    api = {h: v for h, v in api.items() if v}
    if not api:
        return None
    for v in api.values():
        v["handy"] = None
    sv = {t: frage(f"/api/stromverlauf?tage={t}") for t in STROM_TAGE}
    einzeln = {"/api/alle": frage("/api/alle"), "/api/laeufe": frage("/api/laeufe"),
               "/api/strom": frage("/api/strom") or strom_daten(jetzt)}
    st = einzeln["/api/strom"]
    if isinstance(st, dict):
        if isinstance(st.get("zeitraeume"), dict):
            st["zeitraeume"] = {k: v for k, v in st["zeitraeume"].items() if not LANG.search(str(k))}
        if isinstance(st.get("tage"), list):
            st["tage"] = st["tage"][-7:]
    if einzeln["/api/alle"]:
        for v in einzeln["/api/alle"].values():
            v["host"] = ""
    daten = {"ende": jetzt, "api": api, "stromverlauf": {t: v for t, v in sv.items() if v}, "einzeln": einzeln}
    seite = wd.SEITE
    stand_text = time.strftime("%d.%m.%Y um %H:%M", time.localtime(jetzt))
    seite = seite.replace("<title>Wärmepumpen</title>",
                          '<meta name="robots" content="noindex"><title>Wärmepumpen · Marc Ahne</title>', 1)
    seite = seite.replace("<script>", EINSATZ.replace("__DATEN__", json.dumps(daten, separators=(",", ":"), default=str)) + "<script>", 1)
    seite = seite.replace("<h1>Wärmepumpen</h1>",
                          '<p style="margin:0 0 6px"><a href="/" style="color:inherit">← ahne.de</a> · '
                          '<a href="bericht/" style="color:inherit">Tagesauswertung vom Vortag</a></p><h1>Wärmepumpen</h1>', 1)
    # Unterzeile: Stand des Schnappschusses statt "Aktualisiert … Abfrage alle 10 s"
    seite = seite.replace('"Aktualisiert "+new Date().toLocaleTimeString("de-DE")+" · Abfrage alle "+D.intervall+" s"',
                          json.dumps(f"Stand {stand_text} Uhr · wird jede Nacht aktualisiert (keine Live-Werte)"), 1)
    seite = seite.replace("${p.rolle} · ${p.host}", "${p.rolle}")
    seite = seite.replace("setInterval(load,10000);", "")
    # Zeitraum-Auswahl nur bis 1 Woche, Strom-Verlauf nur 1 Woche
    def kuerzen(m):
        teile = re.findall(r'\[(\d+),"[^"]*"\]', m.group(1))
        behalten = [t for t, z in zip(re.findall(r'\[\d+,"[^"]*"\]', m.group(1)), teile) if int(z) <= MAX_STUNDEN]
        return "const BEREICH=[" + ",".join(behalten) + "];"
    seite = re.sub(r"const BEREICH=\[(.*?)\];", kuerzen, seite, count=1)
    seite = re.sub(r'\[\[7,"1 Woche"\](,\[\d+,"[^"]*"\])+\]', '[[7,"1 Woche"]]', seite)
    seite = seite.replace("SVT=28", "SVT=7")
    return seite


# ---------------------------------------------------------------- Hochladen (ein Commit fuer alle Dateien)
def hochladen(dateien, nachricht, token):
    basis = f"https://api.github.com/repos/{REPO}/git"
    kopf = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "waermepumpe-hochladen", "Content-Type": "application/json"}

    def api(methode, pfad, daten=None):
        anfrage = urllib.request.Request(basis + pfad, method=methode, headers=kopf,
                                         data=None if daten is None else json.dumps(daten).encode("utf-8"))
        try:
            with urllib.request.urlopen(anfrage, timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            sys.exit(f"GitHub antwortet mit {e.code} ({methode} {pfad}): {e.read().decode(errors='replace')[:300]}")

    blobs = [{"path": p, "mode": "100644", "type": "blob",
              "sha": api("POST", "/blobs", {"content": base64.b64encode(t.encode("utf-8")).decode("ascii"),
                                            "encoding": "base64"})["sha"]} for p, t in dateien.items()]
    for versuch in range(3):  # falls zwischendurch jemand anderes committet hat: neu aufsetzen
        spitze = api("GET", f"/ref/heads/{ZWEIG}")["object"]["sha"]
        baum = api("GET", f"/commits/{spitze}")["tree"]["sha"]
        neu_baum = api("POST", "/trees", {"base_tree": baum, "tree": blobs})["sha"]
        commit = api("POST", "/commits", {"message": nachricht, "tree": neu_baum, "parents": [spitze]})["sha"]
        anfrage = urllib.request.Request(f"{basis}/refs/heads/{ZWEIG}", method="PATCH", headers=kopf,
                                         data=json.dumps({"sha": commit}).encode("utf-8"))
        try:
            with urllib.request.urlopen(anfrage, timeout=60):
                print(f"Hochgeladen ({', '.join(dateien)}). In 1-2 Minuten unter https://www.ahne.de/waermepumpe/")
                return
        except urllib.error.HTTPError as e:
            if e.code != 422 or versuch == 2:
                sys.exit(f"GitHub antwortet beim Aktualisieren mit {e.code}: {e.read().decode(errors='replace')[:300]}")
            time.sleep(3)


def main():
    ap = argparse.ArgumentParser(description="Waermepumpen-Seiten auf ahne.de veroeffentlichen.")
    ap.add_argument("--tag", help="Tag der Auswertung als JJJJ-MM-TT (Standard: gestern)")
    ap.add_argument("--nur-datei", help="nur in diese Datei schreiben (Auswertung daneben als …_bericht.html)")
    a = ap.parse_args()
    tag = date.fromisoformat(a.tag) if a.tag else date.today() - timedelta(days=1)
    seite = dashboard()
    if seite:
        dateien = {ZIEL_DASHBOARD: seite, ZIEL_BERICHT: bericht(tag, "../", "← Wärmepumpen-Übersicht")}
    else:
        dateien = {ZIEL_DASHBOARD: bericht(tag)}
    for p, t in dateien.items():
        print(f"{p}: {len(t) // 1024} KB")
    if a.nur_datei:
        for p, t in dateien.items():
            ziel = a.nur_datei if p == ZIEL_DASHBOARD else a.nur_datei.replace(".html", "_bericht.html")
            with open(ziel, "w", encoding="utf-8") as f:
                f.write(t)
            print(f"Gespeichert: {ziel}")
    else:
        hochladen(dateien, f"Wärmepumpe: Übersicht und Bericht vom {tag:%d.%m.%Y}", token_lesen())


if __name__ == "__main__":
    main()
