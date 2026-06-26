import logging 

from fastapi import APIRouter, Depends, HTTPException, status

from app.model.schemas import EmailTriggerRequest, EmailTriggerResponse
from app.services.n8n_client import N8nClient, N8nError

logger = logging.getLogger("ai_secretary.email")

router = APIRouter(prefix="/api/email", tags=["Email"])

def get_n8n_client(request: Request) -> N8nClient:
    return request.app.state.n8n_client




