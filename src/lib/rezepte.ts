import type { Text } from './sprache';

// „Rezept des Tages“ (Überraschung beim Antippen von „Kochen“). Der Browser wählt jeden Tag ein anderes aus dieser Liste,
// „Noch ein Rezept“ blättert weiter. Ist die Liste leer, ist „Kochen“ nicht anklickbar.
// Rezepte von Marc (deutsch), englische Fassung übersetzt. Nichts erfinden – nur Rezepte von Marc eintragen.
export interface Rezept {
  titel: Text;
  zutaten: Text;
  schritte: { de: string[]; en: string[] };
}

export const rezepte: Rezept[] = [
  {
    titel: { de: 'Klassische Rinderrouladen mit Klößen und Rotkraut', en: 'Classic beef roulades with potato dumplings and red cabbage' },
    zutaten: {
      de: '4 Rinderrouladen, 4 TL Senf (mittelscharf), 8 Scheiben durchwachsener Speck, 4 Gewürzgurken, 2 Zwiebeln, 500 ml Rinderfond, 150 ml Rotwein, Butterschmalz; Kloßteig (halb & halb), 1 Glas/Kopf Apfelrotkohl, Gewürze (Salz, Pfeffer, Piment, Lorbeer).',
      en: '4 beef roulades, 4 tsp mustard (medium hot), 8 slices streaky bacon, 4 pickled gherkins, 2 onions, 500 ml beef stock, 150 ml red wine, clarified butter; dumpling dough (half raw, half cooked potato), 1 jar/head of red cabbage with apple, spices (salt, pepper, allspice, bay leaf).',
    },
    schritte: {
      de: [
        'Rouladen trocken tupfen, salzen, pfeffern und großzügig mit Senf bestreichen. Speckstreifen, längs geviertelte Gurken und Zwiebelstreifen darauflegen. Fest einrollen und mit Küchengarn oder Rouladennadeln fixieren.',
        'Rouladen in heißem Butterschmalz im Schmortopf rundherum scharf anbraten, herausnehmen. Röstgemüse (Rest Zwiebel, etwas Möhre/Sellerie) anrösten, mit Rotwein ablöschen, reduzieren lassen und mit Fond aufgießen.',
        'Rouladen, Lorbeer und Piment zugeben. Zugedeckt bei schwacher Hitze ca. 90–120 Minuten sanft schmoren.',
        'Parallel Klöße nach Packungsanleitung formen (nach Wunsch mit gerösteten Croutons füllen) und in siedendem Salzwasser ziehen lassen. Den Rotkohl mit etwas Apfel, Nelke und Schmalz erwärmen.',
        'Rouladen herausnehmen, Sauce pürieren oder durchsieben, abschmecken, nach Bedarf leicht binden und zusammen anrichten.',
      ],
      en: [
        'Pat the roulades dry, season with salt and pepper and spread generously with mustard. Top with bacon strips, gherkins quartered lengthwise and onion strips. Roll up tightly and secure with kitchen string or roulade pins.',
        'Sear the roulades on all sides in hot clarified butter in a casserole, then remove. Brown the vegetables (rest of the onion, some carrot/celeriac), deglaze with red wine, let it reduce and add the stock.',
        'Add the roulades, bay leaf and allspice. Cover and braise gently over low heat for about 90–120 minutes.',
        'Meanwhile shape the dumplings according to the packet (fill with toasted croutons if you like) and let them simmer in salted water. Warm the red cabbage with a little apple, clove and lard.',
        'Take out the roulades, purée or strain the sauce, season, thicken slightly if needed and serve everything together.',
      ],
    },
  },
  {
    titel: { de: 'Überbackene Pizzabrötchen', en: 'Baked pizza rolls' },
    zutaten: {
      de: '6 Aufbackbrötchen (oder Baguettebrötchen), 150 g Schinken oder Salami (gewürfelt), 150 g Gouda (gerieben), 1 Paprika (fein gewürfelt), 1 Becher Schmand (200 g), 1 EL Tomatenmark, Oregano, Salz, Pfeffer.',
      en: '6 part-baked rolls (or baguette rolls), 150 g ham or salami (diced), 150 g Gouda (grated), 1 pepper (finely diced), 1 tub Schmand/sour cream (200 g), 1 tbsp tomato paste, oregano, salt, pepper.',
    },
    schritte: {
      de: [
        'Backofen auf 200 °C Ober-/Unterhitze vorheizen. Ein Backblech mit Backpapier auslegen.',
        'Brötchen quer halbieren.',
        'In einer Schüssel Schmand, Tomatenmark, Schinken-/Salamiwürfel, Paprika, die Hälfte des geriebenen Käses und Gewürze verrühren.',
        'Die Masse gleichmäßig auf die Brötchenhälften streichen, mit dem restlichen Käse bestreuen.',
        'Im Ofen ca. 12–15 Minuten backen, bis der Käse goldgelb geschmolzen und die Ränder knusprig sind.',
      ],
      en: [
        'Preheat the oven to 200 °C (top and bottom heat). Line a baking tray with baking paper.',
        'Cut the rolls in half horizontally.',
        'In a bowl, mix the Schmand, tomato paste, diced ham/salami, pepper, half of the grated cheese and the seasoning.',
        'Spread the mixture evenly on the roll halves and sprinkle with the rest of the cheese.',
        'Bake for about 12–15 minutes until the cheese has melted golden and the edges are crisp.',
      ],
    },
  },
  {
    titel: { de: 'Hausgemachte Pizza Margherita (Basis-Rezept)', en: 'Homemade pizza Margherita (basic recipe)' },
    zutaten: {
      de: '500 g Weizenmehl (Typ 00 oder 405), 320 ml lauwarmes Wasser, 3 g frische Hefe (oder 1/2 Pck. Trockenhefe), 10 g Salz, 1 TL Olivenöl; 1 Dose San-Marzano-Tomaten (mit Salz und Oregano püriert), 250 g Mozzarella (gut abgetropft), frisches Basilikum.',
      en: '500 g wheat flour (type 00 or plain), 320 ml lukewarm water, 3 g fresh yeast (or 1/2 sachet dried yeast), 10 g salt, 1 tsp olive oil; 1 tin San Marzano tomatoes (puréed with salt and oregano), 250 g mozzarella (well drained), fresh basil.',
    },
    schritte: {
      de: [
        'Hefe im Wasser auflösen. Mehl und Salz mischen, Wasser zugeben und mindestens 10 Minuten zu einem geschmeidigen Teig kneten. Zu einer Kugel formen, abgedeckt bei Raumtemperatur mindestens 2 Stunden (besser über Nacht im Kühlschrank) gehen lassen.',
        'Ofen mit Pizzastein oder Blech auf maximale Temperatur (250–275 °C) vorheizen.',
        'Teig in 2–3 Portionen teilen, von innen nach außen mit den Händen flachdrücken (Rand stehen lassen).',
        'Mit Tomatensauce bestreichen, Mozzarellastücke verteilen und etwas Olivenöl beträufeln.',
        'Auf unterster Schiene 8–10 Minuten backen, bis der Rand Blasen wirft und knusprig ist. Mit frischem Basilikum servieren.',
      ],
      en: [
        'Dissolve the yeast in the water. Mix flour and salt, add the water and knead for at least 10 minutes into a smooth dough. Shape into a ball, cover and leave to rise at room temperature for at least 2 hours (better overnight in the fridge).',
        'Preheat the oven with a pizza stone or tray to the maximum temperature (250–275 °C).',
        'Divide the dough into 2–3 portions and press flat with your hands from the centre outwards (leave a rim).',
        'Spread with tomato sauce, scatter over pieces of mozzarella and drizzle with a little olive oil.',
        'Bake on the lowest shelf for 8–10 minutes until the rim blisters and is crisp. Serve with fresh basil.',
      ],
    },
  },
  {
    titel: { de: 'Überbackene Schinkenröllchen mit Frischkäse-Kräuter-Füllung', en: 'Baked ham rolls with herb cream cheese filling' },
    zutaten: {
      de: '8 Scheiben Kochschinken, 200 g Kräuterfrischkäse, 1 kleine Zwiebel (fein gewürfelt), 150 ml Sahne, 150 ml passierte Tomaten, 100 g geriebener Gouda, Salz, Pfeffer, Muskat.',
      en: '8 slices cooked ham, 200 g herb cream cheese, 1 small onion (finely diced), 150 ml cream, 150 ml passata, 100 g grated Gouda, salt, pepper, nutmeg.',
    },
    schritte: {
      de: [
        'Frischkäse mit den Zwiebelwürfeln, Pfeffer und einer Prise Salz glattrühren.',
        'Jeweils einen gehäuften Esslöffel auf eine Scheibe Kochschinken geben, aufrollen und nebeneinander in eine gefettete Auflaufform legen.',
        'Sahne und passierte Tomaten verrühren, mit Salz, Pfeffer und Muskat abschmecken und über die Röllchen gießen.',
        'Mit Reibekäse bestreuen und bei 180 °C Umluft ca. 20 Minuten goldbraun überbacken. Passt ideal zu Reis oder Baguette.',
      ],
      en: [
        'Stir the cream cheese with the diced onion, pepper and a pinch of salt until smooth.',
        'Put a heaped tablespoon on each slice of ham, roll up and lay side by side in a greased baking dish.',
        'Mix the cream and passata, season with salt, pepper and nutmeg and pour over the rolls.',
        'Sprinkle with grated cheese and bake at 180 °C (fan) for about 20 minutes until golden. Goes perfectly with rice or baguette.',
      ],
    },
  },
  {
    titel: { de: 'Würzige Kartoffel-Lauch-Suppe mit Mettenden', en: 'Hearty potato and leek soup with smoked sausage (Mettenden)' },
    zutaten: {
      de: '600 g vorwiegend festkochende Kartoffeln, 2 Stangen Lauch, 1 Zwiebel, 1 l Gemüse- oder Rinderbrühe, 100 ml Sahne, 2–3 Mettenden, Muskatnuss, Butter, Salz, Pfeffer.',
      en: '600 g mostly waxy potatoes, 2 leeks, 1 onion, 1 l vegetable or beef stock, 100 ml cream, 2–3 Mettenden (smoked sausages), nutmeg, butter, salt, pepper.',
    },
    schritte: {
      de: [
        'Kartoffeln schälen und würfeln. Lauch gründlich waschen und in Ringe schneiden. Zwiebel würfeln.',
        'Zwiebel und 2/3 des Lauchs in 1 EL Butter anschwitzen. Kartoffeln zugeben, kurz mitdünsten und mit Brühe ablöschen.',
        'Ca. 20 Minuten köcheln lassen, bis die Kartoffeln weich sind.',
        'Mettenden in Scheiben schneiden und in einer Pfanne knusprig anbraten; restlichen Lauch kurz mitbraten.',
        'Suppe cremig pürieren (wer mag, lässt ein paar Stücke ganz), Sahne unterrühren, mit Muskat, Salz und Pfeffer abschmecken. Die gebratenen Mettenden und den Lauch als Einlage unterheben.',
      ],
      en: [
        'Peel and dice the potatoes. Wash the leeks thoroughly and cut into rings. Dice the onion.',
        'Sweat the onion and 2/3 of the leek in 1 tbsp butter. Add the potatoes, cook briefly and pour in the stock.',
        'Simmer for about 20 minutes until the potatoes are soft.',
        'Slice the Mettenden and fry until crisp in a pan; briefly fry the rest of the leek with them.',
        'Purée the soup until creamy (leave a few pieces whole if you like), stir in the cream and season with nutmeg, salt and pepper. Fold in the fried sausage and leek.',
      ],
    },
  },
  {
    titel: { de: 'Zürcher Geschnetzeltes mit Rösti', en: 'Zurich-style sliced meat in cream sauce with rösti' },
    zutaten: {
      de: '500 g Kalbs- oder Schweinefilet (in Streifen), 250 g Champignons (geviertelt), 1 Schalotte, 100 ml Weißwein, 200 ml Sahne, 100 ml Rinderfond, Petersilie, Butterschmalz; 800 g festkochende Kartoffeln (am Vortag gegart), Butter.',
      en: '500 g veal or pork fillet (in strips), 250 g mushrooms (quartered), 1 shallot, 100 ml white wine, 200 ml cream, 100 ml beef stock, parsley, clarified butter; 800 g waxy potatoes (cooked the day before), butter.',
    },
    schritte: {
      de: [
        'Vorgekochte Kartoffeln grob raspeln, salzen. In reichlich Butter bei mittlerer Hitze in einer Pfanne zu einem Fladen andrücken und ca. 15 Minuten pro Seite goldbraun und knusprig braten.',
        'Fleischstreifen portionsweise in sehr heißem Schmalz ca. 1–2 Minuten scharf anbraten, sofort herausnehmen, salzen und pfeffern.',
        'In derselben Pfanne Schalotten und Champignons anbraten. Mit Weißwein ablöschen und einkochen lassen. Fond und Sahne zugeben, ca. 5 Minuten leicht sämig reduzieren.',
        'Fleisch samt Saft zurück in die Sauce geben (nicht mehr kochen lassen), mit gehackter Petersilie bestreuen und direkt mit dem Rösti servieren.',
      ],
      en: [
        'Coarsely grate the pre-cooked potatoes and salt them. Press into a flat cake in plenty of butter in a pan over medium heat and fry for about 15 minutes per side until golden and crisp.',
        'Sear the meat strips in batches in very hot fat for about 1–2 minutes, take out immediately and season with salt and pepper.',
        'In the same pan fry the shallot and mushrooms. Deglaze with white wine and let it reduce. Add stock and cream and reduce for about 5 minutes until slightly thick.',
        'Return the meat and its juices to the sauce (do not let it boil again), sprinkle with chopped parsley and serve straight away with the rösti.',
      ],
    },
  },
  {
    titel: { de: 'Klassisches Szegediner Gulasch', en: 'Classic Szeged goulash' },
    zutaten: {
      de: '600 g Schweineschulter (gewürfelt), 500 g Sauerkraut, 2 große Zwiebeln, 2 EL Paprikapulver edelsüß, 1 TL Paprikapulver rosenscharf, 1 TL Kümmel (gemahlen), 2 EL Tomatenmark, 400 ml Fleischbrühe, 150 g Schmand, Schweineschmalz.',
      en: '600 g pork shoulder (diced), 500 g sauerkraut, 2 large onions, 2 tbsp sweet paprika, 1 tsp hot paprika, 1 tsp ground caraway, 2 tbsp tomato paste, 400 ml meat stock, 150 g Schmand/sour cream, lard.',
    },
    schritte: {
      de: [
        'Fleisch in Schmalz scharf anbraten und herausnehmen.',
        'Zwiebeln würfeln und im Bratfett glasig dünsten. Tomatenmark und Paprikapulver einrühren (nur kurz rösten, sonst wird Paprika bitter).',
        'Fleisch wieder zugeben, mit etwas Brühe ablöschen. Sauerkraut und Kümmel unterrühren, restliche Brühe angießen.',
        'Zugedeckt bei geringer Hitze ca. 75–90 Minuten schmoren, bis das Fleisch butterweich ist.',
        'Mit Schmand verfeinern und abschmecken. Dazu passen Salzkartoffeln oder frisches Bauernbrot.',
      ],
      en: [
        'Sear the meat in lard and take it out.',
        'Dice the onions and soften them in the fat until translucent. Stir in the tomato paste and paprika (toast only briefly, otherwise the paprika turns bitter).',
        'Return the meat and deglaze with a little stock. Stir in the sauerkraut and caraway, add the rest of the stock.',
        'Cover and braise over low heat for about 75–90 minutes until the meat is very tender.',
        'Finish with Schmand and season. Serve with boiled potatoes or fresh farmhouse bread.',
      ],
    },
  },
  {
    titel: { de: 'Cremige Pasta mit Lachs und Spinat', en: 'Creamy pasta with salmon and spinach' },
    zutaten: {
      de: '350 g Bandnudeln (Tagliatelle), 300 g Lachsfilet (frisch, ohne Haut), 200 g Babyspinat (frisch oder TK), 1 Knoblauchzehe, 200 ml Sahne, 50 ml Weißwein (oder Gemüsebrühe), 1 Spritzer Zitronensaft, Olivenöl, Salz, Pfeffer, Muskat.',
      en: '350 g ribbon pasta (tagliatelle), 300 g salmon fillet (fresh, skinless), 200 g baby spinach (fresh or frozen), 1 garlic clove, 200 ml cream, 50 ml white wine (or vegetable stock), a squeeze of lemon juice, olive oil, salt, pepper, nutmeg.',
    },
    schritte: {
      de: [
        'Pasta in reichlich Salzwasser al dente kochen.',
        'Lachs in 2 cm große Würfel schneiden, in Olivenöl ca. 2–3 Minuten rundherum anbraten, herausnehmen.',
        'Gehackten Knoblauch in der Pfanne anschwitzen, mit Weißwein ablöschen. Sahne einrühren, Spinat zugeben und zusammenfallen lassen.',
        'Sauce mit Salz, Pfeffer, einer Prise Muskat und Zitronensaft abschmecken.',
        'Nudeln und Lachswürfel vorsichtig unter die Sauce heben und sofort servieren.',
      ],
      en: [
        'Cook the pasta al dente in plenty of salted water.',
        'Cut the salmon into 2 cm cubes, fry on all sides in olive oil for about 2–3 minutes and take out.',
        'Sweat the chopped garlic in the pan and deglaze with white wine. Stir in the cream, add the spinach and let it wilt.',
        'Season the sauce with salt, pepper, a pinch of nutmeg and lemon juice.',
        'Gently fold the pasta and salmon into the sauce and serve immediately.',
      ],
    },
  },
  {
    titel: { de: 'Bratwurst-Pfanne mit Kartoffeln und Spitzkohl', en: 'Bratwurst pan with potatoes and pointed cabbage' },
    zutaten: {
      de: '4 grobe Bratwürste, 500 g festkochende Kartoffeln (gewürfelt), 1 kleiner Spitzkohl (in Streifen), 1 Zwiebel, 200 ml Gemüsebrühe, 1 TL Senf, Kümmel, Salz, Pfeffer, Pflanzenöl.',
      en: '4 coarse bratwursts, 500 g waxy potatoes (diced), 1 small pointed cabbage (in strips), 1 onion, 200 ml vegetable stock, 1 tsp mustard, caraway, salt, pepper, vegetable oil.',
    },
    schritte: {
      de: [
        'Bratwürste in dicke Scheiben schneiden und in einer großen Pfanne braun anbraten, dann herausnehmen.',
        'Im verbliebenen Fett die Kartoffelwürfel ca. 8–10 Minuten rundherum anbraten, bis sie Farbe annehmen. Zwiebelstreifen zugeben.',
        'Den geschnittenen Spitzkohl portionsweise zufügen und mit anbraten.',
        'Mit Brühe ablöschen, Senf und etwas Kümmel einrühren. Zugedeckt ca. 10 Minuten garen, bis die Kartoffeln weich sind.',
        'Wurstscheiben unterrühren, erwärmen, mit Salz und Pfeffer abschmecken.',
      ],
      en: [
        'Cut the bratwursts into thick slices, brown them in a large pan, then take them out.',
        'Fry the diced potatoes in the remaining fat for about 8–10 minutes until they take on colour. Add the onion strips.',
        'Add the shredded pointed cabbage in batches and fry along with it.',
        'Pour in the stock and stir in the mustard and a little caraway. Cover and cook for about 10 minutes until the potatoes are soft.',
        'Stir in the sausage slices, heat through and season with salt and pepper.',
      ],
    },
  },
  {
    titel: { de: 'Apfel-Zimt-Crumble (Knuspriger Nachtisch)', en: 'Apple and cinnamon crumble (crunchy dessert)' },
    zutaten: {
      de: '4 säuerliche Äpfel (z. B. Boskoop oder Elstar), 1 TL Zimt, 1 Spritzer Zitronensaft, 1 EL Zucker; für die Streusel: 150 g Mehl, 100 g kalte Butter (gewürfelt), 80 g brauner Zucker, 1 Prise Salz.',
      en: '4 tart apples (e.g. Boskoop or Elstar), 1 tsp cinnamon, a squeeze of lemon juice, 1 tbsp sugar; for the crumble: 150 g flour, 100 g cold butter (diced), 80 g brown sugar, 1 pinch of salt.',
    },
    schritte: {
      de: [
        'Ofen auf 180 °C Ober-/Unterhitze vorheizen. Eine Auflaufform fetten.',
        'Äpfel schälen, entkernen, in mundgerechte Stücke schneiden und mit Zimt, 1 EL Zucker und Zitronensaft vermengen. In die Auflaufform geben.',
        'Mehl, kalte Butter, braunen Zucker und Salz rasch mit den Händen zu groben Streuseln verkneten.',
        'Die Streusel gleichmäßig über den Äpfeln verteilen.',
        'Im Ofen ca. 25–30 Minuten backen, bis die Streusel goldbraun und knusprig sind. Warm servieren (schmeckt hervorragend mit Vanilleeis).',
      ],
      en: [
        'Preheat the oven to 180 °C (top and bottom heat). Grease a baking dish.',
        'Peel and core the apples, cut into bite-sized pieces and mix with cinnamon, 1 tbsp sugar and lemon juice. Put into the baking dish.',
        'Quickly rub the flour, cold butter, brown sugar and salt together with your hands into coarse crumbs.',
        'Spread the crumble evenly over the apples.',
        'Bake for about 25–30 minutes until the crumble is golden and crisp. Serve warm (delicious with vanilla ice cream).',
      ],
    },
  },
];
