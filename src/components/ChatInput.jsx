import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../context/ChatContext";
import useFetch from "../hooks/useFetch";
import { SendHorizontal, Pause, BrushCleaning } from "lucide-react";

const ChatInput = () => {
  let {
    messages,
    clearMessage,
    addUserMessage,
    addAssistantMessage,
    updateAssistantMessage,
  } = useChat();
  let [text, setText] = useState("");
  let [isTyping, setIsTyping] = useState(false);
  let typingCancelRef = useRef(false);
  let inputRef = useRef(null);

  let { fetchData, loading } = useFetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
      import.meta.env.VITE_GEMINI_API_KEY
    }`
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  let typedText = async (id, fullText) => {
    setIsTyping(true);
    typingCancelRef.current = false;

    for (let i = 0; i <= fullText.length; i++) {
      if (typingCancelRef.current) break;

      updateAssistantMessage(id, fullText.slice(0, i));

      await new Promise((res) => setTimeout(res, 5));
    }

    setIsTyping(false);
    inputRef.current?.focus();
  };

  let handleSubmit = async () => {
    if (isTyping) {
      typingCancelRef.current = true;
      setIsTyping(false);
      inputRef.current?.focus();
      return;
    }

    if (!text.trim()) return;

    typingCancelRef.current = true;
    addUserMessage(text);

    let loadingMessage = addAssistantMessage("Just a sec...");
    let userInput = text;
    setText("");

    let body = {
      contents: [{ parts: [{ text: userInput }] }],
    };

    try {
      let res = await fetchData(body);
      let reply = res?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        typedText(loadingMessage, reply);
      } else {
        updateAssistantMessage(loadingMessage, "No response from Gemini.");
        inputRef.current?.focus();
      }
    } catch (error) {
      updateAssistantMessage(
        loadingMessage,
        "Error getting response from Gemini."
      );
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    let textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 5 * 24)}px`;
    }
  }, [text]);

  return (
    <form
      onClick={() => inputRef?.current?.focus()}
      className="bg-zinc-900 rounded-3xl py-2 z-10 w-full mb-5 mt-2 cursor-text"
      style={{ transition: "height 0.2s ease" }}
    >
      <textarea
        ref={inputRef}
        value={text}
        placeholder="Ask anything..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={async (e) => {
          console.log(e.key);
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await handleSubmit();
          }
        }}
        disabled={loading}
        aria-label="Chat Input"
        rows={1}
        className="rounded-3xl p-4 w-full outline-none bg-transparent leading-tight h-full resize-none"
        style={{
          scrollbarWidth: "none",
          lineHeight: "24px",
          maxHeight: `${5 * 24}px`,
        }}
      />
      <div className="m-1 px-4 flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          disabled={loading}
          title={isTyping ? "STOP" : "SEND"}
          className="p-2 cursor-pointer rounded-full transition hover:bg-emerald-600"
        >
          {isTyping ? <Pause size="20px" /> : <SendHorizontal size="20px" />}
        </button>
        <button
          type="button"
          title="CLEAR"
          disabled={messages.length === 0 || isTyping || loading}
          onClick={() => {
            clearMessage();
            inputRef.current?.focus();
          }}
          className="p-2 cursor-pointer rounded-full transition hover:bg-red-500"
        >
          <BrushCleaning size="20px" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
