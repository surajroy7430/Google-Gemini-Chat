import React, { createContext, useContext, useEffect, useState } from "react";

let ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

let LOCAL_KEY = "gemini_chat_history";

const ChatProvider = ({ children }) => {
  let [messages, setMessages] = useState(() => {
    let stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(messages));
  }, [messages]);

  let clearMessage = () => {
    setMessages([]);
    localStorage.removeItem(LOCAL_KEY);
  };

  let addUserMessage = (text) => {
    let msg = {
      role: "user",
      text,
      timestamp: Date.now(),
      id: Date.now() + Math.random(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg.id;
  };

  let addAssistantMessage = (text) => {
    let msg = {
      role: "assistant",
      text,
      timestamp: Date.now(),
      id: Date.now() + Math.random(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg.id;
  };

  // for update user text after reply
  let updateUserMessage = (id, newText) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id && msg.role === "user" ? { ...msg, text: newText } : msg
      )
    );
  };

  // for loading text
  let updateAssistantMessage = (id, newText) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id && msg.role === "assistant"
          ? { ...msg, text: newText, timestamp: Date.now() }
          : msg
      )
    );
  };

  // let removeAssistantAfterUser = (userId) => {
  //   setMessages((prev) => {
  //     let idx = prev.findIndex((m) => m.id === userId);
  //     if (idx === -1 || idx === prev.length - 1) return prev;

  //     // Check if the next message is assistant
  //     if (prev[idx + 1].role === "assistant") {
  //       return prev.filter((_, i) => i !== idx + 1);
  //     }
  //     return prev;
  //   });
  // };

  return (
    <ChatContext.Provider
      value={{
        messages,
        clearMessage,
        addUserMessage,
        updateUserMessage,
        addAssistantMessage,
        updateAssistantMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
