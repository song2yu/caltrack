import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { EXERCISES } from '../database/foodData';
import {
  addExerciseLog,
  getExerciseLogByDate,
  deleteExerciseLog,
  getSetting,
} from '../database/db';
import {
  getTodayString,
  calculateExerciseCalories,
  formatDisplayDate,
} from '../utils/calculations';

export default function ExerciseScreen({ route }) {
  const routeDate = route?.params?.date || getTodayString();
  const [date] = useState(routeDate);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [duration, setDuration] = useState('30');
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [userWeight, setUserWeight] = useState(60);

  const loadData = useCallback(async () => {
    const logs = await getExerciseLogByDate(date);
    setExerciseLogs(logs);
    // Get user weight from settings if available, else default 60
    const hw = parseFloat(await getSetting('weight_kg') || '60');
    if (!isNaN(hw) && hw > 0) setUserWeight(hw);
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const filteredExercises = EXERCISES.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const estimatedBurn = selectedExercise
    ? calculateExerciseCalories(selectedExercise.kcalPerMin, parseFloat(duration) || 0, userWeight)
    : 0;

  const handleAddExercise = async () => {
    if (!selectedExercise) {
      Alert.alert('提示', '请选择运动类型');
      return;
    }
    const dur = parseFloat(duration);
    if (!dur || dur <= 0 || isNaN(dur)) {
      Alert.alert('提示', '请输入有效的运动时长');
      return;
    }
    const burned = calculateExerciseCalories(selectedExercise.kcalPerMin, dur, userWeight);
    await addExerciseLog(date, selectedExercise.name, dur, burned);
    loadData();
    setSelectedExercise(null);
    setDuration('30');
    Alert.alert('已记录', `${selectedExercise.name} ${dur}分钟，消耗 ${burned} 千卡`);
  };

  const handleDelete = (id) => {
    Alert.alert('删除', '确定删除这条运动记录？', [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: async () => {
          await deleteExerciseLog(id);
          loadData();
        },
      },
    ]);
  };

  const totalBurned = exerciseLogs.reduce((s, l) => s + l.calories_burned, 0);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Today's Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNum}>{exerciseLogs.length}</Text>
            <Text style={styles.summaryLabel}>运动项目</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNum, { color: '#FF7043' }]}>
              {Math.round(totalBurned)}
            </Text>
            <Text style={styles.summaryLabel}>消耗千卡</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNum}>
              {exerciseLogs.reduce((s, l) => s + l.duration_min, 0)}
            </Text>
            <Text style={styles.summaryLabel}>运动分钟</Text>
          </View>
        </View>

        {/* Add Exercise */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>添加运动</Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#9E9E9E" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="搜索运动..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#BDBDBD"
            />
          </View>

          {/* Exercise List */}
          <ScrollView
            horizontal={false}
            nestedScrollEnabled
            style={styles.exerciseList}
          >
            {filteredExercises.map(ex => (
              <TouchableOpacity
                key={ex.id}
                style={[
                  styles.exerciseItem,
                  selectedExercise?.id === ex.id && styles.exerciseItemSelected,
                ]}
                onPress={() => setSelectedExercise(ex)}
              >
                <Text style={styles.exerciseIcon}>{ex.icon}</Text>
                <View style={styles.exerciseInfo}>
                  <Text
                    style={[
                      styles.exerciseName,
                      selectedExercise?.id === ex.id && styles.exerciseNameSelected,
                    ]}
                  >
                    {ex.name}
                  </Text>
                  <Text style={styles.exerciseRate}>
                    {ex.kcalPerMin} 千卡/分钟
                  </Text>
                </View>
                {selectedExercise?.id === ex.id && (
                  <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Duration Input */}
          {selectedExercise && (
            <View style={styles.durationSection}>
              <View style={styles.durationRow}>
                <Text style={styles.durationLabel}>
                  {selectedExercise.icon} {selectedExercise.name} · 时长
                </Text>
              </View>
              <View style={styles.durationInputRow}>
                <TextInput
                  style={styles.durationInput}
                  keyboardType="decimal-pad"
                  value={duration}
                  onChangeText={setDuration}
                  placeholder="30"
                  placeholderTextColor="#BDBDBD"
                />
                <Text style={styles.durationUnit}>分钟</Text>
              </View>
              <View style={styles.burnEstimate}>
                <Text style={styles.burnLabel}>预计消耗</Text>
                <Text style={styles.burnValue}>{estimatedBurn} 千卡</Text>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={handleAddExercise}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.addBtnText}>记录运动</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Today's Exercise Logs */}
        {exerciseLogs.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>今日运动记录</Text>
            {exerciseLogs.map(log => (
              <View key={log.id} style={styles.logItem}>
                <View style={styles.logLeft}>
                  <Text style={styles.logName}>{log.exercise_name}</Text>
                  <Text style={styles.logDetail}>{log.duration_min} 分钟</Text>
                </View>
                <View style={styles.logRight}>
                  <Text style={styles.logBurn}>-{Math.round(log.calories_burned)} 千卡</Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(log.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="trash-outline" size={16} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNum: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
    paddingVertical: 0,
  },
  exerciseList: {
    maxHeight: 240,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  exerciseItemSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  exerciseIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  exerciseNameSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  exerciseRate: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  durationSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  durationRow: {
    marginBottom: 8,
  },
  durationLabel: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  durationInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  durationInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    paddingVertical: 10,
  },
  durationUnit: {
    fontSize: 16,
    color: '#757575',
  },
  burnEstimate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  burnLabel: {
    fontSize: 14,
    color: '#757575',
  },
  burnValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7043',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  logLeft: {
    flex: 1,
  },
  logName: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  logDetail: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  logRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logBurn: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF7043',
  },
});
