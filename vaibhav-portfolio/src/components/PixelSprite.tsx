import { memo, useMemo } from "react";
import { spriteRuns, type Run, type Sprite } from "@/lib/pixel";

type Props = {
  sprite: Sprite;
  /** Integer multiplier only — anything else reintroduces blur. */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

/**
 * Renders a sprite as crisp SVG rects. No bitmaps, so it stays sharp at any
 * device pixel ratio while keeping strict 1-unit pixel alignment.
 */
function PixelSpriteBase({ sprite, scale = 1, className, style, title }: Props) {
  const runs = useMemo(() => spriteRuns(sprite), [sprite]);
  return (
    <svg
      className={className}
      style={style}
      width={sprite.w * scale}
      height={sprite.h * scale}
      viewBox={`0 0 ${sprite.w} ${sprite.h}`}
      shapeRendering="crispEdges"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <Rects runs={runs} />
    </svg>
  );
}

export function Rects({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
    </>
  );
}

export const PixelSprite = memo(PixelSpriteBase);
