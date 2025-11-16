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
import OnboardingDebtFlowScreen from '../screens/onboarding/OnboardingDebtFlowScreen';
import OnboardingInsightScreen from '../screens/onboarding/OnboardingInsightScreen';
import OnboardingPaywallScreen from '../screens/onboarding/OnboardingPaywallScreen';
import OnboardingAccountScreen from '../screens/onboarding/OnboardingAccountScreen';
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
            onDevSkip={() => navigation.navigate('Account')}
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
            onContinue={() => navigation.navigate('FinancialIdentity')}
          />
        )}
      </Stack.Screen>

      {/* Additional Question Screens */}
      <Stack.Screen
        name="FinancialIdentity"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[4]}
            onContinue={() => navigation.navigate('SpendingBehavior')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="SpendingBehavior"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[5]}
            onContinue={() => navigation.navigate('ExpenseAwareness')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="ExpenseAwareness"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[6]}
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
            onContinue={() => navigation.navigate('IncomeStability')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="IncomeStability"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[7]}
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
            onContinue={() => navigation.navigate('DebtFlow')}
          />
        )}
      </Stack.Screen>

      {/* Debt Entry Flow (Screens 17-26) */}
      <Stack.Screen
        name="DebtFlow"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingDebtFlowScreen
            onContinue={() => navigation.navigate('DebtBurden')}
          />
        )}
      </Stack.Screen>

      {/* Assessment Phase (Screens 27-30) */}
      <Stack.Screen
        name="DebtBurden"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[8]}
            onContinue={() => navigation.navigate('EmotionalImpact')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="EmotionalImpact"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[9]}
            onContinue={() => navigation.navigate('FinancialHabits')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="FinancialHabits"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[10]}
            onContinue={() => navigation.navigate('EmergencyFundPriority')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="EmergencyFundPriority"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[11]}
            onContinue={() => navigation.navigate('EmergencyFundGoal')}
          />
        )}
      </Stack.Screen>

      {/* Emergency Fund Goal Form (Screen 31) */}
      <Stack.Screen
        name="EmergencyFundGoal"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingFormScreen
            config={formScreens[6]}
            onContinue={() => navigation.navigate('AIPersona')}
          />
        )}
      </Stack.Screen>

      {/* Personalization Phase (Screens 32-34) */}
      <Stack.Screen
        name="AIPersona"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[12]}
            onContinue={() => navigation.navigate('PlanIntensity')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="PlanIntensity"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[13]}
            onContinue={() => navigation.navigate('BehaviorChallenges')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="BehaviorChallenges"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingQuestionScreen
            config={questionScreens[14]}
            onContinue={() => navigation.navigate('SnowballInsights')}
          />
        )}
      </Stack.Screen>

      {/* Results & Insights (Screens 35-36) */}
      <Stack.Screen
        name="SnowballInsights"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingInsightScreen
            onContinue={() => navigation.navigate('Paywall')}
          />
        )}
      </Stack.Screen>

      {/* Paywall (Screens 37-38) */}
      <Stack.Screen
        name="Paywall"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingPaywallScreen
            onContinue={() => navigation.navigate('Account')}
            onSkipTrial={() => navigation.navigate('Account')}
          />
        )}
      </Stack.Screen>

      {/* Account Creation (Screens 39-40) */}
      <Stack.Screen
        name="Account"
        options={{headerShown: false}}>
        {({navigation}) => (
          <OnboardingAccountScreen
            onContinue={() => navigation.navigate('OnboardingComplete')}
            onSkip={() => navigation.navigate('OnboardingComplete')}
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
