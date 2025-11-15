/**
 * SliderInput Component
 * 1-10 scale slider with custom labels and haptic feedback
 * Used for confidence, burden, and awareness questions in onboarding
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';

// ============================================================================
// Types
// ============================================================================

export interface SliderInputProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  hapticFeedback?: boolean;
  disabled?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const SliderInput: React.FC<SliderInputProps> = ({
  value,
  onValueChange,
  min = 1,
  max = 10,
  step = 1,
  minLabel,
  maxLabel,
  showValue = true,
  valueFormatter,
  hapticFeedback = true,
  disabled = false,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  // Track last value for haptic feedback
  const [lastValue, setLastValue] = React.useState(value);

  const handleValueChange = (newValue: number) => {
    // Trigger haptic feedback on value change
    if (hapticFeedback && Platform.OS === 'ios' && newValue !== lastValue) {
      // iOS haptic feedback
      const ReactNativeHapticFeedback = require('react-native-haptic-feedback');
      ReactNativeHapticFeedback.trigger('impactLight');
    }

    setLastValue(newValue);
    onValueChange(newValue);
  };

  const formatValue = (val: number): string => {
    if (valueFormatter) {
      return valueFormatter(val);
    }
    return val.toString();
  };

  return (
    <View style={styles.container}>
      {/* Value Display */}
      {showValue && (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{formatValue(value)}</Text>
        </View>
      )}

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={value}
          onValueChange={handleValueChange}
          minimumValue={min}
          maximumValue={max}
          step={step}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={
            isDark ? colors.border.dark : colors.border.light
          }
          thumbTintColor={colors.primary}
          disabled={disabled}
        />
      </View>

      {/* Labels */}
      {(minLabel || maxLabel) && (
        <View style={styles.labelsContainer}>
          <Text style={styles.minLabel}>{minLabel || min}</Text>
          <Text style={styles.maxLabel}>{maxLabel || max}</Text>
        </View>
      )}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
    } as ViewStyle,

    valueContainer: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    } as ViewStyle,

    valueText: {
      ...typography.styles.title1,
      color: colors.primary,
      fontFamily: typography.fontFamily.bold,
    } as TextStyle,

    sliderContainer: {
      paddingHorizontal: spacing.sm,
    } as ViewStyle,

    slider: {
      width: '100%',
      height: 40,
    } as ViewStyle,

    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
      paddingHorizontal: spacing.sm,
    } as ViewStyle,

    minLabel: {
      ...typography.styles.footnote,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
    } as TextStyle,

    maxLabel: {
      ...typography.styles.footnote,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default SliderInput;
