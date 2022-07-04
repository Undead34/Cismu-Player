const { loadLocalSounds } = require("../../modules/getSounds");
const { Database } = require("../../modules/database");
const constants = require("../../utils/constants");
const fs = require("fs")

module.exports = {
	name: 'play-local-sound',
	once: false,
	handle: true,
	async execute(event, id) {
		id = id[0]["sound-id"];
		const db = new Database();
    let music = await db.getMusic(id);
    await db.closeDatabase();
		let buffer = await fs.readFileSync(music.path);
		delete music.path
		music.blob = buffer;
		return music;
	},
};


// if (constants.localMusic != {} && constants.localMusic != undefined) {
//   let musics = constants.localMusic;
//   let musicToPlay = music[0]["sound-id"];

//   for (let key in musics) {
//     if (musics[key].id == musicToPlay) {
//       musicToPlay = musics[key];
//     }
//   }

//   musicToPlay.blob = await fs.readFileSync(musicToPlay.path);
  
//   return musicToPlay;
// } else {
//   loadLocalSounds();
//   return false;
// }