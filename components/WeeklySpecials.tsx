"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { AccompanimentPicker } from "./AccompanimentPicker";
import { Star } from "lucide-react";

interface SpecialProduct {
  id: string;
  name: string;
  price: number;
  description: string | null;
  emoji: string | null;
  accompaniments: { id: string; label: string; price: number }[];
}

export function WeeklySpecials({ specials }: { specials: SpecialProduct[] }) {
  if (specials.length === 0) return null;

  return (
    <section id="specialites" className="scroll-mt-24 py-10">
      <div className="rounded-3xl bg-brand-700 dark:bg-brand-800 text-white p-5 sm:p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-amber-400 fill-amber-400" size={24} />
            <h2 className="font-display text-2xl sm:text-3xl">Menu du Jour</h2>
          </div>
          <p className="text-brand-200 text-sm mb-6">
            Découvrez nos suggestions spéciales aujourd'hui, préparées avec passion.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specials.map((product) => (
              <SpecialCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialCard({ product }: { product: SpecialProduct }) {
  const { add, lines } = useCart();
  const [pickerOpen, setPickerOpen] = useState(false);

  const inCart = lines.find((l) => l.itemId === product.id);

  function handleAdd() {
    if (product.accompaniments.length > 0) {
      setPickerOpen(true);
    } else {
      add({ itemId: product.id, itemName: product.name, itemEmoji: product.emoji ?? undefined, itemPrice: product.price });
    }
  }

  return (
    <div className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-white transition-all border border-white/10 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{product.emoji || "🍲"}</span>
          <span className="inline-flex items-center rounded-full bg-amber-400/20 text-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide border border-amber-400/30">
            Spécial
          </span>
        </div>
        <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-brand-100/70 text-xs line-clamp-2 mb-4 italic">{product.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <p className="font-display text-xl font-bold">{formatPrice(product.price)}</p>
        <button
          onClick={handleAdd}
          className={`shrink-0 text-sm font-bold rounded-xl px-4 py-2 transition shadow-lg ${
            inCart
              ? "bg-white/30 text-white cursor-default"
              : "bg-white text-brand-700 hover:bg-amber-400 hover:text-brand-900 active:scale-95"
          }`}
        >
          {inCart ? `${inCart.qty} ✓` : "Commander"}
        </button>
      </div>

      {pickerOpen && (
        <AccompanimentPicker item={product} onClose={() => setPickerOpen(false)} />
      )}
    </div>
  );
}
