const fs = require("fs");

module.exports = {
  name: "interaction:load-local-sounds",
  isHandle: true,
  action: (e) => {
    let list = fs.readdirSync(global.appPaths.music);

  },
};
