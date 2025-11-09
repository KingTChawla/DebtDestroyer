/**
 * Badge Component
 * Display achievement badges and status indicators
 */

import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors, spacing, typography, shadows} from '../theme';

type BadgeVariant = 'locked' | 'unlocked' | 'status';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  icon: string;
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  unlocked?: boolean;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  icon,
  label,
  variant = 'status',
  size = 'medium',
  unlocked = true,
  style,
}) => {
  const isLocked = variant === 'locked' || !unlocked;

  const sizeConfig = {
    small: {iconSize: 24, containerSize: 48},
    medium: {iconSize: 32, containerSize: 64},
    large: {iconSize: 48, containerSize: 96},
  };

  const config = sizeConfig[size];

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          {
            width: config.containerSize,
            height: config.containerSize,
          },
          isLocked && styles.locked,
          !isLocked && shadows.md,
        ]}>
        <Text style={[styles.icon, {fontSize: config.iconSize}]}>
          {isLocked ? '🔒' : icon}
        </Text>
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            isLocked && styles.lockedText,
          ]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconContainer: {
    borderRadius: spacing.radius.full,
    backgroundColor: colors.surface.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  locked: {
    backgroundColor: '#F5F5F5',
    borderColor: '#BDBDBD',
    opacity: 0.5,
  },
  icon: {
    textAlign: 'center',
    fontFamily: typography.fontFamily.regular,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary.light,
    textAlign: 'center',
  },
  lockedText: {
    color: colors.text.secondary.light,
  },
});
