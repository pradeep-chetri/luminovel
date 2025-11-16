import uuid

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.db.session import Base


class Genre(Base):
    __tablename__ = "genres"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
    )
    name = Column(String, nullable=False)

    novels = relationship("Novel", back_populates="genre")
