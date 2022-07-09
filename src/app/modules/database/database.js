const sqlite3 = require('sqlite3');
const constants = require("../utils/constants");

class Database {
  constructor() {
    this.db = new sqlite3.Database(constants.databasePath);
  }

  createDatabase = async () => {
    this.db = new sqlite3.Database(constants.databasePath);
    await this.db.run(`CREATE TABLE IF NOT EXISTS sounds (
      id TEXT PRIMARY KEY,
      name TEXT,
      path TEXT,
      type TEXT,
      picture TEXT,
      tags TEXT,
      hash TEXT
    )`);
  }
  
  insertMusic = async (music) => {
    await this.db.run(`INSERT INTO sounds (id, name, path, type, picture, tags, hash) VALUES (?, ?, ?, ?, ?, ?, ?)`, [music.id, music.name, music.path, music.type, music.picture, music.tags, music.hash]);
  }
  
  getMusic = async (id) => {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM sounds WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }
  
  getAllMusics = () => {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM sounds`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })
  }

  closeDatabase = async () => {
    this.db.close();
  }
}

module.exports = {
  Database,
}