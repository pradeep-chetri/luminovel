from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from slugify import slugify

from app.models.genre import Genre
from app.models.novel import Novel
from app.models.tag import Tag
from app.models.chapter import Chapter
from app.schemas.genre import GenreCreate
from app.schemas.novel import NovelCreate
from app.schemas.tag import TagCreate
from app.schemas.chapter import ChapterCreate


# ---------------------------
# TAGS
# ---------------------------
def create_tag(db: Session, data: List[TagCreate]) -> List[Tag]:
    """
    Create one or more tags in bulk.

    Args:
        db (Session): Database session.
        data (List[TagCreate]): List of tag creation schemas.

    Returns:
        List[Tag]: Created tag records.
    """
    try:
        tags = [Tag(name=tag_data.name) for tag_data in data]
        db.add_all(tags)
        db.commit()
        for tag in tags:
            db.refresh(tag)
        return tags
    except SQLAlchemyError:
        db.rollback()
        raise


def get_all_tag(db: Session) -> List[Tag]:
    """Return all available tags."""
    return db.query(Tag).all()


# ---------------------------
# GENRES
# ---------------------------
def create_genre(db: Session, data: GenreCreate) -> Genre:
    """Create a new genre record."""
    try:
        genre = Genre(name=data.name)
        db.add(genre)
        db.commit()
        db.refresh(genre)
        return genre
    except SQLAlchemyError:
        db.rollback()
        raise


def get_all_genre(db: Session) -> List[Genre]:
    """Fetch all genres."""
    return db.query(Genre).all()


# ---------------------------
# NOVELS
# ---------------------------
def create_novel(db: Session, data: NovelCreate) -> Novel:
    """
    Create a new novel, linking it with genre and tags.

    Raises:
        ValueError: If one or more tag IDs are invalid.
    """
    try:
        tags = db.query(Tag).filter(Tag.id.in_(data.tag_ids)).all()

        if len(tags) != len(data.tag_ids):
            raise ValueError("Some provided tag IDs do not exist.")

        novel = Novel(
            title=data.title,
            slug=slugify(data.title),
            cover_url=data.cover_url,
            description=data.description,
            author_id=data.author_id,
            genre_id=data.genre_id,
            tags=tags,
        )

        db.add(novel)
        db.commit()
        db.refresh(novel)
        return novel
    except SQLAlchemyError:
        db.rollback()
        raise


def list_novels(db: Session, skip: int = 0, limit: int = 10) -> List[Novel]:
    """Paginated list of novels."""
    return db.query(Novel).offset(skip).limit(limit).all()


def get_all_novels(db: Session) -> List[Novel]:
    """Return all novels (non-paginated)."""
    return db.query(Novel).all()


def get_novel_by_id(db: Session, novel_id: str) -> Optional[Novel]:
    """Fetch a single novel by ID."""
    return db.query(Novel).filter(Novel.id == novel_id).first()


def get_novels_by_author(db: Session, author_id: str) -> List[Novel]:
    """Return all novels created by a given author."""
    return db.query(Novel).filter(Novel.author_id == author_id).all()


def get_novels_by_genre(db: Session, genre_id: str) -> List[Novel]:
    """Return all novels within a specific genre."""
    return db.query(Novel).filter(Novel.genre_id == genre_id).all()


# ---------------------------
# CHAPTERS
# ---------------------------
def create_chapter(db: Session, novel_id: str, data: ChapterCreate) -> Chapter:
    """
    Create a new chapter for a given novel and increment the novel's chapter count.

    Raises:
        ValueError: If the novel does not exist.
    """
    novel = db.query(Novel).filter(Novel.id == novel_id).first()
    if not novel:
        raise ValueError("Novel not found")

    try:
        chapter = Chapter(
            title=data.title,
            content=data.content,
            novel_id=novel_id,
        )

        db.add(chapter)
        db.flush()  # assign ID before commit
        db.query(Novel).filter(Novel.id == novel_id).update(
            {Novel.chapter_count: Novel.chapter_count + 1}
        )
        db.commit()
        db.refresh(chapter)
        return chapter
    except SQLAlchemyError:
        db.rollback()
        raise


def get_chapters_by_novel(db: Session, novel_id: str) -> List[Chapter]:
    """Fetch all chapters for a specific novel."""
    return db.query(Chapter).filter(Chapter.novel_id == novel_id).all()
