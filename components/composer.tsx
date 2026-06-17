"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
import type { ChatStatus } from "ai";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ComposerProps {
  status: ChatStatus;
  onSend: (text: string) => void;
  onStop: () => void;
}

const MAX_TEXTAREA_HEIGHT = 200;

/**
 * Sticky bottom composer with an auto-growing textarea.
 * - Enter sends, Shift+Enter inserts a newline.
 * - Send button is disabled while streaming; a Stop button replaces it.
 */
export function Composer({ status, onSend, onStop }: ComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isBusy = status === "submitted" || status === "streaming";

  // Auto-grow the textarea to fit its content, up to a max height.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [value]);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || isBusy) return;
    onSend(trimmed);
    setValue("");
    // Reset height after clearing.
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="glass sticky bottom-0 z-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-3xl px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-end gap-2 rounded-2xl border border-border/70 bg-card/50 p-2 shadow-sm transition-colors focus-within:border-primary/50"
        >
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message Nova…"
            aria-label="Message Nova"
            className="max-h-[200px] flex-1 resize-none border-0 bg-transparent py-2 focus-visible:ring-0"
          />

          {isBusy ? (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={onStop}
              aria-label="Stop generating"
              className="h-10 w-10 shrink-0 rounded-full border border-white/20 ring-1 ring-border/50 hover:border-white/40"
            >
              <Square className="h-4 w-4 fill-current" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!value.trim()}
              aria-label="Send message"
              className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-white/25 transition-all hover:shadow-primary/40 hover:brightness-105 disabled:shadow-none"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          )}
        </form>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Nova can make mistakes. Press{" "}
          <kbd className="rounded border border-border px-1 font-mono">
            Enter
          </kbd>{" "}
          to send,{" "}
          <kbd className="rounded border border-border px-1 font-mono">
            Shift+Enter
          </kbd>{" "}
          for a new line.
        </p>
      </div>
    </div>
  );
}
