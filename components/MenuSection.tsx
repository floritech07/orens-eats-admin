import { type Category } from "@/lib/menu";
import { MenuCard } from "./MenuCard";

export function MenuSection({ category }: { category: Category }) {
  return (
    <section id={category.id} className="scroll-mt-24 py-8 sm:py-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="font-display text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 flex items-center gap-3">
          <span
            aria-hidden
            className="text-3xl h-12 w-12 flex items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30"
          >
            {category.emoji}
          </span>
          {category.name}
        </h2>
        <span className="shrink-0 text-xs text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 rounded-full px-3 py-1">
          {category.items.length} plat{category.items.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.items.map((it) => (
          <MenuCard key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
}
