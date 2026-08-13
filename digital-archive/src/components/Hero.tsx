const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_130946_e6793cc7-6b6f-4035-9852-44290b781ae6.mp4'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Hands the video off to the fog layer without a visible seam */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-full bg-gradient-to-b from-transparent to-[#410C01]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
        <p
          className="hero-fade-up font-inter text-xs font-medium uppercase tracking-[0.35em] text-white/90 sm:text-sm"
          style={{ animationDelay: '0.1s' }}
        >
          Bubbles Studio
        </p>
        <p
          className="hero-fade-up mt-2 font-inter text-[10px] font-light uppercase tracking-[0.4em] text-white/70 sm:text-xs"
          style={{ animationDelay: '0.1s' }}
        >
          Bengaluru, India
        </p>

        <h1
          className="hero-fade-up mt-6 leading-[1.05] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
          style={{ animationDelay: '0.25s' }}
        >
          <span className="block font-arsenica text-5xl tracking-wide sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
            DIGITAL
          </span>
          <span className="block font-inter text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
            ARCHIVE
          </span>
        </h1>

        <p
          className="hero-fade-up mt-6 max-w-xl font-arsenica text-sm text-white/90 sm:text-base md:text-lg xl:text-xl"
          style={{ animationDelay: '0.4s' }}
        >
          A showcase honouring the makers, visionaries and craftspeople across India who turned a
          hard season into something rare.
        </p>

        <button
          type="button"
          className="liquid-glass hero-fade-up mt-10 rounded-[50%] px-10 py-5 font-inter text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98] sm:px-12 sm:py-6 sm:text-xs"
          style={{ animationDelay: '0.55s' }}
        >
          Enter Gallery
        </button>
      </div>
    </section>
  )
}
