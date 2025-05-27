import React, { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  let { messages } = useChat();
  let chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-2 text-center w-full">
      {messages.length === 0 ? (
        <div className="text-gray-300 mt-40">
          <h2 className="text-4xl font-semibold mb-2">Welcome!</h2>
          <p className="text-sm">
            Ask me anything, and I'll try my best to help.
          </p>
        </div>
      ) : (
        messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
      )}

      <div ref={chatRef}></div>
    </div>
  );
};

export default ChatWindow;
