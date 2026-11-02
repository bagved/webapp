export type BackgroundMarker = { top: number; tint: number };

// Blend as a section enters the reading area, then hold its tone until the next section.
export function sectionTint(markers: BackgroundMarker[], viewportHeight: number, scrollTop = 0): number {
  if (viewportHeight <= 0) return 0;
  const start = viewportHeight * 0.8;
  const end = viewportHeight * 0.3;
  let current = 0;
  for (const marker of markers) {
    const documentTop = marker.top + scrollTop;
    const beginsAt = Math.max(0, documentTop - start);
    const endsAt = Math.max(beginsAt + 1, documentTop - end);
    if (scrollTop <= beginsAt) break;
    const progress = Math.max(0, Math.min(1, (scrollTop - beginsAt) / (endsAt - beginsAt)));
    const target = Number.isFinite(marker.tint) ? Math.max(0, Math.min(100, marker.tint)) : 0;
    current += (target - current) * progress;
    if (progress < 1) break;
  }
  return current;
}
