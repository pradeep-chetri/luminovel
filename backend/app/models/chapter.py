import uuid

from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.orm.properties import ForeignKey

from app.db.session import Base


class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
    )
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)

    novel_id = Column(String, ForeignKey("novels.id"), nullable=False)
    novels = relationship("Novel", back_populates="chapters")
