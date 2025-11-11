/**
 * GradientCard Component
 * Premium glass-morphism card with dynamic gradient generation
 */

import React from 'react';
import {View, StyleSheet, Platform, ViewStyle, useColorScheme} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'color';

interface GradientCardProps {
  children: React.ReactNode;
  baseColor?: string;
  style?: ViewStyle | ViewStyle[];
  opacity?: number;
  useGradient?: boolean; // true = gradient, false = solid color
  backgroundOpacity?: number; // 0-1, controls background opacity (default 1)
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  baseColor = '#5B7FBF',
  style,
  opacity = 1,
  useGradient = true,
  backgroundOpacity = 1,
}) => {
  const c = Color(baseColor);

  // Apply background opacity to the base color
  const baseColorWithOpacity = c.alpha(backgroundOpacity).hexa();

  // New elegant color path:
  // - Start: base rich color (slightly darker for depth)
  // - Mid: soft, subtle lift (not white) with warm tint
  // - End: back to a deeper tone for text contrast
  const left = c.darken(0.05).saturate(0.05).alpha(backgroundOpacity).hexa();
  const midLight = c.lighten(0.25).desaturate(0.1).mix(Color('#F8D7C4'), 0.15).alpha(backgroundOpacity).hexa(); // gentle warm highlight
  const rightDeep = c.darken(0.2).saturate(0.15).alpha(backgroundOpacity).hexa();

  // This card creates an elegant, sophisticated gradient:
  // - simple 3-stop gradient for clean appearance
  // - very subtle polish for depth without washing out text
  // - gentle right-side vignette for text readability
  // - glass container with minimal border
  return (
    <View style={[styles.wrapper, style, {opacity}]}>
      {useGradient ? (
        <>
          {/* Gradient mode */}
          <LinearGradient
            colors={[left, midLight, rightDeep]}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}
          />

          {/* Very subtle polish layer — soft tint rather than bright white */}
          <LinearGradient
            colors={[
              'rgba(255,255,255,0.05)',
              'rgba(255,180,150,0.02)',
              'rgba(255,255,255,0.03)',
            ]}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.polish}
          />

          {/* Gentle right-side vignette for contrast */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.18)']}
            start={{x: 0.6, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.readability}
          />
        </>
      ) : (
        /* Solid color mode */
        <View style={[styles.gradient, {backgroundColor: baseColorWithOpacity}]} />
      )}

      {/* Glass layer – translucent border and background */}
      <View style={styles.glass} />

      {/* Content on top */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  polish: {
    ...StyleSheet.absoluteFillObject,
  },
  readability: {
    ...StyleSheet.absoluteFillObject,
  },
  glass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  content: {
    padding: 16,
  },
});