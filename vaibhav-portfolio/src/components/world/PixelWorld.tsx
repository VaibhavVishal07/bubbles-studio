"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { PixelSprite } from "../PixelSprite";
import { WorldTerrain } from "./WorldTerrain";
import { WorldCharacter } from "./WorldCharacter";
import { TreasureChest } from "./TreasureChest";
import { SignBoard } from "./SignBoard";
import { DialogueBox } from "./DialogueBox";
import { ItemPanel } from "./ItemPanel";
import { PixelParticles } from "./PixelParticles";
import { InteractionHint } from "./InteractionHint";

import {
  CLOUD,
  FLOWER,
  FLOWER_COLOURS,
  ROCK_LARGE,
  ROCK_SMALL,
  TREE_CANOPY,
  TREE_TRUNK,
} from "@/lib/sprites";
import { recolour } from "@/lib/pixel";
import {
  BLOCK,
  buildWorld,
  FLOWERS,
  OBJECTS,
  WORLD_H,
  WORLD_W,
} from "@/lib/world";
import { useCharacterMovement } from "@/hooks/useCharacterMovement";
import { useProximityInteraction } from "@/hooks/useProximityInteraction";

const TREE_SCALE = 3;
const TREE_W = TREE_CANOPY.w * TREE_SCALE; // 72
const CANOPY_H = TREE_CANOPY.h * TREE_SCALE; // 66
const TRUNK_W = TREE_TRUNK.w * TREE_SCALE; // 24
const TRUNK_H = TREE_TRUNK.h * TREE_SCALE; // 30
const TREE_H = 90; // canopy overlaps the trunk by 6px

const CLOUDS = [
  { top: 18, scale: 3, duration: 96, delay: -12, opacity: 0.55 },
  { top: 62, scale: 2, duration: 132, delay: -58, opacity: 0.4 },
  { top: 340, scale: 2, duration: 118, delay: -90, opacity: 0.35 },
];

type Leaf = { id: number; x: number; y: number };

