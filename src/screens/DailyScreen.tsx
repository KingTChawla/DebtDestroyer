/**
 * Daily Screen
 * Daily habit loop and check-ins
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {colors, spacing, typography} from '../theme';

export const DailyScreen: React.FC = () => {
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
        Daily Check-In
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
        Build your streak and earn rewards
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
