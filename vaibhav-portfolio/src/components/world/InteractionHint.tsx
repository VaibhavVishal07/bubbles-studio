"use client";

/**
 * The little "[E] Open" chip that appears when you stand next to something.
 * Deliberately tiny — it is a nudge, not a HUD.
 */
export function InteractionHint({
  x,
  y,
  label,
  visible,
}: {
  x: number;
  y: number;
  label: string;
  visible: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute z-[900] -translate-x-1/2 transition-[opacity,transform] duration-150 ease-out"
      style={{
        left: x,
        top: y,
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, ${visible ? 0 : 3}px)`,
      }}
      aria-hidden
    >
      <div className="anim-hint-bob flex items-center gap-[5px]">
        <span
          className="font-pixel pixel-corners flex h-[16px] min-w-[16px] items-center justify-center px-[4px] text-[9px] leading-none"
          style={{
            backgroundColor: "#22221F",
            color: "#FFFDF7",
            paddingTop: 1,
          }}
        >
          E
        </span>
        <span
          className="pixel-corners block p-[2px]"
          style={{ backgroundColor: "#22221F" }}
        >
          <span
            className="font-pixel pixel-corners block px-[6px] py-[3px] text-[9px] leading-none"
            style={{ backgroundColor: "#FFFDF7", color: "#22221F" }}
          >
            {label}
          </span>
        </span>
      </div>
    </div>
  );
}
