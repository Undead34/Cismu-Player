const { loadLocalSounds } = require("../../modules/getSounds")

module.exports = {
	name: 'get-local-sounds',
	once: false,
	handle: true,
	async execute(event) {
		console.log(`[IPC] get-local-sounds: Yes`);
		return await loadLocalSounds();
	},
};