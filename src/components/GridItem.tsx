/**
 * GridItem Component
 * Represents a single item within a Grid
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { GridItemProps } from "../types";

export const GridItem: React.FC<GridItemProps> = ({
  children,
  style,
  onLayout,
  // These props are consumed by the parent Grid component
  colStart,
  colEnd,
  colSpan,
  rowStart,
  rowEnd,
  rowSpan,
  alignSelf,
  justifySelf,
  ...rest
}) => {
  return (
    <View style={[styles.gridItem, style]} onLayout={onLayout} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    // Base styles for grid items
  },
});

// Attach metadata for parent Grid to access
GridItem.displayName = "GridItem";
