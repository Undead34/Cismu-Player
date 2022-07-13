const sqlite3 = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class Database {
  constructor(dbName) {
    this.db = new sqlite3(dbName);
    let uuidPath = `extensions/uuid.${process.platform === "win32" ? "dll" : process.platform === "linux" ? "so" : "dylib"}`;
    this.db.loadExtension(path.join(__dirname, uuidPath));
  }

  createDatabase = async () => {
    const migration = fs.readFileSync(path.join(__dirname, "database.sql"), 'utf8');
    this.db.exec(migration);
    return true;
  }

  insertMusic = async (musicsFiles) => {
    const stmt = this.db.prepare('INSERT INTO music (id, name, path, picture) VALUES (NULL, ?, ?, ?)');
    
    const insertMany = this.db.transaction((data) => {
      for (let x = 0; x < data.length; x++) {
        stmt.run(data[x], "New Para", null);
      }
    });
    
    insertMany(musicsFiles);
  }

  getMusic = async (id) => {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM music WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }

  getAllMusics = async () => {
    try {
      const stmt = this.db.prepare("SELECT * FROM music");
      let musics = stmt.all();
      return musics;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  closeDatabase = async () => {
    this.db.close();
  }
}

module.exports = Database;