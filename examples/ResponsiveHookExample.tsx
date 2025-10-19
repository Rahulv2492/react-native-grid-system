/**
 * Responsive Hook Example
 * Demonstrates using the useResponsiveGrid hook for adaptive layouts
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Grid, GridItem } from "react-native-grid-system";
import { useResponsiveGrid, useBreakpoint } from "react-native-grid-system";

export const ResponsiveHookExample = () => {
  // Automatically adapts to screen size
  const columns = useResponsiveGrid({
    xs: ["1fr"], // 1 column on mobile
    sm: ["1fr", "1fr"], // 2 columns on small tablets
    md: ["1fr", "1fr", "1fr"], // 3 columns on tablets
    lg: ["1fr", "1fr", "1fr", "1fr"], // 4 columns on desktop
  });

  const currentBreakpoint = useBreakpoint();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Responsive Grid (Current: {currentBreakpoint})
      </Text>

      <Grid columns={columns} gap={10}>
        <GridItem style={styles.box}>
          <Text style={styles.boxText}>Item 1</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text style={styles.boxText}>Item 2</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text style={styles.boxText}>Item 3</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text style={styles.boxText}>Item 4</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text style={styles.boxText}>Item 5</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text style={styles.boxText}>Item 6</Text>
        </GridItem>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  box: {
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderRadius: 8,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
  },
});
