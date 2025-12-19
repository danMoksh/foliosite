import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      // This margin creates a narrow "viewing line" in the center of the viewport
      // (top 45% ignored, bottom 45% ignored). The middle 10% is the active zone.
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newId = entry.target.id;
          setActiveId(newId);
          
          // Silently update the URL hash without triggering a scroll or history jump
          // This keeps the URL in sync with the user's visual position
          if (window.location.hash !== `#${newId}`) {
            window.history.replaceState(null, null, `#${newId}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};
