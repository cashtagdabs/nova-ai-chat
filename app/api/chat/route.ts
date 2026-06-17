import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai";

import { getDemoResponse } from "@/lib/demo-response";

// Run on the Edge runtime for fast, streaming-friendly responses.
export const runtime = "edge";
export const maxDuration = 30;

const SYSTEM_PROMPT =
  "You are Nova, a sharp, friendly AI assistant. Respond in rich Markdown — " +
  "use headings, bold, bullet lists, tables, and fenced code blocks with " +
  "language tags where helpful.";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // ---------------------------------------------------------------------------
  // Live path: stream real completions from OpenAI when a key is configured.
  // ---------------------------------------------------------------------------
  if (process.env.OPENAI_API_KEY) {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  }

  // ---------------------------------------------------------------------------
  // Demo fallback: no API key present. Stream a canned, markdown-rich answer
  // token-by-token so the public deployment ALWAYS works without an error.
  // ---------------------------------------------------------------------------
  const lastUserText = extractLastUserText(messages);
  const answer = getDemoResponse(lastUserText);

  const stream = createUIMessageStream({
    async execute({ writer }) {
      const id = crypto.randomUUID();
      writer.write({ type: "text-start", id });

      // Stream word-by-word with a small delay to emulate real token output.
      const tokens = answer.match(/\S+\s*/g) ?? [answer];
      for (const token of tokens) {
        writer.write({ type: "text-delta", id, delta: token });
        await sleep(18);
      }

      writer.write({ type: "text-end", id });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

/** Pull the plain-text content out of the most recent user message. */
function extractLastUserText(messages: UIMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return "";

  return lastUser.parts
    .filter((part): part is { type: "text"; text: string } =>
      Boolean(part) && part.type === "text" && "text" in part,
    )
    .map((part) => part.text)
    .join(" ")
    .trim();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
