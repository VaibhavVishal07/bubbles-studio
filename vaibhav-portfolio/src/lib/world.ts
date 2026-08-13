import { compactRuns, hash2, runsFromGrid, type Run } from "./pixel";

/**
 * The micro-world is generated once, deterministically, on a 5px cell grid.
 * The same pass produces both the render data (rects) and the collision grid,
 * so what you see is exactly what you can walk on.
 */

export const WORLD_W = 500;
export const WORLD_H = 430;
export const CELL = 5;
export const COLS = WORLD_W / CELL; // 100
export const ROWS = WORLD_H / CELL; // 86

/** Collision codes. 0 = walkable. */
export const BLOCK = {
  NONE: 0,
  VOID: 1,
  WATER: 2,
  TREE: 3,
  CHEST: 4,
  SIGN: 5,
  ROCK: 6,
} as const;

export type Box = { x: number; y: number; w: number; h: number };

export type WorldObject = {
  id: string;
  /** Anchor: horizontal centre, vertical base (feet) in world px. */
  x: number;
  y: number;
};

const COLOURS = {
  soil: "#6E5B3C",
  soilDark: "#5A4930",
  grass: "#6F9A50",
  grassDark: "#5C8442",
  grassRim: "#4A6E36",
  tuftDark: "#557E3D",
  tuftLight: "#84B063",
  dirt: "#B79A6B",
  dirtDark: "#A2855A",
  water: "#4D91B7",
  waterDeep: "#3B769B",
  waterShore: "#79B4D2",
  waterFoam: "#A9D5E8",
  plank: "#A9793F",
  plankDark: "#7A5230",
  plankLine: "#5A3B22",
};

/* ---------------------------- island shape ---------------------------- */

const CX = 50;
const CY = 43;
const RX = 47;
const RY = 40.5;

function islandSpan(y: number): [number, number] | null {
  const ny = (y - CY) / RY;
  if (Math.abs(ny) >= 1) return null;
  const base = RX * Math.sqrt(1 - ny * ny);
  const wobble =
    1 + 0.05 * Math.sin(y * 0.34) + 0.035 * Math.sin(y * 0.13 + 2.1);
  const half = base * wobble;
  const cx = CX + 2.4 * Math.sin(y * 0.09 + 1.2) + (hash2(0, y, 7) - 0.5) * 2.2;
  // Quantise the silhouette to 2-cell steps for a chunkier pixel edge.
  const left = Math.round((cx - half) / 2) * 2;
  const right = Math.round((cx + half) / 2) * 2;
  if (right - left < 6) return null;
  return [Math.max(0, left), Math.min(COLS - 1, right)];
}

/* ------------------------------- stream ------------------------------- */

const STREAM_CX = 62;

function streamSpan(y: number): [number, number] {
  const cx = STREAM_CX + 3.2 * Math.sin(y * 0.075) + 1.4 * Math.sin(y * 0.21);
  const half = 4.6 + 0.7 * Math.sin(y * 0.11 + 0.6);
  return [Math.round(cx - half), Math.round(cx + half)];
}

/* -------------------------------- path -------------------------------- */

const PATH_POINTS: Array<[number, number]> = [
  [20, 82],
  [30, 72],
  [40, 62],
  [48, 52],
  [53, 45],
  [56, 44],
  [70, 44],
  [76, 41],
  [80, 37],
];

/* ------------------------------- objects ------------------------------ */

export const BRIDGE: Box = { x: 272, y: 205, w: 84, h: 42 };

export const OBJECTS = {
  tree: { id: "tree", x: 110, y: 246 },
  chest: { id: "chest", x: 402, y: 178 },
  sign: { id: "sign", x: 250, y: 302 },
  rockLarge: { id: "rockLarge", x: 70, y: 336 },
  rockSmallA: { id: "rockSmallA", x: 196, y: 140 },
  rockSmallB: { id: "rockSmallB", x: 438, y: 300 },
} satisfies Record<string, WorldObject>;

/** Solid footprints, in world px (base-anchored, centred on x). */
const COLLIDERS: Array<{ code: number; box: Box }> = [
  { code: BLOCK.TREE, box: { x: 110 - 20, y: 246 - 24, w: 40, h: 24 } },
  { code: BLOCK.CHEST, box: { x: 402 - 24, y: 178 - 22, w: 48, h: 22 } },
  { code: BLOCK.SIGN, box: { x: 250 - 12, y: 302 - 13, w: 24, h: 13 } },
  { code: BLOCK.ROCK, box: { x: 70 - 15, y: 336 - 15, w: 30, h: 15 } },
  { code: BLOCK.ROCK, box: { x: 196 - 11, y: 140 - 11, w: 22, h: 11 } },
  { code: BLOCK.ROCK, box: { x: 438 - 11, y: 300 - 11, w: 22, h: 11 } },
];

