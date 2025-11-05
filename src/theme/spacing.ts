/**
 * Design Tokens - Spacing
 * Consistent spacing scale based on 4px grid
 */

export const spacing = {
  // Base spacing scale (4px increments)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,

  // Specific use cases
  screenPadding: 16, // Default screen horizontal padding
  cardPadding: 16, // Default card internal padding
  sectionGap: 24, // Gap between major sections
  itemGap: 12, // Gap between list items

  // Border radius
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999, // Fully rounded (pills, circles)
  },
};

export type SpacingKey = keyof Omit<typeof spacing, 'radius'>;
export type RadiusKey = keyof typeof spacing.radius;
