import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AddFoodScreen from './src/screens/AddFoodScreen';
import ExerciseScreen from './src/screens/ExerciseScreen';
import WeightScreen from './src/screens/WeightScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { initDatabase } from './src/database/db';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    initDatabase().then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#4CAF50" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === '今日') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === '添加食物') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === '运动') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === '体重') {
                iconName = focused ? 'scale' : 'scale-outline';
              } else if (route.name === '设置') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: '#9E9E9E',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E0E0E0',
              paddingBottom: 4,
              paddingTop: 4,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
            },
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        >
          <Tab.Screen
            name="今日"
            component={HomeScreen}
            options={{ title: '今日' }}
          />
          <Tab.Screen
            name="添加食物"
            component={AddFoodScreen}
            options={{ title: '添加食物' }}
          />
          <Tab.Screen
            name="运动"
            component={ExerciseScreen}
            options={{ title: '运动记录' }}
          />
          <Tab.Screen
            name="体重"
            component={WeightScreen}
            options={{ title: '体重管理' }}
          />
          <Tab.Screen
            name="设置"
            component={SettingsScreen}
            options={{ title: '设置' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
