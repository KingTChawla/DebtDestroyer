/**
 * DailyChallengeCard Component
 * Compact challenge card for 2x2 grid display
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Challenge} from '../types';
import {colors, spacing, typography} from '../theme';
import {GradientCard} from './GradientCard';
import {useTheme} from '../contexts';

interface DailyChallengeCardProps {
  challenge: Challenge;
  onPress?: () => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
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
    // Map icon names to emoji or components
    const iconMap: {[key: string]: string} = {
      'piggy-bank': '🐷',
      'fast-food': '🍔',
      'receipt': '📝',
      'shopping-cart': '🛒',
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
          <View
            style={[
              styles.iconCircle,
              {backgroundColor: challenge.iconColor + '25'},
            ]}>
            <Text style={styles.iconText}>{getIconComponent(challenge.icon)}</Text>
          </View>

          <Text style={styles.title}>
            {challenge.title}
          </Text>

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

          {/* Status Text */}
          <Text style={styles.statusText}>
            {challenge.isCompleted
              ? 'Completed!'
              : `${challenge.progress}% Complete`}
          </Text>
        </View>
      </GradientCard>
    </Container>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // GradientCard handles padding and background
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconText: {
    fontSize: 32,
    fontFamily: typography.fontFamily.regular,
  },
  title: {
    fontSize: typography.fontSize.headline,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
  },
  progressContainer: {
    width: '100%',
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
    textAlign: 'center',
    color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
  },
});
