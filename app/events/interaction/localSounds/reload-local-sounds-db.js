const Database = require("../../../common/database/better-database");
const { readdirSync } = require("fs");

module.exports = {
  name: "localSounds:reload-local-sounds-db",
  isHandle: true,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: async (e) => {
    try {
      let musicsFiles = await readdirSync(global.paths.music).filter(file => {
        return file.endsWith("mp3") || file.endsWith("flac");
      })

      let database = global.database.db;
      if (!database.db.open) {
        global.database.db = new Database(this.paths.database);
        database = global.database.db;
      }

      console.time("t1")
      await database.insertMusic(musicsFiles);
      console.timeEnd("t1")
      console.log(`${musicsFiles.length} songs scanned in:`)

      let musics = await database.getAllMusics();

      return musics;
    } catch (error) {
      console.log(error)
      return [];
    }
  }
}
