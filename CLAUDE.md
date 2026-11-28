# ahne-de

Persönliche Seite von Marc Ahne unter https://www.ahne.de. Astro 5, statisch, Hosting über GitHub Pages
(Workflow `.github/workflows/deploy.yml`, baut bei jedem Push auf `main`).

## Inhalte pflegen
- Zweisprachig: Deutsch unter `/`, Englisch unter `/en/`. Umschalter oben rechts springt auf das Gegenstück
  (Seitenpaare in `seiten`, Beschriftungen in `ui`: `src/lib/sprache.ts`). Jede Änderung immer in beiden Sprachen.
- Darstellung: fest „Modern“ (`data-stil="modern"` am `<html>` in `src/layouts/Basis.astro`, kein Umschalter mehr).
  Stil in `src/styles/global.css`: Grundregeln oben (frühere „Oldschool“-Ansicht, Fallback ohne das Attribut),
  darunter Abschnitt „Darstellung Modern“. Startseiten-Abschnitte in `<section class="block">`. Bewegung aus bei
  `prefers-reduced-motion`.
- Drohnenflug (Modern, nur Startseite): `src/components/Drohnenflug.astro` – Flugroute (`route`: Kartenpunkte,
  Zoom, Kurs, Ortsnamen je Sprache) und Anzeige; Karte `public/drohne/stockhausen.svg` aus der Grundkarte von
  stockhausen-online (`python3 scripts/drohnenkarte.py <pfad>/basis.svg`). Hinweis „© OpenStreetMap-Mitwirkende“
  unter dem Kontakt bleibt stehen. Ziel des Flugs ist auf Wunsch Mühlweg 11a (`zuhause`, Haus leuchtet am Ende).
  Leistung: Die Karte wird nur gelegentlich neu gezeichnet (mit Rand `RAND`, bei Bedarf und 220 ms nach dem Scrollen);
  dazwischen bewegen CSS-Transformationen das fertige Bild. Keine Dauer-Animationen auf der Karte (kosten ständig Rechenzeit).
- Tageszeit: Der Drohnenflug zeigt Stockhausen zur echten Uhrzeit (Sonnenstand `src/scripts/tageszeit.ts`, ohne
  externen Dienst): nachts Laternen, Fensterlicht und Sterne, morgens Nebel über dem Bach, abends goldenes Licht.
  Stile in `global.css` (Abschnitt „Tageszeit“). Zum Testen `?zeit=nacht|daemmerung|morgen|tag|abend` anhängen.
- Überraschungen (Startseite): `src/components/Ueberraschungen.astro` – „112“ tippen oder 3× auf die Feuerwehr-Rolle →
  Einsatz (Blaulicht, Drohne zum Feuerwehrhaus); Hobbys mit `ei` in `src/lib/ueber-mich.ts`: Drohne (Looping), Urlaub (Flug über Korsika), Schalke (Tor + Flug übers Stadion), KI-Werkzeuge
  (Terminal, Claude Code/Gemini/Copilot schicken die Drohne einmal übers Dorf nach Hause – Ausflug `dorfrunde`),
  Kochen (Rezept des Tages aus `src/lib/rezepte.ts`, Auswahl im Browser je Tag, „Noch ein Rezept“ blättert).
- Wetterfenster: Der Drohnenflug zeigt das echte Wetter der aktuellen Stunde (Regen, Schnee mit weißen Dächern, Nebel,
  Wolken, Gewitter; Anzeige TMP/WX). `scripts/wetter.mjs` holt im Workflow vor dem Build die stündliche Vorhersage
  (Open-Meteo, 3 Tage) nach `src/data/wetter.json`; Platzhalter `{ "start": null }` = kein Wetter. Stile in `global.css`
  (Abschnitt „Wetterfenster“). Testen mit `?wetter=klar|wolkig|bedeckt|nebel|niesel|regen|schnee|gewitter`.
- „Brummi“ (Haustier-Drohne, Startseite): `src/components/Brummi.astro` – folgt Maus/Finger, landet bei Langeweile auf
  Überschriften, fliegt mit leerem Akku zur Ladestation (unten links, „Brummis Ladestation“), schläft nachts (Tageszeit des
  Drohnenflugs), antwortet beim Antippen, hält still wenn die Maus nahe kommt (damit man ihn anklicken kann), sagt
  alle 40–70 s von selbst etwas (`plaudern`). Ohne Bewegung bei `prefers-reduced-motion`.
