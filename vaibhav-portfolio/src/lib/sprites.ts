import { hash2, mirrorSprite, withRows, type Sprite } from "./pixel";

/* ------------------------------------------------------------------ */
/* Shared palettes — deliberately small (5–9 colours per object).      */
/* ------------------------------------------------------------------ */

const CHAR_PALETTE = {
  o: "#1E2119", // outline
  K: "#3C7A3F", // cap light
  k: "#2B5C2F", // cap shade
  h: "#3A2A1C", // hair
  s: "#D6A07A", // skin
  S: "#B87F5C", // skin shade
  e: "#1E2119", // eye
  j: "#35703B", // jacket
  J: "#468C4A", // jacket highlight
  w: "#F4EDDD", // inner shirt
  b: "#7A5230", // pack / straps
  t: "#2F3446", // trousers
  n: "#4A3826", // boots
};

/* ------------------------------------------------------------------ */
/* Hero avatar — 16 × 20, rendered at 5× (80px) or 6× (96px).          */
/* ------------------------------------------------------------------ */

export const AVATAR: Sprite = {
  w: 16,
  h: 20,
  palette: CHAR_PALETTE,
  rows: [
    ".....oooooo.....",
    "...ooKKKKKKoo...",
    "..oKKKKKKKKKKo..",
    "..oKKkkkkkkKKo..",
    "..ohhhhhhhhhho..",
    "..ohssssssssho..",
    "..ohsessssesho..",
    "..ohsssSSsssho..",
    "...oSSSSSSSSo...",
    "..objjjjjjjjbo..",
    "..ojbJJwwJJbjo..",
    "..ojbJjwwjJbjo..",
    "..ojbJjwwjJbjo..",
    "..ojjjjwwjjjjo..",
    "..osjjjjjjjjso..",
    "...ojjjjjjjjo...",
    "...ottt..ttto...",
    "...ottt..ttto...",
    "...onnn..nnno...",
    "...oooo..oooo...",
  ],
};

/* ------------------------------------------------------------------ */
/* World character — 12 × 16, rendered at 3× (36 × 48).                */
/* Four directions × three frames (idle, walk A, walk B).              */
/* ------------------------------------------------------------------ */

const CHAR_DOWN: Sprite = {
  w: 12,
  h: 16,
  palette: CHAR_PALETTE,
  rows: [
    "...oooooo...",
    ".ooKKKKKKoo.",
    ".oKKKKKKKKo.",
    ".ohhhhhhhho.",
    ".ohssssssho.",
    ".ohsessesho.",
    "..oSSSSSSo..",
    ".ojjjjjjjjo.",
    ".ojbwwwwbjo.",
    ".ojbwwwwbjo.",
    ".osjjjjjjso.",
    "..ojjjjjjo..",
    "..otttttto..",
    "..ott..tto..",
    "..onn..nno..",
    "..ooo..ooo..",
  ],
};

const CHAR_UP: Sprite = {
  w: 12,
  h: 16,
  palette: CHAR_PALETTE,
  rows: [
    "...oooooo...",
    ".ooKKKKKKoo.",
    ".oKKKKKKKKo.",
    ".oKkkkkkkKo.",
    ".ohhhhhhhho.",
    ".ohhhhhhhho.",
    "..ohhhhhho..",
    ".ojjjjjjjjo.",
    ".ojbbbbbbjo.",
    ".ojbbbbbbjo.",
    ".osjbbbbjso.",
    "..ojjjjjjo..",
    "..otttttto..",
    "..ott..tto..",
    "..onn..nno..",
    "..ooo..ooo..",
  ],
};

const CHAR_RIGHT: Sprite = {
  w: 12,
  h: 16,
  palette: CHAR_PALETTE,
  rows: [
    "...ooooo....",
    "..oKKKKKo...",
    "..oKKKKKKo..",
    "..ohhhhhho..",
    "..ohssssso..",
    "..ohssesso..",
    "...oSSSSo...",
    "..ojjjjjjo..",
    "..obbjjjjo..",
    "..obbjjjjo..",
    "..objjjjso..",
    "..ojjjjjjo..",
    "..otttttto..",
    "...otttto...",
    "...onnno....",
    "...oooooo...",
  ],
};

