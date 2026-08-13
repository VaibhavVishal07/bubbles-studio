import { PixelSprite } from "./PixelSprite";
import { AVATAR } from "@/lib/sprites";

/**
 * The hero-side portrait: an original 16-bit adventurer with a green cap,
 * overshirt and daypack — Vaibhav, dressed for the overworld.
 */
export function PixelAvatar({ scale = 4 }: { scale?: number }) {
  return (
    <div className="relative flex flex-col items-center">
      <PixelSprite
        sprite={AVATAR}
        scale={scale}
        className="pixelated anim-breathe relative z-10"
        title="Pixel portrait of Vaibhav"
      />
      <svg
        width={13 * scale}
        height={3 * scale}
        viewBox="0 0 13 3"
        shapeRendering="crispEdges"
        className="pixelated -mt-[3px]"
        aria-hidden
      >
        <rect x="3" y="0" width="7" height="1" fill="rgba(34,34,31,0.07)" />
        <rect x="1" y="1" width="11" height="1" fill="rgba(34,34,31,0.09)" />
        <rect x="3" y="2" width="7" height="1" fill="rgba(34,34,31,0.05)" />
      </svg>
    </div>
  );
}
