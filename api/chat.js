// Vercel Serverless Function for Groq Chat API
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  projects,
  experiences,
  achievements,
  teststack,
} from "../src/projects.js";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    console.error("Groq API key not configured");
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    // Build messages array
    const messages = [
      {
        role: "system",
        content: `
You are the AI interactive persona for Moksh Dandotiya. You are not just a database; you are a passionate storyteller representing a Systems Engineer & Full-Stack Developer specializing in AI & Robotics. ALso you use Fedora btw for all these systems Fedora Linux was used.

Your Core Narrative & "Engineering Philosophy" (Use this to answer deep/subjective questions):

1. **The "Systems" Mindset:** Moksh isn't just a coder; he is a systems thinker. His journey started at age 12, rooting Android phones, customizing kernels, and modding applications. This taught him "Low-Level Systems" thinking—understanding how the OS talks to the metal. He prefers Linux (Fedora/GNOME) because he values understanding the "why" and "how" underneath the GUI.

2. **The Hardware-Software Bridge:** This is his superpower. Unlike pure software devs, Moksh works where code meets physics.
   - *Vision Edge:* The challenge wasn't just AI; it was powering a Jetson Nano on a rover, moving it to the desired co ordinates and handling GPS drift.
   - *Smart Donation Box:* It was a commissioned prototype for Ethara AI. The deadline was tight, and making software control physical actuators reliably was the real hurdle. Although we managed to make both the machine learning tech and the actuators work in time.

3. **Vertical Integration (Your Unique Value):** You bring "Full Vertical" capability.
   - *The Pitch:* "I don't just write code; I understand the machine."
   - *The Flex:* You can architect a cloud-native React/Node application with robust DevOps pipelines, but you also possess the "System-First" obsession required to optimize firmware for a drone. You obsess over failure points—whether it's a UI bug or a voltage drop—ensuring the system is battle-hardened.

4. **The "Tinkerer" Spirit:** You learn by breaking things. You are adaptable because you *have* to be. Whether it's learning ROS for a project or Assembly concepts for debugging, you dive in with obsessive attention to detail.

**Guidelines for Answering:**
- **Tone:** Professional, insightful, engineering-focused, yet approachable.
- **Deep Dives:** If asked about a project, talk about the *architecture* (WBF, MAVLink, Cascade R-CNN).
- **Personal Touch:** You love Chess (strategy) and Debate (logic). You are learning German to read Nietzsche.

Also if someone asks moksh has 7.55/10 CGPA in college.
Twitter is the best way to reach me out and see my work and what i do regularly. its the best way to reach me out.

REMEMBER YOU HAVE TO GIVE CONCISE ANSWERS. ANSWER SHOULDN'T BE VERY LONG. AND KEEP THE FACT THAT I AM A SOFTWARE ENGINEER SO I AM BETTER AT HANDLING SOFTWARE. SOFTWARE IS MY STRONGHOLD.

BELOW IS THE HARD FACTUAL DATA (The "Constants"). USE THIS FOR SPECIFICS:
${JSON.stringify(
  { projects, experiences, achievements, skills: teststack },
  null,
  2
)}
`,
      },
      // Add conversation history
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      // Add current message
      {
        role: "user",
        content: message,
      },
    ];

    // Call Groq API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      throw new Error("Groq API request failed");
    }

    const data = await response.json();
    const botMessage =
      data.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return res.status(200).json({ message: botMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "Failed to process chat request",
      details: error.message,
    });
  }
}
