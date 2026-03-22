import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Keys ───────────────────────────────────────────────
const KEYS = {
  FOOD_LOG: 'caltrack_food_log',
  EXERCISE_LOG: 'caltrack_exercise_log',
  WEIGHT_LOG: 'caltrack_weight_log',
  SETTINGS: 'caltrack_settings',
};

// ─── Helpers ─────────────────────────────────────────────
const readJSON = async (key, fallback) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

let _nextId = Date.now();
const nextId = () => ++_nextId;

// ─── Init (no-op for AsyncStorage, kept for API compat) ──
export const initDatabase = async () => {
  const settings = await readJSON(KEYS.SETTINGS, null);
  if (!settings) {
    await writeJSON(KEYS.SETTINGS, {
      calorie_goal: '2000',
      height: '170',
      gender: '男',
      age: '25',
    });
  }
};

// ─── Food Log ────────────────────────────────────────────
export const addFoodLog = async (date, meal, food_id, food_name, quantity, calories) => {
  const all = await readJSON(KEYS.FOOD_LOG, []);
  all.push({ id: nextId(), date, meal, food_id, food_name, quantity, calories, created_at: new Date().toISOString() });
  await writeJSON(KEYS.FOOD_LOG, all);
};

export const getFoodLogByDate = async (date) => {
  const all = await readJSON(KEYS.FOOD_LOG, []);
  return all.filter(r => r.date === date).sort((a, b) => a.created_at.localeCompare(b.created_at));
};

export const deleteFoodLog = async (id) => {
  const all = await readJSON(KEYS.FOOD_LOG, []);
  await writeJSON(KEYS.FOOD_LOG, all.filter(r => r.id !== id));
};

// ─── Exercise Log ────────────────────────────────────────
export const addExerciseLog = async (date, exercise_name, duration_min, calories_burned) => {
  const all = await readJSON(KEYS.EXERCISE_LOG, []);
  all.push({ id: nextId(), date, exercise_name, duration_min, calories_burned, created_at: new Date().toISOString() });
  await writeJSON(KEYS.EXERCISE_LOG, all);
};

export const getExerciseLogByDate = async (date) => {
  const all = await readJSON(KEYS.EXERCISE_LOG, []);
  return all.filter(r => r.date === date).sort((a, b) => a.created_at.localeCompare(b.created_at));
};

export const deleteExerciseLog = async (id) => {
  const all = await readJSON(KEYS.EXERCISE_LOG, []);
  await writeJSON(KEYS.EXERCISE_LOG, all.filter(r => r.id !== id));
};

// ─── Weight Log ──────────────────────────────────────────
export const addWeightLog = async (date, weight) => {
  const all = await readJSON(KEYS.WEIGHT_LOG, []);
  const filtered = all.filter(r => r.date !== date); // upsert by date
  filtered.push({ id: nextId(), date, weight, created_at: new Date().toISOString() });
  await writeJSON(KEYS.WEIGHT_LOG, filtered);
};

export const getWeightLogs = async (limit = 30) => {
  const all = await readJSON(KEYS.WEIGHT_LOG, []);
  return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
};

export const getLatestWeight = async () => {
  const all = await readJSON(KEYS.WEIGHT_LOG, []);
  if (!all.length) return null;
  return all.sort((a, b) => b.date.localeCompare(a.date))[0];
};

// ─── Settings ────────────────────────────────────────────
export const getSetting = async (key) => {
  const settings = await readJSON(KEYS.SETTINGS, {});
  return settings[key] ?? null;
};

export const setSetting = async (key, value) => {
  const settings = await readJSON(KEYS.SETTINGS, {});
  settings[key] = String(value);
  await writeJSON(KEYS.SETTINGS, settings);
};

export const getAllSettings = async () => {
  return await readJSON(KEYS.SETTINGS, {
    calorie_goal: '2000',
    height: '170',
    gender: '男',
    age: '25',
  });
};

// ─── Clear All ───────────────────────────────────────────
export const clearAllData = async () => {
  await AsyncStorage.multiRemove([KEYS.FOOD_LOG, KEYS.EXERCISE_LOG, KEYS.WEIGHT_LOG]);
};
