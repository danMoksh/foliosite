import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatPrompts from './ChatPrompts';

export default function ChatMessages({ messages, isTyping, onPromptClick }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4 scroll-smooth overscroll-y-contain">
      {messages.length === 0 ? (
        <ChatPrompts onPromptClick={onPromptClick} />
      ) : (
        <>
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isTyping && (
            <div className="flex justify-start mb-3">
              <div className="bg-bg-3 border border-border px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent-1 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-accent-1 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-accent-1 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
