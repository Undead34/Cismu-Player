"use strict";

const _fs = require("fs");
const _mkdirp = require("mkdirp");
const _originalFs = require("original-fs");
const _path = require("path");
const _rimraf = require("rimraf");

/* eslint-disable no-console */
// Determines environment-specific paths based on info provided
let userDataPath = null;
let userDataVersionedPath = null;
let resourcesPath = null;
let moduleDataPath = null;
let installPath = null;

function determineAppUserDataRoot() {
  const { app } = require('electron');
  return app.getPath('appData');
}

function determineUserData(userDataRoot, buildInfo) {
  return _path.join(userDataRoot, 'discord' + (buildInfo.releaseChannel == 'stable' ? '' : buildInfo.releaseChannel));
} // cleans old version data in the background


function cleanOldVersions(buildInfo) {
  const entries = _fs.readdirSync(userDataPath) || [];
  entries.forEach(entry => {
    const fullPath = _path.join(userDataPath, entry);

    let stat;

    try {
      stat = _fs.lstatSync(fullPath);
    } catch (e) {
      return;
    }

    if (stat.isDirectory() && entry.indexOf(buildInfo.version) === -1) {
      if (entry.match('^[0-9]+.[0-9]+.[0-9]+') != null) {
        console.log('Removing old directory ', entry);
        (0, _rimraf.default)(fullPath, _originalFs.default, error => {
          if (error) {
            console.warn('...failed with error: ', error);
          }
        });
      }
    }
  });
}

function init(buildInfo) {
  resourcesPath = _path.join(require.main.filename, '..', '..', '..');
  const userDataRoot = determineAppUserDataRoot();
  userDataPath = determineUserData(userDataRoot, buildInfo);

  const {
    app
  } = require('electron');

  app.setPath('userData', userDataPath);
  userDataVersionedPath = _path.join(userDataPath, buildInfo.version);

  _mkdirp.sync(userDataVersionedPath);

  if (buildInfo.localModulesRoot != null) {
    moduleDataPath = buildInfo.localModulesRoot;
  } else if (buildInfo.newUpdater) {
    moduleDataPath = _path.join(userDataPath, 'module_data');
  } else {
    moduleDataPath = _path.join(userDataVersionedPath, 'modules');
  }

  const exeDir = _path.dirname(app.getPath('exe'));

  if (/^app-[0-9]+\.[0-9]+\.[0-9]+/.test(_path.basename(exeDir))) {
    installPath = _path.join(exeDir, '..');
  }
}

function getUserData() {
  return userDataPath;
}

function getUserDataVersioned() {
  return userDataVersionedPath;
}

function getResources() {
  return resourcesPath;
}

function getModuleDataPath() {
  return moduleDataPath;
}

function getInstallPath() {
  return installPath;
}

module.exports = {
  getUserData,
  getUserDataVersioned,
  getResources,
  getModuleDataPath,
  getInstallPath,
  init,
  cleanOldVersions
}