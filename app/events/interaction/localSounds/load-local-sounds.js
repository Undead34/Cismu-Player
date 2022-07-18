const Database = require("../../../common/database/better-database");

module.exports = {
  name: "localSounds:get-local-sounds",
  isHandle: true,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: async (e) => {
    let database = global.database.db;
    if (!database.db.open) {
      global.database.db = new Database(this.paths.database);
      database = global.database.db;
    }

    return await database.getAllMusics();
  }
}
