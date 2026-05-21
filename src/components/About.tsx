'use client';

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  return (
    <section id="section-about" className="py-12 md:py-24 px-4 sm:px-6 md:px-12 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="comic-panel bg-xp-red text-xp-alabaster col-span-1 md:col-span-2 p-5 xs:p-8 sm:p-12 relative overflow-hidden"
          >
            {/* Dark Halftone Overlay */}
            <div className="absolute inset-0 halftone-dark pointer-events-none opacity-25" />

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase text-3d-inverse mb-6 leading-tight">
                Pure Energy.<br/>No Limits.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-heading font-black max-w-3xl leading-relaxed opacity-95 text-left">
                Xperience n&apos;est pas seulement une fête — c&apos;est un mouvement culturel. Là où la chaleur des Caraïbes rencontre l&apos;énergie rétro du pop-art. Conçu par{" "}
                <motion.span 
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 10 }}
                  className="inline-block bg-xp-gold text-xp-dark font-display font-black text-sm sm:text-base uppercase px-2 py-0.5 border-2 border-xp-dark shadow-[3px_3px_0px_#121212] select-none cursor-pointer rotate-[-1deg] rounded-xs"
                >
                  KEZ Events
                </motion.span>{" "}
                pour ceux qui osent vivre à fond.
              </p>
            </div>
          </motion.div>

          {/* Panel 2: Saturated Sunshine Gold panel */}
          <motion.div
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="comic-panel bg-xp-gold text-xp-dark p-5 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-full bg-xp-dark flex items-center justify-center mb-6 shadow-retro-flat border-2 border-xp-dark">
                <svg className="w-7 h-7 text-xp-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase mb-4 tracking-tight">L&apos;Atmosphère</h3>
              <p className="text-base sm:text-lg font-sans text-xp-gray font-bold leading-relaxed text-left">
                Des visuels immersifs, une sélection musicale pointue et une foule électrique. Une seule nuit, aucun regret. Porté par une énergie brute.
              </p>
            </div>
          </motion.div>

          {/* Panel 3: Royal Turquoise Accent panel */}
          <motion.div
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="comic-panel bg-xp-teal text-xp-dark p-5 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-full bg-xp-dark flex items-center justify-center mb-6 shadow-retro-flat border-2 border-xp-dark">
                <svg className="w-7 h-7 text-xp-teal" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase mb-4 tracking-tight">Entrée Exclusive</h3>
              <p className="text-base sm:text-lg font-sans text-xp-gray font-bold leading-relaxed text-left">
                Un lieu tenu secret. Une foule sélectionnée. Contactez-nous directement pour vos pass VIP, accès sponsors et détails d&apos;invitations privées.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
