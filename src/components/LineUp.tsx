'use client';

import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/solid';

const artists = [
  { id: 1, role: "TÊTE D'AFFICHE", time: '00h00 — 02h00', borderCol: 'border-xp-red', nameBg: 'bg-xp-red', textCol: 'text-xp-alabaster' },
  { id: 2, role: 'DJ INVITÉ', time: '22h00 — 00h00', borderCol: 'border-xp-gold', nameBg: 'bg-xp-gold', textCol: 'text-xp-dark' },
  { id: 3, role: 'INVITÉ SPÉCIAL', time: '20h00 — 22h00', borderCol: 'border-xp-teal', nameBg: 'bg-xp-teal', textCol: 'text-xp-dark' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const artistVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export default function LineUp() {
  return (
    <section id="section-lineup" className="py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-transparent relative z-10">
      
      {/* Thick comic panel-like divider strips at top and bottom */}
      <div className="absolute inset-0 halftone-dark pointer-events-none opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading with standard orange dotted bottom border */}
        <motion.div
          className="text-center mb-12 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="font-heading font-black text-sm mb-6 flex items-center justify-center gap-2 flex-wrap">
            <motion.span 
              whileHover={{ scale: 1.1, rotate: 3, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 10 }}
              className="inline-block bg-xp-gold text-xp-dark font-display font-black text-xs sm:text-sm uppercase px-3 py-1.5 border-2 border-xp-dark shadow-[3px_3px_0px_#121212] select-none cursor-pointer rotate-[-2deg] rounded-xs"
            >
              KEZ EVENTS
            </motion.span>
            <span className="text-xp-alabaster uppercase tracking-[0.2em] text-xs font-heading font-black">présente</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-xp-alabaster uppercase text-3d leading-none heading-dotted-orange inline-block pb-6">
            La Programmation
          </h2>
        </motion.div>

        {/* Dynamic Outlined Artist Silhouette Grid (NO CARDS) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {artists.map((artist) => (
            <motion.div
              key={artist.id}
              variants={artistVariants}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              className="flex flex-col items-center group relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {/* Volumetric Character Frame with Hand-Drawn Outline and Offset Shadow */}
              <div
                className="w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full border-6 border-xp-dark bg-xp-alabaster overflow-hidden shadow-retro-deep relative flex items-center justify-center transition-transform duration-300 group-hover:rotate-2"
              >
                {/* Subtle internal halftone dot shade on the cutout backdrop */}
                <div className="absolute inset-0 halftone-dark opacity-15 pointer-events-none" />
                
                {/* Outlined Vector Character Silhouette Placement */}
                <UserIcon className="w-32 h-32 sm:w-40 sm:h-40 text-xp-dark opacity-35 transform translate-y-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                
                {/* Skewed Timeline Badge floating over the cutout */}
                <div className="absolute bottom-4 bg-xp-dark text-xp-alabaster border-2 border-xp-alabaster text-[10px] sm:text-xs font-heading font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm tracking-widest uppercase transform rotate-2">
                  {artist.time}
                </div>
              </div>

              {/* Skewed Nameplate - Narration Block below (adhering to Page 5/6 guidelines) */}
              <div
                className={`mt-6 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 ${artist.nameBg} ${artist.textCol} border-4 border-xp-dark shadow-retro-flat rounded-sm -skew-x-6 transform rotate-[-2deg] transition-all duration-300 group-hover:skew-x-0 group-hover:rotate-0`}
              >
                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-heading font-black uppercase tracking-wider text-center select-none whitespace-nowrap">
                  {artist.role}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
