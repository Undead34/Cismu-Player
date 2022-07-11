const { BrowserWindow } = require("electron");

module.exports = {
  name: "window-maximize",
  isHandle: false,
  action: (e) => {
    let webContents = e.sender;
    let window = BrowserWindow.fromWebContents(webContents);
    window.maximize();
  }
}