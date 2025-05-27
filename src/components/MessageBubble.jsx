import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MessageBubble = ({ message: { role, text, timestamp } }) => {
  let isUser = role === "user";
  let time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let [copied, setCopied] = useState(false);

  let handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`my-4 overflow-hidden shadow-[inset_0_-10px_12px_-6px_rgba(0,0,0,0.5)] ${
        isUser
          ? "bg-gradient-to-br from-[#363d44] to-[#242a3d] ml-auto text-justify px-4 py-2 mt-15 max-w-[80%] w-fit break-words rounded-[20px_0_20px_20px] overflow-x-auto scrollbar-thin"
          : "bg-gradient-to-bl from-[#1a161d] to-[#0d1b1b] text-justify p-4 max-w-full break-words rounded-[20px_20px_20px_0]"
      }`}
    >
      {text === "Just a sec..." ? (
        <>
          <p className="text-xs sm:text-base">{text}</p>
          <div className="my-4">
            <Skeleton count={5} className="custom-skeleton" />
          </div>
        </>
      ) : (
        <ReactMarkdown
          components={{
            code({ className, children }) {
              let [copiedCode, setCopiedCode] = useState(false);
              let match = /language-(\w+)/.exec(className || "");
              let language = match?.[1] || "";

              let handleCopyCode = () => {
                navigator.clipboard.writeText(children).then(() => {
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                });
              };

              if (match) {
                return (
                  <div className="relative m-2 rounded-md overflow-hidden bg-transparent">
                    <div
                      className="text-stone-300 flex justify-between items-center p-4 text-xs bg-[#222222] mb-0.5"
                      style={{ borderRadius: "10px 10px 0 0" }}
                    >
                      <span>{language}</span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check size="12px" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size="12px" /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    <div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={language}
                        wrapLongLines={true}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          fontSize: ".475rem",
                          lineHeight: "1.3",
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          overflow: "auto",
                        }}
                        className="scrollbar-thin"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                );
              }
              if (role !== "assistant") {
                return <code>{children}</code>;
              } else {
                return (
                  // Highlighted text
                  <code className="bg-[#1c2c2c] text-[#979797] py-0.5 px-1 rounded">
                    {children}
                  </code>
                );
              }
            },

            p({ children }) {
              return <p className="m-2 text-xs sm:text-base">{children}</p>;
            },
            ul({ children }) {
              return <ul className="m-2 text-xs sm:text-base">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="m-2 text-xs sm:text-base">{children}</ol>;
            },
          }}
        >
          {text}
        </ReactMarkdown>
      )}

      <div className="flex items-center gap-2 px-2 text-xs text-zinc-400">
        {!isUser && (
          <button
            onClick={handleCopy}
            title={copied ? "Copied" : "Copy"}
            className="mt-2 cursor-pointer text-center bg-[#3e6868] rounded-full p-2"
          >
            {copied ? <Check size="14px" /> : <Copy size="14px" />}
          </button>
        )}
        <div className={`text-right ml-auto my-1`}>{time}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
