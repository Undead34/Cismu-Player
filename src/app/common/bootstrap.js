const paths = require("./paths");
const fs = require("fs");

module.exports = class Bootstrap {
  constructor() {
    this.os = process.platform;
    this.isFirstRun = false;
    this.paths = paths[this.os]();
  }

  checkFirstRun() {
    return !fs.existsSync(this.paths.firstRun);
  }

  firstRun() {
    console.log("First Run!!!")
  }

  start() {
    if (this.checkFirstRun()) {
      this.firstRun();
    }
  }
}
