'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'section-hero',    label: 'Accueil' },
  { id: 'section-lineup',  label: 'Programme' },
  { id: 'section-details', label: 'Infos' },
  { id: 'section-footer',  label: 'Contact' },
];

interface ScrollProgressProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export default function ScrollProgress({ currentSection, onSectionChange }: ScrollProgressProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-50 animate-fade-in"
          aria-label="Navigation de section"
        >
          {SECTIONS.map((section, i) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(i)}
              aria-label={`Aller à ${section.label}`}
              className="relative flex items-center justify-end group cursor-pointer"
            >
              {/* Tooltip label on hover */}
              <motion.span
                className="absolute right-6 bg-xp-dark text-xp-gold font-heading font-black text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border border-xp-gold/30 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none"
              >
                {section.label}
              </motion.span>

              {/* Dot */}
              <motion.div
                animate={
                  currentSection === i
                    ? { scale: 1.5, backgroundColor: '#FFCC00', borderColor: '#121212' }
                    : { scale: 1,   backgroundColor: 'rgba(255,255,255,0.45)', borderColor: 'rgba(18,18,18,0.4)' }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-2.5 h-2.5 rounded-full border-2"
                style={{ boxShadow: currentSection === i ? '0 0 0 3px rgba(255,204,0,0.25)' : 'none' }}
              />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
