const { app } = require('electron')
const { createIndexWindow } = require('./app.js')

require('./database.js')
require('./windows/ipcClient.js')
require('./windows/ipcTurn.js')

app.whenReady().then(createIndexWindow)
