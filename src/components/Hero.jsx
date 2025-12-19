import React from "react";

const ScanlineButton = ({ href, children }) => {
  return (
    <a
      href={href}
      className="px-6 py-3 border border-accent-1 text-accent-1 font-bold tracking-wider btn-scanline transition-colors"
    >
      {children}
    </a>
  );
};

const BracketButton = ({ href, children }) => {
  return (
    <a
      href={href}
      className="px-6 py-3 text-text-1 font-medium btn-bracket hover:text-accent-1 transition-colors"
    >
      {children}
    </a>
  );
};

const UnderlineButton = ({ href, children }) => {
  return (
    <a
      href={href}
      className="px-6 py-3 text-text-2 font-medium btn-underline hover:text-accent-1 transition-colors"
    >
      {children}
    </a>
  );
};

export default function Hero() {
  const preRef = React.useRef(null);

  React.useEffect(() => {
    const preElement = preRef.current;
    if (!preElement) return;

    let rafId = null;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const updateGlow = () => {
      const spans = preElement.querySelectorAll(".hash-glow");
      const rect = preElement.getBoundingClientRect();

      spans.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanX = spanRect.left - rect.left + spanRect.width / 2;
        const spanY = spanRect.top - rect.top + spanRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(lastMouseX - spanX, 2) + Math.pow(lastMouseY - spanY, 2)
        );

        const maxDistance = 60; // Reduced from 80 for better performance
        const intensity = Math.max(0, 1 - distance / maxDistance);

        if (intensity > 0.1) {
          // Simplified glow - single text-shadow only
          span.style.textShadow = `0 0 ${10 * intensity}px var(--accent-1)`;
          span.style.filter = `brightness(${1 + intensity * 0.5})`;
        } else {
          span.style.textShadow = "";
          span.style.filter = "";
        }
      });
    };

    const handleMouseMove = (e) => {
      const rect = preElement.getBoundingClientRect();
      lastMouseX = e.clientX - rect.left;
      lastMouseY = e.clientY - rect.top;

      // Use RAF to throttle updates
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateGlow();
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      const spans = preElement.querySelectorAll(".hash-glow");
      spans.forEach((span) => {
        span.style.filter = "";
        span.style.textShadow = "";
      });
    };

    preElement.addEventListener("mousemove", handleMouseMove);
    preElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      preElement.removeEventListener("mousemove", handleMouseMove);
      preElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const asciiArt = `##     ##  #######  ##    ##  ######  ##     ## 
###   ### ##     ## ##   ##  ##    ## ##     ## 
#### #### ##     ## ##  ##   ##       ##     ## 
## ### ## ##     ## #####     ######  ######### 
##     ## ##     ## ##  ##         ## ##     ## 
##     ## ##     ## ##   ##  ##    ## ##     ## 
##     ##  #######  ##    ##  ######  ##     ## 

########     ###    ##    ## ########   #######  ######## #### ##    ##    ###    
##     ##   ## ##   ###   ## ##     ## ##     ##    ##     ##   ##  ##    ## ##   
##     ##  ##   ##  ####  ## ##     ## ##     ##    ##     ##    ####    ##   ##  
##     ## ##     ## ## ## ## ##     ## ##     ##    ##     ##     ##    ##     ## 
##     ## ######### ##  #### ##     ## ##     ##    ##     ##     ##    ######### 
##     ## ##     ## ##   ### ##     ## ##     ##    ##     ##     ##    ##     ## 
########  ##     ## ##    ## ########   #######     ##    ####    ##    ##     ##`;

  return (
    <section className="py-20">
      <div className="overflow-hidden mb-8">
        <pre
          ref={preRef}
          className="text-accent-1 font-mono leading-none text-[0.35rem] xs:text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] whitespace-pre select-none"
        >
          {isMobile
            ? asciiArt
            : asciiArt.split("").map((char, index) => (
                <span key={index} className={char === "#" ? "hash-glow" : ""}>
                  {char}
                </span>
              ))}
        </pre>
      </div>
      <p className="text-text-3 mb-8 max-w-2xl">
        I am a programmer, modder, reverse engineer focused on backend and low
        level programming. I love tinkering with robotics, embedded systems and
        AOSP. Fedora btw.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <ScanlineButton href="#socials">Connect</ScanlineButton>
        <div className="flex gap-4">
          <BracketButton href="#projects">Projects</BracketButton>
          <BracketButton href="#skills">Skills</BracketButton>
        </div>
      </div>
    </section>
  );
}