export const FLOWERS: Array<{ x: number; y: number; colour: number }> = [
  { x: 88, y: 302, colour: 0 },
  { x: 152, y: 318, colour: 1 },
  { x: 168, y: 206, colour: 3 },
  { x: 62, y: 246, colour: 2 },
  { x: 246, y: 288, colour: 0 },
  { x: 396, y: 268, colour: 1 },
  { x: 434, y: 214, colour: 3 },
  { x: 116, y: 356, colour: 2 },
  { x: 286, y: 158, colour: 0 },
];

export const START_POSITION = { x: 152, y: 352 };

export type WorldMap = {
  blocked: Uint8Array;
  silhouette: Run[];
  land: Run[];
  ledge: Run[];
  tufts: Run[];
  dirt: Run[];
  gravel: Run[];
  water: Run[];
  waterFrames: Run[][];
  bridge: Run[];
};

function idx(x: number, y: number) {
  return y * COLS + x;
}

function pointToSegmentDist(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = dx * dx + dy * dy;
  const t = len === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

let cached: WorldMap | null = null;

export function buildWorld(): WorldMap {
  if (cached) return cached;

  const land = new Uint8Array(COLS * ROWS);
  const water = new Uint8Array(COLS * ROWS);
  const dirt = new Uint8Array(COLS * ROWS);
  const bridge = new Uint8Array(COLS * ROWS);
  const blocked = new Uint8Array(COLS * ROWS);

  for (let y = 0; y < ROWS; y++) {
    const span = islandSpan(y);
    if (!span) continue;
    for (let x = span[0]; x <= span[1]; x++) land[idx(x, y)] = 1;
  }

  // Carve the stream. It only exists where there is land, so it reads as a
  // river running across the island rather than a floating blue stripe.
  for (let y = 0; y < ROWS; y++) {
    const [a, b] = streamSpan(y);
    for (let x = Math.max(0, a); x <= Math.min(COLS - 1, b); x++) {
      if (land[idx(x, y)]) water[idx(x, y)] = 1;
    }
  }

  // Dirt path, stamped along a polyline.
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!land[idx(x, y)] || water[idx(x, y)]) continue;
      let d = Infinity;
      for (let i = 0; i < PATH_POINTS.length - 1; i++) {
        const [ax, ay] = PATH_POINTS[i];
        const [bx, by] = PATH_POINTS[i + 1];
        d = Math.min(d, pointToSegmentDist(x, y, ax, ay, bx, by));
        if (d < 1) break;
      }
      const wobble = 2.3 + hash2(x, y, 11) * 0.9;
      if (d <= wobble) dirt[idx(x, y)] = 1;
    }
  }

  // Bridge cells (walkable, drawn over the water).
  const bx0 = Math.floor(BRIDGE.x / CELL);
  const bx1 = Math.ceil((BRIDGE.x + BRIDGE.w) / CELL) - 1;
  const by0 = Math.floor(BRIDGE.y / CELL);
  const by1 = Math.ceil((BRIDGE.y + BRIDGE.h) / CELL) - 1;
  for (let y = by0; y <= by1; y++) {
    for (let x = bx0; x <= bx1; x++) {
      if (x < 0 || x >= COLS || y < 0 || y >= ROWS) continue;
      bridge[idx(x, y)] = 1;
      land[idx(x, y)] = 1;
    }
  }

  // ---- collision -----------------------------------------------------
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const i = idx(x, y);
      if (bridge[i]) continue;
      if (!land[i]) blocked[i] = BLOCK.VOID;
      else if (water[i]) blocked[i] = BLOCK.WATER;
    }
  }
  for (const { code, box } of COLLIDERS) {
    const x0 = Math.floor(box.x / CELL);
    const x1 = Math.ceil((box.x + box.w) / CELL) - 1;
    const y0 = Math.floor(box.y / CELL);
    const y1 = Math.ceil((box.y + box.h) / CELL) - 1;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (x < 0 || x >= COLS || y < 0 || y >= ROWS) continue;
        blocked[idx(x, y)] = code;
      }
    }
  }

  // ---- render data ---------------------------------------------------
  const grassAt = (x: number, y: number) => {
    const i = idx(x, y);
    if (!land[i] || water[i]) return null;
    // Grass rim: land cells that touch nothing.
    const outside = (nx: number, ny: number) =>
      nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || !land[idx(nx, ny)];
    if (outside(x - 1, y) || outside(x + 1, y) || outside(x, y - 1))
      return COLOURS.grassRim;
    // Broad, low-frequency patches keep the fill from reading as flat colour
    // while still compressing into long horizontal runs.
    const patch = Math.sin(x * 0.16) + Math.sin(y * 0.11 + 1.4);
    return patch > 0.7 ? COLOURS.grassDark : COLOURS.grass;
  };

  const landRuns = compactRuns(runsFromGrid(COLS, ROWS, grassAt));

  // Soil ledge: the two rows under the island's bottom edge.
  const ledgeRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) => {
      const i = idx(x, y);
      if (land[i]) return null;
      const above1 = y > 0 && land[idx(x, y - 1)];
      const above2 = y > 1 && land[idx(x, y - 2)];
      if (above1) return COLOURS.soil;
      if (above2) return COLOURS.soilDark;
      return null;
    }),
  );

  const tuftRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) => {
      const i = idx(x, y);
      if (!land[i] || water[i] || dirt[i] || bridge[i]) return null;
      const h = hash2(x, y, 5);
      if (h > 0.982) return COLOURS.tuftLight;
      if (h < 0.022) return COLOURS.tuftDark;
      return null;
    }),
  );

  const dirtRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) => {
      const i = idx(x, y);
      if (!dirt[i] || bridge[i]) return null;
      return COLOURS.dirt;
    }),
  );

  const gravelRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) => {
      const i = idx(x, y);
      if (!dirt[i] || bridge[i]) return null;
      return hash2(x, y, 13) > 0.94 ? COLOURS.dirtDark : null;
    }),
  );

  const waterRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) => {
      const i = idx(x, y);
      if (!water[i]) return null;
      const [a, b] = streamSpan(y);
      if (x <= a + 1 || x >= b - 1) return COLOURS.waterShore;
      if (x <= a + 2 || x >= b - 2) return COLOURS.water;
      return COLOURS.waterDeep;
    }),
  );

  // Three-frame surface loop — a pixel dash pattern that steps sideways.
  const waterFrames: Run[][] = [0, 1, 2].map((frame) =>
    compactRuns(
      runsFromGrid(COLS, ROWS, (x, y) => {
        const i = idx(x, y);
        if (!water[i] || bridge[i]) return null;
        const [a, b] = streamSpan(y);
        if (x < a + 2 || x > b - 2) return null;
        const phase = (x + Math.floor(y / 2) * 3 + frame * 2) % 13;
        return phase < 2 && hash2(x, Math.floor(y / 2), frame) > 0.45
          ? COLOURS.waterFoam
          : null;
      }),
    ),
  );

  const bridgeRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) => {
      if (!bridge[idx(x, y)]) return null;
      if (y === by0 || y === by1) return COLOURS.plankDark;
      if (x === bx0 || x === bx1) return COLOURS.plankDark;
      return (x - bx0) % 4 === 0 ? COLOURS.plankLine : COLOURS.plank;
    }),
  );

  // Hard-edged offset shadow — the pixel-art way to lift the island off the
  // page without a blur.
  const silhouetteRuns = compactRuns(
    runsFromGrid(COLS, ROWS, (x, y) =>
      land[idx(x, y)] || (y > 1 && land[idx(x, y - 2)])
        ? "rgba(34,34,31,0.07)"
        : null,
    ),
  );

  cached = {
    blocked,
    silhouette: silhouetteRuns,
    land: landRuns,
    ledge: ledgeRuns,
    tufts: tuftRuns,
    dirt: dirtRuns,
    gravel: gravelRuns,
    water: waterRuns,
    waterFrames,
    bridge: bridgeRuns,
  };
  return cached;
}

/** Collision code at a world-pixel point (0 when walkable). */
export function blockAt(map: WorldMap, px: number, py: number): number {
  const x = Math.floor(px / CELL);
  const y = Math.floor(py / CELL);
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return BLOCK.VOID;
  return map.blocked[idx(x, y)];
}

/**
 * The character's footprint — a small box at the sprite's feet, so the
 * silhouette can overlap scenery the way it does in top-down games.
 */
export const FOOT = { halfW: 9, top: 6, bottom: 2 };

export function footBlocker(map: WorldMap, x: number, y: number): number {
  const xs = [x - FOOT.halfW, x, x + FOOT.halfW];
  const ys = [y - FOOT.top, y + FOOT.bottom];
  for (const sy of ys) {
    for (const sx of xs) {
      const b = blockAt(map, sx, sy);
      if (b !== BLOCK.NONE) return b;
    }
  }
  return BLOCK.NONE;
}
