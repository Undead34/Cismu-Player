// index, or what runs before the rest of desktop does
// responsible for handling updates and updating modules before continuing startup
"use strict";

const { app, BrowserWindow, session } = require('electron');
const installDevTools = require('./src/app/common/installDevTools');
const errorHandler = require('./src/app/common/errorHandler');
const appSettings = require('./src/app/modules/appSettings');
const constants = require('./src/app/common/constants');
const ipcMain = require('./src/app/events/ipcMain');
const paths = require('./src/app/common/paths');
const path = require("path");


const isFirstInstance = app.requestSingleInstanceLock();
app.setVersion(constants.buildInfo.version);
let mainWindow;

errorHandler.init();
ipcMain.init();
paths.init();
global.appPaths = paths.getPath;

appSettings.init(paths.getPath.root);
const settings = appSettings.getSettings();

if (!settings.get('enableHardwareAcceleration', true)) {
  console.log(`
##################################################################
# Hardware acceleration is disabled, this may affect performance #
##################################################################\n`);
  app.disableHardwareAcceleration();
}

function startApp() {
  console.log('Starting app.');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    frame: false,
    minHeight: 430,
    minWidth: 580,
    title: constants.appOptions.appName,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadFile(path.join(__dirname, "src/assets/index.html"));
  // mainWindow.on("resize", (...args) => {
  //   ipcMain.emit("window:resize", ...args);
  // });

  if (process.env.NODE_ENV === 'development') {
    installDevTools(session);
  }
}

app.on('second-instance', (_event, args, _workingDirectory) => {
  console.log("Jaja");
});

app.on('will-finish-launching', () => {
  console.log("Electron is Awesome!!!");
});

console.log(`${constants.appOptions.appName} ${app.getVersion()}`);

if (!isFirstInstance) {
  console.log('Quitting secondary instance.');
  app.quit();
} else {
  if (app.isReady()) {
    startApp();
  } else {
    app.once('ready', startApp);
  }
}
