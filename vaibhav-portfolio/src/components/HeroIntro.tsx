"use client";

import { PixelAvatar } from "./PixelAvatar";
import { SpeechBubble } from "./SpeechBubble";
import { PrimaryButton, SecondaryButton } from "./PixelButton";

type Props = {
  /** Gates the character reveal until the bubble has entered. */
  bubbleReady: boolean;
  reduced: boolean;
};

export function HeroIntro({ bubbleReady, reduced }: Props) {
  return (
    <div className="max-w-[600px]">
      <div className="mb-7 flex items-end gap-[14px]" data-enter="avatar">
        <PixelAvatar scale={4} />
        <div className="mb-[18px]" data-enter="bubble">
          <SpeechBubble
            text="Hello, I'm Vaibhav"
            start={bubbleReady}
            reduced={reduced}
          />
        </div>
      </div>

      <h1
        data-enter="headline"
        className="text-[54px] font-[650] leading-[1.06] tracking-[-0.022em] text-[var(--text)]"
      >
        Designing digital products
        <br />
        from 0 to 1.
      </h1>

      <p
        data-enter="description"
        className="mt-[22px] max-w-[540px] text-[17px] leading-[1.6] text-[var(--text-secondary)]"
      >
        A product designer from India with 6+ years of experience in B2C design.
        I focus on building from 0 to 1, making data-driven decisions, and
        crafting intuitive UIs.
      </p>

      <div data-enter="cta" className="mt-[34px] flex flex-wrap items-center gap-3">
        <PrimaryButton href="/resume.pdf" download>
          Get My Resume
        </PrimaryButton>
        <SecondaryButton href="mailto:vaibhavvishalece@gmail.com">
          Send Me a Mail
        </SecondaryButton>
      </div>
    </div>
  );
}
