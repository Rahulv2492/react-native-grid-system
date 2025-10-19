# Dense Packing Guide

## Understanding Grid Auto-Flow

Our grid library supports two auto-placement modes, just like CSS Grid:

### 1. **Normal Flow** (`autoFlow="row"`)

- **Behavior**: Places items in document order, left-to-right, top-to-bottom
- **Gaps**: Leaves gaps when items don't fit in current row
- **Use For**:
  - Structured layouts (dashboards, forms)
  - When document order is important
  - Uniform grids (product catalogs)

### 2. **Dense Packing** (`autoFlow="row-dense"`)

- **Behavior**: Fills gaps by backtracking to find available space
- **Gaps**: Minimizes gaps, tightly packs items
- **Use For**:
  - Masonry/Pinterest-style galleries
  - Photo galleries with varied heights
  - Visual layouts where order doesn't matter

---

## How Dense Packing Works

For each item, the algorithm:

1. **Starts from (0, 0)** - Always scans from the beginning
2. **Checks every cell** - Row by row, column by column
3. **Places in first fit** - First available position that accommodates the item
4. **Marks cells occupied** - Prevents overlaps

### Example:

```typescript
// 4-column grid
<Grid columns={["1fr", "1fr", "1fr", "1fr"]} autoFlow="row-dense">
  <GridItem rowSpan={2}>Item 1</GridItem> // → (0,0)
  <GridItem rowSpan={3}>Item 2</GridItem> // → (0,1)
  <GridItem rowSpan={1}>Item 3</GridItem> // → (0,2)
  <GridItem rowSpan={3}>Item 4</GridItem> // → (0,3)
  <GridItem rowSpan={2}>Item 5</GridItem> // → (1,2) ← fills gap!
</Grid>
```

**Visual Result:**

```
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │
├─────┤     ├─────┤     │
│  1  │  2  │  5  │  4  │  ← Item 5 fills the gap!
│     │     ├─────┤     │
│     │  2  │  5  │  4  │
└─────┴─────┴─────┴─────┘
```

---

## When to Use Each Mode

### ✅ Use `autoFlow="row"` (Normal) for:

| Layout Type       | Example                                |
| ----------------- | -------------------------------------- |
| **Dashboards**    | Stats cards, charts in specific order  |
| **Forms**         | Input fields, labels in sequence       |
| **Product Grids** | Uniform height items (e-commerce)      |
| **Data Tables**   | Tabular data with consistent structure |
| **Navigation**    | Menu items, tabs in order              |

### ✅ Use `autoFlow="row-dense"` (Dense) for:

| Layout Type             | Example                                 |
| ----------------------- | --------------------------------------- |
| **Photo Galleries**     | Images with varied aspect ratios        |
| **Pinterest Boards**    | Content cards with different heights    |
| **Masonry Layouts**     | Blog posts, articles with varied length |
| **Portfolio Galleries** | Projects with different sizes           |
| **Social Feeds**        | Posts with varying content length       |

---

## Complete Examples

### Normal Flow Example (Dashboard)

```tsx
import { Grid, GridItem, useResponsiveGrid } from "react-native-grid-system";

export const Dashboard = () => {
  const gridConfig = useResponsiveGrid({
    xs: { columns: ["1fr"], gap: 15 },
    sm: { columns: ["1fr", "1fr"], gap: 15 },
    md: { columns: ["1fr", "1fr", "1fr"], gap: 15 },
    lg: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 15 },
  });

  return (
    <Grid {...gridConfig} autoRows="140" autoFlow="row">
      <GridItem>{/* Stats Card 1 */}</GridItem>
      <GridItem>{/* Stats Card 2 */}</GridItem>
      <GridItem colSpan={2}>{/* Chart */}</GridItem>
      <GridItem rowSpan={2}>{/* Activity Feed */}</GridItem>
    </Grid>
  );
};
```

### Dense Packing Example (Gallery)

```tsx
import { Grid, GridItem, useResponsiveGrid } from "react-native-grid-system";

export const PhotoGallery = () => {
  const gridConfig = useResponsiveGrid({
    xs: { columns: ["1fr", "1fr"], gap: 10 },
    sm: { columns: ["1fr", "1fr", "1fr"], gap: 12 },
    md: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 15 },
    lg: { columns: ["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"], gap: 15 },
  });

  const photos = [
    { id: 1, rows: 2, image: "..." },
    { id: 2, rows: 3, image: "..." },
    { id: 3, rows: 1, image: "..." },
    // ... more photos with varied heights
  ];

  return (
    <Grid {...gridConfig} autoRows="120" autoFlow="row-dense">
      {photos.map((photo) => (
        <GridItem key={photo.id} rowSpan={photo.rows}>
          <Image source={{ uri: photo.image }} />
        </GridItem>
      ))}
    </Grid>
  );
};
```

