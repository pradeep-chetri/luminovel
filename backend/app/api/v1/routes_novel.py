from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.genre import GenreCreate, GenreRead
from app.schemas.novel import NovelCreate, NovelRead
from app.schemas.tag import TagCreate, TagRead
from app.schemas.chapter import ChapterCreate, ChapterRead
from app.services.novel_service import ( 
    create_novel,
    create_tag,
    create_genre, 
    create_chapter, 
    get_all_genre, 
    get_all_tag, 
    get_chapters_by_novel, 
    get_novel_by_id, 
    list_novels
)

router = APIRouter(prefix="/novels", tags=["Novels"])


# -------------------------------
# 📘 Novel Routes
# -------------------------------

@router.post(
    "/",
    response_model=NovelRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new novel",
    response_description="Details of the newly created novel",
)
def create_novel_entry(data: NovelCreate, db: Session = Depends(get_db)):
    """
    Create a new novel entry.
    
    - **title**: Name of the novel  
    - **author_id**: Must reference an existing author  
    - **genres** and **tags** are optional fields
    """
    try:
        return create_novel(db, data)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Novel already exists or invalid reference",
        )


@router.get(
    "/",
    response_model=List[NovelRead],
    summary="List all novels with pagination",
    response_description="List of all novels with pagination support",
)
def list_novels_route(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve all novels with pagination.
    Use `skip` and `limit` query parameters for pagination.
    """
    novels = list_novels(db, skip=skip, limit=limit)
    return novels or []


@router.get(
    "/{novel_id}",
    response_model=NovelRead,
    summary="Get a novel by ID",
    response_description="Full details of the specified novel",
)
def get_novel_route(novel_id: str, db: Session = Depends(get_db)):
    """
    Retrieve a novel by its unique ID.
    """
    novel = get_novel_by_id(db, novel_id)
    if not novel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Novel not found",
        )
    return novel


# -------------------------------
# 📚 Chapter Routes
# -------------------------------

@router.post(
    "/{novel_id}/chapters",
    response_model=ChapterRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new chapter for a novel",
    response_description="Details of the created chapter",
)
def create_chapter_entry(
    novel_id: str,
    data: ChapterCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new chapter for a specific novel.
    """
    try:
        return create_chapter(db, novel_id, data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chapter creation failed",
        )


@router.get(
    "/{novel_id}/chapters",
    response_model=List[ChapterRead],
    summary="List all chapters of a novel",
    response_description="A list of chapters for the given novel ID",
)
def list_chapters_route(novel_id: str, db: Session = Depends(get_db)):
    """
    Retrieve all chapters for a given novel.
    """
    chapters = get_chapters_by_novel(db, novel_id)
    if not chapters:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No chapters found for this novel",
        )
    return chapters


# -------------------------------
# 🏷️ Tag Routes
# -------------------------------

@router.post(
    "/tags",
    response_model=List[TagRead],
    status_code=status.HTTP_201_CREATED,
    summary="Create one or more tags",
    response_description="List of created tags",
)
def create_tags_route(data: List[TagCreate], db: Session = Depends(get_db)):
    """
    Create one or more tags for categorizing novels.
    """
    try:
        return create_tag(db, data)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="One or more tags already exist",
        )


@router.get(
    "/tags",
    response_model=List[TagRead],
    summary="List all tags",
    response_description="All available tags for novels",
)
def list_tags_route(db: Session = Depends(get_db)):
    """
    Retrieve all tags used across novels.
    """
    return get_all_tag(db)


# -------------------------------
# 🎭 Genre Routes
# -------------------------------

@router.post(
    "/genres",
    response_model=GenreRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new genre",
    response_description="Details of the created genre",
)
def create_genre_route(data: GenreCreate, db: Session = Depends(get_db)):
    """
    Create a new genre for categorizing novels.
    """
    try:
        return create_genre(db, data)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Genre already exists",
        )


@router.get(
    "/genres",
    response_model=List[GenreRead],
    summary="List all genres",
    response_description="All available genres for novels",
)
def list_genres_route(db: Session = Depends(get_db)):
    """
    Retrieve all genres used across novels.
    """
    return get_all_genre(db)
