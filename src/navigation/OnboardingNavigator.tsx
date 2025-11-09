/**
 * Onboarding Navigator
 * Stack navigator for onboarding flow
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../types';
import {
  OnboardingIntroScreen,
  OnboardingDebtsScreen,
  OnboardingIncomeScreen,
  OnboardingEmergencyFundScreen,
  OnboardingCompleteScreen,
} from '../screens';
import {colors, typography} from '../theme';
import {useColorScheme} from 'react-native';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark
            ? colors.surface.dark
            : colors.surface.light,
        },
        headerTintColor: isDark
          ? colors.text.primary.dark
          : colors.text.primary.light,
        headerTitleStyle: {
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.fontSize.headline,
          fontWeight: typography.fontWeight.bold,
          letterSpacing: 0,
        },
      }}>
      <Stack.Screen
        name="OnboardingIntro"
        component={OnboardingIntroScreen}
        options={{
          title: 'Get Started',
        }}
      />
      <Stack.Screen
        name="OnboardingDebts"
        component={OnboardingDebtsScreen}
        options={{
          title: 'Add Debts',
        }}
      />
      <Stack.Screen
        name="OnboardingIncome"
        component={OnboardingIncomeScreen}
        options={{
          title: 'Income & Expenses',
        }}
      />
      <Stack.Screen
        name="OnboardingEmergencyFund"
        component={OnboardingEmergencyFundScreen}
        options={{
          title: 'Emergency Fund',
        }}
      />
      <Stack.Screen
        name="OnboardingComplete"
        component={OnboardingCompleteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
