import { hero } from '@/data/site'

export default function Hero() {
  return (
    <>
      <section className="hero" aria-label="Introduction">
        {/* Narrow screens use a flat highlight badge instead of the speech bubble. */}
        <div className="hero-badge">
          <span className="hero-badgeFill" />
          <span className="hero-badgeNotch hero-badgeNotch--top" />
          <span className="hero-badgeNotch hero-badgeNotch--bottom" />
          <img className="hero-badgeAvatar pixel" src="/svg/avatar-small.svg" alt="Pixel-art portrait of Vaibhav" />
          <p className="hero-badgeText">{hero.badge}</p>
        </div>

        {/* Avatar + speech bubble */}
        <div className="hero-avatarDialog">
          <img className="hero-avatar pixel" src="/svg/avatar.svg" alt="Pixel-art portrait of Vaibhav" />
          <div className="hero-dialog">
            <div className="hero-dialogBox" />
            <p className="hero-dialogText">{hero.badge}</p>
            <img className="hero-dialogPointer pixel" src="/svg/dialog-pointer.svg" alt="" aria-hidden />
          </div>
        </div>

        <h1 className="hero-intro">{hero.intro}</h1>

        <a className="hero-btn hero-btn--dark" href={hero.primaryCta.href || undefined}>
          <span className="hero-btnLabel">{hero.primaryCta.label}</span>
          <img className="hero-btnIcon hero-btnIcon--down pixel" src="/svg/arrow-down.svg" alt="" aria-hidden />
        </a>

        <a className="hero-btn hero-btn--light" href={hero.secondaryCta.href || undefined}>
          <span className="hero-btnLabel">{hero.secondaryCta.label}</span>
          <img className="hero-btnIcon hero-btnIcon--mail pixel" src="/svg/mail.svg" alt="" aria-hidden />
        </a>

        {/* Below 1440px the briefcase sits in the hero rather than riding the ground strip. */}
        <img className="hero-briefcase pixel" src="/svg/briefcase.svg" alt="" aria-hidden />
      </section>

      {/* Full-bleed pixel ground with the walking briefcase */}
      <div className="ground" aria-hidden>
        <div className="ground-strip">
          <img className="ground-img pixel" src="/img/ground-strip.png" alt="" />
          <img className="ground-briefcase pixel" src="/svg/briefcase.svg" alt="" />
        </div>
      </div>
    </>
  )
}
