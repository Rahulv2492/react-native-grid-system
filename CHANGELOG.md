# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-18

### Added

- Initial release of react-native-grid-system
- **Core Components**:
  - `Grid` component with CSS Grid-inspired API
  - `GridItem` component for grid children
- **Track Sizing Units**:
  - Fixed pixels (number or 'px')
  - Fractional units ('fr')
  - Auto sizing ('auto')
  - Percentages ('%')
  - Mixed unit support
- **Auto-Placement Algorithms**:
  - Normal flow (`autoFlow="row"`)
  - Dense packing (`autoFlow="row-dense"`) for masonry layouts
  - Column-based flows
- **Dynamic Row Sizing**:
  - `autoRows="auto"` for content-based height calculation
  - Perfect for mobile responsive layouts
- **Responsive Utilities**:
  - `useResponsiveGrid()` hook for adaptive layouts
  - `useBreakpoint()` hook for breakpoint detection
  - `useWindowDimensions()` hook
  - `ResponsiveGridConfig` type for columns + gap configuration
- **Pre-built Grid Patterns**:
  - Sidebar layouts
  - Holy Grail layout
  - Gallery grids
  - Equal columns
  - Responsive column patterns
- **Layout Controls**:
  - Gap support (row, column, and unified)
  - Alignment controls (alignItems, alignContent, justifyItems, justifyContent)
  - Column and row spanning
  - Explicit grid positioning (colStart, rowStart, colEnd, rowEnd)
- **Full TypeScript support** with comprehensive type definitions
- **Zero native dependencies** - pure JavaScript/TypeScript
- **Cross-platform support** (iOS, Android, React Native Web)
- **10 production-ready examples** including Dashboard, Photo Gallery, Product Grid
- **Comprehensive documentation** including DENSE_PACKING_GUIDE.md and detailed README

### Features

- Declarative, familiar API for web developers
- Efficient layout calculation with minimal re-renders
- CSS Grid parity for common use cases
- Performance optimized for mobile devices

[1.0.0]: https://github.com/react-native-grid-system/react-native-grid-system/releases/tag/v1.0.0
