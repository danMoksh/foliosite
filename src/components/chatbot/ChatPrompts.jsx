export default function ChatPrompts({ onPromptClick }) {
  const prompts = [
    "Tell me about your journey into technology.",
    "What has been your toughest engineering challenge so far?",
    "How do you approach learning complex new systems?",
    "What unique value do you bring to an engineering team?",
  ];

  return (
    <div className="space-y-1">
      <p className="text-sm text-text-3 mb-2">Try asking:</p>
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onPromptClick(prompt)}
          className="w-full text-left px-3 py-1.5 text-sm bg-bg-3 hover:bg-hover border border-border hover:border-accent-1 text-text-2 hover:text-accent-1 transition-all duration-200"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
