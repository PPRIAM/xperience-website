'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [code, setCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Check auth status on mount
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/admin/reservations');
      if (res.ok) {
        const result = await res.json();
        setReservations(result.data || []);
        setIsAuthorized(true);
        setError(null);
      } else {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          setIsAuthorized(false);
        } else {
          setError(data.error || 'Erreur lors du chargement des réservations.');
          setIsAuthorized(true);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion au serveur.');
      setIsAuthorized(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthorized(true);
        fetchReservations();
      } else {
        setError(data.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    // Overwrite session cookie to expire it immediately
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthorized(false);
    setReservations([]);
  };

  const handleExportCSV = () => {
    if (reservations.length === 0) return;
    const headers = ['Nom', 'Email', "Date d'inscription"];
    const rows = reservations.map(r => [
      r.name,
      r.email,
      new Date(r.createdAt).toLocaleString('fr-FR')
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reservations_xperience_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/reservations?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        setReservations(prev => prev.filter(r => r.id !== id));
      } else {
        alert(data.error || 'Erreur lors de la suppression.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur de connexion au serveur.');
    }
  };

  const filteredReservations = reservations.filter(
    r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isFetching) {
    return (
      <div className="min-h-screen w-screen bg-xp-dark flex items-center justify-center text-xp-alabaster font-heading font-black text-2xl uppercase tracking-widest">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-xp-gold border-t-transparent rounded-full"
          />
          <span className="mt-4">CHARGEMENT...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-xp-dark tropical-bg py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto relative select-none">
      <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!isAuthorized ? (
            // Access Vault Login Panel
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              className="max-w-md mx-auto mt-20"
            >
              <div className="comic-panel bg-xp-red text-xp-alabaster p-8 border-4 border-xp-dark shadow-retro-deep relative">
                <div className="absolute inset-0 halftone-dark pointer-events-none opacity-20" />
                
                <div className="relative z-10 text-center">
                  <div className="bg-xp-gold text-xp-dark font-heading font-black text-xs uppercase px-3 py-1 border-2 border-xp-dark inline-block transform -rotate-2 skew-x-3 mb-6 shadow-[2px_2px_0px_#121212]">
                    ACCÈS SÉCURISÉ
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl font-display font-black uppercase text-3d-inverse leading-none mb-3">
                    VAULT ADMIN
                  </h1>
                  <p className="font-sans font-bold text-sm text-xp-alabaster/80 mb-8 uppercase tracking-wider">
                    Saisis le code secret pour ouvrir le coffre-fort.
                  </p>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="text-left">
                      <label className="block font-heading font-black text-sm uppercase tracking-wide mb-2">
                        Code d'accès
                      </label>
                      <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full border-[3px] border-xp-dark bg-xp-alabaster text-xp-dark px-4 py-3 font-sans font-bold text-center tracking-widest placeholder-xp-gray/40 rounded-none focus:outline-none focus:bg-xp-gold transition-colors text-lg"
                        required
                      />
                    </div>

                    {error && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-xp-dark text-xp-gold border-2 border-xp-gold p-3 font-heading font-black text-sm uppercase tracking-wider rotate-[-1deg]"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.03, skewX: -2, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 bg-xp-gold text-xp-dark font-heading font-black text-lg py-3.5 border-[3px] border-xp-dark shadow-retro-flat cursor-pointer select-none rounded-none uppercase"
                    >
                      {isLoading ? 'DÉVERROUILLAGE...' : 'ENTRER'}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            // Admin Dashboard Interface
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Header Panel */}
              <div className="comic-panel bg-xp-alabaster text-xp-dark p-6 sm:p-8 border-4 border-xp-dark shadow-retro-flat flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-3d leading-none">
                    RÉSERVATIONS
                  </h1>
                  <p className="font-heading font-black text-sm sm:text-base text-xp-red uppercase mt-2 tracking-wide">
                    PANEL DE CONTRÔLE XPERIENCE
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
                  <motion.button
                    onClick={handleExportCSV}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 bg-xp-teal text-xp-dark font-heading font-black text-sm py-2.5 px-5 border-[3px] border-xp-dark shadow-[3px_3px_0px_#121212] cursor-pointer rounded-none uppercase"
                  >
                    Exporter CSV
                  </motion.button>

                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 bg-xp-red text-xp-alabaster font-heading font-black text-sm py-2.5 px-5 border-[3px] border-xp-dark shadow-[3px_3px_0px_#121212] cursor-pointer rounded-none uppercase"
                  >
                    Déconnexion
                  </motion.button>
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="comic-panel bg-xp-red text-xp-alabaster border-4 border-xp-dark p-4 font-heading font-black text-sm uppercase tracking-wider shadow-retro-flat flex items-center gap-3"
                >
                  <svg className="w-6 h-6 shrink-0 text-xp-alabaster" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="comic-panel bg-xp-gold text-xp-dark p-5 border-4 border-xp-dark shadow-retro-flat relative">
                  <span className="absolute top-2 right-2 text-xs font-heading font-black bg-xp-dark text-xp-alabaster px-1.5 py-0.5 border border-xp-dark uppercase">Total</span>
                  <p className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-xp-dark/70">
                    Total VIPs
                  </p>
                  <p className="text-3xl sm:text-4xl font-display font-black mt-2 leading-none">
                    {reservations.length}
                  </p>
                </div>

                <div className="comic-panel bg-xp-alabaster text-xp-dark p-5 border-4 border-xp-dark shadow-retro-flat relative">
                  <span className="absolute top-2 right-2 text-xs font-heading font-black bg-xp-dark text-xp-alabaster px-1.5 py-0.5 border border-xp-dark uppercase">Live</span>
                  <p className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-xp-dark/70">
                    Aujourd'hui
                  </p>
                  <p className="text-3xl sm:text-4xl font-display font-black mt-2 leading-none">
                    {
                      reservations.filter(
                        r => new Date(r.createdAt).toDateString() === new Date().toDateString()
                      ).length
                    }
                  </p>
                </div>

                <div className="comic-panel bg-xp-teal text-xp-dark p-5 border-4 border-xp-dark shadow-retro-flat relative">
                  <span className="absolute top-2 right-2 text-xs font-heading font-black bg-xp-dark text-xp-alabaster px-1.5 py-0.5 border border-xp-dark uppercase">Rate</span>
                  <p className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-xp-dark/70">
                    Taux d'email unique
                  </p>
                  <p className="text-3xl sm:text-4xl font-display font-black mt-2 leading-none">
                    100%
                  </p>
                </div>
              </div>

              {/* Main List Table Panel */}
              <div className="comic-panel bg-xp-alabaster text-xp-dark border-4 border-xp-dark shadow-retro-deep p-6">
                {/* Table Header and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <div className="font-heading font-black text-lg sm:text-xl uppercase border-b-4 border-xp-red pb-1 tracking-wider w-full sm:w-auto">
                    Membres Enregistrés ({filteredReservations.length})
                  </div>

                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="RECHERCHER UN NOM OU EMAIL..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full border-[3px] border-xp-dark bg-xp-alabaster text-xp-dark px-4 py-2 pl-10 font-sans font-bold placeholder-xp-gray/40 rounded-none focus:outline-none focus:bg-xp-gold transition-colors text-sm"
                    />
                    <svg className="absolute left-3.5 top-[13px] w-4 h-4 text-xp-dark" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Table Layout */}
                <div className="overflow-x-auto border-3 border-xp-dark rounded-none">
                  <table className="min-w-full divide-y-3 divide-xp-dark text-left">
                    <thead className="bg-xp-dark text-xp-alabaster font-heading font-black text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3.5 border-r-3 border-xp-dark">Nom Complet</th>
                        <th className="px-6 py-3.5 border-r-3 border-xp-dark">Adresse Email</th>
                        <th className="px-6 py-3.5 border-r-3 border-xp-dark">Date RSVP</th>
                        <th className="px-6 py-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-3 divide-xp-dark bg-xp-alabaster font-sans font-bold text-sm text-xp-dark">
                      <AnimatePresence>
                        {filteredReservations.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-10 text-center font-heading font-black text-base uppercase text-xp-gray tracking-wide">
                              Aucune réservation trouvée
                            </td>
                          </tr>
                        ) : (
                          filteredReservations.map((r, index) => (
                            <motion.tr
                              key={r.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.03 }}
                              className="hover:bg-xp-gold/10 transition-colors"
                            >
                              <td className="px-6 py-4 border-r-3 border-xp-dark">{r.name}</td>
                              <td className="px-6 py-4 border-r-3 border-xp-dark font-mono text-xs">{r.email}</td>
                              <td className="px-6 py-4 border-r-3 border-xp-dark text-xs text-xp-gray">
                                {new Date(r.createdAt).toLocaleString('fr-FR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <motion.button
                                  onClick={() => handleDelete(r.id)}
                                  whileHover={{ scale: 1.08, y: -1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-xp-red text-xp-alabaster border-2 border-xp-dark px-3 py-1.5 font-heading font-black text-xs uppercase cursor-pointer rounded-none hover:bg-xp-dark hover:text-xp-gold transition-all inline-flex items-center gap-1.5 shadow-[2px_2px_0px_#121212] hover:shadow-none select-none"
                                >
                                  <svg className="w-3.5 h-3.5 text-xp-alabaster" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Supprimer
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
