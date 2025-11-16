from typing import Optional, cast
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User


def create_user(db: Session, email: str, username: str, password: str) -> User:
    """
    Create a new user with a securely hashed password.

    Args:
        db (Session): SQLAlchemy database session.
        email (str): User's email address.
        username (str): User's username.
        password (str): Plain text password to be hashed and stored securely.

    Returns:
        User: The newly created User model instance.

    Raises:
        SQLAlchemyError: If the database commit fails.
    """
    try:
        hashed_pw = hash_password(password)
        user = User(email=email, username=username, hashed_password=hashed_pw)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except SQLAlchemyError as e:
        db.rollback()
        raise e


def authenticate_user(db: Session, email: str, password: str) -> Optional[str]:
    """
    Authenticate a user by verifying credentials and return a JWT access token.

    Args:
        db (Session): SQLAlchemy database session.
        email (str): User's email address.
        password (str): Plain text password input.

    Returns:
        Optional[str]: JWT access token if authentication succeeds, otherwise None.
    """
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, cast(str, user.hashed_password)):
        return None

    # Return JWT token with the user's ID as the subject claim.
    return create_access_token({"sub": str(user.id)})
