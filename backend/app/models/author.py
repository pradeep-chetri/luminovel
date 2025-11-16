import uuid

from sqlalchemy import Column, ForeignKey, String, Text
from sqlalchemy.orm import relationship

from app.db.session import Base


class Author(Base):
    __tablename__ = "authors"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
    )

    pen_name = Column(String(255), unique=True, nullable=False)
    bio = Column(Text, nullable=False)
    profile_image_url = Column(String, nullable=True)

    user_id = Column(String, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="authors")
    novels = relationship("Novel", back_populates="author")
