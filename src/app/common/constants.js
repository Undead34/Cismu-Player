const path = require("path");
const { app } = require("electron")

const appOptions = {
  appName: "Cismu Player",
  appNameMachine: "Cismu-Player",
  appVersion: "0.0.1",
}

const appPaths = {
  musicPath: app.getPath("music"),
  videoPath: app.getPath("videos"),
}


module.exports = {
  appOptions,
  appPaths,
}