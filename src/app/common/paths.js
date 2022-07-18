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
    firstRun: path.join(home, ".firstRun")
  }
}

module.exports = {
  win32,
  linux,
  darwin
}



/*
let root = path.join(app.getPath("appData"), appOptions.appName),
  appData = app.getPath("appData"),
  music = app.getPath("music"),
  useMusic = process.platform === "linux" ? path.join(music, appOptions.appName) : app.getPath("music"),
  videos = app.getPath("videos"),
  home = app.getPath("home"),
  exe = app.getPath("exe"),
  dbPath = path.join(path.join(app.getPath("appData"), appOptions.appName), appOptions.appName + ".db");


const _mkdirSync = (paths) => {
  try {
    if (typeof paths !== "object") {
      fs.mkdirSync(paths, { recursive: true });
      return true;
    } else {
      for (let x in paths) {
        fs.mkdirSync(paths[x], { recursive: true });
      }
      return true;
    }
  } catch (error) {
    handled(error);
  }
}

function init() {
  let folders = [
    root,
    useMusic
  ];

  let folder = _mkdirSync(folders);
}

module.exports = {
  init,
  getPath: {
    root,
    appData,
    music,
    videos,
    home,
    exe,
    dbPath,
    useMusic
  }
}

*/