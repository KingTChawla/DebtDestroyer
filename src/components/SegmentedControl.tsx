/**
 * SegmentedControl Component
 * Tab switcher for multi-view screens (e.g., Challenges | Goals)
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {colors, spacing, typography, shadows} from '../theme';
import {getColor, sapphireNight} from '../theme/colorsLibrary';

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  selectedIndex,
  onIndexChange,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => {
        const isSelected = index === selectedIndex;
        const activeColor = getColor(sapphireNight, isDark);

        return (
          <TouchableOpacity
            key={segment}
            style={[
              styles.segment,
              isSelected && {
                backgroundColor: activeColor,
                ...shadows.md,
              },
            ]}
            onPress={() => onIndexChange(index)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.segmentText,
                {
                  color: isSelected
                    ? '#FFFFFF'
                    : isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
                isSelected && styles.selectedText,
              ]}>
              {segment}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: spacing.radius.full,
    padding: 4,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: typography.fontSize.headline,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.medium,
  },
  selectedText: {
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.fontWeight.semibold,
  },
});
