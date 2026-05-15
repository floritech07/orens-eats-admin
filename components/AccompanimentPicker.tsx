"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/menu";
import { useCart } from "@/lib/cart";

interface Accompaniment {
  id: string;
  label: string;
  price: number;
}

interface ItemData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  emoji?: string | null;
  accompaniments?: Accompaniment[];
}

type Props = {
  item: ItemData;
  onClose: () => void;
};

export function AccompanimentPicker({ item, onClose }: Props) {
  const { add } = useCart();
  const [selected, setSelected] = useState<string>(
    item.accompaniments?.[0]?.id ?? ""
  );

  function handleAdd() {
    const acc = item.accompaniments?.find((a) => a.id === selected);
    if (!acc) return;
    add({
      itemId: item.id,
      itemName: item.name,
      itemEmoji: item.emoji ?? undefined,
      itemPrice: item.price,
      accompId: acc.id,
      accompLabel: acc.label,
      accompPrice: acc.price,
    });
    onClose();
  }

  if (!item.accompaniments?.length) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Choisir un accompagnement pour ${item.name}`}
        className="fixed bottom-0 left-0 right-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-full sm:max-w-sm bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-4xl shrink-0" aria-hidden>{item.emoji ?? "🍽️"}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">{item.name}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Choisissez votre accompagnement</p>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          {item.accompaniments.map((a) => (
            <label
              key={a.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition ${
                selected === a.id
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:border-brand-500"
                  : "border-stone-200 dark:border-stone-700 hover:border-brand-300 dark:hover:border-brand-600"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="radio"
                  name="accompagnement"
                  value={a.id}
                  checked={selected === a.id}
                  onChange={() => setSelected(a.id)}
                  className="accent-brand-600 shrink-0"
                />
                <span className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug">
                  {a.label}
                </span>
              </div>
              <span className="font-display text-base text-brand-700 dark:text-brand-400 ml-3 shrink-0">
                {formatPrice(a.price)}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={!selected}
          className="w-full rounded-full bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-semibold py-3 text-sm transition shadow-sm"
        >
          Ajouter au panier
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 py-2 transition"
        >
          Annuler
        </button>
      </div>
    </>
  );
}
