/**
 * ChecklistSelector Component
 * Multi-select checklist for subscriptions, habits, and challenges
 * Used in onboarding screens 16, 29, and 34
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
import {colors, typography, spacing} from '../../theme';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import {CheckCircleIcon as CheckCircleOutline} from 'react-native-heroicons/outline';

// ============================================================================
// Types
// ============================================================================

export interface ChecklistOption {
  id: string;
  label: string;
  description?: string;
  cost?: number; // For subscriptions
  badge?: string; // e.g., "Easy", "Hard"
}

export interface ChecklistSelectorProps {
  options: ChecklistOption[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  showCost?: boolean; // Show cost for subscriptions
  showBadge?: boolean; // Show difficulty badge
  minSelections?: number;
  maxSelections?: number;
  disabled?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const ChecklistSelector: React.FC<ChecklistSelectorProps> = ({
  options,
  selectedIds,
  onSelectionChange,
  showCost = false,
  showBadge = false,
  minSelections,
  maxSelections,
  disabled = false,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const handlePress = (optionId: string) => {
    if (disabled) return;

    const isSelected = selectedIds.includes(optionId);

    let newSelection: string[];

    if (isSelected) {
      // Deselect - check min constraint
      if (minSelections && selectedIds.length <= minSelections) {
        return; // Cannot deselect below minimum
      }
      newSelection = selectedIds.filter(id => id !== optionId);
    } else {
      // Select - check max constraint
      if (maxSelections && selectedIds.length >= maxSelections) {
        return; // Cannot select above maximum
      }
      newSelection = [...selectedIds, optionId];
    }

    onSelectionChange(newSelection);
  };

  const formatCost = (cost: number): string => {
    return `$${cost.toFixed(2)}/mo`;
  };

  const getBadgeColor = (badge: string): string => {
    switch (badge.toLowerCase()) {
      case 'easy':
        return colors.success;
      case 'medium':
        return colors.warning;
      case 'hard':
        return colors.error;
      default:
        return colors.info;
    }
  };

  return (
    <View style={styles.container}>
      {options.map(option => {
        const isSelected = selectedIds.includes(option.id);

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.item,
              isSelected && styles.itemSelected,
              disabled && styles.itemDisabled,
            ]}
            onPress={() => handlePress(option.id)}
            activeOpacity={0.7}
            disabled={disabled}>
            {/* Checkbox Icon */}
            <View style={styles.iconContainer}>
              {isSelected ? (
                <CheckCircleIcon size={24} color={colors.primary} />
              ) : (
                <CheckCircleOutline
                  size={24}
                  color={
                    isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light
                  }
                />
              )}
            </View>

            {/* Label and Description */}
            <View style={styles.textContainer}>
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {option.label}
              </Text>

              {option.description && (
                <Text style={styles.description}>{option.description}</Text>
              )}
            </View>

            {/* Cost or Badge */}
            {showCost && option.cost !== undefined && (
              <View style={styles.costContainer}>
                <Text style={styles.costText}>{formatCost(option.cost)}</Text>
              </View>
            )}

            {showBadge && option.badge && (
              <View
                style={[
                  styles.badgeContainer,
                  {backgroundColor: `${getBadgeColor(option.badge)}20`},
                ]}>
                <Text
                  style={[
                    styles.badgeText,
                    {color: getBadgeColor(option.badge)},
                  ]}>
                  {option.badge}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Selection Count Helper */}
      {(minSelections || maxSelections) && (
        <View style={styles.helperContainer}>
          <Text style={styles.helperText}>
            {minSelections && maxSelections
              ? `Select ${minSelections}-${maxSelections} items`
              : minSelections
              ? `Select at least ${minSelections} items`
              : `Select up to ${maxSelections} items`}
          </Text>
          <Text style={styles.helperCount}>
            {selectedIds.length} selected
          </Text>
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

    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderRadius: spacing.radius.md,
      borderWidth: 1,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      marginBottom: spacing.sm,
    } as ViewStyle,

    itemSelected: {
      borderColor: colors.primary,
      backgroundColor: isDark
        ? `${colors.primary}10`
        : `${colors.primary}08`,
    } as ViewStyle,

    itemDisabled: {
      opacity: 0.5,
    } as ViewStyle,

    iconContainer: {
      marginRight: spacing.md,
    } as ViewStyle,

    textContainer: {
      flex: 1,
    } as ViewStyle,

    label: {
      ...typography.styles.headline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
    } as TextStyle,

    labelSelected: {
      color: colors.primary,
      fontFamily: typography.fontFamily.bold,
    } as TextStyle,

    description: {
      ...typography.styles.footnote,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
      marginTop: 2,
    } as TextStyle,

    costContainer: {
      marginLeft: spacing.sm,
    } as ViewStyle,

    costText: {
      ...typography.styles.caption1,
      color: colors.primary,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    badgeContainer: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
      borderRadius: spacing.radius.sm,
      marginLeft: spacing.sm,
    } as ViewStyle,

    badgeText: {
      ...typography.styles.caption1,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,

    helperContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.md,
      paddingHorizontal: spacing.sm,
    } as ViewStyle,

    helperText: {
      ...typography.styles.footnote,
      color: isDark
        ? colors.text.secondary.dark
        : colors.text.secondary.light,
    } as TextStyle,

    helperCount: {
      ...typography.styles.footnote,
      color: colors.primary,
      fontFamily: typography.fontFamily.medium,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default ChecklistSelector;
