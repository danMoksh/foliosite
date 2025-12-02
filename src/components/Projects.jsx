import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../projects";
import TuiBox from "./TuiBox";
import { useScrollFocus } from "../hooks/useScrollFocus";

import MagneticWrapper from "./MagneticWrapper";

const Projects = () => {
  const { itemRefs, activeIndex } = useScrollFocus();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
      {projects.map((project, index) => (
        <a
          key={project.name}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
          ref={(el) => (itemRefs.current[index] = el)}
        >
          <TuiBox
            className="h-full flex flex-col"
            isActive={activeIndex === index}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-bold text-text-1 group-hover:text-accent-1 transition-colors">
                {project.name}
              </h4>
              <div className="flex gap-2">
                {project.wip && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-1 font-bold rounded border border-yellow-500/30">
                    WIP
                  </span>
                )}
                {project.hobby && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-200 px-2 py-1 font-bold rounded border border-cyan-500/30">
                    Hobby
                  </span>
                )}
              </div>
            </div>

            <p className="text-text-3 text-sm mb-6 flex-grow leading-relaxed">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-bg-3 text-text-4 px-2 py-1 border border-border-light rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-border-light">
              <MagneticWrapper className="inline-flex items-center text-accent-2 group-hover:text-accent-1 text-sm transition-colors">
                <span className="font-medium">View Project</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </MagneticWrapper>
            </div>
          </TuiBox>
        </a>
      ))}
    </div>
  );
};

export default Projects;