- Ausflüge der Drohne (`ausfluege` in `Drohnenflug.astro`, zeitgesteuert): Korsika (Urlaub), Veltins-Arena (Schalke,
  gezeichnete Karte `public/drohne/schalke.svg`), England/Deutschland (Sprachwechsel auf der Startseite). Karten Korsika
  und Europa aus Natural Earth: `node scripts/korsikakarte.mjs …` bzw. `node scripts/europakarte.mjs …` (Pfade zu
  topojson-client und world-atlas, siehe Kopf der Skripte).
- Sprachwechsel: auf der Startseite erst Drohnenflug Stockhausen ↔ London (Ereignis `drohne:reise`, Skript in
  `Basis.astro`), dann normaler Seitenwechsel; auf den anderen Seiten direkt.
- „Was steht heute an?“ (KI-Tagesnotiz, Startseite unter der Einleitung, intern „logbuch“): `scripts/logbuch.mjs` läuft im Workflow vor dem Build (auch
  per Zeitplan 23:05 UTC, GitHub startet geplante Läufe oft Stunden später), holt Wetter (Open-Meteo, ohne Schlüssel) und Termine der nächsten 7 Tage
  (stockhausen-online.de/termine.ics) und lässt Claude (`claude-opus-5-5`, strukturierte Ausgabe) eine sachliche Notiz (Wetter + Termine)
  DE/EN schreiben → `src/data/logbuch.json`. Braucht das Repository-Secret `ANTHROPIC_API_KEY`; ohne Secret oder bei
  Fehlern bleibt der Platzhalter `{ "datum": null }` und der Abschnitt wird nicht angezeigt. Besucher senden nichts an eine KI.
- Visitenkarte mit Lebenslauf (versteckt): `/visitenkarte/` bzw. `/en/business-card/`, erreichbar über 5× schnell auf
  „Marc“ in der Überschrift der Startseite. Bewusst schlicht (`Basis` mit `schlicht`, ohne Drohne), druckbar, `noindex`
  und nicht in der Sitemap (`verborgen`, Filter in `astro.config.mjs`). Inhalte in `src/lib/lebenslauf.ts` (Quellen im
  Dateikopf); Seite `src/components/Visitenkarte.astro`. Beruf und Arbeitgeber nur hier, nicht auf der Startseite.
  Im Ausdruck/PDF unten Ort, Datum und Unterschriftslinie (`.vk__unterschrift`); die Unterschrift selbst NICHT
  veröffentlichen (Bild nur lokal beim Seiteninhaber).
- Browserspiel „Brummis Paketdienst“ (versteckt): `/spiel/` bzw. `/en/game/`, `src/components/Spiel.astro`. Pakete an
  echten Orten abholen/liefern (Koordinaten aus `dorfkarte.ts` von stockhausen-online), 2 Minuten, Akku → Ladestation am
  Sportplatz; Wind (Stärke/Richtung) und Regen aus `src/data/wetter.json`. `noindex`, nicht in der Sitemap, speichert nichts.
  Test: `?wetter=regen&wind=30&richtung=270`. Zugang: 3× schnell auf „Brummis Ladestation“ tippen (`Brummi.astro`), Brummi gibt ab und zu den Hinweis.
