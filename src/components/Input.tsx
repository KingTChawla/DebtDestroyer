/**
 * Input Component
 * Reusable text input with label and error handling
 */

import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {colors, spacing, typography} from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  prefix?: string;
  suffix?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  prefix,
  suffix,
  style,
  ...textInputProps
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark
    ? colors.text.primary.dark
    : colors.text.primary.light;
  const placeholderColor = isDark
    ? colors.text.secondary.dark
    : colors.text.secondary.light;
  const borderColor = error
    ? colors.error
    : isDark
    ? '#333'
    : '#E0E0E0';
  const backgroundColor = isDark
    ? colors.surface.dark
    : colors.surface.light;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, {color: textColor}]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor,
            borderColor,
          },
        ]}>
        {prefix && (
          <Text
            style={[
              styles.affix,
              {color: placeholderColor},
            ]}>
            {prefix}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            {color: textColor},
            style,
          ]}
          placeholderTextColor={placeholderColor}
          {...textInputProps}
        />
        {suffix && (
          <Text
            style={[
              styles.affix,
              {color: placeholderColor},
            ]}>
            {suffix}
          </Text>
        )}
      </View>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: spacing.radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    paddingVertical: spacing.md - 4,
  },
  affix: {
    fontSize: typography.fontSize.base,
    marginHorizontal: spacing.xs,
  },
  error: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
