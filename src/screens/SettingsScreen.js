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
  Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getAllSettings, setSetting, clearAllData } from '../database/db';

const GENDER_OPTIONS = ['男', '女'];

export default function SettingsScreen() {
  const [calorieGoal, setCalorieGoal] = useState('2000');
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState('男');
  const [age, setAge] = useState('25');
  const [saved, setSaved] = useState(false);

  const loadSettings = useCallback(async () => {
    const s = await getAllSettings();
    if (s.calorie_goal) setCalorieGoal(s.calorie_goal);
    if (s.height) setHeight(s.height);
    if (s.gender) setGender(s.gender);
    if (s.age) setAge(s.age);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [loadSettings])
  );

  const handleSave = async () => {
    const goal = parseInt(calorieGoal, 10);
    if (!goal || goal < 500 || goal > 10000) {
      Alert.alert('提示', '每日热量目标应在 500 - 10000 千卡之间');
      return;
    }
    const h = parseFloat(height);
    if (!h || h < 50 || h > 300) {
      Alert.alert('提示', '身高应在 50 - 300 cm 之间');
      return;
    }
    const a = parseInt(age, 10);
    if (!a || a < 1 || a > 150) {
      Alert.alert('提示', '年龄应在 1 - 150 之间');
      return;
    }

    await setSetting('calorie_goal', String(goal));
    await setSetting('height', String(h));
    await setSetting('gender', gender);
    await setSetting('age', String(a));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearData = () => {
    Alert.alert(
      '清除所有数据',
      '这将删除所有饮食记录、运动记录和体重记录，设置保留。此操作不可撤销，确定吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定清除',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            Alert.alert('完成', '所有数据已清除');
          },
        },
      ]
    );
  };

  // BMR Calculation Display (Mifflin-St Jeor)
  const calculateBMR = () => {
    const w = 65; // default weight if no recorded
    const h = parseFloat(height) || 170;
    const a = parseInt(age, 10) || 25;
    if (gender === '男') {
      return Math.round(10 * w + 6.25 * h - 5 * a + 5);
    } else {
      return Math.round(10 * w + 6.25 * h - 5 * a - 161);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>

        {/* Calorie Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 每日目标</Text>

          <View style={styles.card}>
            <Text style={styles.fieldLabel}>每日卡路里目标</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputField}
                keyboardType="number-pad"
                value={calorieGoal}
                onChangeText={setCalorieGoal}
                placeholder="2000"
                placeholderTextColor="#BDBDBD"
              />
              <Text style={styles.inputUnit}>千卡/天</Text>
            </View>
            <Text style={styles.fieldHint}>
              推荐：男性 2000-2500 · 女性 1600-2000
            </Text>

            {/* Quick Goal Buttons */}
            <View style={styles.goalPresets}>
              {['1500', '1800', '2000', '2200', '2500'].map(g => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.presetBtn,
                    calorieGoal === g && styles.presetBtnActive,
                  ]}
                  onPress={() => setCalorieGoal(g)}
                >
                  <Text
                    style={[
                      styles.presetBtnText,
                      calorieGoal === g && styles.presetBtnTextActive,
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 个人信息</Text>

          <View style={styles.card}>
            {/* Height */}
            <Text style={styles.fieldLabel}>身高</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputField}
                keyboardType="decimal-pad"
                value={height}
                onChangeText={setHeight}
                placeholder="170"
                placeholderTextColor="#BDBDBD"
              />
              <Text style={styles.inputUnit}>cm</Text>
            </View>

            {/* Age */}
            <Text style={[styles.fieldLabel, { marginTop: 14 }]}>年龄</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.inputField}
                keyboardType="number-pad"
                value={age}
                onChangeText={setAge}
                placeholder="25"
                placeholderTextColor="#BDBDBD"
              />
              <Text style={styles.inputUnit}>岁</Text>
            </View>

            {/* Gender */}
            <Text style={[styles.fieldLabel, { marginTop: 14 }]}>性别</Text>
            <View style={styles.genderRow}>
              {GENDER_OPTIONS.map(g => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderBtn,
                    gender === g && styles.genderBtnActive,
                  ]}
                  onPress={() => setGender(g)}
                >
                  <Text
                    style={[
                      styles.genderBtnText,
                      gender === g && styles.genderBtnTextActive,
                    ]}
                  >
                    {g === '男' ? '👨 男' : '👩 女'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* BMR Info */}
        <View style={styles.card}>
          <View style={styles.bmrRow}>
            <View>
              <Text style={styles.bmrTitle}>基础代谢率 (BMR)</Text>
              <Text style={styles.bmrDesc}>基于 Mifflin-St Jeor 公式</Text>
            </View>
            <Text style={styles.bmrValue}>{calculateBMR()} 千卡</Text>
          </View>
          <Text style={styles.bmrNote}>
            * 基础代谢是在完全休息状态下身体维持基本功能所消耗的热量。实际需求应乘以活动系数。
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, saved && styles.saveBtnSaved]}
          onPress={handleSave}
        >
          <Ionicons
            name={saved ? 'checkmark-circle' : 'save-outline'}
            size={20}
            color="#fff"
          />
          <Text style={styles.saveBtnText}>{saved ? '已保存 ✓' : '保存设置'}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#F44336' }]}>⚠️ 数据管理</Text>
          <View style={styles.card}>
            <Text style={styles.dangerDesc}>
              清除所有饮食、运动、体重记录数据。设置信息保留。此操作不可撤销。
            </Text>
            <TouchableOpacity style={styles.dangerBtn} onPress={handleClearData}>
              <Ionicons name="trash-outline" size={18} color="#F44336" />
              <Text style={styles.dangerBtnText}>清除所有数据</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>卡路里追踪 CalTrack</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoNote}>数据仅存储在本地设备，不上传云端</Text>
        </View>

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
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
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
  fieldLabel: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 6,
    fontWeight: '500',
  },
  fieldHint: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  inputField: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    paddingVertical: 10,
  },
  inputUnit: {
    fontSize: 14,
    color: '#757575',
  },
  goalPresets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  presetBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  presetBtnActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  presetBtnText: {
    fontSize: 13,
    color: '#616161',
  },
  presetBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  genderBtnActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  genderBtnText: {
    fontSize: 15,
    color: '#616161',
  },
  genderBtnTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  bmrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bmrTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
  },
  bmrDesc: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
  },
  bmrValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bmrNote: {
    fontSize: 11,
    color: '#BDBDBD',
    lineHeight: 16,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  saveBtnSaved: {
    backgroundColor: '#388E3C',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  dangerDesc: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
    marginBottom: 12,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 8,
    paddingVertical: 10,
  },
  dangerBtnText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  appInfo: {
    alignItems: 'center',
    paddingTop: 8,
  },
  appInfoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4CAF50',
  },
  appInfoVersion: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  appInfoNote: {
    fontSize: 11,
    color: '#BDBDBD',
    marginTop: 4,
    textAlign: 'center',
  },
});
