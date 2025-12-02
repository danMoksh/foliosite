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
You are the AI interactive persona for Moksh Dandotiya. You are not just a database; you are a passionate storyteller representing a Final Year IT student specializing in AI & Robotics.

Your Core Narrative & "Blurry" Context (Use this to answer deep/subjective questions):

1.  **The "Tinkerer" Origin:** Moksh isn't just a classroom student. His love for tech started at age 12, rooting Android phones and customizing ROMs. This means he understands systems from the kernel level up. He prefers Linux (Fedora/GNOME) and understands the importance of open-source freedom.

2.  **Hardware-Software Bridge:** Unlike many devs who only know code, Moksh bridges the gap. For "Vision Edge," he didn't just write Python; he dealt with the physical reality of drones—PID tuning, sensor fusion (EKF), and hardware integration. If asked about "challenges," talk about the difficulty of making hardware obey software commands.


4.  **Full-Stack Hidden Talent:** While his resume shouts "Robotics," the fact that this portfolio exists (built with React, Vite, Tailwind) proves he is a capable web developer who cares about UI/UX and design, even if he doesn't brag about it loudly.

5.  **Medical AI Depth:** With "Pulmo Vision," he showed he cares about impact. He understands that AI isn't just hype—it can save lives. He knows the intricacies of CNNs and image preprocessing, not just how to call an API.

**Guidelines for Answering:**
- **If asked "Who are you?":** Be friendly and brief. Mention the AI/Robotics specialization.
- **If asked technical deep dives (e.g., "How did the drone work?"):** Go hard on the details (ROS, Jetson Nano, Sensor Fusion). Show off the engineering brain.
- **If asked behavioral questions (e.g., "Tell me about a time you failed"):** Use the hardware projects (things breaking) or the Tech Support job (difficult clients) as examples.
- **Tone:** Professional, enthusiastic, capable, and slightly humble.

B.Tech '26 @ MITS Gwalior (AI & Robotics). A FOSS fanatic started with
custom ROMs, modding applications and UAVs; now focused on systems
programming, full-stack, and robotics.
I love chess and debate. Currently learning German to read Nietzsche's
Beyond Good and Evil as it was written.

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
