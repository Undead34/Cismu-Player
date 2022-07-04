const { createFolders, createDatabase } = require("./src/app/modules/onStartup");
const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

require("electron-reload")(__dirname);

// // Browser window config
let mainWindowConfig = {
  width: 800,
  height: 600,
  show: true,
  frame: false,
  minHeight: 430,
  minWidth: 580,
  title: "Cismu Player",
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preload: path.join(__dirname, 'preload.js')
  },
}

// IPC main events listeners
const listenEvents = async () => {
  const eventFiles = (await fs.readdirSync(path.join(__dirname, "src/app/events/IPC"))).filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./src/app/events/IPC/${file}`);
    if (event.once) {
      if (event.handle)
        ipcMain.handleOnce(event.name, (...args) => event.execute(...args));
      else ipcMain.once(event.name, (...args) => event.execute(...args));
    } else {
      if (event.handle)
        ipcMain.handle(event.name, (...args) => event.execute(...args));
      else ipcMain.on(event.name, (...args) => event.execute(...args));
    }
    delete require.cache[require.resolve(`./src/app/events/IPC/${file}`)]; // delete cache
  }

  return true;
};

const startApp = () => {
  const mainWindow = new BrowserWindow(mainWindowConfig);

  createFolders();
  createDatabase();
  listenEvents();
  mainWindow.loadFile(path.join(__dirname, "/src/index.html"));

  mainWindow.on("resize", () => {
    mainWindow.webContents.send("resize", mainWindow.getSize());
  })

  // Open dev tools
  mainWindow.webContents.openDevTools();
};

app.on("ready", startApp);
app.setName("Cismu Player");
