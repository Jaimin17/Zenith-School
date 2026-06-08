"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChatBotTokenAction } from "@/actions/admin";
import { useAcademicYear } from "@/contexts/AcademicYearContext";
import styles from "./TerminalChatbot.module.css";

// ── Constants ────────────────────────────────────────────────────
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const CHAT_ENDPOINT = `/api/orchestrated-chat`;
const CHAT_SESSIONS_ENDPOINT = `${API_BASE_URL}api/v1/chatbot/sessions`;

// Max past exchanges to send with each request.
// 1 exchange = 1 user msg + 1 bot msg = 2 history entries.
// 6 exchanges = 12 entries — enough context, safe on llama3.2 token budget.
const MAX_HISTORY_EXCHANGES = 6;

// ── Types ────────────────────────────────────────────────────────
interface Message {
  id: string;
  type: "user" | "bot" | "error";
  text: string;
  streaming?: boolean;
}

interface ChatSessionSummary {
  id: string;
  title: string;
  message_count: number;
  last_message_preview?: string | null;
  created_at: string;
  updated_at: string;
}

interface ChatSessionDetail {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    created_at: string;
  }>;
}

// Matches backend ChatRequest exactly:
// chat_history: list[dict] = []  →  [{"role": "user"|"assistant", "content": "..."}]
interface HistoryEntry {
  role: "user" | "assistant";
  content: string;
}

// SSE event shapes from FastAPI
interface SSETokenEvent { type: "token";  value: string; }
interface SSEDoneEvent  { type: "done"; }
interface SSEStartEvent { type: "start"; session_id?: string; }
interface SSEErrorEvent { type: "error"; message: string; }
type SSEEvent = SSETokenEvent | SSEDoneEvent | SSEStartEvent | SSEErrorEvent;

interface AssistantCard {
  title: string;
  body: string;
  tone: "summary" | "details" | "note" | "default";
}

// ── Helpers ──────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

function normalizeCardTone(title: string): AssistantCard["tone"] {
  const t = title.toLowerCase();
  if (t.includes("summary")) return "summary";
  if (t.includes("detail") || t.includes("count") || t.includes("data")) return "details";
  if (t.includes("note") || t.includes("tip") || t.includes("next")) return "note";
  return "default";
}

function toneIcon(tone: AssistantCard["tone"]): string {
  switch (tone) {
    case "summary":
      return "◆";
    case "details":
      return "▣";
    case "note":
      return "✦";
    default:
      return "•";
  }
}

function parseAssistantCards(text: string): { intro: string; cards: AssistantCard[] } {
  const lines = text.split(/\r?\n/);
  const cards: AssistantCard[] = [];
  let introLines: string[] = [];

  let currentTitle: string | null = null;
  let currentBody: string[] = [];

  const sectionLine = /^\s*(?:[-*]\s*)?(?:\*\*)?([A-Za-z][A-Za-z\s]{2,32})(?:\*\*)?\s*:?\s*$/;
  const expectedSections = new Set([
    "quick summary",
    "key details",
    "next helpful note",
    "missing data",
    "next step",
    "active academic year",
    "counts of items",
  ]);

  const pushCurrent = () => {
    if (!currentTitle) return;
    cards.push({
      title: currentTitle,
      body: currentBody.join("\n").trim(),
      tone: normalizeCardTone(currentTitle),
    });
    currentTitle = null;
    currentBody = [];
  };

  for (const line of lines) {
    const match = line.match(sectionLine);
    const candidate = match?.[1]?.trim() ?? "";
    const normalized = candidate.toLowerCase();
    const isSection = expectedSections.has(normalized);

    if (isSection) {
      pushCurrent();
      currentTitle = candidate;
      continue;
    }

    if (currentTitle) {
      currentBody.push(line);
    } else {
      introLines.push(line);
    }
  }

  pushCurrent();

  if (cards.length === 0) {
    return { intro: text, cards: [] };
  }

  return { intro: introLines.join("\n").trim(), cards: cards.filter((c) => c.body) };
}

