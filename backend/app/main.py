import os
import subprocess
from fastapi import FastAPI

from app.api.v1 import routes_auth, routes_author, routes_novel
from app.db.session import Base, engine

app = FastAPI(
    title="LuminaNovel API",
    version="1.0.0",
    description="Backend for the LuminaNovel reading platform."
)

def run_migrations():
    try:
        subprocess.run(["alembic", "upgrade", "head"], check=True)
        print("✅ Database up to date")
    except Exception as e:
        print("⚠️ Could not run migrations:", e)

@app.on_event("startup")
def on_startup():
    if os.getenv("ENV", "dev") == "dev":
        Base.metadata.create_all(bind=engine)
        print("🛠️ Created tables (dev mode)")
    else:
        run_migrations()

# Include routers
app.include_router(routes_auth.router)
app.include_router(routes_author.router)
app.include_router(routes_novel.router)

@app.get("/")
def root():
    return {"message": "Welcome to LuminaNovel API"}
