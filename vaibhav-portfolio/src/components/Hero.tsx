"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { HeroIntro } from "./HeroIntro";
import { PixelWorld } from "./world/PixelWorld";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [bubbleReady, setBubbleReady] = useState(false);
  const [interactive, setInteractive] = useState(false);

  // The playable layer is a desktop enhancement; everything it offers is
  // reachable from the buttons regardless.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setInteractive(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      root.dataset.anim = "off";
      setBubbleReady(true);
      return;
    }

    const ctx = gsap.context(() => {
      const at = (name: string) => `[data-enter="${name}"]`;
      gsap.set("[data-enter]", { opacity: 0, y: 8 });
      root.dataset.anim = "off";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(at("avatar"), { opacity: 1, y: 0, duration: 0.34 }, 0.1)
        .to(at("bubble"), { opacity: 1, y: 0, duration: 0.26 }, 0.18)
        .add(() => setBubbleReady(true), 0.2)
        .to(at("headline"), { opacity: 1, y: 0, duration: 0.36 }, 0.26)
        .to(at("description"), { opacity: 1, y: 0, duration: 0.34 }, 0.34)
        .to(at("cta"), { opacity: 1, y: 0, duration: 0.32 }, 0.42)
        .to(at("world"), { opacity: 1, y: 0, duration: 0.4 }, 0.5)
        .to(at("scroll"), { opacity: 1, y: 0, duration: 0.3 }, 0.62);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="home"
      data-anim="pending"
      className="hero relative"
    >
      <div className="shell hero-grid">
        <HeroIntro bubbleReady={bubbleReady} reduced={reduced} />

        <div
          data-enter="world"
          className="world-frame flex justify-center lg:justify-end"
        >
          <div className="world-fit">
            <PixelWorld interactive={interactive} reduced={reduced} />
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

/**
 * Bottom of the fold: a pixel grass edge and one quiet marker. Just enough to
 * say "the world continues" without revealing the next section.
 */
function ScrollCue() {
  return (
    <div
      data-enter="scroll"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center"
    >
      <a
        href="#work"
        className="pointer-events-auto mb-[10px] flex items-center gap-[7px] text-[12px] font-medium tracking-[0.04em] text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--forest)]"
      >
        <span aria-hidden className="anim-hint-bob">
          ↓
        </span>
        Explore my work
      </a>
      <svg
        width="100%"
        height="12"
        className="pixelated block"
        shapeRendering="crispEdges"
        aria-hidden
        style={{ opacity: 0.55 }}
      >
        <defs>
          <pattern
            id="grass-edge"
            patternUnits="userSpaceOnUse"
            width="38"
            height="12"
          >
            <g transform="translate(0,2) scale(2)">
              <rect x="2" y="0" width="1" height="1" fill="#6E9C4C" />
              <rect x="4" y="0" width="1" height="1" fill="#6E9C4C" />
              <rect x="1" y="1" width="2" height="1" fill="#6E9C4C" />
              <rect x="4" y="1" width="2" height="1" fill="#6E9C4C" />
              <rect x="0" y="2" width="7" height="1" fill="#5C8442" />
              <rect x="12" y="1" width="1" height="1" fill="#6E9C4C" />
              <rect x="11" y="2" width="3" height="1" fill="#5C8442" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#grass-edge)" />
      </svg>
    </div>
  );
}
