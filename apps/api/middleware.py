from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from typing import Callable, Coroutine
from starlette.middleware.base import BaseHTTPMiddleware
import logging
import traceback

logger = logging.getLogger(__name__)

class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except HTTPException as e:
            logger.warning(f"HTTP Exception: {e.status_code} - {e.detail}")
            return JSONResponse(
                status_code=e.status_code,
                content={"error": e.detail}
            )
        except Exception as e:
            logger.error(f"Unhandled Exception: {str(e)}")
            logger.error(traceback.format_exc())
            return JSONResponse(
                status_code=500,
                content={"error": "Internal server error"}
            )

def add_error_middleware(app):
    """Add error handling middleware to the FastAPI app"""
    app.add_middleware(ErrorHandlingMiddleware)