/** Front/back walk frames: only the three leg rows change. */
const legsFrontA = { 13: ".ott...tto..", 14: ".onn...nno..", 15: ".ooo...ooo.." };
const legsFrontB = { 13: "..ott...tto.", 14: "..onn...nno.", 15: "..ooo...ooo." };
/** Side-view walk frames swing one leg forward, one back. */
const legsSideA = { 13: "..ott.tto...", 14: "..onn.nno...", 15: "..ooo.ooo..." };
const legsSideB = { 13: "...ott.tto..", 14: "...onn.nno..", 15: "...ooo.ooo.." };

export type Direction = "down" | "up" | "left" | "right";

export const CHARACTER_FRAMES: Record<Direction, Sprite[]> = {
  down: [CHAR_DOWN, withRows(CHAR_DOWN, legsFrontA), withRows(CHAR_DOWN, legsFrontB)],
  up: [CHAR_UP, withRows(CHAR_UP, legsFrontA), withRows(CHAR_UP, legsFrontB)],
  right: [
    CHAR_RIGHT,
    withRows(CHAR_RIGHT, legsSideA),
    withRows(CHAR_RIGHT, legsSideB),
  ],
  left: [
    mirrorSprite(CHAR_RIGHT),
    mirrorSprite(withRows(CHAR_RIGHT, legsSideA)),
    mirrorSprite(withRows(CHAR_RIGHT, legsSideB)),
  ],
};

/* ------------------------------------------------------------------ */
/* Tree — hand-drawn silhouette, procedurally shaded (single light      */
/* source, five leaf tones). Canopy 24 × 22, trunk 8 × 10.             */
/* ------------------------------------------------------------------ */

const CANOPY_SPANS: Array<[number, number]> = [
  [9, 14],
  [6, 17],
  [4, 19],
  [3, 20],
  [2, 21],
  [1, 22],
  [1, 22],
  [0, 23],
  [0, 23],
  [0, 23],
  [0, 23],
  [0, 23],
  [1, 22],
  [1, 22],
  [2, 21],
  [2, 21],
  [3, 20],
  [4, 19],
  [5, 18],
  [7, 16],
  [9, 14],
  [10, 13],
];

function buildCanopy(): Sprite {
  const w = 24;
  const h = CANOPY_SPANS.length;
  const inside = (x: number, y: number) => {
    const span = CANOPY_SPANS[y];
    return !!span && x >= span[0] && x <= span[1];
  };
  const rows: string[] = [];
  for (let y = 0; y < h; y++) {
    let row = "";
    for (let x = 0; x < w; x++) {
      if (!inside(x, y)) {
        row += ".";
        continue;
      }
      const edge =
        !inside(x - 1, y) ||
        !inside(x + 1, y) ||
        !inside(x, y - 1) ||
        !inside(x, y + 1);
      if (edge) {
        row += "o";
        continue;
      }
      const u = (x - 11.5) / 12;
      const v = (y - 10) / 11;
      let shade = u * 0.75 + v * 1.05;
      // Leaf clumps: nudge a fifth of the cells one step darker.
      if (hash2(x, y, 3) > 0.8) shade += 0.35;
      row += shade < -0.5 ? "G" : shade < 0.32 ? "g" : "d";
    }
    rows.push(row);
  }
  return {
    w,
    h,
    palette: {
      o: "#1E3A18",
      G: "#7BA855",
      g: "#5C8A3E",
      d: "#40682C",
    },
    rows,
  };
}

export const TREE_CANOPY = buildCanopy();

export const TREE_TRUNK: Sprite = {
  w: 8,
  h: 10,
  palette: { o: "#2B1B0E", T: "#7A5230", t: "#5A3B22" },
  rows: [
    ".oTTTTo.",
    ".oTTtto.",
    ".oTTtto.",
    ".oTTtto.",
    ".oTTtto.",
    ".oTTtto.",
    ".oTTtto.",
    "oTTTttto",
    "oTTtttto",
    "oooooooo",
  ],
};

