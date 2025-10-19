/**
 * react-native-grid-system
 * A lightweight CSS-like grid system for React Native
 */

// Core components
export { Grid } from "./components/Grid";
export { GridItem } from "./components/GridItem";

// Hooks
export {
  useResponsiveGrid,
  useBreakpoint,
  useWindowDimensions,
} from "./hooks/useResponsiveGrid";

// Utilities
export {
  GridPatterns,
  getResponsiveColumns,
  getResponsiveGridConfig,
  getCurrentBreakpoint,
} from "./utils/responsive";

// Types
export type {
  GridProps,
  GridItemProps,
  TrackSize,
  GridTemplate,
  AlignmentValue,
  JustifyValue,
  GridAutoFlow,
} from "./types";

export type {
  ResponsiveColumns,
  ResponsiveGridConfig,
  Breakpoints,
} from "./utils/responsive";
