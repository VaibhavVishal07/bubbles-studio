"use client";

import { useCallback, useRef, useState } from "react";

export type ProximityTarget = {
  id: string;
  /** Interaction anchor in world px. */
  x: number;
  y: number;
  radius: number;
};

/**
 * Reports which interactive object the character is standing next to.
 * Driven by the movement loop's throttled tick, so it costs one state update
 * per entered/left region rather than one per frame.
 */
export function useProximityInteraction(targets: ProximityTarget[]) {
  const [active, setActive] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  const update = useCallback(
    (x: number, y: number) => {
      let best: string | null = null;
      let bestDist = Infinity;
      for (const t of targets) {
        const d = Math.hypot(x - t.x, y - t.y);
        // A little hysteresis stops the hint flickering on the boundary.
        const radius = activeRef.current === t.id ? t.radius + 10 : t.radius;
        if (d <= radius && d < bestDist) {
          best = t.id;
          bestDist = d;
        }
      }
      if (best !== activeRef.current) {
        activeRef.current = best;
        setActive(best);
      }
    },
    [targets],
  );

  return { active, update };
}
