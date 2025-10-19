/**
 * Photo Gallery Example - Perfect for Masonry/Pinterest-style Screenshot
 * Showcases: Variable row spans, creative layouts, visual appeal
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Grid, GridItem, useResponsiveGrid } from "../src";

export const PhotoGalleryExample = () => {
  const gridConfig = useResponsiveGrid({
    xs: { columns: ["1fr", "1fr"], gap: 10 },
    sm: { columns: ["1fr", "1fr", "1fr"], gap: 12 },
    md: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 15 },
    lg: { columns: ["1fr", "1fr", "1fr", "1fr"], gap: 15 },
  });

  const photos = [
    { id: 1, rows: 2, color: "#3a2e5c", emoji: "🌅", title: "Sunset" },
    { id: 2, rows: 3, color: "#3a2e5c", emoji: "🏔️", title: "Mountains" },
    { id: 3, rows: 3, color: "#3a2e5c", emoji: "🌊", title: "Ocean" },
    { id: 4, rows: 3, color: "#3a2e5c", emoji: "🌸", title: "Flowers" },
    { id: 5, rows: 3, color: "#3a2e5c", emoji: "🌲", title: "Forest" },
    { id: 6, rows: 3, color: "#3a2e5c", emoji: "🏖️", title: "Beach" },
    { id: 7, rows: 2, color: "#3a2e5c", emoji: "🌃", title: "City" },
    { id: 8, rows: 1, color: "#3a2e5c", emoji: "🌈", title: "Rainbow" },
    { id: 9, rows: 1, color: "#3a2e5c", emoji: "🌺", title: "Garden" },
    { id: 10, rows: 2, color: "#3a2e5c", emoji: "🏞️", title: "Valley" },
    { id: 11, rows: 1, color: "#3a2e5c", emoji: "🌠", title: "Stars" },
    { id: 12, rows: 3, color: "#3a2e5c", emoji: "🏔️", title: "Peak" },
    { id: 13, rows: 1, color: "#3a2e5c", emoji: "🌻", title: "Sunflower" },
    { id: 14, rows: 2, color: "#3a2e5c", emoji: "🌴", title: "Palms" },
    { id: 15, rows: 1, color: "#3a2e5c", emoji: "🌵", title: "Desert" },
    { id: 16, rows: 2, color: "#3a2e5c", emoji: "🏕️", title: "Camping" },
    { id: 17, rows: 1, color: "#3a2e5c", emoji: "🌁", title: "Fog" },
    { id: 18, rows: 3, color: "#3a2e5c", emoji: "🌉", title: "Bridge" },
    { id: 19, rows: 2, color: "#3a2e5c", emoji: "🏝️", title: "Island" },
    { id: 20, rows: 1, color: "#3a2e5c", emoji: "🌄", title: "Sunrise" },
    { id: 21, rows: 1, color: "#3a2e5c", emoji: "🌆", title: "Skyline" },
    { id: 22, rows: 3, color: "#3a2e5c", emoji: "🎆", title: "Fireworks" },
    { id: 23, rows: 1, color: "#3a2e5c", emoji: "🌌", title: "Galaxy" },
    { id: 24, rows: 1, color: "#3a2e5c", emoji: "🌓", title: "Moon" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Gallery</Text>
        <Text style={styles.subtitle}>Masonry-style grid layout</Text>
      </View>
      <Grid {...gridConfig} autoRows="120" autoFlow="row-dense">
        {photos.map((photo) => (
          <GridItem
            key={photo.id}
            rowSpan={photo.rows}
            style={[styles.card, { backgroundColor: photo.color }]}
          >
            <Text style={styles.text}>{photo.emoji}</Text>
            <View style={styles.photoOverlay}>
              <Text style={styles.photoTitle}>{photo.title}</Text>
              <View style={styles.photoActions}>
                <Text style={styles.actionIcon}>❤️</Text>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionIcon}>🔗</Text>
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
    backgroundColor: "#d94545",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photoTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  photoActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionIcon: {
    fontSize: 18,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
});
