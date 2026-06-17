import type { UIMessage } from "ai";

/** Concatenate all text parts of a UI message into a single string. */
export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } =>
      part.type === "text" && "text" in part,
    )
    .map((part) => part.text)
    .join("");
}
