import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ATELIER — Catálogo",
  description: "Catálogo headless de alta gama",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-neutral-100 antialiased font-[family-name:var(--font-sans)] overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
