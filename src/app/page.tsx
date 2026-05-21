'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Hero from '@/components/Hero';
import LineUp from '@/components/LineUp';
import Details from '@/components/Details';
import Footer from '@/components/Footer';
import TornPaperSplitReveal from '@/components/TornPaperSplitReveal';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isOpenStates, setIsOpenStates] = useState([true, false, false, false]);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });

  const goToSection = (targetIndex: number) => {
    if (isAnimating) return;
    if (targetIndex < 0 || targetIndex >= 4) return;
    if (targetIndex === currentSection) return;

    setIsAnimating(true);
    const isMovingDown = targetIndex > currentSection;

    if (isMovingDown) {
      // 1. Prepare intermediate sections to be immediately in place (y: 0%) but closed
      for (let i = currentSection + 1; i < targetIndex; i++) {
        if (sectionRefs.current[i]) {
          gsap.set(sectionRefs.current[i], { y: '0%' });
          setIsOpenStates(prev => {
            const next = [...prev];
            next[i] = false;
            return next;
          });
        }
      }

      const targetEl = sectionRefs.current[targetIndex];
      if (targetEl) {
        // Ensure the target starts from y: 100% and its cover is closed
        gsap.set(targetEl, { y: '100%' });
        setIsOpenStates(prev => {
          const next = [...prev];
          next[targetIndex] = false;
          return next;
        });

        // Slide the target section sheet UP to y: 0% using an ultra-smooth power4 ease
        gsap.to(targetEl, {
          y: '0%',
          duration: 0.9, // Slightly longer duration for a feather-soft deceleration
          ease: 'power4.out',
          onStart: () => {
            // Trigger the split open early (after 450ms) to blend sliding momentum with the tear
            setTimeout(() => {
              setIsOpenStates(prev => {
                const next = [...prev];
                next[targetIndex] = true;
                return next;
              });
            }, 450);
          },
          onComplete: () => {
            setCurrentSection(targetIndex);
            
            // Allow inputs after split finishes opening
            setTimeout(() => {
              setIsAnimating(false);
            }, 300);
          }
        });
      } else {
        setIsAnimating(false);
      }
    } else {
      // Moving UP (Scrolling up or jumping to an earlier section)
      // 1. First, rip the current active cover closed
      setIsOpenStates(prev => {
        const next = [...prev];
        next[currentSection] = false;
        return next;
      });

      // 2. Wait for the closing animation to partially complete (overlap for fluidity)
      setTimeout(() => {
        // Prepare target section's cover to be open once revealed
        setIsOpenStates(prev => {
          const next = [...prev];
          next[targetIndex] = true;
          return next;
        });

        // Slide down the sections from currentSection down to targetIndex + 1
        const elementsToAnimate = [];
        for (let i = currentSection; i > targetIndex; i--) {
          if (sectionRefs.current[i]) {
            elementsToAnimate.push(sectionRefs.current[i]);
          }
        }

        gsap.to(elementsToAnimate, {
          y: '100%',
          duration: 0.9,
          ease: 'power4.inOut',
          stagger: 0.05, // Faster stagger for cleaner response
          onComplete: () => {
            setCurrentSection(targetIndex);
            setIsAnimating(false);
          }
        });
      }, 300); // 300ms delay overlaps perfectly with the closing spring
    }
  };

  useEffect(() => {
    // 1. Wheel listener with a robust cooldown of 900ms
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Block default scrolling completely

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;
      if (isAnimating) return;

      if (e.deltaY > 5) {
        // Scroll down
        if (currentSection < 3) {
          lastScrollTime.current = now;
          goToSection(currentSection + 1);
        }
      } else if (e.deltaY < -5) {
        // Scroll up
        if (currentSection > 0) {
          lastScrollTime.current = now;
          goToSection(currentSection - 1);
        }
      }
    };

    // 2. Touch swipe listeners
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      if (e.changedTouches.length > 0) {
        const deltaY = e.changedTouches[0].clientY - touchStart.current.y;
        const deltaX = e.changedTouches[0].clientX - touchStart.current.x;

        // Detect swipe if absolute vertical movement is > 50px and larger than horizontal movement
        if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
          const now = Date.now();
          if (now - lastScrollTime.current < 900) return;

          if (deltaY < 0) {
            // Swiped up -> scroll down to next section
            if (currentSection < 3) {
              lastScrollTime.current = now;
              goToSection(currentSection + 1);
            }
          } else {
            // Swiped down -> scroll up to previous section
            if (currentSection > 0) {
              lastScrollTime.current = now;
              goToSection(currentSection - 1);
            }
          }
        }
      }
    };

    // 3. Keyboard events (ArrowUp, ArrowDown, PageUp, PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < 3) {
          lastScrollTime.current = now;
          goToSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          lastScrollTime.current = now;
          goToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isAnimating]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Scroll Progress Indicator dots */}
      <ScrollProgress
        currentSection={currentSection}
        onSectionChange={goToSection}
      />

      {/* Hero Section (Index 0) */}
      <div
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="fixed inset-0 w-full h-screen"
        style={{ zIndex: 10 }}
      >
        <div className="w-full h-full overflow-y-auto">
          <Hero />
        </div>
      </div>

      {/* LineUp Section (Index 1) */}
      <div
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="fixed inset-0 w-full h-screen"
        style={{ zIndex: 20, transform: 'translateY(100%)' }}
      >
        <TornPaperSplitReveal
          coverColor="bg-xp-alabaster"
          isOpen={isOpenStates[1]}
          className="w-full h-full"
        >
          <div className="w-full h-full overflow-y-auto bg-xp-alabaster">
            <LineUp />
          </div>
        </TornPaperSplitReveal>
      </div>

      {/* Details Section (Index 2) */}
      <div
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="fixed inset-0 w-full h-screen"
        style={{ zIndex: 30, transform: 'translateY(100%)' }}
      >
        <TornPaperSplitReveal
          coverColor="bg-xp-gold"
          isOpen={isOpenStates[2]}
          className="w-full h-full"
        >
          <div className="w-full h-full overflow-y-auto bg-xp-gold">
            <Details />
          </div>
        </TornPaperSplitReveal>
      </div>

      {/* Footer Section (Index 3) */}
      <div
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="fixed inset-0 w-full h-screen"
        style={{ zIndex: 40, transform: 'translateY(100%)' }}
      >
        <TornPaperSplitReveal
          coverColor="bg-xp-dark"
          isOpen={isOpenStates[3]}
          className="w-full h-full"
        >
          <div className="w-full h-full overflow-y-auto bg-xp-dark">
            <Footer />
          </div>
        </TornPaperSplitReveal>
      </div>
    </main>
  );
}
