import os
import sys

# Agrega las carpetas al sys.path para que Python las reconozca
sys.path.append(os.path.join(os.path.dirname(__file__), "SGPI-CAPIRESTC"))
sys.path.append(os.path.join(os.path.dirname(__file__), "api", "SGPI-CBAPI"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from sgpi_capirestc.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url="/api/v1/openapi.json"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Should be restricted in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
