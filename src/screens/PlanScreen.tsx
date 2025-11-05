/**
 * Plan Screen
 * Snowball plan visualization and payoff schedule
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {colors, spacing, typography} from '../theme';

export const PlanScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      <Text
        style={[
          styles.title,
          {
            color: isDark
              ? colors.text.primary.dark
              : colors.text.primary.light,
          },
        ]}>
        Snowball Plan
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
        Your debt payoff roadmap
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.screenPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    textAlign: 'center',
  },
});
