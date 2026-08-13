"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Fixed spread — deterministic, and tuned so nothing flies off the island. */
const BURST = [
  { dx: -20, dy: -30, size: 4, delay: 0 },
  { dx: -9, dy: -40, size: 3, delay: 0.03 },
  { dx: 2, dy: -44, size: 4, delay: 0.01 },
  { dx: 13, dy: -38, size: 3, delay: 0.05 },
  { dx: 23, dy: -27, size: 4, delay: 0.02 },
  { dx: -15, dy: -22, size: 3, delay: 0.07 },
  { dx: 9, dy: -20, size: 3, delay: 0.06 },
];

/**
 * A short spray of gold pixels out of the chest. Small, quick, no glow.
 */
export function PixelParticles({
  x,
  y,
  onDone,
}: {
  x: number;
  y: number;
  onDone: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const bits = gsap.utils.toArray<HTMLElement>("[data-bit]", root);
      bits.forEach((bit, i) => {
        const { dx, dy, delay } = BURST[i];
        gsap
          .timeline({ delay })
          .to(bit, {
            x: dx,
            y: dy,
            duration: 0.24,
            ease: "power2.out",
            opacity: 1,
          })
          .to(bit, {
            y: dy + 16,
            opacity: 0,
            duration: 0.28,
            ease: "power1.in",
          });
      });
      gsap.delayedCall(0.75, onDone);
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute z-[940]"
      style={{ left: x, top: y }}
      aria-hidden
    >
      {BURST.map((b, i) => (
        <span
          key={i}
          data-bit
          className="absolute block"
          style={{
            width: b.size,
            height: b.size,
            opacity: 0,
            backgroundColor: i % 3 === 0 ? "#F0CE72" : "#D2A441",
          }}
        />
      ))}
    </div>
  );
}
