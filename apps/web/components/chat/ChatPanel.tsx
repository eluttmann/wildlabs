"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Glass, Text, cn } from "@wildlabs/ui";

/**
 * Openers.
 *
 * A blank chat box on a portfolio is a dead end — visitors do not know what it
 * knows, so they either ask something it cannot answer or leave. These name the
 * corpus's actual shape.
 */
const SUGGESTIONS = [
  "What is Eric working on now?",
  "What did he build at LangChain?",
  "Where does spatial AI show up in his work?",
] as const;

export function ChatPanel() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  // Follow the stream. `smooth` fights Lenis, so this is an instant jump.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit(input);
  }

  return (
    <Glass tier="panel" className="flex h-[min(70vh,40rem)] flex-col overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-end gap-4">
            <Text step="body" tone="muted" measure>
              Ask about Eric&rsquo;s work. Answers come from his own records — if
              something isn&rsquo;t in them, it&rsquo;ll say so rather than guess.
            </Text>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => submit(suggestion)}
                  className="wl-type cursor-pointer rounded-[var(--wl-radius-full)] border border-[var(--wl-line)] bg-transparent px-4 py-2 text-[var(--wl-text-muted)] transition-colors duration-[var(--wl-duration-quick)] hover:border-[var(--wl-line-strong)] hover:text-[var(--wl-text)]"
                  data-step="label"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex flex-col gap-1.5", message.role === "user" && "items-end")}
              >
                <Text as="span" step="label" tone="subtle">
                  {message.role === "user" ? "You" : "Wild Labs"}
                </Text>
                <div className={cn(message.role === "user" && "text-right")}>
                  {/*
                    v5+ messages are part arrays, not a flat string — reasoning
                    and tool parts can appear alongside text. Only text renders.
                  */}
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <Text
                        key={index}
                        step="body"
                        measure={message.role !== "user"}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </Text>
                    ) : null,
                  )}
                </div>
              </div>
            ))}

            {status === "submitted" ? (
              <Text step="label" tone="subtle" aria-live="polite">
                Thinking
              </Text>
            ) : null}
          </div>
        )}

        {error ? (
          /* Generic by design — never leak model names, keys, or token limits. */
          <Text step="bodySmall" tone="muted" className="mt-6" role="status">
            That didn&rsquo;t go through. Try again in a moment.
          </Text>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 border-t border-[var(--wl-line)] p-4 md:px-8"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask about Eric&rsquo;s work
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about the work"
          autoComplete="off"
          disabled={busy}
          className="wl-type min-w-0 flex-1 border-none bg-transparent text-[var(--wl-text)] outline-none placeholder:text-[var(--wl-text-subtle)] disabled:opacity-50"
          data-step="body"
        />
        <button
          type="submit"
          disabled={busy || input.trim().length === 0}
          className="wl-type cursor-pointer rounded-[var(--wl-radius-full)] border border-[var(--wl-line)] bg-transparent px-4 py-2 text-[var(--wl-text)] transition-all duration-[var(--wl-duration-quick)] hover:border-[var(--wl-line-strong)] disabled:cursor-not-allowed disabled:opacity-40"
          data-step="label"
        >
          Send
        </button>
      </form>
    </Glass>
  );
}
