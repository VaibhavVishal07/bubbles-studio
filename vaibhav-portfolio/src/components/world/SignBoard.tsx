"use client";

import { PixelSprite } from "../PixelSprite";
import { SIGN } from "@/lib/sprites";

const SCALE = 3;
const W = SIGN.w * SCALE; // 42
const H = SIGN.h * SCALE; // 36

export function SignBoard({
  x,
  y,
  onActivate,
  open,
}: {
  x: number;
  y: number;
  onActivate: () => void;
  open: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{ left: x - W / 2, top: y - H, zIndex: Math.round(y) }}
    >
      <button
        type="button"
        onClick={onActivate}
        aria-expanded={open}
        aria-label="Read the signpost"
        className="block cursor-pointer"
      >
        <PixelSprite sprite={SIGN} scale={SCALE} className="pixelated block" />
      </button>
    </div>
  );
}
