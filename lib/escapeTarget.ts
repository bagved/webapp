export type Point = { x: number; y: number };
export type Rect = Point & { width: number; height: number };
export type EscapeArea = { width: number; height: number; button: Rect; pointer: Point; obstacle: Rect; previous?: Point | null };

function crossesRect(from: Point, to: Point, rect: Rect) {
  let first = 0, last = 1;
  for (const axis of ["x", "y"] as const) {
    const delta = to[axis] - from[axis];
    const minimum = rect[axis], maximum = minimum + (axis === "x" ? rect.width : rect.height);
    if (Math.abs(delta) < 0.001) {
      if (from[axis] < minimum || from[axis] > maximum) return false;
    } else {
      const a = (minimum - from[axis]) / delta, b = (maximum - from[axis]) / delta;
      first = Math.max(first, Math.min(a, b)); last = Math.min(last, Math.max(a, b));
      if (first > last) return false;
    }
  }
  return true;
}

function reflect(value: number, minimum: number, maximum: number) {
  const span = maximum - minimum;
  if (span <= 0) return minimum;
  const position = ((value - minimum) % (span * 2) + span * 2) % (span * 2);
  return minimum + (position <= span ? position : span * 2 - position);
}

export function escapeTarget(area: EscapeArea, random: () => number = Math.random): Point | null {
  const { button, pointer, obstacle } = area;
  const dx = Math.max(button.x - pointer.x, 0, pointer.x - button.x - button.width);
  const dy = Math.max(button.y - pointer.y, 0, pointer.y - button.y - button.height);
  if (Math.hypot(dx, dy) > 72) return null;
  const right = area.width - button.width - 8, bottom = area.height - button.height - 8;
  if (right <= 8 || bottom <= 8) return null;
  const center = { x: button.x + button.width / 2, y: button.y + button.height / 2 };
  const awayX = center.x - pointer.x, awayY = center.y - pointer.y;
  const baseAngle = Math.hypot(awayX, awayY) < 1 ? random() * Math.PI * 2 : Math.atan2(awayY, awayX);
  // Inflate Ja by the moving label's size so the entire animation path stays clear.
  const forbidden = { x: obstacle.x - button.width - 12, y: obstacle.y - button.height - 12, width: obstacle.width + button.width + 24, height: obstacle.height + button.height + 24 };
  let best: Point | null = null, bestScore = -Infinity;
  for (let i = 0; i < 36; i++) {
    const angle = baseAngle + (random() - 0.5) * (i < 18 ? Math.PI * 1.2 : Math.PI * 2);
    const step = 48 + random() * Math.min(100, area.width * 0.2);
    const candidate = { x: reflect(button.x + Math.cos(angle) * step, 8, right), y: reflect(button.y + Math.sin(angle) * step, 8, bottom) };
    const moved = Math.hypot(candidate.x - button.x, candidate.y - button.y);
    if (moved < 20 || crossesRect(button, candidate, forbidden)) continue;
    const distance = Math.hypot(candidate.x + button.width / 2 - pointer.x, candidate.y + button.height / 2 - pointer.y);
    const edgeRoom = Math.min(candidate.x - 8, right - candidate.x, candidate.y - 8, bottom - candidate.y);
    const repeated = area.previous && Math.hypot(candidate.x - area.previous.x, candidate.y - area.previous.y) < 22;
    const score = distance + Math.min(18, edgeRoom) + random() * 18 - (repeated ? 45 : 0);
    if (score > bestScore) { best = candidate; bestScore = score; }
  }
  return best;
}
