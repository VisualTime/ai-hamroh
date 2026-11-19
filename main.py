import json, os
from typing import Literal
from anthropic import Anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

load_dotenv()
client = Anthropic()  # ANTHROPIC_API_KEY faqat serverda (.env)
MODEL = os.getenv("MODEL", "claude-sonnet-4-6")
app = FastAPI(title="AI-Hamroh")

class Msg(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatIn(BaseModel):
    messages: list[Msg]
    level: str = "A2"
    topic: str = "free"
    language: str = "English"
    correction_mode: Literal["instant", "end"] = "instant"

SYSTEM = """You are AI-Hamroh, a patient, warm, supportive {language} conversation partner and tutor.
Learner level: {level}. Topic: {topic}.
Rules:
- Never judge or scold. Be encouraging. Adapt vocabulary, speed and sentence length to {level}.
- Keep the conversation going: reply naturally, ask one short follow-up question.
- Find mistakes in the learner's LAST message only. For each: original fragment, corrected form,
  a SHORT rule explanation in Uzbek (explanation_uz), and category (tense|article|preposition|word_order|vocabulary|other).
- Correction mode: {mode}. If "end", return corrections as [] (they are collected later).
- If there were mistakes, retry_prompt = "Keling, buni to'g'ri shaklda birga aytib ko'ramiz!" + the corrected full sentence. Else "".
- detected_level: your estimate of the learner's CEFR level (A1-C1).
Respond with ONLY valid JSON, no markdown:
{{"reply": str, "corrections": [{{"original": str, "corrected": str, "explanation_uz": str, "category": str}}], "retry_prompt": str, "detected_level": str}}"""

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/chat")
def chat(body: ChatIn):
    system = SYSTEM.format(language=body.language, level=body.level, topic=body.topic,
                           mode="instant" if body.correction_mode == "instant" else "end")
    text = ""
    try:
        r = client.messages.create(model=MODEL, max_tokens=1000, system=system,
                                   messages=[m.model_dump() for m in body.messages])
        text = "".join(b.text for b in r.content if b.type == "text")
        text = text.strip().removeprefix("```json").removesuffix("```").strip()
        data = json.loads(text)
    except json.JSONDecodeError:
        data = {"reply": text, "corrections": [], "retry_prompt": "", "detected_level": body.level}
    except Exception as e:
        raise HTTPException(502, f"AI xatosi: {e}")
    data.setdefault("corrections", []); data.setdefault("retry_prompt", "")
    data.setdefault("detected_level", body.level)
    return data
