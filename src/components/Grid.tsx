/**
 * Grid Component
 * Main container that implements CSS-like grid layout for React Native
 */

import React, { useState, useCallback } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import {
  GridProps,
  GridItemProps,
  AlignmentValue,
  JustifyValue,
} from "../types";
import { calculateTrackSizes } from "../utils/parseTrackSize";
import {
  calculateGridCells,
  calculateRequiredRows,
  GridItemPlacement,
} from "../utils/gridLayout";

export const Grid: React.FC<GridProps> = ({
  columns = [1],
  rows,
  columnGap = 0,
  rowGap = 0,
  gap,
  alignItems = "stretch",
  alignContent: _alignContent = "start",
  justifyItems = "stretch",
  justifyContent: _justifyContent = "start",
  autoFlow = "row",
  autoColumns: _autoColumns = "1fr",
  autoRows = "100",
  style,
  children,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  // Track measured heights of each grid item for autoRows="auto"
  const [itemHeights, setItemHeights] = useState<Map<number, number>>(
    new Map()
  );

  // Use gap as fallback for columnGap and rowGap
  const effectiveColumnGap = gap !== undefined ? gap : columnGap;
  const effectiveRowGap = gap !== undefined ? gap : rowGap;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  }, []);

  // Callback for measuring individual grid item heights (for autoRows="auto")
  const handleItemLayout = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setItemHeights((prev) => {
        const next = new Map(prev);
        next.set(index, height);
        return next;
      });
    },
    []
  );

  // Extract grid item props from children
  // Filter out null/undefined children first to ensure correct indexing
  const validChildren: React.ReactElement<GridItemProps>[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<GridItemProps>(child)) {
      validChildren.push(child);
    }
  });

  const gridItems: GridItemPlacement[] = validChildren.map((child, index) => ({
    colStart: child.props.colStart,
    colEnd: child.props.colEnd,
    colSpan: child.props.colSpan,
    rowStart: child.props.rowStart,
    rowEnd: child.props.rowEnd,
    rowSpan: child.props.rowSpan,
    index,
  }));

  // Calculate grid structure
  const columnCount = columns.length;
  const cells = calculateGridCells(
    gridItems,
    columnCount,
    rows?.length || 0,
    autoFlow
  );

  // Determine actual row count
  const requiredRows = calculateRequiredRows(cells);
  const actualRows = rows || Array(requiredRows).fill(autoRows);

  // Calculate track sizes
  const columnSizes = calculateTrackSizes(
    columns,
    containerWidth,
    effectiveColumnGap
  );

  // Calculate row sizes
  let rowSizes: number[];

  if (autoRows === "auto" && !rows) {
    // Auto-sizing: calculate row heights based on measured item heights
    rowSizes = Array(requiredRows).fill(0);

    // Find the tallest item in each row
    cells.forEach((cell) => {
      const itemHeight = itemHeights.get(cell.index) || 0;
      const rowStart = cell.rowStart;
      const rowEnd = cell.rowEnd;
      const rowSpan = rowEnd - rowStart;

      if (rowSpan === 1) {
        // Item spans single row - directly set row height
        rowSizes[rowStart] = Math.max(rowSizes[rowStart], itemHeight);
      } else {
        // Item spans multiple rows - distribute height evenly
        const heightPerRow =
          (itemHeight - (rowSpan - 1) * effectiveRowGap) / rowSpan;
        for (let r = rowStart; r < rowEnd; r++) {
          rowSizes[r] = Math.max(rowSizes[r], heightPerRow);
        }
      }
    });

    // Ensure minimum height of 50px for empty rows
    rowSizes = rowSizes.map((size) => (size > 0 ? size : 50));
  } else {
    // Fixed sizing: use calculateTrackSizes
    const effectiveContainerHeight =
      containerHeight > 0 ? containerHeight : 10000;
    rowSizes = calculateTrackSizes(
      actualRows,
      effectiveContainerHeight,
      effectiveRowGap
    );
  }

  // Helper to get alignment flex value
  const getAlignmentFlex = (
    alignment: AlignmentValue
  ): "flex-start" | "flex-end" | "center" | "stretch" => {
    switch (alignment) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      case "stretch":
        return "stretch";
      default:
        return "stretch";
    }
  };

  // Helper to get justification flex value
  // Note: 'stretch' is not valid for justifyContent in React Native, map to 'flex-start'
  const getJustifyFlex = (
    justify: JustifyValue
  ):
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly" => {
    switch (justify) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      case "stretch":
        return "flex-start"; // Stretch not supported for justifyContent
      case "space-between":
        return "space-between";
      case "space-around":
        return "space-around";
      case "space-evenly":
        return "space-evenly";
      default:
        return "flex-start";
    }
  };

  // Position children according to grid cells
  const positionedChildren = validChildren.map((child, index) => {
    const cell = cells.find((c) => c.index === index);
    if (!cell) {
      return child;
    }

    // Calculate position and size
    const colStart = cell.colStart;
    const colEnd = cell.colEnd;
    const rowStart = cell.rowStart;
    const rowEnd = cell.rowEnd;

    // Calculate left position (sum of columns before + gaps)
    let left = 0;
    for (let i = 0; i < colStart; i++) {
      left += columnSizes[i] || 0;
      left += effectiveColumnGap; // Add gap after each column
    }

    // Calculate top position (sum of rows before + gaps)
    let top = 0;
    for (let i = 0; i < rowStart; i++) {
      top += rowSizes[i] || 0;
      top += effectiveRowGap; // Add gap after each row
    }

    // Calculate width (sum of spanned columns + gaps between them)
    let width = 0;
    for (let i = colStart; i < colEnd; i++) {
      width += columnSizes[i] || 0;
      if (i > colStart) width += effectiveColumnGap;
    }

    // Calculate height (sum of spanned rows + gaps between them)
    let height = 0;
    for (let i = rowStart; i < rowEnd; i++) {
      height += rowSizes[i] || 0;
      if (i > rowStart) height += effectiveRowGap;
    }

    // Get item-specific alignment overrides
    const itemAlignSelf = child.props.alignSelf || alignItems;
    const itemJustifySelf = child.props.justifySelf || justifyItems;

    // For autoRows="auto", use minHeight instead of height to allow content to expand
    const itemStyle = {
      position: "absolute" as const,
      left,
      top,
      width,
      ...(autoRows === "auto" && !rows ? { minHeight: height } : { height }),
      alignItems: getAlignmentFlex(itemAlignSelf),
      justifyContent: getJustifyFlex(itemJustifySelf),
    };

    // Add onLayout handler for autoRows="auto" measurement
    const childOnLayout = child.props.onLayout;
    const combinedOnLayout =
      autoRows === "auto" && !rows
        ? (event: LayoutChangeEvent) => {
            handleItemLayout(index)(event);
            if (childOnLayout) {
              childOnLayout(event);
            }
          }
        : childOnLayout;

    return React.cloneElement(child, {
      style: [itemStyle, child.props.style],
      onLayout: combinedOnLayout,
    });
  });

  // Calculate total grid height
  const totalHeight =
    rowSizes.reduce((sum, size) => sum + size, 0) +
    (rowSizes.length > 0 ? (rowSizes.length - 1) * effectiveRowGap : 0);

  // Don't render positioned children until we have valid dimensions
  const shouldRenderPositioned = containerWidth > 0;

  return (
    <View
      style={[
        styles.grid,
        { minHeight: totalHeight > 0 ? totalHeight : undefined },
        style,
      ]}
      onLayout={handleLayout}
    >
      {shouldRenderPositioned ? positionedChildren : null}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: "relative",
    width: "100%",
  },
});

Grid.displayName = "Grid";
