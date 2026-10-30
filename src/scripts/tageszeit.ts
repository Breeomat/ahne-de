// Echte Tageszeit über Stockhausen: Sonnenstand aus Datum/Uhrzeit (UTC) – unabhängig von der Zeitzone des Besuchers,
// ohne externen Dienst. Genauigkeit etwa ±1°, reicht für Tag, Dämmerung und Nacht.
export type Phase = 'nacht' | 'daemmerung' | 'morgen' | 'tag' | 'abend';

const STOCKHAUSEN = { lat: 50.5615, lon: 9.4445 };
const rad = Math.PI / 180;

export function sonne(zeit = new Date(), { lat, lon } = STOCKHAUSEN) {
  const d = zeit.getTime() / 86400000 + 2440587.5 - 2451545.0; // Tage seit J2000
  const g = (357.529 + 0.98560028 * d) * rad;
  const q = 280.459 + 0.98564736 * d;
  const l = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad;
  const e = (23.439 - 0.00000036 * d) * rad;
  const ra = Math.atan2(Math.cos(e) * Math.sin(l), Math.cos(l)) / rad;
  const dek = Math.asin(Math.sin(e) * Math.sin(l));
  const sternzeit = (18.697374558 + 24.06570982441908 * d) * 15 + lon;
  const stundenwinkel = ((((sternzeit - ra) % 360) + 540) % 360) - 180; // −180…180, negativ = vormittags
  const hoehe = Math.asin(Math.sin(lat * rad) * Math.sin(dek) + Math.cos(lat * rad) * Math.cos(dek) * Math.cos(stundenwinkel * rad)) / rad;
  return { hoehe, vormittags: stundenwinkel < 0 };
}

export function phase({ hoehe, vormittags }: { hoehe: number; vormittags: boolean }): Phase {
  if (hoehe < -6) return 'nacht';
  if (vormittags) return hoehe < -2 ? 'daemmerung' : hoehe < 18 ? 'morgen' : 'tag';
  return hoehe < 0 ? 'daemmerung' : hoehe < 12 ? 'abend' : 'tag';
}
