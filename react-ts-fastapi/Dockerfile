# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.18.0
ARG PYTHON_VERSION=3.11.4

ARG UID=0
ARG GID=0

##### Frontend #####
FROM node:${NODE_VERSION}-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

##### Backend #####
FROM python:${PYTHON_VERSION}-slim as base

# Use args
ARG UID
ARG GID

# Set ENV variables
ENV ENV=prod \
    PORT=8010 \
    # Prevents Python from writing pyc files.
    PYTHONDONTWRITEBYTECODE=1 \
    # Keeps Python from buffering stdout and stderr to avoid situations where
    # the application crashes without emitting any logs due to buffering.
    PYTHONUNBUFFERED=1

WORKDIR /app/backend

ENV HOME /root

# Create user and group if not root
RUN if [ $UID -ne 0 ]; then \
    if [ $GID -ne 0 ]; then \
    addgroup --gid $GID app; \
    fi; \
    adduser --uid $UID --gid $GID --home $HOME --disabled-password --no-create-home app; \
    fi

# RUN mkdir -p $HOME/.cache/chroma
# RUN echo -n 00000000-0000-0000-0000-000000000000 > $HOME/.cache/chroma/telemetry_user_id

# Make sure the user has access to the app and root directory
RUN chown -R $UID:$GID /app $HOME

# Install python dependencies
COPY --chown=$UID:$GID ./backend/requirements.txt ./requirements.txt
RUN python -m pip install -r requirements.txt --no-cache-dir

# Copy frontend static files
COPY --chown=$UID:$GID --from=build /app/dist /app/dist
COPY --chown=$UID:$GID --from=build /app/public /app/public
COPY --chown=$UID:$GID --from=build /app/package.json /app/package.json

# Copy backend files
COPY --chown=$UID:$GID ./backend .

EXPOSE 8010

HEALTHCHECK CMD curl --silent --fail http://localhost:8080/health | jq -e '.status == true' || exit 1

# Switch to the non-privileged user to run the application.
USER $UID:$GID

# Run the application in production.
CMD ["bash", "start.sh"]
