import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db.session import Base, get_db

# -----------------------------------
# Test Database Configuration
# -----------------------------------
# Use a temporary SQLite database (file-based or in-memory)
TEST_DB_URL = "sqlite:///./test_database.db"
# For true isolation (no files), use this instead:
# TEST_DB_URL = "sqlite:///:memory:"

# Create SQLAlchemy engine and session factory for testing
engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


# -----------------------------------
# Database Setup & Teardown (per test session)
# -----------------------------------
@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    """
    Create all tables before the test session starts,
    and drop them after all tests finish.
    """
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    # Optional cleanup
    if os.path.exists("./test_database.db"):
        os.remove("./test_database.db")


# -----------------------------------
# Override the get_db dependency
# -----------------------------------
def override_get_db():
    """
    Override dependency for database sessions during testing.
    Each test gets its own fresh session.
    """
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


# Inject the override into the app before running tests
app.dependency_overrides[get_db] = override_get_db


# -----------------------------------
# FastAPI TestClient fixture
# -----------------------------------
@pytest.fixture(scope="function")
def client():
    """
    Provides a FastAPI TestClient instance with overridden DB.
    Resets data between tests for isolation.
    """
    # Ensure fresh tables for each test (if using file-based SQLite)
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
