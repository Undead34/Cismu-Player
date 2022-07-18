const { BrowserWindow } = require("electron");
const { watch } = require("fs");

module.exports = {
  name: "renderer:load-local-sounds",
  isHandle: false,
  isIPCMain: false,
  once: false,
  autostart: false,
  action: (window) => {
    window.webContents.send("localSounds:get-local-sounds", null);
  },
  trigger: (window) => {
    watch(global.appPaths.useMusic)
  }
};
