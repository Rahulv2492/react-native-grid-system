/**
 * Product Grid Example - Perfect for E-commerce Screenshot
 * Showcases: Responsive columns, card layouts, uniform sizing
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Grid, GridItem, useResponsiveGrid } from "../src";

export const ProductGridExample = () => {
  const gridConfig = useResponsiveGrid({
    xs: { columns: ["1fr"], gap: 15 },
    sm: { columns: ["1fr", "1fr"], gap: 15 },
    md: { columns: ["1fr", "1fr", "1fr"], gap: 20 },
    lg: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 20 },
  });

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$129.99",
      rating: "4.8",
      color: "#FF6B6B",
      emoji: "🎧",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299.99",
      rating: "4.9",
      color: "#4ECDC4",
      emoji: "⌚",
    },
    {
      id: 3,
      name: "Laptop Sleeve",
      price: "$49.99",
      rating: "4.7",
      color: "#45B7D1",
      emoji: "💼",
    },
    {
      id: 4,
      name: "Phone Case",
      price: "$24.99",
      rating: "4.6",
      color: "#FFA07A",
      emoji: "📱",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: "$79.99",
      rating: "4.8",
      color: "#98D8C8",
      emoji: "🔊",
    },
    {
      id: 6,
      name: "USB-C Cable",
      price: "$19.99",
      rating: "4.5",
      color: "#F7DC6F",
      emoji: "🔌",
    },
    {
      id: 7,
      name: "Keyboard",
      price: "$149.99",
      rating: "4.9",
      color: "#BB8FCE",
      emoji: "⌨️",
    },
    {
      id: 8,
      name: "Mouse",
      price: "$59.99",
      rating: "4.7",
      color: "#85C1E2",
      emoji: "🖱️",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Products</Text>
        <Text style={styles.subtitle}>Discover our best sellers</Text>
      </View>

      <Grid {...gridConfig} autoRows="320" autoFlow="row">
        {products.map((product) => (
          <GridItem key={product.id} style={styles.productCard}>
            <View
              style={[styles.productImage, { backgroundColor: product.color }]}
            >
              <Text style={styles.productEmoji}>{product.emoji}</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingStars}>⭐</Text>
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
              <Text style={styles.productPrice}>{product.price}</Text>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </View>
            </View>
          </GridItem>
        ))}
      </Grid>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 5,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  productEmoji: {
    fontSize: 64,
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingStars: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
