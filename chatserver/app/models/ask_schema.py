from pydantic import BaseModel
from typing import List, Literal

class ChatTurn(BaseModel):
    role: Literal['user', 'ai']
    content: str

class AskRequest(BaseModel):
    patient_id: str
    query: str
    chat_history: List[ChatTurn]
