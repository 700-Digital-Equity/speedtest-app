const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('renderer.html');
}

app.whenReady().then(createWindow);

// IPC handler for running Python script
ipcMain.handle('run-speed-test', async () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'speed_test.py');
    const pythonPath = path.join(__dirname, 'python_embed', 'python.exe');

    const python = spawn(pythonPath, [scriptPath]);

    let output = '';
    python.stdout.on('data', (data) => output += data.toString());
    python.stderr.on('data', (data) => console.error(data.toString()));
    python.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject('Speed test failed');
    });
  });
});