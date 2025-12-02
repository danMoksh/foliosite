import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "../../contexts/ChatContext";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function Chat() {
  const { isVisible, messages, addMessage, clearMessages } = useChatbot();
  const [isOpen, setIsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    // Add user message
    addMessage("user", message);
    setIsTyping(true);

    try {
      // Call Groq API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      addMessage("assistant", data.message);
    } catch (error) {
      console.error("Chat error:", error);
      addMessage(
        "assistant",
        "Sorry, I'm having trouble connecting right now. Please try again later!"
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[320px] sm:w-96">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="bg-bg-1 border border-border shadow-lg shadow-black/20 overflow-hidden"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b border-border cursor-pointer hover:bg-bg-2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-1 rounded-full animate-pulse"></div>
            <span className="font-bold text-text-1">ask me anything</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-5 h-5 text-text-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 400 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <ChatMessages
                  messages={messages}
                  isTyping={isTyping}
                  onPromptClick={handlePromptClick}
                />
                <ChatInput
                  onSend={handleSend}
                  onClear={clearMessages}
                  isLoading={isTyping}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
