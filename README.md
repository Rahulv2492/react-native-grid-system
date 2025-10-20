# react-native-grid-system

The complete grid system for React Native - CSS Grid-inspired layout with responsive design, masonry support, and zero native dependencies. Works seamlessly across iOS, Android, and web (React Native Web).

[![npm version](https://img.shields.io/npm/v/react-native-grid-system.svg)](https://www.npmjs.com/package/react-native-grid-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Familiar API** - CSS Grid-inspired properties that web developers already know  
🎯 **Declarative** - Define your layout, not the implementation  
📱 **Cross-Platform** - Works on iOS, Android, and React Native Web  
🪶 **Lightweight** - Zero native dependencies, pure JavaScript/TypeScript  
🎨 **Flexible** - Supports fr units, percentages, auto, and fixed pixel values  
📐 **Spanning** - Items can span multiple columns and rows  
📲 **Responsive** - Built-in hooks and utilities for adaptive layouts  
🎁 **Grid Patterns** - Pre-built patterns for common layouts  
⚡ **Performance** - Efficient layout calculations with minimal re-renders  
🔷 **TypeScript** - Full type safety with comprehensive type definitions

## 📸 Visual Examples

### Dashboard Layout

A responsive dashboard that adapts seamlessly across devices with complex card layouts, charts, and statistics.

<table>
  <tr>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/DashboardExample_(Pixel 7).png" alt="Dashboard on Mobile" /></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/DashboardExample_(iPad Pro).png" alt="Dashboard on Tablet" /></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/DashboardExample_(desktop).png" alt="Dashboard on Desktop" /></td>
  </tr>
  <tr>
    <td align="center"><b>Mobile</b><br/>Single column, vertical layout</td>
    <td align="center"><b>Tablet</b><br/>2-column grid with spanning</td>
    <td align="center"><b>Desktop</b><br/>3-column complex layout</td>
  </tr>
</table>

### Product Grid

E-commerce product listings that automatically adjust columns based on screen size.

<table>
  <tr>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/ProductListingExample_(Pixel 7).png" alt="Product Grid Mobile" /></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/ProductListingExample_(iPad Air).png" alt="Product Grid Tablet" /></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/ProductListingExample_(Desktop).png" alt="Product Grid Desktop" /></td>
  </tr>
  <tr>
    <td align="center"><b>Mobile</b><br/>2 columns</td>
    <td align="center"><b>Tablet</b><br/>3 columns</td>
    <td align="center"><b>Desktop</b><br/>4+ columns</td>
  </tr>
</table>

### Masonry Photo Gallery

Pinterest-style dense packing with `autoFlow="row-dense"` for beautiful image galleries.

<table>
  <tr>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/ImageGallery_(Pixel 7).png" alt="Gallery Mobile" /></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/ImageGallery_(iPad Pro).png" alt="Gallery Tablet" /></td>
    <td width="33%"><img src="https://raw.githubusercontent.com/Rahulv2492/react-native-grid-system/main/assets/ImageGallery_(Desktop).png" alt="Gallery Desktop" /></td>
  </tr>
  <tr>
    <td align="center"><b>Mobile</b><br/>3 columns, dense packing</td>
    <td align="center"><b>Tablet</b><br/>4 columns, masonry layout</td>
    <td align="center"><b>Desktop</b><br/>6 columns, optimal spacing</td>
  </tr>
</table>

### 🎥 Live Demo

Watch the library in action across different screen sizes and orientations:

[📹 View Demo Video](https://drive.google.com/file/d/1N75mlBVPM8XOV5UP9_d2lnKfjzqDTCbp/view?usp=sharing)

> **Note**: All examples are fully responsive and work seamlessly on iOS, Android, and Web without any platform-specific code!

## Installation

```bash
npm install react-native-grid-system
```

or

```bash
yarn add react-native-grid-system
```

## Quick Start

```tsx
import React from "react";
import { View, Text } from "react-native";
import { Grid, GridItem } from "react-native-grid-system";

const App = () => {
  return (
    <Grid columns={["1fr", "1fr", "1fr"]} gap={10}>
      <GridItem>
        <Text>Item 1</Text>
      </GridItem>
      <GridItem>
        <Text>Item 2</Text>
      </GridItem>
      <GridItem>
        <Text>Item 3</Text>
      </GridItem>
    </Grid>
  );
};
```

## Core Concepts

### Grid Container

The `Grid` component defines the layout structure:

```tsx
<Grid
  columns={["1fr", "2fr", "1fr"]} // Column track sizes
  rows={[100, "auto", 100]} // Row track sizes (optional)
  gap={10} // Gap between items
  alignItems="center" // Vertical alignment
  justifyItems="stretch" // Horizontal alignment
>
  {/* Grid items */}
</Grid>
```

### Grid Items

The `GridItem` component represents individual grid cells:

```tsx
<GridItem
  colSpan={2} // Span 2 columns
  rowSpan={2} // Span 2 rows
  colStart={0} // Explicit column start
  rowStart={1} // Explicit row start
>
  {/* Content */}
</GridItem>
```

## Track Sizing

### Fixed Pixels

```tsx
<Grid columns={[100, 200, 100]} />
```

### Fractional Units (fr)

Distributes available space proportionally:

```tsx
<Grid columns={["1fr", "2fr", "1fr"]} />
// First column: 25%, Second: 50%, Third: 25%
```

### Auto

Automatically sizes based on content:

```tsx
<Grid columns={["auto", "1fr", "auto"]} />
```

### Percentages

```tsx
<Grid columns={["25%", "50%", "25%"]} />
```

### Mixed Units

```tsx
<Grid columns={[100, "1fr", "2fr", "auto"]} />
```

## Examples

### Basic 3-Column Grid

```tsx
import { Grid, GridItem } from "react-native-grid-system";

<Grid columns={[100, 100, 100]} gap={10}>
  <GridItem>
    <Text>1</Text>
  </GridItem>
  <GridItem>
    <Text>2</Text>
  </GridItem>
  <GridItem>
    <Text>3</Text>
  </GridItem>
  <GridItem>
    <Text>4</Text>
  </GridItem>
  <GridItem>
    <Text>5</Text>
  </GridItem>
  <GridItem>
    <Text>6</Text>
  </GridItem>
</Grid>;
```

### Responsive Layout

```tsx
<Grid columns={["1fr", "2fr", "1fr"]} gap={10}>
  <GridItem style={styles.sidebar}>
    <Text>Sidebar</Text>
  </GridItem>
  <GridItem style={styles.main}>
    <Text>Main Content</Text>
  </GridItem>
  <GridItem style={styles.aside}>
    <Text>Aside</Text>
  </GridItem>
</Grid>
```

### Spanning Items

```tsx
<Grid columns={["1fr", "1fr", "1fr"]} rows={[100, 100]} gap={10}>
  {/* Header spanning all columns */}
  <GridItem colSpan={3}>
    <Text>Header</Text>
  </GridItem>

  {/* Sidebar spanning two rows */}
  <GridItem rowSpan={2}>
    <Text>Sidebar</Text>
  </GridItem>

  {/* Main content spanning two columns */}
  <GridItem colSpan={2}>
    <Text>Main</Text>
  </GridItem>

  <GridItem>
    <Text>Footer 1</Text>
  </GridItem>
  <GridItem>
    <Text>Footer 2</Text>
  </GridItem>
</Grid>
```

### Explicit Positioning

```tsx
<Grid columns={["1fr", "1fr", "1fr"]} rows={[100, 100, 100]}>
  <GridItem colStart={1} rowStart={1}>
    <Text>Center Item</Text>
  </GridItem>
  <GridItem colStart={0} rowStart={0}>
    <Text>Top-Left</Text>
  </GridItem>
  <GridItem colStart={2} rowStart={2}>
    <Text>Bottom-Right</Text>
  </GridItem>
</Grid>
```

### Gallery Layout

```tsx
<Grid columns={["1fr", "1fr"]} gap={8}>
  {images.map((image, index) => (
    <GridItem key={index}>
      <Image source={image} style={styles.image} />
    </GridItem>
  ))}
</Grid>
```

## API Reference

### Grid Props

| Prop             | Type             | Default         | Description                         |
| ---------------- | ---------------- | --------------- | ----------------------------------- |
| `columns`        | `TrackSize[]`    | `[1]`           | Array of column track sizes         |
| `rows`           | `TrackSize[]`    | Auto-calculated | Array of row track sizes            |
| `gap`            | `number`         | `0`             | Gap between all items               |
| `columnGap`      | `number`         | `0`             | Gap between columns                 |
| `rowGap`         | `number`         | `0`             | Gap between rows                    |
| `alignItems`     | `AlignmentValue` | `'stretch'`     | Vertical alignment                  |
| `alignContent`   | `AlignmentValue` | `'start'`       | Content alignment along column axis |
| `justifyItems`   | `JustifyValue`   | `'stretch'`     | Horizontal alignment                |
| `justifyContent` | `JustifyValue`   | `'start'`       | Content alignment along row axis    |
| `autoFlow`       | `GridAutoFlow`   | `'row'`         | Auto-placement algorithm            |
| `autoColumns`    | `TrackSize`      | `'1fr'`         | Auto-generated column size          |
| `autoRows`       | `TrackSize`      | `'100'`         | Auto-generated row size             |
| `style`          | `ViewStyle`      | -               | Additional container styles         |

### GridItem Props

| Prop          | Type             | Default | Description                         |
| ------------- | ---------------- | ------- | ----------------------------------- |
| `colStart`    | `number`         | Auto    | Column start position (0-indexed)   |
| `colEnd`      | `number`         | Auto    | Column end position                 |
| `colSpan`     | `number`         | `1`     | Number of columns to span           |
| `rowStart`    | `number`         | Auto    | Row start position (0-indexed)      |
| `rowEnd`      | `number`         | Auto    | Row end position                    |
| `rowSpan`     | `number`         | `1`     | Number of rows to span              |
| `alignSelf`   | `AlignmentValue` | -       | Override alignItems for this item   |
| `justifySelf` | `JustifyValue`   | -       | Override justifyItems for this item |
| `style`       | `ViewStyle`      | -       | Additional item styles              |

### Type Definitions

```typescript
type TrackSize = number | string;
type AlignmentValue = "start" | "end" | "center" | "stretch" | "baseline";
type JustifyValue =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";
type GridAutoFlow = "row" | "column" | "row-dense" | "column-dense";
```

## Advanced Features

### Auto-Sizing Rows

Use `autoRows="auto"` to automatically calculate row heights based on content:

```tsx
<Grid columns={["1fr", "1fr"]} autoRows="auto" gap={10}>
  <GridItem>
    <Text>Short content</Text>
  </GridItem>
  <GridItem>
    <Text>Much longer content that takes up more vertical space...</Text>
  </GridItem>
</Grid>
```

**How it works:** The Grid automatically measures each item's rendered height and calculates row heights based on the tallest item in each row. Multi-row items have their height distributed evenly across spanned rows.

**Perfect for:**

- Mobile responsive layouts with varying content heights
- Dynamic content that changes size
- Cards with different amounts of text
- Dashboard widgets with unpredictable content

### Dense Packing (Masonry Layouts)

Enable `autoFlow="row-dense"` for Pinterest-style masonry layouts:

```tsx
<Grid
  columns={["1fr", "1fr", "1fr"]}
  autoRows="120"
  autoFlow="row-dense"
  gap={10}
>
  {photos.map((photo) => (
    <GridItem key={photo.id} rowSpan={photo.height}>
      <Image source={photo.src} />
    </GridItem>
  ))}
</Grid>
```

**How it works:** The algorithm fills gaps by backtracking to find available space, creating a tight, compact layout instead of leaving diagonal gaps.

**💡 Pro Tip for natural masonry layouts:**

Vary your item heights for the best visual effect:

- **50-60%** short items (`rowSpan={1}`)
- **30-35%** medium items (`rowSpan={2}`)
- **10-15%** tall items (`rowSpan={3}`)

This distribution gives the algorithm more opportunities to fill gaps and creates a natural Pinterest-style appearance.

📖 **[Full guide with troubleshooting](./DENSE_PACKING_GUIDE.md)**

## Responsive Design

### Using the Responsive Hook

```tsx
import { Grid, GridItem, useResponsiveGrid } from "react-native-grid-system";

function MyComponent() {
  // Automatically adapts to screen size with columns AND gap
  const gridConfig = useResponsiveGrid({
    xs: { columns: ["1fr"], gap: 10 }, // 1 column on mobile
    sm: { columns: ["1fr", "1fr"], gap: 12 }, // 2 columns on small tablets
    md: { columns: ["1fr", "1fr", "1fr"], gap: 15 }, // 3 columns on tablets
    lg: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 20 }, // 4 columns on desktop
  });

  return (
    <Grid {...gridConfig} autoRows="120">
      {/* Your items */}
    </Grid>
  );
}
```

### Using Grid Patterns

Pre-built patterns for common layouts:

```tsx
import { Grid, GridItem, GridPatterns } from 'react-native-grid-system';

// Sidebar layout
<Grid columns={GridPatterns.sidebar(200, 'left')} />

// Holy grail (3-column) layout
<Grid columns={GridPatterns.holyGrail(150, 200)} />

// Equal columns
<Grid columns={GridPatterns.equal(4)} />

// Gallery grid (auto-calculates columns)
<Grid columns={GridPatterns.gallery(120)} />

// Responsive columns
const responsiveConfig = GridPatterns.responsiveColumns(1, 2, 3, 4);
```

### Breakpoint Detection

```tsx
import { useBreakpoint } from "react-native-grid-system";

function MyComponent() {
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  return <Text>Current: {breakpoint}</Text>;
}
```

## How It Works

Unlike CSS Grid which relies on browser layout engines, `react-native-grid-system` implements a grid layout algorithm in pure JavaScript:

1. **Track Sizing**: Calculates actual pixel sizes for each column and row based on track definitions (fr, auto, %, px)
2. **Auto-Placement**: Positions items that don't have explicit positioning using the specified `autoFlow` algorithm
3. **Layout Calculation**: Computes absolute positions for each grid item based on the grid structure
4. **Rendering**: Uses React Native's absolute positioning to place items accurately

This approach ensures consistent behavior across all platforms without requiring native modules.

## Performance Considerations

- **Memoization**: The layout calculation is optimized to minimize re-calculations
- **Layout Events**: Uses React Native's `onLayout` to respond to container size changes
- **Efficient Updates**: Only recalculates when props or container dimensions change

## Differences from CSS Grid

While the API is inspired by CSS Grid, there are some differences due to React Native constraints:

- **No grid-template-areas**: Use explicit positioning instead
- **Limited auto-flow**: Dense packing is simplified
- **No implicit grids**: Rows/columns must be explicitly defined or auto-generated
- **Positioning**: Uses absolute positioning internally instead of CSS Grid layout

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All components and utilities are fully typed for the best development experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Roadmap

- [x] **Responsive utilities** - Built-in breakpoint system ✅
- [x] **Grid patterns** - Common layout helpers ✅
- [ ] **Virtualization support** - Add optional FlatList integration for large datasets
- [ ] **minmax() function** - For min/max track sizing
- [ ] **repeat() notation** - Shorthand for repeating track patterns
- [ ] **Grid templates** - Named grid areas (grid-template-areas)
- [ ] **Animation support** - Smooth grid transitions
- [ ] **Performance optimizations** - For very large grids

## Support

For issues, feature requests, or questions, please file an issue on [GitHub](https://github.com/react-native-grid-system/react-native-grid-system/issues).

---

Made with ❤️ for the React Native community
