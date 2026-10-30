import type { Text } from './sprache';

// „Rezept des Tages“ (Überraschung beim Antippen von „Kochen“). Jeden Tag ein anderes aus dieser Liste.
// Solange die Liste leer ist, ist „Kochen“ nicht anklickbar. Nichts erfinden – nur Rezepte von Marc eintragen.
export const rezepte: { titel: Text; text: Text }[] = [];
