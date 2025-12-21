import React from "react";

const DitherShadowButton = ({ href, children, target, rel, icon }) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="relative inline-block group cursor-pointer no-underline"
      style={{
        /* Ensure the container is large enough for the shadow */
        marginRight: "8px",
        marginBottom: "8px",
      }}
    >
      {/* The Shadow (Stationary, Dithered) */}
      <div className="absolute top-2 left-2 w-full h-full border border-accent-1 dither-shadow-bg z-0 transition-transform duration-200"></div>

      {/* The Button (Moves) */}
      <div
        className="
        relative z-10 
        bg-bg-1 
        border border-accent-1 
        px-6 py-3 
        font-mono font-bold tracking-wider text-accent-1
        flex items-center gap-2
        transition-transform duration-150 ease-out
        group-active:translate-x-2 group-active:translate-y-2
        group-hover:text-text-1 group-hover:bg-accent-1/10
      "
      >
        {icon && (
          <span className="group-hover:scale-110 transition-transform">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </div>
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
        <DitherShadowButton href="#socials">connect</DitherShadowButton>
        <div className="flex gap-4">
          <DitherShadowButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
            }
          >
            resume
          </DitherShadowButton>
        </div>
      </div>
    </section>
  );
}
