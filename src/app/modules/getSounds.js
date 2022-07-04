const constants = require("../utils/constants");
const { Database } = require("./database");
const jsmediatags = require("jsmediatags");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

/**
 * List files in a folder
 * @param {string} path path to list directory
 * @returns array of files
 */
const listFiles = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      let files = fs.readdirSync(path);
      resolve(files);
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
};

const getMetaData = async (buffer) => {
  return new Promise((resolve, rejects) => {
    new jsmediatags.Reader(buffer)
      .setTagsToRead(["title", "artist", "album", "picture"])
      .read({
        onSuccess: function (tag) {
          resolve(tag.tags);
        },
        onError: function (error) {
          console.log(":(", error.type, error.info);
          resolve({});
        },
      });
  });
};

const findMusic = async () => {
  try {
    const db = new Database();

    let musicFiles = (await listFiles(constants.musicPath)).filter(
      (file) =>
        file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".ogg")
    );
  
    for (let i = 0; i < musicFiles.length; i++) {
      let musicPath = path.join(constants.musicPath, musicFiles[i]);
      let bufferMusic = await fs.readFileSync(musicPath);
  
      let music = {};
  
      let musicMetaData = await getMetaData(bufferMusic);
      music.id = await crypto.randomUUID();
      music.hash = await crypto
        .createHash("md5")
        .update(bufferMusic)
        .digest("hex");
      music.name = musicMetaData.title === undefined ? path.parse(musicFiles[i]).name : musicMetaData.title;
      music.path = musicPath;
      music.type = "audio/mp3";
      if (musicMetaData.picture) {
        let imageBuffer = await Buffer.from(musicMetaData.picture.data).toString("base64")
        music.picture = imageBuffer;
        delete musicMetaData.picture;
      } else if (musicMetaData.APIC) {
        music.picture = null;
      }
      delete musicMetaData.TALB;
      delete musicMetaData.TIT2;
      delete musicMetaData.TPE1;
      delete musicMetaData.APIC;
  
      music.tags = JSON.stringify(musicMetaData);
  
      await db.insertMusic(music);
      console.log(`${i + 1}/${musicFiles.length}`);
    }
  
    await db.closeDatabase();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const loadLocalSounds = async (update = false) => {
  try {
    const db = new Database();
    let musics = await db.getAllMusics();
    await db.closeDatabase();

    if (Object.keys(musics).length === 0) {
      await findMusic();
      const db = new Database();
      musics = await db.getAllMusics();
      await db.closeDatabase();
      return musics;
    } else {
      return musics;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  loadLocalSounds,
};

// const loadLocalSounds = async (update=false) => {
//   try {

//     if (update) {
//       constants.localMusic = null;
//     }

//     if (
//       fs.existsSync(constants.defaultPath) &&
//       fs.existsSync(constants.musicPath)
//     ) {
//       if (constants.localMusic != null) {
//         return constants.localMusic;
//       }

//       const musicFiles = (await listFiles(constants.musicPath)).filter(
//         (file) =>
//           file.endsWith(".mp3") ||
//           file.endsWith(".wav") ||
//           file.endsWith(".ogg")
//       );

//       const musics = {};

//       let count = 0;
//       for (const file of musicFiles) {
//         count += 1;
//         let id = crypto.randomUUID();
//         musics[id] = {
//           id: id,
//           name: path.parse(file).name,
//           path: `${constants.musicPath}/${file}`,
//           num: count,
//           type: path.parse(file).ext === ".mp3" ? "audio/mp3" : path.parse(file).ext === ".wav" ? "audio/wav" : path.parse(file).ext === ".ogg" ? "audio/ogg" : "undefined",
//         };
//         let tags = await _getTags(musics[id].path);

//         if (tags.picture !== null && tags.picture !== undefined) {
//           const { data, format } = tags.picture;
//           musics[id].picture = {
//             data: Buffer.from(data).toString('base64'),
//             format: format,
//           }
//         }
//         musics[id].tags = tags;
//       }

//       constants.localMusic = musics;

//       return constants.localMusic;
//     } else {
//       fs.mkdirSync(constants.defaultPath, { recursive: true });
//       fs.mkdirSync(constants.musicPath, { recursive: true });
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const getMP3Duration = require('get-mp3-duration')
// const buffer = fs.readFileSync('fixtures/vbr.mp3')
// const duration = getMP3Duration(buffer)

// console.log(duration, 'ms') => 285727 ms
