/**
 * Design Tokens - Shadows & Elevation
 * Cross-platform shadow definitions
 */

import {ViewStyle} from 'react-native';

export const shadows = {
  // No shadow
  none: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,

  // Small shadow - subtle depth (e.g., buttons, small cards)
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,

  // Medium shadow - standard cards
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,

  // Large shadow - prominent elements (modals, floating buttons)
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,

  // Extra large shadow - major overlays
  xl: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  } as ViewStyle,
};

export type ShadowKey = keyof typeof shadows;
