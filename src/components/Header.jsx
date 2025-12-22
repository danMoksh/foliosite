import { useState, useEffect } from "react";
import { useTextScramble } from "../hooks/useTextScramble";
import ChatToggle from "./chatbot/ChatToggle";

const NavItem = ({ name, href, isMobile, onClick }) => {
  const { displayText, scramble } = useTextScramble(name);

  return (
    <li>
      <a
        href={href}
        onMouseEnter={scramble}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick(); // Close mobile menu if exists
          
          // Smooth scroll to section
          const targetId = href.replace('#', '');
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            
            // Clean URL update
            const path = targetId === 'main' ? '/' : `/${targetId}`;
            window.history.pushState(null, null, path);
          }
        }}
        className={`
          ${
            isMobile
              ? "block px-4 py-2"
              : "px-3 py-2 text-sm uppercase tracking-wide inline-block"
          }
          font-mono transition-all duration-200
          text-text-1 hover:text-accent-1
          border border-transparent hover:border-accent-1
          hover:bg-transparent
        `}
      >
        {isMobile ? `> ${displayText}` : `[${displayText}]`}
      </a>
    </li>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchTimeout, setGlitchTimeout] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Function to schedule a single glitch event
  const scheduleGlitch = () => {
    // Clear any existing timeout to prevent multiple schedules
    if (glitchTimeout) clearTimeout(glitchTimeout);

    const nextInterval = Math.random() * (30000 - 20000) + 20000; // 20-30 seconds

    const id = setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 500); // Glitch duration 0.5s
    }, nextInterval);

    setGlitchTimeout(id);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (glitchTimeout) clearTimeout(glitchTimeout);
    };
  }, [glitchTimeout]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
  ];

  return (
    <header className="fixed top-0 left-0 w-screen bg-bg-1/80 backdrop-blur-md z-[100] border-b-2 border-border">
      <div className="w-full px-4 py-4 flex justify-between items-center relative z-10">
        <a
          href="#"
          className="text-2xl font-bold tracking-tighter flex perspective-1000"
        >
          {["~", "/", "m", "o", "k", "s", "h"].map((char, index) => (
            <span
              key={index}
              onMouseEnter={(e) => {
                e.target.classList.toggle("flipped");
                scheduleGlitch(); // Start timer on interaction
              }}
              className={`text-accent-1 transition-all duration-500 ease-in-out inline-block cursor-default ${
                isGlitching ? "glitch-active" : ""
              }`}
            >
              {char}
            </span>
          ))}
        </a>

        {/* Desktop Navigation & ChatToggle */}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-text-1 hover:text-accent-1 border border-transparent hover:border-accent-1 transition-all duration-200"
              >
                {isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              {isMenuOpen && (
                <nav className="absolute right-0 mt-2 w-48 bg-bg-1 border border-border shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] py-2 z-20">
                  <ul className="flex flex-col">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.name}
                        name={item.name}
                        href={item.href}
                        isMobile={true}
                        onClick={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          ) : (
            <nav>
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    isMobile={false}
                  />
                ))}
              </ul>
            </nav>
          )}

          {/* ChatToggle always visible */}
          <ChatToggle />
        </div>
      </div>
    </header>
  );
}
