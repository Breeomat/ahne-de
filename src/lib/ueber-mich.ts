import type { Text } from './sprache';

// Inhalte der Startseite (Deutsch/Englisch). Quelle: Profil „about-me.md“ (Google Drive, AI Ordner/ÜBER MICH).
// Bewusst nicht öffentlich: Geburtsdatum, Finanzen, Gesundheit, Geräte, Namen von Kolleg:innen.

export const einleitung: Text = {
  de: 'Ich lebe in Stockhausen, einem Ortsteil von Herbstein im Vogelsberg. Seit 1988 arbeite ich im selben Unternehmen in Lauterbach: angefangen als Auszubildender bei Ahlbrandt System, heute als Solutions Analyst bei BW Converting. In meiner freien Zeit bin ich viel im Dorf unterwegs, bei der Feuerwehr, im Ortsbeirat und in der Gefriergemeinschaft.',
  en: 'I live in Stockhausen, a village in the municipality of Herbstein in the Vogelsberg region of Hesse, Germany. I have worked for the same company in Lauterbach since 1988: I started as an apprentice at Ahlbrandt System and today I am a Solutions Analyst at BW Converting. In my spare time I am busy in the village – with the volunteer fire brigade, the local council and the community freezer cooperative.',
};

export const werdegang: { zeit: Text; text: Text }[] = [
  {
    zeit: { de: 'heute', en: 'today' },
    text: {
      de: 'Solutions Analyst bei BW Converting (Barry-Wehmiller), Business Transformation Team – ERP und PLM, aktuell die Umstellung auf Microsoft Dynamics 365',
      en: 'Solutions Analyst at BW Converting (Barry-Wehmiller), Business Transformation Team – ERP and PLM, currently the move to Microsoft Dynamics 365',
    },
  },
  { zeit: { de: '2013', en: '2013' }, text: { de: 'Zertifizierung zum Datenschutzbeauftragten', en: 'Certified data protection officer' } },
  { zeit: { de: '2010', en: '2010' }, text: { de: 'Technischer Betriebswirt (IHK)', en: 'Technischer Betriebswirt (IHK) – certified technical business administrator' } },
  { zeit: { de: '2005', en: '2005' }, text: { de: 'Industriemeister Elektro', en: 'Industriemeister Elektro – master craftsman in electrical engineering' } },
  {
    zeit: { de: '1988', en: '1988' },
    text: {
      de: 'Ausbildung zum Industrieelektroniker, Fachrichtung Gerätetechnik, bei Ahlbrandt System in Lauterbach – seitdem im selben Unternehmen',
      en: 'Apprenticeship as an industrial electronics technician (device engineering) at Ahlbrandt System in Lauterbach – with the same company ever since',
    },
  },
];

export const ehrenamt: { name: Text; rolle: Text; href?: string }[] = [
  {
    name: { de: 'Freiwillige Feuerwehr Stockhausen', en: 'Volunteer fire brigade Stockhausen' },
    rolle: { de: 'aktives Mitglied, Kassenwart', en: 'active member, treasurer' },
    href: 'https://stockhausen-online.de/vereine/feuerwehr/',
  },
  {
    name: { de: 'Ortsbeirat Stockhausen', en: 'Local council (Ortsbeirat) Stockhausen' },
    rolle: { de: 'Mitglied, Schriftführer', en: 'member, secretary' },
    href: 'https://stockhausen-online.de/ortsbeirat/',
  },
  {
    name: { de: 'Gefriergemeinschaft Stockhausen', en: 'Community freezer cooperative (Gefriergemeinschaft) Stockhausen' },
    rolle: { de: 'Schriftführer und Geschäftsführer', en: 'secretary and manager' },
    href: 'https://stockhausen-online.de/vereine/gefriergemeinschaft/',
  },
  {
    name: { de: 'stockhausen-online.de', en: 'stockhausen-online.de' },
    rolle: { de: 'Dorfseite für Herbstein-Stockhausen, aufgebaut und gepflegt', en: 'village website for Herbstein-Stockhausen (in German), built and maintained' },
    href: 'https://stockhausen-online.de',
  },
];

export const gernMache: Text[] = [
  { de: 'Kochen – fast täglich, gern auch neue Rezepte', en: 'Cooking – almost every day, often trying new recipes' },
  { de: 'Drohne fliegen', en: 'Flying my drone' },
  { de: 'Bei Dorffesten am Stand stehen, am liebsten an der Wurstbude', en: 'Helping out at village festivals, preferably at the sausage stand' },
  { de: 'Schalke 04', en: 'Schalke 04' },
  { de: 'Perry Rhodan', en: 'Perry Rhodan' },
  { de: 'Urlaub an Ost- und Nordsee, in Frankreich und auf Korsika', en: 'Holidays on the Baltic and North Sea coasts, in France and on Corsica' },
];
