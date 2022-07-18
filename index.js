"use strict";

const { app, BrowserWindow } = require('electron');
const Bootstrap = require("./src/app/common/bootstrap");
const errorHandler = require('./src/app/common/errorHandler');
const event = require('./src/app/events/event');
const path = require("path");

const bootstrap = new Bootstrap();
let bootResults = bootstrap.start();

if (!bootResults) {
  console.log("An unknown boot error has occurred");
  app.quit();
}

const isFirstInstance = app.requestSingleInstanceLock();
let mainWindow;

errorHandler.init();
// event.init();

if (!global.settings["enableHardwareAcceleration"]) {
  console.log(`
##################################################################
# Hardware acceleration is disabled, this may affect performance #
##################################################################\n`);
  app.disableHardwareAcceleration();
}

const startApp = () => {
  console.log('Starting app.');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    frame: true,
    minHeight: 430,
    minWidth: 580,
    title: "Cismu Player",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadFile(path.join(__dirname, "src/assets/index.html"));
}

// app.on('second-instance', () => {
//   if (mainWindow) { mainWindow.show(); }
// });

// app.on('will-finish-launching', e => console.log("Electron is Awesome!!!"));

// console.log(`${constants.appOptions.appName} ${app.getVersion()}`);

// if (!isFirstInstance) {
//   console.log('Quitting secondary instance.');
//   app.quit();
// } else {
//   if (app.isReady()) {
//     startApp();
//   } else {
//     app.once('ready', startApp);
//   }
// }
