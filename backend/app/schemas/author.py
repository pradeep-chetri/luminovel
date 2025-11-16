from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class AuthorCreate(BaseModel):
    pen_name: str
    bio: str
    profile_image_url: Optional[str] = None

    user_id: str


class AuthorRead(BaseModel):
    id: str
    pen_name: str
    bio: str
    profile_image_url: Optional[str]

    user_id: str

    model_config = ConfigDict(from_attributes=True)
