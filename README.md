# Nova — A streaming AI assistant

A production-quality, **streaming AI chat** application built as a portfolio
showcase. Nova answers in rich Markdown — headings, tables, task lists, and
syntax-highlighted code — rendered **live, token-by-token** as the model types.

> **Live demo:** the deployment works even without an API key. When
> `OPENAI_API_KEY` is absent, the backend streams curated, markdown-rich demo
> answers so the link never shows an error.

![Nova streaming a response](./docs/screenshot.png)

---

## ✨ Features

- **Real token streaming** via the Vercel AI SDK + Server-Sent Events.
- **Rich Markdown rendering** with [Streamdown](https://streamdown.ai) — tables,
  lists, blockquotes, and more, with graceful handling of *unterminated*
  markdown mid-stream (no flicker, no broken syntax).
- **Syntax highlighting** through the `@streamdown/code` plugin (Shiki), with
  matched light/dark themes.
- **Animated streaming caret** while the assistant is typing.
- **Polished design** — deep-slate dark mode (default) with a refined violet→cyan
  accent, glassy message bubbles, an ambient gradient backdrop, and a
  light/dark toggle.
- **Framer Motion** message enter animations + a 3-dot typing indicator.
- **Thoughtful composer** — auto-growing textarea, Enter-to-send /
  Shift+Enter-for-newline, a disabled state while streaming, and a **Stop**
  button to cancel generation.
- **Empty state** with the Nova logo, tagline, and four example prompt chips
  that pre-fill and send.
- **Fully responsive** and **accessible** (roles, `aria-label`s, focus states,
  keyboard navigation).
- **Pro link previews** — favicon, dynamic OpenGraph image, and rich metadata.

---

## 🧱 Stack

| Layer        | Tech                                                        |
| ------------ | ---------------------------------------------------------- |
| Framework    | [Next.js 15](https://nextjs.org) (App Router, TypeScript)  |
| AI           | [Vercel AI SDK](https://sdk.vercel.ai) (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`) |
| Markdown     | [Streamdown](https://streamdown.ai) + `@streamdown/code`   |
| Styling      | Tailwind CSS v3 + [shadcn/ui](https://ui.shadcn.com)       |
| Motion/Icons | Framer Motion + lucide-react                               |
| Hosting      | [Vercel](https://vercel.com)                               |

---

## 🔌 How streaming + Streamdown work

### 1. The backend streams a UI message stream

`app/api/chat/route.ts` is an **Edge** route handler.

- **With a key:** it calls `streamText({ model: openai("gpt-4o-mini"), ... })`
  and returns `result.toUIMessageStreamResponse()` — a Server-Sent Events stream
  of typed UI-message chunks (`text-start` → `text-delta` × N → `text-end`).
- **Without a key (demo mode):** it builds an equivalent stream by hand with
  `createUIMessageStream`, emitting the same chunk types word-by-word with a
  small delay. The client can't tell the difference, so the demo always streams.

### 2. The client consumes the stream with `useChat`

`components/chat.tsx` uses `useChat` from `@ai-sdk/react` with a
`DefaultChatTransport` pointed at `/api/chat`. It exposes `messages`, `status`
(`ready | submitted | streaming | error`), `sendMessage`, and `stop`. Messages
are **parts-based** — we concatenate their text parts for rendering.

### 3. Streamdown renders Markdown as it arrives

`components/message-bubble.tsx` renders assistant text through:

```tsx
<Streamdown
  plugins={{ code }}              // Shiki syntax highlighting
  shikiTheme={["github-light", "github-dark"]}
  isAnimating={isStreaming}      // animated caret on the live message
  parseIncompleteMarkdown        // gracefully handle half-finished syntax
>
  {text}
</Streamdown>
```

Because Streamdown **natively** repairs unterminated Markdown (an open code
fence, a half-written table, a dangling bold marker), there is **no custom regex**
— the partial stream always renders cleanly, and snaps into final form once the
last token lands.

---

## 🚀 Run locally

```bash
# 1. Install
npm install

# 2. (Optional) add an OpenAI key for live responses
cp .env.example .env.local
#   then edit .env.local and set OPENAI_API_KEY=sk-...

# 3. Dev server
npm run dev      # http://localhost:3000

# 4. Production build
npm run build && npm run start
```

> **No key? No problem.** Skip step 2 and Nova runs in demo mode, streaming
> curated answers. This is exactly how the public deployment behaves.

---

## 🔑 Environment variables

| Variable         | Required | Description                                                       |
| ---------------- | -------- | ----------------------------------------------------------------- |
| `OPENAI_API_KEY` | No       | Enables live `gpt-4o-mini` responses. If unset, demo mode is used. |

See [`.env.example`](./.env.example).

---

## 🗂️ Project structure

```
app/
  api/chat/route.ts     # Edge streaming endpoint (live + demo fallback)
  layout.tsx            # Metadata, fonts, theme provider, OG/favicon
  page.tsx              # Renders <Chat /> + ambient backdrop
  icon.svg              # Favicon
  opengraph-image.tsx   # Dynamic OG card
components/
  chat.tsx              # Owns useChat state + layout
  chat-header.tsx       # Sticky header, logo, theme toggle
  message-list.tsx      # Scrolling list + auto-scroll + typing indicator
  message-bubble.tsx    # User / assistant bubble + Streamdown rendering
  composer.tsx          # Auto-growing textarea, send/stop, keyboard UX
  typing-indicator.tsx  # Animated 3-dot indicator
  empty-state.tsx       # Hero + example prompt chips
  theme-provider.tsx    # Dependency-free dark/light theme
  nova-logo.tsx         # Gradient spark logo mark
  ui/                   # shadcn/ui primitives (button, textarea, scroll-area)
lib/
  demo-response.ts      # Curated markdown answers for demo mode
  example-prompts.ts    # Empty-state chips
  messages.ts           # UIMessage text helpers
  utils.ts              # cn() class merge
```

---

## 📦 Deploy

Deployed on **Vercel**. To deploy your own:

```bash
npm i -g vercel
vercel --prod
```

Optionally set `OPENAI_API_KEY` in the Vercel project settings to switch from
demo mode to live responses.

---

Built with care as a portfolio piece. PRs and stars welcome.
