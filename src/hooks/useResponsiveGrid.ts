/**
 * React hook for responsive grid layouts
 */

import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { TrackSize } from "../types";
import {
  ResponsiveColumns,
  ResponsiveGridConfig,
  Breakpoints,
  DEFAULT_BREAKPOINTS,
  getResponsiveColumns,
  getResponsiveGridConfig,
  getCurrentBreakpoint,
} from "../utils/responsive";

/**
 * Hook that returns columns based on current screen size
 * Updates automatically on dimension changes
 */
export function useResponsiveGrid(
  config: ResponsiveColumns,
  breakpoints?: Breakpoints
): TrackSize[];

/**
 * Hook that returns full grid config (columns + gap) based on current screen size
 * Updates automatically on dimension changes
 */
export function useResponsiveGrid(
  config: ResponsiveGridConfig,
  breakpoints?: Breakpoints
): { columns: TrackSize[]; gap?: number };

export function useResponsiveGrid(
  config: ResponsiveColumns | ResponsiveGridConfig,
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): TrackSize[] | { columns: TrackSize[]; gap?: number } {
  // Check if config is ResponsiveGridConfig (has nested { columns, gap })
  const isGridConfig =
    config.xs && typeof config.xs === "object" && "columns" in config.xs;

  const [gridState, setGridState] = useState(() => {
    if (isGridConfig) {
      return getResponsiveGridConfig(
        config as ResponsiveGridConfig,
        Dimensions.get("window").width,
        breakpoints
      );
    } else {
      return getResponsiveColumns(
        config as ResponsiveColumns,
        Dimensions.get("window").width,
        breakpoints
      );
    }
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        if (isGridConfig) {
          const newConfig = getResponsiveGridConfig(
            config as ResponsiveGridConfig,
            window.width,
            breakpoints
          );
          setGridState(newConfig);
        } else {
          const newColumns = getResponsiveColumns(
            config as ResponsiveColumns,
            window.width,
            breakpoints
          );
          setGridState(newColumns);
        }
      }
    );

    return () => subscription?.remove();
  }, [config, breakpoints, isGridConfig]);

  return gridState;
}

/**
 * Hook that returns current breakpoint name
 * Updates automatically on dimension changes
 */
export function useBreakpoint(
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): keyof Breakpoints {
  const [breakpoint, setBreakpoint] = useState<keyof Breakpoints>(() =>
    getCurrentBreakpoint(Dimensions.get("window").width, breakpoints)
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        const newBreakpoint = getCurrentBreakpoint(window.width, breakpoints);
        setBreakpoint(newBreakpoint);
      }
    );

    return () => subscription?.remove();
  }, [breakpoints]);

  return breakpoint;
}

/**
 * Hook that returns window dimensions
 * Useful for calculating responsive values
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(() => ({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }));

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        setDimensions({
          width: window.width,
          height: window.height,
        });
      }
    );

    return () => subscription?.remove();
  }, []);

  return dimensions;
}
