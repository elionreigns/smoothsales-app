import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmoothSales | Coral Crown Solutions",
  description: "Service outreach: Botox Oahu, Tech, Prayer Authority, Time for Fun Hawaii & USA",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
