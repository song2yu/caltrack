import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FOODS, CATEGORIES, searchFoods, calculateCalories } from '../database/foodData';
import { addFoodLog } from '../database/db';
import { getTodayString, MEALS, MEAL_NAMES, MEAL_ICONS } from '../utils/calculations';

const QUANTITY_PRESETS = [0.5, 1, 1.5, 2, 3];

export default function AddFoodScreen({ route, navigation }) {
  const routeMeal = route?.params?.meal || 'lunch';
  const routeDate = route?.params?.date || getTodayString();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedMeal, setSelectedMeal] = useState(routeMeal);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customQty, setCustomQty] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const filteredFoods = useMemo(() => {
    return searchFoods(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const openFoodModal = (food) => {
    setSelectedFood(food);
    setQuantity(1);
    setCustomQty('');
    setUseCustom(false);
    setModalVisible(true);
  };

  const handleConfirmAdd = async () => {
    if (!selectedFood) return;
    const qty = useCustom ? parseFloat(customQty) : quantity;
    if (!qty || qty <= 0 || isNaN(qty)) {
      Alert.alert('提示', '请输入有效的数量');
      return;
    }
    const calories = calculateCalories(selectedFood, qty);
    await addFoodLog(
      routeDate,
      selectedMeal,
      selectedFood.id,
      selectedFood.name,
      qty,
      calories
    );
    setModalVisible(false);
    Alert.alert(
      '已添加',
      `${selectedFood.name} × ${qty} 已添加到${MEAL_NAMES[MEALS.indexOf(selectedMeal)]}，共 ${calories} 千卡`,
      [
        { text: '继续添加', onPress: () => {} },
        { text: '返回首页', onPress: () => navigation.navigate('今日') },
      ]
    );
  };

  const currentQty = useCustom ? (parseFloat(customQty) || 0) : quantity;
  const estimatedCal = selectedFood ? calculateCalories(selectedFood, currentQty) : 0;

  return (
    <View style={styles.screen}>
      {/* Meal Selector */}
      <View style={styles.mealSelector}>
        <Text style={styles.mealSelectorLabel}>添加到:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MEALS.map((meal, idx) => (
            <TouchableOpacity
              key={meal}
              style={[
                styles.mealTab,
                selectedMeal === meal && styles.mealTabActive,
              ]}
              onPress={() => setSelectedMeal(meal)}
            >
              <Text style={styles.mealTabIcon}>{MEAL_ICONS[idx]}</Text>
              <Text
                style={[
                  styles.mealTabText,
                  selectedMeal === meal && styles.mealTabTextActive,
                ]}
              >
                {MEAL_NAMES[idx]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索食物..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          placeholderTextColor="#BDBDBD"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#9E9E9E" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.catTab,
              selectedCategory === cat && styles.catTabActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.catTabText,
                selectedCategory === cat && styles.catTabTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Food Count */}
      <Text style={styles.countText}>{filteredFoods.length} 种食物</Text>

      {/* Food List */}
      <FlatList
        data={filteredFoods}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.foodItem}
            onPress={() => openFoodModal(item)}
            activeOpacity={0.7}
          >
            <View style={styles.foodItemLeft}>
              <Text style={styles.foodItemName}>{item.name}</Text>
              <Text style={styles.foodItemDetail}>{item.servingLabel}</Text>
            </View>
            <View style={styles.foodItemRight}>
              <Text style={styles.foodItemCal}>{item.kcalPerServing}</Text>
              <Text style={styles.foodItemKcal}> 千卡</Text>
            </View>
            <Ionicons name="add-circle-outline" size={22} color="#4CAF50" style={styles.foodAddIcon} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>未找到相关食物</Text>
            <Text style={styles.emptyHint}>尝试搜索其他关键词</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Food Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            {selectedFood && (
              <>
                <Text style={styles.modalTitle}>{selectedFood.name}</Text>
                <Text style={styles.modalSubtitle}>
                  每份 {selectedFood.kcalPerServing} 千卡 · {selectedFood.servingLabel}
                </Text>

                {/* Meal selector in modal */}
                <View style={styles.modalMealRow}>
                  <Text style={styles.modalLabel}>餐次</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {MEALS.map((meal, idx) => (
                      <TouchableOpacity
                        key={meal}
                        style={[
                          styles.modalMealTab,
                          selectedMeal === meal && styles.modalMealTabActive,
                        ]}
                        onPress={() => setSelectedMeal(meal)}
                      >
                        <Text
                          style={[
                            styles.modalMealTabText,
                            selectedMeal === meal && styles.modalMealTabTextActive,
                          ]}
                        >
                          {MEAL_ICONS[idx]} {MEAL_NAMES[idx]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Quantity Presets */}
                <View style={styles.modalQtySection}>
                  <Text style={styles.modalLabel}>份量</Text>
                  <View style={styles.qtyPresets}>
                    {QUANTITY_PRESETS.map(q => (
                      <TouchableOpacity
                        key={q}
                        style={[
                          styles.qtyBtn,
                          !useCustom && quantity === q && styles.qtyBtnActive,
                        ]}
                        onPress={() => {
                          setQuantity(q);
                          setUseCustom(false);
                          setCustomQty('');
                        }}
                      >
                        <Text
                          style={[
                            styles.qtyBtnText,
                            !useCustom && quantity === q && styles.qtyBtnTextActive,
                          ]}
                        >
                          {q}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={[styles.qtyBtn, useCustom && styles.qtyBtnActive]}
                      onPress={() => setUseCustom(true)}
                    >
                      <Text style={[styles.qtyBtnText, useCustom && styles.qtyBtnTextActive]}>
                        自定义
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {useCustom && (
                    <View style={styles.customQtyRow}>
                      <TextInput
                        style={styles.customQtyInput}
                        keyboardType="decimal-pad"
                        placeholder="输入份量 (如 1.5)"
                        value={customQty}
                        onChangeText={setCustomQty}
                        autoFocus
                        placeholderTextColor="#BDBDBD"
                      />
                      <Text style={styles.customQtyUnit}>份</Text>
                    </View>
                  )}
                </View>

                {/* Estimated Calories */}
                <View style={styles.estimateRow}>
                  <Text style={styles.estimateLabel}>预计摄入</Text>
                  <Text style={styles.estimateValue}>{estimatedCal} 千卡</Text>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmAdd}>
                  <Text style={styles.confirmBtnText}>添加到{MEAL_NAMES[MEALS.indexOf(selectedMeal)]}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mealSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  mealSelectorLabel: {
    fontSize: 13,
    color: '#757575',
    marginRight: 8,
  },
  mealTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  mealTabActive: {
    backgroundColor: '#E8F5E9',
  },
  mealTabIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  mealTabText: {
    fontSize: 13,
    color: '#757575',
  },
  mealTabTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 12,
    marginBottom: 4,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
    paddingVertical: 0,
  },
  categoryScroll: {
    maxHeight: 44,
    marginHorizontal: 12,
  },
  categoryContent: {
    paddingVertical: 4,
  },
  catTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  catTabActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  catTabText: {
    fontSize: 13,
    color: '#616161',
  },
  catTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  countText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  foodItemLeft: {
    flex: 1,
  },
  foodItemName: {
    fontSize: 15,
    color: '#212121',
    fontWeight: '500',
  },
  foodItemDetail: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  foodItemRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 12,
  },
  foodItemCal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF7043',
  },
  foodItemKcal: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  foodAddIcon: {
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 16,
  },
  emptyList: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  emptyHint: {
    fontSize: 13,
    color: '#BDBDBD',
    marginTop: 4,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
    marginBottom: 16,
  },
  modalMealRow: {
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 8,
    fontWeight: '600',
  },
  modalMealTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  modalMealTabActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  modalMealTabText: {
    fontSize: 13,
    color: '#757575',
  },
  modalMealTabTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  modalQtySection: {
    marginBottom: 16,
  },
  qtyPresets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  qtyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  qtyBtnActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  qtyBtnText: {
    fontSize: 14,
    color: '#616161',
  },
  qtyBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  customQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  customQtyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#212121',
  },
  customQtyUnit: {
    fontSize: 14,
    color: '#757575',
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  estimateLabel: {
    fontSize: 14,
    color: '#757575',
  },
  estimateValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF7043',
  },
  confirmBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
