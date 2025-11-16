from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict

from app.schemas.author import AuthorRead
from app.schemas.chapter import ChapterCreate, ChapterRead
from app.schemas.genre import GenreRead
from app.schemas.tag import TagRead


class NovelCreate(BaseModel):
    title: str
    cover_url: str
    description: str

    author_id: str
    genre_id: str

    tag_ids: List[str] = []
    chapters: List[ChapterCreate] = []


class NovelRead(BaseModel):
    id: str
    title: str
    slug: str
    cover_url: Optional[str] = None
    description: Optional[str] = None
    status: str
    rating: float
    votes: int
    chapter_count: int
    views: int
    created_at: datetime
    uploaded_at: datetime

    author: Optional[AuthorRead] = None
    genre: Optional[GenreRead] = None
    tags: List[TagRead] = []
    chapters: List[ChapterRead] = []

    model_config = ConfigDict(from_attributes=True)
