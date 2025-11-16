from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.models.user import User


ph = PasswordHasher()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def hash_password(password: str) -> str:
    return ph.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return ph.verify(hashed, plain)
    except VerifyMismatchError:
        return False
    except Exception:
        return False


def create_access_token(data: dict, expires_minutes: int = 60) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.jwt_secret,
        algorithm=settings.jwt_algo
    )


# def decode_token(token: str) -> dict:
#     return jwt.decode(
#         token,
#         settings.jwt_secret,
#         algorithms=[settings.jwt_algo]
#     )


# def get_current_user(
#         token: str = Depends(oauth2_scheme),
#         db: Session = Depends(get_db)
# ):
#     try:
#         payload = decode_token(token)
#         user_id = payload.get("sub")
#         if not user_id:
#             raise HTTPException(status_code=401, detail="Invaild Token")
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invaild Token")

#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=401, detail="User Not Found")
#     return user
