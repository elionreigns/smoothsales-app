import type { Metadata, Viewport } from "next";
import "./globals.css";

// Note: we do not use next/font/google here. On Windows, project paths that
// contain "#" (e.g. "Cursor Sites #2") can break next/font's internal CSS
// resolution with "Module not found: ... next/font/google/target.css".
// Google Fonts are loaded via <link>; --font-* vars are set in globals.css.

export const metadata: Metadata = {
  title: "SmoothSales | Coral Crown Solutions",
  description: "Service outreach: Botox Oahu, Tech, Prayer Authority, Time for Fun Hawaii & USA, E Lion Music, Hawaii Wedding Plans, P48X. Email campaigns made simple.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans scroll-smooth min-w-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
