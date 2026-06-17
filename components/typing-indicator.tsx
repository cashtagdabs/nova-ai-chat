"use client";

import { motion } from "framer-motion";

/** Three softly-bouncing dots shown while waiting for the first token. */
export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1.5 px-1 py-1"
      role="status"
      aria-label="Nova is thinking"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-muted-foreground/70"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
