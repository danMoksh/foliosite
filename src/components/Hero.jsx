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
          <span className="group-hover:transition-transform">{icon}</span>
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
      const spans = preElement.querySelectorAll(".glow-char");
      const rect = preElement.getBoundingClientRect();

      spans.forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanX = spanRect.left - rect.left + spanRect.width / 2;
        const spanY = spanRect.top - rect.top + spanRect.height / 2;

        const distanceToCursor = Math.sqrt(
          Math.pow(lastMouseX - spanX, 2) + Math.pow(lastMouseY - spanY, 2)
        );

        let intensity = 0;

        // Cursor glow
        const cursorMaxDistance = 60;
        if (distanceToCursor < cursorMaxDistance) {
          const cursorIntensity = Math.max(0, 1 - distanceToCursor / cursorMaxDistance);
          intensity = Math.max(intensity, cursorIntensity);
        }

        if (intensity > 0.1) {
          span.style.textShadow = `0 0 ${15 * intensity}px var(--accent-1), 0 0 ${5 * intensity}px #ffffff`;
          span.style.filter = `brightness(${1 + intensity * 0.8})`;
          span.style.color = "var(--accent-1)";
        } else {
          span.style.textShadow = "";
          span.style.filter = "";
          span.style.color = "";
        }

        // Drop animation trigger
        if (distanceToCursor < 15 && !span.classList.contains("dropping")) {
          span.classList.add("dropping");
          setTimeout(() => span.classList.remove("dropping"), 2000);
        }
      });
    };

    const handleMouseMove = (e) => {
      const rect = preElement.getBoundingClientRect();
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX - rect.left;
      lastMouseY = clientY - rect.top;

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
      const spans = preElement.querySelectorAll(".glow-char");
      spans.forEach((span) => {
        span.style.filter = "";
        span.style.textShadow = "";
        span.style.color = "";
      });
    };

    preElement.addEventListener("mousemove", handleMouseMove);
    preElement.addEventListener("mouseleave", handleMouseLeave);
    preElement.addEventListener("touchmove", handleMouseMove, { passive: true });
    preElement.addEventListener("touchstart", handleMouseMove, { passive: true });
    preElement.addEventListener("touchend", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      preElement.removeEventListener("mousemove", handleMouseMove);
      preElement.removeEventListener("mouseleave", handleMouseLeave);
      preElement.removeEventListener("touchmove", handleMouseMove);
      preElement.removeEventListener("touchstart", handleMouseMove);
      preElement.removeEventListener("touchend", handleMouseLeave);
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

  const asciiArt = `███╗   ███╗  ██████╗  ██╗  ██╗ ███████╗ ██╗  ██╗
████╗ ████║ ██╔═══██╗ ██║ ██╔╝ ██╔════╝ ██║  ██║
██╔████╔██║ ██║   ██║ █████╔╝  ███████╗ ███████║
██║╚██╔╝██║ ██║   ██║ ██╔═██╗  ╚════██║ ██╔══██║
██║ ╚═╝ ██║ ╚██████╔╝ ██║  ██╗ ███████║ ██║  ██║
╚═╝     ╚═╝  ╚═════╝  ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝

██████╗   █████╗  ███╗   ██╗ ██████╗   ██████╗  ████████╗ ██╗ ██╗   ██╗  █████╗ 
██╔══██╗ ██╔══██╗ ████╗  ██║ ██╔══██╗ ██╔═══██╗ ╚══██╔══╝ ██║ ╚██╗ ██╔╝ ██╔══██╗
██║  ██║ ███████║ ██╔██╗ ██║ ██║  ██║ ██║   ██║    ██║    ██║  ╚████╔╝  ███████║
██║  ██║ ██╔══██║ ██║╚██╗██║ ██║  ██║ ██║   ██║    ██║    ██║   ╚██╔╝   ██╔══██║
██████╔╝ ██║  ██║ ██║ ╚████║ ██████╔╝ ╚██████╔╝    ██║    ██║    ██║    ██║  ██║
╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═════╝     ╚═╝    ╚═╝    ╚═╝    ╚═╝  ╚═╝`;

  return (
    <section className="py-20">
      <div className="overflow-hidden mb-8 relative">
        <style>
          {`
            @keyframes dropFade {
              0% { transform: translateY(0) scale(1); opacity: 1; }
              100% { transform: translateY(80px) scale(0.5); opacity: 0; }
            }
            .dropping {
              animation: dropFade 1s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
              pointer-events: none;
            }
          `}
        </style>
        <pre
          ref={preRef}
          className="text-accent-1 font-mono leading-none text-[0.35rem] xs:text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] whitespace-pre select-none relative"
        >
          {isMobile
            ? asciiArt
            : asciiArt.split("").map((char, index) => {
                if (char === "\n") return "\n";
                return (
                  <span 
                    key={index} 
                    className={char !== " " ? "glow-char inline-block transition-all duration-75" : "inline-block"}
                  >
                    {char}
                  </span>
                );
              })}
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
