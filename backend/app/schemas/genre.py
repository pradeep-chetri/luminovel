from pydantic import BaseModel, ConfigDict


class GenreCreate(BaseModel):
    name: str


class GenreRead(BaseModel):
    id: str
    name: str
    model_config = ConfigDict(from_attributes=True)
