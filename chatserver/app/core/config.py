import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGODB_URI: str = os.getenv("MONGODB_URI")
    MONGODB_DB: str = os.getenv("MONGODB_DB", "healthcare")
    MONGODB_COLLECTION: str = os.getenv("MONGODB_COLLECTION", "documents")

settings = Settings()
