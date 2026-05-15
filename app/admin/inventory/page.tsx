"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/menu";
import { 
  Package, 
  Search, 
  Plus, 
  Minus, 
  AlertTriangle,
  Loader2,
  Filter,
  Eye,
  EyeOff,
  Star
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  isDailySpecial: boolean;
  category: {
    name: string;
  };
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dailySpecials = products.filter(p => p.isDailySpecial);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-stone-500">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p>Chargement de l'inventaire...</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display text-stone-900 dark:text-white">Gestion des Stocks</h2>
          <p className="text-stone-500 mt-1">Mettez à jour les quantités disponibles en temps réel.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un produit..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {dailySpecials.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4 text-amber-800 dark:text-amber-400">
            <Star size={20} className="fill-amber-500" />
            <h3 className="font-bold uppercase tracking-wider text-sm">Menu du Jour Actuel</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {dailySpecials.map(product => (
              <div key={product.id} className="bg-white dark:bg-stone-900 px-4 py-2 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-3 shadow-sm group">
                <span className="font-medium text-stone-900 dark:text-white">{product.name}</span>
                <button 
                  onClick={() => updateProduct(product.id, { isDailySpecial: false })}
                  className="text-stone-400 hover:text-red-500 transition-colors"
                  title="Retirer du menu du jour"
                >
                  <Minus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 dark:bg-stone-800/30">
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Produit</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Catégorie</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">Prix</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest text-center">Stock</th>
                <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center text-stone-500">
                      <Package size={48} className="mb-4 opacity-20" />
                      <p className="italic">Aucun produit trouvé.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="group hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        {product.isDailySpecial && <Star size={16} className="text-amber-500 fill-amber-500" />}
                        <div className="font-semibold text-stone-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-stone-900 dark:text-white">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => updateProduct(product.id, { stock: product.stock - 1 })}
                          disabled={updating === product.id || product.stock <= 0}
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-900/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <div className="relative flex flex-col items-center w-12">
                          <span className={`text-lg font-display ${
                            product.stock === 0 ? 'text-red-500' : 
                            product.stock < 10 ? 'text-amber-500' : 
                            'text-stone-900 dark:text-white'
                          }`}>
                            {product.stock}
                          </span>
                          {product.stock < 10 && (
                            <AlertTriangle size={12} className="absolute -top-3 text-amber-500 animate-pulse" />
                          )}
                        </div>

                        <button
                          onClick={() => updateProduct(product.id, { stock: product.stock + 1 })}
                          disabled={updating === product.id}
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-green-50 hover:border-green-200 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:border-green-900/50 transition-all disabled:opacity-30"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => updateProduct(product.id, { isAvailable: !product.isAvailable })}
                          title={product.isAvailable ? "Rendre indisponible" : "Rendre disponible"}
                          className={`p-2 rounded-xl border transition-all ${
                            product.isAvailable 
                              ? 'bg-brand-50 border-brand-100 text-brand-700 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400' 
                              : 'bg-stone-50 border-stone-100 text-stone-400 dark:bg-stone-800 dark:border-stone-700'
                          }`}
                        >
                          {product.isAvailable ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                          onClick={() => updateProduct(product.id, { isDailySpecial: !product.isDailySpecial })}
                          title={product.isDailySpecial ? "Retirer du menu du jour" : "Mettre en menu du jour"}
                          className={`p-2 rounded-xl border transition-all ${
                            product.isDailySpecial 
                              ? 'bg-amber-50 border-amber-100 text-amber-600 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400' 
                              : 'bg-stone-50 border-stone-100 text-stone-400 dark:bg-stone-800 dark:border-stone-700'
                          }`}
                        >
                          <Star size={18} className={product.isDailySpecial ? "fill-amber-500" : ""} />
                        </button>
                      </div>
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
