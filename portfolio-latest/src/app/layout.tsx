import type { Metadata } from 'next'
import { Geist, Geist_Mono, Geist_Pixel } from 'next/font/google'
import './globals.css'
import './home.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const geistPixel = Geist_Pixel({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-geist-pixel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vaibhav Vishal',
  description:
    'A product designer from India with 6+ years of experience in B2C design. ' +
    'I focus on building from 0 to 1, making data-driven decisions, and crafting intuitive UIs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${geistPixel.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
