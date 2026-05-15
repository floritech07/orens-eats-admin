"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CASHIER");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("CASHIER");
        setShowAddForm(false);
        fetchUsers();
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Chargement des utilisateurs...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display text-stone-900 dark:text-white">Gestion du Personnel</h2>
          <p className="text-stone-500">Ajoutez et gérez les comptes des caissiers.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-brand-700 hover:bg-brand-800 text-white px-6 py-2.5 rounded-full font-semibold transition"
        >
          {showAddForm ? "Fermer" : "+ Ajouter un caissier"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-800 max-w-2xl fade-up">
          <h3 className="text-lg font-semibold mb-6">Nouveau Compte</h3>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nom complet</label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 p-2.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email professionnel</label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe temporaire</label>
              <input
                type="password"
                required
                className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rôle</label>
              <select
                className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 p-2.5"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="CASHIER">Caissier</option>
                <option value="SUPERADMIN">Super Admin</option>
              </select>
            </div>
            <div className="md:col-span-2">
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
              >
                {submitting ? "Création..." : "Créer le compte"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-stone-50 dark:bg-stone-800/50">
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Nom</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Rôle</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Date d'ajout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    user.role === "SUPERADMIN" ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-blue-100 text-blue-700 border-blue-200"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
