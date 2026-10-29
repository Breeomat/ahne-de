export const url = (pfad = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${pfad.replace(/^\//, '')}`;

// Angaben für Startseite, Impressum und Seitenfuß. Leere Felder erscheinen als [fehlt: …].
export const person = {
  name: 'Marc Ahne',
  untertitel: 'Solutions Analyst bei BW Converting, einem Unternehmen von Barry-Wehmiller',
  email: 'marc@ahne.de',
  anschrift: [] as string[], // Straße, PLZ Ort – nur fürs Impressum
};

// Links auf der Startseite. Reihenfolge = Anzeige.
export const links: { href: string; label: string; hinweis?: string }[] = [
  { href: 'https://www.bwconverting.com', label: 'BW Converting', hinweis: 'Maschinen und Lösungen für die Verarbeitung von Papier, Folie und Vliesstoffen' },
  { href: 'https://stockhausen-online.de', label: 'stockhausen-online.de', hinweis: 'Dorfseite für Herbstein-Stockhausen' },
];
