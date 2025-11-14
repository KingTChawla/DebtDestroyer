/**
 * Floating Action Button (FAB)
 * Global button for AI expense logging
 */

import React from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {PlusIcon} from 'react-native-heroicons/solid';
import {colors} from '../theme';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel="Add expense"
      accessibilityHint="Opens AI expense logging">
      <PlusIcon size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90, // Above tab bar
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.success, // Bright green (#0E7A72)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
});
