const sqlite3 = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class Database {
  constructor(dbName) {
    this.db = new sqlite3(dbName, { verbose: console.log });
    let uuidPath = "extensions/uuid." + process.platform === "win32" ? "dll" : process.platform === "linux" ? "so" : "dylib";
    this.db.loadExtension(path.join(__dirname, uuidPath));
    const migration = fs.readFileSync(path.join(__dirname, "database.sql"), 'utf8');
    this.db.exec(migration)
    this.db.exec("INSERT INTO UUID_TABLE (id, name) VALUES (NULL, 'REEEELOCOOOO')")
  }

  createDatabase = async () => {
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

module.exports = Database;