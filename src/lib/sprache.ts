export type Sprache = 'de' | 'en';
export type Text = Record<Sprache, string>;

// Seitenpaare: der Umschalter springt jeweils auf das Gegenstück in der anderen Sprache
export const seiten = {
  start: { de: '', en: 'en/' },
  impressum: { de: 'impressum/', en: 'en/imprint/' },
  datenschutz: { de: 'datenschutz/', en: 'en/privacy/' },
  // versteckt: 5× auf „Marc“ tippen (Ueberraschungen.astro), nicht in der Sitemap, noindex
  visitenkarte: { de: 'visitenkarte/', en: 'en/business-card/' },
} satisfies Record<string, Text>;
export type Seite = keyof typeof seiten;

export const ui = {
  de: {
    locale: 'de_DE',
    beschreibung: 'Persönliche Seite von Marc Ahne aus Stockhausen im Vogelsberg.',
    untertitel: 'Stockhausen im Vogelsberg',
    ehrenamt: 'Ehrenamt',
    gernMache: 'Was ich gern mache',
    kontakt: 'Kontakt',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    rechtliches: 'Rechtliches',
    startseite: 'Startseite',
    sprachwahl: 'Sprache',
  },
  en: {
    locale: 'en_GB',
    beschreibung: 'Personal website of Marc Ahne from Stockhausen, Vogelsberg, Germany.',
    untertitel: 'Stockhausen, Vogelsberg, Germany',
    ehrenamt: 'Volunteering',
    gernMache: 'What I enjoy',
    kontakt: 'Contact',
    impressum: 'Legal notice',
    datenschutz: 'Privacy',
    rechtliches: 'Legal',
    startseite: 'Home',
    sprachwahl: 'Language',
  },
} satisfies Record<Sprache, Record<string, string>>;
