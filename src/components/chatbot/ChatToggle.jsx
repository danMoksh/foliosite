import { useChatbot } from "../../contexts/ChatContext";
import { Bot, BotOff } from "lucide-react";

export default function ChatToggle() {
  const { toggleChatbot, isVisible } = useChatbot();

  return (
    <button
      onClick={toggleChatbot}
      className="p-2 text-text-1 hover:text-accent-1 border border-transparent hover:border-accent-1 transition-all duration-200"
      aria-label="Toggle Chatbot"
    >
      {isVisible ? (
        <Bot
          className="-translate-y-0.1" // Moves icon up
          size={25}
          strokeWidth={1.5}
        />
      ) : (
        <BotOff
          className="-translate-y-0.1" // Moves icon up
          size={25}
          strokeWidth={1.5}
        />
      )}
    </button>
  );
}