---

## Testing Dense Packing

Try the included Photo Gallery example to see dense packing in action:

```tsx
import { PhotoGalleryExample } from "react-native-grid-system/examples";

// In your app:
<PhotoGalleryExample />;
```

**What you should see:**

**Mobile (2 columns):**

- Photos stack in 2 columns with varied heights
- Gaps filled automatically as items of different sizes fit together

**Tablet (3-4 columns):**

- More horizontal space for photos
- Dense packing creates natural masonry effect

**Desktop (6 columns):**

- Wide grid with tight packing
- Photos of different heights create Pinterest-style layout
- No unnecessary gaps or diagonal staircase appearance

The key is having a **varied distribution of heights** (1-row, 2-row, and 3-row items) so the algorithm has opportunities to fill gaps efficiently.

---

## Best Practices for Masonry Layouts

### ✅ Distribute `rowSpan` Values

For the best masonry effect, **vary the heights** of your items:

**❌ Bad** (all same height - creates diagonal appearance):

```typescript
const photos = [
  { id: 1, rows: 3 }, // ← all 3 rows
  { id: 2, rows: 3 },
  { id: 3, rows: 3 },
  // ... all tall items
];
```

**✅ Good** (varied heights - natural masonry):

```typescript
const photos = [
  { id: 1, rows: 2 }, // ← mixed heights
  { id: 2, rows: 3 }, // tall
  { id: 3, rows: 1 }, // short
  { id: 4, rows: 3 }, // tall
  { id: 5, rows: 2 }, // medium
  { id: 6, rows: 1 }, // short
];
```

**Recommended distribution:**

- 50-60% short items (1 row)
- 30-35% medium items (2 rows)
- 10-15% tall items (3 rows)

This gives dense packing more opportunities to fill gaps and creates a more natural, Pinterest-like appearance.

---

## Troubleshooting

### Issue: Items still showing diagonal placement

**Possible Causes:**

1. **`autoFlow` not set correctly**

   ```tsx
   // ✅ Correct
   <Grid autoFlow="row-dense" {...otherProps} />
   ```

2. **Hook not returning correct config**

   ```tsx
   // ✅ Correct format
   const gridConfig = useResponsiveGrid({
     xs: { columns: ["1fr"], gap: 10 }, // ← object with columns + gap
     // NOT: xs: ["1fr"]  ← wrong format
   });
   ```

3. **Poor `rowSpan` distribution** (most common!)
   - Too many tall items (3 rows) limits packing opportunities
   - Solution: Adjust your data to have more 1-row and 2-row items
   - See "Best Practices" section above

### Issue: Gap between items too large

**Cause**: Wrong `autoRows` or `rowSpan` values

**Solution**:

- Use `autoRows="auto"` for dynamic heights (mobile)
- Use fixed `autoRows="120"` for consistent layout (desktop)
- Ensure `rowSpan` values match actual content height

### Issue: Items overlapping

**Cause**: Content taller than allocated rows

**Solution**:

```tsx
// Calculate proper row span:
// itemHeight = contentHeight + padding
// rowSpan = Math.ceil(itemHeight / autoRowsValue)

<GridItem rowSpan={Math.ceil(280 / 120)}>
  {" "}
  // = 3 rows
  {/* 280px content */}
</GridItem>
```

---

## API Reference

### Grid Props

| Prop       | Type                                                 | Default       | Description                             |
| ---------- | ---------------------------------------------------- | ------------- | --------------------------------------- |
| `autoFlow` | `"row" \| "row-dense" \| "column" \| "column-dense"` | `"row-dense"` | Auto-placement algorithm                |
| `columns`  | `TrackSize[]`                                        | `["1fr"]`     | Column definitions                      |
| `autoRows` | `string \| number`                                   | `"100"`       | Default row height                      |
| `gap`      | `number`                                             | `0`           | Gap between items (both row and column) |

### useResponsiveGrid Hook

```typescript
// Returns object with columns + gap
useResponsiveGrid(config: ResponsiveGridConfig): { columns: TrackSize[]; gap?: number }

// Config format:
interface ResponsiveGridConfig {
  xs?: { columns: TrackSize[]; gap?: number };
  sm?: { columns: TrackSize[]; gap?: number };
  md?: { columns: TrackSize[]; gap?: number };
  lg?: { columns: TrackSize[]; gap?: number };
  xl?: { columns: TrackSize[]; gap?: number };
}
```

---

## Summary

✅ **Dense Packing (`row-dense`)** = Masonry galleries, minimal gaps  
✅ **Normal Flow (`row`)** = Structured layouts, preserve order  
✅ **Algorithm verified** = Test shows correct gap-filling behavior  
✅ **Yes, you CAN design that gallery!** 🎨

The library fully supports CSS Grid-style dense packing for beautiful masonry layouts.
