from typing import Union

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

from config import (
    FRONTEND_BUILD_DIR,
    PUBLIC_DIR
)


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*']
)


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope)
            else:
                raise ex


@app.get("/api/v1/example")
def read_example():
    return {'status': 200}


app.mount("/public", StaticFiles(directory=PUBLIC_DIR), name="public")

if FRONTEND_BUILD_DIR.is_dir():
    app.mount("/", SPAStaticFiles(directory=FRONTEND_BUILD_DIR,
              html=True), name="spa-static-files")
else:
    print(
        f'Frontend build directory not found at {FRONTEND_BUILD_DIR}. Serving API only.')
