import type { Metadata } from "next";
import { Outfit, Montserrat, Inter } from "next/font/google";
import PalmTrees from "@/components/PalmTrees";
import SecretLocationBadge from "@/components/SecretLocationBadge";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xperience | L'Événement Caribéen Exclusif",
  description:
    "Xperience — L'événement caribéen le plus exclusif et électrique de l'année par KEZ Events. 30 MAI. Lieu Secret. Événement Privé.",
  openGraph: {
    title: "Xperience | L'Événement Caribéen Exclusif",
    description: "30 MAI. Lieu Secret. Une soirée que vous n'oublierez jamais.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable} ${outfit.variable}`}>
      <body className="antialiased overflow-x-hidden min-h-screen relative text-xp-alabaster selection:bg-xp-red selection:text-xp-alabaster">
        
        {/* VIEWPORT LOCKED UNIFIED GRADIENT BACKGROUND — animated hue shift */}
        <div className="fixed inset-0 z-0 animated-gradient" style={{ background: 'linear-gradient(160deg, #FF8500 0%, #FF4500 40%, #CC0000 100%)' }} />

        {/* TROPICAL BOTANICAL SVG PATTERN — slow drift animation */}
        <div className="fixed inset-0 tropical-bg pointer-events-none z-0" style={{ opacity: 0.55 }} />

        {/* VIEWPORT LOCKED PERSISTENT HALFTONE GRID — breathing opacity */}
        <div className="fixed inset-0 halftone-overlay animated-halftone pointer-events-none z-0" />

        {/* Physics-like interactive Palm Tree silhouettes sways & spring reactions */}
        <PalmTrees />

        {/* Interactive floating coupon badge in margins */}
        <SecretLocationBadge />

        {/* Comic panels layout container */}
        <div className="relative z-20">
          {children}
        </div>
        
      </body>
    </html>
  );
}
