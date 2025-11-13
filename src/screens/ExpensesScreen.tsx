/**
 * Expenses & Budgets Screen
 * Action Mode - Low-friction logging and budget management
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  colors,
  spacing,
  typography,
  oceanTeal,
  getColor,
} from '../theme';
import {GradientCard, ProgressBar} from '../components';
import {useTheme} from '../contexts';

// Background colors for subtle gradient cards
const cardBaseColors = {
  light: colors.background.light,
  dark: colors.background.dark,
};
import {
  mockBudget,
  mockExpenseSummary,
  mockExpenses,
  getCategoryIcon,
} from '../services/mockData';
import {formatCurrency, formatDate} from '../utils';
import {Expense} from '../types';

type FilterPeriod = 'Daily' | 'Weekly' | 'Monthly';

export const ExpensesScreen: React.FC = () => {
  const {isDark} = useTheme();
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('Daily');

  // Calculate budget metrics
  const totalBudget = mockExpenseSummary.budgetAllocated;
  const budgetRemaining = mockExpenseSummary.remaining;
  const budgetSpent = mockExpenseSummary.totalSpent;
  const percentageSpent = Math.round((budgetSpent / totalBudget) * 100);

  // Filter expenses - for now just showing mock data
  // In real app, would filter based on period
  const todaysExpenses = mockExpenses.slice(0, 4);
  const previousExpenses = mockExpenses.slice(4, 8);

  // Get icon for category with colored background
  const getCategoryIconWithColor = (category: string) => {
    const iconColors: {[key: string]: string} = {
      food: '#4A90E2',
      transportation: '#9B59B6',
      shopping: '#E67E22',
      utilities: '#27AE60',
      entertainment: '#E74C3C',
      healthcare: '#1ABC9C',
      personal: '#F39C12',
      other: '#95A5A6',
    };

    return {
      icon: getCategoryIcon(category),
      color: iconColors[category] || iconColors.other,
    };
  };

  const renderExpenseItem = (expense: Expense) => {
    const {icon, color: bgColor} = getCategoryIconWithColor(expense.category);

    // Format date display
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateDisplay = '';
    if (formatDate(expense.date, 'short') === formatDate(today, 'short')) {
      dateDisplay = 'Today';
    } else if (
      formatDate(expense.date, 'short') === formatDate(yesterday, 'short')
    ) {
      dateDisplay = 'Yesterday';
    } else {
      dateDisplay = formatDate(expense.date, 'short');
    }

    return (
      <GradientCard
        key={expense.id}
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.expenseCard}>
        <TouchableOpacity style={styles.expenseItem} activeOpacity={0.7}>
          {/* Icon */}
          <View style={[styles.expenseIcon, {backgroundColor: bgColor + '20'}]}>
            <Text style={styles.iconEmoji}>{icon}</Text>
          </View>

          {/* Details */}
          <View style={styles.expenseDetails}>
            <Text
              style={[
                styles.expenseName,
                {
                  color: isDark
                    ? colors.text.primary.dark
                    : colors.text.primary.light,
                },
              ]}>
              {expense.description}
            </Text>
            <Text
              style={[
                styles.expenseDate,
                {
                  color: isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
              ]}>
              {dateDisplay}
            </Text>
          </View>

          {/* Amount */}
          <Text style={styles.expenseAmount}>
            -{formatCurrency(expense.amount)}
          </Text>
        </TouchableOpacity>
      </GradientCard>
    );
  };

  const styles = getStyles(isDark);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Income Card */}
        <GradientCard
          baseColor={getColor(oceanTeal, isDark)}
          style={styles.incomeCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Your Monthly Income</Text>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <Text style={styles.editButtonText}>✏️ Edit Income</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.incomeAmount}>
            {formatCurrency(mockBudget.monthlyIncome, false)}
          </Text>
        </GradientCard>

        {/* Budget Card */}
        <GradientCard
          baseColor={getColor(oceanTeal, isDark)}
          style={styles.budgetCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Your Spending Budget</Text>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <Text style={styles.editButtonText}>🔧 Adjust Budget</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.budgetSubtitle}>
            Total Budget: {formatCurrency(totalBudget, false)}
          </Text>

          <Text style={styles.budgetRemainingLabel}>Budget Remaining</Text>
          <Text style={styles.budgetRemainingAmount}>
            {formatCurrency(budgetRemaining, false)}
          </Text>

          <Text style={styles.budgetPercentageText}>
            You've spent {percentageSpent}% of your budget
          </Text>

          <ProgressBar
            progress={percentageSpent}
            color="#FFFFFF"
            backgroundColor="rgba(255, 255, 255, 0.3)"
            height={8}
            showPercentage={false}
            style={styles.progressBar}
          />
        </GradientCard>

        {/* Today's Expenses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Expenses</Text>
          {todaysExpenses.map(expense => renderExpenseItem(expense))}
        </View>

        {/* Previous Expenses Section */}
        <View style={styles.section}>
          <View style={styles.previousHeader}>
            <Text style={styles.sectionTitle}>Previous Expenses</Text>

            <TouchableOpacity
              style={styles.filterButton}
              activeOpacity={0.7}
              onPress={() => {
                // Cycle through filter options
                const options: FilterPeriod[] = ['Daily', 'Weekly', 'Monthly'];
                const currentIndex = options.indexOf(filterPeriod);
                const nextIndex = (currentIndex + 1) % options.length;
                setFilterPeriod(options[nextIndex]);
              }}>
              <Text style={styles.filterButtonText}>{filterPeriod} ▾</Text>
            </TouchableOpacity>
          </View>
          {previousExpenses.map(expense => renderExpenseItem(expense))}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? colors.background.dark : colors.background.light,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.lg,
  },

  // Section Styles
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
    marginBottom: spacing.md,
  },

  // Income Card Styles
  incomeCard: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardLabel: {
    ...typography.styles.subheadline,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  editButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  editButtonText: {
    ...typography.styles.caption1,
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.medium,
  },
  incomeAmount: {
    ...typography.styles.largeTitle,
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.bold,
  },

  // Budget Card Styles
  budgetCard: {
    marginBottom: spacing.lg,
  },
  budgetSubtitle: {
    ...typography.styles.footnote,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: spacing.md,
  },
  budgetRemainingLabel: {
    ...typography.styles.title2,
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
  },
  budgetRemainingAmount: {
    ...typography.styles.largeTitle,
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.sm,
  },
  budgetPercentageText: {
    ...typography.styles.footnote,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: spacing.sm,
  },
  progressBar: {
    marginTop: spacing.xs,
  },

  // Previous Expenses Header
  previousHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  filterButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  filterButtonText: {
    ...typography.styles.subheadline,
    fontFamily: typography.fontFamily.regular,
    color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
  },

  // Expense Card Styles
  expenseCard: {
    marginBottom: spacing.sm,
    padding: 0, // GradientCard handles padding
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseIcon: {
    width: 44,
    height: 44,
    borderRadius: spacing.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconEmoji: {
    fontSize: 24,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseName: {
    ...typography.styles.body,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs / 2,
  },
  expenseDate: {
    ...typography.styles.footnote,
  },
  expenseAmount: {
    ...typography.styles.title3,
    fontFamily: typography.fontFamily.bold,
    color: colors.error,
  },

  // Bottom spacing for scroll
  bottomSpacer: {
    height: spacing.xl,
  },
});
