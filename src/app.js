const { BrowserWindow, ipcMain, app } = require('electron')
const path = require('path')

let index

// -----REINICIA LA APLICACION EN CADA CAMBIO PRODUCIDO EN EL CODIGO FUNCIONAL-----
if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  })
}

/**
 * Crea una nueva ventana principal
 */
function createIndexWindow () {
  index = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, './preload.js')
    }
  })

  index.loadFile('src/views/index.html')
  index.on('closed', () => app.quit())
}

// -----APP IPC-----

ipcMain.on('app:close', (event, args) => {
  app.quit()
})

module.exports = { createIndexWindow }
