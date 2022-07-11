"use strict";

const { ipcMain } = require("electron");
const path = require('path');
const fs = require("fs");

const on = (event, callback) => {
  ipcMain.on(event, callback)
}

const onHandle = (event, callback) => {
  ipcMain.handle(event, callback)
}

const removeListener = (event) => {
  ipcMain.removeListener(event);
}

const removeHandler = (event) => {
  ipcMain.removeHandler(event);
}

const readdir = (folder, callback) => {
  let results = [];

  fs.readdir(folder, (err, list) => {
    if (err) return callback(err);

    for (let i = 0; i < list.length; i++) {
      let filePath = path.join(folder, list[i]);
      
      if (!filePath) return callback(null, results);

      fs.stat(filePath, (err, stat) => {
        if (err) return callback(err);
        
        if (stat && stat.isDirectory()) {
          readdir(filePath, function (err, res) {
            if (err) return false;
            results = results.concat(res);
          });
        } else {
          results.push(filePath);
        }
      });
    }
  });

  callback(null, results);
}

const init = () => {
  let folder = __dirname;

  readdir(folder, (err, files) => {
    console.log(files)
  });
}

module.exports = {
  init,
  removeListener,
  removeHandler
}
