const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {

  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  },

  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, args);
  },
});
