import os
import time
import signal
import multiprocessing

import uvicorn
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from constants import PORT


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.get("/example")
async def example():
    return {"status": 200, "message": "Hello world"}


@app.get("/health-check")
async def health_check():
    """Used by electron to wait until server is started before opening app."""
    return {"status_code": 200, "detail": "Connected to server."}


def shutdown_gracefully():
    os.kill(os.getpid(), signal.SIGTERM)


@app.get("/quit")
async def shudown_app(background_tasks: BackgroundTasks):
    background_tasks.add_task(shutdown_gracefully)


if __name__ == '__main__':
    multiprocessing.freeze_support()
    uvicorn.run(app, host="0.0.0.0", port=PORT, reload=False, workers=1)
