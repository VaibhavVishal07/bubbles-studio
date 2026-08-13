import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

// Both re-encoded from the original CloudFront sources at 1600px wide — see
// scripts/encode-video.md. VIDEO_2 is all-keyframe so scroll seeks are instant;
// the 4K originals took ~346ms per seek, which capped scrubbing at ~4.5fps.
const VIDEO_1 = '/hero-still.mp4';
const VIDEO_2 = '/hero-scrub.mp4';

// Scrolling down advances playback; scrolling back up rewinds it.
// Flip to true to invert that mapping.
const REVERSE_SCRUB = false;
// Don't re-seek for anything smaller than this — sub-frame seeks cost as much
// as large ones and buy nothing visible.
const SEEK_EPSILON = 0.03;

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = video2Ref.current;
    if (!v) return;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      return REVERSE_SCRUB ? 1 - p : p;
    };

    // Seek coalescing: only ever one seek in flight, and when it lands we jump
    // straight to wherever the scroll is NOW. Queuing eased intermediate seeks
    // makes the video chase a stale position, which is what reads as jitter.
    const pump = () => {
      if (seeking.current || v.readyState < 1) return;
      const target = targetTime.current;
      if (Math.abs(v.currentTime - target) < SEEK_EPSILON) return;
      seeking.current = true;
      v.currentTime = target;
    };

    const onSeeked = () => {
      seeking.current = false;
      pump();
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      const duration = v.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      // Stay a hair short of the end — seeking to exactly duration can blank the frame.
      targetTime.current = Math.min(progress() * duration, duration - 0.05);
      pump();
    };

    // The video is scrubbed, never played — make sure nothing else drives it.
    v.pause();
    const onMeta = () => handleScroll();
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('seeked', onSeeked);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[200dvh]">
      <section className="sticky top-0 w-full h-[100dvh] overflow-hidden">
        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          src={VIDEO_2}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <video
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <source src={VIDEO_1} type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center justify-center pb-[25vh] sm:pb-[30vh]">
          <div className="relative flex items-center justify-center w-[45vw] h-[45vw] max-w-[320px] max-h-[320px] md:w-[30vw] md:h-[30vw] md:max-w-[400px] md:max-h-[400px]">
            <div
              style={{ transitionDelay: '0ms' }}
              className={`absolute inset-0 rounded-full border border-white/35 transition-all duration-[1200ms] ease-out ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            />
            <div
              style={{ transitionDelay: '150ms' }}
              className={`absolute inset-[12%] rounded-full border border-white/25 transition-all duration-[1200ms] ease-out ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            />
            <div
              style={{ transitionDelay: '350ms' }}
              className={`transition-all duration-[1000ms] ease-out ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <Logo className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-white" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-12 md:pb-16 px-5 sm:px-6 md:px-12 text-center">
          <h1
            style={{ transitionDelay: '600ms' }}
            className={`font-heading text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-wide uppercase transition-all duration-[1000ms] ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Where the horizon meets
            <br />
            timeless elegance
          </h1>

          <p
            style={{ transitionDelay: '850ms' }}
            className={`mt-3 sm:mt-4 md:mt-6 text-white/80 font-geist font-light text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed transition-all duration-[1000ms] ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Indulge in unparalleled seaside living where sophistication meets the
            endless shore.
          </p>
        </div>
      </section>
    </div>
  );
}