/**
 * Converts UI messages → backend chat_history format.
 *
 * Called with a SNAPSHOT of messages taken BEFORE the new user
 * message is added — so the current query is never in the history,
 * only previous completed exchanges are.
 *
 * Filters out:
 *  - error messages  (don't confuse the LLM with error strings)
 *  - streaming msgs  (incomplete bot responses)
 *  - empty messages  (bot placeholder before first token)
 *
 * Trims to last MAX_HISTORY_EXCHANGES exchanges to save tokens.
 */
function buildChatHistory(messages: Message[]): HistoryEntry[] {
  const completed = messages.filter(
    (m) => m.type !== "error" && !m.streaming && m.text.trim() !== ""
  );

  // Keep last N exchanges (each = 2 messages: user + bot)
  const recent = completed.slice(-(MAX_HISTORY_EXCHANGES * 2));

  return recent.map((m) => ({
    role: m.type === "user" ? "user" : "assistant",
    content: m.text,
  }));
}

// ── Component ────────────────────────────────────────────────────
const TerminalChatbot = () => {
  const { selectedYearId } = useAcademicYear();
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [sessions, setSessions]   = useState<ChatSessionSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [input, setInput]         = useState("");
  const [streaming, setStreaming] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});
  const [copiedCards, setCopiedCards] = useState<Record<string, boolean>>({});

  const bottomRef    = useRef<HTMLDivElement>(null);
  const abortRef     = useRef<AbortController | null>(null);
  const inputRef     = useRef<HTMLTextAreaElement>(null);
  const tokenRef     = useRef<string | null>(null);

  // Keeps a always-fresh copy of messages accessible inside useCallback
  // without adding `messages` to dependency arrays (avoids stale closures).
  const messagesRef  = useRef<Message[]>([]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // ── Auto-scroll ────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Focus on open ──────────────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // ── Auth token (cached after first call) ──────────────────────
  const ensureToken = useCallback(async (): Promise<string | null> => {
    if (tokenRef.current) return tokenRef.current;
    const result = await getChatBotTokenAction();
    if (!result.success || !result.accessToken) {
      setInitError(result.error ?? "Authentication failed");
      return null;
    }
    tokenRef.current = result.accessToken;
    return result.accessToken;
  }, []);

  const refreshSessions = useCallback(async () => {
    const accessToken = await ensureToken();
    if (!accessToken) return;

    setLoadingSessions(true);
    try {
      const response = await fetch(`${CHAT_SESSIONS_ENDPOINT}?page=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Could not load chats (${response.status})`);
      }

      const payload = await response.json() as { data?: ChatSessionSummary[] };
      const list = payload.data ?? [];
      setSessions(list);

      if (!activeSessionId && list.length > 0) {
        setActiveSessionId(list[0].id);
      }
    } catch (err) {
      setInitError(err instanceof Error ? err.message : "Could not load previous chats.");
    } finally {
      setLoadingSessions(false);
    }
  }, [ensureToken, activeSessionId]);

  const createSessionRecord = useCallback(async (): Promise<string | null> => {
    const accessToken = await ensureToken();
    if (!accessToken) return null;

    const response = await fetch(CHAT_SESSIONS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not create chat (${response.status})`);
    }

    const payload = await response.json() as { session_id: string };
    return payload.session_id;
  }, [ensureToken]);

  const createNewChat = useCallback(async () => {
    abortRef.current?.abort();
    setStreaming(false);

    try {
      const sessionId = await createSessionRecord();
      if (!sessionId) return;

      setMessages([]);
      setActiveSessionId(sessionId);
      setInitError(null);
      await refreshSessions();
    } catch (err) {
      setInitError(err instanceof Error ? err.message : "Could not create a new chat.");
    }
  }, [createSessionRecord, refreshSessions]);

  const openSession = useCallback(async (sessionId: string) => {
    abortRef.current?.abort();
    setStreaming(false);

    try {
      const accessToken = await ensureToken();
      if (!accessToken) return;

      const response = await fetch(`${CHAT_SESSIONS_ENDPOINT}/${sessionId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Could not load chat (${response.status})`);
      }

      const payload = await response.json() as ChatSessionDetail;
      setMessages(
        payload.messages.map((m) => ({
          id: m.id,
          type: m.role === "assistant" ? "bot" : "user",
          text: m.content,
        }))
      );
      setActiveSessionId(sessionId);
      setInitError(null);
    } catch (err) {
      setInitError(err instanceof Error ? err.message : "Could not open previous chat.");
    }
  }, [ensureToken]);

  useEffect(() => {
    if (!open) return;
    void refreshSessions();
  }, [open, refreshSessions]);

  // ── Message state helpers ──────────────────────────────────────
  const appendToken = useCallback((token: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last?.type === "bot") {
        updated[updated.length - 1] = { ...last, text: last.text + token };
      }
      return updated;
    });
  }, []);

  const finishStreaming = useCallback(() => {
    setMessages((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last?.type === "bot") {
        updated[updated.length - 1] = { ...last, streaming: false };
      }
      return updated;
    });
  }, []);

  const setLastMessageError = useCallback((msg: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        type: "error",
        text: `ERROR: ${msg}`,
        streaming: false,
      };
      return updated;
    });
  }, []);

  // ── Core: send message ─────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const query = input.trim();
    if (!query || streaming) return;

    let targetSessionId = activeSessionId;
    if (!targetSessionId) {
      try {
        targetSessionId = await createSessionRecord();
      } catch (err) {
        setInitError(err instanceof Error ? err.message : "Could not create chat session.");
      }

      if (!targetSessionId) return;
      setActiveSessionId(targetSessionId);
      await refreshSessions();
    }

    setInput("");
    setStreaming(true);
    setInitError(null);

    // ── HISTORY SNAPSHOT ──────────────────────────────────────────
    // Captured NOW — before adding the new user message to state.
    // This gives the backend all previous completed exchanges.
    // The current `query` is sent separately as `request.query`.
    const chatHistory = buildChatHistory(messagesRef.current);

    // Add user message to UI
    setMessages((prev) => [
      ...prev,
      { id: uid(), type: "user", text: query },
    ]);

    // Add empty bot placeholder — tokens stream into this
    setMessages((prev) => [
      ...prev,
      { id: uid(), type: "bot", text: "", streaming: true },
    ]);

    try {
      const accessToken = await ensureToken();
      if (!accessToken) {
        setLastMessageError("Authentication failed. Please log in again.");
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      // ── POST: query + chat_history ────────────────────────────
      // Matches ChatRequest(query: str, chat_history: list[dict])
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Token is read from cookies server-side by the orchestrator
        },
        body: JSON.stringify({
          query,
          session_id: targetSessionId,
          selected_academic_year_id: selectedYearId,
          chat_history: chatHistory,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401) tokenRef.current = null; // force token refresh
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`Server error ${response.status}: ${errorText}`);
      }

      if (!response.body) {
        throw new Error("Response body is empty. Streaming not supported?");
      }

      // ── Read SSE stream ────────────────────────────────────────
      const reader  = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by "\n\n"
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? ""; // keep incomplete tail in buffer

        for (const rawEvent of events) {
          const line = rawEvent.trim();
          if (!line.startsWith("data: ")) continue;

          try {
            const event = JSON.parse(line.slice(6)) as SSEEvent;
            switch (event.type) {
              case "start":
                if (event.session_id) {
                  setActiveSessionId(event.session_id);
                }
                break;
              case "token":  appendToken(event.value);   break;  // append token
              case "done":   finishStreaming();            break;  // stop cursor
              case "error":  setLastMessageError(event.message); break;
            }
          } catch {
            // ignore malformed JSON chunks / keep-alive pings
          }
        }
      }

    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        finishStreaming(); // user clicked stop — not a real error
        return;
      }
      setLastMessageError(
        err instanceof Error ? err.message : "Could not reach server."
      );
    } finally {
      setStreaming(false);
      abortRef.current = null;
      void refreshSessions();
    }
  }, [
    input,
    streaming,
    activeSessionId,
    createSessionRecord,
    refreshSessions,
    ensureToken,
    selectedYearId,
    appendToken,
    finishStreaming,
    setLastMessageError,
  ]);

  // ── Stop stream ────────────────────────────────────────────────
  const stopStream = useCallback(() => {
    abortRef.current?.abort();
    finishStreaming();
    setStreaming(false);
  }, [finishStreaming]);

  // ── Clear terminal ─────────────────────────────────────────────
  const clearTerminal = useCallback(() => setMessages([]), []);

  const toggleCardCollapse = useCallback((cardId: string) => {
    setCollapsedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  }, []);

  const copyCardBody = useCallback(async (cardId: string, cardText: string) => {
    try {
      await navigator.clipboard.writeText(cardText);
      setCopiedCards((prev) => ({ ...prev, [cardId]: true }));
      setTimeout(() => {
        setCopiedCards((prev) => ({ ...prev, [cardId]: false }));
      }, 1500);
    } catch {
      // Clipboard access can fail on insecure contexts; ignore silently.
    }
  }, []);

  // ── Keyboard ───────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className={styles.shell}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            className={styles.terminal}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 12,  scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            <div className={styles.scanlines} />

            {/* ── Title Bar ───────────────────────────── */}
            <div className={styles.titleBar}>
              <div className={styles.titleBarLeft}>
                <div className={styles.titleBarDots}>
                  <div className={`${styles.dot} ${styles.red}`}    onClick={() => setOpen(false)} style={{ cursor: "pointer" }} title="Close" />
                  <div className={`${styles.dot} ${styles.yellow}`} onClick={clearTerminal}        style={{ cursor: "pointer" }} title="Clear current view" />
                  <div className={`${styles.dot} ${styles.green}`} />
                </div>
                <span className={styles.titleBarText}>SCHOOL-AI — terminal v1.0</span>
              </div>
              <div className={styles.titleBarRight}>
                <button className={styles.titleActionBtn} onClick={createNewChat} title="Start new chat">+ new chat</button>
                <span className={`${styles.statusIndicator} ${streaming ? styles.active : ""}`}>
                  {streaming ? "● GENERATING" : "● READY"}
                </span>
                <button className={styles.closeBtn} onClick={() => setOpen(false)} title="Minimize">─</button>
              </div>
            </div>

            <div className={styles.body}>
              <aside className={styles.sessionPanel}>
                <div className={styles.sessionPanelHeader}>
                  <span className={styles.sessionPanelTitle}>previous chats</span>
                </div>

                <div className={styles.sessionList}>
                  {loadingSessions && <div className={styles.sessionHint}>loading chats...</div>}
                  {!loadingSessions && sessions.length === 0 && (
                    <div className={styles.sessionHint}>no previous chats</div>
                  )}
                  {!loadingSessions && sessions.map((chatSession) => (
                    <button
                      key={chatSession.id}
                      type="button"
                      onClick={() => openSession(chatSession.id)}
                      className={`${styles.sessionItem} ${activeSessionId === chatSession.id ? styles.sessionItemActive : ""}`}
                    >
                      <div className={styles.sessionItemTitle}>{chatSession.title}</div>
                      <div className={styles.sessionItemMeta}>{chatSession.message_count} msgs</div>
                      {chatSession.last_message_preview && (
                        <div className={styles.sessionItemPreview}>{chatSession.last_message_preview}</div>
                      )}
                    </button>
                  ))}
                </div>
              </aside>

              <div className={styles.chatPanel}>
            {/* ── Messages ────────────────────────────── */}
            <div className={styles.messages}>
              <div className={styles.bootMsg}>
                {`SCHOOL MANAGEMENT AI  [Version 1.0.0]`}<br />
                {`Connected · ${API_BASE_URL}`}<br />
                {`Session · ${activeSessionId ? activeSessionId.slice(0, 8) : "none"}`}<br />
                {`──────────────────────────────────────────`}
              </div>

              {initError && (
                <div className={`${styles.msgRow} ${styles.error}`}>
                  <span className={styles.msgPrefix}>┌─ system</span>
                  <span className={styles.msgText}>{initError}</span>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`${styles.msgRow} ${styles[msg.type]}`}>
                  <span className={styles.msgPrefix}>
                    {msg.type === "user" ? "┌─ you" : msg.type === "error" ? "┌─ error" : "┌─ assistant"}
                  </span>
                  <div className={styles.msgText}>
                    {msg.type === "bot" ? (
                      (() => {
                        const parsed = parseAssistantCards(msg.text);
                        const mdComponents: any = {
                          h1: (props: any) => <h1 className={styles.mdH1} {...props} />,
                          h2: (props: any) => <h2 className={styles.mdH2} {...props} />,
                          h3: (props: any) => <h3 className={styles.mdH3} {...props} />,
                          p: (props: any) => <p className={styles.mdP} {...props} />,
                          ul: (props: any) => <ul className={styles.mdUl} {...props} />,
                          ol: (props: any) => <ol className={styles.mdOl} {...props} />,
                          li: (props: any) => <li className={styles.mdLi} {...props} />,
                          strong: (props: any) => <strong className={styles.mdStrong} {...props} />,
                          em: (props: any) => <em className={styles.mdEm} {...props} />,
                          table: (props: any) => <table className={styles.mdTable} {...props} />,
                          thead: (props: any) => <thead className={styles.mdThead} {...props} />,
                          th: (props: any) => <th className={styles.mdTh} {...props} />,
                          td: (props: any) => <td className={styles.mdTd} {...props} />,
                          code: (props: any) => {
                            const isInline = Boolean((props as any).inline);
                            if (isInline) return <code className={styles.mdInlineCode} {...props} />;
                            return <code className={styles.mdCodeBlock} {...props} />;
                          },
                        };

                        return (
                          <>
                            {parsed.intro && (
                              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                                {parsed.intro}
                              </ReactMarkdown>
                            )}

                            {parsed.cards.length > 0 && (
                              <div className={styles.assistantCards}>
                                {parsed.cards.map((card, idx) => (
                                  (() => {
                                    const cardId = `${msg.id}-${idx}`;
                                    const isCollapsed = !!collapsedCards[cardId];
                                    const isCopied = !!copiedCards[cardId];
                                    return (
                                  <motion.article
                                    key={cardId}
                                    className={`${styles.assistantCard} ${styles[`cardTone${card.tone[0].toUpperCase()}${card.tone.slice(1)}`]}`}
                                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.22, delay: idx * 0.05, ease: [0.2, 0.9, 0.2, 1] }}
                                  >
                                    <div className={styles.assistantCardHeader}>
                                      <h4 className={styles.assistantCardTitle}>
                                        <span className={styles.assistantCardIcon}>{toneIcon(card.tone)}</span>
                                        {card.title}
                                      </h4>

                                      <div className={styles.assistantCardActions}>
                                        <button
                                          type="button"
                                          className={`${styles.cardActionBtn} ${isCopied ? styles.cardActionBtnCopied : ""}`}
                                          onClick={() => copyCardBody(cardId, card.body)}
                                          title="Copy section"
                                        >
                                          {isCopied ? "copied" : "copy"}
                                        </button>
                                        <button
                                          type="button"
                                          className={styles.cardActionBtn}
                                          onClick={() => toggleCardCollapse(cardId)}
                                          title={isCollapsed ? "Expand section" : "Collapse section"}
                                        >
                                          {isCollapsed ? "expand" : "collapse"}
                                        </button>
                                      </div>
                                    </div>

                                    {!isCollapsed && (
                                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                                        {card.body}
                                      </ReactMarkdown>
                                    )}
                                  </motion.article>
                                    );
                                  })()
                                ))}
                              </div>
                            )}
                          </>
                        );
                      })()
                    ) : (
                      msg.text
                    )}
                    {msg.streaming && <span className={styles.cursor} />}
                  </div>
                </div>
              ))}

              {streaming && messages[messages.length - 1]?.text === "" && (
                <div className={styles.thinkingRow}>
                  <span>processing</span>
                  <span className={styles.thinkingDots}>
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input ───────────────────────────────── */}
            <div className={styles.inputRow}>
              <span className={styles.promptSymbol}>❯</span>
              <TextareaAutosize
                ref={inputRef}
                minRows={1}
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.inputArea}
                placeholder={streaming ? "waiting for response..." : "ask anything...  (Enter · Shift+Enter for newline)"}
                disabled={streaming}
              />
              {streaming
                ? <button className={`${styles.sendBtn} ${styles.stopBtn}`} onClick={stopStream}>✕ stop</button>
                : <button className={styles.sendBtn} onClick={sendMessage}>send ↵</button>
              }
            </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className={styles.toggleBtn} onClick={() => setOpen((o) => !o)}>
        <span className={styles.toggleBtnDot} />
        {open ? "hide terminal" : "AI terminal"}
      </button>
    </div>
  );
};

export default TerminalChatbot;