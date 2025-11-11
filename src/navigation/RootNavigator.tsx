/**
 * Root Navigator
 * Main stack navigator for the app
 */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {WelcomeScreen, SettingsScreen} from '../screens';
import {MainTabNavigator} from './MainTabNavigator';
import {OnboardingNavigator} from './OnboardingNavigator';
import {colors, typography} from '../theme';
import {useTheme} from '../contexts';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const {isDark} = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          // Apply consistent styling when headers are shown
          headerStyle: {
            backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6', // Match main screen backgrounds
            borderBottomWidth: 0, // Remove border to blend with background
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
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Settings & Profile',
            presentation: 'card' as const,
            headerStyle: {
              backgroundColor: isDark ? '#1A1F2E' : '#F9F3E6', // Match main screen backgrounds
              borderBottomWidth: 0, // Remove border to blend with background
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
            headerLeft: () => null,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginRight: 16,
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'HelveticaNeue-Medium',
                    fontSize: 17,
                    fontWeight: '500',
                    color: isDark ? '#FFFFFF' : colors.primary, // White for dark mode, Forest Fade for light
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
