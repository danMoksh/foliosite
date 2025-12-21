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
          
          // Silently update the URL without triggering a scroll or history jump
          // This keeps the URL in sync with the user's visual position
          // REMOVED hashes as requested ("clean URLs")
          const cleanId = newId === 'main' ? '/' : newId; // 'main' becomes root? Or keep 'main'? User asked "change #hero to main". Assuming they want to see 'main'.
          // Actually, if I use replaceState with just 'main', it's relative.
          // Let's use `/${newId}` to be safe, except for main maybe?
          // User said "change the sub domain #hero to main".
          // "remove the hashes from all other subdomains too".
          
          // If I simply put the ID, it replaces the last segment or appends?
          // replaceState(..., 'foo') replaces the current entry. The URL becomes .../foo relative to current base?
          // It's safer to use hash if we want to avoid 404s, but user insisted on removing hashes.
          // Using just the ID string as the 3rd argument. 
          
          if (window.location.hash !== `#${newId}` && !window.location.pathname.endsWith(newId)) {
             // We are not using hashes anymore, so checking hash is less relevant, but checking pathname is better.
             // But let's just force update if different.
             window.history.replaceState(null, null, newId);
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
