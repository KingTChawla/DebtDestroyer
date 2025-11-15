/**
 * DebtCard Component
 * Display card for entered debts in onboarding flow
 * Shows debt summary with edit and delete actions
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing, shadows} from '../../theme';
import {PencilIcon, TrashIcon} from 'react-native-heroicons/outline';
import {Debt} from '../../types';

// ============================================================================
// Types
// ============================================================================

export interface DebtCardProps {
  debt: Omit<Debt, 'id' | 'userId'>;
  index: number;
  showOrder?: boolean; // Show snowball order number
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  compact?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const DebtCard: React.FC<DebtCardProps> = ({
  debt,
  index,
  showOrder = false,
  onEdit,
  onDelete,
  compact = false,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark, compact);

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatAPR = (apr?: number): string => {
    if (!apr) return 'N/A';
    return `${apr.toFixed(2)}%`;
  };

  const getDebtTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'credit-card': 'Credit Card',
      'personal': 'Personal Loan',
      'auto': 'Auto Loan',
      'student': 'Student Loan',
      'medical': 'Medical Debt',
      'bnpl': 'Buy Now Pay Later',
    };
    return labels[type] || type;
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        {/* Order Badge (if shown) */}
        {showOrder && (
          <View style={styles.orderBadge}>
            <Text style={styles.orderText}>#{index + 1}</Text>
          </View>
        )}

        {/* Debt Name and Type */}
        <View style={styles.headerText}>
          <Text style={styles.debtName} numberOfLines={1}>
            {debt.name || getDebtTypeLabel(debt.type)}
          </Text>
          <Text style={styles.debtType}>{getDebtTypeLabel(debt.type)}</Text>
        </View>

        {/* Action Buttons */}
        {(onEdit || onDelete) && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onEdit(index)}
                activeOpacity={0.7}>
                <PencilIcon
                  size={20}
                  color={
                    isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light
                  }
                />
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onDelete(index)}
                activeOpacity={0.7}>
                <TrashIcon size={20} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Debt Details */}
      {!compact && (
        <View style={styles.details}>
          {/* Balance */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Balance</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(debt.currentBalance)}
            </Text>
          </View>

          {/* Minimum Payment */}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Min. Payment</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(debt.minPayment)}
            </Text>
          </View>

          {/* APR */}
          {debt.apr !== undefined && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>APR</Text>
              <Text style={styles.detailValue}>{formatAPR(debt.apr)}</Text>
            </View>
          )}
        </View>
      )}

      {/* Compact Details (single line) */}
      {compact && (
        <View style={styles.compactDetails}>
          <Text style={styles.compactText}>
            {formatCurrency(debt.currentBalance)} • {formatCurrency(debt.minPayment)}/mo
            {debt.apr !== undefined && ` • ${formatAPR(debt.apr)} APR`}
          </Text>
        </View>
      )}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean, compact: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderRadius: spacing.radius.lg,
      padding: compact ? spacing.md : spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      ...shadows.sm,
    } as ViewStyle,

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: compact ? 0 : spacing.md,
    } as ViewStyle,

    orderBadge: {
      width: 32,
      height: 32,
      borderRadius: spacing.radius.full,
      backgroundColor: `${colors.primary}20`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    } as ViewStyle,

    orderText: {
      ...typography.styles.caption1,
      color: colors.primary,
      fontFamily: typography.fontFamily.bold,
    } as TextStyle,

    headerText: {
      flex: 1,
    } as ViewStyle,

    debtName: {
      ...typography.styles.headline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: 2,
    } as TextStyle,

    debtType: {
      ...typography.styles.footnote,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
    } as TextStyle,

    actions: {
      flexDirection: 'row',
      gap: spacing.sm,
    } as ViewStyle,

    actionButton: {
      padding: spacing.sm,
    } as ViewStyle,

    details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    } as ViewStyle,

    detailItem: {
      flex: 1,
    } as ViewStyle,

    detailLabel: {
      ...typography.styles.caption1,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
      marginBottom: 4,
    } as TextStyle,

    detailValue: {
      ...typography.styles.callout,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    compactDetails: {
      marginTop: spacing.sm,
    } as ViewStyle,

    compactText: {
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

export default DebtCard;
