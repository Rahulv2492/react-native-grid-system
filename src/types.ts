/**
 * Core type definitions for the RN Grid system
 */

import { ViewStyle, StyleProp, LayoutChangeEvent } from "react-native";

/**
 * Represents a track size for grid columns or rows
 * Can be a number (absolute pixels), string ('auto', 'fr' units, percentages), or special keywords
 */
export type TrackSize = number | string;

/**
 * Grid template definition - array of track sizes
 */
export type GridTemplate = TrackSize[];

/**
 * Alignment values matching CSS Grid alignment
 */
export type AlignmentValue =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "baseline";

/**
 * Justification values for grid items
 */
export type JustifyValue =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";

/**
 * Grid auto flow direction
 */
export type GridAutoFlow = "row" | "column" | "row-dense" | "column-dense";

/**
 * Props for the Grid component
 */
export interface GridProps {
  /**
   * Define columns using an array of track sizes
   * Example: [100, 'auto', '1fr', '2fr']
   */
  columns?: GridTemplate;

  /**
   * Define rows using an array of track sizes
   * Example: [100, 'auto', '1fr']
   */
  rows?: GridTemplate;

  /**
   * Gap between columns (in pixels)
   */
  columnGap?: number;

  /**
   * Gap between rows (in pixels)
   */
  rowGap?: number;

  /**
   * Shorthand for both columnGap and rowGap
   */
  gap?: number;

  /**
   * Align items along the column axis (vertical)
   */
  alignItems?: AlignmentValue;

  /**
   * Align content along the column axis when there's extra space
   */
  alignContent?: AlignmentValue;

  /**
   * Justify items along the row axis (horizontal)
   */
  justifyItems?: JustifyValue;

  /**
   * Justify content along the row axis when there's extra space
   */
  justifyContent?: JustifyValue;

  /**
   * Control auto-placement algorithm
   */
  autoFlow?: GridAutoFlow;

  /**
   * Auto-generated column track sizes
   */
  autoColumns?: TrackSize;

  /**
   * Auto-generated row track sizes
   */
  autoRows?: TrackSize;

  /**
   * Additional style prop for the grid container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Children elements (GridItems)
   */
  children?: React.ReactNode;
}

/**
 * Props for GridItem component
 */
export interface GridItemProps {
  /**
   * Column start position (1-indexed, like CSS Grid)
   */
  colStart?: number;

  /**
   * Column end position
   */
  colEnd?: number;

  /**
   * Shorthand for spanning columns
   * Example: colSpan={2} means span 2 columns
   */
  colSpan?: number;

  /**
   * Row start position (1-indexed)
   */
  rowStart?: number;

  /**
   * Row end position
   */
  rowEnd?: number;

  /**
   * Shorthand for spanning rows
   */
  rowSpan?: number;

  /**
   * Override alignSelf for this specific item
   */
  alignSelf?: AlignmentValue;

  /**
   * Override justifySelf for this specific item
   */
  justifySelf?: JustifyValue;

  /**
   * Additional style prop for the grid item
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Layout change callback
   */
  onLayout?: (event: LayoutChangeEvent) => void;

  /**
   * Children content
   */
  children?: React.ReactNode;
}

/**
 * Internal representation of a grid cell
 */
export interface GridCell {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  index: number;
}

/**
 * Parsed track information
 */
export interface ParsedTrack {
  value: number;
  unit: "px" | "fr" | "auto" | "%";
}
