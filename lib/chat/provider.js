import { geminiProvider } from "./providers/gemini";
import { openrouterProvider } from "./providers/openrouter";

/** Which provider is active, from CHAT_PROVIDER (defaults to openrouter). */
export function activeProviderName() {
  return (process.env.CHAT_PROVIDER || "openrouter").toLowerCase() === "gemini"
    ? "gemini"
    : "openrouter";
}

/** Resolve the active provider adapter. */
export function getProvider(name = activeProviderName()) {
  return name === "gemini" ? geminiProvider : openrouterProvider;
}
