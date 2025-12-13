import { teststack } from '../projects';

import TuiBox from './TuiBox';
import { useScrollFocus } from '../hooks/useScrollFocus';

export default function Skills() {
  const { itemRefs, activeIndex } = useScrollFocus();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
      <div ref={el => itemRefs.current[0] = el} className="h-full">
        <TuiBox title="Languages" className="h-full" isActive={activeIndex === 0}>
          <div className="flex flex-wrap gap-2 mt-2">
            {teststack.languages.map(lang => (
              <span key={lang} className="px-3 py-1 bg-bg-3 text-text-1 border border-border-light text-sm hover:border-accent-2 hover:text-accent-2 transition-colors rounded">
                {lang}
              </span>
            ))}
          </div>
        </TuiBox>
      </div>

      <div ref={el => itemRefs.current[1] = el} className="h-full">
        <TuiBox title="Technologies" className="h-full" isActive={activeIndex === 1}>
          <div className="flex flex-wrap gap-2 mt-2">
            {teststack.technologies.map(tech => (
              <span key={tech} className="px-3 py-1 bg-bg-3 text-text-1 border border-border-light text-sm hover:border-accent-2 hover:text-accent-2 transition-colors rounded">
                {tech}
              </span>
            ))}
          </div>
        </TuiBox>
      </div>

      <div ref={el => itemRefs.current[2] = el} className="h-full">
        <TuiBox title="Tools" className="h-full" isActive={activeIndex === 2}>
          <div className="flex flex-wrap gap-2 mt-2">
            {teststack.tools.map(tool => (
              <span key={tool} className="px-3 py-1 bg-bg-3 text-text-1 border border-border-light text-sm hover:border-accent-2 hover:text-accent-2 transition-colors rounded">
                {tool}
              </span>
            ))}
          </div>
        </TuiBox>
      </div>

      <div ref={el => itemRefs.current[3] = el} className="h-full">
        <TuiBox title="Concepts" className="h-full" isActive={activeIndex === 3}>
          <div className="flex flex-wrap gap-2 mt-2">
            {teststack.concepts.map(concept => (
              <span key={concept} className="px-3 py-1 bg-bg-3 text-text-1 border border-border-light text-sm hover:border-accent-2 hover:text-accent-2 transition-colors rounded">
                {concept}
              </span>
            ))}
          </div>
        </TuiBox>
      </div>
    </div>
  );
}
