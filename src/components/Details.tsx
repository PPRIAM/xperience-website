'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

const details = [
  { icon: CalendarIcon, label: 'Date', value: '30 MAI', accent: 'bg-xp-gold' },
  { icon: ClockIcon, label: 'Heure', value: 'Nuit Complète', accent: 'bg-xp-teal' },
  {
    icon: MapPinIcon,
    label: 'Lieu',
    value: 'Lieu Privé',
    sub: 'Événement Privé',
    accent: 'bg-xp-red',
  },
];

export default function Details() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setError(data.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error(err);
      setError('Impossible de se connecter au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="section-details" className="py-12 md:py-24 px-4 sm:px-6 md:px-12 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Panel 1: Details Card designed as a comic book narrative panel */}
        <motion.div
          className="comic-panel bg-xp-alabaster text-xp-dark p-5 sm:p-10"
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase mb-6 sm:mb-8 heading-bar-red">
            Infos Événement
          </h2>

          <ul className="space-y-5 sm:space-y-7" aria-label="Event details">
            {details.map(({ icon: Icon, label, value, sub, accent }) => (
              <li key={label} className="flex items-start gap-5">
                <div
                  className={`w-12 h-12 rounded-full border-2 border-xp-dark flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#121212] ${accent}`}
                >
                  <Icon
                    className={`w-6 h-6 ${accent === 'bg-xp-red' ? 'text-xp-alabaster' : 'text-xp-dark'}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-heading font-black text-lg sm:text-xl uppercase tracking-wide">{label}</p>
                  <p className="font-sans font-bold text-base sm:text-lg text-xp-gray mt-0.5">{value}</p>
                  {sub && (
                    <p className="font-sans font-black text-sm sm:text-base mt-0.5 text-xp-red">
                      {sub}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Panel 2: RSVP Card designed as a high-octane red warning panel or active reservation form */}
        <motion.div
          className="comic-panel bg-xp-red text-xp-alabaster p-5 sm:p-8 flex flex-col justify-center !overflow-visible"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        >
          <div className="absolute inset-0 halftone-dark pointer-events-none opacity-25 rounded-[4px]" />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="rsvp-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center"
                >
                  <h2 className="text-2xl sm:text-3xl font-display font-black uppercase mb-2 text-3d-inverse">
                    RÉSERVER MA PLACE
                  </h2>
                  <p className="text-xs sm:text-sm font-sans mb-5 opacity-90 font-black tracking-wide uppercase">
                    Remplis tes infos pour rejoindre la liste privée
                  </p>

                  <form onSubmit={handleReserve} className="space-y-4 text-left">
                    <div>
                      <label className="block font-heading font-black text-xs uppercase tracking-wide mb-1">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Bruce Wayne"
                        className="w-full border-[3px] border-xp-dark bg-xp-alabaster text-xp-dark px-3 py-2 font-sans font-bold placeholder-xp-gray/40 rounded-none focus:outline-none focus:bg-xp-gold transition-colors text-sm"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block font-heading font-black text-xs uppercase tracking-wide mb-1">
                        Adresse Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: bruce@waynecorp.com"
                        className="w-full border-[3px] border-xp-dark bg-xp-alabaster text-xp-dark px-3 py-2 font-sans font-bold placeholder-xp-gray/40 rounded-none focus:outline-none focus:bg-xp-gold transition-colors text-sm"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {error && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-xp-dark text-xp-gold border-2 border-xp-gold p-2.5 font-heading font-black text-xs uppercase tracking-wider text-center rotate-[-1deg]"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ 
                        scale: 1.03, 
                        rotate: -1,
                        skewX: 2,
                        y: -3,
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 12 }}
                      className="relative group w-full flex items-center justify-center gap-2 bg-xp-gold text-xp-dark font-heading font-black text-sm sm:text-base py-3 border-[3px] border-xp-dark shadow-retro-flat cursor-pointer select-none rounded-none uppercase"
                    >
                      <div className="absolute -top-2 -right-3 w-8 h-4 bg-white/25 backdrop-blur-[1px] border border-white/30 rotate-15 pointer-events-none" />
                      {isLoading ? 'ENREGISTREMENT...' : "S'INSCRIRE MAINTENANT"}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="rsvp-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="inline-block bg-xp-gold text-xp-dark border-[3px] border-xp-dark p-6 shadow-retro-flat relative transform rotate-[-1.5deg]">
                    <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-3d-inverse leading-none mb-1">
                      BOOM !
                    </h3>
                    <p className="font-heading font-black text-sm sm:text-base uppercase tracking-wide mt-1">
                      TU ES SUR LA LISTE !
                    </p>
                    <p className="font-sans font-bold text-xs sm:text-sm text-xp-dark/80 mt-2">
                      Tu vas recevoir les informations de réservation très prochainement.
                    </p>
                  </div>

                  {/* Alternative Direct Contact Info */}
                  <div className="mt-6 border-t-2 border-dashed border-xp-alabaster/30 pt-4 text-left">
                    <p className="text-xs font-heading font-black uppercase tracking-wider text-center opacity-80 mb-3">
                      VIP & Sponsors ? Contactez-nous en direct :
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="tel:+50940595854"
                        className="flex items-center justify-center gap-1.5 bg-xp-alabaster text-xp-dark font-sans font-black text-xs py-2 px-2 border-2 border-xp-dark shadow-[2px_2px_0px_#121212] text-center"
                      >
                        <PhoneIcon className="w-3.5 h-3.5" />
                        +509 4059-5854
                      </a>
                      <a
                        href="tel:+50938684643"
                        className="flex items-center justify-center gap-1.5 bg-xp-gold text-xp-dark font-sans font-black text-xs py-2 px-2 border-2 border-xp-dark shadow-[2px_2px_0px_#121212] text-center"
                      >
                        <PhoneIcon className="w-3.5 h-3.5" />
                        +509 3868-4643
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
