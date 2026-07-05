/**
 * OpenRouter adapter for the provider-neutral chat protocol (text-only).
 *
 * Translates the neutral shape (see ./types) to and from OpenRouter's
 * OpenAI-compatible Chat Completions wire format. The client never sees any
 * of this — it speaks only the neutral protocol.
 */

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

/** Map a neutral conversation entry to an OpenAI-shaped message. */
function toOpenAIMessage(m) {
  if (m.role === "user") {
    return { role: "user", content: m.text };
  }
  // role === "assistant"
  return { role: "assistant", content: m.text ?? "" };
}

/** Human-friendly error copy keyed off the HTTP status. */
function errorForStatus(status) {
  if (status === 401 || status === 403) {
    return "The assistant rejected the request — check that OPENROUTER_API_KEY is valid.";
  }
  if (status === 402 || status === 429) {
    return "The assistant has hit its usage limit right now. Please try again later.";
  }
  return "The assistant is having trouble right now. Please try again in a moment.";
}

export const openrouterProvider = {
  name: "openrouter",

  async generate(input) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error:
          "The assistant isn't configured — set OPENROUTER_API_KEY in .env.local and restart the dev server.",
      };
    }

    const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

    // Build the OpenAI-compatible request body. max_tokens is REQUIRED —
    // omitting it makes the free key return HTTP 402 "requires more credits".
    const body = {
      model,
      max_tokens: 1024,
      temperature: 0.4,
      messages: [
        { role: "system", content: input.system },
        ...input.messages.map(toOpenAIMessage),
      ],
    };

    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
          // Optional attribution headers (used by OpenRouter for rankings).
          "HTTP-Referer": "https://mohd-nayyar.portfolio.local",
          "X-Title": "Mohd Nayyar Portfolio",
        },
        body: JSON.stringify(body),
      });
    } catch {
      return {
        ok: false,
        error: "Couldn't reach the assistant service. Please try again.",
      };
    }

    // Parse defensively — a non-2xx response may not be valid JSON.
    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok || data.error) {
      const detail = data.error?.message || res.statusText || "unknown error";
      console.error(`[chat:openrouter] ${res.status}: ${detail}`);
      return { ok: false, error: errorForStatus(res.status) };
    }

    const content = data.choices?.[0]?.message?.content;
    const text = typeof content === "string" ? content : "";

    if (!text) {
      return { ok: false, error: "I didn't catch that. Could you rephrase?" };
    }

    return { ok: true, message: { text } };
  },
};