- „Haus-Männchen“ (öffentlich, Link im Seitenfuß): `/haus/` bzw. `/en/house/`, `src/components/Haus.astro`. Eigener
  Entwurf (keine Nachbildung eines bestehenden Spiels). Dreistöckiges Haus im Querschnitt, Pixel-Grafik (Spielkoordinaten 320×240, gezeichnet
  in Viertelpixeln auf 1280×960, angezeigt 1:1 ohne Glättung; Figuren (Herr Hausmann, Gäste, Kinder, Minka) werden je
  Haltung/Mimik/Farben einmal fein vorgezeichnet und zwischengespeichert (`figur()`, `figurMalen()`, `katzeBild()`):
  Gesicht mit Augen, Brauen, Nase, Mund, Ohr, Mimik nach Laune (froh, müde, hungrig, traurig, erschrocken beim Alarm,
  blinzeln, Mund offen beim Sprechen), Hemd mit Kragen, Knöpfen, Tasche, Gürtel, Hände; Möbel noch in halben Pixeln; Mauer, Dach und Wandeinrichtung einmal vorgezeichnet
  (`statisch()`), Spielfeld breiter als die Textspalte; Schrift und Sprechblasen scharf auf der großen Leinwand, Größe passt sich der Bildschirmbreite an).
  Männchen „Herr Hausmann“ (EN „Mr Hausmann“) mit Bedürfnissen lebt seinen Tag (kochen, essen, lesen, fernsehen, basteln, duschen, schlafen; Schlafenszeit
  22:30–6:30 Uhr), Sprechblasen (Wetter, Gradzahl, Jahreszeit/Fest, Laune – keine Termine, Wunsch des Seiteninhabers). Mitmachen: Gegenstände anklicken, Essen hinstellen, Licht, Anklopfen, Brief (Antwort aus
  festen Sätzen, nichts wird gesendet/gespeichert), Dorfzeitung. Echtes Wetter (`src/data/wetter.json`), Sonnenstand
  und Uhrzeit des Besuchers, Blick aufs Dorf aus den Fenstern, Termine der nächsten 14 Tage aus stockhausen-online
  (`scripts/termine.mjs` im Workflow → `src/data/termine.json`, Platzhalter `{ "termine": [] }`).
  Jahreszeiten und Feiertage nach dem echten Datum (`FEST`, `JAHRESZEIT`): Baum im Garten blüht/grün/bunt/kahl,
  fallende Blätter im Herbst, Lichterkette am Dach (1. Advent bis 6. Januar), Adventskranz mit passender Kerzenzahl,
  Weihnachtsbaum statt Stehlampe (24.12.–6.1., Geschenke 24.–26.12.), Nikolausstiefel, Silvester-Feuerwerk, Ostern
  (Karfreitag–Ostermontag: Eier im Garten, Osterstrauß), Halloween-Kürbis (25.–31.10.).
  Katze „Minka“: läuft selbst durchs Haus (auch Treppen), schläft auf Sofa/Bett/Kisten, sitzt auf Fensterbänken,
  frisst am Napf im Flur (wartet miauend, wenn er leer ist – dann füttert sie das Männchen), wird vom Männchen gestreichelt.
  Knöpfe „Katze füttern“, „Wollknäuel werfen“; Klick auf die Katze streichelt sie (Herzchen).
  Besuch (7:30–21 Uhr alle 2,5–5 Minuten, `besuchUpdate`, Liste `GAST` mit Uhrzeitfenster, Kleidung, Sätzen; dieselben
  Gäste nicht kurz hintereinander; Post, Paket, Kaffeebesuch, Freund, Pizza, Heizungsbauer und Schornsteinfeger höchstens einmal
  am Tag – `EINMAL_AM_TAG`; passt zur Uhrzeit niemand, kommt keiner): Postbote, Paketbotin (Paket im Flur → Herr Hausmann packt aus), Nachbar mit Hund,
  Kaffeebesuch (14–17:30, Esstisch, Hund unter dem Tisch, Minka flüchtet), Nachbarin mit Apfelkuchen, Freund zum
  Abendessen (17–20:30, Teller am Tisch), Pizzabote (18–21), Heizungsbauer (geht mit in den Keller zu den Wärmepumpen,
  nennt die Werte von gestern), Schornsteinfeger (danach auf dem Dach), Feuerwehrkamerad, Wanderin, Nachbarskinder
  (Halloween: verkleidet, „Süßes oder Saures!“), bei Schnee schippt der Nachbar den Weg. Gespräche als Sprechblasen.
  Tempo (auf Wunsch ruhiger): Tätigkeiten doppelt so lang, Bedürfnisse sinken halb so schnell, kurze Pause nach jeder
  Tätigkeit, Plaudern alle 50–90 s.
  Dachboden (neu, Viertelpixel): Holzwände mit Fugen, Maserung, Nägeln, Sparren, Kehlbalken und Stützen; Truhe (Herr
  Hausmann stöbert: Fotoalbum, Teddy, Briefe), Plattenspieler mit Boxen, Werkbank mit Lochwand, Schraubstock, Lampe und
  Drohne (Brummi lädt hier), Fernrohr mit Sternkarte, Schaukelstuhl mit Häkeldecke, Modelleisenbahn (Gleisoval, Häuschen,
  Bäume, Zug mit Dampf; fährt beim Spielen und läuft nach, `welt.zug`), Schaukelpferd (wippt, auch wenn Minka darauf
  sitzt). Töne: Pfeife, Rattern, Knarren, Quietschen.
  Wohnzimmer (neu, Viertelpixel): Lowboard mit Flachbildfernseher (Programme: Naturfilm, Nachrichten, Fußball) und
  Soundbar, Aquarium mit Fischen, Pflanzen und Blasen (Aktion „Fische füttern“: Futterflocken, Fische kommen hoch),
  Wandregal mit Büchern, Pendeluhr (zeigt die Uhrzeit, Pendel schwingt, Ticken bei Ton an), Sofa mit Wolldecke,
  Couchtisch mit Puzzle (Aktion „puzzeln“, je Runde ein Viertel fertig, `welt.puzzle`), grüner Ohrensessel (Aktion
  „im Sessel lesen“, Stehlampe geht an, nickt am Ende ein; Minka schläft dort auch), Natursteinkamin mit Sims (Fotos,
  Uhr, Kerze), Funken. Weihnachtsbaum steht an der Stelle der Zimmerpflanze. Klick wählt bei Überlappung das kleinste Objekt.
  Schlafzimmer, Bad, Arbeitszimmer, Küche (neu, Viertelpixel; Keller bleibt vorerst): Schlafzimmer mit Patchworkdecke,
  Nachttisch mit Wecker (klingelt nach dem Aufstehen, `welt.wecker`), Kommode mit Spieluhr (Aktion `spieluhr`, Tänzerin,
  Melodie), Hanteln/Matte (`gymnastik`, Hampelmann, einmal morgens 7–9:30), Kleiderschrank (`umziehen`: Türen auf,
  danach anderes Hemd, `HEMDEN`/`welt.hemd`). Bad: Badewanne mit Löwenfüßen und Vorhang (Duschen per Klick, Schaumbad
  `baden` zufällig bei Hygiene), Spiegelschrank (`rasieren`, Schaum im Gesicht, einmal morgens). Arbeitszimmer: Pinnwand
  (Fotos `welt.fotos`), Schreibtischlampe, Fotodrucker (`drucken` → neues Foto an der Pinnwand), Globus auf dem Regal
  (`globus`, dreht sich, Reiseziel-Spruch), feineres Bücherregal. Küche: Kühlschrank mit Kinderbild/Zettel, Herd mit
  Backofen (`backen`: Kuchen geht auf, dann wird gegessen), Spüle, Kaffeemaschine (`kaffeemaschine`), karierte
  Tischdecke, Hängeschrank mit Glastür. Klickflächen über dem Boden mit `ab` (Höhe) in `OBJ`. Hund des Nachbarn
  (`hundBild`, steht/läuft/liegt, wedelt) und Brummi (`brummiZeichnen`, Ringschutz, Rotoren, Kamera, Kufen) in Viertelpixeln.
  Test: `?tun=baden|spieluhr|gymnastik|umziehen|rasieren|drucken|globus|backen|kaffeemaschine|…` (startet nach 2 s).
  Flur, Keller, Außen (neu, Viertelpixel): Flur mit Holzrahmen-Spiegel, Schlüsselbrett, Schuhbank, Kleiderständer,
  Napf mit Pfote; Haustür mit Glas, Briefschlitz, Klinke, Lampe unterm Vordach, Stufen zum Weg. Keller: Wärmepumpen mit
  Schutzgitter und Anzeige, Speicher mit Manometer, Ausdehnungsgefäß, Akku-Module mit Ladebalken, Wechselrichter mit
  Kühlrippen, Waschmaschine mit Bedienleiste, Metallregal mit Einmachgläsern, neue Gefriertruhe (Aktion `eis`, Deckel
  auf, kalter Dampf, Eis in der Hand; öfter bei Hitze). Mauer in vier Ziegeltönen, Efeu, Regenrinnen und Fallrohr links,
  Dachziegel mit Moos, Ortgang, Schornstein mit Ruß, Holztreppen mit Stäben und Pfosten. Landschaft: Sonne mit Strahlen,
  Wolken aus Bällchen, Vögel, ferne Berge, Wald auf den Hügeln, Dorfbäume, Häuser mit Fachwerk/Fenstern/Türen, Kirche mit
  Uhr, Straße mit Mittellinie, feinere Fahrzeuge (Bus, Bäckerwagen, Löschfahrzeug, Traktor). Garten: Apfelbaum mit Rinde,
  Büscheln, Äpfeln (ab August), Lattenzaun, Briefkasten mit Fähnchen, Blumenbeet, Erde mit Steinen und Regenwurm, Igel.
  Leistung: Unbewegtes der Landschaft liegt in `LANDSTATISCH` (neu nur bei Wechsel von Tageszeit, Wetter, Jahreszeit oder
  alle 5 Spielminuten wegen der Dorflichter), Bewegtes zeichnet `landMalen` je Ausschnitt; Garten in `GARTEN`
  (`gartenMalen`). Kopiert werden nur die sichtbaren Ränder ums Haus. Alte Zeichen-Sprites (`sprite`, `KOPF`, `BEINE`,
  `HUND`, `KATZE_*`) entfernt.
  Erkältung (`welt.krank` 0…1): an manchen kalten Tagen (Winter oder unter 4 °C, je Datum festgelegt) oder nach einem
  Einsatz bei Regen/Schnee/Kälte. Niest alle ~40 s, rote Nase und Schal, müde Mimik, legt sich oft hin, kocht Kräutertee
  (`tee`, Wasserkessel auf dem Herd), Wärmflasche im Bett, sagt den Feuerwehr-Alarm ab, fährt nicht einkaufen. „Essen
  hinstellen“ wird zur Suppe und hilft stark; klingt sonst von selbst ab (im Bett schneller). Test: `?krank=1`.
  Einkaufsfahrt (Knopf „Einkaufen schicken“ oder einmal am Tag Mo–Sa 9–17 Uhr): geht zur Haustür hinaus (nutzt den
  Ablauf von `man.alarm` mit `art: 'einkauf'`), sein blaues Auto fährt auf der Dorfstraße weg und zurück (`welt.auto`),
  kommt mit Tüten wieder und räumt den Kühlschrank ein (`einraeumen`). Platz für eine Garage gibt es neben dem Haus nicht,
  das Auto steht außerhalb des Bildes. Fahrrad im Keller (`fahrrad`: repariert, Hinterrad dreht sich, Werkzeug, Ölkanne).
  Test: `?tun=einkaufen`, `?tun=fahrrad`.
  Zoom (Knopf „Heranzoomen“/„Ganzes Haus“): zeigt den Raum, in dem Herr Hausmann ist, doppelt so groß und folgt ihm weich
  (`ZOOM`, `ansicht()`, `ANS`); Schrift, Sprechblasen, Computer-Video und Klicks werden über `ANS` umgerechnet. Ist er
  außer Haus, zeigt die Kamera das ganze Haus.
  Träume (`traumZeichnen`, `TRAEUME`): schläft er im Bett, erscheint über dem Bett eine Gedankenblase mit einer kleinen
  Szene (je ca. 22 s, dann 15–35 s Pause, nie zweimal dieselbe hintereinander): mit Brummi über den Vogelsberg fliegen,
  Riesen-Minka, Tor in letzter Minute, Kühlschrank auf Beinen kommt zu Besuch, Schweben im Weltall, Riesenkuchen,
  Löschfahrzeug fahren, Tauchen mit den Fischen. Blase hell über der nächtlichen Abdunklung, im Schlaf „hihi“/„mmh …“;
  nach dem Aufwachen erzählt er oft vom letzten Traum. Test: `?zeit=nacht&traum=flug|katze|tor|kuehl|weltall|kuchen|feuerwehr|fische`.
  Wetterchaos (roter Knopf „Nicht drücken!“ / „Do not press!“, `chaosStarten`, `chaosZeichnen`, `welt.chaos`): die
  Wettermaschine im Keller (`wettermaschine`, Oszilloskop, Zeiger, Lämpchen, roter Knopf, Antenne mit Funken) rattert los,
  vier zufällige Räume bekommen eigenes Wetter (Regen mit Pfütze, Schnee mit Schneeschicht, Sonne mit Sonnenbrille,
  Gewitter mit Blitzen, Wind mit Blättern/Papier, Nebel). Herr Hausmann wacht ggf. auf, nimmt den Regenschirm, läuft in
  den Keller und haut auf den Aus-Knopf (`maschine`); Minka flüchtet auf die Truhe im Dachboden. Spätestens nach 45 s
  schaltet sich die Maschine selbst ab (z. B. wenn er außer Haus ist). Töne: Sirene, Summen, Regen, Donner.
  Konfetti-Falle (Knopf): macht die Kanone über der Haustür scharf (`konfettiScharfMachen`, holt den nächsten Besuch
  näher heran); beim Türöffnen Knall, Konfettiregen, der bleibt eine Weile liegen, Konfetti auf der Kleidung, je Gast ein
  eigener Satz (`konfettiZuenden`), der Schornsteinfeger wird bunt (`BUNT`). Schwerkraft aus (Knopf, `schwerkraftAus`):
  20 s schweben Herr Hausmann, Minka, Besuch und Krempel (Bücher, Kissen, Teller, Socken, Fisch in Wasserblase) mit
  Drehung (`schwebend`, `krempelZeichnen`), dann plumpst alles, „Autsch!“, er räumt auf (`aufraeumen`). Disco im Keller
  (Knopf an/aus, 45 s, `discoAn`/`discoAus`): Discokugel, bunte Lichtkegel, Nebel, Wärmepumpen-Ventilatoren und
  Waschmaschine laufen mit, Herr Hausmann tanzt (`disco`), Minka kommt zuschauen, Disco-Musik bei Ton an.
  Hausarbeit (auch per Klick): Blumen gießen (Zimmerpflanze), Staubsaugen im Wohnzimmer (Sauger steht im Flur),
  Wäsche (Waschmaschine im Keller läuft, danach Wäscheleine im Keller), Abwaschen nach dem Essen (Geschirr auf der
  Spüle), abends gegen 22 Uhr Zähneputzen.
  Brummi zu Besuch (Drohne von der Startseite, gleiches Aussehen; tagsüber alle 10–18 Min. oder Knopf „Brummi rufen“):
  fliegt durchs Rundfenster in den Dachboden, lädt auf der Werkbank (Ladeanzeige), Herr Hausmann grüßt, Minka springt
  nach ihr, danach fliegt Brummi wieder hinaus (`brummiUpdate`, Summen bei Ton an).
  Kaminfeuer brennt herunter (`welt.glut`, ca. 3 Min.), Flammen werden kleiner; Herr Hausmann legt rechtzeitig nach
  oder zündet es später neu an (abends oder unter 6 °C); daneben ein Holzkorb, ohne Feuer nur Asche.
  Keller (Geschoss 0, Treppe vom Erdgeschoss): zwei Wärmepumpen, Warmwasserspeicher, Stromspeicher, Wechselrichter,
  Waschmaschine, Regal. Die Wärmepumpen zeigen den echten Zustand von gestern zur selben Uhrzeit: die Seite lädt
  `/waermepumpe/` und liest dort die eingebetteten Messwerte (`var DD=…,ENDE=`); Ventilator dreht bei Verdichter an,
  Lampe nach Betriebsart. Herr Hausmann schaut nach (Sprechblase mit Vorlauf/Außentemperatur von gestern).
  PV-Anlage auf der rechten Dachschräge (bei Schnee weiß) und Stromspeicher: SIMULIERT aus Sonnenstand und Wetter
  (`PV`, 9,9 kWp, 10 kWh, Akku im Spiel 30× schneller), Anzeige oben „PV … kW · Akku … %“, Energiefluss am Kabel.
  Feuerwehr-Alarm (Knopf): Piepser, Herr Hausmann läuft doppelt so schnell zur Haustür, zieht Jacke und Helm an, ist
  ca. eine halbe Minute weg; das Feuerwehrauto mit Blaulicht fährt auf der Dorfstraße in der Landschaft vorbei (in den
  Fenstern und neben dem Haus zu sehen), Martinshorn bei Ton an; danach kommt er müde zurück. Kein Besuch währenddessen.
  Zeitraffer (Knopf): 24 Stunden in 120 s ab 6 Uhr (`RAFFER`, `stunde()`), Figuren und Besuch 5× so schnell (Sprechblasen
  in Echtzeit, `spielzeit`), nur die festen Besuche; Himmel, Wärmepumpen (Vortag), PV und Akku
  laufen mit; Post um 10 Uhr, Kaffeebesuch um 15 Uhr; endet von selbst.
  Dorfleben in der Landschaft (auch durch die Fenster): Felder je Jahreszeit (Saat, Getreide, Stoppeln, Schnee), Traktor
  sät/erntet/pflügt werktags 8–18 Uhr bei trockenem Wetter vor Wohn- und Arbeitszimmerfenster (nicht im Winter),
  Schulbus Mo–Fr gegen 7 und 13 Uhr, Bäckerwagen samstags 8–10 Uhr (Glocke bei Ton an), Lichter in den Dorfhäusern
  gehen nach Sonnenuntergang nach und nach an und spät wieder aus (`dorfFelder`, `dorfFahrzeuge`, `hausLicht`).
  Nachts (`nachtUpdate`, alle 70–130 s): Igel läuft im Garten neben dem Haus bis zur Hauswand und kehrt um (nicht vor dem Keller), Minka jagt eine Motte, Herr Hausmann holt sich
  verschlafen ein Glas Milch und geht zurück ins Bett, bei Vollmond (echte Mondphase) schaut er einmal aus dem
  Schlafzimmerfenster. Der Mond am Himmel zeigt die echte Phase. Nachts plaudert er nicht.
  Foto (Knopf): Blitz, „Bitte lächeln!“, speichert das Bild mit Leiste (Name, Adresse, Datum) als PNG auf dem Gerät des
  Besuchers – nichts wird hochgeladen.
  Besucher kommen und gehen nur über den Weg links neben dem Haus (nicht vor dem Keller entlang).
  Jahreszeit und Feste auch per Knopf (`kalender()`, „Heute (echt)“ setzt zurück; Silvester stellt auf Abend).
  Besuch auch per Knopf (alle Gäste; „Schnee schippen“ nur bei Schnee).
  Extras: Computer → auf dem Bildschirm läuft eine eigene kleine Animation (Küstenstadt im Sonnenuntergang, Sportwagen;
  bewusst keine Inhalte aus echten Spielen wie GTA – urheberrechtlich geschützt); Fernrohr → echter Sternenhimmel über
  Stockhausen zur aktuellen Uhrzeit (helle Sterne mit Koordinaten, Sternbilder, Mond mit Phase, vereinfachte Bahn);
  Plattenspieler → Rock/Walzer/Disco, das Männchen tanzt passend. Ton (Knopf, standardmäßig aus): im Browser erzeugt
  (Web Audio, kein Dienst): Schritte, Miauen, Fauchen, Schnurren, Klingel, Klopfen, Tür, Hundebellen, Regen, Donner,
  Kaminknistern, Feuerwerk, Brutzeln, Wasser, Waschmaschine, Tastatur, Fernseher, Schnarchen, Essen, Igel, Traktor,
  Schulbus-Hupe, Bäckerglocke, Martinshorn, Piepser, Staubsauger, Brummi-Summen, eigene kleine Melodien am Plattenspieler.
  Sprechen: jede Sprechblase klingt als kurze Fantasiesprache (Silbentöne, Tonhöhe je Figur, `STIMME`, `ton.plappern`),
  dazu bewegt sich der Mund (`KOPF_OFFEN`, `redet()`); Kinder hoch, Heizungsbauer tief, Brummi piepsig.
  Test: `?wetter=…` wie beim Drohnenflug, `?zeit=nacht|morgen|tag|abend`, `?datum=JJJJ-MM-TT`,
  `?besuch=post|paket|nachbar|kaffee|nachbarin|freund|pizza|klempner|feger|kamerad|wanderer|kinder|schippen` (Besuch nach 3 s), `?igel=links|rechts`.
