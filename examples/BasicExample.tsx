/**
 * Basic Grid Example
 * Demonstrates simple 3-column grid layout
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Grid, GridItem } from "react-native-grid-system";

export const BasicExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic 3-Column Grid</Text>

      <Grid columns={[100, 100, 100]} gap={10}>
        <GridItem style={styles.box}>
          <Text>1</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>2</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>3</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>4</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>5</Text>
        </GridItem>
        <GridItem style={styles.box}>
          <Text>6</Text>
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
  },
});
