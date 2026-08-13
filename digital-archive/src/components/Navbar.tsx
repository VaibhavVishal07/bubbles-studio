import Logo from './Logo'

const LINK_CLASS =
  'font-inter text-[10px] uppercase font-medium tracking-[0.15em] text-white/85 transition-colors duration-300 hover:text-white sm:text-xs sm:tracking-[0.2em]'

export default function Navbar() {
  return (
    <nav className="liquid-glass fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full px-4 py-2.5 sm:top-6 sm:px-10 sm:py-3">
      <div className="flex items-center gap-4 sm:gap-12">
        <a href="#gallery" className={LINK_CLASS}>
          Gallery
        </a>
        <a href="#talents" className={LINK_CLASS}>
          Talents
        </a>
        <a href="#" aria-label="Bubbles — home" className="shrink-0">
          <Logo className="h-5 w-5 transition-transform duration-300 hover:scale-110 sm:h-7 sm:w-7" />
        </a>
        <a href="#journal" className={LINK_CLASS}>
          Journal
        </a>
        <a href="#story" className={LINK_CLASS}>
          Story
        </a>
      </div>
    </nav>
  )
}
