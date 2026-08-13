import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';

const LINKS = ['Story', 'Estates', 'Lifestyle', 'Views', 'Inquire'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-4 md:py-5 flex items-center justify-between">
        <a href="#" aria-label="Horizon Estates">
          <Logo className="w-7 h-7 md:w-10 md:h-10 text-white relative z-50" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-geist font-light tracking-wide">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <button className="hidden md:flex group items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white transition-all shadow-lg">
          <span className="text-gray-800 text-xs md:text-sm font-geist font-medium tracking-wider uppercase">
            Book a Viewing
          </span>
          <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-rose-200/60 group-hover:bg-rose-300/70 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-gray-700" />
          </span>
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-50 md:hidden flex flex-col items-center justify-center w-10 h-10"
        >
          <span
            className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)] ${
              open ? 'rotate-45 translate-y-[3px]' : '-translate-y-[3px]'
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)] ${
              open ? '-rotate-45 -translate-y-[0px]' : 'translate-y-[3px]'
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative h-full flex flex-col items-center justify-center px-8">
          <div className="flex flex-col items-center gap-6">
            {LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${open ? 100 + i * 60 : 0}ms` }}
                className={`text-white text-2xl font-heading tracking-wider uppercase hover:text-white/70 transition-all duration-500 ease-out ${
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${open ? 420 : 0}ms` }}
            className={`mt-10 group flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white shadow-lg transition-all duration-500 ease-out ${
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-gray-800 text-xs font-geist font-medium tracking-wider uppercase">
              Book a Viewing
            </span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-200/60 group-hover:bg-rose-300/70 transition-colors">
              <ArrowRight className="w-3.5 h-3.5 text-gray-700" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
