"use strict";

const { app } = require("electron");
const fs = require("fs");
const path = require("path")

const appPaths = {
  root: app.getPath("appData"),
  music: app.getPath("music"),
  videos: app.getPath("videos"),
  home: app.getPath("home"),
  app: app.getPath("exe"),
}

function init() {
  fs.existsSync()
}

module.exports = {

}