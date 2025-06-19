# 💬 Emotion Detector from Text Comments

Deteksi emosi dari komentar teks menggunakan **FastAPI** di backend dan **React + Vite** di frontend.  
Model AI ini mendukung Bahasa Indonesia dan Inggris secara otomatis, menggunakan pendekatan **zero-shot classification**.

---

## 🚀 Fitur Utama

- 🔤 **Multibahasa**: Bahasa Indonesia & Inggris (otomatis terdeteksi).
- 📊 **Visualisasi Emosi**: Grafik batang untuk melihat emosi dominan.
- 🔁 **Toggle Bahasa UI**: Pilih antara UI Bahasa Indonesia atau Inggris.
- ⚡ **Real-time**: API FastAPI cepat, cocok untuk integrasi lanjut.

---

## 📦 Teknologi yang Digunakan

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- 🤗 [Transformers - `joeddav/xlm-roberta-large-xnli`](https://huggingface.co/joeddav/xlm-roberta-large-xnli)
- CORS Middleware

### Frontend
- React + Vite
- Recharts (untuk grafik)
- Toggle Bahasa (ID/EN)

---

## 📂 Struktur Direktori

```
emotion-detector/
│
├── backend/
│   ├── main.py        # FastAPI app
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── App.jsx    # UI dan fetch API
│   └── package.json
│
└── README.md
```

---

## 🧪 Cara Menjalankan

### 1. Clone Repo
```bash
git clone https://github.com/yogisyaputra/text-emotion-detector.git
cd emotion-detector
```

### 2. Jalankan Backend (FastAPI)
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
pip install fastapi uvicorn transformers torch
uvicorn main:app --reload
```

### 3. Jalankan Frontend (React)
```bash
cd frontend
npm create vite@latest frontend -- --template react
npm install
npm run dev
```

---

## 💡 Pengembangan Selanjutnya

- ✅ Tambahkan fine-tuning dengan dataset lokal
- ✅ Mode belajar (user koreksi prediksi)
- ✅ Ekspor hasil ke PDF atau Excel
- ✅ Versi mobile / PWA

---

## 🤝 Kontribusi

Silakan open issue atau pull request jika ingin bantu kembangkan 🙌  
Atau diskusi bareng saya via LinkedIn: [linkedin.com/in/yogisyaputra](https://linkedin.com/in/yogisyaputra)

---

## 📸 Demo

Linke Demo [here](https://youtube.com/shorts/1H-WDQ0gWwg?feature=share)

---

## 📣 License

MIT License - bebas digunakan untuk belajar maupun komersial.
