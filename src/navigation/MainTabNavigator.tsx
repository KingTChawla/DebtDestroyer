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
import {useTheme} from '../contexts';
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
  const {isDark} = useTheme();

  // Settings button component for header
  const SettingsButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings' as never)}
        style={{
          marginRight: 16,
          padding: 8,
          borderRadius: 20,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(39, 94, 89, 0.1)', // White tint for dark, Forest Fade tint for light
        }}>
        <UserIcon size={24} color={isDark ? '#FFFFFF' : colors.primary} />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#FFFFFF' : colors.primary,
        tabBarInactiveTintColor: isDark
          ? colors.text.secondary.dark
          : colors.text.secondary.light,
        tabBarStyle: {
          backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6', // Match main screen backgrounds
          borderTopColor: isDark ? '#2A3B4A' : '#E5D5C1', // Complementary borders
          paddingHorizontal: 0,
          paddingBottom: 8,
          height: 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 8,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 11, // Caption 2 size
          fontWeight: '500',
          letterSpacing: 0.085, // +0.5%
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6', // Match main screen backgrounds
          borderBottomWidth: 0, // Remove border to blend better
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0, // No shadow by default
        },
        headerTitleStyle: {
          fontFamily: 'HelveticaNeue-Bold',
          fontSize: 20, // Increased from 17 to 20 (between Title 2 and Title 3)
          fontWeight: '700',
          letterSpacing: -0.1, // -0.5% for larger text
          color: isDark ? '#FFFFFF' : '#1A1A1A',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#1A1A1A',
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
