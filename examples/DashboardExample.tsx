/**
 * Dashboard Example - Perfect for README Screenshot
 * Showcases: Column spanning, mixed layouts, cards, responsive design
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Grid, GridItem, useResponsiveGrid, useBreakpoint } from "../src";

export const DashboardExample = () => {
  const breakpoint = useBreakpoint();

  // Responsive grid configuration
  const gridConfig = useResponsiveGrid({
    xs: { columns: ["1fr"], gap: 15 },
    sm: { columns: ["1fr", "1fr"], gap: 15 },
    md: { columns: ["1fr", "1fr", "1fr"], gap: 15 },
    lg: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 15 },
  });

  // Determine if we should show desktop layout (with sidebar)
  const isDesktop = breakpoint === "lg" || breakpoint === "xl";
  const isMobile = breakpoint === "xs";
  const isTablet = breakpoint === "sm" || breakpoint === "md";

  // Responsive autoRows
  // Mobile: "auto" - automatically calculates row heights based on content (just like CSS Grid!)
  // Desktop: 140px for controlled, consistent layout
  const autoRowsValue = isMobile ? "auto" : "140";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Analytics Dashboard</Text>

      <Grid {...gridConfig} autoRows={autoRowsValue} autoFlow="row">
        {/* Stats Cards */}
        <GridItem style={styles.statCard1}>
          <Text style={styles.statValue}>12.5K</Text>
          <Text style={styles.statLabel}>Total Users</Text>
          <Text style={styles.statChange}>↑ 12% from last month</Text>
        </GridItem>

        <GridItem style={styles.statCard2}>
          <Text style={styles.statValue}>$45.2K</Text>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statChange}>↑ 8% from last month</Text>
        </GridItem>

        <GridItem style={styles.statCard3}>
          <Text style={styles.statValue}>2,456</Text>
          <Text style={styles.statLabel}>Active Orders</Text>
          <Text style={styles.statChange}>↑ 23% from last month</Text>
        </GridItem>

        <GridItem style={styles.statCard4}>
          <Text style={styles.statValue}>98.5%</Text>
          <Text style={styles.statLabel}>Satisfaction</Text>
          <Text style={styles.statChange}>↑ 2% from last month</Text>
        </GridItem>

        {/* Revenue Chart - Responsive spanning */}
        <GridItem
          colSpan={
            isDesktop
              ? 3 // 4-col grid: span 3
              : breakpoint === "md"
              ? 2 // 3-col grid: span 2
              : isMobile
              ? 1 // 1-col grid: span 1
              : 2 // 2-col grid (sm): span 2
          }
          rowSpan={isMobile ? 1 : 2} // Span 2 rows on tablet/desktop (280px ≈ 2×140px)
          style={[styles.chartCard, isMobile && styles.chartCardMobile]}
        >
          <Text style={styles.cardTitle}>Revenue Overview</Text>
          <View
            style={[
              styles.chartPlaceholder,
              isMobile && styles.chartPlaceholderMobile,
            ]}
          >
            <Text style={styles.chartText}>📊 Chart Area</Text>
            <Text style={styles.chartSubtext}>Q1 2024 Performance</Text>
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#3498db" }]}
              />
              <Text style={styles.legendText}>Sales</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#2ecc71" }]}
              />
              <Text style={styles.legendText}>Revenue</Text>
            </View>
          </View>
        </GridItem>

        {/* Activity Feed - Only use rowSpan on desktop */}
        <GridItem
          rowSpan={isDesktop ? 2 : 1}
          style={[styles.activityCard, isMobile && styles.activityCardMobile]}
        >
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { icon: "🛒", text: "New order #1234", time: "2m ago" },
              { icon: "👤", text: "User registered", time: "5m ago" },
              { icon: "💳", text: "Payment received", time: "12m ago" },
              { icon: "📦", text: "Order shipped", time: "18m ago" },
              { icon: "⭐", text: "New review", time: "25m ago" },
            ].map((item, i) => (
              <View key={i} style={styles.activityItem}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText} numberOfLines={1}>
                    {item.text}
                  </Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </GridItem>

        {/* Quick Stats - Responsive spanning */}
        <GridItem
          colSpan={
            isDesktop
              ? 3 // 4-col grid: span 3 (fills remaining space)
              : 1 // All other breakpoints: span 1 (avoids overlap)
          }
          rowSpan={
            isMobile
              ? 1 // Mobile: auto height
              : isDesktop
              ? 1 // Desktop: horizontal layout fits in 1 row
              : 2 // Tablet: vertical layout needs 2 rows
          }
          style={styles.quickStatsCard}
        >
          <Text style={styles.cardTitle}>Quick Stats</Text>
          <View
            style={[
              styles.quickStatsContainer,
              (isMobile || isTablet) && styles.quickStatsContainerMobile,
            ]}
          >
            <View style={styles.quickStat}>
              <Text style={styles.quickStatValue}>156</Text>
              <Text style={styles.quickStatLabel}>Pending</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatValue}>89</Text>
              <Text style={styles.quickStatLabel}>Processing</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatValue}>1,234</Text>
              <Text style={styles.quickStatLabel}>Completed</Text>
            </View>
          </View>
        </GridItem>
      </Grid>
    </ScrollView>
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
    marginBottom: 20,
  },
  statCard1: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
    height: 140,
  },
  statCard2: {
    backgroundColor: "#2ecc71",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
    height: 140,
  },
  statCard3: {
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
    height: 140,
  },
  statCard4: {
    backgroundColor: "#f39c12",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
    height: 140,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 5,
  },
  statChange: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  chartCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    minHeight: 280,
  },
  chartCardMobile: {
    minHeight: 180,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  chartPlaceholder: {
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 180,
  },
  chartPlaceholderMobile: {
    height: 100,
  },
  chartText: {
    fontSize: 32,
    color: "#7f8c8d",
  },
  chartSubtext: {
    fontSize: 14,
    color: "#95a5a6",
    marginTop: 5,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    minHeight: 280,
  },
  activityCardMobile: {
    minHeight: 160,
    padding: 15,
  },
  activityList: {
    paddingVertical: 5,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 12,
    color: "#95a5a6",
    marginTop: 2,
  },
  quickStatsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  quickStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  quickStatsContainerMobile: {
    flexDirection: "column",
    gap: 20,
    alignItems: "stretch",
  },
  quickStat: {
    alignItems: "center",
    flex: 1,
    minWidth: 80,
  },
  quickStatValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  quickStatLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 5,
  },
});
