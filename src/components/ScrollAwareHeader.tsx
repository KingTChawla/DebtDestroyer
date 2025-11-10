/**
 * ScrollAwareHeader Component
 * Provides scroll-based shadow for headers that blend with background
 */

import React, {useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../contexts';

interface ScrollAwareHeaderProps {
  children: React.ReactNode;
  onScroll?: (event: any) => void;
  scrollThreshold?: number;
}

export const ScrollAwareHeader: React.FC<ScrollAwareHeaderProps> = ({
  children,
  onScroll,
  scrollThreshold = 5,
}) => {
  const {isDark} = useTheme();
  const [headerShadowOpacity] = useState(new Animated.Value(0));

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Animate shadow opacity based on scroll position
    Animated.timing(headerShadowOpacity, {
      toValue: scrollY > scrollThreshold ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // Changed to false to work with backgroundColor
    }).start();

    // Call original onScroll if provided
    if (onScroll) {
      onScroll(event);
    }
  };

  return (
    <View style={styles.container}>
      {/* Content */}
      {children}

      {/* Animated shadow overlay at the top */}
      <Animated.View
        style={[
          styles.shadowOverlay,
          {
            opacity: headerShadowOpacity,
            backgroundColor: isDark ? '#0A1A25' : '#E5D5C1',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  shadowOverlay: {
    position: 'absolute',
    top: 0, // Position at top for header shadow
    left: 0,
    right: 0,
    height: 1, // Thin shadow line
    zIndex: 999, // Make sure it's on top
  },
});