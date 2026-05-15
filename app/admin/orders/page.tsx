"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/menu";
import { 
  RefreshCcw, 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Printer, 
  CheckCircle2, 
  Play, 
  Loader2,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { useSession } from "next-auth/react";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  customerName: string;
  customerPhone: string;
  deliveryMode: string;
  location: string;
  createdAt: string;
  profile?: {
    id: string;
    name: string;
  };
  items: {
    id: string;
    quantity: number;
    price: number;
    accompLabel?: string;
  }[];
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // Plus fréquent: 15s
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      
      const data = await res.json();

      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status, profile: data.profile || o.profile } : o));
        fetchOrders(); // Rafraîchir pour être sûr d'avoir les dernières infos
      } else {
        setError(data.error || "Une erreur est survenue");
        setTimeout(() => setError(null), 5000);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
      case "PROCESSING": return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "READY": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "DELIVERED": return "bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700";
      default: return "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING": return "En attente";
      case "PROCESSING": return "En cuisine";
      case "READY": return "Prêt / À servir";
      case "DELIVERED": return "Terminé / Payé";
      default: return status;
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-stone-500">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p>Chargement des commandes...</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display text-stone-900 dark:text-white">Suivi des Commandes</h2>
          <p className="text-stone-500 mt-1">Gérez les commandes entrantes et leur préparation.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-in fade-in slide-in-from-right-4">
              <AlertCircle size={16} />
              <span className="text-xs font-bold">{error}</span>
            </div>
          )}
          <button 
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCcw size={16} />
            Actualiser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-stone-900 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800">
            <div className="flex flex-col items-center text-stone-400">
              <Clock size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Aucune commande pour le moment.</p>
              <p className="text-sm">Les nouvelles commandes s'afficheront ici automatiquement.</p>
            </div>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={`group bg-white dark:bg-stone-900 rounded-3xl shadow-sm border overflow-hidden transition-all duration-300 ${
              order.profile ? 'border-brand-200 dark:border-brand-900/50' : 'border-stone-100 dark:border-stone-800'
            }`}>
              {/* Header de la commande */}
              <div className="px-8 py-5 bg-stone-50/50 dark:bg-stone-800/30 border-b border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Commande</span>
                    <span className="font-mono text-sm font-bold text-stone-600 dark:text-stone-300">#{order.id.slice(-6).toUpperCase()}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  {order.profile && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 rounded-full border border-brand-100 dark:border-brand-800">
                      <ShieldCheck size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{order.profile.name}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">Total</span>
                    <p className="text-lg font-bold text-brand-700 dark:text-brand-400 leading-none">{formatPrice(order.totalAmount)}</p>
                  </div>
                  <div className="w-px h-8 bg-stone-200 dark:bg-stone-700 hidden sm:block"></div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">Heure</span>
                    <p className="text-sm font-medium text-stone-500 leading-none">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>

              {/* Corps de la commande */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Section Client */}
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Informations Client</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                        <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                          <User size={16} />
                        </div>
                        <span className="font-semibold">{order.customerName || "Client Orens"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                        <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                          <Phone size={16} />
                        </div>
                        <span className="text-sm">{order.customerPhone || "N/A"}</span>
                      </div>
                      <div className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
                        <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 mt-0.5">
                          <MapPin size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium capitalize">{order.deliveryMode}</span>
                          {order.location && <span className="text-xs text-stone-400">{order.location}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Articles */}
                <div className="lg:col-span-5 border-l border-stone-100 dark:border-stone-800 lg:pl-8">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Détails de la Commande</h4>
                  <div className="space-y-4">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-start group/item">
                        <div className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 text-xs font-bold">
                            {item.quantity}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-stone-900 dark:text-white group-hover/item:text-brand-700 transition-colors">
                              Article #{item.productId.slice(-4)}
                            </span>
                            {item.accompLabel && (
                              <span className="text-xs text-stone-400 italic">Accomp: {item.accompLabel}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-stone-500">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Actions */}
                <div className="lg:col-span-3 border-l border-stone-100 dark:border-stone-800 lg:pl-8 flex flex-col justify-between">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Actions</h4>
                  <div className="space-y-3">
                    {order.status === "PENDING" && (
                      <button 
                        onClick={() => updateStatus(order.id, "PROCESSING")}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        <Play size={14} />
                        Prendre en cuisine
                      </button>
                    )}
                    {order.status === "PROCESSING" && (
                      <button 
                        disabled={order.profile?.id !== session?.user?.profile?.id}
                        onClick={() => updateStatus(order.id, "READY")}
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 ${
                          order.profile?.id === session?.user?.profile?.id 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-stone-400 cursor-not-allowed"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        Marquer Prêt
                      </button>
                    )}
                    {order.status === "READY" && (
                      <button 
                        disabled={order.profile?.id !== session?.user?.profile?.id}
                        onClick={() => updateStatus(order.id, "DELIVERED")}
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white dark:text-stone-900 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 ${
                          order.profile?.id === session?.user?.profile?.id 
                            ? "bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white" 
                            : "bg-stone-400 cursor-not-allowed"
                        }`}
                      >
                        <Printer size={14} />
                        Tirer le ticket & Terminer
                      </button>
                    )}
                    {order.profile && order.profile.id !== session?.user?.profile?.id && (
                      <p className="text-[10px] text-center text-stone-400 italic">
                        Pris en charge par {order.profile.name}
                      </p>
                    )}
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-medium transition-colors">
                      Détails complets
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
