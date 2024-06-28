import os
from pathlib import Path

BACKEND_DIR = Path(__file__).parent  # the path containing this file
BASE_DIR = BACKEND_DIR.parent  # the path containing the backend/

FRONTEND_BUILD_DIR = Path(BASE_DIR / 'dist').resolve()
PUBLIC_DIR = Path(BASE_DIR / 'public')
