"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The signpost's dialogue. Same construction as the hero speech bubble but a
 * shade darker, so it reads as "world UI" rather than "page UI".
 */
export function DialogueBox({
  x,
  y,
  onClose,
  reduced,
}: {
  x: number;
  y: number;
  onClose: () => void;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (reduced) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="absolute z-[950]"
      style={{ left: x, top: y, width: 208 }}
    >
      <button
        type="button"
        onClick={onClose}
        className="block w-full cursor-pointer text-left"
        aria-label="Close message"
      >
        <span
          className="pixel-corners block p-[2px]"
          style={{ backgroundColor: "#1B2A17" }}
        >
          <span
            className="pixel-corners block px-[12px] pb-[10px] pt-[9px]"
            style={{ backgroundColor: "#F1EAD6" }}
          >
            <span
              className="font-pixel block text-[10px] leading-[17px]"
              style={{ color: "#1B2A17" }}
            >
              Welcome, traveller.
              <br />
              Three Main Quests
              <br />
              await below.
            </span>
            <span
              aria-hidden
              className="anim-hint-bob mt-[4px] block text-right text-[9px] leading-none"
              style={{ color: "#4A6E36" }}
            >
              ▼
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
