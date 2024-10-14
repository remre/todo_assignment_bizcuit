import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', err => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Create the users table
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`,
    err => {
      if (err) {
        console.error('Error creating users table:', err.message);
      }
    }
  );

  // Create the groups table
  db.run(
    `CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER,
      UNIQUE(name, user_id),  
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,
    err => {
      if (err) {
        console.error('Error creating groups table:', err.message);
      }
    }
  );

  // Create the tasks table
  db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      deadline TEXT,
      hour TEXT,
      done INTEGER DEFAULT 0,
      group_id INTEGER,
      user_id INTEGER, 
      FOREIGN KEY (group_id) REFERENCES groups(id),
      FOREIGN KEY (user_id) REFERENCES users(id) 
    )`,
    err => {
      if (err) {
        console.error('Error creating tasks table:', err.message);
      }
    }
  );

  db.run(
    `INSERT OR IGNORE INTO groups (name, user_id) VALUES ('General', NULL)`,
    err => {
      if (err) {
        console.error('Error inserting default group:', err.message);
      }
    }
  );
});

export default db;
