/**
 * OnboardingAccountScreen
 * Handles Screens 39-40: Account Creation
 * Email/Password or Social Authentication (Google, Apple)
 * Now uses reusable AuthForm component for consistency
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {OnboardingProgress} from '../../components/onboarding';
import {AuthForm} from '../../components/auth';
import {useOnboardingStore} from '../../stores/onboardingStore';

// ============================================================================
// Types
// ============================================================================

export interface OnboardingAccountScreenProps {
  onContinue: () => void;
  onSkip?: () => void; // For "Skip for now" option
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingAccountScreen: React.FC<
  OnboardingAccountScreenProps
> = ({onContinue, onSkip}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);
  const [isLoading, setIsLoading] = useState(false);

  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleSubmit = async (email: string, password: string, confirmPassword?: string) => {
    setIsLoading(true);

    try {
      // TODO: Actually create account with email/password
      console.log('Creating account with email:', email);
      console.log('Password:', password);
      if (confirmPassword) {
        console.log('Confirm Password:', confirmPassword);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      markStepComplete('account_creation');
      onContinue();
    } catch (error) {
      console.error('Account creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      // TODO: Implement Google Sign-In
      console.log('Signing in with Google');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      markStepComplete('account_creation');
      onContinue();
    } catch (error) {
      console.error('Google Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);

    try {
      // TODO: Implement Apple Sign-In
      console.log('Signing in with Apple');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      markStepComplete('account_creation');
      onContinue();
    } catch (error) {
      console.error('Apple Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

      {/* Progress */}
      <OnboardingProgress current={39} total={43} showPercentage={false} />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Save your progress and access your plan anywhere
          </Text>
        </View>

        {/* Auth Form - Using reusable component */}
        <View style={styles.formSection}>
          <AuthForm
            mode="signup"
            onSubmit={handleSubmit}
            onGoogleSignIn={handleGoogleSignIn}
            onAppleSignIn={handleAppleSignIn}
            onSkip={handleSkip}
            isLoading={isLoading}
            showSocialAuth={true}
            showSkipOption={!!onSkip}
            animationEnabled={true}
          />
        </View>

        {/* Legal */}
        <Text style={styles.legalText}>
          By creating an account, you agree to our Terms of Service and
          Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
    } as ViewStyle,

    scrollView: {
      flex: 1,
    } as ViewStyle,

    scrollContent: {
      paddingHorizontal: spacing.screenPadding,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl * 2,
      flexGrow: 1,
    } as ViewStyle,

    header: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    } as ViewStyle,

    title: {
      ...typography.styles.largeTitle,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      textAlign: 'center',
      marginBottom: spacing.sm,
    } as TextStyle,

    subtitle: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
    } as TextStyle,

    formSection: {
      marginBottom: spacing.lg,
    } as ViewStyle,

    legalText: {
      ...typography.styles.caption2,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
      lineHeight: typography.lineHeight.normal * typography.fontSize.caption2,
      opacity: 0.7,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingAccountScreen;
