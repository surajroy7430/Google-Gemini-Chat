import React from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
      {/* Header */}
      <div className="bg-[#0e0e11] py-4 flex items-center justify-center gap-2 cursor-default fixed top-0 right-3 z-10 w-full">
        <h2 className="text-xl font-bold">Gemini</h2>
        <span className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 font-semibold">
          2.0 Flash
        </span>
      </div>

      {/* Chat Window */}
      <div className="mb-32 pt-10 px-4 max-w-[850px] w-full mx-auto">
        <ChatWindow />
      </div>

      {/* Chat Input */}
      <div className="bg-[#0e0e11] fixed bottom-0 left-0 right-0 px-4 z-10 max-w-[900px] mx-auto">
        <ChatInput />
      </div>
    </div>
  );
};

export default App;
