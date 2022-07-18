const { BrowserWindow } = require("electron");

module.exports = {
  name: "window:close",
  isHandle: false,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: (e) => {
    let webContents = e.sender;
    let window = BrowserWindow.fromWebContents(webContents);
    window.close();
  }
}