"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { ChatHeader } from "@/components/chat-header";
import { MessageList } from "@/components/message-list";
import { EmptyState } from "@/components/empty-state";
import { Composer } from "@/components/composer";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * Top-level chat experience. Owns the `useChat` state and lays out the
 * header, scrollable message list, and sticky composer.
 */
export function Chat() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isEmpty = messages.length === 0;

  function send(text: string) {
    sendMessage({ text });
  }

  return (
    <div className="flex h-[100dvh] flex-col">
      <ChatHeader />

      <main className="relative flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {isEmpty ? (
            <div className="min-h-full">
              <EmptyState onPick={send} />
            </div>
          ) : (
            <MessageList messages={messages} status={status} />
          )}
        </ScrollArea>
      </main>

      <Composer status={status} onSend={send} onStop={stop} />
    </div>
  );
}
