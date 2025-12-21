import TuiBox from "./TuiBox";

export default function About({ onNavigateToBlog }) {
  return (
    <TuiBox className="space-y-6">
      <p className="text-text-2 leading-relaxed">
        B.Tech '26 @ MITS Gwalior (AI & Robotics). A FOSS fanatic started with
        custom ROMs, modding applications and UAVs; now focused on systems
        programming, full-stack, and robotics.
      </p>
      <p className="text-text-2 leading-relaxed">
        I love chess and debates. Currently learning German to read Nietzsche's
        Beyond Good and Evil as it was written.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border-light">
        {/*         <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 bg-bg-3 hover:bg-hover hover:text-accent-1 hover:border-accent-1 transition-all duration-300 flex items-center justify-center border border-border-light rounded group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
          </svg>
          Read on Medium
        </a> */}



        <a
          href="#blog"
          onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             window.location.hash = "#blog";
          }}
          className="px-4 py-3 bg-bg-3 hover:bg-hover hover:text-accent-1 hover:border-accent-1 transition-all duration-300 flex items-center justify-center border border-border-light rounded group cursor-pointer"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"></path>
            <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z"></path>
          </svg>
          visit my blog
        </a>
      </div>
    </TuiBox>
  );
}
