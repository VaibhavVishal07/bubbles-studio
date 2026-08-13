"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  /** Total reveal time; a quick flourish, not a slow typewriter. */
  duration?: number;
  start?: boolean;
  reduced?: boolean;
  className?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
};

/**
 * A classic dialogue box, shrunk to website scale: cream fill, 2px ink border,
 * pixel-cut corners, and a stubby pointer.
 */
export function SpeechBubble({
  text,
  duration = 450,
  start = true,
  reduced = false,
  className,
  tone = "light",
  children,
}: Props) {
  const shown = useCharacterReveal(text, duration, start && !reduced);
  const done = shown >= text.length;

  const border = tone === "light" ? "#22221F" : "#1B2A17";
  const fill = tone === "light" ? "#FFFDF7" : "#F1EAD6";

  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      {/* Pointer, drawn as pixels so it matches the sprite grid. */}
      <svg
        width="8"
        height="14"
        viewBox="0 0 4 7"
        shapeRendering="crispEdges"
        className="pixelated absolute left-[-8px] top-[calc(50%-7px)]"
        aria-hidden
      >
        <rect x="3" y="0" width="1" height="7" fill={fill} />
        <rect x="2" y="1" width="1" height="5" fill={fill} />
        <rect x="1" y="2" width="1" height="3" fill={fill} />
        <rect x="0" y="3" width="1" height="1" fill={border} />
        <rect x="1" y="2" width="1" height="1" fill={border} />
        <rect x="1" y="4" width="1" height="1" fill={border} />
        <rect x="2" y="1" width="1" height="1" fill={border} />
        <rect x="2" y="5" width="1" height="1" fill={border} />
        <rect x="3" y="0" width="1" height="1" fill={border} />
        <rect x="3" y="6" width="1" height="1" fill={border} />
      </svg>

      <div
        className="pixel-corners p-[2px]"
        style={{ backgroundColor: border }}
      >
        <div
          className="pixel-corners px-[12px] py-[8px]"
          style={{ backgroundColor: fill }}
        >
          <p
            className="font-pixel whitespace-nowrap text-[11px] leading-[16px]"
            style={{ color: tone === "light" ? "#22221F" : "#1B2A17" }}
          >
            {/* Reserve the final width so the bubble never reflows mid-reveal. */}
            <span className="relative">
              <span aria-hidden className="invisible">
                {text}
              </span>
              <span className="absolute left-0 top-0">
                {reduced ? text : text.slice(0, shown)}
                {!done && !reduced ? (
                  <span className="anim-caret" aria-hidden>
                    ▌
                  </span>
                ) : null}
              </span>
            </span>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

function useCharacterReveal(text: string, duration: number, start: boolean) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!start) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let raf = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / duration);
      setShown(Math.round(t * text.length));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, start]);

  return shown;
}
