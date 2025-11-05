/**
 * Main Tab Navigator
 * Bottom tab navigation for main app sections
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../types';
import {
  DashboardScreen,
  DebtsScreen,
  PlanScreen,
  DailyScreen,
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
        name="Debts"
        component={DebtsScreen}
        options={{
          tabBarLabel: 'Debts',
          headerTitle: 'My Debts',
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{
          tabBarLabel: 'Plan',
          headerTitle: 'Snowball Plan',
        }}
      />
      <Tab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          tabBarLabel: 'Daily',
          headerTitle: 'Daily Check-In',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
