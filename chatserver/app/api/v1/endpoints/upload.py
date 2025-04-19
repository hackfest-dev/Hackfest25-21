from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.document_processor import process_pdf
from app.services.vector_store_1 import store_embeddings
import os
from fastapi import APIRouter, HTTPException, Query
from app.services.vector_store_1 import get_filtered_retriever
from app.services.llm import chat_model
from app.models.ask_schema import AskRequest

router = APIRouter()

@router.post("/upload/")
async def upload_file(
    file: UploadFile = File(...),
    patient_id: str = Form(...)
):
    file_path = f"/temp_files/{file.filename}"
    try:
        # Save the uploaded file to disk
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Process the saved PDF file
        documents = process_pdf(file_path)

        # Add patient_id to each document's metadata
        for doc in documents:
            doc.metadata["patient_id"] = patient_id

        # Store the embeddings in MongoDB
        store_embeddings(documents)

        return {"message": "File processed and embeddings stored."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Delete the file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
            

@router.post("/ask")
async def ask(request: AskRequest):
    """
    Retrieve documents for a specific patient based on a query.
    """
    try:
        filter_criteria = {"patient_id": request.patient_id}
        documents = get_filtered_retriever(
            query=request.query,
            filter_criteria=filter_criteria
        )

        if not documents:
            return {"message": "No documents found for the given patient ID and query."}

        # 📄 Concatenate content for RAG context
        context = "\n\n".join([doc.page_content for doc in documents])
        
        # Step 3: Format the chat history for the prompt
        formatted_chat_history = ""
        for chat in request.chat_history:
            formatted_chat_history += f"{chat.role.capitalize()}: {chat.content}\n"

        # Step 4: Construct the prompt
        prompt = f"""
        Answer the following question based on the context below and the chat history between you and the user:

        Context:
        {context}

        Question:
        {request.query}

        Chat History:
        {formatted_chat_history}
        """
        
        # 🗣️ Generate the response
        response = chat_model.invoke(prompt)
        
        # Return the content and metadata of the retrieved documents
        return {
            "query": request.query,
            "response": response.content,
            "source_documents": [
                {
                    "content": doc.page_content,
                    "metadata": doc.metadata
                }
                for doc in documents
            ]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))