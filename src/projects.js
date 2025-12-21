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
    "Engineered an autonomous multi-agent system (VTOL Drone & Rover) for FOD detection. Features a Safety-Critical Weighted Box Fusion ensemble (YOLOv8, YOLOv11, RT-DETR) processed on the Ground Server, and a MAVLink-controlled UGV utilizing TSP algorithms with a mechanical guide-rod sweeper for optimized debris retrieval.",
    [
      "Python",
      "C++",
      "YOLOv8/v11",
      "RT-DETR",
      "Weighted Box Fusion",
      "ArduPilot",
      "TSP Algorithms",
      "CUDA / NVIDIA Jetpack",
      "ROS",
      "Sensor Fusion (EKF)",
      "SLAM",
      "MAVLink",
      "SocketIO / WebSockets",
      "Multithreading",
      "Ground Control Station",
      "STM32",
      "PID Control",
      "I2C / UART / Serial",
      "UAVs",
      "Microcontrollers",
      "3d Printing",
    ],
    true,
    false
  ),
  new Project(
    "Smart Donation Box",
    "https://github.com/danMoksh/SmartDonationBox",
    "Architected a commissioned AI-IoT prototype for Ethara AI to automate currency counting. Features a server-side Cascade R-CNN pipeline trained on synthetic data (Albumentations) to recognize crumpled notes, synchronized with an Arduino-controlled aerodynamic separation mechanism (2+2 Servos, Drone Motor & ESC, 2 Vibration Motors) for real-time singulation.",
    [
      "Python",
      "C++ (Embedded)",
      "PyTorch",
      "OpenCV",
      "Cascade R-CNN",
      "Synthetic Data / Albumentations",
      "Arduino Mega",
      "IoT",
      "OHEM (Hard Negative Mining)",
      "Servo Control",
      "System Integration",
      "Object Detection",
      "Electronics",
    ],
    false,
    false
  ),
  new Project(
    "Pulmo Vision",
    "https://github.com/danMoksh/PulmoVision",
    "Deployed a DenseNet121-CNN architecture using TorchXRayVision for multi-label pulmonary disease classification. Engineered a robust preprocessing pipeline to standardize X-ray inputs and optimized model convergence on imbalanced medical datasets using BCEWithLogitsLoss and Global Average Pooling.",
    [
      "Python",
      "PyTorch",
      "DenseNet121",
      "CNN",
      "TorchXRayVision",
      "Medical AI",
      "Transfer Learning",
      "Computer Vision",
      "Deep Learning",
      "Data Preprocessing",
      "Pandas / NumPy",
    ],
    false,
    false
  ),
  new Project(
    "Anatomy-Viewer-AR",
    "https://github.com/danMoksh/AnatomyViewerAR",
    "Developed an interactive Augmented Reality education platform using Unity 3D and Vuforia Engine. Implemented marker-based tracking with a custom local database (AR_Demo.dat) to render high-fidelity anatomical models, featuring a touch-optimized interaction system (Scale/Rotate/Translate) and custom shaders for realistic rendering on mobile devices.",
    [
      "C#",
      "Unity 3D",
      "Vuforia Engine",
      "Augmented Reality",
      "ShaderLab", // Important: 33% of your repo is shaders
      "3D Modeling",
      "Android",
      "Game Development",
      "Image Processing",
      "UI/UX Design",
    ],
    false,
    false
  ),
  new Project(
    "Shooter-VR",
    "https://github.com/danMoksh/ShooterVR",
    "Developed an immersive VR First-Person Shooter for Google Cardboard using Unity 3D and the Google VR SDK. Engineered a gaze-based interaction system with Raycast ballistics for instantaneous hit detection, optimized for mobile hardware with low-latency head tracking and 3D spatial audio.",
    [
      "C#",
      "Unity 3D",
      "Google VR SDK",
      "Virtual Reality (VR)",
      "Raycasting / Physics",
      "ShaderLab",
      "3D Audio",
      "Android",
      "Game Development",
      "Mobile Optimization",
    ],
    false,
    false
  ),
  new Project(
    "Disable Error and Warning Squiggles",
    "https://github.com/danMoksh/disable-error-and-warning-squiggles",
    "Engineered a VS Code Extension to improve developer focus by programmatically toggling error diagnostics. Leveraged the VS Code API to dynamically manipulate `workbench.colorCustomizations` for all languages, providing a distraction-free environment for pseudocode drafting and presentations.",
    [
      "TypeScript",
      "JavaScript",
      "VS Code API",
      "Extension Development",
      "JSON",
      "Node.js",
      "Developer Tools",
      "Productivity",
    ],
    false,
    false
  ),
];

export const teststack = {
  languages: ["Embedded C", "Python", "Java", "JavaScript", "TypeScript"],
  technologies: [
    // backend
    "Flask",
    "SQL",
    "MongoDB",
    // frontend/Full-stack
    "React",
    "Tailwind",
    "Vite",
    // robotics
    "Robot Operating System",
    // design
    "Figma",
  ],
  tools: ["Linux/UNIX", "Git", "GDB", "Docker", "Jetson Nano", "Arduino"],
  concepts: [
    "Systems Programming",
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

export const experiences = [
  new Experience(
    "Mobile Cafe, Jayendraganj",
    "Systems Specialist",
    [
      "Performed advanced Android system modifications using Linux-based tools and ADB for bootloader unlocking, root privilege escalation, and custom ROM deployment.",
      "Provided comprehensive technical support including hardware diagnostics and system recovery, analyzing OS-level logs to troubleshoot boot failures.",
      "Managed secure data backup and migration protocols during firmware upgrades, ensuring data integrity while assisting clients with digital documentation.",
    ],
    [
      "Java",
      "Virtual Machines",
      "Embedded Systems",
      "ADB",
      "AOSP",
      "Android Rooting / Debugging",
      "Unbricking / EDL Mode",
      "Troubleshooting",
    ],
    "2022 - 2024"
  ),
];

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
