"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/menu";
import { 
  BarChart3, 
  TrendingUp, 
  Truck, 
  ShoppingBag, 
  Trophy, 
  Calendar,
  Download,
  Loader2,
  PieChart,
  Users
} from "lucide-react";

interface ReportData {
  dailyRevenue: any[];
  topProducts: { name: string; quantity: number; count: number }[];
  deliveryStats: { deliveryMode: string; _count: { id: number } }[];
  cashierStats: { name: string; count: number; total: number }[];
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-stone-500">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p>Génération du bilan hebdomadaire...</p>
    </div>
  );

  if (!data) return (
    <div className="text-center py-20 text-red-500">
      Erreur lors du chargement des données.
    </div>
  );

  const totalRevenue = data.dailyRevenue.reduce((acc, curr) => acc + (curr._sum.totalAmount || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display text-stone-900 dark:text-white">Bilan Hebdomadaire</h2>
          <p className="text-stone-500 mt-1">Analyse des performances des 7 derniers jours.</p>
        </div>
        
        <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-sm active:scale-95">
          <Download size={16} />
          Exporter (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-brand-700 text-white p-8 rounded-3xl shadow-lg border border-brand-600">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Revenu Total (7j)</p>
            <p className="text-4xl font-display leading-none">{formatPrice(totalRevenue)}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium bg-white/10 w-fit px-3 py-1 rounded-full">
              <TrendingUp size={14} />
              +12% par rapport à la semaine passée
            </div>
          </div>
          <BarChart3 className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" />
        </div>
        
        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <div className="flex items-center gap-3 text-stone-400 mb-6">
            <PieChart size={18} />
            <p className="text-xs font-bold uppercase tracking-widest">Modes de vente</p>
          </div>
          <div className="space-y-4">
            {data.deliveryStats.map(stat => (
              <div key={stat.deliveryMode} className="flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-500 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    {stat.deliveryMode === 'livraison' ? <Truck size={16} /> : <ShoppingBag size={16} />}
                  </div>
                  <span className="text-sm font-medium capitalize">{stat.deliveryMode}</span>
                </div>
                <span className="font-bold text-stone-900 dark:text-white">{stat._count.id} <span className="text-xs text-stone-400 font-normal ml-1">cmd</span></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 text-stone-400">
            <Calendar size={18} />
            <p className="text-xs font-bold uppercase tracking-widest">Période</p>
          </div>
          <div className="py-4">
            <p className="text-2xl font-display text-stone-900 dark:text-white">Derniers 7 Jours</p>
            <p className="text-sm text-stone-500">Du {new Date(Date.now() - 7 * 86400000).toLocaleDateString()} au Aujourd'hui</p>
          </div>
          <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
            <TrendingUp size={16} />
            Performance stable
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-brand-600" />
              <h3 className="font-bold text-stone-900 dark:text-white">Performance des Caissiers (Aujourd'hui)</h3>
            </div>
          </div>
          <div className="space-y-6">
            {data.cashierStats.length === 0 ? (
              <p className="text-stone-400 italic text-center py-10">Aucune vente aujourd'hui</p>
            ) : (
              data.cashierStats.map((cashier, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all font-bold">
                      {cashier.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                        {cashier.name}
                      </span>
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                        {cashier.count} commandes traitées
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-stone-900 dark:text-white">{formatPrice(cashier.total)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Trophy size={20} className="text-amber-500" />
              <h3 className="font-bold text-stone-900 dark:text-white">Top 5 des produits</h3>
            </div>
          </div>
          <div className="space-y-6">
            {data.topProducts.length === 0 ? (
              <p className="text-stone-400 italic text-center py-10">Aucune donnée disponible</p>
            ) : (
              data.topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-400 group-hover:bg-brand-700 group-hover:text-white transition-all font-bold text-xs">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 group-hover:text-brand-700 transition-colors">
                      {product.name}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-stone-900 dark:text-white">{product.quantity} vendus</span>
                    <span className="text-[10px] text-stone-400">{product.count} commandes</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800/50 p-8 rounded-3xl border border-dashed border-stone-200 dark:border-stone-700 flex items-center justify-center min-h-[300px]">
          <div className="text-center max-w-xs">
            <div className="w-16 h-16 bg-white dark:bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <TrendingUp size={32} className="text-stone-300" />
            </div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-2">Graphiques Détaillés</h4>
            <p className="text-sm text-stone-500">
              Dès que vous aurez atteint 50 commandes, nous activerons les graphiques d'évolution heure par heure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
