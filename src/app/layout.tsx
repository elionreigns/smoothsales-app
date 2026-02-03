import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans scroll-smooth min-w-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
