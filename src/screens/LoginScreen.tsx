/**
 * LoginScreen
 * Clean, vertically-stacked login interface following project design system
 * Uses reusable AuthForm component for consistency
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useTheme} from '../contexts/ThemeContext';
import {colors, spacing} from '../theme';
import {AuthForm, AuthFormProps} from '../components/auth';

// ============================================================================
// Types
// ============================================================================

export interface LoginScreenProps extends Omit<AuthFormProps, 'mode' | 'showSkipOption' | 'showSocialAuth'> {
  // Additional login-specific props can be added here
  showSocialAuth?: boolean; // Override to make social auth optional
}

// ============================================================================
// Component
// ============================================================================

export const LoginScreen: React.FC<LoginScreenProps> = ({
  showSocialAuth = true,
  ...authFormProps
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Login to get started</Text>
        </View>

        {/* Auth Form */}
        <View style={styles.formSection}>
          <AuthForm
            mode="login"
            showSocialAuth={showSocialAuth}
            showSkipOption={false}
            animationEnabled={true}
            {...authFormProps}
          />
        </View>
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
      paddingTop: spacing.xl * 2,
      paddingBottom: spacing.xl * 2,
      flexGrow: 1,
    } as ViewStyle,

    header: {
      alignItems: 'flex-start',
      marginBottom: spacing.xl * 1.5,
    } as ViewStyle,

    title: {
      fontSize: 34,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      textAlign: 'left',
      marginBottom: spacing.sm,
      fontFamily: 'HelveticaNeue-Bold',
      lineHeight: 41,
    } as ViewStyle,

    subtitle: {
      fontSize: 17,
      fontWeight: '400',
      color: isDark ? '#B8B8B8' : '#666666',
      textAlign: 'left',
      fontFamily: 'HelveticaNeue',
      lineHeight: 22,
    } as ViewStyle,

    formSection: {
      flex: 1,
    } as ViewStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default LoginScreen;