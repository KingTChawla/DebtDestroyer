/**
 * Onboarding Income Screen
 * Set monthly income and budget
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, spacing, typography} from '../theme';
import {Button, Card, Input} from '../components';
import {OnboardingStackParamList} from '../types';

type OnboardingIncomeNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'OnboardingIncome'
>;

export const OnboardingIncomeScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingIncomeNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');

  const handleContinue = () => {
    navigation.navigate('OnboardingEmergencyFund');
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
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Your Monthly Income
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
          This helps us calculate how much you can put toward debt each month
        </Text>

        <Card style={styles.form}>
          <Input
            label="Monthly Take-Home Income"
            placeholder="0.00"
            value={income}
            onChangeText={setIncome}
            keyboardType="decimal-pad"
            prefix="$"
          />

          <Input
            label="Monthly Essential Expenses"
            placeholder="0.00"
            value={expenses}
            onChangeText={setExpenses}
            keyboardType="decimal-pad"
            prefix="$"
          />
        </Card>

        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.screenPadding,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  form: {
    marginBottom: spacing.lg,
  },
});
