const { BrowserWindow, ipcMain } = require('electron')
const { updateDate, getTurnList } = require('../util/day_turns_handler')

// -----DAY IPC-----
ipcMain.on('day:get', async (event, args) => {
  const { day, currMonth, currYear } = args
  updateDate(day, currMonth, currYear)
  BrowserWindow.getFocusedWindow().loadFile('src/views/day.html')
})

ipcMain.on('day:turns', async (event, args) => {
  const turns = await getTurnList()
  event.reply('day:turns', JSON.stringify(turns))
})
