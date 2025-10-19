/**
 * Grid Patterns Example
 * Demonstrates using built-in grid patterns for common layouts
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Grid, GridItem } from "react-native-grid-system";
import { GridPatterns } from "react-native-grid-system";

export const GridPatternsExample = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Sidebar Layout */}
      <Text style={styles.sectionTitle}>Sidebar Layout</Text>
      <Grid
        columns={GridPatterns.sidebar(200, "left")}
        gap={10}
        style={styles.section}
      >
        <GridItem style={styles.sidebar}>
          <Text>Sidebar</Text>
        </GridItem>
        <GridItem style={styles.main}>
          <Text>Main Content</Text>
        </GridItem>
      </Grid>

      {/* Holy Grail Layout */}
      <Text style={styles.sectionTitle}>Holy Grail Layout</Text>
      <Grid
        columns={GridPatterns.holyGrail(150, 150)}
        gap={10}
        style={styles.section}
      >
        <GridItem style={styles.sidebar}>
          <Text>Left</Text>
        </GridItem>
        <GridItem style={styles.main}>
          <Text>Main</Text>
        </GridItem>
        <GridItem style={styles.sidebar}>
          <Text>Right</Text>
        </GridItem>
      </Grid>

      {/* Equal Columns */}
      <Text style={styles.sectionTitle}>Equal 4 Columns</Text>
      <Grid columns={GridPatterns.equal(4)} gap={10} style={styles.section}>
        <GridItem style={styles.equalBox}>
          <Text>1</Text>
        </GridItem>
        <GridItem style={styles.equalBox}>
          <Text>2</Text>
        </GridItem>
        <GridItem style={styles.equalBox}>
          <Text>3</Text>
        </GridItem>
        <GridItem style={styles.equalBox}>
          <Text>4</Text>
        </GridItem>
      </Grid>

      {/* Masonry-like */}
      <Text style={styles.sectionTitle}>Masonry Pattern</Text>
      <Grid columns={GridPatterns.masonry(3)} gap={10} style={styles.section}>
        <GridItem style={[styles.masonryBox, { height: 100 }]}>
          <Text>Item 1</Text>
        </GridItem>
        <GridItem style={[styles.masonryBox, { height: 150 }]}>
          <Text>Item 2</Text>
        </GridItem>
        <GridItem style={[styles.masonryBox, { height: 100 }]}>
          <Text>Item 3</Text>
        </GridItem>
      </Grid>

      {/* Gallery */}
      <Text style={styles.sectionTitle}>Gallery Grid</Text>
      <Grid columns={GridPatterns.gallery(120)} gap={8} style={styles.section}>
        {Array.from({ length: 9 }, (_, i) => (
          <GridItem key={i} style={styles.galleryItem}>
            <Text>{i + 1}</Text>
          </GridItem>
        ))}
      </Grid>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sidebar: {
    backgroundColor: "#95a5a6",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  main: {
    backgroundColor: "#3498db",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  equalBox: {
    backgroundColor: "#9b59b6",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  masonryBox: {
    backgroundColor: "#e74c3c",
    alignItems: "center",
    justifyContent: "center",
  },
  galleryItem: {
    backgroundColor: "#2ecc71",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
