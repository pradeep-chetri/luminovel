from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.author import Author
from app.schemas.author import AuthorCreate


def author_create(db: Session, data: AuthorCreate) -> Author:
    """
    Create a new author profile linked to a user.

    Args:
        db (Session): SQLAlchemy database session.
        data (AuthorCreate): Author creation schema containing pen name, bio, and user reference.

    Returns:
        Author: The created Author instance.

    Raises:
        SQLAlchemyError: If the database transaction fails.
    """
    try:
        author = Author(
            pen_name=data.pen_name,
            bio=data.bio,
            profile_image_url=data.profile_image_url,
            user_id=data.user_id,
        )
        db.add(author)
        db.commit()
        db.refresh(author)
        return author
    except SQLAlchemyError as e:
        db.rollback()
        raise e


def author_read(db: Session, user_id: str) -> Author | None:
    """
    Fetch an author profile by the associated user ID.

    Args:
        db (Session): SQLAlchemy database session.
        user_id (str): The user ID linked to the author.

    Returns:
        Author | None: Author instance if found, otherwise None.
    """
    return db.query(Author).filter(Author.user_id == user_id).first()


def all_author_read(db: Session) -> list[Author]:
    """
    Retrieve all authors from the database.

    Args:
        db (Session): SQLAlchemy database session.

    Returns:
        list[Author]: List of all author records.
    """
    return db.query(Author).all()
