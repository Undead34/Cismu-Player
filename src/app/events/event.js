"use strict";

const { ipcMain } = require("electron");
const path = require('path');
const fs = require("fs");

const readdir = (folder, callback) => {
  try {
    let results = [];

    let list = fs.readdirSync(folder);

    for (let i = 0; i < list.length; i++) {
      let filePath = path.join(folder, list[i]);
      let stat = fs.statSync(filePath)

      if (stat && stat.isDirectory()) {
        readdir(filePath, function (err, res) {
          if (err) return false;
          results = results.concat(res);
        });
      } else {
        results.push(filePath);
      }
    }

    callback(null, results);
  } catch (error) {
    callback(error, null);
  }
}

const init = () => {
  readdir(__dirname, (err, files) => {
    if (err) return err;

    for (let i = 0; i < files.length; i++) {

      if (path.parse(files[i]).name === 'event') continue;

      let event = require(files[i]);

      if (event.isIPCMain) {
        if (event.once) {
          if (event.isHandle) {
            ipcMain.handleOnce(event.name, event.action);
          } else {
            ipcMain.once(event.name, event.action);
          }
        } else {
          if (event.isHandle) {
            ipcMain.handle(event.name, event.action);
          } else {
            ipcMain.on(event.name, event.action);
          }
        }
      } else {
        if (event.once) {
          global.app.once(event.name, event.action);
          if (event.autostart) global.app.emit(event.name);
        }
        else {
          global.app.on(event.name, event.action);
          if (event.autostart) global.app.emit(event.name);
        }
      }
    }
  });
}

const removeListener = (event) => {
  ipcMain.removeListener(event);
}

const removeHandler = (event) => {
  ipcMain.removeHandler(event);
}

module.exports = {
  init,
  removeListener,
  removeHandler,
}
