/**
 * OnboardingFormScreen
 * Handles Screens 7, 11, 13-16, 31 (8 form-based screens)
 * Config-driven component for collecting detailed information
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button} from '../../components';
import {
  OnboardingProgress,
  CurrencyInput,
  ChecklistSelector,
} from '../../components/onboarding';
import {useOnboardingStore} from '../../stores/onboardingStore';

// ============================================================================
// Types
// ============================================================================

export type FormFieldType =
  | 'text'
  | 'number'
  | 'currency'
  | 'checklist'
  | 'age-picker';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  storeKey: string;
  storeSubKey?: string; // For nested object properties (e.g., 'demographics' -> 'age')

  // For currency fields
  currencyConfig?: {
    allowZero?: boolean;
  };

  // For checklist fields
  checklistConfig?: {
    items: Array<{
      id: string;
      label: string;
      cost?: number;
    }>;
    multiSelect?: boolean;
    showCost?: boolean;
  };

  // For number fields
  numberConfig?: {
    min?: number;
    max?: number;
  };
}

export interface FormScreenConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  progress: {
    current: number;
    total: number;
  };
}

export interface OnboardingFormScreenProps {
  config: FormScreenConfig;
  onContinue: () => void;
  onBack?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingFormScreen: React.FC<OnboardingFormScreenProps> = ({
  config,
  onContinue,
  onBack,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const updateField = useOnboardingStore(state => state.updateField);
  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // Initialize form values from store
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    config.fields.forEach(field => {
      const storeValue = useOnboardingStore.getState()[
        field.storeKey as keyof ReturnType<typeof useOnboardingStore.getState>
      ];

      // Handle nested properties (e.g., demographics.age)
      if (field.storeSubKey && storeValue && typeof storeValue === 'object') {
        initialValues[field.id] = (storeValue as any)[field.storeSubKey] ?? getDefaultValue(field);
      } else {
        initialValues[field.id] = storeValue ?? getDefaultValue(field);
      }
    });
    return initialValues;
  });

  const getDefaultValue = (field: FormField) => {
    switch (field.type) {
      case 'currency':
      case 'number':
        return 0;
      case 'checklist':
        return field.checklistConfig?.multiSelect ? [] : null;
      case 'text':
      case 'age-picker':
      default:
        return '';
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({...prev, [fieldId]: value}));
  };

  const isFormValid = () => {
    return config.fields.every(field => {
      if (!field.required) return true;

      const value = formValues[field.id];

      switch (field.type) {
        case 'text':
          return value && typeof value === 'string' && value.trim().length > 0;
        case 'age-picker':
        case 'number':
          return value !== null && value !== undefined && value > 0;
        case 'currency':
          return value !== null && value !== undefined && value >= 0;
        case 'checklist':
          return field.checklistConfig?.multiSelect
            ? Array.isArray(value) && value.length > 0
            : value !== null;
        default:
          return true;
      }
    });
  };

  const handleContinue = () => {
    // Group fields by storeKey to handle nested objects
    const storeUpdates: Record<string, any> = {};

    config.fields.forEach(field => {
      const value = formValues[field.id];

      if (field.storeSubKey) {
        // Nested property - build object
        if (!storeUpdates[field.storeKey]) {
          // Get existing object from store or create new one
          const existingValue = useOnboardingStore.getState()[
            field.storeKey as keyof ReturnType<typeof useOnboardingStore.getState>
          ];
          storeUpdates[field.storeKey] = (existingValue && typeof existingValue === 'object')
            ? {...existingValue}
            : {};
        }
        storeUpdates[field.storeKey][field.storeSubKey] = value;
      } else {
        // Direct property
        storeUpdates[field.storeKey] = value;
      }
    });

    // Save all values to store
    Object.entries(storeUpdates).forEach(([key, value]) => {
      updateField(key, value);
    });

    // Mark step as complete
    markStepComplete(config.id);

    // Navigate to next screen
    onContinue();
  };

  const renderField = (field: FormField) => {
    const value = formValues[field.id];

    switch (field.type) {
      case 'currency':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <CurrencyInput
              value={value || 0}
              onChangeValue={val => handleFieldChange(field.id, val)}
              placeholder={field.placeholder}
            />
          </View>
        );

      case 'number':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              style={styles.numberInput}
              value={value?.toString() || ''}
              onChangeText={text => {
                const num = parseInt(text, 10);
                handleFieldChange(
                  field.id,
                  isNaN(num) ? 0 : Math.max(
                    field.numberConfig?.min ?? 0,
                    Math.min(field.numberConfig?.max ?? 999, num),
                  ),
                );
              }}
              keyboardType="number-pad"
              placeholder={field.placeholder}
              placeholderTextColor={
                isDark ? colors.text.secondary.dark : colors.text.secondary.light
              }
            />
          </View>
        );

      case 'text':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              style={styles.textInput}
              value={value || ''}
              onChangeText={text => handleFieldChange(field.id, text)}
              placeholder={field.placeholder}
              placeholderTextColor={
                isDark ? colors.text.secondary.dark : colors.text.secondary.light
              }
            />
          </View>
        );

      case 'age-picker':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              style={styles.numberInput}
              value={value?.toString() || ''}
              onChangeText={text => {
                const num = parseInt(text, 10);
                handleFieldChange(
                  field.id,
                  isNaN(num) ? '' : Math.max(18, Math.min(100, num)),
                );
              }}
              keyboardType="number-pad"
              placeholder={field.placeholder || 'Enter your age'}
              placeholderTextColor={
                isDark ? colors.text.secondary.dark : colors.text.secondary.light
              }
            />
          </View>
        );

      case 'checklist':
        if (!field.checklistConfig) return null;
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <ChecklistSelector
              options={field.checklistConfig.items}
              selectedIds={
                field.checklistConfig.multiSelect
                  ? value || []
                  : value
                  ? [value]
                  : []
              }
              onSelectionChange={selectedIds => {
                const newValue = field.checklistConfig?.multiSelect
                  ? selectedIds
                  : selectedIds[0] || null;
                handleFieldChange(field.id, newValue);
              }}
              showCost={field.checklistConfig.showCost || false}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <OnboardingProgress
        current={config.progress.current}
        total={config.progress.total}
        showPercentage={false}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Title */}
        <Text style={styles.title}>{config.title}</Text>

        {/* Description */}
        {config.description && (
          <Text style={styles.description}>{config.description}</Text>
        )}

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {config.fields.map(field => renderField(field))}
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="Continue"
          variant="primary"
          size="large"
          onPress={handleContinue}
          disabled={!isFormValid()}
          fullWidth
        />
      </View>
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
    } as ViewStyle,

    scrollView: {
      flex: 1,
    } as ViewStyle,

    scrollContent: {
      paddingHorizontal: spacing.screenPadding,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl,
    } as ViewStyle,

    title: {
      ...typography.styles.title2,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.sm,
      marginTop: spacing.lg,
    } as TextStyle,

    description: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      marginBottom: spacing.lg,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.body,
    } as TextStyle,

    formContainer: {
      marginTop: spacing.md,
    } as ViewStyle,

    fieldContainer: {
      marginBottom: spacing.lg,
    } as ViewStyle,

    fieldLabel: {
      ...typography.styles.callout,
      fontWeight: typography.fontWeight.semibold,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.xs,
    } as TextStyle,

    textInput: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 48,
    } as TextStyle,

    numberInput: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 48,
    } as TextStyle,

    actions: {
      paddingHorizontal: spacing.screenPadding,
      paddingVertical: spacing.md,
      backgroundColor: isDark ? colors.background.dark : colors.background.light,
      borderTopWidth: 1,
      borderTopColor: isDark ? colors.border.dark : colors.border.light,
    } as ViewStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingFormScreen;
