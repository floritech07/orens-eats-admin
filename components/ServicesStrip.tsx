const SERVICES = [
  { icon: "🪑", title: "Service sur place",    desc: "Salle disponible sur place" },
  { icon: "🛍️", title: "À emporter",          desc: "Rapide et pratique" },
  { icon: "🚚", title: "Livraison interne",    desc: "Pour patients & services" },
  { icon: "💳", title: "Paiement sécurisé",   desc: "Espèces ou Mobile Money" },
  { icon: "📱", title: "Équipe à l'écoute",   desc: "Toujours disponible" },
];

export function ServicesStrip() {
  return (
    <section className="border-y border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex items-center gap-3">
              <div className="shrink-0 h-11 w-11 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xl">
                {s.icon}
              </div>
              <div>
                <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm leading-tight">
                  {s.title}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
