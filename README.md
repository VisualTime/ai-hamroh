# AI-Hamroh (1–2-bosqich)

## Backend
cd backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && cp .env.example .env   # ANTHROPIC_API_KEY ni yozing
uvicorn main:app --reload --host 0.0.0.0 --port 8000
Tekshirish: curl localhost:8000/health  ->  {"ok":true}

## Mobil
cd mobile && npm install && npx expo start
src/api.ts dagi API_URL ni sozlang (Android emulator: http://10.0.2.2:8000; haqiqiy telefon: kompyuter IP'si).
