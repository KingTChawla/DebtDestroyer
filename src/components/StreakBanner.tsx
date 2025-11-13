/**
 * StreakBanner Component
 * Prominent streak display for Challenges tab
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {getColor, copperEmber} from '../theme/colorsLibrary';
import {FireIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';

interface StreakBannerProps {
  currentStreak: number;
  onViewProgress?: () => void;
}

export const StreakBanner: React.FC<StreakBannerProps> = ({
  currentStreak,
  onViewProgress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const gradientColors = isDark
    ? ['#6A340F', '#9B4C14'] // Dark mode: darker to lighter Copper Ember
    : ['#9B4C14', '#C86B1A']; // Light mode: Copper Ember to lighter variant

  return (
    <LinearGradient
      colors={gradientColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.banner}>
      <View style={styles.content}>
        <View style={styles.streakInfo}>
          <FireIcon size={40} color="#FFFFFF" />
          <View style={styles.textContent}>
            <Text style={styles.label}>Your Streak:</Text>
            <Text style={styles.streakText}>
              {currentStreak} Day{currentStreak !== 1 ? 's' : ''} Strong!
            </Text>
          </View>
        </View>

        {onViewProgress && (
          <TouchableOpacity
            style={styles.button}
            onPress={onViewProgress}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>View Progress</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderRadius: spacing.radius.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md + 4,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  label: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular,
    opacity: 0.9,
    marginBottom: 2,
  },
  streakText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radius.full,
    marginLeft: spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.semibold,
  },
});
