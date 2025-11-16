/**
 * OnboardingInsightScreen
 * Handles Screens 35-36: Snowball Power Score & Personalized Insights
 * Shows calculated debt payoff projections and AI-generated insights
 */

import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button, GradientCard} from '../../components';
import {OnboardingProgress} from '../../components/onboarding';
import {useOnboardingStore} from '../../stores/onboardingStore';
import {
  CalendarIcon,
  BanknotesIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
} from 'react-native-heroicons/solid';

// ============================================================================
// Types
// ============================================================================

export interface OnboardingInsightScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

interface SnowballCalculation {
  totalDebt: number;
  monthlyPayment: number;
  payoffMonths: number;
  payoffDate: string;
  interestSaved: number;
  accelerationPercent: number;
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingInsightScreen: React.FC<
  OnboardingInsightScreenProps
> = ({onContinue, onBack}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const debts = useOnboardingStore(state => state.debts);
  const income = useOnboardingStore(state => state.income);
  const monthlyExpenses = useOnboardingStore(state => state.monthlyExpenses);
  const planIntensity = useOnboardingStore(state => state.planIntensity);
  const subscriptions = useOnboardingStore(state => state.subscriptions);
  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ============================================================================
  // Calculations
  // ============================================================================

  const calculateSnowball = (): SnowballCalculation => {
    // Calculate total debt
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

    // Calculate total monthly expenses
    const totalExpenses = Object.values(monthlyExpenses).reduce(
      (sum, exp) => sum + exp,
      0,
    );

    // Calculate available monthly payment
    const availableIncome = income.primary - totalExpenses;

    // Adjust based on plan intensity
    let snowballPayment = 0;
    switch (planIntensity) {
      case 'slow':
        snowballPayment = availableIncome * 0.1; // 10% of available
        break;
      case 'standard':
        snowballPayment = availableIncome * 0.25; // 25% of available
        break;
      case 'gazelle':
        snowballPayment = availableIncome * 0.5; // 50% of available
        break;
      default:
        snowballPayment = availableIncome * 0.25;
    }

    // Add minimum payments
    const totalMinPayments = debts.reduce(
      (sum, debt) => sum + debt.minimumPayment,
      0,
    );
    const totalMonthlyPayment = totalMinPayments + snowballPayment;

    // Simple payoff calculation (ignoring interest for MVP)
    const payoffMonths = Math.ceil(totalDebt / totalMonthlyPayment);

    // Calculate payoff date
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + payoffMonths);

    // Estimate interest saved (rough calculation)
    const avgAPR = debts.length > 0
      ? debts.reduce((sum, debt) => sum + (debt.apr || 0), 0) / debts.length
      : 0;
    const interestSaved = Math.round((totalDebt * (avgAPR / 100) * payoffMonths) / 12 * 0.3);

    // Calculate acceleration vs minimum-only
    const minOnlyMonths = Math.ceil(totalDebt / totalMinPayments);
    const accelerationPercent = Math.round(
      ((minOnlyMonths - payoffMonths) / minOnlyMonths) * 100,
    );

    return {
      totalDebt,
      monthlyPayment: totalMonthlyPayment,
      payoffMonths,
      payoffDate: payoffDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      interestSaved,
      accelerationPercent: Math.max(0, accelerationPercent),
    };
  };

  const getInsights = () => {
    const calculation = calculateSnowball();

    // Find highest APR debt
    const highestAPRDebt = debts.reduce((max, debt) =>
      (debt.apr || 0) > (max.apr || 0) ? debt : max,
    );

    // Find smallest debt (quick win)
    const smallestDebt = debts.reduce((min, debt) =>
      debt.balance < min.balance ? debt : min,
    );

    // Calculate subscription cost
    const subscriptionCost = subscriptions.length * 15; // Rough estimate

    return {
      calculation,
      highestAPRDebt,
      smallestDebt,
      subscriptionCost,
    };
  };

  const insights = getInsights();

  const handleContinue = () => {
    markStepComplete('snowball_insights');
    onContinue();
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      {/* Progress */}
      <OnboardingProgress current={35} total={43} showPercentage={false} />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}>
          {/* Header */}
          <View style={styles.header}>
            <RocketLaunchIcon size={56} color={colors.primary} />
            <Text style={styles.title}>Your Debt Freedom Blueprint</Text>
            <Text style={styles.subtitle}>
              Here's your personalized snowball plan
            </Text>
          </View>

          {/* Key Metrics */}
          <View style={styles.metricsContainer}>
            {/* Payoff Acceleration */}
            <GradientCard
              baseColor={colors.success}
              useGradient={true}
              style={styles.metricCard}>
              <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>Payoff Acceleration</Text>
                <Text style={styles.metricValue}>
                  {insights.calculation.accelerationPercent}% faster
                </Text>
                <Text style={styles.metricDescription}>
                  vs. minimum payments only
                </Text>
              </View>
            </GradientCard>

