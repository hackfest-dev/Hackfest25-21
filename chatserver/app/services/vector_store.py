from pymongo import MongoClient
from app.core.config import settings

def store_embeddings(embeddings, documents):
    client = MongoClient(settings.MONGODB_URI)
    db = client[settings.MONGODB_DB]
    collection = db[settings.MONGODB_COLLECTION]
    for embedding, doc in zip(embeddings, documents):
        collection.insert_one({
            "embedding": embedding,
            "metadata": doc.metadata,
            "content": doc.page_content
        })
