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
import OnboardingWelcomeScreen from '../screens/onboarding/OnboardingWelcomeScreen';
import OnboardingQuestionScreen from '../screens/onboarding/OnboardingQuestionScreen';
import OnboardingFormScreen from '../screens/onboarding/OnboardingFormScreen';
import {colors, typography} from '../theme';
import {useColorScheme} from 'react-native';
import {welcomeScreens, questionScreens, formScreens} from '../config/onboardingScreens';
import {useOnboardingStore} from '../stores/onboardingStore';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const nextStep = useOnboardingStore(state => state.nextStep);

  const handleWelcomeNavigation = (navigation: any) => {
    nextStep();
    // Navigate to first question screen
    navigation.navigate('PrimaryGoal');
  };

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
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
      {/* New Welcome Screens */}
      <Stack.Screen
        name="Welcome"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingWelcomeScreen
            config={welcomeScreens[0]}
            onContinue={() => navigation.navigate('Motivation')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Motivation"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingWelcomeScreen
            config={welcomeScreens[1]}
            onContinue={() => handleWelcomeNavigation(navigation)}
          />
        )}
      </Stack.Screen>

      {/* Question Screens */}
      <Stack.Screen
        name="PrimaryGoal"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[0]}
            onContinue={() => navigation.navigate('ExperienceLevel')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="ExperienceLevel"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[1]}
            onContinue={() => navigation.navigate('TrackingFrequency')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="TrackingFrequency"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[2]}
            onContinue={() => navigation.navigate('DebtConfidence')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="DebtConfidence"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[3]}
            onContinue={() => navigation.navigate('BasicProfile')}
          />
        )}
      </Stack.Screen>

      {/* Form Screens */}
      <Stack.Screen
        name="BasicProfile"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[0]}
            onContinue={() => navigation.navigate('MonthlyIncome')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="MonthlyIncome"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[1]}
            onContinue={() => navigation.navigate('EssentialExpenses')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="EssentialExpenses"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[2]}
            onContinue={() => navigation.navigate('LifestyleExpenses')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="LifestyleExpenses"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[3]}
            onContinue={() => navigation.navigate('SavingsReserves')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="SavingsReserves"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[4]}
            onContinue={() => navigation.navigate('SubscriptionDiscovery')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="SubscriptionDiscovery"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[5]}
            onContinue={() => navigation.navigate('OnboardingComplete')}
          />
        )}
      </Stack.Screen>

      {/* Existing Onboarding Screens (will be phased out) */}
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
