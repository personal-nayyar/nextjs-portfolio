/**
 * Provider-neutral chat protocol (text-only).
 *
 * The browser and `/api/chat` speak ONLY this neutral shape. Each provider
 * adapter (Gemini, OpenRouter, …) translates it to and from its own wire
 * format, so switching providers never touches the client. Select the active
 * provider at deploy time with the CHAT_PROVIDER env var.
 *
 * @typedef {{ role: "user" | "assistant", text: string }} NeutralMessage
 *   One entry in the conversation the client replays on every turn.
 *
 * @typedef {{ text: string }} NeutralAssistantMessage
 *   What the model returns on a turn (prose only — no tools).
 *
 * @typedef {{ system: string, messages: NeutralMessage[] }} GenerateInput
 *   `system` is the already-rendered system instruction.
 *
 * @typedef {{ ok: true, message: NeutralAssistantMessage }
 *          | { ok: false, error: string }} GenerateResult
 *
 * @typedef {{ name: string,
 *             generate: (input: GenerateInput) => Promise<GenerateResult> }} ChatProvider
 *   Every provider adapter implements this.
 */

export {};
