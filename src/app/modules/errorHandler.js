"use strict";

var _electron = require("electron");

const HANDLED_ERROR_LIMIT = 10;
let totalHandledErrors = 0;

function isErrorSafeToSuppress(error) {
  return /attempting to call a function in a renderer window/i.test(error.message);
}

function init() {
  process.on('uncaughtException', error => {
    const stack = error.stack ? error.stack : String(error);
    const message = `Uncaught exception:\n ${stack}`;
    console.warn(message);

    if (!isErrorSafeToSuppress(error)) {
      _electron.dialog.showErrorBox('A JavaScript error occurred in the main process', message);
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

  const callback = _ => _electron.app.quit();

  const electronMajor = parseInt(process.versions.electron.split('.')[0]);

  if (electronMajor >= 6) {
    _electron.dialog.showMessageBox(null, options).then(callback);
  } else {
    _electron.dialog.showMessageBox(options, callback);
  }
} // capture a handled error for telemetry purposes, e.g. finding update loops.


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