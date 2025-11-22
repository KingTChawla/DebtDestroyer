/**
 * AuthForm Component
 * Reusable authentication form component for login/signup flows
 * Follows project design system and supports multiple auth modes
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
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button} from '../Button';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/solid';

// ============================================================================
// Types
// ============================================================================

export interface AuthFormProps {
  mode?: 'login' | 'signup';
  onSubmit: (email: string, password: string, confirmPassword?: string) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
  onGoogleSignIn?: () => void;
  onAppleSignIn?: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
  error?: string;
  showSocialAuth?: boolean;
  showSkipOption?: boolean;
  animationEnabled?: boolean;
  initialValues?: {
    email?: string;
    password?: string;
  };
}

// ============================================================================
// Component
// ============================================================================

export const AuthForm: React.FC<AuthFormProps> = ({
  mode = 'signup',
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  onGoogleSignIn,
  onAppleSignIn,
  onSkip,
  isLoading = false,
  error,
  showSocialAuth = true,
  showSkipOption = false,
  animationEnabled = true,
  initialValues = {},
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const [email, setEmail] = useState(initialValues.email || '');
  const [password, setPassword] = useState(initialValues.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(animationEnabled ? 0 : 1)).current;
  const slideAnim = useRef(new Animated.Value(animationEnabled ? 30 : 0)).current;

  useEffect(() => {
    if (animationEnabled) {
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
    }
  }, [animationEnabled]);

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

    if (mode === 'signup') {
      if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
      // Only show advanced requirements after user has submitted and there's an error
      if (hasSubmitted && fieldErrors.password) {
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
        }
      }
    }

    return undefined;
  };

  const validateConfirmPassword = (
    value: string,
    passwordValue: string,
  ): string | undefined => {
    if (mode === 'signup') {
      if (!value) {
        return 'Please confirm your password';
      }
      if (value !== passwordValue) {
        return 'Passwords do not match';
      }
    }
    return undefined;
  };

  const isFormValid = (): boolean => {
    // Basic validation for enabling the button
    const hasEmail = email && email.trim().length > 0;
    const hasPassword = password && password.length > 0;
    const hasConfirmPassword = mode === 'signup'
      ? confirmPassword && confirmPassword.length > 0 && confirmPassword === password
      : true;

    // Basic email format check
    const basicEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Minimum password length for signup
    const basicPasswordValid = mode === 'signup'
      ? password.length >= 8
      : password.length > 0;

    return hasEmail && basicEmailValid && hasPassword && basicPasswordValid && hasConfirmPassword;
  };

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (fieldErrors.email) {
      setFieldErrors({...fieldErrors, email: undefined});
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (fieldErrors.password) {
      setFieldErrors({...fieldErrors, password: undefined});
    }
    // Re-validate confirm password if it has been entered
    if (mode === 'signup' && confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword, value);
      setFieldErrors({...fieldErrors, password: undefined, confirmPassword: confirmError});
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (fieldErrors.confirmPassword) {
      setFieldErrors({...fieldErrors, confirmPassword: undefined});
    }
  };

  const handleSubmit = async () => {
    // Mark that user has attempted submission
    setHasSubmitted(true);

    // Validate fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = mode === 'signup'
      ? validateConfirmPassword(confirmPassword, password)
      : undefined;

    if (emailError || passwordError || confirmPasswordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    await onSubmit(email, password, mode === 'signup' ? confirmPassword : undefined);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    isPassword: boolean = false,
    error?: string,
    additionalProps?: any,
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {/* Leading Icon */}
        <View style={styles.inputIcon}>
          {isPassword ? (
            <LockClosedIcon
              size={20}
              color={isDark ? colors.text.secondary.dark : colors.text.secondary.light}
            />
          ) : (
            <EnvelopeIcon
              size={20}
              color={isDark ? colors.text.secondary.dark : colors.text.secondary.light}
            />
          )}
        </View>

        <TextInput
          style={[
            styles.input,
            styles.inputWithIcon,
            isPassword && styles.passwordInput,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={
            isDark ? colors.text.secondary.dark : colors.text.secondary.light
          }
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={isPassword ? (mode === 'signup' ? 'password-new' : 'password') : 'email'}
          keyboardType={isPassword ? 'default' : 'email-address'}
          {...additionalProps}
        />

        {/* Trailing Icon for Password */}
        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}>
            {showPassword ? (
              <EyeSlashIcon
                size={20}
                color={isDark ? colors.text.secondary.dark : colors.text.secondary.light}
              />
            ) : (
              <EyeIcon
                size={20}
                color={isDark ? colors.text.secondary.dark : colors.text.secondary.light}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  const renderPasswordRequirements = () => {
    if (mode !== 'signup') return null;

    // Only show requirements if user has submitted and there are password errors
    if (!hasSubmitted || !fieldErrors.password) return null;

    return (
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsText}>
          Password must contain:
        </Text>
        <Text style={styles.requirementItem}>• At least 8 characters</Text>
        <Text style={styles.requirementItem}>• Uppercase & lowercase letters</Text>
        <Text style={styles.requirementItem}>• At least one number</Text>
      </View>
    );
  };

  const renderSocialAuth = () => {
    if (!showSocialAuth) return null;

    return (
      <View style={styles.socialContainer}>
        {/* Horizontal Social Buttons */}
        {(onGoogleSignIn || onAppleSignIn) && (
          <View style={styles.socialButtonsHorizontal}>
            {onGoogleSignIn && (
              <TouchableOpacity
                style={[styles.socialButton, styles.socialButtonHorizontal, { borderColor: isDark ? colors.border.dark : colors.border.light }]}
                onPress={onGoogleSignIn}
                disabled={isLoading}>
                <View style={styles.socialButtonContent}>
                  <View style={styles.googleIcon}>
                    <Text style={styles.googleIconText}>G</Text>
                  </View>
                  <Text style={[styles.socialButtonText, { color: isDark ? colors.text.primary.dark : colors.text.primary.light }]}>
                    Google
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {onAppleSignIn && (
              <TouchableOpacity
                style={[styles.socialButton, styles.socialButtonHorizontal, { borderColor: isDark ? colors.border.dark : colors.border.light }]}
                onPress={onAppleSignIn}
                disabled={isLoading}>
                <View style={styles.socialButtonContent}>
                  <View style={styles.appleIcon}>
                    <Text style={styles.appleIconText}></Text>
                  </View>
                  <Text style={[styles.socialButtonText, { color: isDark ? colors.text.primary.dark : colors.text.primary.light }]}>
                    Apple
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{translateY: slideAnim}],
      }}>
      {/* Global Error */}
      {error && (
        <Text style={styles.globalError}>{error}</Text>
      )}

      {/* Social Auth - PRIMARY OPTION */}
      {renderSocialAuth()}

      {/* Continue With Divider */}
      {showSocialAuth && (
        <View style={styles.dividerContainer}>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? colors.border.dark : colors.border.light }]} />
          <Text style={[styles.dividerText, { color: isDark ? colors.text.secondary.dark : colors.text.secondary.light }]}>
            OR
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? colors.border.dark : colors.border.light }]} />
        </View>
      )}

      {/* Email Login Details - SECONDARY OPTION */}
      <View style={styles.emailSection}>
        {/* Email Input */}
        {renderInput(
          'Email Address',
          email,
          handleEmailChange,
          'Enter Email',
          false,
          fieldErrors.email,
        )}

        {/* Password Input */}
        {renderInput(
          'Password',
          password,
          handlePasswordChange,
          mode === 'signup' ? 'Minimum 8 characters' : 'Enter Password',
          true,
          fieldErrors.password,
        )}

        {/* Confirm Password Input (Signup only) */}
        {mode === 'signup' &&
          renderInput(
            'Confirm Password',
            confirmPassword,
            handleConfirmPasswordChange,
            'Re-enter password',
            true,
            fieldErrors.confirmPassword,
          )}

        {/* Password Requirements (Signup only) */}
        {renderPasswordRequirements()}

        {/* Forgot Password Link (Login only) */}
        {mode === 'login' && onForgotPassword && (
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={onForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Primary Action - Create Account */}
      <View style={styles.actionSection}>
        <Button
          title={mode === 'login' ? 'Login' : 'Create Account'}
          variant="primary"
          size="large"
          onPress={handleSubmit}
          disabled={!isFormValid() || isLoading}
          fullWidth
          loading={isLoading}
        />
      </View>

      {/* Secondary Actions */}
      <View style={styles.secondaryActions}>
        {/* Create Account Link (Login only) */}
        {mode === 'login' && onCreateAccount && (
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={onCreateAccount}
            disabled={isLoading}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        )}

        {/* Skip Option (Onboarding only) */}
        {showSkipOption && onSkip && (
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean) => {
  return StyleSheet.create({
    inputContainer: {
      gap: spacing.xs,
      marginBottom: spacing.md,
    } as ViewStyle,

    label: {
      ...typography.styles.subheadline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: spacing.radius.md,
      minHeight: 48,
    } as ViewStyle,

    inputError: {
      borderColor: colors.error,
      borderWidth: 2,
    } as ViewStyle,

    inputIcon: {
      paddingHorizontal: spacing.md,
    } as ViewStyle,

    input: {
      flex: 1,
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontFamily: typography.fontFamily.regular,
      paddingVertical: spacing.md,
      minHeight: 48,
    } as TextStyle,

    inputWithIcon: {
      paddingLeft: 0, // Padding handled by icon container
    } as TextStyle,

    passwordInput: {
      paddingRight: spacing.xl + spacing.md, // Space for toggle button
    } as TextStyle,

    passwordToggle: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    } as ViewStyle,

    errorText: {
      ...typography.styles.footnote,
      color: colors.error,
      marginTop: spacing.xs,
      fontFamily: typography.fontFamily.regular,
    } as TextStyle,

    globalError: {
      ...typography.styles.callout,
      color: colors.error,
      textAlign: 'center',
      marginBottom: spacing.md,
      backgroundColor: `${colors.error}15`,
      padding: spacing.md,
      borderRadius: spacing.radius.md,
    } as TextStyle,

    requirementsContainer: {
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderRadius: spacing.radius.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      marginBottom: spacing.lg,
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

    forgotPasswordButton: {
      alignSelf: 'flex-end',
      paddingVertical: spacing.xs,
      marginBottom: spacing.lg,
    } as ViewStyle,

    forgotPasswordText: {
      ...typography.styles.callout,
      color: colors.primary,
      fontWeight: typography.fontWeight.medium,
    } as TextStyle,

    actionSection: {
      marginBottom: spacing.xl,
    } as ViewStyle,

    secondaryActions: {
      gap: spacing.md,
    } as ViewStyle,

    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.lg,
    } as ViewStyle,

    dividerLine: {
      flex: 1,
      height: 1,
    } as ViewStyle,

    dividerText: {
      ...typography.styles.callout,
      paddingHorizontal: spacing.md,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    createAccountButton: {
      alignItems: 'center',
      paddingVertical: spacing.md,
    } as ViewStyle,

    createAccountText: {
      ...typography.styles.headline,
      color: colors.primary,
      fontWeight: typography.fontWeight.semibold,
    } as TextStyle,

    socialContainer: {
      gap: spacing.md,
    } as ViewStyle,

    socialText: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
      marginBottom: spacing.sm,
    } as TextStyle,

    emailSection: {
      marginBottom: spacing.lg,
    } as ViewStyle,

    socialButtonsHorizontal: {
      flexDirection: 'row',
      gap: spacing.md,
    } as ViewStyle,

    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.radius.md,
      borderWidth: 1,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      minHeight: 48,
    } as ViewStyle,

    socialButtonHorizontal: {
      flex: 1, // Make buttons equal width in horizontal layout
    } as ViewStyle,

    socialButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    } as ViewStyle,

    socialButtonText: {
      ...typography.styles.headline,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    googleIcon: {
      width: 20,
      height: 20,
      borderRadius: spacing.radius.sm,
      backgroundColor: '#4285F4',
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,

    googleIconText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: typography.fontWeight.bold,
      fontFamily: typography.fontFamily.bold,
    } as TextStyle,

    appleIcon: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,

    appleIconText: {
      color: '#000000',
      fontSize: 18,
      fontWeight: typography.fontWeight.bold,
      fontFamily: typography.fontFamily.bold,
    } as TextStyle,

    skipButton: {
      paddingVertical: spacing.sm,
      alignItems: 'center',
      marginTop: spacing.md,
    } as ViewStyle,

    skipText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default AuthForm;