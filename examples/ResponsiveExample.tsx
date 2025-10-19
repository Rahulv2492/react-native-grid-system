/**
 * Responsive Grid Example
 * Demonstrates flexible columns using fr units
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Grid, GridItem } from "react-native-grid-system";

export const ResponsiveExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responsive Grid with FR Units</Text>

      <Grid columns={["1fr", "2fr", "1fr"]} gap={10}>
        <GridItem style={styles.box}>
          <Text>1fr</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>2fr</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>1fr</Text>
        </GridItem>
      </Grid>

      <Text style={styles.subtitle}>Mixed Units</Text>
      <Grid columns={[100, "auto", "1fr"]} gap={10}>
        <GridItem style={[styles.box, styles.box1]}>
          <Text>100px</Text>
        </GridItem>
        <GridItem style={[styles.box, styles.box2]}>
          <Text>auto</Text>
        </GridItem>
        <GridItem style={[styles.box, styles.box3]}>
          <Text>1fr</Text>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  box1: {
    backgroundColor: "#e74c3c",
  },
  box2: {
    backgroundColor: "#f39c12",
  },
  box3: {
    backgroundColor: "#2ecc71",
  },
});