/* ------------------------------------------------------------------ */
/* Treasure chest — 16 × 13 closed, 16 × 15 open (bottom aligned).      */
/* ------------------------------------------------------------------ */

const CHEST_PALETTE = {
  o: "#2B1B0E",
  B: "#8A5A2E",
  b: "#6A4321",
  d: "#4A2E15",
  G: "#D2A441",
  g: "#A87B26",
  k: "#241608",
};

export const CHEST_CLOSED: Sprite = {
  w: 16,
  h: 13,
  palette: CHEST_PALETTE,
  rows: [
    "..oooooooooooo..",
    ".oBBBBBBBBBBBBo.",
    ".oBBBBBGGBBBBBo.",
    ".obbbbbGGbbbbbo.",
    ".oGGGGGGGGGGGGo.",
    ".oBBBBBGGBBBBBo.",
    ".oBBBBBggBBBBBo.",
    ".obbbbbGGbbbbbo.",
    ".obbbbbggbbbbbo.",
    ".obbbbbbbbbbbbo.",
    ".oddddddddddddo.",
    ".oddddddddddddo.",
    "..oooooooooooo..",
  ],
};

export const CHEST_OPEN: Sprite = {
  w: 16,
  h: 15,
  palette: CHEST_PALETTE,
  rows: [
    "..oooooooooooo..",
    ".oBBBBBBBBBBBBo.",
    ".obbbbbbbbbbbbo.",
    ".oooooooooooooo.",
    ".okkkkkkkkkkkko.",
    ".okkkGGGGGGkkko.",
    ".oGGGGGGGGGGGGo.",
    ".oBBBBBGGBBBBBo.",
    ".oBBBBBggBBBBBo.",
    ".obbbbbGGbbbbbo.",
    ".obbbbbggbbbbbo.",
    ".obbbbbbbbbbbbo.",
    ".oddddddddddddo.",
    ".oddddddddddddo.",
    "..oooooooooooo..",
  ],
};

/* ------------------------------------------------------------------ */
/* Signpost — 14 × 12.                                                 */
/* ------------------------------------------------------------------ */

export const SIGN: Sprite = {
  w: 14,
  h: 12,
  palette: {
    o: "#2B1B0E",
    B: "#A9793F",
    b: "#8A5A2E",
    d: "#6A4321",
    p: "#5A3B22",
  },
  rows: [
    ".oooooooooooo.",
    ".oBBBBBBBBBBo.",
    ".oBddddddBBBo.",
    ".oBBBBBBBBBBo.",
    ".oBdddddddBBo.",
    ".oBBBBBBBBBBo.",
    ".obbbbbbbbbbo.",
    ".oooooooooooo.",
    ".....oppo.....",
    ".....oppo.....",
    ".....oppo.....",
    ".....oooo.....",
  ],
};

/* ------------------------------------------------------------------ */
/* Rocks.                                                              */
/* ------------------------------------------------------------------ */

const ROCK_PALETTE = {
  o: "#3A3A34",
  R: "#9A9A8C",
  r: "#7A7A6C",
  s: "#5B5B50",
};

export const ROCK_LARGE: Sprite = {
  w: 10,
  h: 7,
  palette: ROCK_PALETTE,
  rows: [
    "...oooo...",
    ".ooRRRRoo.",
    ".oRRRRrrro",
    "oRRRrrrrro",
    "oRRrrrrsso",
    "orrrrsssso",
    ".oooooooo.",
  ],
};

export const ROCK_SMALL: Sprite = {
  w: 7,
  h: 5,
  palette: ROCK_PALETTE,
  rows: ["..ooo..", ".oRRRo.", "oRRrrro", "oRrrsso", ".ooooo."],
};

/* ------------------------------------------------------------------ */
/* Flower — 5 × 5, recoloured per instance.                            */
/* ------------------------------------------------------------------ */

export const FLOWER: Sprite = {
  w: 5,
  h: 5,
  palette: {
    p: "#F3EDDC",
    y: "#E8C65A",
    g: "#3F6B2C",
  },
  rows: [".ppp.", "ppypp", ".ppp.", "..g..", ".gg.."],
};

