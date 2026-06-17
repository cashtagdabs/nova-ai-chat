import {
  Code2,
  Table2,
  ListChecks,
  FileCode2,
  type LucideIcon,
} from "lucide-react";

export interface ExamplePrompt {
  icon: LucideIcon;
  label: string;
  prompt: string;
}

/**
 * Empty-state suggestion chips. Each is chosen to show off a different
 * Markdown capability: code, tables, task lists, and commented code.
 */
export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    icon: Code2,
    label: "Explain async/await",
    prompt: "Explain async/await with a code example",
  },
  {
    icon: Table2,
    label: "REST vs GraphQL",
    prompt: "Compare REST vs GraphQL in a table",
  },
  {
    icon: ListChecks,
    label: "SaaS MVP checklist",
    prompt: "Give me a markdown checklist for shipping a SaaS MVP",
  },
  {
    icon: FileCode2,
    label: "Python function",
    prompt: "Write a Python function with comments",
  },
];
