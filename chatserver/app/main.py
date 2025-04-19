from fastapi import FastAPI
from app.api.v1.endpoints import upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # Add your frontend's origin
    # You can add more origins if needed
]

# Add the CORSMiddleware to your FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(upload.router, prefix="/api/v1")
