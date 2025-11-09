/**
 * DebtCard Component
 * Display debt information with progress
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {Debt} from '../types';
import {colors, spacing, typography, shadows} from '../theme';
import {formatCurrency} from '../utils';
import {ProgressBar} from './ProgressBar';

interface DebtCardProps {
  debt: Debt;
  onPress?: () => void;
  showProgress?: boolean;
}

export const DebtCard: React.FC<DebtCardProps> = ({
  debt,
  onPress,
  showProgress = true,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const percentPaid = ((debt.principal - debt.currentBalance) / debt.principal) * 100;

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
        },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text
            style={[
              styles.name,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            {debt.name}
          </Text>
          <Text
            style={[
              styles.type,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            {debt.type.replace('-', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={styles.orderBadge}>
          <Text style={styles.orderText}>#{debt.payoffOrder}</Text>
        </View>
      </View>

      <View style={styles.amounts}>
        <View style={styles.amountItem}>
          <Text
            style={[
              styles.amountLabel,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            Current Balance
          </Text>
          <Text style={[styles.amountValue, {color: colors.error}]}>
            {formatCurrency(debt.currentBalance)}
          </Text>
        </View>
        <View style={styles.amountItem}>
          <Text
            style={[
              styles.amountLabel,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            Min Payment
          </Text>
          <Text
            style={[
              styles.amountValue,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            {formatCurrency(debt.minPayment)}
          </Text>
        </View>
        <View style={styles.amountItem}>
          <Text
            style={[
              styles.amountLabel,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            APR
          </Text>
          <Text
            style={[
              styles.amountValue,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            {debt.apr.toFixed(2)}%
          </Text>
        </View>
      </View>

      {showProgress && (
        <View style={styles.progressSection}>
          <ProgressBar
            current={debt.principal - debt.currentBalance}
            target={debt.principal}
            showLabel
            label={`Paid off: ${formatCurrency(debt.principal - debt.currentBalance)} of ${formatCurrency(debt.principal)}`}
            color={colors.success}
          />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    ...shadows.sm,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs / 2,
  },
  type: {
    fontSize: typography.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  orderBadge: {
    backgroundColor: colors.primary,
    borderRadius: spacing.radius.full,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  amountItem: {
    flex: 1,
  },
  amountLabel: {
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.xs / 2,
  },
  amountValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  progressSection: {
    marginTop: spacing.sm,
  },
});
