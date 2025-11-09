/**
 * Design Tokens - Colors
 * Following the Debt Destroyer brand identity
 */

export const colors = {
  // Brand colors
  primary: '#1E88E5', // Blue - trust, stability
  secondary: '#43A047', // Green - success, growth
  accent: '#FFB300', // Gold - achievement, rewards

  // Neutral colors
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  surface: {
    light: '#F5F5F5',
    dark: '#1E1E1E',
  },
  text: {
    primary: {
      light: '#212121',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#757575',
      dark: '#B0B0B0',
    },
  },
  border: {
    light: '#E0E0E0',
    dark: '#333333',
  },

  // Semantic colors
  success: '#43A047',
  warning: '#FB8C00',
  error: '#E53935',
  info: '#1E88E5',

  // Debt-specific
  debtRed: '#D32F2F', // Debt balance indicator
  payoffGreen: '#388E3C', // Payoff success
  snowballBlue: '#1976D2', // Snowball plan highlight
};

export type ColorScheme = 'light' | 'dark';
