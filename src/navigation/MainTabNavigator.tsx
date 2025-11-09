/**
 * Main Tab Navigator
 * 4-Screen Architecture: Dashboard, Goals, Expenses, Settings
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../types';
import {
  DashboardScreen,
  GoalsScreen,
  ExpensesScreen,
  SettingsScreen,
} from '../screens';
import {colors} from '../theme';
import {useColorScheme} from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark
          ? colors.text.secondary.dark
          : colors.text.secondary.light,
        tabBarStyle: {
          backgroundColor: isDark
            ? colors.surface.dark
            : colors.surface.light,
          borderTopColor: isDark ? '#333' : '#E0E0E0',
        },
        headerStyle: {
          backgroundColor: isDark
            ? colors.surface.dark
            : colors.surface.light,
          borderBottomColor: isDark ? '#333' : '#E0E0E0',
        },
        headerTintColor: isDark
          ? colors.text.primary.dark
          : colors.text.primary.light,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          tabBarLabel: 'Goals',
          headerTitle: 'Goals & Challenges',
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarLabel: 'Expenses',
          headerTitle: 'Expenses & Budgets',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings & Profile',
        }}
      />
    </Tab.Navigator>
  );
};
