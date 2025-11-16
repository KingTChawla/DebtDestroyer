/**
 * OnboardingDebtFlowScreen
 * Handles Screens 17-26 (10 screens total)
 * Multi-step wizard for debt entry with repeating micro-flow
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button, GradientCard} from '../../components';
import {
  OnboardingProgress,
  TileSelector,
  CurrencyInput,
} from '../../components/onboarding';
import {useOnboardingStore} from '../../stores/onboardingStore';
import {CheckCircleIcon, PencilIcon, TrashIcon} from 'react-native-heroicons/solid';
import type {DebtType} from '../../types';

// ============================================================================
// Types
// ============================================================================

interface DebtFormData {
  type: DebtType | null;
  creditor: string;
  balance: number;
  minimumPayment: number;
  interestRate: number | null;
  dueDate: number | null; // Day of month (1-31)
  autopay: boolean;
}

interface DebtFormState extends DebtFormData {
  aprText: string; // For handling APR text input
}

type DebtFlowStep =
  | 'intro'
  | 'type'
  | 'creditor'
  | 'details' // Combined: balance, payment, APR, due date, autopay
  | 'summary'
  | 'confirmation';

export interface OnboardingDebtFlowScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingDebtFlowScreen: React.FC<
  OnboardingDebtFlowScreenProps
> = ({onContinue, onBack}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const debts = useOnboardingStore(state => state.debts);
  const addDebt = useOnboardingStore(state => state.addDebt);
  const removeDebt = useOnboardingStore(state => state.removeDebt);
  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  const [currentStep, setCurrentStep] = useState<DebtFlowStep>('intro');
  const [currentDebt, setCurrentDebt] = useState<DebtFormState>({
    type: null,
    creditor: '',
    balance: 0,
    minimumPayment: 0,
    interestRate: null,
    aprText: '',
    dueDate: null,
    autopay: false,
  });

  // ============================================================================
  // Navigation
  // ============================================================================

  const getStepNumber = (): number => {
    const stepMap: Record<DebtFlowStep, number> = {
      intro: 17,
      type: 18,
      creditor: 19,
      details: 20, // Combined balance/payment/APR/due date/autopay
      summary: 21,
      confirmation: 22,
    };
    return stepMap[currentStep];
  };

  const goToNextStep = () => {
    const stepFlow: DebtFlowStep[] = [
      'intro',
      'type',
      'creditor',
      'details',
      'summary',
    ];

    const currentIndex = stepFlow.indexOf(currentStep);
    if (currentIndex < stepFlow.length - 1) {
      setCurrentStep(stepFlow[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const stepFlow: DebtFlowStep[] = [
      'intro',
      'type',
      'creditor',
      'details',
      'summary',
    ];

    const currentIndex = stepFlow.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepFlow[currentIndex - 1]);
    }
  };

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleStartDebtEntry = () => {
    setCurrentStep('type');
  };

  const handleSkipDebts = () => {
    markStepComplete('debt_flow');
    onContinue();
  };

  const handleSaveDebt = () => {
    // Convert to debt object format
    addDebt({
      type: currentDebt.type || 'credit-card',
      creditor: currentDebt.creditor || 'Unknown',
      balance: currentDebt.balance,
      minimumPayment: currentDebt.minimumPayment,
      apr: currentDebt.interestRate || 0,
      dueDate: currentDebt.dueDate || 1,
      status: 'open',
    });

    // Reset form
    setCurrentDebt({
      type: null,
      creditor: '',
      balance: 0,
      minimumPayment: 0,
      interestRate: null,
      aprText: '',
      dueDate: null,
      autopay: false,
    });
  };

  const handleAddAnother = () => {
    handleSaveDebt();
    // Go directly to type selection for next debt
    setCurrentStep('type');
  };

  const handleSaveAndViewList = () => {
    handleSaveDebt();
    // Go to intro to view all debts
    setCurrentStep('intro');
  };

  const handleFinishDebts = () => {
    markStepComplete('debt_flow');
    onContinue();
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 'intro':
        return true;
      case 'type':
        return currentDebt.type !== null;
      case 'creditor':
        return true; // Optional field
      case 'details':
        return currentDebt.balance > 0 && currentDebt.minimumPayment > 0;
      case 'summary':
        return true;
      default:
        return false;
    }
  };

  // ============================================================================
  // Render Steps
  // ============================================================================

  const renderIntroStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Let's map out your debts</Text>
      <Text style={styles.description}>
        You'll enter each debt one at a time. We'll build your Snowball Plan
        automatically. The more detail you provide, the better your plan.
      </Text>

      {debts.length > 0 && (
        <View style={styles.debtListContainer}>
          <Text style={styles.sectionTitle}>
            {debts.length} {debts.length === 1 ? 'debt' : 'debts'} entered
          </Text>
          {debts.map((debt, index) => (
            <GradientCard
              key={index}
              baseColor={isDark ? colors.background.dark : colors.background.light}
              useGradient={false}
              style={styles.debtCard}>
              <View style={styles.debtCardContent}>
                <View style={styles.debtCardLeft}>
                  <Text style={styles.debtCardCreditor}>{debt.creditor}</Text>
                  <Text style={styles.debtCardBalance}>
                    ${debt.balance.toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeDebt(index)}
                  style={styles.deleteButton}>
                  <TrashIcon size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </GradientCard>
          ))}
        </View>
      )}

      <View style={styles.buttonGroup}>
        <Button
          title={debts.length > 0 ? 'Add Another Debt' : 'Start Entering Debts'}
          variant="primary"
          size="large"
          onPress={handleStartDebtEntry}
          fullWidth
        />
        {debts.length > 0 && (
          <Button
            title="I'm Done Adding Debts"
            variant="secondary"
            size="large"
            onPress={handleFinishDebts}
            fullWidth
          />
        )}
        <TouchableOpacity
          onPress={handleSkipDebts}
          style={styles.skipButton}>
          <Text style={styles.skipText}>I don't have any debts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTypeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>What type of debt is this?</Text>
      <TileSelector
        options={[
          {id: 'credit-card', label: 'Credit Card', icon: 'CreditCardIcon'},
          {id: 'personal', label: 'Personal Loan', icon: 'UserIcon'},
          {id: 'student', label: 'Student Loan', icon: 'AcademicCapIcon'},
          {id: 'auto', label: 'Auto Loan', icon: 'TruckIcon'},
          {id: 'medical', label: 'Medical Debt', icon: 'HeartIcon'},
          {id: 'bnpl', label: 'Buy Now Pay Later', icon: 'ShoppingCartIcon'},
        ]}
        selectedIds={currentDebt.type ? [currentDebt.type] : []}
        onSelectionChange={ids => {
          setCurrentDebt({...currentDebt, type: ids[0] as DebtType});
          setTimeout(goToNextStep, 300); // Auto-advance
        }}
        columns={2}
        tileSize="medium"
      />
    </View>
  );

  const renderCreditorStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Who do you owe?</Text>
      <Text style={styles.description}>
        e.g., Chase, Capital One, Dr. Smith
      </Text>
      <TextInput
        style={styles.textInput}
        value={currentDebt.creditor}
        onChangeText={text => setCurrentDebt({...currentDebt, creditor: text})}
        placeholder="Creditor name (optional)"
        placeholderTextColor={
          isDark ? colors.text.secondary.dark : colors.text.secondary.light
        }
        autoFocus
      />
      <Button
        title="Continue"
        variant="primary"
        size="large"
        onPress={goToNextStep}
        fullWidth
      />
    </View>
  );

  const renderDetailsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Debt Details</Text>
      <Text style={styles.description}>
        Enter the key information from your statement
      </Text>

      {/* Balance */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Current Balance</Text>
        <CurrencyInput
          value={currentDebt.balance}
          onChangeValue={value => {
            setCurrentDebt({...currentDebt, balance: value});
          }}
          placeholder="0"
        />
      </View>

      {/* Minimum Payment */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Minimum Monthly Payment</Text>
        <CurrencyInput
          value={currentDebt.minimumPayment}
          onChangeValue={value =>
            setCurrentDebt({...currentDebt, minimumPayment: value})
          }
          placeholder="0"
        />
      </View>

      {/* Interest Rate (Optional) */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          Interest Rate (APR){' '}
          <Text style={styles.optionalText}>(optional)</Text>
        </Text>
        <View style={styles.percentInputContainer}>
          <TextInput
            style={styles.percentInput}
            value={currentDebt.aprText}
            onChangeText={text => {
              // Allow empty string, numbers, and decimals (including trailing decimal point)
              if (text === '' || /^\d*\.?\d*$/.test(text)) {
                // Update the text field
                setCurrentDebt({
                  ...currentDebt,
                  aprText: text,
                  interestRate: text === '' || text === '.' ? null : parseFloat(text) || null,
                });
              }
            }}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={
              isDark ? colors.text.secondary.dark : colors.text.secondary.light
            }
          />
          <Text style={styles.percentSymbol}>%</Text>
        </View>
      </View>

      {/* Payment Due Date (Optional) */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          Payment Due Date{' '}
          <Text style={styles.optionalText}>(day of month, optional)</Text>
        </Text>
        <TextInput
          style={styles.textInput}
          value={
            currentDebt.dueDate !== null ? currentDebt.dueDate.toString() : ''
          }
          onChangeText={text => {
            const day = parseInt(text, 10);
            setCurrentDebt({
              ...currentDebt,
              dueDate: isNaN(day) ? null : Math.max(1, Math.min(31, day)),
            });
          }}
          keyboardType="number-pad"
          placeholder="15"
          placeholderTextColor={
            isDark ? colors.text.secondary.dark : colors.text.secondary.light
          }
          maxLength={2}
        />
      </View>

      {/* Autopay */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          Auto-Pay Enabled?{' '}
          <Text style={styles.optionalText}>(optional)</Text>
        </Text>
        <View style={styles.autopayButtonGroup}>
          <TouchableOpacity
            style={[
              styles.autopayButton,
              currentDebt.autopay && styles.autopayButtonActive,
            ]}
            onPress={() => setCurrentDebt({...currentDebt, autopay: true})}>
            <Text
              style={[
                styles.autopayButtonText,
                currentDebt.autopay && styles.autopayButtonTextActive,
              ]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.autopayButton,
              !currentDebt.autopay && styles.autopayButtonActive,
            ]}
            onPress={() => setCurrentDebt({...currentDebt, autopay: false})}>
            <Text
              style={[
                styles.autopayButtonText,
                !currentDebt.autopay && styles.autopayButtonTextActive,
              ]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Continue"
        variant="primary"
        size="large"
        onPress={goToNextStep}
        disabled={!isStepValid()}
        fullWidth
      />
    </View>
  );


  const renderSummaryStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.summaryHeader}>
        <CheckCircleIcon size={48} color={colors.success} />
        <Text style={styles.summaryTitle}>Review This Debt</Text>
      </View>

      <GradientCard
        baseColor={isDark ? colors.background.dark : colors.background.light}
        useGradient={false}
        style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>
          {currentDebt.creditor || 'Unnamed Debt'}
        </Text>
        <Text style={styles.summaryCardType}>
          {currentDebt.type?.replace('-', ' ').toUpperCase()}
        </Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Balance:</Text>
          <Text style={styles.summaryValue}>
            ${currentDebt.balance.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Minimum Payment:</Text>
          <Text style={styles.summaryValue}>
            ${currentDebt.minimumPayment.toLocaleString()}
          </Text>
        </View>
        {currentDebt.interestRate !== null && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>APR:</Text>
            <Text style={styles.summaryValue}>
              {currentDebt.interestRate}%
            </Text>
          </View>
        )}
      </GradientCard>

      <Text style={styles.description}>
        Do you have more debts to add?
      </Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Add Another Debt"
          variant="primary"
          size="large"
          onPress={handleAddAnother}
          fullWidth
        />
        <Button
          title="View All Debts"
          variant="secondary"
          size="large"
          onPress={handleSaveAndViewList}
          fullWidth
        />
      </View>
    </View>
  );

  // ============================================================================
  // Main Render
  // ============================================================================

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'intro':
        return renderIntroStep();
      case 'type':
        return renderTypeStep();
      case 'creditor':
        return renderCreditorStep();
      case 'details':
        return renderDetailsStep();
      case 'summary':
        return renderSummaryStep();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <OnboardingProgress
        current={getStepNumber()}
        total={43}
        showPercentage={false}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {renderCurrentStep()}
      </ScrollView>
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
      paddingBottom: spacing.xl * 2,
    } as ViewStyle,

    stepContainer: {
      flex: 1,
      gap: spacing.lg,
    } as ViewStyle,

    title: {
      ...typography.styles.title2,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.sm,
    } as TextStyle,

    description: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.body,
    } as TextStyle,

    sectionTitle: {
      ...typography.styles.headline,
      fontWeight: typography.fontWeight.semibold,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.sm,
    } as TextStyle,

    textInput: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: spacing.radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 56,
    } as TextStyle,

    percentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: spacing.radius.md,
      paddingHorizontal: spacing.md,
      minHeight: 56,
    } as ViewStyle,

    percentInput: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      flex: 1,
      paddingVertical: spacing.sm,
    } as TextStyle,

    percentSymbol: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      marginLeft: spacing.xs,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    fieldGroup: {
      marginBottom: spacing.lg,
    } as ViewStyle,

    fieldLabel: {
      ...typography.styles.subheadline,
      fontWeight: typography.fontWeight.semibold,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.sm,
    } as TextStyle,

    optionalText: {
      ...typography.styles.caption1,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      fontWeight: typography.fontWeight.regular,
    } as TextStyle,

    autopayButtonGroup: {
      flexDirection: 'row',
      gap: spacing.sm,
    } as ViewStyle,

    autopayButton: {
      flex: 1,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      borderRadius: spacing.radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 56,
    } as ViewStyle,

    autopayButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    } as ViewStyle,

    autopayButtonText: {
      ...typography.styles.body,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.semibold,
    } as TextStyle,

    autopayButtonTextActive: {
      color: '#FFFFFF',
    } as TextStyle,

    buttonGroup: {
      gap: spacing.md,
      marginTop: spacing.lg,
    } as ViewStyle,

    skipButton: {
      alignSelf: 'center',
      paddingVertical: spacing.sm,
    } as ViewStyle,

    skipText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textDecorationLine: 'underline',
    } as TextStyle,

    debtListContainer: {
      marginTop: spacing.lg,
    } as ViewStyle,

    debtCard: {
      marginBottom: spacing.sm,
      padding: spacing.md,
    } as ViewStyle,

    debtCardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,

    debtCardLeft: {
      flex: 1,
    } as ViewStyle,

    debtCardCreditor: {
      ...typography.styles.headline,
      fontWeight: typography.fontWeight.semibold,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
    } as TextStyle,

    debtCardBalance: {
      ...typography.styles.title3,
      color: colors.primary,
      marginTop: spacing.xs,
    } as TextStyle,

    deleteButton: {
      padding: spacing.sm,
    } as ViewStyle,

    summaryHeader: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    } as ViewStyle,

    summaryTitle: {
      ...typography.styles.title1,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginTop: spacing.md,
    } as TextStyle,

    summaryCard: {
      padding: spacing.lg,
    } as ViewStyle,

    summaryCardTitle: {
      ...typography.styles.title2,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: spacing.xs,
    } as TextStyle,

    summaryCardType: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      marginBottom: spacing.md,
    } as TextStyle,

    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    } as ViewStyle,

    summaryLabel: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
    } as TextStyle,

    summaryValue: {
      ...typography.styles.body,
      fontWeight: typography.fontWeight.semibold,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingDebtFlowScreen;
