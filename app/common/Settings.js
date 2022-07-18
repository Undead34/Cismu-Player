"use strict";

const fs = require("fs");

class Settings {
  constructor(settingsPath) {
    this.settingsPath = settingsPath;

    try {
      this.lastSaved = fs.readFileSync(this.settingsPath);
      this.settings = JSON.parse(this.lastSaved);
    } catch (e) {
      this.lastSaved = "";
      this.settings = {
        enableHardwareAcceleration: true,
        enableLocalFiles: true,
        localFilePaths: "default",
      };
      this.save();
    }

    this.lastModified = this._lastModified();
  }

  _lastModified() {
    try {
      return fs.statSync(this.settingsPath).mtime.getTime();
    } catch (e) {
      return 0;
    }
  }

  get(key, defaultValue = false) {
    if (this.settings.hasOwnProperty(key)) {
      return this.settings[key];
    }

    return defaultValue;
  }

  set(key, value) {
    this.settings[key] = value;
  }

  save() {
    if (this.lastModified && this.lastModified !== this._lastModified()) {
      console.warn("Not saving settings, it has been externally modified.");
      return;
    }

    try {
      const toSave = JSON.stringify(this.settings, null, 2);

      if (this.lastSaved != toSave) {
        this.lastSaved = toSave;
        fs.writeFileSync(this.settingsPath, toSave);

        this.lastModified = this._lastModified();
      }
    } catch (err) {
      console.warn("Failed saving settings with error: ", err);
    }
  }
}

module.exports = Settings;
