'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

const details = [
  { icon: CalendarIcon, label: 'Date', value: '30 MAI', accent: 'bg-xp-gold' },
  { icon: ClockIcon, label: 'Heure', value: 'Nuit Complète', accent: 'bg-xp-teal' },
  {
    icon: MapPinIcon,
    label: 'Lieu',
    value: 'Lieu Secret',
    sub: 'Événement Privé',
    accent: 'bg-xp-red',
  },
];

export default function Details() {
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

        {/* Panel 2: RSVP Card designed as a high-octane red warning panel */}
        <motion.div
          className="comic-panel bg-xp-red text-xp-alabaster p-5 sm:p-10 flex flex-col justify-center text-center !overflow-visible"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        >
          <div className="absolute inset-0 halftone-dark pointer-events-none opacity-25 rounded-[4px]" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase mb-3 text-3d-inverse">
              Rejoindre le club
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-sans mb-6 sm:mb-8 opacity-90 font-black tracking-wide">
              Pour les sponsors, l&apos;accès VIP et les informations de réservation privée.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              <motion.a
                href="tel:+50940595854"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0, 
                  skewX: -3,
                  y: -6,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 12 }}
                className="relative group flex items-center justify-center gap-2 bg-xp-alabaster text-xp-dark font-heading font-black text-sm xs:text-base sm:text-lg md:text-xl py-3 px-8 sm:py-4 sm:px-10 border-[3px] border-xp-dark shadow-retro-flat focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-xp-alabaster select-none rounded-none transform rotate-[-2.5deg] -skew-x-6 cursor-pointer"
              >
                {/* Clear tape overlays on opposite corners */}
                <div className="absolute -top-2 -left-3 w-10 h-5 bg-white/25 backdrop-blur-[1px] border border-white/30 -rotate-15 pointer-events-none shadow-[1px_1px_2px_rgba(0,0,0,0.15)]" />
                <div className="absolute -bottom-2 -right-3 w-10 h-5 bg-white/25 backdrop-blur-[1px] border border-white/30 -rotate-15 pointer-events-none shadow-[1px_1px_2px_rgba(0,0,0,0.15)]" />
                
                <PhoneIcon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                +509 4059-5854
              </motion.a>

              <motion.a
                href="tel:+50938684643"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: -1, 
                  skewX: 3,
                  y: -6,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 12 }}
                className="relative group flex items-center justify-center gap-2 bg-xp-gold text-xp-dark font-heading font-black text-sm xs:text-base sm:text-lg md:text-xl py-3 px-8 sm:py-4 sm:px-10 border-[3px] border-xp-dark shadow-retro-flat focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-xp-gold select-none rounded-none transform rotate-[2deg] skew-x-6 cursor-pointer"
              >
                {/* Clear tape overlays on opposite corners */}
                <div className="absolute -top-2 -right-3 w-10 h-5 bg-white/25 backdrop-blur-[1px] border border-white/30 rotate-15 pointer-events-none shadow-[1px_1px_2px_rgba(0,0,0,0.15)]" />
                <div className="absolute -bottom-2 -left-3 w-10 h-5 bg-white/25 backdrop-blur-[1px] border border-white/30 rotate-15 pointer-events-none shadow-[1px_1px_2px_rgba(0,0,0,0.15)]" />
                
                <PhoneIcon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                +509 3868-4643
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
