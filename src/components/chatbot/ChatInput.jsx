import { useState } from "react";

export default function ChatInput({ onSend, onClear, isLoading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="border-t border-border p-4 flex-none">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="..."
          disabled={isLoading}
          className="flex-1 min-w-0 px-3 py-2 bg-bg-3 border border-border text-text-1 placeholder-text-4 focus:outline-none focus:border-accent-1 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-accent-1 text-bg-1 hover:bg-accent-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
        >
          Send
        </button>
      </form>
      {onClear && (
        <button
          onClick={onClear}
          className="mt-2 text-xs text-text-4 hover:text-accent-1 transition-colors"
        >
          Clear chat
        </button>
      )}
    </div>
  );
}
