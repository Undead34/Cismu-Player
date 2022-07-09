// index, or what runs before the rest of desktop does
// responsible for handling updates and updating modules before continuing startup
"use strict";

const { app, BrowserWindow } = require('electron');
const errorHandler = require('./src/app/modules/errorHandler');
const appSettings = require('./src/app/modules/appSettings');
const constants = require('./src/app/common/constants');
const paths = require('./src/app/common/paths');
const path = require("path")

const isFirstInstance = app.requestSingleInstanceLock();
app.setVersion(constants.buildInfo.version);

appSettings.init();
errorHandler.init();
paths.init(constants.buildInfo);


global.releaseChannel = constants.buildInfo.releaseChannel;
global.moduleDataPath = paths.getModuleDataPath();

const settings = appSettings.getSettings();

if (!settings.get('enableHardwareAcceleration', true)) {
    app.disableHardwareAcceleration();
}

function startApp() {
    console.log('Starting app.');
    new BrowserWindow({
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

    // paths.cleanOldVersions(buildInfo);
}

app.on('second-instance', (_event, args, _workingDirectory) => {
    console.log("Jaja")
});

app.on('will-finish-launching', () => {
    console.log("Electron is Awesome!!!")
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
