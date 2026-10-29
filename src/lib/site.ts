export const url = (pfad = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${pfad.replace(/^\//, '')}`;

// Angaben für Startseite, Impressum und Seitenfuß. Leere Felder erscheinen als [fehlt: …].
export const person = {
  name: 'Marc Ahne',
  untertitel: 'Solutions Analyst · Stockhausen im Vogelsberg',
  email: 'marc@ahne.de',
  anschrift: ['Mühlweg 11a', '36358 Herbstein-Stockhausen'], // nur fürs Impressum
};
