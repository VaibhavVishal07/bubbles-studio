"use client";

import { useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { MAIL_BODY, MAIL_FLAP, SWORD } from "@/lib/sprites";

type Common = {
  href: string;
  children: React.ReactNode;
  download?: boolean;
  className?: string;
};

const BASE =
  "group relative inline-flex h-[50px] items-center gap-[10px] rounded-[4px] text-[15px] font-medium transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform";

/** Primary CTA — forest green, pixel sword, nudging arrow. */
export function PrimaryButton({ href, children, download, className }: Common) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      download={download}
      className={`${BASE} px-[22px] ${className ?? ""}`}
      style={{
        backgroundColor: hover ? "#28542F" : "var(--forest)",
        color: "#FBF7EC",
        border: `1px solid ${hover ? "#3E7549" : "var(--forest-dark)"}`,
        boxShadow: hover
          ? "0 3px 0 rgba(23,53,29,0.22)"
          : "0 1px 0 rgba(23,53,29,0.3)",
        transform: hover ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <PixelSprite
        sprite={SWORD}
        scale={2}
        className="pixelated -ml-[2px] transition-transform duration-200 ease-out"
        style={{
          transformOrigin: "6px 16px",
          transform: hover ? "rotate(0deg)" : "rotate(-8deg)",
        }}
      />
      <span className="tracking-[-0.005em]">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-200 ease-out"
        style={{ transform: hover ? "translateX(4px)" : "none" }}
      >
        →
      </span>
    </a>
  );
}

/** Secondary CTA — cream, warm border, envelope that cracks open on hover. */
export function SecondaryButton({ href, children, className }: Common) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      className={`${BASE} px-[20px] ${className ?? ""}`}
      style={{
        backgroundColor: hover ? "#FFFDF7" : "var(--surface)",
        color: "var(--text)",
        border: `1px solid ${hover ? "#C3B9A4" : "var(--border)"}`,
        boxShadow: hover ? "0 1px 0 rgba(34,34,31,0.06)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <span className="relative -ml-[2px] block h-[18px] w-[24px]">
        <PixelSprite
          sprite={MAIL_BODY}
          scale={2}
          className="pixelated absolute left-0 top-0"
        />
        <PixelSprite
          sprite={MAIL_FLAP}
          scale={2}
          className="pixelated absolute left-0 top-0 origin-top transition-transform duration-200 ease-out"
          style={{
            transform: hover ? "translateY(-2px) rotate(-5deg)" : "none",
          }}
        />
      </span>
      <span className="tracking-[-0.005em]">{children}</span>
    </a>
  );
}
