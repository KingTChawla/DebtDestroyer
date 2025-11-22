/**
 * QuestGoalCard Component
 * Goal card with three visual states: future, active, achieved
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {Goal} from '../types';
import {colors, spacing, typography} from '../theme';
import {getColor, emeraldShadow, sapphireNight} from '../theme/colorsLibrary';
import {GradientCard} from './GradientCard';

interface QuestGoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export const QuestGoalCard: React.FC<QuestGoalCardProps> = ({
  goal,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBaseColors = {
    light: colors.background.light,
    dark: colors.background.dark,
  };

  const getStateColors = () => {
    switch (goal.state) {
      case 'achieved':
        return {
          border: getColor(emeraldShadow, isDark),
          label: getColor(emeraldShadow, isDark),
          labelBg: getColor(emeraldShadow, isDark) + '15',
        };
      case 'active':
        return {
          border: getColor(sapphireNight, isDark),
          label: getColor(sapphireNight, isDark),
          labelBg: getColor(sapphireNight, isDark) + '15',
        };
      case 'future':
      default:
        return {
          border: isDark ? '#444444' : '#DDDDDD',
          label: isDark ? '#999999' : '#666666',
          labelBg: isDark ? '#333333' : '#F5F5F5',
        };
    }
  };

  const getStateLabel = () => {
    switch (goal.state) {
      case 'achieved':
        return 'Achieved!';
      case 'active':
        return 'Active Quest';
      case 'future':
      default:
        return 'Future Quest';
    }
  };

  const getIconComponent = (icon: string) => {
    const iconMap: {[key: string]: string} = {
      'flag': '🚩',
      'home': '🏠',
      'shield-check': '🛡️',
      'car': '🚗',
    };
    return iconMap[icon] || '⭐';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stateColors = getStateColors();
  const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={styles.container}>
      <View
        style={[
          styles.borderWrapper,
          {
            borderColor: stateColors.border,
            borderWidth: goal.state === 'future' ? 1 : 3,
          },
        ]}>
        <GradientCard
          baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
          useGradient={false}
          style={styles.card}>
          {/* Header: Label + Title + Icon */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View
                style={[
                  styles.labelBadge,
                  {backgroundColor: stateColors.labelBg},
                ]}>
                <Text
                  style={[
                    styles.labelText,
                    {color: stateColors.label},
                  ]}>
                  {getStateLabel()}
                </Text>
              </View>
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
            </View>

            <View
              style={[
                styles.iconCircle,
                {backgroundColor: goal.iconColor + '25'},
              ]}>
              <Text style={styles.iconText}>{getIconComponent(goal.icon)}</Text>
            </View>
          </View>

          {/* Progress: Amount + Percentage */}
          <View style={styles.progressSection}>
            <View style={styles.amountRow}>
              <Text
                style={[
                  styles.currentAmount,
                  {
                    color: isDark
                      ? colors.text.primary.dark
                      : colors.text.primary.light,
                  },
                ]}>
                {formatCurrency(goal.currentAmount)}
              </Text>
              <Text
                style={[
                  styles.targetAmount,
                  {
                    color: isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light,
                  },
                ]}>
                / {formatCurrency(goal.targetAmount)}
              </Text>
              <Text
                style={[
                  styles.percentage,
                  {
                    color: isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light,
                  },
                ]}>
                {percentage}%
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${percentage}%`,
                    backgroundColor: stateColors.border,
                  },
                ]}
              />
            </View>
          </View>

          {/* Metadata */}
          {goal.state === 'future' && goal.description && (
            <Text
              style={[
                styles.metadataText,
                {
                  color: isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
              ]}>
              Goal: {goal.description}
            </Text>
          )}

          {goal.state === 'active' && (
            <>
              {goal.timeLeftMonths && (
                <Text
                  style={[
                    styles.metadataText,
                    {
                      color: isDark
                        ? colors.text.secondary.dark
                        : colors.text.secondary.light,
                    },
                  ]}>
                  Time left: {goal.timeLeftMonths} month{goal.timeLeftMonths !== 1 ? 's' : ''}
                </Text>
              )}
              {goal.nextBadge && (
                <View style={styles.badgeRow}>
                  <Text
                    style={[
                      styles.metadataText,
                      {
                        color: isDark
                          ? colors.text.secondary.dark
                          : colors.text.secondary.light,
                      },
                    ]}>
                    Next Badge:
                  </Text>
                  <View style={styles.badgeIcon}>
                    <Text style={styles.badgeIconText}>🏆</Text>
                  </View>
                </View>
              )}
            </>
          )}

          {goal.state === 'achieved' && (
            <>
              {goal.completedDate && (
                <Text
                  style={[
                    styles.metadataText,
                    {
                      color: isDark
                        ? colors.text.secondary.dark
                        : colors.text.secondary.light,
                    },
                  ]}>
                  Completed: {new Date(goal.completedDate).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
                </Text>
              )}
              {goal.achievementBadge && (
                <View style={styles.badgeRow}>
                  <Text
                    style={[
                      styles.metadataText,
                      {
                        color: isDark
                          ? colors.text.secondary.dark
                          : colors.text.secondary.light,
                      },
                    ]}>
                    Achievement Earned:
                  </Text>
                  <View style={styles.achievementBadge}>
                    <Text style={styles.achievementIconText}>⭐</Text>
                  </View>
                </View>
              )}
            </>
          )}
        </GradientCard>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  borderWrapper: {
    borderRadius: spacing.radius.md + 2,
    overflow: 'hidden',
  },
  card: {
    // GradientCard handles padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  labelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: spacing.radius.sm,
    marginBottom: spacing.xs,
  },
  labelText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  iconText: {
    fontSize: 24,
    fontFamily: typography.fontFamily.regular,
  },
  progressSection: {
    marginBottom: spacing.sm,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  currentAmount: {
    fontSize: typography.fontSize.title3,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
  },
  targetAmount: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginLeft: spacing.xs / 2,
  },
  percentage: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginLeft: 'auto',
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  metadataText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.xs / 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  badgeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.regular,
  },
  achievementBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconText: {
    fontSize: 16,
  },
});
