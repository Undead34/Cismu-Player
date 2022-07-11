const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {

  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },

  send: (channel, data, type = "normal") => {
    if (type === "invoke") {
      return ipcRenderer.invoke(channel, args);
    } else {
      ipcRenderer.send(channel, data);
    }
  },
});
