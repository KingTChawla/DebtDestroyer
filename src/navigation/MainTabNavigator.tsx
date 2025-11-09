/**
 * Main Tab Navigator
 * 3-Screen Architecture: Dashboard, Expenses, Goals (Settings in header)
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {MainTabParamList} from '../types';
import {
  DashboardScreen,
  GoalsScreen,
  ExpensesScreen,
} from '../screens';
import {colors, typography} from '../theme';
import {useColorScheme} from 'react-native';
import {
  HomeModernIcon,
  TrophyIcon,
  BanknotesIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import {
  HomeModernIcon as HomeModernIconOutline,
  TrophyIcon as TrophyIconOutline,
  BanknotesIcon as BanknotesIconOutline,
} from 'react-native-heroicons/outline';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Settings button component for header
  const SettingsButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings' as never)}
        style={{marginRight: 16}}>
        <UserIcon size={24} color={isDark ? colors.text.primary.dark : colors.text.primary.light} />
      </TouchableOpacity>
    );
  };

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
          paddingHorizontal: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily.medium,
          fontSize: typography.fontSize.caption2,
          fontWeight: typography.fontWeight.medium,
          letterSpacing: typography.letterSpacing.looser,
        },
        headerStyle: {
          backgroundColor: isDark
            ? colors.surface.dark
            : colors.surface.light,
          borderBottomColor: isDark ? '#333' : '#E0E0E0',
        },
        headerTitleStyle: {
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.fontSize.headline,
          fontWeight: typography.fontWeight.bold,
          letterSpacing: 0,
        },
        headerTintColor: isDark
          ? colors.text.primary.dark
          : colors.text.primary.light,
        headerRight: () => <SettingsButton />,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          headerTitle: 'Dashboard',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <HomeModernIcon size={24} color={color} />
            ) : (
              <HomeModernIconOutline size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarLabel: 'Expenses',
          headerTitle: 'Expenses & Budgets',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <BanknotesIcon size={24} color={color} />
            ) : (
              <BanknotesIconOutline size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          tabBarLabel: 'Goals',
          headerTitle: 'Goals & Challenges',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <TrophyIcon size={24} color={color} />
            ) : (
              <TrophyIconOutline size={24} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
