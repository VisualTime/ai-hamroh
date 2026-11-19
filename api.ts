// Android emulator: http://10.0.2.2:8000, iOS simulator: http://localhost:8000. Haqiqiy telefonda kompyuter IP'sini yozing.
export const API_URL = "http://localhost:8000";
export type Correction = { original: string; corrected: string; explanation_uz: string; category: string };
export type ChatOut = { reply: string; corrections: Correction[]; retry_prompt: string; detected_level: string };
export type Msg = { role: "user" | "assistant"; content: string };

export async function sendChat(messages: Msg[], opts: { level: string; topic: string; correction_mode: "instant" | "end" }): Promise<ChatOut> {
  const res = await fetch(`${API_URL}/chat`, { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, ...opts }) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
