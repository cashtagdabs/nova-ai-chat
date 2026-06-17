/**
 * Demo fallback content.
 *
 * When `OPENAI_API_KEY` is absent (e.g. on a public portfolio deployment),
 * the chat route streams one of these canned, markdown-rich answers
 * token-by-token so the live demo always works flawlessly — no key, no error.
 *
 * Answers are keyed loosely by intent so the four example prompt chips each
 * return a tailored, impressive response. Anything else falls back to a
 * friendly capabilities overview.
 */

const ASYNC_AWAIT = `## Async / await in JavaScript

\`async\`/\`await\` is syntactic sugar over Promises that lets you write
asynchronous code that **reads like synchronous code** — no callback nesting.

- An \`async\` function always returns a **Promise**.
- \`await\` pauses execution until the awaited Promise settles.
- Wrap awaits in \`try/catch\` to handle rejections.

\`\`\`js
// Fetch a user, then their posts — sequentially, but readable.
async function getUserPosts(userId) {
  try {
    const userRes = await fetch(\`/api/users/\${userId}\`);
    if (!userRes.ok) throw new Error("User not found");
    const user = await userRes.json();

    const postsRes = await fetch(\`/api/users/\${user.id}/posts\`);
    const posts = await postsRes.json();

    return { user, posts };
  } catch (err) {
    console.error("Failed to load posts:", err);
    return null;
  }
}
\`\`\`

> **Tip:** Need things in parallel? Use \`await Promise.all([...])\` to fire
> requests concurrently instead of one after another.`;

const REST_VS_GRAPHQL = `## REST vs GraphQL

Both are ways to build an API — they just make different trade-offs.

| Dimension | REST | GraphQL |
| --- | --- | --- |
| **Endpoints** | Many (one per resource) | One (\`/graphql\`) |
| **Data shape** | Fixed per endpoint | Client picks exact fields |
| **Over-/under-fetching** | Common | Avoided by design |
| **Caching** | Easy (HTTP, CDN) | Harder (needs tooling) |
| **Versioning** | \`/v1\`, \`/v2\` | Evolve schema, deprecate fields |
| **Learning curve** | Low | Moderate |
| **Best for** | Simple, cacheable CRUD | Complex, nested, client-driven UIs |

**Rule of thumb**

- Reach for **REST** when your resources are simple and HTTP caching matters.
- Reach for **GraphQL** when clients need flexible, deeply-nested data and you
  want to avoid shipping a dozen bespoke endpoints.`;

const SAAS_CHECKLIST = `## Shipping a SaaS MVP — launch checklist

### Foundations
- [x] Validate the problem with 5–10 target users
- [x] Lock a tight scope (one core workflow, done well)
- [ ] Pick a boring, reliable stack you already know

### Build
- [ ] Auth + billing (Stripe) wired end-to-end
- [ ] Core feature with empty / loading / error states
- [ ] Transactional email (welcome, receipts, password reset)

### Before launch
- [ ] Analytics + error tracking installed
- [ ] Landing page with clear value prop and pricing
- [ ] Terms, privacy policy, and a support email

### Launch day
- [ ] Soft-launch to your waitlist
- [ ] Post to relevant communities
- [ ] Watch logs, reply to every signup personally

> **Ship the smallest thing that delivers real value, then iterate in public.**`;

const PYTHON_FN = `## A documented Python function

Here's a clean, typed helper with comments explaining each step.

\`\`\`python
from typing import Iterable


def moving_average(values: Iterable[float], window: int) -> list[float]:
    """Compute the simple moving average over a sliding window.

    Args:
        values: The sequence of numbers to smooth.
        window: How many items to average at a time (must be >= 1).

    Returns:
        A list of averages, one per full window.
    """
    nums = list(values)            # materialize so we can index/slice
    if window < 1:
        raise ValueError("window must be >= 1")

    averages: list[float] = []
    # Slide the window one step at a time across the data.
    for i in range(len(nums) - window + 1):
        chunk = nums[i : i + window]      # current window slice
        averages.append(sum(chunk) / window)
    return averages


# Example: smooth a noisy series with a 3-point window.
print(moving_average([10, 12, 14, 13, 15], window=3))
# -> [12.0, 13.0, 14.0]
\`\`\`

The function is **pure** (no side effects), **typed**, and validates its input
up front — easy to test and reuse.`;

const DEFAULT = `## Hey, I'm Nova ✨

I'm a streaming AI assistant built to show off **rich Markdown rendering**.
This is a live demo running without an API key, so I'm replying from a curated
set of answers — but the streaming, syntax highlighting, and rendering are all
100% real.

Try one of these to see what I can do:

1. **Explain async/await** — with a fenced, highlighted code block
2. **Compare REST vs GraphQL** — rendered as a clean table
3. **A SaaS MVP checklist** — task-list Markdown
4. **A Python function** — typed and commented

\`\`\`ts
// Everything streams in token-by-token, with a live caret.
type Demo = { streaming: true; highlighting: "shiki"; vibes: "immaculate" };
\`\`\`

Wire up an \`OPENAI_API_KEY\` and I'll switch to live \`gpt-4o-mini\` responses.`;

/** Pick the best canned answer for a given user prompt. */
export function getDemoResponse(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("async") || p.includes("await")) return ASYNC_AWAIT;
  if (p.includes("rest") || p.includes("graphql")) return REST_VS_GRAPHQL;
  if (
    p.includes("checklist") ||
    p.includes("saas") ||
    p.includes("mvp") ||
    p.includes("ship")
  )
    return SAAS_CHECKLIST;
  if (
    p.includes("python") ||
    (p.includes("function") && p.includes("comment")) ||
    p.includes("def ")
  )
    return PYTHON_FN;

  return DEFAULT;
}
