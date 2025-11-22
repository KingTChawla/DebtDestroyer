/**
 * OnboardingWelcomeScreen
 * Handles Screens 1-2: Welcome & Motivational Mission
 * Config-driven component for introductory screens
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  Animated,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button} from '../../components';
import {useOnboardingStore} from '../../stores/onboardingStore';

// ============================================================================
// Types
// ============================================================================

export interface WelcomeScreenConfig {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  illustration?: 'welcome' | 'motivation' | 'mission';
  ctaText: string;
  showSkip?: boolean;
  minViewTime?: number; // Minimum seconds before CTA activates
}

export interface OnboardingWelcomeScreenProps {
  config: WelcomeScreenConfig;
  onContinue: () => void;
  onSkip?: () => void;
  onDevSkip?: () => void; // DEV: Jump to latest screen
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingWelcomeScreen: React.FC<OnboardingWelcomeScreenProps> = ({
  config,
  onContinue,
  onSkip,
  onDevSkip,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);
  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  // Button enabled state (for minViewTime)
  const [buttonEnabled, setButtonEnabled] = useState(!config.minViewTime);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Enable button after minimum view time
    if (config.minViewTime) {
      const timer = setTimeout(() => {
        setButtonEnabled(true);
      }, config.minViewTime * 1000);

      return () => clearTimeout(timer);
    }
  }, [config.minViewTime, fadeAnim, scaleAnim]);

  const handleContinue = () => {
    markStepComplete(config.id);
    onContinue();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const renderIllustration = () => {
    if (!config.illustration) return null;

    // For now, we'll use emoji placeholders
    // Later, replace with actual illustrations or animations
    const illustrations: Record<string, string> = {
      welcome: '🎯',
      motivation: '✨',
      mission: '🚀',
    };

    return (
      <Animated.View
        style={[
          styles.illustrationContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Text style={styles.illustrationEmoji}>
          {illustrations[config.illustration]}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      {renderIllustration()}

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })}],
          },
        ]}>
        {/* Title */}
        <Text style={styles.title}>{config.title}</Text>

        {/* Subtitle */}
        {config.subtitle && (
          <Text style={styles.subtitle}>{config.subtitle}</Text>
        )}

        {/* Description */}
        {config.description && (
          <Text style={styles.description}>{config.description}</Text>
        )}
      </Animated.View>

      {/* Actions */}
      <Animated.View
        style={[
          styles.actions,
          {
            opacity: fadeAnim,
          },
        ]}>
        {/* Primary CTA */}
        <Button
          title={config.ctaText}
          variant="primary"
          size="large"
          onPress={handleContinue}
          disabled={!buttonEnabled}
          fullWidth
        />

        {/* DEV: Jump to Latest Screen */}
        {__DEV__ && onDevSkip && (
          <Button
            title="[DEV] Jump to Screen 39 - Account"
            variant="secondary"
            size="medium"
            onPress={onDevSkip}
            fullWidth
            style={{marginTop: spacing.md}}
          />
        )}

        {/* Skip Link */}
        {config.showSkip && onSkip && (
          <Text style={styles.skipText} onPress={handleSkip}>
            Skip for now
          </Text>
        )}
      </Animated.View>
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? colors.background.dark : colors.background.light,
      paddingHorizontal: spacing.screenPadding,
      paddingVertical: spacing.xl,
      justifyContent: 'space-between',
    } as ViewStyle,

    illustrationContainer: {
      alignItems: 'center',
      marginTop: spacing['3xl'],
      marginBottom: spacing.xl,
    } as ViewStyle,

    illustrationEmoji: {
      fontSize: 120,
      fontFamily: typography.fontFamily.regular,
      textAlign: 'center',
    } as TextStyle,

    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
    } as ViewStyle,

    title: {
      ...typography.styles.largeTitle,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      textAlign: 'center',
      marginBottom: spacing.md,
    } as TextStyle,

    subtitle: {
      ...typography.styles.title3,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      textAlign: 'center',
      marginBottom: spacing.lg,
    } as TextStyle,

    description: {
      ...typography.styles.body,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
      textAlign: 'center',
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.body,
      marginBottom: spacing.lg,
    } as TextStyle,

    actions: {
      width: '100%',
      gap: spacing.md,
    } as ViewStyle,

    skipText: {
      ...typography.styles.callout,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
      textAlign: 'center',
      paddingVertical: spacing.md,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingWelcomeScreen;
