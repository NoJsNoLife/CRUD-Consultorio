const { app } = require("electron");
const { createIndexWindow } = require("./app.js");
require('./database')

app.whenReady().then(createIndexWindow);