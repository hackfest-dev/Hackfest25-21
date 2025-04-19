from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document
import os
from datetime import datetime

def process_pdf(file_path):
    # Load the PDF document
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # Split the document into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.split_documents(documents)

    # Retrieve file metadata
    stat = os.stat(file_path)
    upload_time = datetime.now().isoformat()
    creation_time = datetime.fromtimestamp(stat.st_ctime).isoformat()
    modification_time = datetime.fromtimestamp(stat.st_mtime).isoformat()
    file_name = os.path.basename(file_path)

    # Add additional metadata to each document chunk
    for doc in docs:
        doc.metadata.update({
            "upload_time": upload_time,
            "file_name": file_name,
            "file_creation_time": creation_time,
            "file_modification_time": modification_time
        })

    # Generate embeddings for each document chunk
    embeddings_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    embeddings = embeddings_model.embed_documents([doc.page_content for doc in docs])

    return embeddings, docs
