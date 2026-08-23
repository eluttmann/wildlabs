import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildSystemPrompt } from "@wildlabs/content";
import { checkRateLimit, getClientId } from "../../../lib/rate-limit";

export const maxDuration = 30;

/**
 * Grounded chat over the content corpus.
 *
 * The system prompt carries the full validated record set and forbids inventing
 * anything outside it — see packages/content/src/corpus.ts. A portfolio chatbot
 * that fabricates a job title is worse than having no chatbot, and this is the
 * surface where that failure is most expensive.
 */

/**
 * Claude Opus 5 by default.
 *
 * Overridable by env so cost is an operator decision rather than one baked into
 * the code. `claude-sonnet-5` is the obvious cheaper swap if this route ever
 * takes real traffic.
 */
const MODEL = process.env.WILDLABS_CHAT_MODEL ?? "claude-opus-5";

const MAX_REQUESTS_PER_HOUR = Number(process.env.CHAT_MAX_REQUESTS_PER_HOUR ?? 20);
const MAX_OUTPUT_TOKENS = Number(process.env.CHAT_MAX_OUTPUT_TOKENS ?? 1024);

/** Bounds the input side too — the corpus is fixed, so history is the only variable cost. */
const MAX_MESSAGES = 24;

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    // Never surface a missing key to the client — that is server config, and
    // the UI degrades to a quiet unavailable state.
    console.error("[chat] ANTHROPIC_API_KEY is not set");
    return new Response(JSON.stringify({ error: "unavailable" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  const clientId = getClientId(request);
  const limit = checkRateLimit(clientId, MAX_REQUESTS_PER_HOUR);

  if (!limit.ok) {
    return new Response(JSON.stringify({ error: "rate_limited" }), {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
      },
    });
  }

  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    if (!Array.isArray(body.messages)) throw new Error("messages must be an array");
    messages = body.messages.slice(-MAX_MESSAGES);
  } catch {
    return new Response(JSON.stringify({ error: "bad_request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const result = streamText({
    model: anthropic(MODEL),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    providerOptions: {
      anthropic: {
        /**
         * Thinking stays on, effort goes down.
         *
         * Disabling thinking on Opus 5 has two known failure modes — tool calls
         * written into visible text, and leaked internal tags. Low effort is the
         * correct lever for a task this simple: it cuts cost without either.
         */
        thinking: { type: "adaptive" },
        effort: "low",
      },
    },
    onError: ({ error }) => {
      // Log server-side; the client only ever sees a generic failure.
      console.error("[chat] stream error", error);
    },
  });

  return result.toUIMessageStreamResponse();
}
