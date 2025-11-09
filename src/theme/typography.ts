/**
 * Design Tokens - Typography
 * Helvetica Neue iOS Typography System
 * Based on iOS Human Interface Guidelines
 */

export const typography = {
  // Font families
  fontFamily: {
    light: 'HelveticaNeue-Light',
    regular: 'HelveticaNeue',
    medium: 'HelveticaNeue-Medium',
    bold: 'HelveticaNeue-Bold',
  },

  // iOS Typography Styles (in points, React Native uses pixels directly)
  fontSize: {
    // Large Title (34pt)
    largeTitle: 34,
    // Title 1 (28pt)
    title1: 28,
    // Title 2 (22pt)
    title2: 22,
    // Title 3 (20pt)
    title3: 20,
    // Headline (17pt)
    headline: 17,
    // Body (17pt)
    body: 17,
    // Callout (16pt)
    callout: 16,
    // Subheadline (15pt)
    subheadline: 15,
    // Footnote (13pt)
    footnote: 13,
    // Caption 1 (12pt)
    caption1: 12,
    // Caption 2 (11pt)
    caption2: 11,

    // Legacy aliases for backwards compatibility
    xs: 11,
    sm: 13,
    base: 17,
    lg: 20,
    xl: 22,
    '2xl': 28,
    '3xl': 34,
    '4xl': 40,
    '5xl': 48,
  },

  // Line heights (in points)
  lineHeight: {
    largeTitle: 40,
    title1: 34,
    title2: 28,
    title3: 26,
    headline: 22,
    body: 22,
    callout: 22,
    subheadline: 20,
    footnote: 18,
    caption1: 16,
    caption2: 15,

    // Multipliers for custom use
    tight: 1.0,
    normal: 1.2,
    relaxed: 1.4,
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Letter spacing (in pixels - percentage converted)
  letterSpacing: {
    tighter: -0.34, // -1% for large titles
    tight: -0.11,   // -0.5% for titles
    normal: 0,
    loose: 0.043,   // +0.25% for footnotes/buttons
    looser: 0.085,  // +0.5% for captions/tab labels
  },

  // Vertical spacing (8pt grid)
  spacing: {
    xs: 2,
    sm: 4,
    base: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
  },

  // Predefined text styles for common use cases (iOS style)
  styles: {
    // Large Title - Main screen titles
    largeTitle: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 34,
      lineHeight: 40,
      letterSpacing: -0.34,
      fontWeight: '700' as const,
    },
    // Title 1 - Section titles, dashboard headers
    title1: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: -0.28,
      fontWeight: '700' as const,
    },
    // Title 2 - Secondary section headers
    title2: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: -0.11,
      fontWeight: '500' as const,
    },
    // Title 3 - Sub-section headers
    title3: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 20,
      lineHeight: 26,
      letterSpacing: -0.1,
      fontWeight: '500' as const,
    },
    // Headline - Button labels, emphasized text
    headline: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0,
      fontWeight: '500' as const,
    },
    // Body - Main reading text
    body: {
      fontFamily: 'HelveticaNeue',
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    // Callout - Supplementary information
    callout: {
      fontFamily: 'HelveticaNeue',
      fontSize: 16,
      lineHeight: 22,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    // Subheadline - Secondary labels
    subheadline: {
      fontFamily: 'HelveticaNeue',
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    // Footnote - Legal text, hints
    footnote: {
      fontFamily: 'HelveticaNeue',
      fontSize: 13,
      lineHeight: 18,
      letterSpacing: 0.043,
      fontWeight: '400' as const,
    },
    // Caption 1 - Image captions, helper text
    caption1: {
      fontFamily: 'HelveticaNeue',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.043,
      fontWeight: '400' as const,
    },
    // Caption 2 - Secondary captions
    caption2: {
      fontFamily: 'HelveticaNeue-Light',
      fontSize: 11,
      lineHeight: 15,
      letterSpacing: 0.085,
      fontWeight: '300' as const,
    },
    // Button Text
    button: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0.043,
      fontWeight: '500' as const,
    },
    // Legacy h1-h5 for backwards compatibility
    h1: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 34,
      lineHeight: 40,
      letterSpacing: -0.34,
      fontWeight: '700' as const,
    },
    h2: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: -0.28,
      fontWeight: '700' as const,
    },
    h3: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: -0.11,
      fontWeight: '500' as const,
    },
    h4: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 20,
      lineHeight: 26,
      letterSpacing: -0.1,
      fontWeight: '500' as const,
    },
    h5: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0,
      fontWeight: '500' as const,
    },
    bodyLarge: {
      fontFamily: 'HelveticaNeue',
      fontSize: 17,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    bodySmall: {
      fontFamily: 'HelveticaNeue',
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    caption: {
      fontFamily: 'HelveticaNeue',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.043,
      fontWeight: '400' as const,
    },
    buttonSmall: {
      fontFamily: 'HelveticaNeue-Medium',
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: 0.043,
      fontWeight: '500' as const,
    },
  },
};

export type TypographyStyle = keyof typeof typography.styles;
