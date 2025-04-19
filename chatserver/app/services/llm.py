# chat model
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from app.core.config import Settings
import os

os.environ["HUGGINGFACEHUB_API_TOKEN"] = Settings.HF_TOKEN
REPO_ID = Settings.REPO_ID

llm = HuggingFaceEndpoint(
    repo_id=REPO_ID,
    task="text-generation",
    # max_new_tokens=512,
    do_sample=False,
    repetition_penalty=1.03,
)

chat_model = ChatHuggingFace(llm=llm)