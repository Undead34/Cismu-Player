const path = require("path");
const { app } = require("electron")

const appOptions = {
  appName: "Cismu Player",
  appNameMachine: "Cismu-Player",
}

const appPaths = {
  musicPath: app.getPath("music"),
  videoPath: app.getPath("videos"),
}

const buildInfo = {
  version: "0.0.1"
}

module.exports = {
  appOptions,
  appPaths,
  buildInfo
}