import type { ImgHTMLAttributes } from 'react'

type AssetImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  /** Path inside /public, used if the remote asset fails to load. */
  fallback: string
}

/**
 * Decorative artwork with a local backstop. Several of the hosted atmosphere
 * assets answer 401, so each one falls back to an SVG shipped with the site.
 */
export default function AssetImage({ src, fallback, ...rest }: AssetImageProps) {
  return (
    <img
      src={src}
      onError={(event) => {
        const img = event.currentTarget
        if (img.dataset.fellBack === 'true') return
        img.dataset.fellBack = 'true'
        img.src = `${import.meta.env.BASE_URL}${fallback}`
      }}
      {...rest}
    />
  )
}
