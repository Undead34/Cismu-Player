"use strict";

const Settings = require("../common/Settings");
let settings;

function init(root) {
  settings = new Settings(root);
}

function getSettings() {
  return settings;
}

module.exports = {
  init,
  getSettings
}
