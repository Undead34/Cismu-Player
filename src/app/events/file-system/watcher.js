const fs = require("fs");

module.exports = {
  name: "file-system:watcher",
  isHandle: false,
  isIPCMain: true,
  once: false,
  autostart: true,
  action: () => {
    // detect changes in music folder
    let watcher = fs.watch(global.appPaths.music, { recursive: true });

    watcher.on("change", (eventType, filename) => {
      global.app.emit("renderer:load-local-sounds", [filename, eventType]);
    });
  },
};
