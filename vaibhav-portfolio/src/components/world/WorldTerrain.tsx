"use client";

import { memo, useEffect, useState } from "react";
import type { Run } from "@/lib/pixel";
import { CELL, WORLD_H, WORLD_W, type WorldMap } from "@/lib/world";

function RunLayer({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((r, i) => (
        <rect
          key={i}
          x={r.x * CELL}
          y={r.y * CELL}
          width={r.w * CELL}
          height={r.h * CELL}
          fill={r.fill}
        />
      ))}
    </>
  );
}

const Layer = memo(RunLayer);

/**
 * Static ground: island, soil ledge, stream, path and bridge. Everything here
 * is generated once, so the only thing that changes at runtime is which of the
 * three water-surface frames is visible.
 */
function WorldTerrainBase({
  map,
  animate,
}: {
  map: WorldMap;
  animate: boolean;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 3), 400);
    return () => window.clearInterval(id);
  }, [animate]);

  return (
    <svg
      width={WORLD_W}
      height={WORLD_H}
      viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
      shapeRendering="crispEdges"
      className="pixelated absolute inset-0"
      aria-hidden
    >
      <g transform="translate(3,10)">
        <Layer runs={map.silhouette} />
      </g>
      <Layer runs={map.ledge} />
      <Layer runs={map.land} />
      <Layer runs={map.tufts} />
      <Layer runs={map.dirt} />
      <Layer runs={map.gravel} />
      <Layer runs={map.water} />
      {map.waterFrames.map((runs, i) => (
        <g key={i} style={{ display: i === frame ? undefined : "none" }}>
          <Layer runs={runs} />
        </g>
      ))}
      <Layer runs={map.bridge} />
    </svg>
  );
}

export const WorldTerrain = memo(WorldTerrainBase);
