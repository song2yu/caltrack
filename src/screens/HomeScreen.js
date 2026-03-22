import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import CalorieRing from '../components/CalorieRing';
import {
  getFoodLogByDate,
  getExerciseLogByDate,
  getSetting,
  deleteFoodLog,
  deleteExerciseLog,
} from '../database/db';
import {
  getTodayString,
  addDaysToDate,
  formatDisplayDate,
  sumCalories,
  sumBurned,
  MEALS,
  MEAL_NAMES,
  MEAL_ICONS,
} from '../utils/calculations';

export default function HomeScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState(getTodayString());
  const [foodLogs, setFoodLogs] = useState([]);
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  const loadData = useCallback(async () => {
    const logs = await getFoodLogByDate(currentDate);
    const exercises = await getExerciseLogByDate(currentDate);
    const goal = await getSetting('calorie_goal');
    setFoodLogs(logs);
    setExerciseLogs(exercises);
    setCalorieGoal(parseInt(goal || '2000', 10));
  }, [currentDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const prevDay = () => setCurrentDate(d => addDaysToDate(d, -1));
  const nextDay = () => {
    const tomorrow = addDaysToDate(getTodayString(), 1);
    setCurrentDate(d => {
      const next = addDaysToDate(d, 1);
      if (next > tomorrow) return d;
      return next;
    });
  };

  const totalIntake = sumCalories(foodLogs);
  const totalBurned = sumBurned(exerciseLogs);
  const net = totalIntake - totalBurned;

  const getLogsByMeal = (meal) => foodLogs.filter(f => f.meal === meal);

  const handleDeleteFood = async (id) => {
    await deleteFoodLog(id);
    loadData();
  };

  const handleDeleteExercise = async (id) => {
    await deleteExerciseLog(id);
    loadData();
  };

  const isToday = currentDate === getTodayString();

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#4CAF50', '#388E3C']} style={styles.header}>
        <SafeAreaView edges={['top']}>
          {/* Date Selector */}
          <View style={styles.dateRow}>
            <TouchableOpacity onPress={prevDay} style={styles.arrowBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.dateText}>{formatDisplayDate(currentDate)}</Text>
            <TouchableOpacity
              onPress={nextDay}
              style={[styles.arrowBtn, isToday && styles.arrowDisabled]}
              disabled={isToday}
            >
              <Ionicons name="chevron-forward" size={22} color={isToday ? 'rgba(255,255,255,0.4)' : '#fff'} />
            </TouchableOpacity>
          </View>

          {/* Calorie Ring */}
          <View style={styles.ringContainer}>
            <CalorieRing
              intake={totalIntake}
              goal={calorieGoal}
              burned={totalBurned}
              size={200}
            />
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{calorieGoal}</Text>
              <Text style={styles.statLabel}>目标</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: '#FFEB3B' }]}>{Math.round(totalBurned)}</Text>
              <Text style={styles.statLabel}>运动消耗</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: net > calorieGoal ? '#FF5252' : '#B2DFDB' }]}>
                {Math.round(net)}
              </Text>
              <Text style={styles.statLabel}>净摄入</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Meal Sections */}
        {MEALS.map((meal, idx) => {
          const mealLogs = getLogsByMeal(meal);
          const mealCal = sumCalories(mealLogs);
          return (
            <View key={meal} style={styles.card}>
              <View style={styles.mealHeader}>
                <View style={styles.mealTitleRow}>
                  <Text style={styles.mealIcon}>{MEAL_ICONS[idx]}</Text>
                  <Text style={styles.mealName}>{MEAL_NAMES[idx]}</Text>
                  {mealCal > 0 && (
                    <Text style={styles.mealCal}>{Math.round(mealCal)} 千卡</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.addMealBtn}
                  onPress={() =>
                    navigation.navigate('添加食物', { meal, date: currentDate })
                  }
                >
                  <Ionicons name="add" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
              {mealLogs.length > 0 ? (
                mealLogs.map(log => (
                  <View key={log.id} style={styles.foodRow}>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName} numberOfLines={1}>
                        {log.food_name}
                      </Text>
                      <Text style={styles.foodDetail}>
                        x{log.quantity}
                      </Text>
                    </View>
                    <View style={styles.foodRight}>
                      <Text style={styles.foodCal}>{Math.round(log.calories)} 千卡</Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteFood(log.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Ionicons name="close-circle" size={18} color="#BDBDBD" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyMeal}>点击 + 添加食物</Text>
              )}
            </View>
          );
        })}

        {/* Exercise Section */}
        <View style={styles.card}>
          <View style={styles.mealHeader}>
            <View style={styles.mealTitleRow}>
              <Text style={styles.mealIcon}>🏃</Text>
              <Text style={styles.mealName}>今日运动</Text>
              {totalBurned > 0 && (
                <Text style={[styles.mealCal, { color: '#FF7043' }]}>
                  -{Math.round(totalBurned)} 千卡
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.addMealBtn}
              onPress={() => navigation.navigate('运动', { date: currentDate })}
            >
              <Ionicons name="add" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          {exerciseLogs.length > 0 ? (
            exerciseLogs.map(log => (
              <View key={log.id} style={styles.foodRow}>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{log.exercise_name}</Text>
                  <Text style={styles.foodDetail}>{log.duration_min} 分钟</Text>
                </View>
                <View style={styles.foodRight}>
                  <Text style={[styles.foodCal, { color: '#FF7043' }]}>
                    -{Math.round(log.calories_burned)} 千卡
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteExercise(log.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="close-circle" size={18} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMeal}>点击 + 添加运动</Text>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('添加食物', { date: currentDate })}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  arrowBtn: {
    padding: 8,
  },
  arrowDisabled: {
    opacity: 0.4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 24,
    minWidth: 120,
    textAlign: 'center',
  },
  ringContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  mealCal: {
    fontSize: 13,
    color: '#4CAF50',
    marginLeft: 8,
    fontWeight: '500',
  },
  addMealBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  foodDetail: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  foodRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodCal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF7043',
    marginRight: 8,
  },
  emptyMeal: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontSize: 13,
    paddingVertical: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
