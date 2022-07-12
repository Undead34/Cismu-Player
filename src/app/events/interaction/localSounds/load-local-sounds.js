const Database = require("../../../modules/database/database");
const { appOptions } = require('../../../common/constants');
const path = require("path");

module.exports = {
  name: "localSounds:get-local-sounds",
  isHandle: true,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: async (e) => {
    let dbPath = path.join(global.appPaths.root, appOptions.appName);
    let db = new Database(dbPath);

    let musics = db.getAllMusics();

    db.closeDatabase();

    return musics;
  }
}