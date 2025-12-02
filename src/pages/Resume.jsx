import React from "react";
import { useEffect, useState } from "preact/hooks";
import { resumeProjects } from "./resumeProjects.jsx";

export default function Resume() {
  const [resumeType, setResumeType] = useState("default"); // changed from systems to default
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const type = params.get("type") || "default"; // changed from systems to default
    const photo = params.has("photo");
    setResumeType(type);
    setShowPhoto(photo);
    console.log("Photo param exists:", photo);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full flex justify-center">
      <div
        className="a4 w-[210mm] h-[297mm] bg-white text-black p-[6mm] text-[10pt] leading-[1.2] box-border relative normal-case tracking-normal shadow-lg my-8"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <div className="print:hidden fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-4 text-[10pt] border border-black rounded bg-white shadow hover:bg-gray-100"
          >
            Print
          </button>
          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className="flex items-center gap-2 px-6 py-2 text-[10pt] border border-black rounded bg-white shadow hover:bg-gray-100"
          >
            {showPhoto ? "Hide Photo" : "Show Photo"}
          </button>
        </div>
        <header className="flex items-start gap-[8mm] mb-[4pt]">
          <div className="flex-1">
            <h1 className="text-center text-[16pt] mb-[3pt]">
              Moksh Dandotiya
            </h1>
            <div className="contact-info text-center mb-[4pt] flex flex-col items-center">
              <div className="contact-row flex justify-center flex-wrap mb-[1pt] w-full">
                <span className="contact-item flex items-center mx-[4pt] whitespace-nowrap text-[8pt]">
                  <img
                    className="icon w-[12pt] h-[12pt] mr-[3pt]"
                    src="/github.svg"
                    alt="GitHub"
                  />
                  <a
                    target="_blank"
                    href="https://github.com/Mokshda22"
                    className="no-underline text-black border-b border-black"
                  >
                    https://github.com/danMoksh
                  </a>
                </span>
                <span className="contact-item flex items-center mx-[4pt] whitespace-nowrap text-[8pt]">
                  <img
                    className="icon w-[12pt] h-[12pt] mr-[3pt]"
                    src="/linkedin.svg"
                    alt="LinkedIn"
                  />
                  <a
                    target="_blank"
                    href="https://linkedin.com/in/moksh-dandotiya/"
                    className="no-underline text-black border-b border-black"
                  >
                    https://linkedin.com/in/danMoksh/
                  </a>
                </span>
              </div>
              <div className="contact-row flex justify-center flex-wrap mb-[1pt] w-full">
                <span className="contact-item flex items-center mx-[4pt] whitespace-nowrap text-[8pt]">
                  <img
                    className="icon w-[12pt] h-[12pt] mr-[3pt]"
                    src="/email.svg"
                    alt="Email"
                  />
                  <a
                    href="mailto:mokshdandotiya@gmail.com"
                    className="no-underline text-black border-b border-black"
                  >
                    moksh@duck.com
                  </a>
                </span>
                {/*                 <span className="contact-item flex items-center mx-[4pt] whitespace-nowrap text-[8pt]">
                  <img
                    className="icon w-[12pt] h-[12pt] mr-[3pt]"
                    src="/email.svg"
                    alt="Email"
                  />
                  <a
                    href="mailto:2022.moksh.dandotiya@ves.ac.in"
                    className="no-underline text-black border-b border-black"
                  >
                    22ai10mo816@mitsgwl.ac.in
                  </a>
                </span> */}
              </div>
            </div>
          </div>
        </header>
        {showPhoto && (
          <div className="absolute top-4 right-4">
            <img
              src="/photo.jpg"
              alt="Moksh Dandotiya"
              className="w-[25mm] h-[32mm] object-cover border border-gray-300"
            />
          </div>
        )}

        <main>
          <p className="intro mb-[6pt] text-[9pt]">
            Computer Engineering undergraduate interested in systems
            programming, backend development, robotics, and embedded systems.
          </p>

          <h2 className="border-b border-black text-[12pt] mt-[6pt] mb-[2pt]">
            Education
          </h2>
          <p>
            <strong>
              Madhav Institute of Technology and Sciences, Gwalior
            </strong>
            <span className="float-right">2022 – 2026</span>
            <br />
            <em>B.Tech in Information Technology (AI and Robotics)</em> —{" "}
            <em>Aggregate GPA:</em> 7.55
            <br />
            <em>Relevant courses:</em> Systems Programming and Compiler
            Construction, Theoretical Computer Science, DSA, Microprocessors,
            Digital Logic and Computer Architecture, Operating Systems, OOPM,
            DBMS, Probabilistic Graphical Models, Quantitative Analysis,
            Discrete Structures and Graph Theory, etc.
          </p>
          {/*           <ul className="pl-[10pt] mt-[1pt] mb-[3pt] list-disc">
            <li>
              NPTEL: Blockchain and Its Applications
            </li>
            <li>Code for Bharat (C4B) Finalist </li>
            <li>
              Showcase in Technoxian World Robotics Championship Expo - Vison
              Edge
            </li>
          </ul> */}

          <h2 className="border-b border-black text-[12pt] mt-[6pt] mb-[2pt]">
            Technical Skills
          </h2>
          <ul className="pl-[10pt] mt-[1pt] mb-[3pt] list-disc">
            <li>
              <strong>Languages:</strong> Embedded C, Python, Go, Java,
              JavaScript, Typescript
            </li>
            <li>
              <strong>Technologies:</strong> MERN Stack, PyTorch, TensorFlow,
              FastAPI
            </li>
            <li>
              <strong>Tools:</strong> Unix/Linux, Git, GDB, Make/CMake, Docker,
              Selenium
            </li>
            <li>
              <strong>Concepts:</strong> Systems Programming, Compiler Design,
              DSA, OS, Embedded Systems, ML/DL, Web Development, CI/CD
            </li>
          </ul>

          {/*           <div className="mb-[6pt]">
            <strong>Company 2</strong>{" "}
            <span className="float-right">YearXXXX</span>
            <br />
            <span className="italic">Intern</span>
            <ul className="pl-[10pt] mt-[1pt] mb-[3pt] list-disc">
              <li>
              </li>
              <li>
              </li>
            </ul>
          </div>
          <div className="mb-[6pt]">
            <strong>Company 3</strong>{" "}
            <span className="float-right">yearXXXX</span>
            <br />
            <span className="italic">Intern</span>
            <ul className="pl-[10pt] mt-[1pt] mb-[3pt] list-disc">
              <li>
              </li>
              <li></li>
            </ul>
          </div> */}

          <h2 className="border-b border-black text-[12pt] mt-[6pt] mb-[2pt]">
            Notable Projects
          </h2>
          {resumeProjects[resumeType]}

          <h2 className="border-b border-black text-[12pt] mt-[6pt] mb-[2pt]">
            Achievements
          </h2>
          <ul className="pl-[10pt] mt-[1pt] mb-[3pt] list-disc">
            <li>
              <strong>Hacksagon 2025 Winner</strong> in Disaster and Emergency
              Response, IIITM Gwalior
            </li>
            {/*             <li>
              Cohosted blah blah blah{" "}
              <a
                href=""
                target="_blank"
                className="no-underline text-black border-b border-black"
              >
                (uhm)
              </a>
              , 2025.
            </li> */}
            <li>Submitted a solution in GDSC Solution Challenge, 2024.</li>
            <li>Technoxian World Robotics Championship Expo – Vision Edge</li>
          </ul>
        </main>
      </div>
    </div>
  );
}
