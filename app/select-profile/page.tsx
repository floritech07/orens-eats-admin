"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, User, Lock, ChevronRight } from "lucide-react";

interface Profile {
  id: string;
  name: string;
}

export default function SelectProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (session?.user?.role === "SUPERADMIN") {
      router.push("/admin");
      return;
    }

    fetchProfiles();
  }, [session, router]);

  const fetchProfiles = async () => {
    try {
      const res = await fetch("/api/admin/profiles");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProfiles(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfile || pin.length !== 4) return;

    setVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/admin/profiles/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: selectedProfile.id, pin }),
      });

      if (res.ok) {
        await update({
          profile: {
            id: selectedProfile.id,
            name: selectedProfile.name,
          },
        });
        router.push("/admin/orders");
      } else {
        setError("Code PIN incorrect");
        setPin("");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 text-stone-500">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Chargement des profils...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-stone-900 dark:text-white mb-2">
            Espace Caissier
          </h1>
          <p className="text-stone-500">
            {selectedProfile ? `Code PIN pour ${selectedProfile.name}` : "Choisissez votre profil pour continuer"}
          </p>
        </div>

        {!selectedProfile ? (
          <div className="grid gap-3">
            {profiles.length === 0 ? (
              <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 text-center">
                <p className="text-stone-500 italic">Aucun profil configuré. Veuillez contacter le Superadmin.</p>
              </div>
            ) : (
              profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile)}
                  className="flex items-center justify-between p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <User size={24} />
                    </div>
                    <span className="font-semibold text-lg text-stone-800 dark:text-stone-200">
                      {profile.name}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-stone-400 group-hover:text-brand-600 transition-colors" />
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-xl border border-stone-200 dark:border-stone-800">
            <button
              onClick={() => { setSelectedProfile(null); setPin(""); setError(""); }}
              className="mb-6 text-sm text-stone-500 hover:text-brand-600 flex items-center gap-1"
            >
              ← Retour aux profils
            </button>

            <form onSubmit={handleVerifyPin} className="space-y-6">
              <div className="flex justify-center gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                      pin.length > i 
                        ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/10 text-stone-900 dark:text-white" 
                        : "border-stone-200 dark:border-stone-800 text-stone-300"
                    }`}
                  >
                    {pin.length > i ? "●" : ""}
                  </div>
                ))}
              </div>

              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 4) setPin(val);
                }}
                className="sr-only"
                autoFocus
              />

              {error && (
                <p className="text-red-500 text-sm text-center font-medium animate-shake">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={pin.length !== 4 || verifying}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-2xl font-bold shadow-lg shadow-brand-600/20 transition-all flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Lock size={20} />
                    Accéder à la caisse
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⌫"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      if (num === "C") setPin("");
                      else if (num === "⌫") setPin(p => p.slice(0, -1));
                      else if (typeof num === "number" && pin.length < 4) setPin(p => p + num);
                    }}
                    className={`h-16 rounded-xl font-bold text-xl transition-all ${
                      typeof num === "string" 
                        ? "bg-stone-100 dark:bg-stone-800 text-stone-600 hover:bg-stone-200" 
                        : "bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
