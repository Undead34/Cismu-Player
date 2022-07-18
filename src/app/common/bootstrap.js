const Settings = require('./Settings');
const Database = require("./database/better-database");
const paths = require("./paths");
const fs = require("fs");

module.exports = class Bootstrap {
  constructor() {
    this.os = process.platform;
    this.paths = paths[this.os]();
  }

  checkFirstRun() {
    return !fs.existsSync(this.paths.firstRun);
  }

  firstRun() {
    console.log(`
    ##################################################################
    #        Welcome to Cismu Player, this is the first start        #
    ##################################################################\n`);

    if (fs.existsSync(this.paths.home)) {
      fs.rmdirSync(this.paths.home, { recursive: true, force: true });
    }

    fs.mkdirSync(this.paths.home);
    fs.mkdirSync(this.paths.logs);
    fs.writeFileSync(this.paths.firstRun, "true");
    let settings = new Settings(this.paths.settings);
    this.settings = settings.settings;

    let db = new Database(this.paths.database);
    db.createDatabase().then(() => {
      db.closeDatabase();
    });

    return true;
  }

  start() {
    if (this.checkFirstRun()) {
      this.firstRun();
      global.settings = this.settings;
      global.database = {
        dbStatus: "open",
        db: new Database(this.paths.database)
      }
      return true;
    } else {
      let settings = new Settings(this.paths.settings);
      this.settings = settings.settings;

      global.settings = this.settings;

      global.database = {
        dbStatus: "open",
        db: new Database(this.paths.database)
      }

      return true;
    }
  }
}


/*
let root = path.join(app.getPath("appData"), appOptions.appName),
  appData = app.getPath("appData"),
  music = app.getPath("music"),
  useMusic = process.platform === "linux" ? path.join(music, appOptions.appName) : app.getPath("music"),
  videos = app.getPath("videos"),
  home = app.getPath("home"),
  exe = app.getPath("exe"),
  dbPath = path.join(path.join(app.getPath("appData"), appOptions.appName), appOptions.appName + ".db");


const _mkdirSync = (paths) => {
  try {
    if (typeof paths !== "object") {
      fs.mkdirSync(paths, { recursive: true });
      return true;
    } else {
      for (let x in paths) {
        fs.mkdirSync(paths[x], { recursive: true });
      }
      return true;
    }
  } catch (error) {
    handled(error);
  }
}

function init() {
  let folders = [
    root,
    useMusic
  ];

  let folder = _mkdirSync(folders);
}

module.exports = {
  init,
  getPath: {
    root,
    appData,
    music,
    videos,
    home,
    exe,
    dbPath,
    useMusic
  }
}
*/