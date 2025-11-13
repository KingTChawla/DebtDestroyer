/**
 * Dashboard Screen
 * Matching the Dashboard_Mockup design
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {colors, spacing, typography, shadows, forestFade, sapphireNight, getColor} from '../theme';
import {formatCurrency, getDebtTypeLabel} from '../utils';
import {
  mockDebts,
  getTotalDebt,
  getMonthsUntilDebtFree,
  getNextDebtToPayOff,
} from '../services/mockData';
import {CreditCardIcon, RocketLaunchIcon, ChevronRightIcon} from 'react-native-heroicons/solid';
import {GradientCard, ScrollAwareHeader} from '../components';
import {useTheme} from '../contexts';

// Background colors for subtle gradient cards
const cardBaseColors = {
  light: colors.background.light,
  dark: colors.background.dark,
};

export const DashboardScreen: React.FC = () => {
  const {isDark} = useTheme();
  const [selectedTab, setSelectedTab] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Daily');

  const totalDebt = getTotalDebt();
  const monthsUntilDebtFree = getMonthsUntilDebtFree();
  const nextDebt = getNextDebtToPayOff();
  const openDebts = mockDebts.filter(d => d.status === 'open');
  const otherDebts = openDebts.slice(1);

  // Calculate debt crushed percentage
  const totalOriginalDebt = mockDebts.reduce((sum, d) => sum + d.principal, 0);
  const totalPaidOff = totalOriginalDebt - totalDebt;
  const percentCrushed = Math.round((totalPaidOff / totalOriginalDebt) * 100);

  // Calculate priority debt progress
  const priorityDebtPaid = nextDebt ? nextDebt.principal - nextDebt.currentBalance : 0;
  const priorityDebtProgress = nextDebt
    ? Math.round((priorityDebtPaid / nextDebt.principal) * 100)
    : 0;

  const styles = getStyles(isDark);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => {
        // Handle scroll events if needed
        // Note: Header shadow is handled by the navigation system
      }}
      scrollEventThrottle={16} // Throttle scroll events
    >
        {/* Header - shown by navigation, we just need content */}

      {/* Total Debt Countdown Card */}
      <View style={styles.section}>
        <GradientCard baseColor={getColor(forestFade, isDark)} style={styles.totalDebtCard}>
          <View style={styles.totalDebtHeader}>
            <View style={styles.totalDebtLeft}>
              <Text style={styles.totalDebtLabel}>TOTAL DEBT{'\n'}COUNTDOWN</Text>
              <Text style={styles.totalDebtAmount}>{formatCurrency(totalDebt)}</Text>
            </View>
            <View style={styles.totalDebtRight}>
              <Text style={styles.debtFreeLabel}>DEBT-FREE IN</Text>
              <Text style={styles.debtFreeMonths}>{monthsUntilDebtFree}</Text>
              <Text style={styles.debtFreeUnit}>months</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressBarFill,
                  {width: `${percentCrushed}%`},
                ]}
              />
            </View>
          </View>

          <Text style={styles.progressText}>
            {percentCrushed}% of total debt crushed!
          </Text>
        </GradientCard>
      </View>

      {/* Priority Debt Section */}
      {nextDebt && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Priority Debt</Text>
            <View style={styles.snowballBadge}>
              <Text style={styles.snowballText}>SNOWBALL</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => console.log('Priority debt pressed')} activeOpacity={0.8}>
          <GradientCard baseColor={getColor(sapphireNight, isDark)} style={styles.priorityDebtCard}>
            <View style={styles.priorityDebtHeader}>
              <View style={styles.debtIconContainer}>
                <CreditCardIcon size={28} color="#FFFFFF" />
              </View>
              <View style={styles.priorityDebtInfo}>
                <Text style={styles.priorityDebtName}>{nextDebt.name}</Text>
                <Text style={styles.priorityDebtType}>
                  {getDebtTypeLabel(nextDebt.type).toUpperCase()}
                </Text>
              </View>
              <View style={styles.orderBadge}>
                <Text style={styles.orderBadgeText}>#{nextDebt.payoffOrder}</Text>
              </View>
            </View>

            <View style={styles.priorityDebtBody}>
              <View style={styles.balanceSection}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(nextDebt.currentBalance)}
                </Text>
              </View>

              <TouchableOpacity style={styles.accelerateButton}>
                <RocketLaunchIcon size={28} color="#FFFFFF" />
                <Text style={styles.accelerateText}>Accelerate</Text>
              </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.debtProgressContainer}>
              <View style={styles.debtProgressBar}>
                <View
                  style={[
                    styles.debtProgressFill,
                    {width: `${priorityDebtProgress}%`},
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>{priorityDebtProgress}%{'\n'}Paid</Text>
            </View>

            <View style={styles.priorityDebtFooter}>
              <Text style={styles.footerText}>
                Min. Payment: {formatCurrency(nextDebt.minPayment)}
              </Text>
              <Text style={styles.footerText}>APR: {nextDebt.apr.toFixed(2)}%</Text>
            </View>
          </GradientCard>
        </TouchableOpacity>
        </View>
      )}

      {/* Other Debts Section */}
      {otherDebts.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Other Debts ({otherDebts.length})</Text>
            <View style={styles.snowballBadge}>
              <Text style={styles.snowballText}>SNOWBALL</Text>
            </View>
          </View>

          {otherDebts.map(debt => (
            <GradientCard
              key={debt.id}
              baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
              useGradient={false}
              style={styles.otherDebtCard}>
              <TouchableOpacity style={styles.otherDebtContent} activeOpacity={0.7}>
                <View>
                  <Text style={styles.otherDebtName}>{debt.name}</Text>
                  <Text style={styles.otherDebtBalance}>
                    Balance: {formatCurrency(debt.currentBalance)}
                  </Text>
                </View>
                <ChevronRightIcon size={24} color={isDark ? '#7B9FDF' : '#5B7FBF'} />
              </TouchableOpacity>
            </GradientCard>
          ))}
        </View>
      )}

      {/* Progress Analytics Section */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Your Progress Analytics</Text>

        <GradientCard baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light} useGradient={false}>
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {(['Daily', 'Weekly', 'Monthly', 'Yearly'] as const).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && styles.tabActive,
                ]}
                onPress={() => setSelectedTab(tab)}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextActive,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Chart Placeholder */}
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Debt progress chart will appear here
            </Text>
          </View>

          <Text style={styles.analyticsSubtitle}>
            Visualizing your debt payoff journey.
          </Text>
        </GradientCard>
      </View>

      <View style={styles.bottomPadding} />
      </ScrollView>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? colors.background.dark : colors.background.light,
  },
  section: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  lastSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
  },
  snowballBadge: {
    backgroundColor: 'rgba(67, 160, 71, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: spacing.radius.sm,
  },
  snowballText: {
    color: '#43A047',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    letterSpacing: 1,
  },

  // Total Debt Card (Forest Fade Gradient)
  totalDebtCard: {
    // Padding handled by GradientCard component
  },
  totalDebtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  totalDebtLeft: {
    flex: 1,
  },
  totalDebtLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  totalDebtAmount: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    lineHeight: 48,
  },
  totalDebtRight: {
    alignItems: 'flex-end',
  },
  debtFreeLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs / 2,
    letterSpacing: 0.5,
  },
  debtFreeMonths: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    lineHeight: 48,
  },
  debtFreeUnit: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
  },
  progressBarContainer: {
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'right',
  },

  // Priority Debt Card (Sapphire Night Gradient)
  priorityDebtCard: {
    // Padding handled by GradientCard component
  },
  priorityDebtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  debtIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  priorityDebtInfo: {
    flex: 1,
  },
  priorityDebtName: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.xs / 2,
  },
  priorityDebtType: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    letterSpacing: 0.5,
  },
  orderBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: spacing.radius.full,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBadgeText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  priorityDebtBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  balanceSection: {},
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.xs / 2,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  accelerateButton: {
    backgroundColor: '#FB8C00',
    borderRadius: spacing.radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    ...shadows.md,
  },
  accelerateText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
  },
  debtProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  debtProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: spacing.sm,
  },
  debtProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressPercentage: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    textAlign: 'right',
    lineHeight: 14,
  },
  priorityDebtFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },

  // Other Debts
  otherDebtCard: {
    marginBottom: spacing.sm,
    padding: 0, // GradientCard handles padding
  },
  otherDebtContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otherDebtName: {
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs / 2,
  },
  otherDebtBalance: {
    color: isDark ? 'rgba(255, 255, 255, 0.6)' : colors.text.secondary.light,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },

  // Analytics Section
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#5B7FBF',
  },
  tabText: {
    color: isDark ? 'rgba(255, 255, 255, 0.5)' : colors.text.secondary.light,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)',
    marginBottom: spacing.md,
  },
  chartPlaceholderText: {
    color: isDark ? 'rgba(255, 255, 255, 0.4)' : colors.text.secondary.light,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },
  analyticsSubtitle: {
    color: isDark ? 'rgba(255, 255, 255, 0.5)' : colors.text.secondary.light,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },

  bottomPadding: {
    height: spacing.xl,
  },
});