- Logo: goldener Stempel „MA“ mit „Stockhausen · Vogelsberg“ im Ring, `src/components/Logo.astro` (Startseite neben dem
  Namen). Browser-Symbol vereinfacht ohne Ringtext: `public/favicon.svg`; `favicon-32.png`, `favicon-192.png` und
  `apple-touch-icon.png` (dunkler Grund) daraus per Playwright erzeugt.
- Wärmepumpe (/waermepumpe/, Link im Seitenfuß): kommt NICHT aus dem Build, sondern vom PC des Seiteninhabers.
  `scripts/waermepumpe/waermepumpe_hochladen.py` liegt dort neben `waermepumpen_dashboard.py` und
  `waermepumpen_auswertung.py` (Ordner `logs` mit den Logdateien und `waermepumpen_strom_verlauf.csv`) und läuft nachts
  um 1 Uhr per Aufgabenplanung (`waermepumpe_hochladen.bat`). Es schreibt in EINEM Commit per GitHub-API (Token in
  `github_token.txt` auf dem PC, nur Contents read/write) EINE Seite `public/waermepumpe/index.html`: die Dashboard-Ansicht
  (Seite `SEITE` aus `waermepumpen_dashboard.py`) im Design von ahne.de (`ahne_stil()`: dunkel, Gold, Schrift Inter aus
  `public/schriften/`). Alle Abfragen werden vorab über `Handler.do_GET` des Dashboards berechnet und eingebettet.
  Nur die 24 Stunden des Vortags (endet um Mitternacht), keine Zeitraum-Auswahl, kein Strom & COP, keine „Auswertung je Tag,
  Woche, Monat“, keine „Alle Messwerte“, kein aktueller
  Betriebszustand (Verdichter an/aus, Betriebsart) – Wunsch des Seiteninhabers. Oben zwei gezeichnete Außengeräte
  (`WP_ANIMATION`, `WP_GERAET`) als Zeitraffer des Vortags (24 h in ca. 48 s, Regler, Pause): Ventilator dreht, wenn der
  Verdichter zu der Uhrzeit lief, Leuchtfarbe nach Betriebsart – Wiedergabe, keine Live-Anzeige. Ohne Dashboard-Skript
  nur die Tagesauswertung des Vortags (`waermepumpen_auswertung.py`) als index.html. `noindex`, nicht in der
  Sitemap, keine IP-Adressen. Die Dateien nicht von Hand bearbeiten, sie werden jede Nacht überschrieben.
