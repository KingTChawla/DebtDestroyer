/**
 * Onboarding Debts Screen
 * Manual debt entry during onboarding
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, spacing, typography} from '../theme';
import {Button, Card, Input} from '../components';
import {OnboardingStackParamList} from '../types';

type OnboardingDebtsNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'OnboardingDebts'
>;

export const OnboardingDebtsScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingDebtsNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [debtName, setDebtName] = useState('');
  const [balance, setBalance] = useState('');
  const [minPayment, setMinPayment] = useState('');
  const [apr, setApr] = useState('');

  const handleAddDebt = () => {
    if (!debtName || !balance || !minPayment) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // TODO: Save debt to state/storage
    Alert.alert('Debt Added', `${debtName} has been added to your list`);

    // Reset form
    setDebtName('');
    setBalance('');
    setMinPayment('');
    setApr('');
  };

  const handleContinue = () => {
    navigation.navigate('OnboardingIncome');
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
          Add Your Debts
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
          List all your debts - credit cards, loans, medical bills, etc.
        </Text>

        <Card style={styles.form}>
          <Input
            label="Debt Name *"
            placeholder="e.g., Visa Credit Card"
            value={debtName}
            onChangeText={setDebtName}
          />

          <Input
            label="Current Balance *"
            placeholder="0.00"
            value={balance}
            onChangeText={setBalance}
            keyboardType="decimal-pad"
            prefix="$"
          />

          <Input
            label="Minimum Payment *"
            placeholder="0.00"
            value={minPayment}
            onChangeText={setMinPayment}
            keyboardType="decimal-pad"
            prefix="$"
          />

          <Input
            label="APR (Interest Rate)"
            placeholder="0.0"
            value={apr}
            onChangeText={setApr}
            keyboardType="decimal-pad"
            suffix="%"
          />

          <Button
            title="Add Debt"
            onPress={handleAddDebt}
            variant="secondary"
            size="medium"
            fullWidth
          />
        </Card>

        <Card style={styles.info}>
          <Text
            style={[
              styles.infoTitle,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            Tip: Start with your smallest debt
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            The Debt Snowball method focuses on paying off your smallest debt
            first for quick wins and motivation!
          </Text>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Skip for Now"
            onPress={handleContinue}
            variant="text"
            size="medium"
            style={styles.skipButton}
          />
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  form: {
    marginBottom: spacing.lg,
  },
  info: {
    backgroundColor: colors.info + '10',
    marginBottom: spacing.lg,
  },
  infoTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  actions: {
    marginBottom: spacing.xl,
  },
  skipButton: {
    marginBottom: spacing.md,
  },
});
