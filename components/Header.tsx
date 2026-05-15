"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { useCart } from "@/lib/cart";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#top",          label: "Accueil" },
  { href: "#menu-overview", label: "Menu" },
  { href: "#specialites",  label: "Spécialités" },
  { href: "#engagement",   label: "À propos" },
  { href: "#footer",       label: "Contact" },
];

export function Header() {
  const { totalQty, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-brand-700 shadow-sm flex-shrink-0">
            <Image
              src="/logo.png"
              alt={`${SITE_CONFIG.name} Logo`}
              fill
              className="object-contain p-1.5 invert"
            />
          </div>
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-brand-800 dark:text-brand-300 tracking-tight">
              {SITE_CONFIG.name}
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              CHU Mère &amp; Enfant · Cotonou
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-brand-700 dark:hover:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 transition font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-brand-700 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white px-4 py-2 text-sm font-semibold transition shadow-sm"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBagIcon />
            <span className="hidden sm:inline">Commander en ligne</span>
            {totalQty > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-white text-brand-700 text-xs font-bold">
                {totalQty}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <XIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:text-brand-700 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}
