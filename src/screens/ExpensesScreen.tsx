/**
 * Expenses & Budgets Screen
 * Action Mode - Low-friction logging and budget management
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import {colors, spacing, typography} from '../theme';

export const ExpensesScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
          Expenses & Budgets
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
          Log expenses and manage your budget
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
});
