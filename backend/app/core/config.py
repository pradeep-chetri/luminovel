from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # App metadata
    app_name: str = "LuminaNovel"
    app_version: str = "1.0.0"

    # Database
    database_url: str = "sqlite:///./app.db"

    # JWT
    jwt_secret: str = "suppperrrr"
    jwt_algo: str = "HS256"
    access_token_expire_minutes: int = 60

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

# Single instance for import across project
settings = Settings()
