const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { MongoClient } = require('mongodb');
const isDev = process.env.NODE_ENV === 'development' || process.env.ELECTRON_START_URL;

const mongoUri = 'mongodb+srv://rebeccafitzpatrick:hfJ%7Cm%23gv5W55@cluster0.pvplf8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = '700_web_tool_db';
const leaderboard_collection = 'leaderboard';
const users_collection = 'users';
const client = new MongoClient(mongoUri);

async function insertResultToMongo(result) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(leaderboard_collection);
    await collection.insertOne(result);
  } catch (err) {
    console.error('MongoDB insert error:', err);
  }
}
function createWindow() {
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false, // <--- try disabling webSecurity to allow local resources
      enableRemoteModule: false, // Disable remote module for security
    },
  });
  win.webContents.openDevTools();


  if (isDev) {
    // Load Vite dev server URL when running `npm run dev`
    win.loadURL('http://localhost:5173');
  } else {
    // Load built index.html from dist folder when packaged
    const indexPath = path.join(app.getAppPath(), '..', 'dist', 'index.html');
    win.loadFile(indexPath);
  }
}

app.whenReady().then(createWindow);

// IPC handler for running Python script
ipcMain.handle('run-speed-test', async () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../speed_test.py');
    const pythonPath = path.join(__dirname, '../python_embed', 'python.exe');

    console.log('Python path:', pythonPath);
    console.log('Script path:', scriptPath);  

    const python = spawn(pythonPath, [scriptPath], {
      cwd: path.join(__dirname, '..'),
      env: process.env
    });

    let output = '';
    python.stdout.on('data', (data) => output += data.toString());
    python.stderr.on('data', (data) => console.error(data.toString()));
    python.on('close', async (code) => {
      if (code === 0){
        try {
          const result = JSON.parse(output);
          await insertResultToMongo(result); // <-- Store in MongoDB
          resolve(output);
        } catch (err) {
          console.error('Failed to parse or store result:', err);
          reject('Failed to parse or store result');
        }
      } else {
        reject('Speed test failed');
      }
    });
  });
});