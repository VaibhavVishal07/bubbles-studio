import { PURPLE } from '../theme'

/** The logo's petal cluster, reused as a floating decorative motif. */
export default function BubbleMark({
  className = '',
  color = PURPLE,
  opacity = 1,
}: {
  className?: string
  color?: string
  opacity?: number
}) {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return { cx: 16 + 10 * Math.cos(angle), cy: 16 + 10 * Math.sin(angle) }
  })

  return (
    <svg viewBox="0 0 32 32" className={className} style={{ opacity }} aria-hidden="true">
      {petals.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={3.5} fill={color} />
      ))}
      <circle cx={16} cy={16} r={3.5} fill={color} />
    </svg>
  )
}
