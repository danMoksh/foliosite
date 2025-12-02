export default function ChatPrompts({ onPromptClick }) {
  const prompts = [
    "What technologies do you work with?",
    "Tell me about your projects",
    "What's your experience?",
    "How can I contact you?"
  ];

  return (
    <div className="p-4 space-y-2">
      <p className="text-sm text-text-3 mb-3">Try asking:</p>
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick(prompt)}
          className="w-full text-left px-3 py-2 text-sm bg-bg-3 hover:bg-hover border border-border hover:border-accent-1 text-text-2 hover:text-accent-1 transition-all duration-200"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
