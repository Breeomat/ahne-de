export const url = (pfad = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${pfad.replace(/^\//, '')}`;

// Angaben für Startseite, Impressum und Seitenfuß. Texte je Sprache: src/lib/sprache.ts
export const person = {
  name: 'Marc Ahne',
  email: 'marc@ahne.de',
  anschrift: ['Mühlweg 11a', '36358 Herbstein-Stockhausen'], // nur fürs Impressum
};
