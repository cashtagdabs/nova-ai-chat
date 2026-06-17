"use client";

import { motion } from "framer-motion";

import { NovaLogo } from "@/components/nova-logo";
import { EXAMPLE_PROMPTS } from "@/lib/example-prompts";

/**
 * Hero empty state: large logo, tagline, and four clickable prompt chips that
 * pre-fill and send a message immediately.
 */
export function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <NovaLogo size={72} className="mb-6" />
        <h1 className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          Meet Nova
        </h1>
        <p className="mt-3 max-w-md text-balance text-sm text-muted-foreground sm:text-base">
          A streaming AI assistant that answers in rich Markdown — code, tables,
          lists, and more, rendered live as it types.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
        className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {EXAMPLE_PROMPTS.map(({ icon: Icon, label, prompt }) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card/40 p-4 text-left transition-all hover:border-primary/50 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition-colors group-hover:from-primary/25 group-hover:to-accent/25">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium">{label}</span>
              <span className="line-clamp-1 text-xs text-muted-foreground">
                {prompt}
              </span>
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
