/**
 * MilestoneBanner Component
 * Sticky celebration banner at top of Goals tab showing total achievements
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {getColor, emeraldShadow} from '../theme/colorsLibrary';
import {TrophyIcon, StarIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';

interface MilestoneBannerProps {
  totalGoalsCompleted: number;
  totalAmountSaved: number;
  onPress?: () => void;
}

export const MilestoneBanner: React.FC<MilestoneBannerProps> = ({
  totalGoalsCompleted,
  totalAmountSaved,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const gradientColors = isDark
    ? ['#04514A', '#0E7A72'] // Dark mode: darker to lighter Emerald Shadow
    : ['#0E7A72', '#10A899']; // Light mode: Emerald Shadow to lighter variant

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.banner}>
        <View style={styles.content}>
          {/* Trophy Icon */}
          <View style={styles.iconContainer}>
            <StarIcon size={24} color="#FFFFFF" />
          </View>

          {/* Stats */}
          <View style={styles.stats}>
            <Text style={styles.statsText}>
              <Text style={styles.statsBold}>{totalGoalsCompleted}</Text> Goals Completed
              {' • '}
              <Text style={styles.statsBold}>{formatCurrency(totalAmountSaved)}</Text> Saved
            </Text>
          </View>

          {/* Chevron or indicator if tappable */}
          {onPress && (
            <Text style={styles.chevron}>›</Text>
          )}
        </View>
      </LinearGradient>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  banner: {
    borderRadius: spacing.radius.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md + 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stats: {
    flex: 1,
  },
  statsText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.callout,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular,
  },
  statsBold: {
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
  },
  chevron: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: typography.fontFamily.regular,
    opacity: 0.7,
  },
});
