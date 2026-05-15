"use client";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/menu";

export function FloatingCheckout() {
  const { totalQty, totalAmount, openCart } = useCart();
  if (totalQty === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-30 fade-up">
      <button
        onClick={openCart}
        className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 rounded-full bg-brand-700 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white px-5 py-3 shadow-2xl shadow-brand-900/25 dark:shadow-none transition"
      >
        <span className="inline-flex items-center gap-2 font-semibold text-sm">
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded-full bg-white text-brand-700 text-xs font-bold">
            {totalQty}
          </span>
          Voir le panier
        </span>
        <span className="font-display text-lg">{formatPrice(totalAmount)}</span>
      </button>
    </div>
  );
}
