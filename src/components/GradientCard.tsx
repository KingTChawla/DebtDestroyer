/**
 * GradientCard Component
 * Premium glass-morphism card with dynamic gradient generation
 */

import React from 'react';
import {View, StyleSheet, Platform, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'color';

interface GradientCardProps {
  children: React.ReactNode;
  baseColor?: string;
  style?: ViewStyle | ViewStyle[];
  opacity?: number;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  baseColor = '#5B7FBF',
  style,
  opacity = 1,
}) => {
  const c = Color(baseColor);

  // New elegant color path:
  // - Start: base rich color (slightly darker for depth)
  // - Mid: soft, subtle lift (not white) with warm tint
  // - End: back to a deeper tone for text contrast
  const left = c.darken(0.05).saturate(0.05).hex();
  const midLight = c.lighten(0.25).desaturate(0.1).mix(Color('#F8D7C4'), 0.15).hex(); // gentle warm highlight
  const rightDeep = c.darken(0.2).saturate(0.15).hex();

  // This card creates an elegant, sophisticated gradient:
  // - simple 3-stop gradient for clean appearance
  // - very subtle polish for depth without washing out text
  // - gentle right-side vignette for text readability
  // - glass container with minimal border
  return (
    <View style={[styles.wrapper, style, {opacity}]}>
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

      {/* Glass layer – translucent border and background */}
      <View style={styles.glass}>
        <View style={styles.content}>{children}</View>
      </View>
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
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  content: {
    padding: 20,
  },
});