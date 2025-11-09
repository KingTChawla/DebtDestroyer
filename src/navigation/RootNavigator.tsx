/**
 * Root Navigator
 * Main stack navigator for the app
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {WelcomeScreen, SettingsScreen} from '../screens';
import {MainTabNavigator} from './MainTabNavigator';
import {OnboardingNavigator} from './OnboardingNavigator';
import {colors, typography} from '../theme';
import {useColorScheme} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: isDark
              ? colors.surface.dark
              : colors.surface.light,
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
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: 'Settings & Profile',
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
