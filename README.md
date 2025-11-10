
# 🌙 LuminaNovel

A modern full-stack platform for reading and publishing novels online — featuring a **Next.js (TypeScript)** frontend and a **FastAPI** backend. Built for performance, clarity, and scalability.

---

## 🚀 Tech Stack

### Frontend

* **Framework:** Next.js (App Router, TypeScript)
* **Styling:** Tailwind CSS + ShadCN UI
* **Package Manager:** Bun or pnpm
* **State & API:** React Query / TanStack Query

### Backend

* **Framework:** FastAPI (Python 3.12+)
* **ORM:** SQLAlchemy + Alembic
* **Database:** SQLite (dev), PostgreSQL (prod)
* **Auth:** JWT-based authentication
* **Testing:** Pytest + HTTPX TestClient

---

## 📦 Repository Setup

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/luminanovel.git
cd luminanovel
```

Project structure:

```
luminanovel/
├── frontend/     # Next.js app
└── backend/      # FastAPI app
```

---

## ⚡ Frontend Setup

### Using Bun (recommended)

```bash
cd frontend
bun install
bun dev
```

### Or using pnpm

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend runs at **[http://localhost:3000](http://localhost:3000)**.

---

## 🛠️ Backend Setup

### 1. Create virtual environment

```bash
cd backend
uv venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
```

### 2. Install dependencies

```bash
uv pip install -e .
```

### 3. Setup environment variables

Copy and modify the example file:

```bash
cp .env.example .env
```

### 4. Initialize the database

```bash
alembic upgrade head
```

### 5. Run the development server

```bash
uvicorn app.main:app --reload
```

Backend runs at **[http://localhost:8000](http://localhost:8000)**.

---

## 🧪 Testing

Run all backend tests with:

```bash
pytest --maxfail=1 --disable-warnings -q
```

---

## 📖 API Docs

Once running, explore:

* Swagger UI → [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc → [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧩 Developer Notes

* Use **Bun or pnpm** for frontend speed.
* Use **uv or pip** for backend isolation.
* Commit early, commit often — prefer feature branches.

---

## 🪶 License

MIT License © 2025 LuminaNovel Authors
