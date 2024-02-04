const { app } = require("electron");
const { createIndexWindow } = require("./app.js");

require('./database.js')

app.whenReady().then(createIndexWindow);