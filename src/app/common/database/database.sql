-- SQLite
-- TABLE music and add primary key to id row
CREATE TABLE
  IF NOT EXISTS music(
    id TEXT,
    name TEXT,
    path TEXT,
    picture BLOB,
    CONSTRAINT id_music PRIMARY KEY (id)
  );

-- Create TRIGGER in table music and use extension uuid
CREATE TRIGGER IF NOT EXISTS STR_UUID_V4 AFTER INSERT ON music FOR EACH ROW
WHEN (NEW.id IS NULL) BEGIN
UPDATE
  music
SET
  id = (
    select
      lower(uuid())
  )
WHERE
  rowid = NEW.rowid;

END;

CREATE TABLE
  IF NOT EXISTS playlist (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    items TEXT
  );

