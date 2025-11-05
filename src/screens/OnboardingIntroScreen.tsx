/**
 * Onboarding Intro Screen
 * Introduction to the debt elimination journey
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, spacing, typography} from '../theme';
import {Button, Card} from '../components';
import {OnboardingStackParamList} from '../types';

type OnboardingIntroNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'OnboardingIntro'
>;

export const OnboardingIntroScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingIntroNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleNext = () => {
    navigation.navigate('OnboardingDebts');
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
        },
      ]}>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Welcome to Your Debt-Free Journey
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Let's build your personalized Debt Snowball plan in just a few minutes
        </Text>

        <Card style={styles.card}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            What We'll Do
          </Text>
          <View style={styles.stepsList}>
            <StepItem
              number="1"
              title="List Your Debts"
              description="Add all your debts (credit cards, loans, etc.)"
              isDark={isDark}
            />
            <StepItem
              number="2"
              title="Set Your Income"
              description="Tell us your monthly income"
              isDark={isDark}
            />
            <StepItem
              number="3"
              title="Emergency Fund"
              description="Set up your $1,000 starter emergency fund"
              isDark={isDark}
            />
            <StepItem
              number="4"
              title="Create Your Plan"
              description="We'll generate your personalized payoff roadmap"
              isDark={isDark}
            />
          </View>
        </Card>

        <Card style={StyleSheet.flatten([styles.card, {backgroundColor: colors.primary}])}>
          <Text style={[styles.tipTitle, {color: '#FFFFFF'}]}>
            The Debt Snowball Method
          </Text>
          <Text style={[styles.tipText, {color: '#FFFFFF'}]}>
            Pay off debts from smallest to largest, building momentum and
            motivation with each victory. It's behavior over math!
          </Text>
        </Card>

        <Button
          title="Let's Get Started"
          onPress={handleNext}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

interface StepItemProps {
  number: string;
  title: string;
  description: string;
  isDark: boolean;
}

const StepItem: React.FC<StepItemProps> = ({number, title, description, isDark}) => (
  <View style={styles.stepItem}>
    <View style={[styles.stepNumber, {backgroundColor: colors.primary}]}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text
        style={[
          styles.stepTitle,
          {
            color: isDark
              ? colors.text.primary.dark
              : colors.text.primary.light,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.stepDescription,
          {
            color: isDark
              ? colors.text.secondary.dark
              : colors.text.secondary.light,
          },
        ]}>
        {description}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    marginBottom: spacing.xl,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  stepsList: {
    gap: spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  tipTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  tipText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  button: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
