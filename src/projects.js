class Project {
  constructor(name, link, desc, skills, wip = false, hobby = false) {
    this.name = name;
    this.link = link;
    this.desc = desc;
    this.skills = skills;
    this.wip = wip;
    this.hobby = hobby;
  }
}

export const projects = [
  new Project(
    "Vision Edge",
    "https://github.com/danMoksh/visionEdge",
    "Developed a coordinated drone and ground-rover system (Jetson Nano) for FOD detection, featuring a custom ROS navigation stack with EKF sensor fusion and optimized computer vision.",
    [
      "Python",
      "YOLOv11",
      "RT-DETR",
      "Weighted Box Fusion",
      "UAVs",
      "Jetson Nano",
      "ROS",
      "Sensor Fusion",
      "PID Control",
      "STM32",
      "RestAPI",
      "SocketIO / WebSockets",
      "Multithreading",
      "MAVLink",
      "I2C / UART / Serial",
      "3d Printing",
      "Microcontrollers",
      "CUDA / NVIDIA Jetpack",
      "SLAM",
    ],
    true,
    false
  ),
  /*   new Project(
    "Fir",
    "https://codepen.io/moksh/pen/dyYyWGx",
    "A genetic algorithm written from scratch to simulate the behavior of fireflies. Hobby project from 10th grade.",
    ["JavaScript", "Genetic Algorithms", "Web Development"],
    false,
    true
  ), */
  /*   new Project(
    "game of life",
    "https://github.io//",
    "A simple implementation of Conway's Game of Life in C/WASM with a web interface and custom rules. Hobby project from 11th grade.",
    ["C", "WASM", "Web Development", "Algorithms", "Data Structures"],
    false,
    true
  ), */
];

export const teststack = {
  languages: [
    "Embedded C",
    "Hex",
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "Latex",
    "Markdown",
  ],
  technologies: [
    // backend
    "FastAPI",
    "Flask",
    "Express",
    "Node.js",
    "SQL",
    "MongoDB",
    // frontend/Full-stack
    "React",
    "Tailwind",
    "Vite",
    "Vercel",
    "Mermaid.js",
    // robotics
    "Robot Operating System",
    "OpenCV",
    "Jupyter",
    "Gradle",
    "QEMU",
    // design
    "Figma",
    "Canva",
  ],
  tools: [
    "Linux/UNIX",
    "Git",
    "GDB",
    "Make/CMake",
    "Docker",
    "Jetson Nano",
    "Raspberry Pi",
    "tmux",
    "nvim",
    "ssh",
  ],
  concepts: [
    "Systems Programming",
    "Virtual Machines",
    "Data Structures",
    "3D Printing",
    "ML/DL",
    "Web Development",
    "Cloud Computing",
    "Distributed Systems",
    "Computer Architecture",
    "Robot Kinematics",
    "Microcontrollers",
    "PID Control",
  ],
};

class Experience {
  constructor(company, position, description, skills, date) {
    this.company = company;
    this.position = position;
    this.description = description;
    this.skills = skills;
    this.date = date;
  }
}

export const experiences = [];

class Achievement {
  constructor(title, description, year) {
    this.title = title;
    this.description = description;
    this.year = year;
  }
}

export const achievements = [
  new Achievement(
    "Hacksagon 2025 Winner, IIITM Gwalior",
    "Won the first prize in Hacksagon 2025 with Project Vision Edge under Disaster Management and Emergency Response Track",
    2025
  ),
  new Achievement(
    "Code4Bharat (C4B) Finalist",
    "Top 22 Finalists among a 1000+ teams participating in Code 4 Bharat Hackathon, Gurugram",
    2025
  ),
  new Achievement(
    "Technoxian World Robotics Expo Project Showcase",
    "Had a chance to showcase our Project VisionEdge in Technoxian 2025 World Cup",
    2025
  ),
  /*   new Achievement(
    "Working in co-ordination with Air Force, Gwalior for our Project Solution Vision Edge",
    "Working in co-ordination with Air Force Gwalior for our Project Solution Vision Edge",
    2025
  ),
  new Achievement(
    "Worked with Shree Mahanaaryaman Scindia for their Project SmartDonationBox",
    "Made Smart Donation Box project under the guidance of Founders of Ethara AI Mr. Suryansh Rana and Shree Mahanaaryaman Scindia",
    2024
  ), */
  new Achievement(
    "GDSC Solution Challenge Participant",
    "Submitted a solution in the Google Developer Student Clubs Solution Challenge, addressing real-world problems using Google technologies.",
    2024
  ),
];
