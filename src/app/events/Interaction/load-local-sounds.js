const path = require("path");
const fs = require("fs");

module.exports = {
  name: "interaction:load-local-sounds",
  isHandle: true,
  action: (e) => {

    // const watcher = fs.watch(global.appPaths.music);
    // watcher.on("change", (event, filename) => {
    //   console.log(`File ${filename} has changed`);
    //   console.log(`Event: ${event}`);
    // });

    return "LOCAL_SOUNDS_LOADED";
  },
};
