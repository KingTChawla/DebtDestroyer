/**
 * TileSelector Component
 * Reusable tile-based selection interface for onboarding questions
 * Supports single-select and multi-select modes with icons
 */

import React, {useState} from 'react';
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
import * as HeroIcons from 'react-native-heroicons/outline';
import * as HeroIconsSolid from 'react-native-heroicons/solid';

// ============================================================================
// Types
// ============================================================================

export interface TileOption {
  id: string;
  label: string;
  description?: string;
  icon?: keyof typeof HeroIcons;
  exclusive?: boolean; // e.g., "None of these" option
}

export interface TileSelectorProps {
  options: TileOption[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  multiSelect?: boolean;
  columns?: 1 | 2;
  tileSize?: 'small' | 'medium' | 'large';
  autoAdvance?: boolean; // Auto-advance on single-select
  onAutoAdvance?: () => void;
  disabled?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const TileSelector: React.FC<TileSelectorProps> = ({
  options,
  selectedIds,
  onSelectionChange,
  multiSelect = false,
  columns = 1,
  tileSize = 'medium',
  autoAdvance = false,
  onAutoAdvance,
  disabled = false,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark, columns, tileSize);

  const handlePress = (optionId: string, isExclusive: boolean) => {
    if (disabled) return;

    let newSelection: string[];

    if (multiSelect) {
      // Multi-select logic
      if (isExclusive) {
        // Exclusive option clears all others
        newSelection = selectedIds.includes(optionId) ? [] : [optionId];
      } else {
        // Regular option
        const exclusiveSelected = selectedIds.find(
          id => options.find(opt => opt.id === id)?.exclusive,
        );

        if (exclusiveSelected) {
          // Remove exclusive option if present
          newSelection = [optionId];
        } else {
          // Toggle regular option
          newSelection = selectedIds.includes(optionId)
            ? selectedIds.filter(id => id !== optionId)
            : [...selectedIds, optionId];
        }
      }
    } else {
      // Single-select logic
      newSelection = selectedIds.includes(optionId) ? [] : [optionId];
    }

    onSelectionChange(newSelection);

    // Auto-advance on single-select after delay
    if (!multiSelect && autoAdvance && onAutoAdvance && newSelection.length > 0) {
      setTimeout(() => {
        onAutoAdvance();
      }, 300); // Delay for visual feedback
    }
  };

  const renderIcon = (option: TileOption, isSelected: boolean) => {
    if (!option.icon) return null;

    const IconComponent = isSelected
      ? HeroIconsSolid[option.icon]
      : HeroIcons[option.icon];

    if (!IconComponent) return null;

    return (
      <IconComponent
        size={tileSize === 'large' ? 32 : tileSize === 'medium' ? 28 : 24}
        color={isSelected ? (isDark ? colors.primary : colors.primary) : isDark ? '#FFFFFF' : colors.text.primary.light}
      />
    );
  };

  return (
    <View style={styles.container}>
      {options.map(option => {
        const isSelected = selectedIds.includes(option.id);

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.tile,
              isSelected && styles.tileSelected,
              disabled && styles.tileDisabled,
            ]}
            onPress={() => handlePress(option.id, option.exclusive || false)}
            activeOpacity={0.7}
            disabled={disabled}>
            {option.icon && (
              <View style={styles.iconContainer}>
                {renderIcon(option, isSelected)}
              </View>
            )}

            <View style={styles.textContainer}>
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {option.label}
              </Text>

              {option.description && (
                <Text
                  style={[
                    styles.description,
                    isSelected && styles.descriptionSelected,
                  ]}>
                  {option.description}
                </Text>
              )}
            </View>

            {/* Selection Indicator */}
            {isSelected && (
              <View style={styles.checkmark}>
                <HeroIconsSolid.CheckCircleIcon
                  size={24}
                  color={colors.primary}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (
  isDark: boolean,
  columns: 1 | 2,
  tileSize: 'small' | 'medium' | 'large',
) => {
  const tilePadding =
    tileSize === 'large' ? spacing.lg : tileSize === 'medium' ? spacing.md : spacing.sm;

  const iconSize =
    tileSize === 'large' ? 48 : tileSize === 'medium' ? 40 : 32;

  return StyleSheet.create({
    container: {
      flexDirection: columns === 2 ? 'row' : 'column',
      flexWrap: columns === 2 ? 'wrap' : 'nowrap',
      gap: spacing.md,
    },

    tile: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: tilePadding,
      borderRadius: spacing.radius.lg,
      borderWidth: 2,
      borderColor: isDark ? colors.border.dark : colors.border.light,
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      minHeight: tileSize === 'large' ? 100 : tileSize === 'medium' ? 80 : 60,
      width: columns === 2 ? '48%' : '100%',
      ...shadows.sm,
    } as ViewStyle,

    tileSelected: {
      borderColor: colors.primary,
      backgroundColor: isDark
        ? `${colors.primary}15` // 15% opacity
        : `${colors.primary}10`, // 10% opacity
      ...shadows.md,
    } as ViewStyle,

    tileDisabled: {
      opacity: 0.5,
    } as ViewStyle,

    iconContainer: {
      width: iconSize,
      height: iconSize,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    } as ViewStyle,

    textContainer: {
      flex: 1,
    } as ViewStyle,

    label: {
      ...typography.styles.headline,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      marginBottom: 2,
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
      marginTop: 4,
    } as TextStyle,

    descriptionSelected: {
      color: isDark
        ? colors.text.primary.dark
        : colors.text.primary.light,
    } as TextStyle,

    checkmark: {
      marginLeft: spacing.sm,
    } as ViewStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default TileSelector;
