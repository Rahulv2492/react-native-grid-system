/**
 * Responsive utilities for grid layouts
 * Helps create breakpoint-based responsive designs
 */

import { Dimensions } from "react-native";
import { TrackSize } from "../types";

export interface Breakpoints {
  xs?: number; // Extra small (mobile)
  sm?: number; // Small (tablet)
  md?: number; // Medium (tablet landscape)
  lg?: number; // Large (desktop)
  xl?: number; // Extra large (wide desktop)
}

export const DEFAULT_BREAKPOINTS: Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

/**
 * Get the current breakpoint name based on screen width
 */
export function getCurrentBreakpoint(
  width: number = Dimensions.get("window").width,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): keyof Breakpoints {
  const points = Object.entries(breakpoints)
    .filter(([, value]) => value !== undefined)
    .sort(([, a], [, b]) => (b as number) - (a as number)); // Sort descending

  for (const [name, minWidth] of points) {
    if (width >= (minWidth as number)) {
      return name as keyof Breakpoints;
    }
  }

  return "xs";
}

/**
 * Responsive column configuration
 */
export interface ResponsiveColumns {
  xs?: TrackSize[];
  sm?: TrackSize[];
  md?: TrackSize[];
  lg?: TrackSize[];
  xl?: TrackSize[];
}

export interface ResponsiveGridConfig {
  xs?: { columns: TrackSize[]; gap?: number };
  sm?: { columns: TrackSize[]; gap?: number };
  md?: { columns: TrackSize[]; gap?: number };
  lg?: { columns: TrackSize[]; gap?: number };
  xl?: { columns: TrackSize[]; gap?: number };
}

/**
 * Get columns for current screen size
 */
export function getResponsiveColumns(
  config: ResponsiveColumns,
  width: number = Dimensions.get("window").width,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): TrackSize[] {
  const currentBreakpoint = getCurrentBreakpoint(width, breakpoints);

  // Find the best matching breakpoint (cascade down)
  const breakpointOrder: (keyof Breakpoints)[] = ["xl", "lg", "md", "sm", "xs"];
  const startIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = startIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (config[bp]) {
      return config[bp] as TrackSize[];
    }
  }

  // Fallback to xs or first available
  return (
    config.xs ||
    config[Object.keys(config)[0] as keyof ResponsiveColumns] || ["1fr"]
  );
}

/**
 * Get full grid config (columns + gap) for current screen size
 */
export function getResponsiveGridConfig(
  config: ResponsiveGridConfig,
  width: number = Dimensions.get("window").width,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): { columns: TrackSize[]; gap?: number } {
  const currentBreakpoint = getCurrentBreakpoint(width, breakpoints);

  // Find the best matching breakpoint (cascade down)
  const breakpointOrder: (keyof Breakpoints)[] = ["xl", "lg", "md", "sm", "xs"];
  const startIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = startIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (config[bp]) {
      return config[bp]!;
    }
  }

  // Fallback to xs or first available
  return (
    config.xs ||
    config[Object.keys(config)[0] as keyof ResponsiveGridConfig] || {
      columns: ["1fr"],
    }
  );
}

/**
 * Helper to create common grid patterns
 */
export const GridPatterns = {
  /**
   * Creates a responsive column count that adapts to screen size
   * Example: ResponsiveGrid(2, 3, 4) = 2 cols on mobile, 3 on tablet, 4 on desktop
   */
  responsiveColumns: (
    xs = 1,
    sm = 2,
    md = 3,
    lg = 4,
    xl = 5
  ): ResponsiveColumns => ({
    xs: Array(xs).fill("1fr"),
    sm: Array(sm).fill("1fr"),
    md: Array(md).fill("1fr"),
    lg: Array(lg).fill("1fr"),
    xl: Array(xl).fill("1fr"),
  }),

  /**
   * Creates a masonry-like grid with varying column widths
   */
  masonry: (columns = 3): TrackSize[] => {
    const pattern = ["1fr", "1.5fr", "1fr"];
    return Array(Math.ceil(columns / 3))
      .fill(pattern)
      .flat()
      .slice(0, columns);
  },

  /**
   * Creates a sidebar layout (sidebar + main content)
   */
  sidebar: (
    sidebarWidth: number | string = 250,
    position: "left" | "right" = "left"
  ): TrackSize[] => {
    return position === "left" ? [sidebarWidth, "1fr"] : ["1fr", sidebarWidth];
  },

  /**
   * Creates a holy grail layout (sidebar + main + aside)
   */
  holyGrail: (
    leftWidth: number | string = 200,
    rightWidth: number | string = 200
  ): TrackSize[] => {
    return [leftWidth, "1fr", rightWidth];
  },

  /**
   * Creates equal columns
   */
  equal: (count: number): TrackSize[] => {
    return Array(count).fill("1fr");
  },

  /**
   * Creates a gallery grid optimized for images
   */
  gallery: (minItemWidth = 150): TrackSize[] => {
    const screenWidth = Dimensions.get("window").width;
    const columns = Math.floor(screenWidth / minItemWidth);
    return Array(Math.max(1, columns)).fill("1fr");
  },
};
