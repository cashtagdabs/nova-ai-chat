"use client";

import { useEffect, useRef } from "react";
import type { ChatStatus, UIMessage } from "ai";

import { MessageBubble } from "@/components/message-bubble";
import { TypingIndicator } from "@/components/typing-indicator";
import { NovaLogo } from "@/components/nova-logo";
import { getMessageText } from "@/lib/messages";

interface MessageListProps {
  messages: UIMessage[];
  status: ChatStatus;
}

/**
 * Scrollable message column with smooth auto-scroll to the bottom as new
 * tokens arrive. A typing indicator shows after submit, before the first
 * assistant token lands.
 */
export function MessageList({ messages, status }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const isStreaming = status === "streaming";
  const isSubmitted = status === "submitted";

  // Show the standalone typing indicator only while waiting for the first
  // token — i.e. submitted, or streaming but the assistant text is still empty.
  const waitingForFirstToken =
    isSubmitted ||
    (isStreaming &&
      lastMessage?.role === "assistant" &&
      getMessageText(lastMessage).length === 0);

  // Auto-scroll to bottom whenever messages or status change.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      {messages.map((message, i) => {
        const isLast = i === messages.length - 1;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={isStreaming && isLast && message.role === "assistant"}
          />
        );
      })}

      {waitingForFirstToken && (
        <div className="flex w-full gap-3">
          <NovaLogo size={30} className="mt-1 shrink-0" />
          <div className="glass rounded-2xl rounded-bl-md border border-border/60 bg-card/60 px-4 py-3">
            <TypingIndicator />
          </div>
        </div>
      )}

      <div ref={bottomRef} className="h-px" />
    </div>
  );
}