export const FLOWER_COLOURS = ["#F3EDDC", "#E48FA4", "#88ADDC", "#F0C56B"];

/* ------------------------------------------------------------------ */
/* Cloud — 18 × 7, drifts behind the island.                           */
/* ------------------------------------------------------------------ */

export const CLOUD: Sprite = {
  w: 18,
  h: 7,
  palette: { c: "#FFFFFF", C: "#EFE9DA" },
  rows: [
    "......cccc........",
    "....cccccccc......",
    "..cccccccccccc....",
    ".cccccccccccccccc.",
    "cccccccccccccccccc",
    "CCCCCCCCCCCCCCCCCC",
    "..CCCCCCCCCCCCCC..",
  ],
};

/* ------------------------------------------------------------------ */
/* UI sprites — crest, sword, envelope, heart, gem.                    */
/* ------------------------------------------------------------------ */

export const CREST: Sprite = {
  w: 12,
  h: 14,
  palette: {
    o: "#17351D",
    F: "#244B2B",
    G: "#D2A441",
    w: "#F7F3E8",
  },
  rows: [
    ".oooooooooo.",
    "oFFFFFFFFFFo",
    "oFFFFGGFFFFo",
    "oFFFGGGGFFFo",
    "oFFGGwwGGFFo",
    "oFGGwwwwGGFo",
    "oFFGGwwGGFFo",
    "oFFFGGGGFFFo",
    ".oFFGGGGFFo.",
    ".oFFFFFFFFo.",
    "..oFFFFFFo..",
    "...oFFFFo...",
    "....oFFo....",
    ".....oo.....",
  ],
};

export const SWORD: Sprite = {
  w: 9,
  h: 9,
  palette: {
    o: "#1C2A1B",
    S: "#EDE8D6",
    s: "#B7B2A2",
    G: "#D2A441",
    h: "#7A5230",
  },
  rows: [
    "......oSo",
    ".....oSSo",
    "....oSSo.",
    "...oSSo..",
    "..oSso...",
    ".oSso....",
    "oGGGGo...",
    ".ohho....",
    ".ohho....",
  ],
};

export const MAIL_BODY: Sprite = {
  w: 12,
  h: 9,
  palette: { o: "#5F605A", w: "#FFFDF7", s: "#E7E1CE" },
  rows: [
    "oooooooooooo",
    "owwwwwwwwwwo",
    "owwwwwwwwwwo",
    "owwwwwwwwwwo",
    "owwwwwwwwwwo",
    "owwwwwwwwwwo",
    "owwwwwwwwwwo",
    "osssssssssso",
    "oooooooooooo",
  ],
};

export const MAIL_FLAP: Sprite = {
  w: 12,
  h: 6,
  palette: { o: "#5F605A", w: "#F6F1E1" },
  rows: [
    "oooooooooooo",
    "owwwwwwwwwwo",
    ".owwwwwwwwo.",
    "..owwwwwwo..",
    "...owwwwo...",
    "....oooo....",
  ],
};

export const HEART: Sprite = {
  w: 7,
  h: 6,
  palette: { o: "#7C2F2C", r: "#C6544B", l: "#E0857C" },
  rows: [".oo.oo.", "olrorlo", "orrrrro", ".orrro.", "..oro..", "...o..."],
};

export const GEM: Sprite = {
  w: 5,
  h: 6,
  palette: { o: "#1D3A22", G: "#4FA05C", g: "#2F6238", l: "#9FD9A6" },
  rows: [".ooo.", "oGlGo", "oGGGo", "oGggo", ".ogo.", "..o.."],
};

/* ------------------------------------------------------------------ */
/* Tiny grass edge tuft used along the bottom of the fold.             */
/* ------------------------------------------------------------------ */

export const GRASS_TUFT: Sprite = {
  w: 7,
  h: 5,
  palette: { g: "#6E9C4C", d: "#4F7A38" },
  rows: ["..g.g..", ".gg.gg.", "gdg.gdg", "ddgggdd", ".ddddd."],
};
