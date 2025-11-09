/**
 * ChallengeCard Component
 * Display challenge information with progress
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {UserChallenge, ChallengeStatus} from '../types';
import {colors, spacing, typography, shadows} from '../theme';
import {ProgressBar} from './ProgressBar';
import {StarIcon, CheckCircleIcon, XCircleIcon} from 'react-native-heroicons/solid';

interface ChallengeCardProps {
  userChallenge: UserChallenge;
  onPress?: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  userChallenge,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {challenge, progress, target, status} = userChallenge;

  const getStatusColor = (status: ChallengeStatus): string => {
    if (status === 'completed') return colors.success;
    if (status === 'failed') return colors.error;
    return colors.primary;
  };

  const getTypeLabel = (type: string): string => {
    const labels: {[key: string]: string} = {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
    };
    return labels[type] || type;
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
          <Text style={styles.icon}>{challenge.icon}</Text>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.name,
                {
                  color: isDark
                    ? colors.text.primary.dark
                    : colors.text.primary.light,
                },
              ]}>
              {challenge.name}
            </Text>
            <View
              style={[
                styles.typeBadge,
                {backgroundColor: getStatusColor(status) + '20'},
              ]}>
              <Text
                style={[
                  styles.typeText,
                  {color: getStatusColor(status)},
                ]}>
                {getTypeLabel(challenge.type)}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.description,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            {challenge.description}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <ProgressBar
          current={progress}
          target={target}
          showLabel
          label={`Progress: ${progress} of ${target}`}
          color={getStatusColor(status)}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.xpBadge}>
          <StarIcon size={16} color={colors.accent} />
          <Text style={styles.xpText}>+{challenge.xpReward} XP</Text>
        </View>
        {status === 'completed' && userChallenge.completedAt && (
          <View style={styles.statusContainer}>
            <CheckCircleIcon size={16} color={colors.success} />
            <Text
              style={[
                styles.completedText,
                {color: colors.success},
              ]}>
              Completed
            </Text>
          </View>
        )}
        {status === 'failed' && (
          <View style={styles.statusContainer}>
            <XCircleIcon size={16} color={colors.error} />
            <Text
              style={[
                styles.failedText,
                {color: colors.error},
              ]}>
              Failed
            </Text>
          </View>
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
    width: 56,
    height: 56,
    borderRadius: spacing.radius.md,
    backgroundColor: colors.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 28,
    fontFamily: typography.fontFamily.regular,
  },
  headerContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  name: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: spacing.radius.sm,
    marginLeft: spacing.sm,
  },
  typeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
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
  xpBadge: {
    backgroundColor: colors.accent + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  xpText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.accent,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  completedText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
  },
  failedText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
  },
});
