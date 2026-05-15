"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { AccompanimentPicker } from "./AccompanimentPicker";

interface Accompaniment {
  id: string;
  label: string;
  price: number;
}

interface MenuItemData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  emoji?: string | null;
  badges?: string[];
  accompaniments?: Accompaniment[];
}

export function MenuCard({ item }: { item: MenuItemData }) {
  const { add, lines, setQty } = useCart();
  const [pickerOpen, setPickerOpen] = useState(false);

  const hasAccomp = !!item.accompaniments?.length;

  const simpleLine = !hasAccomp
    ? lines.find((l) => l.itemId === item.id && !l.accompId)
    : null;

  const accompQtyTotal = hasAccomp
    ? lines.filter((l) => l.itemId === item.id).reduce((s, l) => s + l.qty, 0)
    : 0;

  const priceLabel = hasAccomp
    ? (() => {
        const prices = item.accompaniments!.map((a) => a.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max ? formatPrice(min) : `${formatPrice(min)} — ${formatPrice(max)}`;
      })()
    : formatPrice(item.price);

  return (
    <>
      <article className="fade-up flex flex-col rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 p-4 shadow-sm hover:shadow-card hover:-translate-y-0.5 transition dark:shadow-none">
        <div className="flex items-start gap-3">
          <div
            className="text-3xl shrink-0 h-12 w-12 flex items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100/60 dark:border-brand-800/20"
            aria-hidden
          >
            {item.emoji ?? "🍽️"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 leading-snug text-sm">
              {item.name}
            </h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
              {item.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.badges?.includes("nouveau") && (
                <span className="inline-flex items-center rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  Nouveau
                </span>
              )}
              {item.badges?.includes("signature") && (
                <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border border-amber-200/60 dark:border-amber-800/30">
                  ★ Signature
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <p className="font-display text-lg text-brand-700 dark:text-brand-400 font-semibold leading-none">
              {priceLabel}
            </p>
            {hasAccomp && (
              <p className="text-[10px] text-stone-400 mt-0.5">selon accompagnement</p>
            )}
          </div>

          {!hasAccomp && simpleLine ? (
            <div className="inline-flex items-center rounded-full border border-brand-200 dark:border-stone-700 bg-brand-50 dark:bg-stone-800 overflow-hidden">
              <button
                onClick={() => setQty(item.id, simpleLine.qty - 1)}
                className="px-3 py-1.5 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-stone-700 text-sm font-bold transition"
                aria-label="Diminuer"
              >−</button>
              <span className="px-2 min-w-8 text-center font-semibold text-brand-900 dark:text-stone-100 text-sm">
                {simpleLine.qty}
              </span>
              <button
                onClick={() => setQty(item.id, simpleLine.qty + 1)}
                className="px-3 py-1.5 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-stone-700 text-sm font-bold transition"
                aria-label="Augmenter"
              >+</button>
            </div>
          ) : !hasAccomp ? (
            <button
              onClick={() => add({ itemId: item.id, itemName: item.name, itemEmoji: item.emoji ?? undefined, itemPrice: item.price })}
              className="inline-flex items-center gap-1 rounded-full bg-brand-700 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white text-xs font-semibold px-4 py-1.5 transition shadow-sm"
            >
              + Ajouter
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {accompQtyTotal > 0 && (
                <span className="text-[10px] text-brand-700 dark:text-brand-400 font-semibold">
                  {accompQtyTotal} en panier
                </span>
              )}
              <button
                onClick={() => setPickerOpen(true)}
                className="inline-flex items-center gap-1 rounded-full bg-brand-700 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white text-xs font-semibold px-4 py-1.5 transition shadow-sm"
              >
                Choisir →
              </button>
            </div>
          )}
        </div>
      </article>

      {pickerOpen && (
        <AccompanimentPicker item={item} onClose={() => setPickerOpen(false)} />
      )}
    </>
  );
}
