/**
 * Tests for grid layout algorithm
 */

import { calculateGridCells, calculateRequiredRows } from '../utils/gridLayout';

describe('calculateGridCells', () => {
  it('should auto-place items in a 3-column grid', () => {
    const items = [
      { index: 0 },
      { index: 1 },
      { index: 2 },
      { index: 3 },
    ];

    const cells = calculateGridCells(items, 3, 0, 'row');

    expect(cells).toHaveLength(4);
    expect(cells[0]).toEqual({ colStart: 0, colEnd: 1, rowStart: 0, rowEnd: 1, index: 0 });
    expect(cells[1]).toEqual({ colStart: 1, colEnd: 2, rowStart: 0, rowEnd: 1, index: 1 });
    expect(cells[2]).toEqual({ colStart: 2, colEnd: 3, rowStart: 0, rowEnd: 1, index: 2 });
    expect(cells[3]).toEqual({ colStart: 0, colEnd: 1, rowStart: 1, rowEnd: 2, index: 3 });
  });

  it('should handle column spans', () => {
    const items = [
      { index: 0, colSpan: 2 },
      { index: 1 },
      { index: 2 },
    ];

    const cells = calculateGridCells(items, 3, 0, 'row');

    expect(cells[0]).toEqual({ colStart: 0, colEnd: 2, rowStart: 0, rowEnd: 1, index: 0 });
    expect(cells[1]).toEqual({ colStart: 2, colEnd: 3, rowStart: 0, rowEnd: 1, index: 1 });
    expect(cells[2]).toEqual({ colStart: 0, colEnd: 1, rowStart: 1, rowEnd: 2, index: 2 });
  });

  it('should handle row spans', () => {
    const items = [
      { index: 0, rowSpan: 2 },
      { index: 1 },
      { index: 2 },
    ];

    const cells = calculateGridCells(items, 2, 0, 'row');

    expect(cells[0]).toEqual({ colStart: 0, colEnd: 1, rowStart: 0, rowEnd: 2, index: 0 });
    expect(cells[1]).toEqual({ colStart: 1, colEnd: 2, rowStart: 0, rowEnd: 1, index: 1 });
    expect(cells[2]).toEqual({ colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2, index: 2 });
  });

  it('should handle explicit positioning', () => {
    const items = [
      { index: 0, colStart: 1, rowStart: 1 },
      { index: 1, colStart: 0, rowStart: 0 },
    ];

    const cells = calculateGridCells(items, 2, 2, 'row');

    expect(cells[0]).toEqual({ colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2, index: 0 });
    expect(cells[1]).toEqual({ colStart: 0, colEnd: 1, rowStart: 0, rowEnd: 1, index: 1 });
  });

  it('should handle colStart and colEnd', () => {
    const items = [
      { index: 0, colStart: 0, colEnd: 2, rowStart: 0, rowEnd: 1 },
    ];

    const cells = calculateGridCells(items, 3, 0, 'row');

    expect(cells[0]).toEqual({ colStart: 0, colEnd: 2, rowStart: 0, rowEnd: 1, index: 0 });
  });
});

describe('calculateRequiredRows', () => {
  it('should calculate required rows from cells', () => {
    const cells = [
      { colStart: 0, colEnd: 1, rowStart: 0, rowEnd: 1, index: 0 },
      { colStart: 1, colEnd: 2, rowStart: 0, rowEnd: 1, index: 1 },
      { colStart: 0, colEnd: 1, rowStart: 1, rowEnd: 2, index: 2 },
    ];

    expect(calculateRequiredRows(cells)).toBe(2);
  });

  it('should handle cells spanning multiple rows', () => {
    const cells = [
      { colStart: 0, colEnd: 1, rowStart: 0, rowEnd: 3, index: 0 },
    ];

    expect(calculateRequiredRows(cells)).toBe(3);
  });

  it('should return 1 for empty cells', () => {
    expect(calculateRequiredRows([])).toBe(1);
  });
});


