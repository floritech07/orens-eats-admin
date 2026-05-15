const VALUES = [
  {
    icon: "🛡️",
    title: "Hygiène & Sécurité",
    desc: "Respect strict des normes d'hygiène alimentaire en milieu hospitalier. Sécurité garantie à chaque repas.",
  },
  {
    icon: "🌿",
    title: "Qualité & Fraîcheur",
    desc: "Ingrédients frais sélectionnés chaque jour pour une cuisine maison authentique et nutritive.",
  },
  {
    icon: "🤝",
    title: "Au service de tous",
    desc: "Patients, visiteurs et personnel hospitalier sont les bienvenus à toute heure, 7 jours sur 7.",
  },
];

export function EngagementSection() {
  return (
    <section id="engagement" className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Notre Engagement
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-snug">
              Votre santé,<br />notre priorité
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">
              Nous respectons les normes d&apos;hygiène alimentaire les plus strictes pour
              vous offrir des repas sûrs, sains et savoureux. Chaque plat est préparé
              quotidiennement avec des ingrédients frais, sélectionnés avec soin pour
              allier goût et nutrition.
            </p>
            <a
              href="#gouter"
              className="mt-6 inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 text-white font-semibold text-sm rounded-full px-5 py-2.5 transition shadow-sm"
            >
              Découvrir la carte
              <ArrowRightIcon />
            </a>
          </div>

          {/* Right — value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-800 p-5 text-center shadow-sm hover:shadow-card transition"
              >
                <div className="text-3xl mb-3" aria-hidden>{v.icon}</div>
                <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm">{v.title}</p>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Espace détente banner */}
        <div className="mt-10 rounded-3xl bg-brand-700 dark:bg-brand-800 text-white p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-brand-200 text-[11px] uppercase tracking-widest font-semibold">
                Espace Détente
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl leading-snug">
                Un endroit calme<br />pour vos pauses
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-brand-100">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300 shrink-0" />
                Wi-Fi gratuit pour patients et visiteurs
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300 shrink-0" />
                Ambiance agréable et reposante
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300 shrink-0" />
                Espace agréable · Confort assuré
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
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
