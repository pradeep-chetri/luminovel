import uuid

from sqlalchemy import (
    TIMESTAMP,
    BigInteger,
    Column,
    Float,
    ForeignKey,
    String,
    Text,
    func,
)
from sqlalchemy.orm import relationship

from app.db.session import Base
from app.models.association import novel_tags


class Novel(Base):
    __tablename__ = "novels"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
    )

    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)

    author_id = Column(String, ForeignKey("authors.id"), nullable=True)
    genre_id = Column(String, ForeignKey("genres.id"), nullable=True)

    cover_url = Column(Text)
    description = Column(Text)

    status = Column(String(50), default="Ongoing")
    rating = Column(Float, default=0.0)
    votes = Column(BigInteger, default=0)
    chapter_count = Column(BigInteger, default=0)
    views = Column(BigInteger, default=0)

    created_at = Column(TIMESTAMP, server_default=func.now())
    uploaded_at = Column(
        TIMESTAMP, server_default=func.now(), onupdate=func.now()
    )

    author = relationship("Author", back_populates="novels")
    genre = relationship("Genre", back_populates="novels")
    tags = relationship("Tag", secondary=novel_tags, back_populates="novels")
    chapters = relationship(
        "Chapter", back_populates="novels", cascade="all, delete-orphan"
    )
