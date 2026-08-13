"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BLOCK,
  FOOT,
  footBlocker,
  START_POSITION,
  WORLD_H,
  WORLD_W,
  type WorldMap,
} from "@/lib/world";
import type { Direction } from "@/lib/sprites";

const SPEED = 135; // px / second
const FRAME_MS = 130; // walk-cycle step
const WALK_CYCLE = [1, 0, 2, 0];

const KEY_MAP: Record<string, Direction> = {
  w: "up",
  a: "left",
  s: "down",
  d: "right",
  arrowup: "up",
  arrowleft: "left",
  arrowdown: "down",
  arrowright: "right",
};

export type MovementState = {
  dir: Direction;
  frame: number;
  moving: boolean;
};

type Options = {
  map: WorldMap;
  /** Movement is only wired up when the world is interactive and in view. */
  enabled: boolean;
  /** Element that gets the transform - never re-rendered by this hook. */
  spriteRef: React.RefObject<HTMLDivElement | null>;
  onBump?: (blocker: number) => void;
  onTick?: (x: number, y: number, moving: boolean) => void;
  onFirstMove?: () => void;
};

export function useCharacterMovement({
  map,
  enabled,
  spriteRef,
  onBump,
  onTick,
  onFirstMove,
}: Options) {
  const pos = useRef({ ...START_POSITION });
  const keys = useRef(new Set<Direction>());
  const [state, setState] = useState<MovementState>({
    dir: "down",
    frame: 0,
    moving: false,
  });

  // Callbacks live in refs so the rAF loop never needs to be torn down.
  const cb = useRef({ onBump, onTick, onFirstMove });
  cb.current = { onBump, onTick, onFirstMove };

  const paint = useCallback(() => {
    const el = spriteRef.current;
    if (!el) return;
    const x = Math.round(pos.current.x);
    const y = Math.round(pos.current.y);
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    el.style.zIndex = String(Math.round(y));
  }, [spriteRef]);

  // Initial placement, and re-placement if the world remounts.
  useEffect(() => {
    paint();
    cb.current.onTick?.(pos.current.x, pos.current.y, false);
  }, [paint]);

  useEffect(() => {
    if (!enabled) {
      keys.current.clear();
      setState((s) => (s.moving ? { ...s, moving: false, frame: 0 } : s));
      return;
    }

    const isTyping = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const dir = KEY_MAP[e.key.toLowerCase()];
      if (!dir) return;
      // Arrow keys would otherwise scroll the page behind the world.
      if (e.key.startsWith("Arrow")) e.preventDefault();
      if (keys.current.size === 0) cb.current.onFirstMove?.();
      keys.current.add(dir);
    };
    const up = (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key.toLowerCase()];
      if (dir) keys.current.delete(dir);
    };
    const blur = () => keys.current.clear();

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      keys.current.clear();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let last = performance.now();
    let frameClock = 0;
    let cycle = 0;
    let tickClock = 0;
    let bumpCooldown = 0;
    let prev: MovementState = { dir: "down", frame: 0, moving: false };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      bumpCooldown = Math.max(0, bumpCooldown - dt * 1000);

      let dx = 0;
      let dy = 0;
      if (keys.current.has("left")) dx -= 1;
      if (keys.current.has("right")) dx += 1;
      if (keys.current.has("up")) dy -= 1;
      if (keys.current.has("down")) dy += 1;

      const moving = dx !== 0 || dy !== 0;
      let dir = prev.dir;
      if (moving) {
        if (dy !== 0 && dx === 0) dir = dy < 0 ? "up" : "down";
        else if (dx !== 0) dir = dx < 0 ? "left" : "right";
      }

      if (moving) {
        const len = Math.hypot(dx, dy) || 1;
        const vx = (dx / len) * SPEED * dt;
        const vy = (dy / len) * SPEED * dt;

        // Resolve each axis separately so sliding along walls feels natural.
        if (vx !== 0) {
          const nx = clamp(pos.current.x + vx, FOOT.halfW, WORLD_W - FOOT.halfW);
          const hit = footBlocker(map, nx, pos.current.y);
          if (hit === BLOCK.NONE) pos.current.x = nx;
          else if (bumpCooldown === 0) {
            bumpCooldown = 320;
            cb.current.onBump?.(hit);
          }
        }
        if (vy !== 0) {
          const ny = clamp(pos.current.y + vy, FOOT.top, WORLD_H - FOOT.bottom);
          const hit = footBlocker(map, pos.current.x, ny);
          if (hit === BLOCK.NONE) pos.current.y = ny;
          else if (bumpCooldown === 0) {
            bumpCooldown = 320;
            cb.current.onBump?.(hit);
          }
        }
        paint();
      }

      // Walk cycle, stepped rather than interpolated.
      let frame = prev.frame;
      if (moving) {
        frameClock += dt * 1000;
        while (frameClock >= FRAME_MS) {
          frameClock -= FRAME_MS;
          cycle = (cycle + 1) % WALK_CYCLE.length;
        }
        frame = WALK_CYCLE[cycle];
      } else {
        frameClock = 0;
        cycle = 0;
        frame = 0;
      }

      if (frame !== prev.frame || dir !== prev.dir || moving !== prev.moving) {
        prev = { dir, frame, moving };
        setState(prev);
      }

      tickClock += dt * 1000;
      if (tickClock >= 80) {
        tickClock = 0;
        cb.current.onTick?.(pos.current.x, pos.current.y, moving);
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, map, paint]);

  return { state, pos };
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}
