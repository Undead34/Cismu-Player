const fs = require("fs");
const { getSettings } = require("../../modules/appSettings");

module.exports = {
  name: "file-system:watcher",
  isHandle: false,
  isIPCMain: false,
  once: false,
  autostart: false,
  action: () => {
    console.log();
  },
};
