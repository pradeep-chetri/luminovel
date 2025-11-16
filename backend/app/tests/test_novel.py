import pytest

def signup_and_login(client):
    """Helper to register + login a user, return headers and user info"""
    client.post(
        "/auth/signup",
        json={
            "email": "reader@example.com",
            "username": "reader",
            "password": "Test@1234",
        },
    )
    login = client.post("/auth/login", json={"email": "reader@example.com", "password": "Test@1234"})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    user = client.get("/auth/me", headers=headers).json()
    return headers, user


def test_create_genre(client):
    response = client.post("/novels/genres", json={"name": "Fantasy"})
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["name"] == "Fantasy"


def test_create_tags(client):
    tags = [{"name": "Action"}, {"name": "Slice of Life"}, {"name": "Shonen"}]
    response = client.post("/novels/tags", json=tags)
    assert response.status_code == 201
    data = response.json()
    assert all("id" in tag for tag in data)
    assert any(tag["name"] == "Action" for tag in data)


def test_create_novel(client):
    headers, user = signup_and_login(client)
    user_id = user["id"]

    # ✅ Create author for this user
    author_resp = client.post(
        "/authors",
        json={
            "pen_name": "ShadowWriter",
            "bio": "Writes fantasy novels under the moonlight.",
            "profile_image_url": "https://example.com/shadow.png",
            "user_id": user_id,
        },
        headers=headers,
    )
    assert author_resp.status_code == 201
    author_id = author_resp.json()["id"]  # ✅ get real UUID

    # ✅ Create genre
    genre_resp = client.post("/novels/genres", json={"name": "Fantasy"})
    assert genre_resp.status_code == 201
    genre_id = genre_resp.json()["id"]

    # ✅ Create tags
    tags = [{"name": "Adventure"}, {"name": "Romance"}]
    tags_resp = client.post("/novels/tags", json=tags)
    assert tags_resp.status_code == 201
    tag_ids = [t["id"] for t in tags_resp.json()]

    # ✅ Create novel with UUIDs only
    novel_data = {
        "title": "Moonlit Paths",
        "cover_url": "https://example.com/cover.jpg",
        "description": "A story of magic and destiny.",
        "author_id": author_id,   # ✅ now a proper UUID string
        "genre_id": genre_id,
        "tag_ids": tag_ids,
    }

    response = client.post("/novels", json=novel_data)
    print(response.json())
    assert response.status_code == 201
    data = response.json()

    assert data["title"] == "Moonlit Paths"
    assert data["genre"]["name"] == "Fantasy"
    assert isinstance(data["tags"], list)
    assert "id" in data
    assert data["chapter_count"] == 0
    assert data["status"] == "Ongoing"
    assert data["rating"] == 0.0



def test_create_chapter(client):
    headers, user = signup_and_login(client)
    user_id = user["id"]

    # create author for user
    author_resp = client.post(
        "/authors",
        json={
            "pen_name": "ChapterAuthor",
            "bio": "Writes detailed chapters.",
            "profile_image_url": "https://example.com/author.png",
            "user_id": user_id,
        },
        headers=headers,
    )
    author_id = author_resp.json()["id"]

    # create genre
    genre_resp = client.post("/novels/genres", json={"name": "Mystery"})
    genre_id = genre_resp.json()["id"]

    # create tag
    tag_resp = client.post("/novels/tags", json=[{"name": "Detective"}])
    tag_ids = [t["id"] for t in tag_resp.json()]

    # create novel
    novel_resp = client.post(
        "/novels",
        json={
            "title": "Case of the Vanishing Moon",
            "cover_url": "https://example.com/mystery.jpg",
            "description": "A gripping detective tale.",
            "author_id": author_id,
            "genre_id": genre_id,
            "tags_ids": tag_ids,
        },
    )
    assert novel_resp.status_code == 201
    novel_id = novel_resp.json()["id"]

    # create chapter
    chapter_data = {"title": "Chapter 1: The Arrival", "content": "It all began one stormy night..."}
    chapter_resp = client.post(f"/novels/{novel_id}/chapters", json=chapter_data)
    assert chapter_resp.status_code == 201
    chapter = chapter_resp.json()
    assert chapter["title"] == "Chapter 1: The Arrival"

    # verify chapters are listed
    chapters_list = client.get(f"/novels/{novel_id}/chapters")
    assert chapters_list.status_code == 200
    assert len(chapters_list.json()) == 1

    # verify novel chapter_count is incremented
    updated_novel = client.get(f"/novels/{novel_id}")
    assert updated_novel.status_code == 200
    assert updated_novel.json()["chapter_count"] == 1
