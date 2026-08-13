"use client";

import { useEffect, useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { CREST, GEM, HEART } from "@/lib/sprites";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 h-[var(--nav-h)] border-b transition-shadow duration-200"
      style={{
        backgroundColor: "rgba(255, 253, 247, 0.92)",
        backdropFilter: "saturate(120%) blur(6px)",
        borderColor: scrolled ? "var(--border)" : "var(--border-soft)",
        boxShadow: scrolled ? "0 1px 0 rgba(34,34,31,0.04)" : "none",
      }}
    >
      <nav
        className="shell flex h-full items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="group flex items-center gap-[10px] text-[15px] font-semibold tracking-[-0.01em] text-[var(--text)]"
        >
          <PixelSprite
            sprite={CREST}
            scale={2}
            className="pixelated transition-transform duration-200 group-hover:-translate-y-px"
          />
          <span>Vaibhav</span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="flex items-center">
            {LINKS.map((link, i) => {
              const selected = i === 0;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={selected ? "page" : undefined}
                    className="relative block px-[14px] py-[10px] text-[14.5px] font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text)]"
                    style={selected ? { color: "var(--text)" } : undefined}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-[2px] left-[14px] right-[14px] h-[2px] origin-left transition-transform duration-200"
                      style={{
                        backgroundColor: "var(--forest)",
                        transform: selected ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Quiet easter egg: the classic three-heart meter. */}
          <div
            className="ml-3 hidden items-center gap-[6px] border-l pl-4 lg:flex"
            style={{ borderColor: "var(--border-soft)" }}
            aria-hidden
            title="Full health"
          >
            <span className="flex items-center gap-[3px]">
              {[0, 1, 2].map((i) => (
                <PixelSprite
                  key={i}
                  sprite={HEART}
                  scale={2}
                  className="pixelated"
                />
              ))}
            </span>
            <PixelSprite sprite={GEM} scale={2} className="pixelated" />
          </div>
        </div>
      </nav>
    </header>
  );
}
