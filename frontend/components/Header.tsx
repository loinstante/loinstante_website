"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);
  const navLinkClass = (href: string) =>
    isActive(href)
      ? "text-primary font-semibold"
      : "hover:text-primary transition";

  return (
    <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/globe.svg"
          alt="loinstante logo"
          width={40}
          height={40}
        />
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          loinstante
        </Link>
      </div>

      <nav className="hidden md:flex gap-8 text-black font-medium">
        <Link href="/product" className={navLinkClass("/product")}>
          Produits
        </Link>
        <Link href="/tarif" className={navLinkClass("/tarif")}>
          Tarifs
        </Link>
        <Link href="/support" className={navLinkClass("/support")}>
          Support
        </Link>
      </nav>

      <a
        href="#"
        className="px-5 py-2 rounded-full font-semibold transition bg-secondary text-black hover:opacity-90"
      >
        Se connecter
      </a>
    </header>
  );
}
