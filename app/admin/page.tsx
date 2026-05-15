import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { 
  Clock, 
  ShoppingBag, 
  Banknote, 
  ArrowUpRight,
  TrendingUp,
  History
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Statistiques rapides
  const pendingOrdersCount = await prisma.order.count({
    where: { status: "PENDING" }
  });

  const todayOrdersCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    }
  });

  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalAmount: true
    },
    where: {
      paymentStatus: "SUCCESS"
    }
  });

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      items: true
    }
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display text-stone-900 dark:text-white">Tableau de bord</h2>
          <p className="text-stone-500 mt-1">Bienvenue, {session?.user.name}. Voici un aperçu de l'activité.</p>
        </div>
        <div className="bg-brand-50 dark:bg-brand-900/20 px-4 py-2 rounded-xl border border-brand-100 dark:border-brand-800 flex items-center gap-2 text-brand-700 dark:text-brand-400 text-sm font-medium">
          <TrendingUp size={16} />
          Activité en hausse
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:border-amber-200 dark:hover:border-amber-900/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-600">
              <Clock size={24} />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">À traiter</span>
          </div>
          <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Commandes en attente</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-4xl font-display text-stone-900 dark:text-white">{pendingOrdersCount}</p>
            <ArrowUpRight size={16} className="text-stone-400" />
          </div>
        </div>

        <div className="group bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:border-brand-200 dark:hover:border-brand-900/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-2xl text-brand-700 dark:text-brand-400">
              <ShoppingBag size={24} />
            </div>
            <span className="text-xs font-bold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-1 rounded-lg">Aujourd'hui</span>
          </div>
          <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Commandes du jour</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-4xl font-display text-stone-900 dark:text-white">{todayOrdersCount}</p>
            <ArrowUpRight size={16} className="text-stone-400" />
          </div>
        </div>

        <div className="group bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:border-green-200 dark:hover:border-green-900/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl text-green-600">
              <Banknote size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">Total encaissé</span>
          </div>
          <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Chiffre d'affaires</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-4xl font-display text-stone-900 dark:text-white">
              {(totalRevenue._sum.totalAmount || 0).toLocaleString()} <span className="text-xl">FCFA</span>
            </p>
          </div>
        </div>
      </div>

      {/* Liste des dernières commandes */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History size={20} className="text-stone-400" />
            <h3 className="font-bold text-stone-900 dark:text-white">Commandes récentes</h3>
          </div>
          <button className="text-sm font-semibold text-brand-700 dark:text-brand-400 hover:underline">
            Voir tout
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/50 dark:bg-stone-800/30">
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">ID</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Montant</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-stone-500 italic">
                    Aucune commande enregistrée.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition-colors">
                    <td className="px-8 py-4 text-sm font-mono text-stone-400">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-4 text-sm font-medium text-stone-900 dark:text-white">{order.customerName || "Anonyme"}</td>
                    <td className="px-8 py-4 text-sm font-bold text-stone-900 dark:text-white">{order.totalAmount.toLocaleString()} FCFA</td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
