/**
 * Gemini adapter for the provider-neutral chat protocol (text-only).
 *
 * Translates the neutral shape (see ./types) to and from the Google Generative
 * Language REST API (`generateContent`), so the client never sees Gemini's wire
 * format. Runs on the Node runtime with plain `fetch`.
 */

/**
 * Convert neutral messages to Gemini `contents`.
 * user -> role "user"; assistant -> role "model".
 */
function toGeminiContents(messages) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text }],
  }));
}

export const geminiProvider = {
  name: "gemini",

  async generate(input) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return {
        ok: false,
        error:
          "The assistant isn't configured — set GEMINI_API_KEY in .env.local and restart the dev server.",
      };
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const body = {
      systemInstruction: { parts: [{ text: input.system }] },
      contents: toGeminiContents(input.messages),
      generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
    };

    let res;
    try {
      res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(body),
      });
    } catch {
      return {
        ok: false,
        error: "Couldn't reach the assistant service. Please try again.",
      };
    }

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[chat:gemini] ${res.status}: ${detail}`);
      const error =
        res.status === 400 || res.status === 403
          ? "The assistant rejected the request — check that GEMINI_API_KEY is valid."
          : "The assistant is having trouble right now. Please try again in a moment.";
      return { ok: false, error };
    }

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];

    // Concatenate all text parts.
    const text = parts
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("")
      .trim();

    if (!text) {
      if (candidate?.finishReason === "SAFETY") {
        return {
          ok: false,
          error:
            "I can't help with that one — but I'm happy to talk about Mohd Nayyar's work and experience!",
        };
      }
      return { ok: false, error: "I didn't catch that. Could you rephrase?" };
    }

    return { ok: true, message: { text } };
  },
};
