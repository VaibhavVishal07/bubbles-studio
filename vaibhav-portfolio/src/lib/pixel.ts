/**
 * Tiny pixel-art system.
 *
 * Sprites are authored as row strings on a 1-unit grid. They are rendered as
 * run-length-encoded SVG rects with `shape-rendering: crispEdges`, so every
 * sprite scales by integer multipliers with zero blurring and no image assets.
 */

export type Palette = Record<string, string>;

export type Sprite = {
  w: number;
  h: number;
  palette: Palette;
  rows: string[];
};

export type Run = { x: number; y: number; w: number; h: number; fill: string };

/** Horizontal run-length encoding of an arbitrary grid. */
export function runsFromGrid(
  cols: number,
  rows: number,
  get: (x: number, y: number) => string | null,
): Run[] {
  const out: Run[] = [];
  for (let y = 0; y < rows; y++) {
    let x = 0;
    while (x < cols) {
      const fill = get(x, y);
      if (fill === null) {
        x++;
        continue;
      }
      let end = x + 1;
      while (end < cols && get(end, y) === fill) end++;
      out.push({ x, y, w: end - x, h: 1, fill });
      x = end;
    }
  }
  return out;
}

/** Merge vertically adjacent runs that share x, width and colour. */
export function compactRuns(runs: Run[]): Run[] {
  const key = (r: Run) => `${r.x}:${r.w}:${r.fill}`;
  const byKey = new Map<string, Run[]>();
  for (const r of runs) {
    const k = key(r);
    const list = byKey.get(k);
    if (list) list.push(r);
    else byKey.set(k, [r]);
  }
  const out: Run[] = [];
  for (const list of byKey.values()) {
    list.sort((a, b) => a.y - b.y);
    let cur = { ...list[0] };
    for (let i = 1; i < list.length; i++) {
      const r = list[i];
      if (r.y === cur.y + cur.h) cur.h += r.h;
      else {
        out.push(cur);
        cur = { ...r };
      }
    }
    out.push(cur);
  }
  return out;
}

export function spriteRuns(sprite: Sprite): Run[] {
  if (process.env.NODE_ENV !== "production") {
    sprite.rows.forEach((row, i) => {
      if (row.length !== sprite.w) {
        // Loud in dev: a mis-typed row silently skews an entire sprite.
        console.error(
          `Sprite row ${i} has length ${row.length}, expected ${sprite.w}: "${row}"`,
        );
      }
    });
  }
  const runs = runsFromGrid(sprite.w, sprite.h, (x, y) => {
    const ch = sprite.rows[y]?.[x];
    if (!ch || ch === ".") return null;
    return sprite.palette[ch] ?? null;
  });
  return compactRuns(runs);
}

/** Flip a sprite horizontally (used for left/right walk cycles). */
export function mirrorSprite(sprite: Sprite): Sprite {
  return {
    ...sprite,
    rows: sprite.rows.map((r) => r.split("").reverse().join("")),
  };
}

/** Clone a sprite, replacing individual rows — used to derive walk frames. */
export function withRows(
  sprite: Sprite,
  overrides: Record<number, string>,
): Sprite {
  const rows = sprite.rows.slice();
  for (const [index, row] of Object.entries(overrides)) {
    rows[Number(index)] = row;
  }
  return { ...sprite, rows };
}

/** Recolour specific palette slots without touching the row data. */
export function recolour(sprite: Sprite, patch: Palette): Sprite {
  return { ...sprite, palette: { ...sprite.palette, ...patch } };
}

/** Deterministic 0..1 hash — keeps generated scenery identical every render. */
export function hash2(x: number, y: number, seed = 0): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
}
