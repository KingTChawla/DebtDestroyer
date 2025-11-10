/**
 * Design Tokens - Colors
 * Enhanced color system with comprehensive palette
 */

import { getColor, getBackgroundColor } from './colorsLibrary';

export const colors = {
  // Brand colors - using our palette
  primary: '#275E59', // Forest Fade light as primary
  secondary: '#0A4A8B', // Sapphire Night light as secondary
  accent: '#B42352', // Velvet Rose light as accent

  // Background colors - using your custom backgrounds
  background: {
    light: '#F9F3E6', // soft, creamy yellow-white (like parchment or sunlight on ivory)
    dark: '#142850',   // Obsidian Blue (deep navy with subtle teal undertone)
  },
  surface: {
    light: '#FFFFFF', // Clean white for surfaces
    dark: '#1A2B3A', // Slightly lighter than background for cards
  },
  text: {
    primary: {
      light: '#1A1A1A',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#666666',
      dark: '#B8B8B8',
    },
  },
  border: {
    light: '#E5D5C1', // Complementary to cream background
    dark: '#2A3B4A', // Subtle border for dark theme
  },

  // Semantic colors
  success: '#0E7A72', // Emerald Shadow light
  warning: '#9B4C14', // Copper Ember light
  error: '#B42352', // Velvet Rose light
  info: '#0A5BAA', // Deep Azure light

  // Debt-specific - using our palette
  debtRed: '#B42352', // Velvet Rose - debt indicator
  payoffGreen: '#0E7A72', // Emerald Shadow - success
  snowballBlue: '#0A4A8B', // Sapphire Night - snowball plan
};

export type ColorScheme = 'light' | 'dark';