- „Wärmepumpen live“ (Seitenfuß, `Basis.astro`): Link auf das lokale Dashboard http://192.168.178.95:8080/ – nur im
  Heimnetz erreichbar (Wunsch des Seiteninhabers).
- Name, E-Mail, Anschrift (Impressum und Visitenkarte), Telefon (nur Visitenkarte): `src/lib/site.ts`.
- Texte „über mich“ (Einleitung, Ehrenamt, Hobbys) je Sprache: `src/lib/ueber-mich.ts`. Nichts über Beruf und
  Arbeitgeber (Wunsch des Seiteninhabers) – das steht nur auf der versteckten Visitenkarte.
- Seiten liegen als Komponenten in `src/components/` (Startseite, Impressum, Datenschutz); `src/pages/` und
  `src/pages/en/` binden sie nur mit `sprache` ein. Neue Seite: Komponente + beide Seiten + Eintrag in `seiten`.
- Impressum und Datenschutz: bei neuen externen Diensten (Formulare, Statistik, eingebettete Inhalte)
  die Datenschutzerklärung in beiden Sprachen anpassen; die deutsche Fassung ist maßgeblich.
- Nichts erfinden. Fehlende Angaben als `<span class="fehlt">[fehlt: …]</span>` markieren.
- Später erweiterbar (Blog, Profilseiten): neue Seiten unter `src/pages/`, gleiches Layout `src/layouts/Basis.astro`.

