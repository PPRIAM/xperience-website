'use client';

import { motion } from 'framer-motion';
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  return (
    <footer
      id="section-footer"
      className="relative w-full h-screen flex flex-col justify-between bg-transparent text-xp-alabaster p-4 md:p-8"
      role="contentinfo"
    >
      {/* Outer comic frame border */}
      <div className="absolute inset-4 md:inset-8 border-6 border-xp-dark pointer-events-none rounded-sm z-20" />

      {/* 1. Header Area */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 md:px-8 pt-4">
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-display font-black uppercase text-3d tracking-tight">
            KEZ<span className="text-xp-gold"> Events</span>
          </span>
          {/*<span className="font-heading font-black text-[9px] uppercase tracking-widest text-xp-gold mt-0.5">
            L'ÉVÉNEMENT CARIBÉEN EXCLUSIF
          </span>*/}
        </div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: -3 }}
          className="bg-xp-red border-4 border-xp-dark text-xp-alabaster font-heading font-black text-[10px] sm:text-xs uppercase px-3 py-1 sm:py-1.5 shadow-[3px_3px_0px_#121212] select-none cursor-pointer rotate-2 rounded-xs"
        >
          INVITATION REQUISE
        </motion.div>
      </div>

      {/* 2. Central Premium Comic Billboard */}
      <div className="relative z-10 max-w-5xl w-full mx-auto my-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 md:px-8 items-center">
        
        {/* Left Side Panel: RSVP / CONTACT DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="comic-panel bg-xp-gold text-xp-dark p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="comic-caption bg-xp-red text-xp-alabaster text-xs">
            RSVP & INFOS
          </div>
          
          <div className="mt-6 flex flex-col gap-5 sm:gap-6">
            <p className="font-sans font-black text-sm uppercase leading-relaxed tracking-wide mt-2">
              L'accès à la <span className="underline decoration-xp-red decoration-2">Private Location</span> est restreint. Réservez vos entrées privées dès maintenant auprès de nos organisateurs.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="tel:+50940595854"
                className="flex items-center gap-3 font-heading font-black text-base sm:text-xl text-xp-dark hover:text-xp-red transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-xp-dark flex items-center justify-center shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
                  <PhoneIcon className="w-5 h-5 text-xp-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-sans font-bold text-xp-dark/75 tracking-wider uppercase leading-none mb-1">NUMÉRO PRINCIPAL</p>
                  <span>(+509) 4059-5854</span>
                </div>
              </a>

              <a
                href="tel:+50938684643"
                className="flex items-center gap-3 font-heading font-black text-base sm:text-xl text-xp-dark hover:text-xp-red transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-xp-dark flex items-center justify-center shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
                  <PhoneIcon className="w-5 h-5 text-xp-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-sans font-bold text-xp-dark/75 tracking-wider uppercase leading-none mb-1">REPRÉSENTANT EXCLUSIF</p>
                  <span>(+509) 3868-4643</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side Panel: WARNING / AGE LIMIT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="comic-panel bg-xp-alabaster text-xp-dark p-6 sm:p-8 flex flex-col justify-between h-full relative"
        >
          <div className="comic-caption bg-xp-dark text-xp-gold text-xs">
            DIRECTIVES
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
            {/* Age Badge 
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-xp-red flex items-center justify-center bg-xp-dark shadow-retro-flat animate-glow select-none shrink-0"
              aria-label="Événement réservé aux personnes de 18 ans et plus"
            >
              <span className="font-display font-black text-3xl sm:text-4xl text-xp-red rotate-12">
                18+
              </span>
            </div>
              */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-xp-red leading-none">
                ACCÈS STRICT
              </h3>
              <p className="font-sans font-bold text-xs sm:text-sm text-xp-gray uppercase leading-relaxed tracking-wide">
                Vous devez impérativement présenter un ticket valide pour participer à l'événement.
              </p>
            </div>
          </div>

          <div className="border-t-3 border-dotted border-xp-dark/20 mt-6 pt-4 flex items-center gap-2 text-xp-red">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-heading font-black text-xs uppercase tracking-widest">
              LIEU PRIVÉ &bull; GONAÏVES
            </span>
          </div>
        </motion.div>

      </div>

      {/* 3. Bottom Strip / Copyright */}
      <div className="relative z-10 w-full px-4 md:px-8 pb-4">
        <div className="bg-xp-alabaster border-4 border-xp-dark p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-[10px] sm:text-xs text-xp-dark font-black uppercase tracking-widest text-center sm:text-left">
            &copy; {new Date().getFullYear()} PRIAM. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-xp-red animate-pulse" />
            <p className="font-heading text-[10px] sm:text-xs text-xp-red font-black uppercase tracking-widest">
              SÉCURISÉ & PRIVÉ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
