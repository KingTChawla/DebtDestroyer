/**
 * Dashboard Screen
 * Matching the Dashboard_Mockup design
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {colors, spacing, typography, shadows} from '../theme';
import {formatCurrency, getDebtTypeLabel} from '../utils';
import {
  mockDebts,
  getTotalDebt,
  getMonthsUntilDebtFree,
  getNextDebtToPayOff,
} from '../services/mockData';

export const DashboardScreen: React.FC = () => {
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header - shown by navigation, we just need content */}

      {/* Total Debt Countdown Card */}
      <View style={styles.section}>
        <View style={styles.totalDebtCard}>
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
        </View>
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

          <TouchableOpacity style={styles.priorityDebtCard}>
            <View style={styles.priorityDebtHeader}>
              <View style={styles.debtIconContainer}>
                <Text style={styles.debtIcon}>💳</Text>
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
                <Text style={styles.rocketIcon}>🚀</Text>
                <Text style={styles.accelerateText}>Accelerate Payment</Text>
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
            <TouchableOpacity key={debt.id} style={styles.otherDebtCard}>
              <View style={styles.otherDebtContent}>
                <View>
                  <Text style={styles.otherDebtName}>{debt.name}</Text>
                  <Text style={styles.otherDebtBalance}>
                    Balance: {formatCurrency(debt.currentBalance)}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Progress Analytics Section */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Your Progress Analytics</Text>

        <View style={styles.analyticsCard}>
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
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F2E', // Dark blue-gray background
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
    color: '#FFFFFF',
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
    letterSpacing: 1,
  },

  // Total Debt Card (Purple Gradient)
  totalDebtCard: {
    backgroundColor: '#A855F7', // Purple
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.md,
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
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  totalDebtAmount: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 48,
  },
  totalDebtRight: {
    alignItems: 'flex-end',
  },
  debtFreeLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs / 2,
    letterSpacing: 0.5,
  },
  debtFreeMonths: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 48,
  },
  debtFreeUnit: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: typography.fontSize.base,
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
    textAlign: 'right',
  },

  // Priority Debt Card (Blue)
  priorityDebtCard: {
    backgroundColor: '#5B7FBF', // Medium blue
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.md,
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
  debtIcon: {
    fontSize: 24,
  },
  priorityDebtInfo: {
    flex: 1,
  },
  priorityDebtName: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs / 2,
  },
  priorityDebtType: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: typography.fontSize.xs,
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
    marginBottom: spacing.xs / 2,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
  },
  accelerateButton: {
    backgroundColor: '#FB8C00',
    borderRadius: spacing.radius.full,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  rocketIcon: {
    fontSize: 24,
  },
  accelerateText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: typography.fontWeight.semibold,
    marginTop: 2,
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
  },

  // Other Debts
  otherDebtCard: {
    backgroundColor: '#2A3242',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  otherDebtContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otherDebtName: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs / 2,
  },
  otherDebtBalance: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: typography.fontSize.sm,
  },
  chevron: {
    color: '#5B7FBF',
    fontSize: 32,
    fontWeight: typography.fontWeight.bold,
  },

  // Analytics Section
  analyticsCard: {
    backgroundColor: '#2A3242',
    borderRadius: 20,
    padding: spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.semibold,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: spacing.md,
  },
  chartPlaceholderText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: typography.fontSize.sm,
  },
  analyticsSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },

  bottomPadding: {
    height: spacing.xl,
  },
});
