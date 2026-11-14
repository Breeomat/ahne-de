export const url = (pfad = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${pfad.replace(/^\//, '')}`;

// Angaben für Startseite, Impressum und Seitenfuß. Texte je Sprache: src/lib/sprache.ts
export const person = {
  name: 'Marc Ahne',
  email: 'marc@ahne.de',
  anschrift: ['Mühlweg 11a', '36358 Herbstein-Stockhausen'], // Impressum (Visitenkarte nennt sie ebenfalls)
  telefon: { de: '0171 4905696', en: '+49 171 4905696', link: '+491714905696' }, // nur Visitenkarte
};
