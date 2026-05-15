import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Enforce profile selection for cashiers
  if (session.user.role === "CASHIER" && !session.user.profile) {
    redirect("/select-profile");
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-display text-brand-700 dark:text-brand-400">
            Admin {SITE_CONFIG.name}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {session.user.profile ? `Caissier: ${session.user.profile.name}` : `Connecté: ${session.user.name}`}
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link
            href="/admin"
            className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard size={20} />
              <span className="font-medium">Tableau de bord</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="/admin/orders"
            className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} />
              <span className="font-medium">Commandes</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          {session.user.role === "SUPERADMIN" && (
            <>
              <Link
                href="/admin/inventory"
                className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Package size={20} />
                  <span className="font-medium">Stocks & Produits</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/admin/users"
                className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Users size={20} />
                  <span className="font-medium">Utilisateurs</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/admin/reports"
                className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} />
                  <span className="font-medium">Bilans</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-stone-200 dark:border-stone-800">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
