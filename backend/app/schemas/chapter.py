from uuid import UUID

from pydantic import BaseModel


class ChapterCreate(BaseModel):
    title: str
    content: str


class ChapterRead(BaseModel):
    id: str
    title: str
    content: str
