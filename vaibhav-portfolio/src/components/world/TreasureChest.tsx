"use client";

import { forwardRef } from "react";
import { PixelSprite } from "../PixelSprite";
import { CHEST_CLOSED, CHEST_OPEN } from "@/lib/sprites";

const SCALE = 3;
const W = CHEST_CLOSED.w * SCALE; // 48
const H_CLOSED = CHEST_CLOSED.h * SCALE; // 39
const H_OPEN = CHEST_OPEN.h * SCALE; // 45

type Props = {
  x: number;
  y: number;
  open: boolean;
  onActivate: () => void;
};

export const TreasureChest = forwardRef<HTMLDivElement, Props>(
  function TreasureChest({ x, y, open, onActivate }, ref) {
    const h = open ? H_OPEN : H_CLOSED;
    return (
      <div
        className="absolute"
        style={{ left: x - W / 2, top: y - h, zIndex: Math.round(y) }}
      >
        <div ref={ref} style={{ transformOrigin: "50% 100%" }}>
          <button
            type="button"
            onClick={onActivate}
            className="block cursor-pointer"
            aria-label={
              open
                ? "Treasure chest, opened — resume available"
                : "Open the treasure chest"
            }
          >
            <PixelSprite
              sprite={open ? CHEST_OPEN : CHEST_CLOSED}
              scale={SCALE}
              className="pixelated block"
            />
          </button>
        </div>
      </div>
    );
  },
);
