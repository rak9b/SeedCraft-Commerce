from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import SettingsConfigDict, BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mongodb://localhost:27017/plant_ecommerce")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

settings = Settings()

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    @classmethod
    def get_client(cls) -> AsyncIOMotorClient:
        if cls.client is None:
            cls.client = AsyncIOMotorClient(settings.DATABASE_URL)
        return cls.client
    
    @classmethod
    def get_database(cls):
        client = cls.get_client()
        return client.plant_ecommerce
    
    @classmethod
    def close_client(cls):
        if cls.client:
            cls.client.close()
            cls.client = None

# Create database instance
db = Database()