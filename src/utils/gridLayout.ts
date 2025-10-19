/**
 * Core grid layout algorithm
 * Handles auto-placement of grid items into a grid structure
 */

import { GridCell, GridAutoFlow } from "../types";

export interface GridItemPlacement {
  colStart?: number;
  colEnd?: number;
  colSpan?: number;
  rowStart?: number;
  rowEnd?: number;
  rowSpan?: number;
  index: number;
}

/**
 * Calculate grid cell positions for all children
 */
export function calculateGridCells(
  items: GridItemPlacement[],
  columnCount: number,
  _rowCount: number,
  autoFlow: GridAutoFlow = "row"
): GridCell[] {
  const cells: GridCell[] = [];
  const occupiedCells = new Set<string>();
  const isDense = autoFlow === "row-dense" || autoFlow === "column-dense";

  // Helper to mark cells as occupied
  const markOccupied = (
    colStart: number,
    colEnd: number,
    rowStart: number,
    rowEnd: number
  ) => {
    for (let row = rowStart; row < rowEnd; row++) {
      for (let col = colStart; col < colEnd; col++) {
        occupiedCells.add(`${row}-${col}`);
      }
    }
  };

  // Helper to check if a cell is occupied
  const isOccupied = (row: number, col: number): boolean => {
    return occupiedCells.has(`${row}-${col}`);
  };

  // Helper to find next available position
  const findNextPosition = (
    startRow: number,
    startCol: number,
    spanCols: number,
    spanRows: number
  ): { row: number; col: number } => {
    // For dense packing, always start from (0, 0) to fill gaps
    // For normal flow, start from cursor position
    const searchStartRow = isDense ? 0 : startRow;
    const searchStartCol = isDense ? 0 : startCol;

    for (let row = searchStartRow; ; row++) {
      const colStart = row === searchStartRow ? searchStartCol : 0;
      for (let col = colStart; col + spanCols <= columnCount; col++) {
        // Check if this position can fit the item
        let canFit = true;
        outerCheck: for (let r = row; r < row + spanRows; r++) {
          for (let c = col; c < col + spanCols; c++) {
            if (isOccupied(r, c)) {
              canFit = false;
              break outerCheck;
            }
          }
        }

        if (canFit) {
          return { row, col };
        }
      }
    }
  };

  let cursorRow = 0;
  let cursorCol = 0;

  items.forEach((item) => {
    let colStart: number | undefined;
    let colEnd: number | undefined;
    let rowStart: number | undefined;
    let rowEnd: number | undefined;

    // Handle explicit positioning first
    if (item.colStart !== undefined && item.colEnd !== undefined) {
      colStart = item.colStart;
      colEnd = item.colEnd;
    } else if (item.colStart !== undefined && item.colSpan !== undefined) {
      colStart = item.colStart;
      colEnd = colStart + item.colSpan;
    } else if (item.colStart !== undefined) {
      colStart = item.colStart;
      colEnd = colStart + 1;
    }

    if (item.rowStart !== undefined && item.rowEnd !== undefined) {
      rowStart = item.rowStart;
      rowEnd = item.rowEnd;
    } else if (item.rowStart !== undefined && item.rowSpan !== undefined) {
      rowStart = item.rowStart;
      rowEnd = rowStart + item.rowSpan;
    } else if (item.rowStart !== undefined) {
      rowStart = item.rowStart;
      rowEnd = rowStart + 1;
    }

    // Auto-place if not explicitly positioned
    if (
      colStart === undefined ||
      colEnd === undefined ||
      rowStart === undefined ||
      rowEnd === undefined
    ) {
      let spanCols =
        colEnd !== undefined && colStart !== undefined
          ? colEnd - colStart
          : item.colSpan || 1;
      const spanRows =
        rowEnd !== undefined && rowStart !== undefined
          ? rowEnd - rowStart
          : item.rowSpan || 1;

      // Ensure spanCols doesn't exceed columnCount
      spanCols = Math.min(spanCols, columnCount);

      const pos = findNextPosition(cursorRow, cursorCol, spanCols, spanRows);

      if (colStart === undefined) colStart = pos.col;
      if (colEnd === undefined) colEnd = colStart + spanCols;
      if (rowStart === undefined) rowStart = pos.row;
      if (rowEnd === undefined) rowEnd = rowStart + spanRows;
    }

    // Ensure colEnd doesn't exceed columnCount
    if (colEnd > columnCount) {
      colEnd = columnCount;
    }

    // Ensure colStart is within bounds
    if (colStart >= columnCount) {
      colStart = 0;
      colEnd = Math.min(item.colSpan || 1, columnCount);
    }

    // Create cell
    const cell: GridCell = {
      colStart,
      colEnd,
      rowStart,
      rowEnd,
      index: item.index,
    };

    cells.push(cell);
    markOccupied(colStart, colEnd, rowStart, rowEnd);

    // Update cursor for non-dense flow
    if (!isDense) {
      cursorCol = colEnd;
      if (cursorCol >= columnCount) {
        cursorRow = rowEnd;
        cursorCol = 0;
      }
    }
  });

  return cells;
}

/**
 * Calculate the minimum required rows based on placed items
 */
export function calculateRequiredRows(cells: GridCell[]): number {
  if (cells.length === 0) return 1;
  return Math.max(...cells.map((cell) => cell.rowEnd));
}
