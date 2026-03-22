import * as SQLite from 'expo-sqlite';

let db = null;

export const getDatabase = () => {
  if (!db) {
    db = SQLite.openDatabaseSync('caltrack.db');
  }
  return db;
};

export const initDatabase = () => {
  const database = getDatabase();

  database.execSync(`
    CREATE TABLE IF NOT EXISTS food_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      meal TEXT NOT NULL,
      food_id TEXT,
      food_name TEXT NOT NULL,
      quantity REAL NOT NULL,
      calories REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  database.execSync(`
    CREATE TABLE IF NOT EXISTS exercise_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      exercise_name TEXT NOT NULL,
      duration_min REAL NOT NULL,
      calories_burned REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  database.execSync(`
    CREATE TABLE IF NOT EXISTS weight_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      weight REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  database.execSync(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Insert default settings if not present
  database.execSync(`
    INSERT OR IGNORE INTO settings (key, value) VALUES ('calorie_goal', '2000');
  `);
  database.execSync(`
    INSERT OR IGNORE INTO settings (key, value) VALUES ('height', '170');
  `);
  database.execSync(`
    INSERT OR IGNORE INTO settings (key, value) VALUES ('gender', '男');
  `);
  database.execSync(`
    INSERT OR IGNORE INTO settings (key, value) VALUES ('age', '25');
  `);
};

// ---- Food Log ----
export const addFoodLog = (date, meal, food_id, food_name, quantity, calories) => {
  const database = getDatabase();
  database.runSync(
    'INSERT INTO food_log (date, meal, food_id, food_name, quantity, calories) VALUES (?, ?, ?, ?, ?, ?)',
    [date, meal, food_id, food_name, quantity, calories]
  );
};

export const getFoodLogByDate = (date) => {
  const database = getDatabase();
  return database.getAllSync(
    'SELECT * FROM food_log WHERE date = ? ORDER BY created_at ASC',
    [date]
  );
};

export const deleteFoodLog = (id) => {
  const database = getDatabase();
  database.runSync('DELETE FROM food_log WHERE id = ?', [id]);
};

// ---- Exercise Log ----
export const addExerciseLog = (date, exercise_name, duration_min, calories_burned) => {
  const database = getDatabase();
  database.runSync(
    'INSERT INTO exercise_log (date, exercise_name, duration_min, calories_burned) VALUES (?, ?, ?, ?)',
    [date, exercise_name, duration_min, calories_burned]
  );
};

export const getExerciseLogByDate = (date) => {
  const database = getDatabase();
  return database.getAllSync(
    'SELECT * FROM exercise_log WHERE date = ? ORDER BY created_at ASC',
    [date]
  );
};

export const deleteExerciseLog = (id) => {
  const database = getDatabase();
  database.runSync('DELETE FROM exercise_log WHERE id = ?', [id]);
};

// ---- Weight Log ----
export const addWeightLog = (date, weight) => {
  const database = getDatabase();
  // Upsert by date
  database.runSync(
    'INSERT OR REPLACE INTO weight_log (date, weight) VALUES (?, ?)',
    [date, weight]
  );
};

export const getWeightLogs = (limit = 30) => {
  const database = getDatabase();
  return database.getAllSync(
    'SELECT * FROM weight_log ORDER BY date DESC LIMIT ?',
    [limit]
  );
};

export const getLatestWeight = () => {
  const database = getDatabase();
  return database.getFirstSync(
    'SELECT * FROM weight_log ORDER BY date DESC LIMIT 1'
  );
};

// ---- Settings ----
export const getSetting = (key) => {
  const database = getDatabase();
  const row = database.getFirstSync('SELECT value FROM settings WHERE key = ?', [key]);
  return row ? row.value : null;
};

export const setSetting = (key, value) => {
  const database = getDatabase();
  database.runSync(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    [key, String(value)]
  );
};

export const getAllSettings = () => {
  const database = getDatabase();
  const rows = database.getAllSync('SELECT key, value FROM settings');
  const result = {};
  rows.forEach(row => {
    result[row.key] = row.value;
  });
  return result;
};

// ---- Clear All Data ----
export const clearAllData = () => {
  const database = getDatabase();
  database.execSync('DELETE FROM food_log;');
  database.execSync('DELETE FROM exercise_log;');
  database.execSync('DELETE FROM weight_log;');
};
