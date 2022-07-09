"use strict";

const _Settings = require("../common/Settings");
const paths = require("../common/paths");

let settings;

function init() {
  settings = new _Settings(paths.getUserData());
}

function getSettings() {
  return settings;
}

module.exports = {
  init,
  getSettings
}