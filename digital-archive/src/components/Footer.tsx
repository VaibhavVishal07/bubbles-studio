import { Aperture, BarChart3, Facebook, Linkedin, Twitter } from 'lucide-react'

const ICON_CLASS = 'h-3.5 w-3.5 sm:h-4 sm:w-4'
const ICON_LINK_CLASS = 'text-white/80 transition-colors duration-300 hover:text-white'
const TEXT_LINK_CLASS =
  'hidden font-inter text-[9px] uppercase font-medium tracking-[0.15em] text-white/80 transition-colors duration-300 hover:text-white sm:inline sm:text-[10px] sm:tracking-[0.25em]'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/40 to-transparent px-3 py-2.5 sm:px-10 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" aria-label="Bubbles on Facebook" className={ICON_LINK_CLASS}>
            <Facebook className={ICON_CLASS} />
          </a>
          <a href="#" aria-label="Bubbles on Twitter" className={ICON_LINK_CLASS}>
            <Twitter className={ICON_CLASS} />
          </a>
          <a href="#" aria-label="Bubbles on LinkedIn" className={ICON_LINK_CLASS}>
            <Linkedin className={ICON_CLASS} />
          </a>
          <a href="#" className={TEXT_LINK_CLASS}>
            Privacy Notice
          </a>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className={TEXT_LINK_CLASS}>
            Terms &amp; Policies
          </a>
          <a href="#" aria-label="Studio metrics" className={ICON_LINK_CLASS}>
            <BarChart3 className={ICON_CLASS} />
          </a>
          <a href="#" aria-label="Studio index" className={ICON_LINK_CLASS}>
            <Aperture className={ICON_CLASS} />
          </a>
        </div>
      </div>
    </footer>
  )
}
