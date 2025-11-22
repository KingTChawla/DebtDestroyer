/**
 * ExtendedChallengeCard Component
 * Full-width challenge card with subtitle and XP reward
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Challenge} from '../types';
import {colors, spacing, typography} from '../theme';
import {GradientCard} from './GradientCard';
import {TrophyIcon} from 'react-native-heroicons/solid';
import {getColor, copperEmber} from '../theme/colorsLibrary';
import {useTheme} from '../contexts';

interface ExtendedChallengeCardProps {
  challenge: Challenge;
  onPress?: () => void;
}

export const ExtendedChallengeCard: React.FC<ExtendedChallengeCardProps> = ({
  challenge,
  onPress,
}) => {
  const {isDark} = useTheme();

  const cardBaseColors = {
    light: colors.background.light,
    dark: colors.background.dark,
  };

  const styles = getStyles(isDark);

  const getIconComponent = (icon: string) => {
    const iconMap: {[key: string]: string} = {
      'calendar': '📅',
      'trending-up': '📈',
      'ban': '🚫',
    };
    return iconMap[icon] || '⭐';
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={styles.container}>
      <GradientCard
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.card}>
        <View style={styles.content}>
          {/* Header: Icon + Title + XP */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconCircle,
                {backgroundColor: challenge.iconColor + '25'},
              ]}>
              <Text style={styles.iconText}>{getIconComponent(challenge.icon)}</Text>
            </View>

            <View style={styles.textContent}>
              <Text style={styles.title}>
                {challenge.title}
              </Text>
              {challenge.subtitle && (
                <Text style={styles.subtitle}>
                  {challenge.subtitle}
                </Text>
              )}
            </View>

            {/* XP Badge */}
            <View style={styles.xpBadge}>
              <TrophyIcon size={16} color={getColor(copperEmber, isDark)} />
              <Text style={styles.xpText}>
                +{challenge.xpReward} pts
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${challenge.progress}%`,
                    backgroundColor: challenge.iconColor,
                  },
                ]}
              />
            </View>
          </View>

          {/* Status */}
          <Text style={styles.statusText}>
            {challenge.progress}% done
          </Text>
        </View>
      </GradientCard>
    </Container>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    // GradientCard handles padding and background
  },
  content: {
    // No additional padding - handled by GradientCard
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconText: {
    fontSize: 28,
    fontFamily: typography.fontFamily.regular,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
    marginBottom: 2,
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: spacing.sm,
  },
  xpText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
    color: getColor(copperEmber, isDark),
  },
  progressContainer: {
    marginBottom: spacing.xs,
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
  statusText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
  },
});
