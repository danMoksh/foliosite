import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";

import Hero from "./components/Hero";
import Socials from "./components/Socials";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import About from "./components/About";
import Footer from "./components/Footer";
/* import ResumeSection from "./components/ResumeSection"; */
import { ChatProvider } from "./contexts/ChatContext";
import Chat from "./components/chatbot/Chat";

const SimpleReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const RevealOnScroll = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const BlurReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

const CollapsibleSection = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <section id={id} className="my-16 pt-16 -mt-16">
      <RevealOnScroll>
        <div
          className="flex items-center cursor-pointer mb-8"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BlurReveal>
            <h2 className="text-2xl font-bold">{title}</h2>
          </BlurReveal>
          <motion.span
            className="ml-2"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            ►
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, delay: 0.1, ease: "easeOut" },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, ease: "easeIn" },
                },
              }}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              style={{
                overflow: isOpen && !isAnimating ? "visible" : "hidden",
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </RevealOnScroll>
    </section>
  );
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-transparent border border-accent-1 text-accent-1 flex items-center justify-center transition-all z-50 hover:bg-accent-1/10 hover:text-text-1 active:translate-y-0.5"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
};

import BlogSection from "./components/BlogSection";

// ... previous imports ...

import { useScrollSpy } from "./hooks/useScrollSpy";

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Initialize ScrollSpy
  useScrollSpy([
    "main",
    "about",
    "experience",
    "projects",
    "skills",
    "socials",
  ]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      if (window.location.hash === "#blog") {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle initial hash on mount
  useEffect(() => {
    if (window.location.hash) {
      setCurrentHash(window.location.hash);
    }
  }, []);

  const showBlog = currentHash === "#blog";

  if (showBlog) {
    return (
      <ChatProvider>
        <div className="bg-bg-4 text-text-1 min-h-screen font-mono selection:bg-accent-2 selection:text-bg-4">
          <BlogSection
            onExit={() => {
              window.location.hash = "";
            }}
          />
          <Chat />
        </div>
      </ChatProvider>
    );
  }

  return (
    <ChatProvider>
      <div className="bg-bg-4 text-text-1 min-h-screen font-mono selection:bg-accent-2 selection:text-bg-4">
        <Header />

        <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
          <div id="main">
            <SimpleReveal>
              <Hero />
            </SimpleReveal>
          </div>

          <section id="about" className="my-16 pt-16 -mt-16">
            <RevealOnScroll>
              <BlurReveal>
                <h2 className="text-2xl font-bold mb-8">about me</h2>
              </BlurReveal>
              <About />
            </RevealOnScroll>
          </section>

          {/*           <CollapsibleSection id="resumes" title="Resume">
            <ResumeSection />
          </CollapsibleSection> */}
          {/* Lower Case Aesthetic */}
          <CollapsibleSection id="experience" title="experience">
            <Experience />
          </CollapsibleSection>

          <CollapsibleSection id="projects" title="projects">
            <Projects />
          </CollapsibleSection>

          <CollapsibleSection id="skills" title="tech stack & tools">
            <Skills />
          </CollapsibleSection>

          <section id="socials" className="mt-16 mb-0 pt-16 -mt-16">
            <RevealOnScroll>
              <BlurReveal>
                <h2 className="text-2xl font-bold mb-8">socials</h2>
              </BlurReveal>
              <Socials />
            </RevealOnScroll>
          </section>
        </div>

        <Footer />
        <BackToTopButton />
        <Chat />
      </div>
    </ChatProvider>
  );
}
