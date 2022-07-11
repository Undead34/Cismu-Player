const fs = require("fs");

module.exports = {
  name: "renderer:load-local-sounds",
  isHandle: true,
  isIPCMain: false,
  once: false,
  action: (e) => {
    let list = fs.readdirSync(global.appPaths.music);
    global.app.emit("renderer:load-local-sounds", list);
  },
};
