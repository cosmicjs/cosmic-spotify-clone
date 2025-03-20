import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/lib/PlayerContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone - Built with Cosmic CMS",
  description: "A demo app showing what's possible with Cosmic CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <PlayerProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 ml-64 min-h-screen pb-24">{children}</main>
          </div>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
