// Electron modules
import { app, BrowserWindow, ipcMain } from 'electron';

// Built-in modules
import { spawn, exec } from 'child_process';
import path from 'path';

// Extra modules
import axios from 'axios';

const PORT = 8036; // should be consistent with constants.py in backend/

// Function to check if python server is running
async function isServerRunning(url: string) {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Function to ping server to see if it is running
async function waitForServer(url: string) {
  const maxRetries = 20; // Set max retries
  let attempts = 0;

  while (attempts < maxRetries) {
    console.log(`Attempt #${attempts + 1}`);
    const isRunning = await isServerRunning(url);
    if (isRunning) {
      return true;
    }
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error('Unable to connect to server.');
}

// Function to start server in dev or production
async function startServer() {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    spawn('python backend/main.py', {
      detached: true,
      shell: true,
      stdio: 'inherit',
    });
  } else {
    const run = {
      darwin: `"./${path.join(
        app.getAppPath(),
        'resources',
        'main',
        'main',
      )}" --args`,
      linux: './resources/main/main',
      win32: `start ${path.join(
        app.getAppPath(),
        'resources',
        'main',
        'main.exe',
      )}`,
      aix: undefined,
      android: undefined,
      cygwin: undefined,
      freebsd: undefined,
      haiku: undefined,
      netbsd: undefined,
      openbsd: undefined,
      sunos: undefined,
    }[process.platform];

    spawn(run, {
      detached: false,
      shell: true,
      stdio: 'pipe',
    });
  }
}

// Shut down server and electron
const shutdown = () => {
  // Kill app executable if production
  if (!MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    const killcmd = {
      darwin: 'killall App',
      linux: '',
      win32: 'taskkill /f /t /im App.exe',
      aix: undefined,
      android: undefined,
      cygwin: undefined,
      freebsd: undefined,
      haiku: undefined,
      netbsd: undefined,
      openbsd: undefined,
      sunos: undefined,
    }[process.platform];

    exec(killcmd, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }

  axios
    .get(`http://127.0.0.1:${PORT}/quit`)
    .then(() => app.quit())
    .catch(() => app.quit());
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Listen and respond to ipcRenderer events on the frontend.
  ipcMain.on('app-minimize', () => mainWindow.minimize());
  ipcMain.on('app-maximize', () => mainWindow.maximize());
  ipcMain.on('app-unmaximize', () => mainWindow.unmaximize());
  ipcMain.on('app-quit', () => shutdown());
  ipcMain.on('get-port-number', (event) => {
    event.returnValue = PORT;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await startServer();

  try {
    await waitForServer(`http://127.0.0.1:${PORT}/health-check`);
    createWindow();
  } catch (error) {
    console.error(error);
    app.quit();
  }

  // Delay starting browser window to give time
  // for flask server to start
  // setTimeout(() => {
  //   createWindow(port);
  // }, 5000);

  app.on('activate', () => {
    //  On macOS it's common to re-create a window in the app when the
    //  dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      shutdown();
    }
  });
});
