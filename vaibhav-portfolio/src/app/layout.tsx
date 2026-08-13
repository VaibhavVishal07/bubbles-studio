import type { Metadata, Viewport } from "next";
import { Inter, Silkscreen } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const pixel = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Vaibhav — Product Designer",
  description:
    "A product designer from India with 6+ years of experience in B2C design. Building from 0 to 1, making data-driven decisions, and crafting intuitive UIs.",
};

export const viewport: Viewport = {
  themeColor: "#F7F3E8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${pixel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