            {/* Interest Savings */}
            <GradientCard
              baseColor={colors.primary}
              useGradient={true}
              style={styles.metricCard}>
              <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>Estimated Savings</Text>
                <Text style={styles.metricValue}>
                  ${insights.calculation.interestSaved.toLocaleString()}
                </Text>
                <Text style={styles.metricDescription}>
                  in interest with this plan
                </Text>
              </View>
            </GradientCard>

            {/* Debt-Free Date */}
            <GradientCard
              baseColor={colors.accent}
              useGradient={true}
              style={styles.metricCard}>
              <View style={styles.metricContent}>
                <CalendarIcon size={32} color="#FFFFFF" />
                <Text style={styles.metricLabel}>Projected Debt-Free</Text>
                <Text style={styles.metricValue}>
                  {insights.calculation.payoffDate}
                </Text>
                <Text style={styles.metricDescription}>
                  {insights.calculation.payoffMonths} months from now
                </Text>
              </View>
            </GradientCard>
          </View>

          {/* Insights Section */}
          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>Key Insights</Text>

            {/* Debt Strategy */}
            {debts.length > 0 && (
              <View style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <ExclamationTriangleIcon size={24} color={colors.error} />
                  <Text style={styles.insightTitle}>Highest Priority</Text>
                </View>
                <Text style={styles.insightText}>
                  Your highest-interest debt: {insights.highestAPRDebt.creditor}{' '}
                  at {insights.highestAPRDebt.apr}% APR
                </Text>
              </View>
            )}

            {/* Quick Win */}
            {debts.length > 0 && (
              <View style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <CheckCircleIcon size={24} color={colors.success} />
                  <Text style={styles.insightTitle}>Quick Win</Text>
                </View>
                <Text style={styles.insightText}>
                  Your smallest debt: {insights.smallestDebt.creditor} ($
                  {insights.smallestDebt.balance.toLocaleString()}) — payoff
                  first for motivation!
                </Text>
              </View>
            )}

            {/* Subscription Opportunity */}
            {subscriptions.length > 0 && (
              <View style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <LightBulbIcon size={24} color={colors.warning} />
                  <Text style={styles.insightTitle}>Savings Opportunity</Text>
                </View>
                <Text style={styles.insightText}>
                  You have {subscriptions.length} subscriptions. Review them to
                  find $
                  {Math.round(insights.subscriptionCost * 0.3).toLocaleString()}
                  /month in potential savings
                </Text>
              </View>
            )}

            {/* Monthly Payment */}
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <BanknotesIcon size={24} color={colors.primary} />
                <Text style={styles.insightTitle}>Your Snowball Payment</Text>
              </View>
              <Text style={styles.insightText}>
                Target monthly payment: $
                {insights.calculation.monthlyPayment.toLocaleString()} to stay
                on track
              </Text>
            </View>
          </View>

          {/* CTA */}
          <Button
            title="See Your Full Plan"
            variant="primary"
            size="large"
            onPress={handleContinue}
            fullWidth
          />
        </Animated.View>
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

    header: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    } as ViewStyle,

    title: {
      ...typography.styles.largeTitle,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      textAlign: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    } as TextStyle,

    subtitle: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
    } as TextStyle,

    metricsContainer: {
      gap: spacing.md,
      marginBottom: spacing.xl,
    } as ViewStyle,

    metricCard: {
      padding: spacing.lg,
      alignItems: 'center',
    } as ViewStyle,

    metricContent: {
      alignItems: 'center',
      gap: spacing.xs,
    } as ViewStyle,

    metricLabel: {
      ...typography.styles.caption1,
      color: '#FFFFFF',
      opacity: 0.9,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,

    metricValue: {
      ...typography.styles.largeTitle,
      color: '#FFFFFF',
      fontWeight: typography.fontWeight.bold,
    } as TextStyle,

    metricDescription: {
      ...typography.styles.footnote,
      color: '#FFFFFF',
      opacity: 0.8,
      textAlign: 'center',
    } as TextStyle,

    insightsSection: {
      marginBottom: spacing.xl,
    } as ViewStyle,

    sectionTitle: {
      ...typography.styles.title2,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.bold,
      marginBottom: spacing.md,
    } as TextStyle,

    insightCard: {
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderRadius: spacing.radius.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
    } as ViewStyle,

    insightHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    } as ViewStyle,

    insightTitle: {
      ...typography.styles.headline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.semibold,
    } as TextStyle,

    insightText: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.body,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingInsightScreen;