export function PixelWorld({
  interactive,
  reduced,
}: {
  interactive: boolean;
  reduced: boolean;
}) {
  const map = useMemo(() => buildWorld(), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const chestRef = useRef<HTMLDivElement>(null);
  const flowerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [burst, setBurst] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [toast, setToast] = useState(false);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const movedRef = useRef(false);
  const leafId = useRef(0);

  const enabled = interactive && inView;

  /* ---------------------------- proximity ---------------------------- */

  const targets = useMemo(
    () => [
      { id: "chest", x: OBJECTS.chest.x, y: OBJECTS.chest.y + 6, radius: 54 },
      { id: "sign", x: OBJECTS.sign.x, y: OBJECTS.sign.y + 6, radius: 48 },
    ],
    [],
  );
  const { active, update } = useProximityInteraction(targets);

  /* ------------------------- object reactions ------------------------ */

  const dropLeaf = useCallback(() => {
    const id = leafId.current++;
    setLeaves((l) => [
      ...l,
      {
        id,
        x: OBJECTS.tree.x - 18 + ((id * 13) % 34),
        y: OBJECTS.tree.y - TREE_H + 44,
      },
    ]);
  }, []);

  const shakeTree = useCallback(() => {
    if (!treeRef.current) return;
    gsap.fromTo(
      treeRef.current,
      { x: -2 },
      { x: 0, duration: 0.15, ease: "power1.out", overwrite: true },
    );
  }, []);

  const onBump = useCallback(
    (blocker: number) => {
      if (blocker !== BLOCK.TREE || reduced) return;
      shakeTree();
      if ((leafId.current + Date.now()) % 3 === 0) dropLeaf();
    },
    [dropLeaf, reduced, shakeTree],
  );

  const onTick = useCallback(
    (x: number, y: number) => {
      update(x, y);
      // Flowers lean away as you brush past them. One pixel, nothing more.
      for (let i = 0; i < FLOWERS.length; i++) {
        const el = flowerRefs.current[i];
        if (!el) continue;
        const f = FLOWERS[i];
        const near = Math.abs(x - f.x) < 30 && Math.abs(y - f.y) < 26;
        const offset = near ? (x > f.x ? -1 : 1) : 0;
        el.style.transform = offset ? `translateX(${offset}px)` : "";
      }
    },
    [update],
  );

  /* --------------------------- interactions -------------------------- */

  // Crisp GSAP beat: anticipation → lid → particles → notification.
  const runChestTimeline = useCallback(() => {
    const el = chestRef.current;
    if (!el || reduced) {
      setChestOpen(true);
      setPanelOpen(true);
      return;
    }
    gsap
      .timeline()
      .to(el, { x: 2, duration: 0.05, ease: "none" })
      .to(el, { x: 0, duration: 0.05, ease: "none" })
      .add(() => setChestOpen(true))
      .to(el, { scaleY: 1.05, duration: 0.07, ease: "power2.out" })
      .to(el, { scaleY: 1, duration: 0.09, ease: "power2.inOut" })
      .add(() => setBurst(true), 0.22)
      .add(() => setPanelOpen(true), 0.35);
  }, [reduced]);

  const activateChest = useCallback(() => {
    if (chestOpen) {
      setPanelOpen((p) => !p);
      return;
    }
    runChestTimeline();
  }, [chestOpen, runChestTimeline]);

  const activateSign = useCallback(() => setSignOpen((s) => !s), []);

  /* ---------------------------- movement ----------------------------- */

  const onFirstMove = useCallback(() => {
    if (movedRef.current) return;
    movedRef.current = true;
    setToast(true);
    window.setTimeout(() => setToast(false), 2000);
  }, []);

  const { state } = useCharacterMovement({
    map,
    enabled,
    spriteRef: charRef,
    onBump,
    onTick,
    onFirstMove,
  });

  /* ------------------------------ keys ------------------------------- */

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "e") return;
      if (active === "chest") activateChest();
      else if (active === "sign") activateSign();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, active, activateChest, activateSign]);

  /* --------------------------- in-view gate -------------------------- */

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ----------------------- idle discovery hint ----------------------- */

  useEffect(() => {
    if (!enabled) return;
    const show = window.setTimeout(() => {
      if (movedRef.current) return;
      setToast(true);
      window.setTimeout(() => setToast(false), 2600);
    }, 5500);
    return () => window.clearTimeout(show);
  }, [enabled]);

  /* ------------------------- ambient leaf drop ----------------------- */

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(dropLeaf, 9000);
    return () => window.clearInterval(id);
  }, [dropLeaf, reduced, inView]);

  /* ------------------------- cursor parallax ------------------------- */

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced || !interactive) return;
    let raf = 0;
    let mx = 0;
    let my = 0;

    const apply = () => {
      raf = 0;
      if (parallaxRef.current)
        parallaxRef.current.style.transform = `translate(${Math.round(mx * 2)}px, ${Math.round(my * 2)}px)`;
      if (cloudRef.current)
        cloudRef.current.style.transform = `translate(${Math.round(mx * 5)}px, ${Math.round(my * 4)}px)`;
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      my = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, interactive]);

  /* ------------------------------ render ----------------------------- */

  const hintTarget = active ?? hovered;

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ width: WORLD_W, height: WORLD_H }}
      role="group"
      aria-label="Interactive pixel world"
    >
      <p className="sr-only">
        An optional pixel world. Use W, A, S, D or the arrow keys to walk
        around, and press E next to the chest or the signpost. Everything here
        is also available from the buttons above.
      </p>

      {/* Clouds drift behind the island. */}
      <div
        ref={cloudRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            data-cloud
            className="absolute left-0"
            style={{
              top: c.top,
              opacity: c.opacity,
              animation: reduced
                ? undefined
                : `cloud-drift ${c.duration}s linear ${c.delay}s infinite`,
            }}
          >
            <PixelSprite sprite={CLOUD} scale={c.scale} className="pixelated" />
          </div>
        ))}
      </div>

      <WorldTerrain map={map} animate={!reduced} />

      {/* Everything that gets a touch of cursor parallax. */}
      <div ref={parallaxRef} className="absolute inset-0" style={{ zIndex: 1 }}>
        {/* Tree */}
        <div
          className="absolute"
          style={{
            left: OBJECTS.tree.x - TREE_W / 2,
            top: OBJECTS.tree.y - TREE_H,
            width: TREE_W,
            height: TREE_H,
            zIndex: Math.round(OBJECTS.tree.y),
          }}
        >
          <div ref={treeRef} className="relative h-full w-full">
            <PixelSprite
              sprite={TREE_TRUNK}
              scale={TREE_SCALE}
              className="pixelated absolute"
              style={{ left: (TREE_W - TRUNK_W) / 2, top: TREE_H - TRUNK_H }}
            />
            <PixelSprite
              sprite={TREE_CANOPY}
              scale={TREE_SCALE}
              className="pixelated anim-sway absolute left-0 top-0"
              style={{ height: CANOPY_H }}
            />
          </div>
        </div>
      </div>

      {/* Rocks */}
      <Placed obj={OBJECTS.rockLarge} w={ROCK_LARGE.w * 3} h={ROCK_LARGE.h * 3}>
        <PixelSprite sprite={ROCK_LARGE} scale={3} className="pixelated" />
      </Placed>
      <Placed obj={OBJECTS.rockSmallA} w={ROCK_SMALL.w * 3} h={ROCK_SMALL.h * 3}>
        <PixelSprite sprite={ROCK_SMALL} scale={3} className="pixelated" />
      </Placed>
      <Placed obj={OBJECTS.rockSmallB} w={ROCK_SMALL.w * 3} h={ROCK_SMALL.h * 3}>
        <PixelSprite sprite={ROCK_SMALL} scale={3} className="pixelated" />
      </Placed>

      {/* Flowers */}
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          ref={(el) => {
            flowerRefs.current[i] = el;
          }}
          className="absolute transition-transform duration-150 ease-out"
          style={{
            left: f.x - 5,
            top: f.y - 10,
            zIndex: Math.round(f.y),
          }}
          aria-hidden
        >
          <PixelSprite
            sprite={recolour(FLOWER, { p: FLOWER_COLOURS[f.colour] })}
            scale={2}
            className="pixelated"
          />
        </div>
      ))}

      {/* Falling leaves */}
      {leaves.map((leaf) => (
        <FallingLeaf
          key={leaf.id}
          leaf={leaf}
          onDone={() =>
            setLeaves((list) => list.filter((l) => l.id !== leaf.id))
          }
        />
      ))}

      {/* Signpost */}
      <div
        onMouseEnter={() => setHovered("sign")}
        onMouseLeave={() => setHovered(null)}
      >
        <SignBoard
          x={OBJECTS.sign.x}
          y={OBJECTS.sign.y}
          open={signOpen}
          onActivate={activateSign}
        />
      </div>

      {/* Chest */}
      <div
        onMouseEnter={() => setHovered("chest")}
        onMouseLeave={() => setHovered(null)}
      >
        <TreasureChest
          ref={chestRef}
          x={OBJECTS.chest.x}
          y={OBJECTS.chest.y}
          open={chestOpen}
          onActivate={activateChest}
        />
      </div>

      {/* Player */}
      <WorldCharacter ref={charRef} dir={state.dir} frame={state.frame} />

      {/* Hints */}
      <InteractionHint
        x={OBJECTS.chest.x}
        y={OBJECTS.chest.y - 68}
        label="Open"
        visible={!chestOpen && hintTarget === "chest"}
      />
      <InteractionHint
        x={OBJECTS.sign.x}
        y={OBJECTS.sign.y - 62}
        label={signOpen ? "Close" : "Read"}
        visible={hintTarget === "sign"}
      />

      {burst ? (
        <PixelParticles
          x={OBJECTS.chest.x}
          y={OBJECTS.chest.y - 34}
          onDone={() => setBurst(false)}
        />
      ) : null}

      {signOpen ? (
        <DialogueBox
          x={Math.min(Math.max(OBJECTS.sign.x - 104, 8), WORLD_W - 216)}
          y={OBJECTS.sign.y - 36 - 96}
          onClose={() => setSignOpen(false)}
          reduced={reduced}
        />
      ) : null}

      {panelOpen ? (
        <ItemPanel
          x={182}
          y={52}
          onClose={() => setPanelOpen(false)}
          reduced={reduced}
        />
      ) : null}

      {/* Keyboard discovery toast */}
      <div
        className="pointer-events-none absolute left-1/2 z-[970] -translate-x-1/2 transition-opacity duration-300"
        style={{ bottom: 6, opacity: toast ? 1 : 0 }}
        aria-hidden
      >
        <span
          className="pixel-corners block p-[2px]"
          style={{ backgroundColor: "rgba(34,34,31,0.9)" }}
        >
          <span className="font-pixel block px-[9px] py-[5px] text-[9px] leading-none text-[#F7F3E8]">
            WASD / ↑↓←→ to explore
          </span>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Placed({
  obj,
  w,
  h,
  children,
}: {
  obj: { x: number; y: number };
  w: number;
  h: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: obj.x - w / 2,
        top: obj.y - h,
        zIndex: Math.round(obj.y),
      }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function FallingLeaf({ leaf, onDone }: { leaf: Leaf; onDone: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: onDone })
        .fromTo(
          el,
          { opacity: 0, y: 0, x: 0 },
          { opacity: 1, duration: 0.12 },
        )
        .to(el, { y: 46, x: 7, duration: 0.9, ease: "sine.inOut" }, 0)
        .to(el, { x: 2, duration: 0.45, ease: "sine.inOut" }, 0.45)
        .to(el, { opacity: 0, duration: 0.25 }, 0.7);
    }, el);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <span
      ref={ref}
      className="pointer-events-none absolute block"
      style={{
        left: leaf.x,
        top: leaf.y,
        width: 3,
        height: 3,
        backgroundColor: "#5C8A3E",
        zIndex: 400,
      }}
      aria-hidden
    />
  );
}
