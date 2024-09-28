# Vite + React + Typescript + FastAPI + Electron

## Config

This app runs on `8036`. It appears in multiple places and should be consistent.

- `package.json`

- `backend/constants.py`

- `src/main.ts`

To change the name of the app in the title bar, edit
`src/components/titlebar.tsx`.

## Initial setup

Install the npm packages:

`npm install`

Create the virtual environment (assuming python is already installed):

`python3 -m venv venv`

Activate the virtual environment and install the packages:

`source venv/bin/activate`

`pip install -r backend/requirements.txt -r backend/requirements-dev.txt`

## Development

Start the application using:

`npm run start`

## Build

Build electron app: `npm run build`

## Pyinstaller

```{bash}
pyinstaller -F backend/main.py --clean --distpath resources
```

_TODO:_ Is extra-hooks needed?

```{bash}
pyinstaller -F backend/main.py --clean --distpath resources --additional-hooks-dir backend/extra-hooks
```
