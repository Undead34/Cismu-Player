const constants = require("../utils/constants")
const { Database } = require("./database");
const fs = require("fs");

const createFolders = () => {
  if (fs.existsSync(constants.defaultPath) && fs.existsSync(constants.musicPath) && fs.existsSync(constants.videoPath)) {
    return;
  } else {
    fs.mkdirSync(constants.defaultPath, { recursive: true });
    fs.mkdirSync(constants.musicPath, { recursive: true });
    fs.mkdirSync(constants.videoPath, { recursive: true });
  }
}

const _createDatabase = async () => {
  const db = new Database();
  await db.createDatabase();
  await db.closeDatabase();
}

module.exports = {
  createFolders,
  createDatabase: _createDatabase
}