## Technik
- Links immer über `url()` aus `src/lib/site.ts` (Basis-Pfad).
- Farben/Schriften: Tokens in `src/styles/global.css`, Schriften lokal (Fontsource), keine externen Dienste.
- Vor dem Push: `npm run build` muss fehlerfrei laufen.
- Veröffentlichen bricht ohne Meldung ab („veroeffentlichen“ nach 1–2 s, keine Schritte)? Dann erlaubt die Umgebung
  `github-pages` (Settings → Environments → Deployment branches) den Zweig `main` nicht.

## Domain
Die Seite läuft unter https://www.ahne.de (`astro.config.mjs`: `site`, `base: '/'`; `public/CNAME` = `www.ahne.de`).
GitHub → Settings → Pages → Source „GitHub Actions“, Custom domain `www.ahne.de`, „Enforce HTTPS“ an.
DNS bei Ionos: `www` als CNAME auf `breeomat.github.io`; für `ahne.de` (ohne www) A-Records 185.199.108.153,
185.199.109.153, 185.199.110.153, 185.199.111.153 und AAAA 2606:50c0:8000::153, 2606:50c0:8001::153,
2606:50c0:8002::153, 2606:50c0:8003::153. MX- und sonstige Mail-Einträge (marc@ahne.de) NICHT ändern.
