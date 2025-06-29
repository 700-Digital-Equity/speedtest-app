const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runSpeedTest: () => ipcRenderer.invoke('run-speed-test')
});