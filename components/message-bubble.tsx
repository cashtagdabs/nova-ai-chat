"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Streamdown, type ThemeInput } from "streamdown";
import { code } from "@streamdown/code";
import type { UIMessage } from "ai";

import { cn } from "@/lib/utils";
import { getMessageText } from "@/lib/messages";
import { NovaLogo } from "@/components/nova-logo";

interface MessageBubbleProps {
  message: UIMessage;
  /** True only for the last assistant message while a response is streaming. */
  isStreaming: boolean;
}

// Shiki bundled themes for light / dark — matched to the app palette.
const SHIKI_THEMES: [ThemeInput, ThemeInput] = ["github-light", "github-dark"];

/**
 * A single chat row. User messages render right-aligned with a gradient
 * bubble; assistant messages render left-aligned and are rendered through
 * Streamdown for live Markdown + syntax highlighting.
 */
function MessageBubbleImpl({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const text = getMessageText(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && <NovaLogo size={30} className="mt-1 shrink-0" />}

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[80%]",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-primary to-accent text-primary-foreground"
            : "glass rounded-bl-md border border-border/60 bg-card/60 text-card-foreground",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words leading-relaxed">
            {text}
          </p>
        ) : (
          <Streamdown
            className="nova-md"
            plugins={{ code }}
            shikiTheme={SHIKI_THEMES}
            isAnimating={isStreaming}
            parseIncompleteMarkdown
          >
            {text}
          </Streamdown>
        )}
      </div>
    </motion.div>
  );
}

export const MessageBubble = memo(MessageBubbleImpl);
