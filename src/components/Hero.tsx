'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';

export default function Hero({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Scroll-driven transforms for mobile parallax
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Title drifts upward + fades as user scrolls out of Hero
  const titleY   = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleOp  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Badge drops slightly slower (parallax depth)
  const badgeY   = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  // Scroll indicator: fade out once scroll starts
  const indicatorOp = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Track if user has scrolled to hide the indicator label
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.03) setHasScrolled(true);
    });
    return unsub;
  }, [scrollYProgress]);

  // Swipe hint nudge on mobile — a single gentle bounce on load
  const nudgeY = useMotionValue(0);
  const nudgeSpring = useSpring(nudgeY, { stiffness: 60, damping: 10 });
  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(nudgeY, [0, 18, 0], {
        duration: 1.2,
        ease: 'easeInOut',
        repeat: 2,
        repeatDelay: 0.4,
      });
    }, 1800);
    return () => clearTimeout(timeout);
  }, [nudgeY]);

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between bg-transparent"
    >
      {/* Outer comic frame */}
      <div className="absolute inset-4 md:inset-8 border-6 border-xp-dark pointer-events-none rounded-sm z-20" />

      {/* Top Left: KEZ publisher badge styled as a pasted pop-art sticker */}
      <motion.div 
        initial={{ rotate: -2, scale: 0.95 }}
        whileHover={{ scale: 1.1, rotate: 2, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="absolute top-4 left-4 md:top-8 md:left-8 bg-xp-gold border-4 border-xp-alabaster ring-4 ring-xp-dark text-xp-dark px-3 py-1.5 font-display font-black text-xs md:text-sm uppercase tracking-wider z-30 flex flex-col items-center select-none cursor-pointer rounded-xs"
      >
        <span>KEZ</span>
        <span className="text-[9px] font-sans font-bold leading-none border-t border-xp-dark mt-0.5 pt-0.5">EVENTS</span>
      </motion.div>

      {/* Top Right: 18+ sticker stamp */}
      <motion.div 
        initial={{ rotate: 3, scale: 0.95 }}
        whileHover={{ scale: 1.12, rotate: -6, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="absolute top-4 right-4 md:top-8 md:right-8 bg-xp-alabaster border-4 border-xp-alabaster ring-4 ring-xp-dark text-xp-dark px-4 py-2 font-heading font-black text-sm uppercase tracking-wider z-30 select-none cursor-pointer rounded-full"
      >
        <span>18+</span>
      </motion.div>

      {/* === Main content — scroll-parallaxed === */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 md:py-20 relative z-10 gap-6">

        {/* Big sticker-style "Xperience" wordmark — parallaxes upward on scroll */}
        <motion.div
          style={{ y: titleY, opacity: titleOp }}
          initial={{ opacity: 0, scale: 0.6, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        >
          <h1 className="hero-title font-display font-black uppercase leading-none select-none">
            Xperience
          </h1>
        </motion.div>

        {/* Date badge — slightly slower parallax (depth effect) + gloss sticker styling */}
        <motion.div
          style={{ y: badgeY }}
          initial={{ opacity: 0, x: 60, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -2, transition: { type: 'spring', stiffness: 150, damping: 14, delay: 0.15 } }}
          whileHover={{ 
            scale: 1.12, 
            rotate: 3, 
            y: -10,
            transition: { type: 'spring', stiffness: 350, damping: 12 }
          }}
          whileTap={{ scale: 0.96, rotate: -1 }}
          className="group relative bg-xp-alabaster text-xp-dark font-display font-black uppercase border-4 border-xp-alabaster ring-6 ring-xp-dark outline-none px-8 py-4 select-none cursor-pointer overflow-hidden rounded-xs"
        >
          {/* Glare Gloss Sheet */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
          
          <span className="relative z-10 block" style={{ fontSize: 'clamp(1.8rem, 8vw, 5rem)', lineHeight: 1 }}>
            30 <span className="text-xp-red">MAI</span>
          </span>
        </motion.div>

        {/* "SAVE THE DATE" yellow brush banner */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 130, damping: 12, delay: 0.28 }}
        >
          <div
            className="bg-xp-gold text-xp-dark font-display font-black uppercase tracking-widest border-4 border-xp-dark shadow-retro-flat px-8 py-3 select-none"
            style={{
              fontSize: 'clamp(1.4rem, 6vw, 3.5rem)',
              letterSpacing: '0.08em',
              transform: 'skewX(-2deg)',
            }}
          >
            SAVE THE DATE
          </div>
        </motion.div>


      </div>

      {/* === Mobile scroll indicator — fades out on scroll, bounces to hint === */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-30"
        style={{ opacity: indicatorOp }}
      >
        {/* Label — only shown before first scroll */}
        {!hasScrolled && (
          <motion.span
            className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-[0.25em] bg-xp-dark/80 text-xp-gold px-3 py-1.5 rounded-sm backdrop-blur-sm border border-xp-gold/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Faites défiler
          </motion.span>
        )}

        {/* Nudge dot — spring-bounces on load to hint scrollability */}
        <motion.div
          style={{ y: nudgeSpring }}
          className="w-7 h-12 border-2 border-xp-alabaster/80 rounded-full flex justify-center pt-2 bg-xp-dark/60 backdrop-blur-sm"
        >
          <motion.div
            className="w-1.5 h-3 bg-xp-gold rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Touch swipe chevrons — mobile only visual cue */}
        <motion.div
          className="flex flex-col items-center gap-0.5 md:hidden"
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-xp-alabaster/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg className="w-5 h-5 text-xp-alabaster/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* === Bottom contact strip — poster footer bar replica === */}
      <div className="relative z-30 w-full bg-xp-alabaster border-t-6 border-xp-dark py-4 px-6 md:px-12 select-none">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">

          {/* Left: Location */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-black text-base xs:text-lg sm:text-xl md:text-2xl text-xp-dark uppercase leading-none tracking-tight">
              SECRET LOCATION
            </span>
            <motion.span 
              whileHover={{ scale: 1.1, rotate: -2, y: -1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 10 }}
              className="inline-block mt-0.5 bg-xp-red text-xp-alabaster font-heading font-black text-[10px] sm:text-xs uppercase px-2 py-0.5 border-2 border-xp-dark shadow-[3px_3px_0px_#121212] select-none cursor-pointer rotate-2 rounded-xs"
            >
              ÉVÉNEMENT PRIVÉ
            </motion.span>
          </div>

          {/* Right: Contact numbers */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="font-sans font-bold text-[10px] sm:text-xs text-xp-gray uppercase tracking-widest">
              FOR SPONSORS, INFOS, RSVP :
            </span>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-3 gap-y-1 mt-0.5">
              <a
                href="tel:+50940595854"
                className="flex items-center gap-1 font-heading font-black text-sm sm:text-base md:text-lg text-xp-dark hover:text-xp-red transition-colors"
              >
                <PhoneIcon className="w-4 h-4 text-xp-red shrink-0" />
                (+509) 4059-5854
              </a>
              <span className="text-xp-dark/30 hidden sm:inline">/</span>
              <a
                href="tel:+50938684643"
                className="flex items-center gap-1 font-heading font-black text-sm sm:text-base md:text-lg text-xp-dark hover:text-xp-red transition-colors"
              >
                <PhoneIcon className="w-4 h-4 text-xp-red shrink-0" />
                3868-4643
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
