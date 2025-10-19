/**
 * Holy Grail Layout Example - Classic Web Layout
 * Showcases: Complex spanning, sidebar layouts, traditional web design
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Grid, GridItem } from "../src";

export const HolyGrailExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Holy Grail Layout</Text>

      <Grid
        columns={["200", "1fr", "200"]}
        rows={["80", "1fr", "60"]}
        gap={15}
        style={styles.grid}
      >
        {/* Header - spans all columns */}
        <GridItem colSpan={3} style={styles.header}>
          <Text style={styles.headerText}>Header</Text>
          <View style={styles.nav}>
            {["Home", "Products", "About", "Contact"].map((item) => (
              <Text key={item} style={styles.navItem}>
                {item}
              </Text>
            ))}
          </View>
        </GridItem>

        {/* Left Sidebar */}
        <GridItem style={styles.leftSidebar}>
          <Text style={styles.sidebarTitle}>Navigation</Text>
          {[
            "📊 Dashboard",
            "📦 Products",
            "👥 Customers",
            "📈 Analytics",
            "⚙️ Settings",
          ].map((item, i) => (
            <Text key={i} style={styles.sidebarItem}>
              {item}
            </Text>
          ))}
        </GridItem>

        {/* Main Content */}
        <GridItem style={styles.main}>
          <Text style={styles.mainTitle}>Main Content Area</Text>
          <Text style={styles.mainText}>
            This is the main content area. The Holy Grail layout is a classic
            web design pattern with a header, footer, and three columns.
          </Text>
          <View style={styles.contentCard}>
            <Text style={styles.cardTitle}>Featured Content</Text>
            <Text style={styles.cardText}>
              The middle column expands to fill available space, while the
              sidebars remain fixed width.
            </Text>
          </View>
          <View style={styles.contentCard}>
            <Text style={styles.cardTitle}>More Information</Text>
            <Text style={styles.cardText}>
              This layout adapts perfectly to different screen sizes using React
              Native Grid.
            </Text>
          </View>
        </GridItem>

        {/* Right Sidebar */}
        <GridItem style={styles.rightSidebar}>
          <Text style={styles.sidebarTitle}>Widgets</Text>
          <View style={styles.widget}>
            <Text style={styles.widgetTitle}>🔥 Hot Topics</Text>
            <Text style={styles.widgetItem}>• React Native</Text>
            <Text style={styles.widgetItem}>• CSS Grid</Text>
            <Text style={styles.widgetItem}>• TypeScript</Text>
          </View>
          <View style={styles.widget}>
            <Text style={styles.widgetTitle}>📊 Stats</Text>
            <Text style={styles.widgetItem}>1.2K Views</Text>
            <Text style={styles.widgetItem}>89 Likes</Text>
          </View>
        </GridItem>

        {/* Footer - spans all columns */}
        <GridItem colSpan={3} style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Holy Grail Layout • Built with react-native-grid-system
          </Text>
        </GridItem>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  grid: {
    height: 600,
  },
  header: {
    backgroundColor: "#34495e",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  nav: {
    flexDirection: "row",
    gap: 15,
  },
  navItem: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  leftSidebar: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
  },
  rightSidebar: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
  },
  sidebarTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sidebarItem: {
    color: "white",
    fontSize: 14,
    paddingVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: "rgba(255,255,255,0.3)",
    paddingLeft: 10,
    marginBottom: 5,
  },
  main: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  mainText: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
    marginBottom: 15,
  },
  contentCard: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 13,
    color: "#7f8c8d",
    lineHeight: 18,
  },
  widget: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  widgetTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  widgetItem: {
    color: "white",
    fontSize: 12,
    marginBottom: 4,
  },
  footer: {
    backgroundColor: "#2c3e50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white",
    fontSize: 12,
  },
});
