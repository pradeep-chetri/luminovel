from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.author import AuthorCreate, AuthorRead
from app.services.author_service import (
    all_author_read,
    author_create,
    author_read,
)

router = APIRouter(prefix="/authors", tags=["Authors"])


@router.post(
    "/",
    response_model=AuthorRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new author profile",
    response_description="Details of the newly created author",
)
def create_author(data: AuthorCreate, db: Session = Depends(get_db)):
    """
    Create a new author profile.

    - **user_id**: must reference an existing user  
    - **bio**, **social_links**, etc., depending on your schema  
    """
    try:
        return author_create(db, data)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Author already exists or invalid user reference",
        )


@router.get(
    "/{user_id}",
    response_model=AuthorRead,
    summary="Retrieve author profile by user ID",
    response_description="Full author details for the given user",
)
def get_author(user_id: str, db: Session = Depends(get_db)):
    """
    Fetch an author's profile using their associated `user_id`.
    """
    author = author_read(db, user_id)
    if not author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Author not found",
        )
    return author


@router.get(
    "/",
    response_model=list[AuthorRead],
    summary="List all authors",
    response_description="A list of all registered authors",
)
def list_authors(db: Session = Depends(get_db)):
    """
    Retrieve a list of all authors in the system.
    Returns an empty list if no authors exist.
    """
    authors = all_author_read(db)
    return authors or []
