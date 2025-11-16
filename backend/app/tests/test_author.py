import pytest

# --- Helpers ---
def signup_and_login(client):
    """Create a user and return headers + user_id."""
    # Sign up
    client.post(
        "/auth/signup",
        json={
            "email": "reader@example.com",
            "username": "reader",
            "password": "Test@1234",
        },
    )

    # Login
    login = client.post(
        "/auth/login",
        json={"email": "reader@example.com", "password": "Test@1234"},
    )
    assert login.status_code == 200
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Fetch current user
    user = client.get("/auth/me", headers=headers).json()
    return headers, user["id"]


# --- Tests ---
def test_create_author(client):
    """✅ POST /authors → should create a new author"""
    headers, user_id = signup_and_login(client)

    response = client.post(
        "/authors/",
        json={
            "pen_name": "ShadowWriter",
            "bio": "Writes fantasy novels under the moonlight.",
            "profile_image_url": "https://example.com/shadow.png",
            "user_id": user_id,
        },
        headers=headers,
    )

    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["pen_name"] == "ShadowWriter"
    assert data["bio"].startswith("Writes fantasy")
    assert data["user_id"] == user_id


def test_get_author_by_user_id(client):
    """✅ GET /authors/{user_id} → should fetch author by user_id"""
    headers, user_id = signup_and_login(client)

    # Create author first
    client.post(
        "/authors/",
        json={
            "pen_name": "MoonScribe",
            "bio": "Author of ethereal tales.",
            "profile_image_url": "https://example.com/moon.png",
            "user_id": user_id,
        },
        headers=headers,
    )

    # Fetch author by user_id
    response = client.get(f"/authors/{user_id}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["pen_name"] == "MoonScribe"
    assert data["user_id"] == user_id


def test_list_authors(client):
    """✅ GET /authors → should list all authors"""
    headers, user_id = signup_and_login(client)

    # Create author
    client.post(
        "/authors/",
        json={
            "pen_name": "SkyQuill",
            "bio": "Writes poetic adventures.",
            "profile_image_url": "https://example.com/sky.png",
            "user_id": user_id,
        },
        headers=headers,
    )

    # List authors
    response = client.get("/authors/", headers=headers)
    assert response.status_code == 200
    authors = response.json()
    assert isinstance(authors, list)
    assert any(a["pen_name"] == "SkyQuill" for a in authors)
