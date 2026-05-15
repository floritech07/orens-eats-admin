import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";

const QUICK_LINKS = [
  { href: "#menu-overview", label: "Notre Menu" },
  { href: "#specialites",   label: "Spécialités de la semaine" },
  { href: "#engagement",    label: "Notre engagement" },
  { href: `https://wa.me/${SITE_CONFIG.whatsappNumber}`, label: "Commander sur WhatsApp" },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-stone-900 dark:bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full bg-brand-700 overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} Logo`}
                fill
                className="object-contain p-1.5 invert"
              />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white">{SITE_CONFIG.name}</p>
              <p className="text-[11px] text-stone-500">CHU Mère &amp; Enfant</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed">
            Votre cafétéria vous accueille tous les jours avec des repas savoureux,
            préparés dans le respect de votre santé.
          </p>
        </div>

        {/* Nous trouver */}
        <div>
          <p className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">
            Nous trouver
          </p>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-brand-400 mt-0.5 shrink-0">📍</span>
              <span>{SITE_CONFIG.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400 shrink-0">📞</span>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                className="hover:text-white transition"
              >
                {SITE_CONFIG.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400 shrink-0">💬</span>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                WhatsApp Business
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400 shrink-0">✉️</span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-white transition"
              >
                {SITE_CONFIG.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <p className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">
            Horaires
          </p>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between gap-2">
              <span>Lundi — Dimanche</span>
              <span className="text-brand-400 font-semibold">07h — 22h</span>
            </li>
            <li className="text-stone-600">Service continu · Sans interruption</li>
          </ul>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">
            Liens rapides
          </p>
          <ul className="space-y-2 text-xs">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith("https") ? "_blank" : undefined}
                  rel={l.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  className="hover:text-white transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-t border-stone-800">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-stone-600 text-center">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
