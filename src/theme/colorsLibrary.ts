/**
 * Color Library - Comprehensive color system with light/dark variants
 * Professional color palette for the entire app
 */

export interface ColorVariant {
  light: string;
  dark: string;
}

export interface ColorPalette {
  midnightPlum: ColorVariant;
  royalIndigo: ColorVariant;
  deepAzure: ColorVariant;
  oceanTeal: ColorVariant;
  emeraldShadow: ColorVariant;
  sapphireNight: ColorVariant;
  velvetRose: ColorVariant;
  burntMerlot: ColorVariant;
  copperEmber: ColorVariant;
  berryNoir: ColorVariant;
  forestFade: ColorVariant;
  spaceNavy: ColorVariant;
  cosmicViolet: ColorVariant;
  marineSteel: ColorVariant;
  obsidianBlue: ColorVariant;
}

export const colorPalette: ColorPalette = {
  midnightPlum: {
    light: '#6A25B0',
    dark: '#4A1583',
  },
  royalIndigo: {
    light: '#45409B',
    dark: '#2E2770',
  },
  deepAzure: {
    light: '#0A5BAA',
    dark: '#043C74',
  },
  oceanTeal: {
    light: '#0A7E85',
    dark: '#06535A',
  },
  emeraldShadow: {
    light: '#0E7A72',
    dark: '#04514A',
  },
  sapphireNight: {
    light: '#0A4A8B',
    dark: '#042F5C',
  },
  velvetRose: {
    light: '#B42352',
    dark: '#7E173A',
  },
  burntMerlot: {
    light: '#8C2654',
    dark: '#611538',
  },
  copperEmber: {
    light: '#9B4C14',
    dark: '#6A340F',
  },
  berryNoir: {
    light: '#753478',
    dark: '#522456',
  },
  forestFade: {
    light: '#275E59',
    dark: '#183E3A',
  },
  spaceNavy: {
    light: '#172245',
    dark: '#0B132B',
  },
  cosmicViolet: {
    light: '#5A0C9A',
    dark: '#3E086A',
  },
  marineSteel: {
    light: '#346373',
    dark: '#234552',
  },
  obsidianBlue: {
    light: '#183A66',
    dark: '#102541',
  },
};

// Background colors
export const backgroundColors = {
  light: '#F9F3E6', // soft, creamy yellow-white (like parchment or sunlight on ivory)
  dark: '#142850',   // Obsidian Blue (deep navy with subtle teal undertone)
};

// Helper functions
export const getColor = (colorVariant: ColorVariant, isDark: boolean): string => {
  return isDark ? colorVariant.dark : colorVariant.light;
};

export const getBackgroundColor = (isDark: boolean): string => {
  return isDark ? backgroundColors.dark : backgroundColors.light;
};

// Pre-defined commonly used colors
export const primaryColors = {
  forestFade: colorPalette.forestFade,
  sapphireNight: colorPalette.sapphireNight,
  midnightPlum: colorPalette.midnightPlum,
  cosmicViolet: colorPalette.cosmicViolet,
};

export const accentColors = {
  velvetRose: colorPalette.velvetRose,
  copperEmber: colorPalette.copperEmber,
  oceanTeal: colorPalette.oceanTeal,
  royalIndigo: colorPalette.royalIndigo,
};

export const neutralColors = {
  spaceNavy: colorPalette.spaceNavy,
  marineSteel: colorPalette.marineSteel,
  obsidianBlue: colorPalette.obsidianBlue,
  emeraldShadow: colorPalette.emeraldShadow,
};

// Export individual colors for direct use
export const {
  forestFade,
  sapphireNight,
  midnightPlum,
  cosmicViolet,
  velvetRose,
  copperEmber,
  oceanTeal,
  royalIndigo,
  spaceNavy,
  marineSteel,
  obsidianBlue,
  emeraldShadow,
} = colorPalette;