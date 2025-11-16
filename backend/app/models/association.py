from sqlalchemy import Column, ForeignKey, String, Table

from app.db.session import Base

novel_tags = Table(
    "novel_tags",
    Base.metadata,
    Column(
        "novel_id",
        String,
        ForeignKey("novels.id"),
        primary_key=True
    ),
    Column(
        "tag_id",
        String,
        ForeignKey("tags.id"),
        primary_key=True
    ),
)
