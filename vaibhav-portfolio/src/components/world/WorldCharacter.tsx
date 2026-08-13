"use client";

import { forwardRef } from "react";
import { PixelSprite } from "../PixelSprite";
import { CHARACTER_FRAMES, type Direction } from "@/lib/sprites";

const SCALE = 3; // 12 × 16 sprite → 36 × 48 on screen

type Props = {
  dir: Direction;
  frame: number;
};

/**
 * The playable sprite. Position is written straight to `transform` by the
 * movement hook, so this component only re-renders when the frame or facing
 * actually changes.
 */
export const WorldCharacter = forwardRef<HTMLDivElement, Props>(
  function WorldCharacter({ dir, frame }, ref) {
    const sprite = CHARACTER_FRAMES[dir][frame] ?? CHARACTER_FRAMES[dir][0];
    return (
      <div
        ref={ref}
        className="pointer-events-none absolute left-0 top-0"
        style={{ willChange: "transform" }}
      >
        <div className="relative" style={{ left: -18, top: -45 }}>
          <svg
            width={13 * 3}
            height={3 * 3}
            viewBox="0 0 13 3"
            shapeRendering="crispEdges"
            className="pixelated absolute left-[-1px] top-[42px]"
            aria-hidden
          >
            <rect x="3" y="0" width="7" height="1" fill="rgba(30,45,20,0.16)" />
            <rect x="1" y="1" width="11" height="1" fill="rgba(30,45,20,0.2)" />
            <rect x="3" y="2" width="7" height="1" fill="rgba(30,45,20,0.12)" />
          </svg>
          <PixelSprite
            sprite={sprite}
            scale={SCALE}
            className="pixelated relative"
          />
        </div>
      </div>
    );
  },
);
