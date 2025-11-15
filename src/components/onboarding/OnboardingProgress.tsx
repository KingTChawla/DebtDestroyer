/**
 * OnboardingProgress Component
 * Progress indicator for onboarding flow
 * Shows current step, total steps, and progress bar
 */

import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';

// ============================================================================
// Types
// ============================================================================

export interface OnboardingProgressProps {
  current: number;
  total: number;
  sectionLabel?: string;
  showPercentage?: boolean;
  compact?: boolean; // Smaller version for limited space
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  current,
  total,
  sectionLabel,
  showPercentage = false,
  compact = false,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark, compact);

  const percentage = Math.round((current / total) * 100);

  return (
    <View style={styles.container}>
      {/* Text Indicator */}
      <View style={styles.textContainer}>
        <Text style={styles.stepText}>
          Step {current} of {total}
        </Text>

        {sectionLabel && <Text style={styles.sectionLabel}>{sectionLabel}</Text>}

        {showPercentage && (
          <Text style={styles.percentageText}>{percentage}%</Text>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            {width: `${percentage}%`},
          ]}
        />
      </View>
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean, compact: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: compact ? spacing.sm : spacing.md,
    } as ViewStyle,

    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    } as ViewStyle,

    stepText: {
      ...(compact ? typography.styles.caption1 : typography.styles.footnote),
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
    } as TextStyle,

    sectionLabel: {
      ...(compact ? typography.styles.caption1 : typography.styles.footnote),
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontFamily: typography.fontFamily.medium,
      flex: 1,
      textAlign: 'center',
    } as TextStyle,

    percentageText: {
      ...(compact ? typography.styles.caption1 : typography.styles.footnote),
      color: colors.primary,
      fontFamily: typography.fontFamily.bold,
    } as TextStyle,

    progressBarContainer: {
      height: compact ? 4 : 6,
      backgroundColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: spacing.radius.full,
      overflow: 'hidden',
    } as ViewStyle,

    progressBarFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: spacing.radius.full,
    } as ViewStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingProgress;
