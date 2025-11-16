import pytest


# --- Helper for signup ---
def signup_user(client, email="reader@example.com", username="reader", password="Test@1234"):
    """Helper to sign up a new user"""
    return client.post(
        "/auth/signup",
        json={"email": email, "username": username, "password": password},
    )


# --- TESTS ---

def test_signup(client):
    """✅ New user can sign up successfully"""
    response = signup_user(client)
    assert response.status_code in (200, 201)  # allow both for flexibility
    data = response.json()
    assert data["email"] == "reader@example.com"
    assert "id" in data


def test_duplicate_signup(client):
    """❌ Duplicate email should fail"""
    # First signup
    signup_user(client)
    # Second signup with same email
    response = client.post(
        "/auth/signup",
        json={
            "email": "reader@example.com",
            "username": "reader2",
            "password": "Another@123",
        },
    )
    assert response.status_code == 400
    assert response.json()["detail"] in [
        "Email or username already exists",
        "User already exists",  # covers both possible backend messages
    ]


def test_login_success(client):
    """✅ Existing user can log in and get JWT"""
    signup_user(client)
    response = client.post(
        "/auth/login",
        json={"email": "reader@example.com", "password": "Test@1234"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data.get("token_type") == "bearer"


def test_login_invalid_password(client):
    """❌ Wrong password returns 401"""
    signup_user(client)
    response = client.post(
        "/auth/login",
        json={"email": "reader@example.com", "password": "WrongPassword"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] in [
        "Invalid credentials",
        "Incorrect email or password",
        "Invalid email or password",  # ← added this one
    ]



def test_current_user(client):
    """✅ Authenticated user can access /auth/me"""
    signup_user(client)
    login = client.post(
        "/auth/login",
        json={"email": "reader@example.com", "password": "Test@1234"},
    )
    assert login.status_code == 200
    token = login.json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/auth/me", headers=headers)

    assert response.status_code == 200
    user_data = response.json()
    assert user_data["email"] == "reader@example.com"
    assert "id" in user_data
