/**
 * Onboarding Emergency Fund Screen
 * Set up starter emergency fund
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, spacing, typography} from '../theme';
import {Button, Card, Input} from '../components';
import {OnboardingStackParamList} from '../types';
import {EMERGENCY_FUND_TARGET} from '../constants';
import {formatCurrency} from '../utils';

type OnboardingEmergencyFundNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'OnboardingEmergencyFund'
>;

export const OnboardingEmergencyFundScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingEmergencyFundNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [currentSavings, setCurrentSavings] = useState('');

  const handleContinue = () => {
    navigation.navigate('OnboardingComplete');
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
          Emergency Fund
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
          Before attacking debt, build a starter emergency fund of{' '}
          {formatCurrency(EMERGENCY_FUND_TARGET)}
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
            Why {formatCurrency(EMERGENCY_FUND_TARGET)}?
          </Text>
          <Text
            style={[
              styles.cardText,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            This starter fund prevents you from going deeper into debt when
            life's little emergencies pop up. Once you're debt-free, you'll
            build a full 3-6 month emergency fund!
          </Text>
        </Card>

        <Input
          label="Current Savings"
          placeholder="0.00"
          value={currentSavings}
          onChangeText={setCurrentSavings}
          keyboardType="decimal-pad"
          prefix="$"
        />

        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
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
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  button: {
    marginTop: spacing.md,
  },
});
