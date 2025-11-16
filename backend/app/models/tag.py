import uuid

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.db.session import Base

from app.models.association import novel_tags


class Tag(Base):
    __tablename__ = "tags"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
    )
    name = Column(String, unique=True, nullable=False)

    novels = relationship("Novel", secondary=novel_tags, back_populates="tags")
