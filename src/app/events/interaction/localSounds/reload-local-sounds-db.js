const Database = require("../../../modules/database/database");
const { randomUUID } = require("crypto");
const { readdirSync } = require("fs");

module.exports = {
  name: "localSounds:reload-local-sounds-db",
  isHandle: true,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: async (e) => {
    try {
      let musicsFiles = await readdirSync(global.appPaths.useMusic).filter(file => {
        return file.endsWith("mp3") || file.endsWith("flac");
      })
    
      let db = new Database(global.appPaths.dbPath);
  
      for (let x = 0; x < musicsFiles.length; x++) {
        await db.insertMusic({
          id: await randomUUID(),
          name: musicsFiles[x],
          path: "New Para",
          type: "sad",
          picture: null,
          tags: "Jaja",
          hash: "1290389jda89d89asj",
        });
      }
  
      let musics = await db.getAllMusics();
  
      db.closeDatabase();
  
      return musics;
    } catch (error) {
      console.log(error)
      return [];
    }
  }
}
