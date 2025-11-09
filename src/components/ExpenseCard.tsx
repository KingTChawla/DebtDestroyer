/**
 * ExpenseCard Component
 * Display expense information
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {Expense} from '../types';
import {colors, spacing, typography, shadows} from '../theme';
import {formatCurrency, formatDate} from '../utils';
import {getCategoryIcon} from '../services/mockData';

interface ExpenseCardProps {
  expense: Expense;
  onPress?: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({expense, onPress}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getInputMethodBadge = (method: string): string => {
    const badges: {[key: string]: string} = {
      voice: '🎤',
      text: '💬',
      manual: '✏️',
    };
    return badges[method] || '✏️';
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
        },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.categoryIcon}>
            {getCategoryIcon(expense.category)}
          </Text>
        </View>

        <View style={styles.details}>
          <Text
            style={[
              styles.description,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            {expense.description}
          </Text>
          <View style={styles.meta}>
            <Text
              style={[
                styles.category,
                {
                  color: isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
              ]}>
              {expense.category.replace('_', ' ').toUpperCase()}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color: isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
              ]}>
              {formatDate(expense.date, 'short')}
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={[styles.amount, {color: colors.error}]}>
            -{formatCurrency(expense.amount)}
          </Text>
          <Text style={styles.methodBadge}>
            {getInputMethodBadge(expense.inputMethod)}
          </Text>
        </View>
      </View>

      {expense.recurring && (
        <View style={styles.recurringBadge}>
          <Text style={styles.recurringText}>🔄 Recurring</Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radius.md,
    padding: spacing.md,
    ...shadows.sm,
    marginBottom: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: spacing.radius.md,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  categoryIcon: {
    fontSize: 20,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs / 2,
  },
  meta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  category: {
    fontSize: typography.fontSize.xs,
    letterSpacing: 0.5,
  },
  date: {
    fontSize: typography.fontSize.xs,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs / 2,
  },
  methodBadge: {
    fontSize: 14,
  },
  recurringBadge: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  recurringText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
});
