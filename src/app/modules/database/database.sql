-- SQLite
-- DROP TABLE music;
-- DROP TABLE playlist;
CREATE TABLE
  IF NOT EXISTS music (
    id TEXT,
    name TEXT,
    path TEXT,
    picture BLOB,
    last_played TEXT
  );

CREATE TABLE
  IF NOT EXISTS playlist (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    items TEXT
  );