import { useState, useEffect, useRef } from 'react';

/**
 * Hook to manage mutually exclusive scroll focus.
 * Returns a ref to store item refs and the index of the currently active item.
 * 
 * @param {number} threshold - Intersection threshold (0.0 - 1.0)
 * @returns {{ itemRefs: React.MutableRefObject<Array<HTMLElement | null>>, activeIndex: number }}
 */
export const useScrollFocus = (threshold = 0.5) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run on mobile
    if (!isMobile) {
      setActiveIndex(-1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // We need to find which entry is the "most" visible or closest to center
        // But IntersectionObserver fires for *changes*.
        
        // Strategy:
        // 1. Update a map of currently visible items and their intersection ratios
        // 2. Pick the winner
        
        // However, a simpler approach for "Spotlight" is:
        // When an item crosses the threshold, if it has a higher ratio than others, it wins.
        // Or simply, the last one to cross the threshold "in" becomes active?
        // No, that might be jumpy.
        
        // Robust Strategy:
        // Check all observed items whenever *any* intersection changes.
        // Ideally, we'd query the observer, but we can't.
        // So we rely on the entries passed to the callback.
        
        // Actually, for a "Spotlight", we want the item closest to the center of the viewport.
        // IntersectionObserver with a specific rootMargin (e.g., "-40% 0px -40% 0px") creates a "strip" in the middle.
        // Anything intersecting that strip is "focused".
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the index of this element in our refs array
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        // Create a "focus zone" in the middle 20% of the screen
        // Top margin: -40%, Bottom margin: -40%
        // This means the element must be in the vertical center to trigger
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0 // Trigger as soon as it touches the center zone
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  return { itemRefs, activeIndex };
};
