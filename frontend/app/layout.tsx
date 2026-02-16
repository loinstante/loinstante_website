import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loinstante",
  description: "Suite logicielle moderne et souveraine",
};

function Header({ pathname }: { pathname: string }) {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/globe.svg" alt="loinstante logo" width={40} height={40} />
        <Link href="/" className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Inter, Geist, sans-serif', color: '#3b82f6' }}>loinstante</Link>
      </div>
      <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
        <Link href="/product" className={pathname.startsWith("/product") ? "text-[#3b82f6] font-semibold" : "hover:text-[#3b82f6]"}>Produits</Link>
        <Link href="#" className="hover:text-[#3b82f6]">Ressources</Link>
        <Link href="#" className="hover:text-[#3b82f6]">Tarifs</Link>
        <Link href="#" className="hover:text-[#3b82f6]">Support</Link>
      </nav>
      <a href="#" className="px-5 py-2 rounded-full font-semibold transition" style={{ background: '#f59e0b', color: '#fff' }}>Se connecter</a>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use a workaround for active nav: get pathname from window if available
  let pathname = "/";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-[#f9fafb]`}>
        <Header pathname={pathname} />
        {children}
      </body>
    </html>
  );
}
