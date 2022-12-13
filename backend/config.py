from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str = os.environ["DATABASE_URL"]
    MONGO_INITDB_DATABASE: str = os.environ["MONGO_INITDB_DATABASE"]

    CLIENT_ORIGIN: str = os.environ["CLIENT_ORIGIN"]

    MINIO_URL: str = os.environ["MINIO_URL"]
    MINIO_ACCESS_KEY: str = os.environ["MINIO_ACCESS_KEY"]
    MINIO_SECRET_KEY: str = os.environ["MINIO_SECRET_KEY"]
    MINIO_SECURE: bool = os.environ["MINIO_SECURE"]

    # class Config:
    #     env_file = '../.env'
        

settings = Settings()