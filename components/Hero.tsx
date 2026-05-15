"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { formatPrice } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { AccompanimentPicker } from "./AccompanimentPicker";

export function Hero({ specials }: { specials: any[] }) {
  const todaySpecial = specials?.[0];

  return (
    <section id="top" className="bg-cream-100 dark:bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left — text */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-700/10 dark:bg-brand-700/20 text-brand-700 dark:text-brand-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            Ouvert 7J/7
          </span>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem] text-stone-900 dark:text-stone-100 leading-[1.08]">
            La carte qui{" "}
            <em className="not-italic text-brand-700 dark:text-brand-400">fait du bien à tous</em>
          </h1>

          <p className="mt-5 text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed max-w-xl">
            {SITE_CONFIG.tagline}. Composez votre commande en ligne et récupérez-la
            facilement au {SITE_CONFIG.location}.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#menu-overview"
              className="inline-flex items-center gap-2 rounded-full bg-brand-700 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white font-semibold px-6 py-3 text-sm transition shadow-sm"
            >
              Voir le menu
              <ArrowRightIcon />
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-700 dark:border-brand-500 text-brand-700 dark:text-brand-400 hover:bg-brand-700 dark:hover:bg-brand-700 hover:text-white dark:hover:text-white font-semibold px-6 py-3 text-sm transition"
            >
              Commander sur WhatsApp
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
            <ClockIcon />
            Ouvert tous les jours de 7h00 à 22h00 · Service continu
          </p>
        </div>

        {/* Right — menu du jour card */}
        <div>
          {todaySpecial ? (
            <div className="rounded-3xl bg-brand-700 dark:bg-brand-800 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-brand-900/20">
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              <p className="relative text-brand-200 text-[11px] uppercase tracking-widest font-semibold">
                Suggestion du jour
              </p>
              <h2 className="relative mt-2 font-display text-2xl sm:text-3xl leading-snug">
                {todaySpecial.name}
              </h2>
              <p className="relative mt-3 text-brand-200 text-sm leading-relaxed">
                {todaySpecial.description || "Préparé chaque jour avec des ingrédients frais sélectionnés avec soin par notre équipe."}
              </p>

              {/* Prix + bouton Ajouter au panier */}
              <div className="relative mt-4 flex items-center gap-3 flex-wrap">
                <span className="inline-block bg-white/20 backdrop-blur rounded-full px-5 py-2 font-display text-2xl tracking-tight">
                  {formatPrice(todaySpecial.price)}
                </span>
                <AddToCartButton 
                  item={todaySpecial} 
                  label="Ajouter au panier" 
                />
              </div>

              <a
                href="#specialites"
                className="relative mt-8 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm rounded-full px-5 py-2.5 transition"
              >
                Voir toutes les spécialités
                <ArrowRightIcon />
              </a>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-200/50 dark:bg-brand-900/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800" 
                alt="Delicious Food" 
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3] w-full"
              />
            </div>
          )}

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { value: "80+",      label: "Plats à la carte" },
              { value: "7j/7",     label: "Service continu"  },
              { value: "WhatsApp", label: "Commande facile"  },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white dark:bg-stone-800 border border-brand-100 dark:border-stone-700 p-3 text-center shadow-sm"
              >
                <p className="font-display text-lg text-brand-700 dark:text-brand-400">{s.value}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* Bouton intelligent : ajoute direct ou ouvre le picker si accompagnement requis */
function AddToCartButton({
  item,
  label,
}: {
  item: any;
  label: string;
}) {
  const { add, lines } = useCart();
  const [pickerOpen, setPickerOpen] = useState(false);

  const needsPicker = item?.accompaniments?.length > 0;

  const inCart = lines.find(
    (l) => l.itemId === item.id
  );

  function handleClick() {
    if (needsPicker) {
      setPickerOpen(true);
    } else {
      add(item.id);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold text-sm px-4 py-2 transition ${
          inCart
            ? "bg-white/30 text-white"
            : "bg-white text-brand-700 hover:bg-brand-50"
        }`}
      >
        {inCart ? `${inCart.qty} dans le panier ✓` : `+ ${label}`}
      </button>

      {pickerOpen && (
        <AccompanimentPicker 
          item={{
            id: item.id,
            name: item.name,
            description: item.description || "",
            price: item.price,
            accompaniments: item.accompaniments
          }} 
          onClose={() => setPickerOpen(false)} 
        />
      )}
    </>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
