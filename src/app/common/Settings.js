"use strict";

const fs = require("fs");
const path = require("path");

// TODO: sync fs operations could cause slowdown and/or freezes, depending on usage
//       if this is fine, remove this todo
class Settings {
  constructor(root) {
    this.path = path.join(root, 'settings.json');

    try {
      this.lastSaved = fs.readFileSync(this.path);
      this.settings = JSON.parse(this.lastSaved);
    } catch (e) {
      this.lastSaved = '';
      this.settings = {
        "enableHardwareAcceleration": true,
      };
      this.save();
    }

    this.lastModified = this._lastModified();
  }

  _lastModified() {
    try {
      return fs.statSync(this.path).mtime.getTime();
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
      console.warn('Not saving settings, it has been externally modified.');
      return;
    }

    try {
      const toSave = JSON.stringify(this.settings, null, 2);

      if (this.lastSaved != toSave) {
        this.lastSaved = toSave;

        fs.writeFileSync(this.path, toSave);

        this.lastModified = this._lastModified();
      }
    } catch (err) {
      console.warn('Failed saving settings with error: ', err);
    }
  }

}

module.exports = Settings;