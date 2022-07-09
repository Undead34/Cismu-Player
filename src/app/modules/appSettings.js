"use strict";

const Settings = require("../common/Settings");
const paths = require("../common/paths");

let settings;

function init() {
  settings = new Settings(paths.root);
}

function getSettings() {
  return settings;
}

module.exports = {
  init,
  getSettings
}