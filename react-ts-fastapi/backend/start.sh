#!/bin/bash

HOST=0.0.0.0
PORT=8010

if [ $# -eq 0 ]; then
    echo "Starting production server."
    gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind $HOST:$PORT --forwarded-allow-ips '*'
elif [ $1 == 'dev' ]; then
    echo "Starting dev server"
    fastapi dev main.py --port $PORT
else
    echo "Include 'dev' to run dev server and nothing to run production server."
fi

