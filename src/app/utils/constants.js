const path = require("path");
const { app } = require("electron")

const appOptions = {
  appName: "Cismu Player",
  appNameMachine: "Cismu-Player",
  appVersion: "0.0.1",
}

let localMusic = null;
let localMusicPath = path.join(app.getPath("music"), appOptions.appName);

module.exports = {
  defaultPath: localMusicPath,
  musicPath: path.join(localMusicPath, "My Music"),
  videoPath: path.join(localMusicPath, "My Videos"),
  databasePath: path.join(localMusicPath, ".Cismu-Player.db"),
  appOptions,
  localMusic,
}