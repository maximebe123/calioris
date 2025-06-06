# 🌌 Calioris

**Calioris** is an elegant IT Asset Management (ITAM) platform that helps teams keep full visibility and control over their digital assets — with clarity, structure, and style.

---

## ⚙️ Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **API Docs**: Swagger (via FastAPI)
- **Dev Tools**: Docker + Docker Compose

---

## 🎨 Color Palette

| Name             | Hex       | Usage               |
|------------------|-----------|---------------------|
| **Deep Indigo**  | `#4B3F72` | Primary UI elements, nav bars  
| **Soft Lavender**| `#E4D9F7` | Backgrounds, cards  
| **Pearl White**  | `#F8F7FA` | Base background  
| **Slate Gray**   | `#3A3A3A` | Main text color  
| **Gold Accent**  | `#C9A85D` | Highlights, buttons, icons  

> 🎨 Style: Minimal, elegant, calm. Inspired by astronomy, clarity & structure.

## 🚀 Getting Started

To start the front-end development server:

```bash
cd frontend
npm install
npm run dev
```


To start the backend API server:

```bash
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

The backend exposes `/signup` and `/login` endpoints for account creation and authentication.
It also exposes CRUD endpoints under `/assets` to manage assets.
Additionally, a stock management module is available via `/stock_items` for tracking inventory.
