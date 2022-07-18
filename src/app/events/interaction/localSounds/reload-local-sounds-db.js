// // const Database = require("../../../modules/database/database");
// const Database = require("../../../modules/database/better-database");
// const { readdirSync } = require("fs");

// module.exports = {
//   name: "localSounds:reload-local-sounds-db",
//   isHandle: true,
//   isIPCMain: true,
//   once: false,
//   autostart: false,
//   action: async (e) => {
//     try {
//       let musicsFiles = await readdirSync(global.appPaths.useMusic).filter(file => {
//         return file.endsWith("mp3") || file.endsWith("flac");
//       })
      
//       let db = new Database(global.appPaths.dbPath);

//       console.time("t1")
//       await db.insertMusic(musicsFiles);
//       console.timeEnd("t1")
//       console.log(`${musicsFiles.length} songs scanned in:`)
      
//       let musics = await db.getAllMusics();

//       db.closeDatabase();

//       return musics;
//     } catch (error) {
//       console.log(error)
//       return [];
//     }
//   }
// }

module.exports = {
  name: "localSounds:reload-local-sounds-db",
  isHandle: true,
  isIPCMain: true,
  once: false,
  autostart: false,
  action: async (e) => {
    
  }
}
