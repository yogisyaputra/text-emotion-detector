from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
from deep_translator import GoogleTranslator

# Inisialisasi aplikasi FastAPI
app = FastAPI()

# Allow request dari frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model deteksi emosi dari Hugging Face
classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    return_all_scores=True
)

# Fungsi translate dengan deep-translator
def translate_to_english(text: str) -> str:
    try:
        return GoogleTranslator(source='auto', target='en').translate(text)
    except Exception as e:
        print("Translation error:", e)
        return text  # fallback jika gagal translate

# Model input dari user
class TextRequest(BaseModel):
    text: str
    lang: str = "en"  # default English

# Endpoint untuk prediksi emosi
@app.post("/predict")
def predict_emotion(req: TextRequest):
    result = classifier(req.text)
    return {"emotions": result[0]}


# Endpoint untuk prediksi emosi
@app.post("/predict/v2")
def predict_emotion(req: TextRequest):
    input_text = req.text

    # Translate jika input Bahasa Indonesia
    if req.lang == "id":
        input_text = translate_to_english(req.text)
        print(f"[DEBUG] Translated: {req.text} -> {input_text}")

    # Klasifikasi emosi
    result = classifier(input_text)

    return {"emotions": result[0]}