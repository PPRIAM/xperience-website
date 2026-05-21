'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

export default function PalmTrees() {
  // Ambient wind sway motion values
  const windLeft = useMotionValue(0);
  const windRight = useMotionValue(0);

  // Mouse repel motion values
  const repelLeftRotate = useMotionValue(0);
  const repelLeftX = useMotionValue(0);
  const repelLeftY = useMotionValue(0);

  const repelRightRotate = useMotionValue(0);
  const repelRightX = useMotionValue(0);
  const repelRightY = useMotionValue(0);

  // Springs for smooth physics reactions
  const springConfig = { stiffness: 100, damping: 18, mass: 1 };
  const leftRotateSpring = useSpring(repelLeftRotate, springConfig);
  const leftXSpring = useSpring(repelLeftX, springConfig);
  const leftYSpring = useSpring(repelLeftY, springConfig);

  const rightRotateSpring = useSpring(repelRightRotate, springConfig);
  const rightXSpring = useSpring(repelRightX, springConfig);
  const rightYSpring = useSpring(repelRightY, springConfig);

  // Combine wind sway and physics springs
  const leftRotate = useTransform([windLeft, leftRotateSpring], ([w, r]) => (w as number) + (r as number));
  const rightRotate = useTransform([windRight, rightRotateSpring], ([w, r]) => (w as number) + (r as number));

  useEffect(() => {
    // 1. Gentle ambient wind swaying (different timing for natural feel)
    const animLeft = animate(windLeft, [-1.5, 1, -1.5], {
      repeat: Infinity,
      duration: 8,
      ease: 'easeInOut',
    });

    const animRight = animate(windRight, [1.5, -1, 1.5], {
      repeat: Infinity,
      duration: 9,
      ease: 'easeInOut',
    });

    // 2. Mouse tracking for spring-physics repel effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;

      // --- Left Palm Tree (Bottom-Left Corner: x=0, y=h) ---
      const dxLeft = clientX;
      const dyLeft = h - clientY;
      const distLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft);
      const radiusLeft = isMobile ? 180 : 500; // Scaled activation radius

      if (distLeft < radiusLeft) {
        const force = 1 - distLeft / radiusLeft; // 0 to 1
        const maxRotate = isMobile ? -7 : -16;
        const maxX = isMobile ? -12 : -35;
        const maxY = isMobile ? 4 : 15;
        repelLeftRotate.set(force * maxRotate); 
        repelLeftX.set(force * maxX);
        repelLeftY.set(force * maxY);
      } else {
        repelLeftRotate.set(0);
        repelLeftX.set(0);
        repelLeftY.set(0);
      }

      // --- Right Palm Tree (Bottom-Right Corner: x=w, y=h) ---
      const dxRight = w - clientX;
      const dyRight = h - clientY;
      const distRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight);
      const radiusRight = isMobile ? 180 : 500;

      if (distRight < radiusRight) {
        const force = 1 - distRight / radiusRight;
        const maxRotate = isMobile ? 7 : 16;
        const maxX = isMobile ? 12 : 35;
        const maxY = isMobile ? 4 : 15;
        repelRightRotate.set(force * maxRotate);
        repelRightX.set(force * maxX);
        repelRightY.set(force * maxY);
      } else {
        repelRightRotate.set(0);
        repelRightX.set(0);
        repelRightY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      animLeft.stop();
      animRight.stop();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [windLeft, windRight, repelLeftRotate, repelLeftX, repelLeftY, repelRightRotate, repelRightX, repelRightY]);

  return (
    <>
      {/* Left Palm Tree */}
      <motion.div
        className="fixed bottom-0 -left-12 sm:-left-16 w-36 sm:w-60 md:w-[500px] h-[320px] sm:h-[450px] md:h-[600px] pointer-events-none z-10 select-none origin-bottom-left"
        style={{
          rotate: leftRotate,
          x: leftXSpring,
          y: leftYSpring,
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[6px_6px_0px_#121212]">
          <defs>
            <linearGradient id="palm-grad-left" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#121212" />
              <stop offset="50%" stopColor="#D32F2F" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <pattern id="palm-dots-left" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.8" fill="#FFC107" opacity="0.35" />
            </pattern>
          </defs>

          {/* Base Trunk & Fronds filled with Brand Gradient */}
          <g fill="url(#palm-grad-left)" stroke="#121212" strokeWidth="1.8" strokeLinejoin="round">
            {/* Trunk */}
            <path d="M 0 120 Q 25 80 15 0 Q 18 0 10 120 Z" />
            {/* Fronds */}
            <path d="M 15 0 Q -25 25 -35 55 Q -12 22 20 0" />
            <path d="M 20 0 Q -35 -8 -55 12 Q -22 -4 20 0" />
            <path d="M 20 0 Q -25 -35 -40 -48 Q -18 -18 20 0" />
            <path d="M 20 0 Q 8 -42 -2 -62 Q 4 -32 20 0" />
            <path d="M 20 0 Q 45 -32 60 -42 Q 28 -16 20 0" />
            <path d="M 20 0 Q 55 2 70 18 Q 32 6 20 0" />
          </g>

          {/* Overlaid Halftone Dot Grid */}
          <g fill="url(#palm-dots-left)" pointerEvents="none">
            {/* Trunk */}
            <path d="M 0 120 Q 25 80 15 0 Q 18 0 10 120 Z" />
            {/* Fronds */}
            <path d="M 15 0 Q -25 25 -35 55 Q -12 22 20 0" />
            <path d="M 20 0 Q -35 -8 -55 12 Q -22 -4 20 0" />
            <path d="M 20 0 Q -25 -35 -40 -48 Q -18 -18 20 0" />
            <path d="M 20 0 Q 8 -42 -2 -62 Q 4 -32 20 0" />
            <path d="M 20 0 Q 45 -32 60 -42 Q 28 -16 20 0" />
            <path d="M 20 0 Q 55 2 70 18 Q 32 6 20 0" />
          </g>
        </svg>
      </motion.div>

      {/* Right Palm Tree */}
      <motion.div
        className="fixed bottom-0 -right-16 sm:-right-20 w-40 sm:w-64 md:w-[520px] h-[350px] sm:h-[480px] md:h-[650px] pointer-events-none z-10 select-none origin-bottom-right"
        style={{
          rotate: rightRotate,
          x: rightXSpring,
          y: rightYSpring,
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full scale-x-[-1] filter drop-shadow-[-6px_6px_0px_#121212]">
          <defs>
            <linearGradient id="palm-grad-right" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#121212" />
              <stop offset="50%" stopColor="#D32F2F" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <pattern id="palm-dots-right" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.8" fill="#FFC107" opacity="0.35" />
            </pattern>
          </defs>

          {/* Base Trunk & Fronds filled with Brand Gradient */}
          <g fill="url(#palm-grad-right)" stroke="#121212" strokeWidth="1.8" strokeLinejoin="round">
            {/* Trunk */}
            <path d="M 0 120 Q 30 75 20 0 Q 23 0 12 120 Z" />
            {/* Fronds */}
            <path d="M 20 0 Q -25 25 -35 55 Q -12 22 20 0" />
            <path d="M 20 0 Q -35 -8 -55 12 Q -22 -4 20 0" />
            <path d="M 20 0 Q -25 -35 -40 -48 Q -18 -18 20 0" />
            <path d="M 20 0 Q 8 -42 -2 -62 Q 4 -32 20 0" />
            <path d="M 20 0 Q 45 -32 60 -42 Q 28 -16 20 0" />
            <path d="M 20 0 Q 55 2 70 18 Q 32 6 20 0" />
          </g>

          {/* Overlaid Halftone Dot Grid */}
          <g fill="url(#palm-dots-right)" pointerEvents="none">
            {/* Trunk */}
            <path d="M 0 120 Q 30 75 20 0 Q 23 0 12 120 Z" />
            {/* Fronds */}
            <path d="M 20 0 Q -25 25 -35 55 Q -12 22 20 0" />
            <path d="M 20 0 Q -35 -8 -55 12 Q -22 -4 20 0" />
            <path d="M 20 0 Q -25 -35 -40 -48 Q -18 -18 20 0" />
            <path d="M 20 0 Q 8 -42 -2 -62 Q 4 -32 20 0" />
            <path d="M 20 0 Q 45 -32 60 -42 Q 28 -16 20 0" />
            <path d="M 20 0 Q 55 2 70 18 Q 32 6 20 0" />
          </g>
        </svg>
      </motion.div>
    </>
  );
}
