import type { Text } from './sprache';

// Inhalte der Startseite (Deutsch/Englisch). Quelle: Profil „about-me.md“ (Google Drive, AI Ordner/ÜBER MICH).
// Bewusst nicht öffentlich: Beruf und Arbeitgeber, Geburtsdatum, Finanzen, Gesundheit, Geräte.

export const einleitung: Text = {
  de: 'Ich lebe in Stockhausen, einem Ortsteil von Herbstein im Vogelsberg. In meiner freien Zeit bin ich viel im Dorf unterwegs, bei der Feuerwehr, im Ortsbeirat und in der Gefriergemeinschaft.',
  en: 'I live in Stockhausen, a village in the municipality of Herbstein in the Vogelsberg region of Hesse, Germany. In my spare time I am busy in the village – with the volunteer fire brigade, the local council and the community freezer cooperative.',
};

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

// ei: Überraschung beim Antippen (src/components/Ueberraschungen.astro). Kochen nur, wenn src/lib/rezepte.ts Rezepte hat.
export const gernMache: (Text & { ei?: 'kochen' | 'drohne' | 'wurst' | 'schalke' | 'urlaub' })[] = [
  { de: 'Kochen – fast täglich, gern auch neue Rezepte', en: 'Cooking – almost every day, often trying new recipes', ei: 'kochen' },
  { de: 'Drohne fliegen', en: 'Flying my drone', ei: 'drohne' },
  { de: 'Bei Dorffesten am Stand stehen, am liebsten an der Wurstbude', en: 'Helping out at village festivals, preferably at the sausage stand', ei: 'wurst' },
  { de: 'Schalke 04', en: 'Schalke 04', ei: 'schalke' },
  { de: 'Urlaub an Ost- und Nordsee, in Frankreich und auf Korsika', en: 'Holidays on the Baltic and North Sea coasts, in France and on Corsica', ei: 'urlaub' },
];
