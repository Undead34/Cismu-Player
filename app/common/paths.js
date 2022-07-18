"use strict";

const { app } = require("electron");
const path = require("path");

const win32 = () => {
  let appdata = app.getPath("appData");
  let home = path.join(appdata, "Cismu Player");

  return {
    home,
    music: app.getPath("music"),
    logs: path.join(home, "logs"),
    database: path.join(home, "database.db"),
    settings: path.join(home, "settings.json"),
    firstRun: path.join(home, ".firstRun")
  }
}

const linux = () => {
  let appdata = app.getPath("appData");
  let home = path.join(appdata, "Cismu Player");

  return {
    home,
    music: app.getPath("music"),
    logs: path.join(home, "logs"),
    database: path.join(home, "database.db"),
    settings: path.join(home, "settings.json"),
    firstRun: path.join(home, ".firstRun")
  }
}

const darwin = () => {
  let appdata = app.getPath("appData");
  let home = path.join(appdata, "Cismu Player");

  return {
    home,
    music: app.getPath("music"),
    logs: path.join(home, "logs"),
    database: path.join(home, "database.db"),
    settings: path.join(home, "settings.json"),
    firstRun: path.join(home, ".firstRun")
  }
}

module.exports = {
  win32,
  linux,
  darwin
}
