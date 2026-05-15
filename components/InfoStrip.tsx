import { SITE_CONFIG } from "@/lib/config";
import { WEEKLY_SPECIALS, formatPrice } from "@/lib/menu";

export function InfoStrip({ specials }: { specials: any[] }) {
  const todaySpecial = specials?.[0];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Horaires */}
          <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-6">
            <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-semibold text-[11px] uppercase tracking-widest">
              <ClockIcon />
              Horaires d&apos;ouverture
            </div>
            <p className="mt-3 font-display text-stone-800 dark:text-stone-100 font-semibold text-sm">
              Nous sommes à votre service
            </p>
            <p className="mt-0.5 font-display text-3xl text-brand-700 dark:text-brand-400">
              7 jours sur 7
            </p>
            <div className="mt-4 flex items-center justify-between bg-brand-50 dark:bg-stone-700 rounded-xl px-4 py-2.5">
              <span className="text-sm text-stone-600 dark:text-stone-300">Lundi — Dimanche</span>
              <span className="text-sm font-bold text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-900/40 rounded-full px-3 py-0.5">
                07h — 22h
              </span>
            </div>
            <p className="mt-3 text-xs text-brand-600 dark:text-brand-400 font-medium text-center">
              Service continu · Sans interruption
            </p>
          </div>

          {/* Menu du jour */}
          <div className="rounded-2xl border border-brand-200 dark:border-brand-800/40 bg-white dark:bg-stone-800 p-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 h-24 w-24 opacity-5 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #265a32 2px, transparent 2px)", backgroundSize: "12px 12px" }}
            />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Menu du Jour
            </p>
            {todaySpecial ? (
              <>
                <h3 className="mt-2 font-display text-xl text-stone-900 dark:text-stone-100 leading-snug">
                  {todaySpecial.name}
                </h3>
                <ul className="mt-2 space-y-1 text-xs text-stone-500 dark:text-stone-400">
                  <li>· Ingrédients frais sélectionnés quotidiennement</li>
                  <li>· Cuisine maison préparée sur place</li>
                  {todaySpecial.accompaniments?.length > 0 && (
                    <li>· Accompagnement au choix</li>
                  )}
                </ul>
                <div className="mt-4 inline-flex items-center gap-2">
                  <span className="bg-brand-700 text-white rounded-full px-4 py-1.5 font-display text-xl">
                    {formatPrice(todaySpecial.price)}
                  </span>
                </div>
              </>
            ) : (
              <>
                <h3 className="mt-2 font-display text-xl text-stone-900 dark:text-stone-100 leading-snug">
                  Nos spécialités fraîches
                </h3>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Découvrez nos plats préparés avec passion chaque jour. Consultez notre carte complète.
                </p>
                <div className="mt-4 inline-flex items-center gap-2">
                  <span className="bg-brand-700 text-white rounded-full px-4 py-1.5 font-display text-lg">
                    À partir de 300 FCFA
                  </span>
                </div>
              </>
            )}
            <a
              href="#specialites"
              className="mt-4 block text-xs text-brand-700 dark:text-brand-400 hover:underline font-medium"
            >
              → Voir toutes les spécialités
            </a>
          </div>

          {/* Commander facilement */}
          <div className="rounded-2xl bg-brand-700 dark:bg-brand-800 p-6 text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "16px 16px" }}
            />
            <div className="relative flex items-center gap-2 text-brand-200 font-semibold text-[11px] uppercase tracking-widest">
              <PhoneIcon />
              Commandez Facilement
            </div>
            <p className="relative mt-3 font-display text-xl leading-snug">
              Sur place, à emporter ou en ligne
            </p>
            <ul className="relative mt-3 space-y-1.5 text-sm text-brand-100">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand-300 shrink-0" />
                Retrait au Hall du CHU-MEL
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand-300 shrink-0" />
                Livraison interne (services hospitaliers)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand-300 shrink-0" />
                Commande WhatsApp disponible
              </li>
            </ul>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-5 block w-full text-center bg-white text-brand-700 font-semibold text-sm rounded-full px-4 py-2.5 hover:bg-brand-50 transition"
            >
              Commander maintenant
            </a>
            <p className="relative mt-2 text-[11px] text-brand-200 text-center">
              Paiement sécurisé · Espèces ou Mobile Money
            </p>
          </div>

        </div>
      </div>
    </section>
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

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.6 2.69H6.6a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.572 2.81.7A2 2 0 0 1 21.68 17Z" />
    </svg>
  );
}
