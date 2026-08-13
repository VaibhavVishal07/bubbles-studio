/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted anywhere (GitHub Pages, Netlify, S3, ...).
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
