const FEATURES = [
  { icon: "🌿", title: "Produits frais et de qualité",      desc: "Ingrédients du marché chaque matin" },
  { icon: "❤️",  title: "Repas équilibrés et variés",       desc: "Nutritifs, variés, savoureux" },
  { icon: "🛡️", title: "Hygiène garantie et contrôlée",    desc: "Normes sanitaires strictes" },
  { icon: "⚡",  title: "Service rapide et efficace",        desc: "Sans attente, à toute heure" },
  { icon: "🤝", title: "Accueil chaleureux et attentionné", desc: "Toujours à votre écoute" },
];

export function FeaturesStrip() {
  return (
    <section className="bg-white dark:bg-stone-900 border-y border-stone-100 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl" aria-hidden>{f.icon}</span>
              <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm leading-snug">{f.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
