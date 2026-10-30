// Hyperraum-/Transmitter-Effekt: Sterne ziehen sich zu Lichtstreifen, weißer Blitz.
// richtung 'hin': Streifen werden länger, endet im Blitz (vor dem Seitenwechsel).
// richtung 'her': beginnt im Blitz, Streifen laufen aus (nach dem Seitenwechsel).
export function hyperraum(richtung: 'hin' | 'her' | 'durch' = 'durch', dauer = 900): Promise<void> {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();
  const leinwand = document.createElement('canvas');
  leinwand.className = 'hyperraum';
  leinwand.setAttribute('aria-hidden', 'true');
  document.body.append(leinwand);
  const dpr = Math.min(2, devicePixelRatio || 1);
  leinwand.width = innerWidth * dpr;
  leinwand.height = innerHeight * dpr;
  const g = leinwand.getContext('2d')!;
  g.scale(dpr, dpr);
  const mx = innerWidth / 2, my = innerHeight / 2;
  const weite = Math.hypot(mx, my);
  const farben = ['#ffffff', '#fff0b8', '#9ff5dc', '#c9d4ff'];
  const sterne = Array.from({ length: 260 }, () => ({
    w: Math.random() * Math.PI * 2,
    r: Math.random() * weite * 0.9 + 8,
    f: farben[Math.floor(Math.random() * farben.length)],
    b: Math.random() * 1.6 + 0.4,
  }));
  const gesamt = richtung === 'durch' ? dauer * 1.6 : dauer;
  const start = performance.now();
  return new Promise((fertig) => {
    function bild(jetzt: number) {
      const t = Math.min(1, (jetzt - start) / gesamt);
      // Stärke: 0 → 1 (hin), 1 → 0 (her), 0 → 1 → 0 (durch)
      const k = richtung === 'hin' ? t : richtung === 'her' ? 1 - t : Math.sin(Math.PI * t);
      const s = k * k;
      g.clearRect(0, 0, innerWidth, innerHeight);
      g.fillStyle = `rgba(4, 6, 14, ${Math.min(0.92, 0.25 + s)})`;
      g.fillRect(0, 0, innerWidth, innerHeight);
      for (const st of sterne) {
        const r = st.r * (1 + s * 0.6);
        const laenge = 2 + s * weite * 0.55;
        const cx = Math.cos(st.w), cy = Math.sin(st.w);
        g.strokeStyle = st.f;
        g.globalAlpha = Math.min(1, 0.35 + s);
        g.lineWidth = st.b;
        g.beginPath();
        g.moveTo(mx + cx * r, my + cy * r);
        g.lineTo(mx + cx * (r + laenge), my + cy * (r + laenge));
        g.stroke();
      }
      g.globalAlpha = 1;
      // Blitz am Höhepunkt
      const blitz = Math.max(0, (s - 0.75) / 0.25);
      if (blitz > 0) {
        g.fillStyle = `rgba(255, 252, 235, ${blitz})`;
        g.fillRect(0, 0, innerWidth, innerHeight);
      }
      if (t < 1) requestAnimationFrame(bild);
      else {
        if (richtung !== 'hin') leinwand.remove();
        fertig();
      }
    }
    requestAnimationFrame(bild);
  });
}
