from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import get_current_user
from app.db.session import get_db
from app.schemas.user import TokenOut, UserCreate, UserLogin, UserOut
from app.services.user_service import authenticate_user, create_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post(
    "/signup",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    response_description="Details of the newly created user"
)
def signup(data: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user account.

    - **email**: unique email address  
    - **username**: desired username  
    - **password**: user's password (will be securely hashed)
    """
    try:
        return create_user(db, data.email, data.username, data.password)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already exists"
        )


@router.post(
    "/login",
    response_model=TokenOut,
    summary="Authenticate a user and return an access token",
    response_description="JWT access token for authenticated requests"
)
def login(data: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate the user using email and password.

    Returns a JWT token if successful.
    """
    token = authenticate_user(db, data.email, data.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": token, "token_type": "bearer"}


@router.get(
    "/me",
    response_model=UserOut,
    summary="Get details of the currently authenticated user",
)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """
    Retrieve the currently logged-in user's profile.
    """
    return current_user
