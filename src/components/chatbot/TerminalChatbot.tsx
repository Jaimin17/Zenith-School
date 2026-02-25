import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";
import styles from "./TerminalChatbot.module.css";

const TerminalChatbot = () => {
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setThinking(true);

    // SSE integration
    const eventSource = new EventSource(`/chatbot/chat/sse?query=${encodeURIComponent(input)}`);
    let botResponse = "";
    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setMessages((msgs) => [...msgs, { type: "bot", text: botResponse }]);
        setThinking(false);
        setInput("");
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        eventSource.close();
      } else {
        botResponse += event.data;
        setMessages((msgs) => {
          const last = msgs[msgs.length - 1];
          if (last && last.type === "bot") {
            return [...msgs.slice(0, -1), { type: "bot", text: botResponse }];
          }
          return [...msgs, { type: "bot", text: botResponse }];
        });
      }
    };
    eventSource.onerror = () => {
      setMessages((msgs) => [...msgs, { type: "bot", text: "Error: Could not get response." }]);
      setThinking(false);
      setInput("");
      eventSource.close();
    };
  };

  return (
    <div className={styles["terminal-chatbot"]}>
      <div className={styles["chat-window"]}>
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles.message} ${styles[msg.type]}`}
          >
            {msg.type === "user" ? "> " : ""}
            {msg.text}
          </motion.div>
        ))}
        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${styles.message} ${styles.bot}`}
          >
            <span>Thinking...</span>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>
      <TextareaAutosize
        minRows={1}
        maxRows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        className={styles["chat-input"]}
        placeholder="Type your query..."
        autoFocus
      />
    </div>
  );
};

export default TerminalChatbot;
