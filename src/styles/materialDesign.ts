import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Material Design 3 Color Palette
export const MaterialColors = {
  // Primary
  primary: '#6750A4',
  primaryContainer: '#EADDFF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005D',
  
  // Secondary
  secondary: '#625B71',
  secondaryContainer: '#E8DEF8',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#1D192B',
  
  // Tertiary
  tertiary: '#7D5260',
  tertiaryContainer: '#FFD8E4',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#31111D',
  
  // Error
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#410002',
  
  // Background
  background: '#FFFBFE',
  onBackground: '#1C1B1F',
  
  // Surface
  surface: '#FFFBFE',
  surfaceVariant: '#E7E0EC',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',
  
  // Outline
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  
  // Others
  inverseSurface: '#313033',
  inverseOnSurface: '#F4EFF4',
  inversePrimary: '#D0BCFF',
  
  // Dark theme equivalents
  dark: {
    primary: '#D0BCFF',
    primaryContainer: '#4F378B',
    onPrimary: '#371E73',
    onPrimaryContainer: '#EADDFF',
    
    background: '#1C1B1F',
    surface: '#1C1B1F',
    onBackground: '#E6E1E5',
    onSurface: '#E6E1E5',
  }
};

// Typography Scale
export const MaterialTypography = StyleSheet.create({
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
    letterSpacing: 0,
  },
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
  },
});

// Material Design Components
export const MaterialComponents = StyleSheet.create({
  // Buttons
  filledButton: {
    backgroundColor: MaterialColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filledButtonText: {
    ...MaterialTypography.labelLarge,
    color: MaterialColors.onPrimary,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: MaterialColors.outline,
  },
  outlinedButtonText: {
    ...MaterialTypography.labelLarge,
    color: MaterialColors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonText: {
    ...MaterialTypography.labelLarge,
    color: MaterialColors.primary,
  },
  
  // Cards
  card: {
    backgroundColor: MaterialColors.surface,
    borderRadius: 12,
    padding: 16,
    margin: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  elevatedCard: {
    backgroundColor: MaterialColors.surface,
    borderRadius: 12,
    padding: 16,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  
  // Input Fields
  textInput: {
    backgroundColor: MaterialColors.surfaceVariant,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: MaterialColors.onSurfaceVariant,
    borderWidth: 1,
    borderColor: MaterialColors.outline,
    minHeight: 56,
  },
  textInputFocused: {
    borderColor: MaterialColors.primary,
    borderWidth: 2,
  },
  textInputLabel: {
    ...MaterialTypography.bodySmall,
    color: MaterialColors.onSurfaceVariant,
    marginBottom: 4,
  },
  
  // App Bar
  appBar: {
    backgroundColor: MaterialColors.surface,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appBarTitle: {
    ...MaterialTypography.titleLarge,
    color: MaterialColors.onSurface,
    marginLeft: 16,
  },
  
  // Lists
  listItem: {
    backgroundColor: MaterialColors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: MaterialColors.outlineVariant,
    minHeight: 56,
    justifyContent: 'center',
  },
  listItemTitle: {
    ...MaterialTypography.bodyLarge,
    color: MaterialColors.onSurface,
  },
  listItemSubtitle: {
    ...MaterialTypography.bodyMedium,
    color: MaterialColors.onSurfaceVariant,
    marginTop: 2,
  },
  
  // FAB (Floating Action Button)
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: MaterialColors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  
  // Navigation
  tabBar: {
    backgroundColor: MaterialColors.surface,
    borderTopWidth: 1,
    borderTopColor: MaterialColors.outlineVariant,
    height: 80,
    paddingBottom: 16,
  },
  
  // Layout
  container: {
    flex: 1,
    backgroundColor: MaterialColors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: MaterialColors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

// Spacing constants (não StyleSheet)
export const MaterialSpacing = {
  marginSmall: 4,
  marginMedium: 8,
  marginLarge: 16,
  marginXLarge: 24,
  paddingSmall: 4,
  paddingMedium: 8,
  paddingLarge: 16,
  paddingXLarge: 24,
};

// Utility functions
export const MaterialUtils = {
  // Get appropriate text color for background
  getTextColor: (backgroundColor: string) => {
    // Simple luminance check
    return backgroundColor === MaterialColors.primary || 
           backgroundColor === MaterialColors.secondary ||
           backgroundColor === MaterialColors.tertiary
           ? MaterialColors.onPrimary
           : MaterialColors.onSurface;
  },
  
  // Create elevation style
  createElevation: (level: number) => ({
    elevation: level,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: level },
    shadowOpacity: 0.1 + (level * 0.02),
    shadowRadius: level * 2,
  }),
  
  // Responsive sizing
  responsiveSize: (size: number) => {
    const scale = width / 375; // Base width 375 (iPhone 6/7/8)
    return Math.round(size * scale);
  },
  
  // Check if device is tablet
  isTablet: () => width >= 768,
};

export default {
  Colors: MaterialColors,
  Typography: MaterialTypography,
  Components: MaterialComponents,
  Spacing: MaterialSpacing,
  Utils: MaterialUtils,
};