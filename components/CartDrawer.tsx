"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/menu";
import { buildWhatsAppOrderUrl, type OrderMode } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/config";
import { FeexPayButton } from '@feexpay/react-sdk';

export function CartDrawer() {
  const {
    isOpen, closeCart,
    lines, detailedLines,
    totalAmount, totalQty,
    setQty, remove, clear, add,
  } = useCart();

  const [mode, setMode]         = useState<OrderMode>("cafeteria");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const whatsappUrl =
    detailedLines.length > 0
      ? buildWhatsAppOrderUrl(detailedLines, totalAmount, {
          mode,
          location,
        })
      : "#";

  const suggestedDrinks: never[] = [];

  return (
    <>
      {/* Fond */}
      <div
        onClick={closeCart}
        className={
          "fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm transition-opacity " +
          (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        aria-hidden
      />

      {/* Panneau */}
      <aside
        role="dialog"
        aria-label="Panier"
        aria-modal="true"
        className={
          "fixed z-50 right-0 top-0 h-full w-full sm:w-[440px] bg-white dark:bg-stone-900 shadow-2xl flex flex-col transition-transform duration-300 " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        {/* En-tête */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="font-display text-xl text-stone-900 dark:text-stone-100">Mon panier</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {totalQty} article{totalQty > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition"
            aria-label="Fermer"
          >
            <XIcon />
          </button>
        </header>

        {/* Corps scrollable */}
        <div className="flex-1 overflow-y-auto">
          {detailedLines.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Articles */}
              <ul className="divide-y divide-stone-100 dark:divide-stone-800 px-5">
                {detailedLines.map(({ itemId, itemName, itemEmoji, accompId, accompLabel, qty, unitPrice, subtotal }) => (
                  <li key={`${itemId}:${accompId ?? "none"}`} className="py-3 flex gap-3">
                    <div className="text-2xl shrink-0" aria-hidden>{itemEmoji ?? "🍽️"}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 dark:text-stone-100 text-sm leading-snug">
                        {itemName}
                        {accompLabel && (
                          <span className="text-brand-600 dark:text-brand-400"> + {accompLabel}</span>
                        )}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{formatPrice(unitPrice)} / unité</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-full border border-brand-200 dark:border-stone-700 bg-brand-50 dark:bg-stone-800 overflow-hidden">
                          <button
                            onClick={() => setQty(itemId, qty - 1, accompId)}
                            className="px-3 py-1 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-stone-700 transition"
                            aria-label="Diminuer"
                          >−</button>
                          <span className="px-2 min-w-8 text-center text-sm font-semibold text-brand-900 dark:text-stone-100">
                            {qty}
                          </span>
                          <button
                            onClick={() => setQty(itemId, qty + 1, accompId)}
                            className="px-3 py-1 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-stone-700 transition"
                            aria-label="Augmenter"
                          >+</button>
                        </div>
                        <p className="font-semibold text-brand-700 dark:text-brand-400 text-sm">
                          {formatPrice(subtotal)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(itemId, accompId)}
                      className="self-start text-stone-400 hover:text-red-600 p-1 transition"
                      aria-label={`Retirer ${itemName}`}
                    >
                      <TrashIcon />
                    </button>
                  </li>
                ))}
              </ul>


            </>
          )}
        </div>

        {/* Pied de page */}
        {detailedLines.length > 0 && (
          <footer className="border-t border-stone-100 dark:border-stone-800 p-5 space-y-4 bg-white dark:bg-stone-900">

            {/* Mode de récupération */}
            <div>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wide">
                Mode de récupération
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode("cafeteria")}
                  className={`rounded-xl py-2.5 text-sm font-medium transition border ${
                    mode === "cafeteria"
                      ? "bg-brand-700 text-white border-brand-700"
                      : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-brand-400"
                  }`}
                >
                  🍽️ À la cafétéria
                </button>
                <button
                  onClick={() => setMode("livraison")}
                  className={`rounded-xl py-2.5 text-sm font-medium transition border ${
                    mode === "livraison"
                      ? "bg-brand-700 text-white border-brand-700"
                      : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-brand-400"
                  }`}
                >
                  🚚 Livraison hôpital
                </button>
              </div>

              {mode === "livraison" && (
                <div className="mt-2 space-y-1.5">
                  <input
                    type="text"
                    placeholder="Ex : Pédiatrie, Salle 12, Lit 03"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-3 py-2.5 text-sm placeholder:text-stone-400 focus:outline-none focus:border-brand-600 transition"
                    autoFocus
                  />
                  {!location.trim() && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      ⚠️ Précisez le service, la salle et le numéro de lit
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-600 dark:text-stone-400">Total</span>
              <span className="font-display text-2xl text-brand-700 dark:text-brand-400">
                {formatPrice(totalAmount)}
              </span>
            </div>

            {/* Bouton FeexPay */}
            <FeexPayButton
              amount={totalAmount}
              description={`Commande ${SITE_CONFIG.name}`}
              token={SITE_CONFIG.feexpay.token}
              id={SITE_CONFIG.feexpay.id}
              customId={Date.now().toString()}
              callback_info={{
                mode,
                location: mode === "livraison" ? location : "Sur place",
                items: detailedLines.map(l => `${l.qty}x ${l.itemName}${l.accompLabel ? ` (${l.accompLabel})` : ""}`).join(", ")
              }}
              mode={SITE_CONFIG.feexpay.mode}
              currency="XOF"
              callback={async (response: any) => {
                console.log("FeexPay Response:", response);
                if (response.status === "SUCCESS") {
                  try {
                    // Enregistrer la commande en base de données
                    const res = await fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        totalAmount,
                        customerName: "Client",
                        customerPhone: response.phone || "",
                        deliveryMode: mode,
                        location: mode === "livraison" ? location : "Sur place",
                        paymentRef: response.transaction_id,
                        items: detailedLines.map(l => ({
                          productId: l.itemId,
                          quantity: l.qty,
                          price: l.unitPrice,
                          accompLabel: l.accompLabel,
                          accompPrice: l.accompId ? l.unitPrice : undefined
                        }))
                      })
                    });

                    if (res.ok) {
                      clear();
                      closeCart();
                      alert("Paiement réussi ! Votre commande est en cours de préparation.");
                    } else {
                      alert("Paiement réussi, mais erreur lors de l'enregistrement de la commande. Veuillez contacter le support.");
                    }
                  } catch (err) {
                    console.error("Error saving order:", err);
                    alert("Erreur lors de la validation de la commande.");
                  }
                }
              }}
              buttonText="Payer en ligne"
               buttonClass={`w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold text-white transition shadow-sm bg-brand-700 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed`}
               // @ts-ignore - Check if SDK button supports disabled
               disabled={detailedLines.length === 0 || (mode === "livraison" && !location.trim())}
             />

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-stone-200 dark:border-stone-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-stone-900 px-2 text-stone-500">Ou commander via</span>
              </div>
            </div>

            {/* Bouton WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={detailedLines.length === 0 || (mode === "livraison" && !location.trim())}
              onClick={(e) => {
                if (detailedLines.length === 0 || (mode === "livraison" && !location.trim()))
                  e.preventDefault();
              }}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold text-white transition shadow-sm ${
                mode === "livraison" && !location.trim()
                  ? "bg-stone-300 dark:bg-stone-700 cursor-not-allowed"
                  : "bg-[#25D366] hover:bg-[#1ebd5a] active:bg-[#15a04b]"
              }`}
            >
              <WhatsAppIcon />
              Valider la commande sur WhatsApp
            </a>

            <p className="text-[11px] text-center text-stone-500 leading-relaxed">
              Vous serez redirigé vers WhatsApp ({SITE_CONFIG.whatsappDisplay}).
              Le paiement et le retrait se font sur place.
            </p>

            <button
              onClick={clear}
              className="w-full text-xs text-stone-500 hover:text-red-600 underline-offset-2 hover:underline transition"
            >
              Vider le panier
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-5xl mb-3">🛒</div>
      <p className="font-display text-lg text-stone-700 dark:text-stone-300">Votre panier est vide</p>
      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
        Parcourez la carte et ajoutez vos plats favoris.
      </p>
    </div>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6"  y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}
