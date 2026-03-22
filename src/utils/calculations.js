// Utility functions for calorie calculations

export const getTodayString = () => {
  const d = new Date();
  return formatDateString(d);
};

export const formatDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const formatDisplayDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-');
  const today = getTodayString();
  const yesterday = getOffsetDateString(-1);

  if (dateStr === today) return '今天';
  if (dateStr === yesterday) return '昨天';

  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const date = new Date(dateStr);
  const weekday = weekdays[date.getDay()];
  return `${m}月${d}日 ${weekday}`;
};

export const getOffsetDateString = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return formatDateString(d);
};

export const addDaysToDate = (dateStr, days) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return formatDateString(date);
};

// Sum calories from food log entries
export const sumCalories = (entries) => {
  return entries.reduce((sum, e) => sum + (e.calories || 0), 0);
};

// Sum burned calories from exercise entries
export const sumBurned = (exercises) => {
  return exercises.reduce((sum, e) => sum + (e.calories_burned || 0), 0);
};

// Calculate net calories
export const netCalories = (intake, burned) => {
  return intake - burned;
};

// Calculate BMI
export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const getBMICategory = (bmi) => {
  if (!bmi) return { label: '未知', color: '#9E9E9E' };
  if (bmi < 18.5) return { label: '偏瘦', color: '#2196F3' };
  if (bmi < 24) return { label: '正常', color: '#4CAF50' };
  if (bmi < 28) return { label: '超重', color: '#FF9800' };
  return { label: '肥胖', color: '#F44336' };
};

// Calculate calorie adjustment based on weight change for reference
export const calculateExerciseCalories = (kcalPerMin, durationMin, weightKg = 60) => {
  // Scale by weight ratio
  const scaleFactor = weightKg / 60;
  return Math.round(kcalPerMin * durationMin * scaleFactor);
};

// Format calorie number
export const formatCalories = (cal) => {
  return Math.round(cal).toString();
};

// Get percentage for ring
export const getCalorieProgress = (intake, goal) => {
  if (!goal || goal <= 0) return 0;
  return Math.min(intake / goal, 1);
};

// Meal labels
export const MEAL_LABELS = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐',
};

export const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];
export const MEAL_NAMES = ['早餐', '午餐', '晚餐', '加餐'];
export const MEAL_ICONS = ['🌅', '☀️', '🌙', '🍪'];
