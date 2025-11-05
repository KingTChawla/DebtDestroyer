/**
 * Card Component
 * Reusable card container for displaying content
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {colors, spacing, shadows} from '../theme';

type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'screenPadding' | 'cardPadding' | 'sectionGap' | 'itemGap';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: SpacingValue;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 'cardPadding',
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const paddingValue: number = spacing[padding] as number;

  const containerStyle: ViewStyle[] = [
    styles.base,
    {
      backgroundColor: isDark
        ? colors.surface.dark
        : colors.surface.light,
      padding: paddingValue,
    },
    ...(variant === 'outlined' ? [{
      ...styles.outlined,
      borderColor: isDark ? '#333' : '#E0E0E0',
    }] : []),
    ...(variant === 'elevated' ? [shadows.md] : []),
    ...(style ? [style] : []),
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: spacing.radius.lg,
    overflow: 'hidden',
  },
  outlined: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
