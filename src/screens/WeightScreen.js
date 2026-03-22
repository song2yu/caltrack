import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import WeightChart from '../components/WeightChart';
import {
  addWeightLog,
  getWeightLogs,
  getLatestWeight,
  getSetting,
} from '../database/db';
import {
  getTodayString,
  calculateBMI,
  getBMICategory,
  formatDateString,
} from '../utils/calculations';

export default function WeightScreen() {
  const [weightInput, setWeightInput] = useState('');
  const [weightLogs, setWeightLogs] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState(null);

  const loadData = useCallback(() => {
    const logs = getWeightLogs(30);
    const latest = getLatestWeight();
    const h = parseFloat(getSetting('height') || '170');
    setWeightLogs(logs);
    setLatestWeight(latest);
    setHeight(h);
    if (latest) {
      setBmi(calculateBMI(latest.weight, h));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleSaveWeight = () => {
    const w = parseFloat(weightInput);
    if (!w || w <= 0 || w > 500 || isNaN(w)) {
      Alert.alert('提示', '请输入有效的体重 (1-500 kg)');
      return;
    }
    const today = getTodayString();
    addWeightLog(today, w);
    setWeightInput('');
    loadData();
  };

  const bmiCategory = getBMICategory(bmi);

  // Build chart data (sorted asc)
  const chartData = [...weightLogs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(l => ({ date: l.date, weight: l.weight }));

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Weight Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>记录今日体重</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.weightInput}
              keyboardType="decimal-pad"
              placeholder={latestWeight ? String(latestWeight.weight) : '0.0'}
              value={weightInput}
              onChangeText={setWeightInput}
              placeholderTextColor="#BDBDBD"
            />
            <Text style={styles.weightUnit}>kg</Text>
          </View>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveWeight}>
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.saveBtnText}>保存体重</Text>
          </TouchableOpacity>
        </View>

        {/* Current Weight Display */}
        {latestWeight && (
          <View style={styles.card}>
            <View style={styles.currentWeightRow}>
              <View style={styles.currentWeightItem}>
                <Text style={styles.currentWeightNum}>
                  {latestWeight.weight.toFixed(1)}
                </Text>
                <Text style={styles.currentWeightLabel}>当前体重 (kg)</Text>
              </View>

              {bmi && (
                <View style={styles.bmiSection}>
                  <View
                    style={[
                      styles.bmiBadge,
                      { backgroundColor: bmiCategory.color + '20' },
                    ]}
                  >
                    <Text style={[styles.bmiNum, { color: bmiCategory.color }]}>
                      {bmi.toFixed(1)}
                    </Text>
                    <Text style={[styles.bmiLabel, { color: bmiCategory.color }]}>
                      BMI · {bmiCategory.label}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* BMI Scale */}
            {bmi && (
              <View style={styles.bmiScale}>
                <View style={styles.bmiBar}>
                  <View style={[styles.bmiSegment, { flex: 2, backgroundColor: '#2196F3' }]} />
                  <View style={[styles.bmiSegment, { flex: 2.5, backgroundColor: '#4CAF50' }]} />
                  <View style={[styles.bmiSegment, { flex: 2, backgroundColor: '#FF9800' }]} />
                  <View style={[styles.bmiSegment, { flex: 3, backgroundColor: '#F44336' }]} />
                </View>
                <View style={styles.bmiBarLabels}>
                  <Text style={styles.bmiBarLabel}>偏瘦</Text>
                  <Text style={styles.bmiBarLabel}>正常</Text>
                  <Text style={styles.bmiBarLabel}>超重</Text>
                  <Text style={styles.bmiBarLabel}>肥胖</Text>
                </View>
                <View style={styles.bmiBarNumbers}>
                  <Text style={styles.bmiBarNum}>18.5</Text>
                  <Text style={styles.bmiBarNum}>24</Text>
                  <Text style={styles.bmiBarNum}>28</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Weight Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            体重趋势 · 最近 {Math.min(weightLogs.length, 30)} 天
          </Text>
          <WeightChart data={chartData} />
        </View>

        {/* Weight History */}
        {weightLogs.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>历史记录</Text>
            {weightLogs.slice(0, 10).map((log, idx) => {
              const prev = weightLogs[idx + 1];
              const diff = prev ? log.weight - prev.weight : null;
              return (
                <View key={log.id} style={styles.historyItem}>
                  <Text style={styles.historyDate}>{log.date}</Text>
                  <View style={styles.historyRight}>
                    {diff !== null && (
                      <Text
                        style={[
                          styles.historyDiff,
                          { color: diff > 0 ? '#F44336' : diff < 0 ? '#4CAF50' : '#9E9E9E' },
                        ]}
                      >
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                      </Text>
                    )}
                    <Text style={styles.historyWeight}>{log.weight.toFixed(1)} kg</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  weightInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#212121',
    paddingVertical: 10,
  },
  weightUnit: {
    fontSize: 18,
    color: '#757575',
    marginLeft: 8,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  currentWeightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  currentWeightItem: {
    alignItems: 'flex-start',
  },
  currentWeightNum: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  currentWeightLabel: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 2,
  },
  bmiSection: {
    alignItems: 'center',
  },
  bmiBadge: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  bmiNum: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  bmiLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  bmiScale: {
    marginTop: 8,
  },
  bmiBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  bmiSegment: {
    height: '100%',
  },
  bmiBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bmiBarLabel: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  bmiBarNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 2,
  },
  bmiBarNum: {
    fontSize: 10,
    color: '#BDBDBD',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  historyDate: {
    fontSize: 14,
    color: '#757575',
  },
  historyRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyDiff: {
    fontSize: 13,
    fontWeight: '500',
  },
  historyWeight: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    minWidth: 64,
    textAlign: 'right',
  },
});
