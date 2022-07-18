"use strict";

const electron = require("electron");
const fs = require("fs");
const path = require("path");

const HANDLED_ERROR_LIMIT = 10;
let totalHandledErrors = 0;

function isErrorSafeToSuppress(error) {
  return /attempting to call a function in a renderer window/i.test(error.message);
}

function init() {
  process.on('uncaughtException', error => {
    try {
      const stack = error.stack ? error.stack : String(error);
      const message = `Uncaught exception:\n ${stack}`;
      console.warn(message);

      let datelog = new Date().toLocaleDateString();
      datelog = datelog.split("/").join("-");
      datelog = datelog + "-" + parseInt(Math.random() * 10000);

      fs.writeFileSync(path.join(global.paths.logs, datelog + ".log"), message);

      if (!isErrorSafeToSuppress(error)) {
        electron.dialog.showErrorBox('A JavaScript error occurred in the main process', message + "\n\nCheck the logs folder: " + path.join(global.paths.logs, datelog));
      }
    } catch (error) {
      electron.app.quit();
    }
  });
} // show a similar error message to the error handler, except exit out the app
// after the error message has been closed


function fatal(err) {
  const options = {
    type: 'error',
    message: 'A fatal Javascript error occured',
    detail: err && err.stack ? err.stack : String(err)
  };

  const callback = _ => electron.app.quit();

  const electronMajor = parseInt(process.versions.electron.split('.')[0]);

  if (electronMajor >= 6) {
    electron.dialog.showMessageBox(null, options).then(callback);
  } else {
    electron.dialog.showMessageBox(options, callback);
  }
}


function handled(err) {
  if (totalHandledErrors < HANDLED_ERROR_LIMIT) {
    console.warn('Reporting non-fatal error', err);
    totalHandledErrors++;
  }

  console.log("Number of errors handled: " + totalHandledErrors);
}

module.exports = {
  init,
  fatal,
  handled
}