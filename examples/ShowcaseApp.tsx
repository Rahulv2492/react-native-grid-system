/**
 * Showcase App - All Examples in One Place
 * Use this to generate screenshots for README
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DashboardExample } from "./DashboardExample";
import { ProductGridExample } from "./ProductGridExample";
import { PhotoGalleryExample } from "./PhotoGalleryExample";
import { HolyGrailExample } from "./HolyGrailExample";
import { ResponsiveTestSuite } from "./ResponsiveTestSuite";

type ExampleKey =
  | "dashboard"
  | "products"
  | "gallery"
  | "holygrail"
  | "responsive";

export const ShowcaseApp = () => {
  const [activeExample, setActiveExample] = useState<ExampleKey>("dashboard");

  const examples = [
    {
      key: "dashboard" as ExampleKey,
      title: "📊 Dashboard",
      component: DashboardExample,
    },
    {
      key: "products" as ExampleKey,
      title: "🛍️ Products",
      component: ProductGridExample,
    },
    {
      key: "gallery" as ExampleKey,
      title: "📸 Gallery",
      component: PhotoGalleryExample,
    },
    {
      key: "holygrail" as ExampleKey,
      title: "🏛️ Holy Grail",
      component: HolyGrailExample,
    },
    {
      key: "responsive" as ExampleKey,
      title: "📱 Responsive",
      component: ResponsiveTestSuite,
    },
  ];

  const ActiveComponent = examples.find(
    (ex) => ex.key === activeExample
  )?.component;

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {examples.map((example) => (
            <TouchableOpacity
              key={example.key}
              style={[
                styles.tab,
                activeExample === example.key && styles.tabActive,
              ]}
              onPress={() => setActiveExample(example.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeExample === example.key && styles.tabTextActive,
                ]}
              >
                {example.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Active Example */}
      <View style={styles.content}>
        {ActiveComponent && <ActiveComponent />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  tabBar: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: "#3498db",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7f8c8d",
  },
  tabTextActive: {
    color: "white",
  },
  content: {
    flex: 1,
  },
});


