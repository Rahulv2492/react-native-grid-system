/**
 * Utilities for parsing track sizes
 */

import { TrackSize, ParsedTrack } from '../types';

/**
 * Parse a track size value into its numeric value and unit
 */
export function parseTrackSize(trackSize: TrackSize): ParsedTrack {
  // If it's already a number, treat as pixels
  if (typeof trackSize === 'number') {
    return { value: trackSize, unit: 'px' };
  }

  const trimmed = trackSize.trim();

  // Handle 'auto'
  if (trimmed === 'auto') {
    return { value: 0, unit: 'auto' };
  }

  // Handle 'fr' units
  if (trimmed.endsWith('fr')) {
    const value = parseFloat(trimmed);
    if (isNaN(value)) {
      console.warn(`Invalid fr value: ${trackSize}, using 1fr`);
      return { value: 1, unit: 'fr' };
    }
    return { value, unit: 'fr' };
  }

  // Handle percentages
  if (trimmed.endsWith('%')) {
    const value = parseFloat(trimmed);
    if (isNaN(value)) {
      console.warn(`Invalid percentage value: ${trackSize}, using auto`);
      return { value: 0, unit: 'auto' };
    }
    return { value, unit: '%' };
  }

  // Handle pixel values (with or without 'px' suffix)
  const numValue = parseFloat(trimmed);
  if (!isNaN(numValue)) {
    return { value: numValue, unit: 'px' };
  }

  // Fallback to auto for unrecognized values
  console.warn(`Unrecognized track size: ${trackSize}, using auto`);
  return { value: 0, unit: 'auto' };
}

/**
 * Calculate actual pixel sizes for a track template
 * @param tracks Array of track sizes
 * @param availableSpace Available space in pixels
 * @param gap Gap between tracks
 * @returns Array of pixel sizes for each track
 */
export function calculateTrackSizes(
  tracks: TrackSize[],
  availableSpace: number,
  gap: number
): number[] {
  if (tracks.length === 0) {
    return [];
  }

  const parsedTracks = tracks.map(parseTrackSize);
  const totalGap = gap * (tracks.length - 1);
  let remainingSpace = availableSpace - totalGap;

  // First pass: calculate fixed sizes (px and %)
  const sizes: number[] = new Array(tracks.length).fill(0);
  let totalFr = 0;
  let autoCount = 0;

  parsedTracks.forEach((track, index) => {
    if (track.unit === 'px') {
      sizes[index] = track.value;
      remainingSpace -= track.value;
    } else if (track.unit === '%') {
      const size = (availableSpace * track.value) / 100;
      sizes[index] = size;
      remainingSpace -= size;
    } else if (track.unit === 'fr') {
      totalFr += track.value;
    } else if (track.unit === 'auto') {
      autoCount++;
    }
  });

  // Ensure remaining space isn't negative
  remainingSpace = Math.max(0, remainingSpace);

  // Second pass: distribute remaining space among fr units
  if (totalFr > 0) {
    const frSize = remainingSpace / totalFr;
    parsedTracks.forEach((track, index) => {
      if (track.unit === 'fr') {
        sizes[index] = track.value * frSize;
      }
    });
    remainingSpace = 0;
  }

  // Third pass: distribute any remaining space among auto tracks
  if (autoCount > 0 && remainingSpace > 0) {
    const autoSize = remainingSpace / autoCount;
    parsedTracks.forEach((track, index) => {
      if (track.unit === 'auto') {
        sizes[index] = autoSize;
      }
    });
  }

  return sizes;
}


