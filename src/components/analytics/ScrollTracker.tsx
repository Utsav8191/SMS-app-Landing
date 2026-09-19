'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

export default function ScrollTracker() {
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;

          // Guard against divide by zero or very short documents
          if (documentHeight <= windowHeight) {
            ticking = false;
            return;
          }

          const scrollPercentage = Math.min(
            100,
            Math.round(((scrollTop + windowHeight) / documentHeight) * 100)
          );

          const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

          for (const milestone of milestones) {
            if (scrollPercentage >= milestone && !trackedMilestones.current.has(milestone)) {
              trackedMilestones.current.add(milestone);
              trackScrollDepth(milestone);
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
