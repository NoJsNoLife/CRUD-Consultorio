const { BrowserWindow, ipcMain, Notification } = require('electron')
const Turn = require('../models/Turn')

// -----TURN IPC-----

ipcMain.on('turn:page', (event, args) => {
  BrowserWindow.getFocusedWindow().loadFile('src/views/new_turn.html')
})
ipcMain.on('turns:list', (event, args) => {
  BrowserWindow.getFocusedWindow().loadFile('src/views/turns_list.html')
})
ipcMain.on('turn:new', async (event, args) => {
  try {
    const newTurn = new Turn(args)
    await newTurn.save()
    event.reply('new_turn_created', new Notification({
      title: 'ÉXITO 👍',
      body: 'Se ha registrado un nuevo turno'
    }).show()
    )
  } catch (e) {
    console.error(e)
    event.reply('new_turn_error', new Notification({
      title: 'ERROR',
      body: 'Hubo un error inesperado en la creación del turno'
    }).show()
    )
  }
})
ipcMain.on('turn:delete', async (event, args) => {
  try {
    await Turn.findByIdAndDelete(args)
    event.reply('delete_turn_success', new Notification({
      title: 'ÉXITO 👍',
      body: 'Se ha eliminado el turno'
    }).show()
    )
  } catch (e) {
    console.log(e)
    event.reply('delete_turn_error', new Notification({
      title: 'ERROR',
      body: 'Hubo un error inesperado en proceso de eliminación'
    }).show()
    )
  }
})
ipcMain.on('turns:get', async (event, args) => {
  const Turns = await Turn.find()
  event.reply('turns:get', JSON.stringify(Turns))
})
