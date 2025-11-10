/**
 * useScrollShadow Hook
 * Provides scroll-based shadow state for navigation headers
 */

import {useState, useCallback} from 'react';
import {Animated} from 'react-native';

interface UseScrollShadowOptions {
  threshold?: number;
  duration?: number;
}

export const useScrollShadow = (options: UseScrollShadowOptions = {}) => {
  const {threshold = 5, duration = 200} = options;
  const [shadowOpacity] = useState(new Animated.Value(0));

  const handleScroll = useCallback((event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    Animated.timing(shadowOpacity, {
      toValue: scrollY > threshold ? 1 : 0,
      duration,
      useNativeDriver: false, // backgroundColor animations need this
    }).start();
  }, [shadowOpacity, threshold, duration]);

  return {
    shadowOpacity,
    handleScroll,
  };
};