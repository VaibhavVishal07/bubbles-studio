"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The "ITEM ACQUIRED" card. Sized like a game notification, not a modal —
 * it sits beside the chest and never covers the hero copy.
 */
export function ItemPanel({
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
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="absolute z-[960]"
      style={{ left: x, top: y, width: 196 }}
      role="status"
    >
      <div
        className="pixel-corners p-[2px]"
        style={{ backgroundColor: "#22221F" }}
      >
        <div
          className="pixel-corners"
          style={{ backgroundColor: "#FFFDF7" }}
        >
          <div
            className="flex items-center justify-between px-[10px] py-[5px]"
            style={{ backgroundColor: "#22221F" }}
          >
            <span
              className="font-pixel text-[8px] leading-none"
              style={{ color: "#D2A441", letterSpacing: "0.08em" }}
            >
              ITEM ACQUIRED
            </span>
            <button
              type="button"
              onClick={onClose}
              className="font-pixel cursor-pointer text-[9px] leading-none"
              style={{ color: "#8C8B82" }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>

          <div className="px-[12px] pb-[11px] pt-[9px]">
            <p className="text-[14px] font-semibold leading-[18px] text-[var(--text)]">
              Resume
            </p>
            <p className="mt-[3px] text-[12px] leading-[17px] text-[var(--text-secondary)]">
              A summary of my adventures so far.
            </p>
            <a
              href="/resume.pdf"
              download
              className="mt-[9px] inline-flex h-[30px] items-center gap-[6px] rounded-[3px] px-[10px] text-[12.5px] font-medium transition-colors duration-150"
              style={{ backgroundColor: "var(--forest)", color: "#FBF7EC" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2B5A33";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--forest)";
              }}
            >
              Download Resume
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
