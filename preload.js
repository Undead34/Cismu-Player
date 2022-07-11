const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cismu", {
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },

  send: (channel, type = "normal", ...args) => {
    if (type === "invoke") {
      return ipcRenderer.invoke(channel, ...args);
    } else {
      ipcRenderer.send(channel, ...args);
    }
  },
});
