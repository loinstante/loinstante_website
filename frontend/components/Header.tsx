"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const isActive = (href: string) => pathname?.startsWith(href);
  const navLinkClass = (href: string) =>
    isActive(href)
      ? "text-secondary font-semibold"
      : "text-black hover:text-primary transition";

  const loginButtonClass = isActive("/login")
    ? "px-5 py-2 rounded-full font-semibold transition bg-primary text-white"
    : "px-5 py-2 rounded-full font-semibold transition bg-secondary text-black hover:opacity-90";

  const handleLogout = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await logout();
    try {
      router.push("/");
      router.refresh();
    } catch {
      window.location.href = "/";
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 grid grid-cols-3 items-center">
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

        <nav className="flex justify-center gap-6 col-start-2">
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

        <div className="flex justify-end">
          {isLoggedIn ? (
            <button onClick={handleLogout} className={loginButtonClass}>
              Se déconnecter
            </button>
          ) : (
            <Link href="/login" className={loginButtonClass}>
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

