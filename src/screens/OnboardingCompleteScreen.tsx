/**
 * Onboarding Complete Screen
 * Congratulations and next steps
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import {colors, spacing, typography} from '../theme';
import {Button, Card} from '../components';
import {RootStackParamList} from '../types';

type OnboardingCompleteNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export const OnboardingCompleteScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingCompleteNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleGetStarted = () => {
    // Reset navigation stack and go to Main
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Main'}],
      })
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
        },
      ]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>

        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          You're All Set!
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
          Your debt-free journey starts now
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
            What's Next?
          </Text>
          <View style={styles.stepsList}>
            <NextStepItem
              emoji="📊"
              text="View your personalized Debt Snowball plan"
              isDark={isDark}
            />
            <NextStepItem
              emoji="💰"
              text="Track your daily expenses and progress"
              isDark={isDark}
            />
            <NextStepItem
              emoji="🔥"
              text="Build your streak and earn rewards"
              isDark={isDark}
            />
            <NextStepItem
              emoji="🎯"
              text="Watch your debts disappear one by one"
              isDark={isDark}
            />
          </View>
        </Card>

        <Card style={StyleSheet.flatten([styles.motivationCard, {backgroundColor: colors.success}])}>
          <Text style={styles.motivationText}>
            "Financial peace isn't the acquisition of stuff. It's learning to
            live on less than you make, so you can give money back and have
            money to invest."
          </Text>
          <Text style={styles.motivationAuthor}>— Dave Ramsey</Text>
        </Card>

        <Button
          title="Start My Journey"
          onPress={handleGetStarted}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
};

interface NextStepItemProps {
  emoji: string;
  text: string;
  isDark: boolean;
}

const NextStepItem: React.FC<NextStepItemProps> = ({emoji, text, isDark}) => (
  <View style={styles.stepItem}>
    <Text style={styles.stepEmoji}>{emoji}</Text>
    <Text
      style={[
        styles.stepText,
        {
          color: isDark
            ? colors.text.primary.dark
            : colors.text.primary.light,
        },
      ]}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.screenPadding,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
    marginBottom: spacing.xl,
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
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stepEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  stepText: {
    flex: 1,
    fontSize: typography.fontSize.base,
  },
  motivationCard: {
    marginBottom: spacing.lg,
  },
  motivationText: {
    fontSize: typography.fontSize.base,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.sm,
  },
  motivationAuthor: {
    fontSize: typography.fontSize.sm,
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'right',
  },
});
