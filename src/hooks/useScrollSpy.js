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
          
          // Map IDs to clean paths
          let path;
          if (newId === 'main') {
            path = '/'; 
          } else {
            path = `/${newId}`;
          }

          if (window.location.pathname !== path) {
             window.history.replaceState(null, null, path);
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
