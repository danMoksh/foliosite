import { useChatbot } from '../../contexts/ChatContext';

export default function ChatToggle() {
  const { toggleChatbot, isVisible } = useChatbot();

  return (
    <button
      onClick={toggleChatbot}
      className="p-2 text-text-1 hover:text-accent-1 border border-transparent hover:border-accent-1 transition-all duration-200"
      aria-label="Toggle Chatbot"
    >
      {isVisible ? (
        // Bot icon (enabled/visible) - lucide-react style
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M6 8a6 6 0 1112 0v3h1a1 1 0 011 1v4a1 1 0 01-1 1h-1v1a2 2 0 01-2 2h-8a2 2 0 01-2-2v-1H5a1 1 0 01-1-1v-4a1 1 0 011-1h1V8zm3 5a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      ) : (
        // BotOff icon (disabled/hidden) - lucide-react style
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9 9v2a1 1 0 102 0M6 8a6 6 0 018.5-5.5M18 11v3h1a1 1 0 011 1v4a1 1 0 01-1 1h-1v1a2 2 0 01-2 2h-8a2 2 0 01-2-2v-1H5a1 1 0 01-1-1v-4a1 1 0 011-1h1m12-4v2" />
        </svg>
      )}
    </button>
  );
}
