import { createContext, useState, useContext } from 'react';

const ChatContext = createContext({
  isVisible: false,
  toggleChatbot: () => {},
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
});

export const useChatbot = () => useContext(ChatContext);

export function ChatProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ 
      isVisible, 
      toggleChatbot, 
      messages, 
      addMessage, 
      clearMessages 
    }}>
      {children}
    </ChatContext.Provider>
  );
}
