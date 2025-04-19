from langchain_huggingface import HuggingFaceEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from app.core.config import settings
from uuid import uuid4

# Initialize the embedding model
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

# Initialize MongoDB client
client = MongoClient(settings.MONGODB_URI)
db = client[settings.MONGODB_DB]
collection = db[settings.MONGODB_COLLECTION]

# Define the vector search index name
ATLAS_VECTOR_SEARCH_INDEX_NAME = "langchain-test-index-vectorstores"

# Initialize the vector store
vector_store = MongoDBAtlasVectorSearch(
    collection=collection,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

# vector_store.create_vector_search_index(
#   dimensions=768,
#   filters=[{"type":"filter", "path":"patient_id"}],
#   update=True
# )
    
def store_embeddings(documents):
    # Optionally, create the vector search index if it doesn't exist
    # Ensure that your MongoDB Atlas cluster supports vector search index creation via API
    # vector_store.create_vector_search_index(dimensions=384)
    
    uuids = [str(uuid4()) for _ in range(len(documents))]
    
    # Add documents to the vector store
    vector_store.add_documents(documents,uuids)
    


from typing import Dict, List
from langchain_core.documents import Document

def get_filtered_retriever(
    query: str,
    filter_criteria: Dict[str, str],
    k: int = 2,
    score_threshold: float = 0.5
) -> List[Document]:
    retriever = vector_store.as_retriever(
        search_type="similarity_score_threshold",
        filter=filter_criteria,
        search_kwargs={
            "k": k,
            "score_threshold": score_threshold,
            # "filter": filter_criteria  # <- ONLY here
        }
    )
    return retriever.invoke(query)


