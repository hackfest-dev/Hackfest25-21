from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.document_processor import process_pdf
from app.services.vector_store import store_embeddings
import os

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"/temp_files/{file.filename}"
    try:
        # Save the uploaded file to disk
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        # Save the uploaded file to disk
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Process the saved PDF file
        embeddings, documents = process_pdf(file_path)

        # Store the embeddings in MongoDB
        store_embeddings(embeddings, documents)

        return {"message": "File processed and embeddings stored."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Delete the file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
