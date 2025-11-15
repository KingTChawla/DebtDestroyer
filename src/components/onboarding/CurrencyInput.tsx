/**
 * CurrencyInput Component
 * Enhanced Input component with automatic currency formatting
 * Handles comma separation, decimal places, and $ prefix
 */

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';

// ============================================================================
// Types
// ============================================================================

export interface CurrencyInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: number;
  onChangeValue: (value: number) => void;
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  allowNegative?: boolean;
  maxValue?: number;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Formats number to currency string with commas
 * Example: 1234.56 → "1,234.56"
 */
const formatCurrency = (value: number): string => {
  if (isNaN(value)) return '';

  // Split into integer and decimal parts
  const [integer, decimal] = value.toFixed(2).split('.');

  // Add commas to integer part
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return with decimal if it exists and is not .00
  if (decimal && decimal !== '00') {
    return `${formattedInteger}.${decimal}`;
  }

  return formattedInteger;
};

/**
 * Parses currency string to number
 * Example: "1,234.56" → 1234.56
 */
const parseCurrency = (text: string): number => {
  // Remove everything except digits and decimal point
  const cleaned = text.replace(/[^0-9.]/g, '');

  // Handle multiple decimal points (keep only first)
  const parts = cleaned.split('.');
  const normalized = parts.length > 1
    ? `${parts[0]}.${parts.slice(1).join('')}`
    : cleaned;

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
};

// ============================================================================
// Component
// ============================================================================

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChangeValue,
  label,
  error,
  helperText,
  containerStyle,
  allowNegative = false,
  maxValue,
  ...textInputProps
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark, !!error);

  // Display value (formatted string)
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  // Track if input is focused
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
    // Parse the input
    let numericValue = parseCurrency(text);

    // Apply constraints
    if (!allowNegative && numericValue < 0) {
      numericValue = 0;
    }
    if (maxValue !== undefined && numericValue > maxValue) {
      numericValue = maxValue;
    }

    // Update display value (unformatted while typing)
    setDisplayValue(text);

    // Update parent with numeric value
    onChangeValue(numericValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Remove formatting when focused for easier editing
    setDisplayValue(value > 0 ? value.toString() : '');
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Re-apply formatting when focus lost
    setDisplayValue(formatCurrency(value));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input Container */}
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        {/* Dollar Sign Prefix */}
        <Text style={styles.prefix}>$</Text>

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={displayValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={
            isDark ? colors.text.secondary.dark : colors.text.secondary.light
          }
          {...textInputProps}
        />
      </View>

      {/* Helper Text or Error */}
      {(helperText || error) && (
        <Text style={error ? styles.errorText : styles.helperText}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean, hasError: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: spacing.md,
    } as ViewStyle,

    label: {
      ...typography.styles.subheadline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.sm,
    } as TextStyle,

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: hasError
        ? colors.error
        : isDark
        ? colors.border.dark
        : colors.border.light,
      borderRadius: spacing.radius.md,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      paddingHorizontal: spacing.md,
      minHeight: 56,
    } as ViewStyle,

    inputContainerFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
    } as ViewStyle,

    prefix: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginRight: spacing.sm,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    input: {
      flex: 1,
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      padding: 0, // Remove default padding
    } as TextStyle,

    helperText: {
      ...typography.styles.footnote,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
      marginTop: spacing.sm,
    } as TextStyle,

    errorText: {
      ...typography.styles.footnote,
      color: colors.error,
      marginTop: spacing.sm,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default CurrencyInput;
