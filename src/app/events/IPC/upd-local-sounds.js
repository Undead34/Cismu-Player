const { loadLocalSounds } = require("../../modules/getSounds")

module.exports = {
	name: 'upd-local-sounds',
	once: false,
	handle: true,
	async execute(event) {
		console.log(`[IPC] upd-local-sounds: Yes`);
		return await loadLocalSounds(true);
	},
};