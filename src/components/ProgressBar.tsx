/**
 * ProgressBar Component
 * Visual progress indicator with percentage
 */

import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors, spacing, typography} from '../theme';

interface ProgressBarProps {
  current: number;
  target: number;
  height?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  height = 12,
  showPercentage = true,
  showLabel = false,
  label,
  color = colors.primary,
  backgroundColor = '#E0E0E0',
  style,
}) => {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));

  return (
    <View style={[styles.container, style]}>
      {showLabel && label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.track,
            {height, backgroundColor},
          ]}>
          <View
            style={[
              styles.fill,
              {
                width: `${percentage}%`,
                backgroundColor: color,
                height,
              },
            ]}
          />
        </View>
        {showPercentage && (
          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
    color: colors.text.primary.light,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  track: {
    flex: 1,
    borderRadius: spacing.radius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: spacing.radius.full,
  },
  percentage: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary.light,
    minWidth: 40,
    textAlign: 'right',
  },
});
