const {  BrowserWindow, ipcMain, app, Notification } = require('electron');
const path = require('path');
const Client = require('./models/Client');
const Turn = require('./models/Turn')

let index;
let newClient;
let newTurn;

// -----REINICIA LA APLICACION EN CADA CAMBIO PRODUCIDO EN EL CODIGO FUNCIONAL-----
if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}


// -----INDEX-----


function createIndexWindow(){
    index = new BrowserWindow({
        width: 1080,
        height: 920,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    index.loadFile('src/views/index.html');

    index.on('closed', () => {
        app.quit()
    });
}


//-----NEW CLIENT-----


function createNewClientWindow(){
    newClient = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    newClient.loadFile('src/views/new_client.html');

    newClient.on('closed', () => {
        newClient = null;
    });
}


//-----NEW TURN-----


function createNewTurnWindow(){
    newTurn = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
        }
    })

    newTurn.loadFile('src/views/new_turn.html');

    newTurn.on('closed', () => {
        newTurn = null;
    });
}


//-----CLIENT IPC-----


ipcMain.on('client:page', (event, args) => {
    createNewClientWindow();
});
ipcMain.on('clients:list', (event, args) => {
    index.loadFile('src/views/clients_list.html')
});
ipcMain.on('client:new', async (event, args) => {
    try{
        const newClient = new Client(args);
        await newClient.save()
        event.reply('new_client_created', new Notification({
            title: 'ÉXITO',
            body: 'Se ha registrado un nuevo cliente'
        }).show()
        )

    } catch(e){
        console.error(e)
        event.reply('new_client_error', new Notification({
            title: 'ERROR',
            body: 'Hubo un error inesperado en la creación del cliente'
        }).show()
        )
    }
});
ipcMain.on('client:delete', async (event, args) => {
    try{
        await Client.findByIdAndDelete(args)
        event.reply('delete_client_success', new Notification({
            title: 'ÉXITO',
            body: 'Se ha eliminado el cliente'
        }).show()
        )
    } catch(e) {
        console.log(e)
        event.reply('delete_client_error', new Notification({
            title: 'ERROR',
            body: 'Hubo un error inesperado en proceso de eliminación'
        }).show()
        )
    }
});
ipcMain.on('clients:get', async (event, args) => {
    const clients = await Client.find();
    event.reply('clients:get', JSON.stringify(clients));
});


//-----TURN IPC-----


ipcMain.on('turn:page', (event, args) => {
    createNewTurnWindow();
});
ipcMain.on('turns:list', (event, args) => {
    index.loadFile('src/views/turns_list.html')
});
ipcMain.on('turn:new', async (event, args) => {
    try{
        const newTurn = new Turn(args);
        await newTurn.save()
        event.reply('new_turn_created', new Notification({
            title: 'ÉXITO',
            body: 'Se ha registrado un nuevo turno'
        }).show()
        )

    } catch(e){
        console.error(e)
        event.reply('new_turn_error', new Notification({
            title: 'ERROR',
            body: 'Hubo un error inesperado en la creación del turno'
        }).show()
        )
    }
});
ipcMain.on('turn:delete', async (event, args) => {
    try{
        await Turn.findByIdAndDelete(args)
        event.reply('delete_turn_success', new Notification({
            title: 'ÉXITO',
            body: 'Se ha eliminado el turno'
        }).show()
        )
    } catch(e) {
        console.log(e)
        event.reply('delete_turn_error', new Notification({
            title: 'ERROR',
            body: 'Hubo un error inesperado en proceso de eliminación'
        }).show()
        )
    }
});
ipcMain.on('turns:get', async (event, args) => {
    const Turns = await Turn.find();
    event.reply('turns:get', JSON.stringify(Turns));
});


//-----APP IPC-----


ipcMain.on('app:close', (event, args) => {
    app.quit()
});

ipcMain.on('back', (event, args) => {
    index.loadFile('src/views/index.html');
})


module.exports = { createIndexWindow };