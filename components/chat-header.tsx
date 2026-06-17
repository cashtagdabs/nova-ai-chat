"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NovaLogo } from "@/components/nova-logo";
import { useTheme } from "@/components/theme-provider";

// Public repo URL — surfaced in the header for the portfolio context.
const GITHUB_REPO_URL = "https://github.com/cashtagdabs/nova-ai-chat";

/** Inline GitHub mark (lucide v1 no longer ships brand icons). */
function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.31-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.19.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

/** Sticky top bar with the Nova logo + wordmark, GitHub link, and theme toggle. */
export function ChatHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <NovaLogo size={34} />
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight">Nova</p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              A streaming AI assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="View source on GitHub"
            className="border border-white/20 hover:border-white/40"
          >
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
              <GithubMark className="h-[18px] w-[18px]" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="border border-white/20 hover:border-white/40"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
