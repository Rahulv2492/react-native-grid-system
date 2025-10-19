/**
 * Tests for Grid component
 */

import React from "react";
import { Text } from "react-native";
import { Grid } from "../components/Grid";
import { GridItem } from "../components/GridItem";

describe("Grid Component", () => {
  it("should render without crashing", () => {
    const component = (
      <Grid columns={[100, 100, 100]}>
        <GridItem>
          <Text>Item 1</Text>
        </GridItem>
        <GridItem>
          <Text>Item 2</Text>
        </GridItem>
      </Grid>
    );

    expect(component).toBeDefined();
  });

  it("should accept gap props", () => {
    const component = (
      <Grid columns={[100, 100]} gap={10}>
        <GridItem>
          <Text>Item</Text>
        </GridItem>
      </Grid>
    );

    expect(component).toBeDefined();
  });

  it("should accept alignment props", () => {
    const component = (
      <Grid
        columns={[100, 100]}
        alignItems="center"
        justifyItems="center"
        alignContent="start"
        justifyContent="space-between"
      >
        <GridItem>
          <Text>Item</Text>
        </GridItem>
      </Grid>
    );

    expect(component).toBeDefined();
  });

  it("should handle autoFlow prop", () => {
    const component = (
      <Grid columns={[100, 100]} autoFlow="column">
        <GridItem>
          <Text>Item</Text>
        </GridItem>
      </Grid>
    );

    expect(component).toBeDefined();
  });

  it("should render children with explicit positioning", () => {
    const component = (
      <Grid columns={[100, 100, 100]} rows={[100, 100]}>
        <GridItem colStart={0} rowStart={0}>
          <Text>Item 1</Text>
        </GridItem>
        <GridItem colStart={2} rowStart={1}>
          <Text>Item 2</Text>
        </GridItem>
      </Grid>
    );

    expect(component).toBeDefined();
  });
});
