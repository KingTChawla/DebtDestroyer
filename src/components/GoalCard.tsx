/**
 * GoalCard Component
 * Display goal information with progress
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {Goal} from '../types';
import {colors, spacing, typography, shadows} from '../theme';
import {formatCurrency, formatDate} from '../utils';
import {ProgressBar} from './ProgressBar';

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({goal, onPress}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getGoalIcon = (type: string): string => {
    const icons: {[key: string]: string} = {
      emergency_fund: '🛡️',
      debt_payoff: '💪',
      savings: '💰',
      custom: '🎯',
    };
    return icons[type] || '🎯';
  };

  const getStatusColor = (status: string): string => {
    if (status === 'completed') return colors.success;
    if (status === 'abandoned') return colors.text.secondary.light;
    return colors.primary;
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
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{getGoalIcon(goal.type)}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text
            style={[
              styles.title,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            {goal.title}
          </Text>
          {goal.description && (
            <Text
              style={[
                styles.description,
                {
                  color: isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
              ]}>
              {goal.description}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.progressSection}>
        <ProgressBar
          current={goal.currentAmount}
          target={goal.targetAmount}
          showLabel
          label={`${formatCurrency(goal.currentAmount)} of ${formatCurrency(goal.targetAmount)}`}
          color={getStatusColor(goal.status)}
        />
      </View>

      <View style={styles.footer}>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(goal.status)},
          ]}>
          <Text style={styles.statusText}>
            {goal.status.toUpperCase()}
          </Text>
        </View>
        {goal.deadline && (
          <Text
            style={[
              styles.deadline,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            Due: {formatDate(goal.deadline, 'short')}
          </Text>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    ...shadows.sm,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: spacing.radius.md,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs / 2,
  },
  description: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  progressSection: {
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: spacing.radius.sm,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  deadline: {
    fontSize: typography.fontSize.sm,
  },
});
