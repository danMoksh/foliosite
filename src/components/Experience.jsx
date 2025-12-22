import { experiences, achievements } from "../projects";
import TuiBox from "./TuiBox";
import { useScrollFocus } from "../hooks/useScrollFocus";

export default function Experience() {
  // We need two separate focus managers because these are in different columns/sections
  // Or we can treat them as one big list if we want only ONE active across the whole section.
  // Let's treat them as separate lists for Work and Achievements since they are side-by-side on desktop
  // but stacked on mobile. On mobile, it's one long scroll.
  // So a single focus manager for the whole component makes sense for the "Spotlight" effect.

  const { itemRefs, activeIndex } = useScrollFocus();

  // Helper to calculate total index offset
  const workCount = experiences.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl mb-6 text-accent-2 font-bold tracking-wider">
          work experience
        </h3>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} ref={(el) => (itemRefs.current[index] = el)}>
              <TuiBox isActive={activeIndex === index}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-text-1">
                    {exp.company}
                  </h4>
                  <span className="text-xs text-accent-2 bg-bg-3 px-2 py-1 rounded border border-border-light font-mono">
                    {exp.date}
                  </span>
                </div>
                <p className="text-accent-1 mb-4 font-medium">{exp.position}</p>
                <ul className="list-disc list-inside text-sm text-text-3 space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-light">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-bg-3 text-text-2 px-2 py-1 border border-border-light rounded hover:border-accent-2 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TuiBox>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl mb-6 text-accent-3 font-bold tracking-wider">
          achievements
        </h3>
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[workCount + index] = el)}
            >
              <TuiBox isActive={activeIndex === workCount + index}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-text-1">
                    {achievement.title}
                  </h4>
                  <span className="text-xs text-accent-3 bg-bg-3 px-2 py-1 rounded border border-border-light font-mono">
                    {achievement.year}
                  </span>
                </div>
                <p className="text-sm text-text-3 leading-relaxed">
                  {achievement.description}
                </p>
              </TuiBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
