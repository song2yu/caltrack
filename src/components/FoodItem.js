import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FoodItem = ({ food, onPress, onDelete, showDelete = false }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>{food.food_name || food.name}</Text>
        <Text style={styles.detail}>
          {food.quantity ? `x${food.quantity} · ` : ''}{food.servingLabel || ''}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.calories}>
          {Math.round(food.calories || food.kcalPerServing)} <Text style={styles.kcal}>千卡</Text>
        </Text>
        {showDelete && onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(food.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.deleteBtn}
          >
            <Ionicons name="trash-outline" size={16} color="#F44336" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  left: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    color: '#212121',
    fontWeight: '500',
  },
  detail: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF7043',
  },
  kcal: {
    fontSize: 11,
    color: '#9E9E9E',
    fontWeight: '400',
  },
  deleteBtn: {
    marginLeft: 12,
    padding: 4,
  },
});

export default FoodItem;
