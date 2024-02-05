const { BrowserWindow, ipcMain, Notification } = require('electron')
const Client = require('../models/Client')

// -----CLIENT IPC-----

ipcMain.on('client:page', (event, args) => {
  BrowserWindow.getFocusedWindow().loadFile('src/views/new_client.html')
})
ipcMain.on('clients:list', (event, args) => {
  BrowserWindow.getFocusedWindow().loadFile('src/views/clients_list.html')
})
ipcMain.on('client:new', async (event, args) => {
  try {
    const newClient = new Client(args)
    await newClient.save()
    event.reply('new_client_created', new Notification({
      title: 'ÉXITO 👍',
      body: 'Se ha registrado un nuevo cliente'
    }).show()
    )
  } catch (e) {
    console.error(e)
    event.reply('new_client_error', new Notification({
      title: 'ERROR',
      body: 'Hubo un error inesperado en la creación del cliente'
    }).show()
    )
  }
})
ipcMain.on('client:delete', async (event, args) => {
  try {
    await Client.findByIdAndDelete(args)
    event.reply('delete_client_success', new Notification({
      title: 'ÉXITO 👍',
      body: 'Se ha eliminado el cliente'
    }).show()
    )
  } catch (e) {
    console.log(e)
    event.reply('delete_client_error', new Notification({
      title: 'ERROR',
      body: 'Hubo un error inesperado en proceso de eliminación'
    }).show()
    )
  }
})
ipcMain.on('clients:get', async (event, args) => {
  const clients = await Client.find()
  event.reply('clients:get', JSON.stringify(clients))
})