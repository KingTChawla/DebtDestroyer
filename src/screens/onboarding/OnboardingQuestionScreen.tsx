/**
 * OnboardingQuestionScreen
 * Handles Screens 3-6, 8-10, 12, 27-30, 32-34 (18 question screens)
 * Config-driven component for tile-based and slider-based questions
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button} from '../../components';
import {
  TileSelector,
  TileOption,
  SliderInput,
  OnboardingProgress,
} from '../../components/onboarding';
import {useOnboardingStore} from '../../stores/onboardingStore';

// ============================================================================
// Types
// ============================================================================

export type QuestionInputType = 'tile-select' | 'slider';

export interface QuestionScreenConfig {
  id: string;
  question: string;
  description?: string;
  inputType: QuestionInputType;

  // For tile-select questions
  options?: TileOption[];
  multiSelect?: boolean;
  columns?: 1 | 2;
  tileSize?: 'small' | 'medium' | 'large';
  autoAdvance?: boolean; // Auto-advance on selection (single-select only)

  // For slider questions
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    minLabel?: string;
    maxLabel?: string;
    valueFormatter?: (value: number) => string;
  };

  // Progress tracking
  progress: {
    current: number;
    total: number;
  };

  // Data storage key in onboarding store
  storeKey: string;
}

export interface OnboardingQuestionScreenProps {
  config: QuestionScreenConfig;
  onContinue: () => void;
  onBack?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingQuestionScreen: React.FC<OnboardingQuestionScreenProps> = ({
  config,
  onContinue,
  onBack,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  // Get current value from store
  const storeValue = useOnboardingStore(state => (state as any)[config.storeKey]);
  const updateField = useOnboardingStore(state => state.updateField);
  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // Local state for current answer
  const [answer, setAnswer] = React.useState<any>(() => {
    // Initialize from store
    if (config.inputType === 'tile-select') {
      if (config.multiSelect) {
        return Array.isArray(storeValue) ? storeValue : [];
      } else {
        return storeValue ? [storeValue as string] : [];
      }
    } else if (config.inputType === 'slider') {
      return typeof storeValue === 'number' ? storeValue : config.sliderConfig?.min || 1;
    }
    return null;
  });

  const handleTileSelectionChange = (selectedIds: string[]) => {
    setAnswer(selectedIds);
  };

  const handleSliderChange = (value: number) => {
    setAnswer(value);
  };

  const handleContinue = () => {
    // Save answer to store
    if (config.inputType === 'tile-select') {
      const valueToStore = config.multiSelect ? answer : answer[0] || null;
      updateField(config.storeKey, valueToStore);
    } else if (config.inputType === 'slider') {
      updateField(config.storeKey, answer);
    }

    // Mark step as complete
    markStepComplete(config.id);

    // Navigate to next screen
    onContinue();
  };

  const handleAutoAdvance = () => {
    // For single-select tiles with auto-advance
    if (config.inputType === 'tile-select' && !config.multiSelect && config.autoAdvance) {
      handleContinue();
    }
  };

  const isAnswered = () => {
    if (config.inputType === 'tile-select') {
      return answer && answer.length > 0;
    } else if (config.inputType === 'slider') {
      return answer !== null && answer !== undefined;
    }
    return false;
  };

  const renderInput = () => {
    if (config.inputType === 'tile-select' && config.options) {
      return (
        <TileSelector
          options={config.options}
          selectedIds={answer || []}
          onSelectionChange={handleTileSelectionChange}
          multiSelect={config.multiSelect || false}
          columns={config.columns || 1}
          tileSize={config.tileSize || 'medium'}
          autoAdvance={config.autoAdvance || false}
          onAutoAdvance={handleAutoAdvance}
        />
      );
    } else if (config.inputType === 'slider' && config.sliderConfig) {
      return (
        <SliderInput
          value={answer || config.sliderConfig.min}
          onValueChange={handleSliderChange}
          min={config.sliderConfig.min}
          max={config.sliderConfig.max}
          step={config.sliderConfig.step}
          minLabel={config.sliderConfig.minLabel}
          maxLabel={config.sliderConfig.maxLabel}
          showValue
          valueFormatter={config.sliderConfig.valueFormatter}
          hapticFeedback
        />
      );
    }
    return null;
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
        showsVerticalScrollIndicator={false}>

        {/* Question */}
        <Text style={styles.question}>{config.question}</Text>

        {/* Description */}
        {config.description && (
          <Text style={styles.description}>{config.description}</Text>
        )}

        {/* Input (TileSelector or SliderInput) */}
        <View style={styles.inputContainer}>
          {renderInput()}
        </View>
      </ScrollView>

      {/* Actions (only show for non-auto-advance or slider questions) */}
      {(!config.autoAdvance || config.inputType === 'slider') && (
        <View style={styles.actions}>
          <Button
            title="Continue"
            variant="primary"
            size="large"
            onPress={handleContinue}
            disabled={!isAnswered()}
            fullWidth
          />
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

    question: {
      ...typography.styles.title2,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.md,
      marginTop: spacing.lg,
    } as TextStyle,

    description: {
      ...typography.styles.body,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
      marginBottom: spacing.lg,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.body,
    } as TextStyle,

    inputContainer: {
      marginTop: spacing.md,
    } as ViewStyle,

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

export default OnboardingQuestionScreen;
