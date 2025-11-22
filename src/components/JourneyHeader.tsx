/**
 * JourneyHeader Component
 * Bottom entry point for Goals journey with motivational prompt
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {GradientCard} from './GradientCard';

interface JourneyHeaderProps {
  message?: string;
  subtitle?: string;
}

export const JourneyHeader: React.FC<JourneyHeaderProps> = ({
  message = 'Continue Your Epic Journey!',
  subtitle = "What's your next big financial adventure?",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBaseColors = {
    light: colors.background.light,
    dark: colors.background.dark,
  };

  return (
    <View style={styles.container}>
      {/* Castle/Fortress Icon Node */}
      <View style={styles.iconNode}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🏰</Text>
        </View>
      </View>

      {/* Message Card */}
      <GradientCard
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.card}>
        <View style={styles.content}>
          <Text
            style={[
              styles.message,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            {message}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            {subtitle}
          </Text>
        </View>
      </GradientCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconNode: {
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconText: {
    fontSize: 40,
    fontFamily: typography.fontFamily.regular,
  },
  card: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
  },
  message: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
});
