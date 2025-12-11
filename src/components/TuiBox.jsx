import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TuiBox = ({ children, className = '', title, animate = true, isActive: controlledIsActive }) => {
  const [internalIsActive, setInternalIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Determine if we are in "controlled" mode (parent manages state)
  const isControlled = controlledIsActive !== undefined;
  
  // Use controlled state if available, otherwise internal state
  const isActive = isControlled ? controlledIsActive : internalIsActive;

  // Detect if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for scroll-into-view on mobile
  // ONLY run this if NOT controlled. If controlled, parent handles observation.
  useEffect(() => {
    if (isControlled || !isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger popup when 20% of card is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            if (!hasAnimatedRef.current) {
              setInternalIsActive(true);
              hasAnimatedRef.current = true;
              
              // Auto-dismiss after 2 seconds to avoid overwhelming the UI
              setTimeout(() => {
                setInternalIsActive(false);
              }, 2000);
            }
          }
        });
      },
      {
        threshold: [0.2], // Trigger when 20% visible
        rootMargin: '0px'
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isMobile, isControlled]);

  return (
    <motion.div
      ref={containerRef}
      initial={animate ? { opacity: 0, y: 20 } : {}}
      whileInView={animate ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full h-full group"
    >
      {/* Shadow Block (Stationary) */}
      <div 
        className="absolute inset-0 w-full h-full border border-accent-1 brutalist-card-shadow-pattern z-0"
      />

      {/* Main Card (Moves on Hover/Active) */}
      <div
        className={`
          relative z-10 
          w-full h-full
          bg-bg-2 
          border border-border
          p-6 
          transition-transform duration-200 cubic-bezier(0.25, 0.46, 0.45, 0.94)
          group-hover:-translate-x-1.5 group-hover:-translate-y-1.5
          group-hover:border-accent-1
          ${isActive ? '-translate-x-1.5 -translate-y-1.5 !border-accent-1 z-50' : ''}
          ${className}
        `}
      >
        {title && (
          <div className={`
            absolute -top-3 left-4 bg-bg-1 px-2 text-sm text-accent-1 
            font-bold tracking-wider border border-border 
            group-hover:border-accent-1 transition-colors duration-300
            ${isActive ? '!border-accent-1' : ''}
          `}>
            {title}
          </div>
        )}

        {children}
      </div>
    </motion.div>
  );
};

export default TuiBox;
