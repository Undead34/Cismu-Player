"use strict";

const { handled } = require("./errorHandler");
const Database = require("../modules/database/database");
const { appOptions } = require("./constants");
const { app } = require("electron");
const path = require("path");
const fs = require("fs");

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

function init () {
  let folders = [
    root,
    useMusic
  ];

  let folder = _mkdirSync(folders);

  if (folder) {
    let db = new Database(dbPath);
    db.createDatabase().then(()=>{
      db.closeDatabase();
    });
  }
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
