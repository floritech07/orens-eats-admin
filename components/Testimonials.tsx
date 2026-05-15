const REVIEWS = [
  {
    stars: 5,
    text: "Les repas sont délicieux et toujours frais. Un vrai plus pendant mon séjour au CHU-MEL.",
    author: "Patient",
  },
  {
    stars: 5,
    text: "Service rapide et personnel très accueillant. Je reviens chaque jour ! Merci à toute l'équipe.",
    author: "Visiteur",
  },
  {
    stars: 5,
    text: "Des repas équilibrés qui nous donnent de l'énergie pour nos longues journées de garde. Excellent !",
    author: "Personnel soignant",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-cream-100 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Ils nous font confiance
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
            Ce que nos clients disent
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-brand-600 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.author}
              className="rounded-2xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 p-6 shadow-sm hover:shadow-card transition"
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-amber-400" aria-label={`${r.stars} étoiles sur 5`}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="mt-4 text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-stone-800 dark:text-stone-200 text-sm">
                — {r.author}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
