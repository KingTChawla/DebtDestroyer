/**
 * OnboardingAccountScreen
 * Handles Screens 39-40: Account Creation
 * Email/Password or Social Authentication (Google, Apple)
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button} from '../../components';
import {OnboardingProgress} from '../../components/onboarding';
import {useOnboardingStore} from '../../stores/onboardingStore';

// ============================================================================
// Types
// ============================================================================

export interface OnboardingAccountScreenProps {
  onContinue: () => void;
  onSkip?: () => void; // For "Skip for now" option
}

type AuthMethod = 'email' | 'google' | 'apple';

// ============================================================================
// Component
// ============================================================================

export const OnboardingAccountScreen: React.FC<
  OnboardingAccountScreenProps
> = ({onContinue, onSkip}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ============================================================================
  // Validation
  // ============================================================================

  const validateEmail = (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email';
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    return undefined;
  };

  const validateConfirmPassword = (
    value: string,
    passwordValue: string,
  ): string | undefined => {
    if (!value) {
      return 'Please confirm your password';
    }
    if (value !== passwordValue) {
      return 'Passwords do not match';
    }
    return undefined;
  };

  const isFormValid = (): boolean => {
    if (authMethod !== 'email') {
      return true; // Social auth doesn't need validation
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password,
    );

    return !emailError && !passwordError && !confirmPasswordError;
  };

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors({...errors, email: undefined});
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors({...errors, password: undefined});
    }
    // Re-validate confirm password if it has been entered
    if (confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword, value);
      setErrors({...errors, password: undefined, confirmPassword: confirmError});
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors({...errors, confirmPassword: undefined});
    }
  };

  const handleContinue = async () => {
    if (authMethod === 'email') {
      // Validate all fields
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      const confirmPasswordError = validateConfirmPassword(
        confirmPassword,
        password,
      );

      if (emailError || passwordError || confirmPasswordError) {
        setErrors({
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError,
        });
        return;
      }

      // TODO: Actually create account with email/password
      console.log('Creating account with email:', email);
    } else if (authMethod === 'google') {
      // TODO: Implement Google Sign-In
      console.log('Signing in with Google');
    } else if (authMethod === 'apple') {
      // TODO: Implement Apple Sign-In
      console.log('Signing in with Apple');
    }

    markStepComplete('account_creation');
    onContinue();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  const renderEmailForm = () => (
    <View style={styles.formContainer}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="you@example.com"
          placeholderTextColor={
            isDark ? colors.text.secondary.dark : colors.text.secondary.light
          }
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              errors.password && styles.inputError,
            ]}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Minimum 8 characters"
            placeholderTextColor={
              isDark ? colors.text.secondary.dark : colors.text.secondary.light
            }
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password-new"
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Re-enter password"
          placeholderTextColor={
            isDark ? colors.text.secondary.dark : colors.text.secondary.light
          }
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password-new"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      {/* Password Requirements */}
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsText}>
          Password must contain:
        </Text>
        <Text style={styles.requirementItem}>• At least 8 characters</Text>
        <Text style={styles.requirementItem}>• Uppercase & lowercase letters</Text>
        <Text style={styles.requirementItem}>• At least one number</Text>
      </View>
    </View>
  );

  const renderSocialAuth = () => (
    <View style={styles.socialContainer}>
      <Text style={styles.socialText}>
        We'll use your {authMethod === 'google' ? 'Google' : 'Apple'} account to create your profile
      </Text>

      <View style={styles.socialButton}>
        <Text style={styles.socialButtonText}>
          {authMethod === 'google' ? 'Google' : 'Apple'} Sign-In will be integrated here
        </Text>
      </View>

      <Text style={styles.privacyNote}>
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );

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
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Save your progress and access your plan anywhere
            </Text>
          </View>

          {/* Auth Method Selector */}
          <View style={styles.authMethodContainer}>
            <TouchableOpacity
              style={[
                styles.authMethodButton,
                authMethod === 'email' && styles.authMethodButtonActive,
              ]}
              onPress={() => setAuthMethod('email')}>
              <Text
                style={[
                  styles.authMethodText,
                  authMethod === 'email' && styles.authMethodTextActive,
                ]}>
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.authMethodButton,
                authMethod === 'google' && styles.authMethodButtonActive,
              ]}
              onPress={() => setAuthMethod('google')}>
              <Text
                style={[
                  styles.authMethodText,
                  authMethod === 'google' && styles.authMethodTextActive,
                ]}>
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.authMethodButton,
                authMethod === 'apple' && styles.authMethodButtonActive,
              ]}
              onPress={() => setAuthMethod('apple')}>
              <Text
                style={[
                  styles.authMethodText,
                  authMethod === 'apple' && styles.authMethodTextActive,
                ]}>
                Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Content */}
          {authMethod === 'email' ? renderEmailForm() : renderSocialAuth()}

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title={
                authMethod === 'email'
                  ? 'Create Account'
                  : `Continue with ${authMethod === 'google' ? 'Google' : 'Apple'}`
              }
              variant="primary"
              size="large"
              onPress={handleContinue}
              disabled={authMethod === 'email' && !isFormValid()}
              fullWidth
            />

            {/* Skip Option */}
            {onSkip && (
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip for now</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Legal */}
          <Text style={styles.legalText}>
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </Text>
        </Animated.View>
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

    authMethodContainer: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.xl,
    } as ViewStyle,

    authMethodButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.radius.md,
      borderWidth: 2,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      alignItems: 'center',
    } as ViewStyle,

    authMethodButtonActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}15`,
    } as ViewStyle,

    authMethodText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      fontWeight: typography.fontWeight.medium,
    } as TextStyle,

    authMethodTextActive: {
      color: colors.primary,
      fontWeight: typography.fontWeight.semibold,
    } as TextStyle,

    formContainer: {
      gap: spacing.md,
      marginBottom: spacing.xl,
    } as ViewStyle,

    inputContainer: {
      gap: spacing.xs,
    } as ViewStyle,

    label: {
      ...typography.styles.subheadline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.medium,
    } as TextStyle,

    input: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: spacing.radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 48,
    } as TextStyle,

    inputError: {
      borderColor: colors.error,
      borderWidth: 2,
    } as ViewStyle,

    passwordContainer: {
      position: 'relative',
    } as ViewStyle,

    passwordInput: {
      paddingRight: 70,
    } as TextStyle,

    showPasswordButton: {
      position: 'absolute',
      right: spacing.md,
      top: '50%',
      transform: [{translateY: -10}],
    } as ViewStyle,

    showPasswordText: {
      ...typography.styles.callout,
      color: colors.primary,
      fontWeight: typography.fontWeight.medium,
    } as TextStyle,

    errorText: {
      ...typography.styles.footnote,
      color: colors.error,
    } as TextStyle,

    requirementsContainer: {
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderRadius: spacing.radius.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
    } as ViewStyle,

    requirementsText: {
      ...typography.styles.footnote,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.xs,
    } as TextStyle,

    requirementItem: {
      ...typography.styles.footnote,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      marginLeft: spacing.sm,
    } as TextStyle,

    socialContainer: {
      gap: spacing.md,
      marginBottom: spacing.xl,
      alignItems: 'center',
    } as ViewStyle,

    socialText: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
    } as TextStyle,

    socialButton: {
      width: '100%',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.radius.md,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 2,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      alignItems: 'center',
    } as ViewStyle,

    socialButtonText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
    } as TextStyle,

    privacyNote: {
      ...typography.styles.footnote,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
      opacity: 0.7,
    } as TextStyle,

    actions: {
      gap: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,

    skipButton: {
      paddingVertical: spacing.sm,
      alignItems: 'center',
    } as ViewStyle,

    skipText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
    } as TextStyle,

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
