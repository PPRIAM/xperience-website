'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TornPaperSplitRevealProps {
  children: React.ReactNode;
  coverColor?: string; // Tailwind class, e.g., 'bg-xp-alabaster' or 'bg-xp-gold'
  accentColor1?: string; // hex color for Gold layer
  accentColor2?: string; // hex color for Red layer
  shadowColor?: string; // hex color for Dark shadow layer
  id?: string;
  className?: string;
  isOpen?: boolean; // NEW: optional prop to override the scroll-triggered state
}

export default function TornPaperSplitReveal({
  children,
  coverColor = 'bg-xp-alabaster',
  accentColor1 = '#FFCC00', // Gold
  accentColor2 = '#CC0000', // Red
  shadowColor = '#121212',  // Dark shadow
  id,
  className = '',
  isOpen, // NEW
}: TornPaperSplitRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Triggers once the section enters 25% of the viewport height
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Use the explicit isOpen prop if passed, otherwise fall back to scroll-triggered isInView
  const openState = isOpen !== undefined ? isOpen : isInView;

  // Spring physical configurations for the paper tear dynamics
  const paperTransition = {
    type: 'spring' as const,
    stiffness: 140, // Snappier split/rip
    damping: 22,   // Controlled deceleration, no excessive wobble
    mass: 0.9,     // Kinetic responsiveness
  };

  const goldTransition = {
    type: 'spring' as const,
    stiffness: 150,
    damping: 24,
    delay: 0.03,   // Shorter delay for tighter layer coupling
  };

  const redTransition = {
    type: 'spring' as const,
    stiffness: 150,
    damping: 24,
    delay: 0.06,
  };

  const shadowTransition = {
    type: 'spring' as const,
    stiffness: 150,
    damping: 24,
    delay: 0.09,
  };

  // Interlocking jagged paths designed for a 1200x120 viewBox
  // Top half bottom edge (jagged pointing down)
  const topJaggedPath = "M 0,0 L 1200,0 L 1200,75 L 1165,60 L 1120,88 L 1075,50 L 1030,70 L 990,62 L 950,85 L 910,55 L 865,78 L 820,60 L 780,82 L 735,52 L 690,72 L 655,60 L 610,85 L 560,55 L 520,80 L 475,62 L 430,88 L 390,50 L 345,74 L 310,60 L 265,82 L 220,52 L 188,70 L 150,62 L 112,85 L 72,54 L 35,78 L 0,60 Z";

  // Bottom half top edge (jagged pointing up, interlocking perfectly)
  const bottomJaggedPath = "M 0,120 L 0,60 L 35,78 L 72,54 L 112,85 L 150,62 L 188,70 L 220,52 L 265,82 L 310,60 L 345,74 L 390,50 L 430,88 L 475,62 L 520,80 L 560,55 L 610,85 L 655,60 L 690,72 L 735,52 L 780,82 L 820,60 L 865,78 L 910,55 L 950,85 L 990,62 L 1030,70 L 1075,50 L 1120,88 L 1165,60 L 1200,75 L 1200,120 Z";

  // Get SVG fill color based on the Tailwind class
  const getFillColor = (bgColorClass: string) => {
    if (bgColorClass.includes('xp-alabaster')) return '#F8F9FA';
    if (bgColorClass.includes('xp-gold')) return '#FFCC00';
    if (bgColorClass.includes('xp-red')) return '#CC0000';
    if (bgColorClass.includes('xp-dark')) return '#121212';
    return '#F8F9FA';
  };

  const primaryFill = getFillColor(coverColor);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* 1. Underlying Content Section */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* 2. Overlapping Split Paper Page (Slides away on scroll-trigger) */}
      <div className="absolute inset-0 pointer-events-none z-30" aria-hidden="true">
        
        {/* --- A. TOP HALF OF THE PAGE --- */}
        <motion.div
          variants={{
            closed: { y: '0%' },
            open: { y: '-115%' }
          }}
          animate={openState ? 'open' : 'closed'}
          transition={paperTransition}
          className={`absolute top-0 left-0 right-0 h-[calc(50%-40px)] md:h-[calc(50%-60px)] ${coverColor} origin-top`}
        >
          {/* Subtle Halftone texture on the cover sheet */}
          <div className="absolute inset-0 halftone-dark opacity-[0.06]" />

          {/* Top Half Jagged Under-layers */}
          <div className="absolute top-full left-0 right-0 h-[80px] md:h-[120px] overflow-visible">
            
            {/* Shadow layer */}
            <motion.svg
              variants={{
                closed: { y: 0 },
                open: { y: 45 }
              }}
              animate={openState ? 'open' : 'closed'}
              transition={shadowTransition}
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={shadowColor}
            >
              <path d={topJaggedPath} />
            </motion.svg>

            {/* Red layer */}
            <motion.svg
              variants={{
                closed: { y: 0 },
                open: { y: 35 }
              }}
              animate={openState ? 'open' : 'closed'}
              transition={redTransition}
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={accentColor2}
            >
              <path d={topJaggedPath} />
            </motion.svg>

            {/* Gold layer */}
            <motion.svg
              variants={{
                closed: { y: 0 },
                open: { y: 20 }
              }}
              animate={openState ? 'open' : 'closed'}
              transition={goldTransition}
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={accentColor1}
            >
              <path d={topJaggedPath} />
            </motion.svg>

            {/* Top Primary Page (White/Cover color) */}
            <svg
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={primaryFill}
            >
              <path d={topJaggedPath} />
            </svg>
          </div>
        </motion.div>

        {/* --- B. BOTTOM HALF OF THE PAGE --- */}
        <motion.div
          variants={{
            closed: { y: '0%' },
            open: { y: '115%' }
          }}
          animate={openState ? 'open' : 'closed'}
          transition={paperTransition}
          className={`absolute bottom-0 left-0 right-0 h-[calc(50%-40px)] md:h-[calc(50%-60px)] ${coverColor} origin-bottom`}
        >
          {/* Halftone texture */}
          <div className="absolute inset-0 halftone-dark opacity-[0.06]" />

          {/* Bottom Half Jagged Under-layers */}
          <div className="absolute bottom-full left-0 right-0 h-[80px] md:h-[120px] overflow-visible">
            
            {/* Shadow layer */}
            <motion.svg
              variants={{
                closed: { y: 0 },
                open: { y: -45 }
              }}
              animate={openState ? 'open' : 'closed'}
              transition={shadowTransition}
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={shadowColor}
            >
              <path d={bottomJaggedPath} />
            </motion.svg>

            {/* Red layer */}
            <motion.svg
              variants={{
                closed: { y: 0 },
                open: { y: -35 }
              }}
              animate={openState ? 'open' : 'closed'}
              transition={redTransition}
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={accentColor2}
            >
              <path d={bottomJaggedPath} />
            </motion.svg>

            {/* Gold layer */}
            <motion.svg
              variants={{
                closed: { y: 0 },
                open: { y: -20 }
              }}
              animate={openState ? 'open' : 'closed'}
              transition={goldTransition}
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={accentColor1}
            >
              <path d={bottomJaggedPath} />
            </motion.svg>

            {/* Bottom Primary Page (White/Cover color) */}
            <svg
              className="absolute left-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill={primaryFill}
            >
              <path d={bottomJaggedPath} />
            </svg>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
