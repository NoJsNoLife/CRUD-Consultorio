const { contextBridge, ipcRenderer } = require('electron')

// Expone metodos protegidos que puede usar el ipcRenderer
// ipcRenderer sin exponer el codigo fuente
contextBridge.exposeInMainWorld(
  'api', {
    send: (channel, data) => {
      // whitelist channels
      const validChannels =
            ['back', 'new_client_created', 'new_client_error', 'client:new', 'clients:get', 'client:page', 'clients:list',
              'app:close', 'client:delete', 'delete_client_success', 'delete_client_error',
              'new_turn_error', 'new_turn_created', 'turn:new', 'turns:get', 'turn:page', 'turns:list',
              'delete_turn_success', 'delete_turn_error', 'day:get', 'day:turns']

      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data)
      }
    },
    receive: (channel, func) => {
      const validChannels =
            ['back', 'new_client_created', 'new_client_error', 'client:new', 'clients:get', 'client:page', 'clients:list',
              'app:close', 'client:delete', 'delete_client_success', 'delete_client_error',
              'new_turn_created', 'new_turn_error', 'turn:new', 'turns:get', 'turn:page', 'turns:list',
              'delete_turn_success', 'delete_turn_error', 'day:get', 'day:turns']

      if (validChannels.includes(channel)) {
        // Si el evento se incluye en los canales validos, se opera, sino no devuelve ninguna informacion.
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    }
  }
)
