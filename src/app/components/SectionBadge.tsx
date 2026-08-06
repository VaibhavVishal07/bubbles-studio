import { PURPLE } from '../theme'

/** The hero badge, reused as a section eyebrow to carry the first fold through. */
export default function SectionBadge({
  children,
  onDark = false,
}: {
  children: React.ReactNode
  onDark?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm ${
        onDark ? 'bg-white/10 text-white backdrop-blur-sm' : 'bg-white text-neutral-900'
      }`}
      style={{ fontSize: 13 }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: onDark ? '#fff' : PURPLE }}
      />
      {children}
    </span>
  )
}
