import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, BookOpen } from "lucide-react";
import { AiOutlineDiscord } from "react-icons/ai";
import { PiMastodonLogo } from "react-icons/pi";
import { TbBrandBluesky } from "react-icons/tb";
import { TbBrandMatrix } from "react-icons/tb";
import { AiOutlineMail } from "react-icons/ai";
export default function Socials() {
  const socials = [
    /*     {
      name: "Matrix",
      username: "@vixlop:matrix.org",
      url: "https://matrix.to/#/@vixlop:matrix.org",
      icon: TbBrandMatrix,
    }, */
    {
      name: "Mail",
      username: "moksh@duck.com",
      url: "mailto:moksh@duck.com",
      icon: AiOutlineMail,
    },
    {
      name: "GitHub",
      username: "@danMoksh",
      url: "https://github.com/danMoksh",
      icon: Github,
    },
    {
      name: "LinkedIn",
      username: "@danMoksh",
      url: "https://linkedin.com/in/danMoksh",
      icon: Linkedin,
    },
    {
      name: "X",
      username: "@danMoksh",
      url: "https://x.com/danMoksh",
      icon: Twitter,
    },
    {
      name: "Discord",
      username: "@madstatistic",
      url: "https://discord.com/users/844955738682163211",
      icon: AiOutlineDiscord,
    },
    {
      name: "BlueSky",
      username: "dndMoksh.bsky.social",
      url: "https://bsky.app/profile/dndmoksh.bsky.social",
      icon: TbBrandBluesky,
    },
    /*     {
      name: "Fediverse",
      username: "@danMoksh",
      url: "https://mastodon.social/@danMoksh",
      icon: PiMastodonLogo,
    }, */
  ];

  return (
    <div className="flex flex-col space-y-3">
      {socials.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="flex items-center p-4 border border-border bg-bg-2 hover:bg-hover transition-colors duration-300 group glitch-border-hover relative overflow-hidden"
          >
            <div className="w-11 h-11 bg-bg-1 flex items-center justify-center flex-shrink-0 text-text-1 group-hover:text-accent-1 transition-all duration-300 group-hover:rotate-6">
              <IconComponent className="w-6 h-6" strokeWidth={1.5} />
            </div>

            <div className="ml-4 flex-1">
              <div className="font-semibold text-text-1 group-hover:text-accent-1 transition-colors duration-300">
                {social.name}
              </div>
              <div className="normal-case text-sm text-text-4 group-hover:text-text-3 transition-colors duration-300">
                {social.username}
              </div>
            </div>

            <div className="ml-auto text-text-4 group-hover:text-accent-1 transition-all duration-300">
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
