import { type Category } from "@/lib/menu";

const CATEGORY_STYLE: Record<string, { bg: string; border: string }> = {
  "gouter":                 { bg: "bg-amber-50  dark:bg-amber-900/10",   border: "border-amber-200  dark:border-amber-800/30"  },
  "sandwichs":              { bg: "bg-orange-50 dark:bg-orange-900/10",  border: "border-orange-200 dark:border-orange-800/30" },
  "pates-riz":              { bg: "bg-yellow-50 dark:bg-yellow-900/10",  border: "border-yellow-200 dark:border-yellow-800/30" },
  "traditionnels":          { bg: "bg-brand-50  dark:bg-brand-900/10",   border: "border-brand-200  dark:border-brand-800/30"  },
  "entrees":                { bg: "bg-emerald-50 dark:bg-emerald-900/10",border: "border-emerald-200 dark:border-emerald-800/30"},
  "festifs":                { bg: "bg-purple-50 dark:bg-purple-900/10",  border: "border-purple-200 dark:border-purple-800/30" },
  "boissons-maison":        { bg: "bg-sky-50    dark:bg-sky-900/10",     border: "border-sky-200    dark:border-sky-800/30"    },
  "boissons-industrielles": { bg: "bg-stone-50  dark:bg-stone-800/30",   border: "border-stone-200  dark:border-stone-700"     },
};

export function CategoryOverview({ categories }: { categories: Category[] }) {
  return (
    <section id="menu-overview" className="py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Notre Menu
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
            Des choix pour tous les goûts
          </h2>
          <div className="mt-3 mx-auto h-0.5 w-12 bg-brand-600 rounded-full" />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const style = CATEGORY_STYLE[cat.id] ?? {
              bg: "bg-stone-50 dark:bg-stone-800/30",
              border: "border-stone-200 dark:border-stone-700",
            };
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`group flex flex-col items-center text-center rounded-2xl border p-4 transition-all hover:shadow-card hover:-translate-y-1 ${style.bg} ${style.border}`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200" aria-hidden>
                  {cat.emoji}
                </span>
                <p className="mt-2 font-semibold text-stone-800 dark:text-stone-100 text-xs leading-snug">
                  {cat.name}
                </p>
                <p className="mt-1 text-[10px] text-stone-400 dark:text-stone-500">
                  {cat.items.length} plats
                </p>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#gouter"
            className="inline-flex items-center gap-2 text-brand-700 dark:text-brand-400 font-semibold text-sm hover:text-brand-800 dark:hover:text-brand-300 transition"
          >
            Voir tout le menu
            <ArrowRightIcon />
          </a>
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
