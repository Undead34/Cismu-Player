const Database = require("../../../modules/database/better-database");
// const Database = require("../../../modules/database/database");
// const { randomUUID } = require("crypto");

module.exports = {
  name: "localSounds:get-local-sounds",
  isHandle: true,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: async (e) => {
    let db = new Database(global.appPaths.dbPath);
    // let musics = await db.getAllMusics();
    // db.closeDatabase();

    return false;
    // return musics;
  }
}

// await db.insertMusic({
//   id: await randomUUID(),
//   name: "Lolo",
//   path: "New Para",
//   type: "sad",
//   picture: null,
//   tags: "Jaja",
//   hash: "1290389jda89d89asj",
// });