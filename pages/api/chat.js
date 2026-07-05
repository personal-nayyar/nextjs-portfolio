import { getProvider } from "../../lib/chat/provider";
import { buildSystemInstruction } from "../../lib/chat/systemPrompt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Missing conversation." });
      }
    }

    const messages = body && body.messages;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing conversation." });
    }

    const provider = getProvider();
    const result = await provider.generate({
      system: buildSystemInstruction(),
      messages
    });

    if (result.ok) {
      return res.status(200).json({ message: result.message });
    }
    return res.status(200).json({ error: result.error });
  } catch (err) {
    return res.status(500).json({
      error: "The assistant is having trouble right now. Please try again."
    });
  }
}
