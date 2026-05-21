'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function SecretLocationBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Position motion values for mouse repel
  const repelX = useMotionValue(0);
  const repelY = useMotionValue(0);
  const repelRotate = useMotionValue(0);

  // Spring physics for satisfying organic motion
  const springConfig = { stiffness: 90, damping: 15, mass: 0.8 };
  const springX = useSpring(repelX, springConfig);
  const springY = useSpring(repelY, springConfig);
  const springRot = useSpring(repelRotate, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1200); // Hide/Disable repel on mobile/tablet/smaller desktops
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!badgeRef.current) return;

      const rect = badgeRef.current.getBoundingClientRect();
      const badgeCenterX = rect.left + rect.width / 2;
      const badgeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - badgeCenterX;
      const dy = e.clientY - badgeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const repelRadius = 240; // Detection radius in pixels

      if (distance < repelRadius) {
        // Linear drop-off of force: 1 at center, 0 at outer edge
        const force = 1 - distance / repelRadius;
        
        // Repel angle away from the cursor
        const angle = Math.atan2(dy, dx);
        
        // Max displacement of 55px
        const maxDisplacement = 55;
        const targetX = -Math.cos(angle) * maxDisplacement * force;
        const targetY = -Math.sin(angle) * maxDisplacement * force;
        
        // Dynamic tilt based on direction of cursor approach
        const targetRotate = (dx > 0 ? -1 : 1) * force * 15;

        repelX.set(targetX);
        repelY.set(targetY);
        repelRotate.set(targetRotate);
      } else {
        // Return to rest position
        repelX.set(0);
        repelY.set(0);
        repelRotate.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, repelX, repelY, repelRotate]);

  if (isMobile) return null; // Only show on desktop margins to avoid cluttering mobile screens

  return (
    <div className="fixed right-10 top-1/3 z-40 pointer-events-none select-none">
      {/* Ambient slow-drift floating wrapper */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-4, -1, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-auto"
      >
        {/* Interactive Mouse Repelled spring-animated panel */}
        <motion.div
          ref={badgeRef}
          style={{
            x: springX,
            y: springY,
            rotate: springRot,
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-36 h-36 bg-xp-gold border-4 border-xp-alabaster ring-4 ring-xp-dark outline-none rounded-2xl shadow-retro-deep cursor-pointer flex flex-col items-center justify-center p-3 text-center overflow-hidden"
        >
          {/* Adhesive Gloss Glare Overlay */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-out" />

          {/* Ticket Dashed inner border */}
          <div className="absolute inset-2 border-2 border-dashed border-xp-red rounded-xl pointer-events-none opacity-80" />

          {/* Sticker content */}
          <span className="font-heading font-black text-[10px] text-xp-red uppercase tracking-wider relative z-10 leading-none mb-1">
            KEZ EVENTS
          </span>

          <MapPinIcon className="w-7 h-7 text-xp-dark relative z-10 mb-1 group-hover:scale-110 transition-transform duration-300" />

          <span className="font-display font-black text-xs text-xp-dark uppercase tracking-tight relative z-10 leading-tight">
            SECRET
          </span>
          <span className="font-display font-black text-xs text-xp-dark uppercase tracking-tight relative z-10 leading-tight">
            LOCATION
          </span>

          <div className="mt-2 bg-xp-dark text-xp-alabaster text-[9px] font-heading font-black px-2 py-0.5 rounded-sm relative z-10 uppercase tracking-widest rotate-2 group-hover:rotate-0 transition-transform duration-300">
            30.05.26
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
