# app/db/base.py
from app.models.author import Author
from app.models.chapter import Chapter
from app.models.genre import Genre
from app.models.novel import Novel
from app.models.tag import Tag
from app.models.user import User
# from app.models.association import novel_tags
# ✅ Import every model that should be part of Base.metadata
