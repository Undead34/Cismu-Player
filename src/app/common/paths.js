"use strict";

const { handled } = require("./errorHandler");
const { appOptions } = require("./constants");
const { app } = require("electron");
const path = require("path");
const fs = require("fs");

let root = path.join(app.getPath("appData"), appOptions.appName),
appData = app.getPath("appData"),
music = app.getPath("music"),
videos = app.getPath("videos"),
home = app.getPath("home"),
exe = app.getPath("exe")

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
  let folder = _mkdirSync([root]);

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
  }
}
