"use strict";

const { app, BrowserWindow } = require('electron');
const Bootstrap = require("./src/app/common/bootstrap")

const bootstrap = new Bootstrap();

console.log(bootstrap.start());

// const Database = require('./src/app/common/database/better-database');
// const errorHandler = require('./src/app/common/errorHandler');
// const appSettings = require('./src/app/modules/appSettings');
// const constants = require('./src/app/common/constants');
// const paths = require('./src/app/common/paths');
// const event = require('./src/app/events/event');
// const path = require("path");

// const isFirstInstance = app.requestSingleInstanceLock();
// app.setVersion(constants.buildInfo.version);
// let mainWindow;

// errorHandler.init();
// paths.init();
// event.init();

// appSettings.init(path.join(app.getPath("appData"), constants.appOptions.appName));

// global.settings = appSettings.getSettings();
// global.appPaths = paths.getPath;

// global.database = {
//   databaseStatus: "open", // ["open", "closed", "error"]
//   database: new Database(appPaths.dbPath)
// }


// if (!global.settings.get('enableHardwareAcceleration', true)) {
//   console.log(`
// ##################################################################
// # Hardware acceleration is disabled, this may affect performance #
// ##################################################################\n`);
//   app.disableHardwareAcceleration();
// }

// function startApp() {
//   console.log('Starting app.');

//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     show: true,
//     frame: false,
//     minHeight: 430,
//     minWidth: 580,
//     title: constants.appOptions.appName,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       enableRemoteModule: false,
//       preload: path.join(__dirname, 'preload.js')
//     },
//   });

//   mainWindow.loadFile(path.join(__dirname, "src/assets/index.html"));
// }

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
