/**
 * Tests for track size parsing utilities
 */

import { parseTrackSize, calculateTrackSizes } from '../utils/parseTrackSize';

describe('parseTrackSize', () => {
  it('should parse pixel values', () => {
    expect(parseTrackSize(100)).toEqual({ value: 100, unit: 'px' });
    expect(parseTrackSize('100')).toEqual({ value: 100, unit: 'px' });
    expect(parseTrackSize('100px')).toEqual({ value: 100, unit: 'px' });
  });

  it('should parse fr units', () => {
    expect(parseTrackSize('1fr')).toEqual({ value: 1, unit: 'fr' });
    expect(parseTrackSize('2fr')).toEqual({ value: 2, unit: 'fr' });
    expect(parseTrackSize('0.5fr')).toEqual({ value: 0.5, unit: 'fr' });
  });

  it('should parse percentages', () => {
    expect(parseTrackSize('50%')).toEqual({ value: 50, unit: '%' });
    expect(parseTrackSize('100%')).toEqual({ value: 100, unit: '%' });
  });

  it('should parse auto', () => {
    expect(parseTrackSize('auto')).toEqual({ value: 0, unit: 'auto' });
  });

  it('should handle invalid values', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    expect(parseTrackSize('invalid')).toEqual({ value: 0, unit: 'auto' });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('calculateTrackSizes', () => {
  it('should calculate pixel tracks', () => {
    const result = calculateTrackSizes([100, 200, 100], 400, 0);
    expect(result).toEqual([100, 200, 100]);
  });

  it('should calculate fr tracks', () => {
    const result = calculateTrackSizes(['1fr', '2fr', '1fr'], 400, 0);
    expect(result).toEqual([100, 200, 100]);
  });

  it('should calculate mixed tracks', () => {
    const result = calculateTrackSizes([100, '1fr', '2fr'], 400, 0);
    // 400 - 100 = 300 remaining
    // 3fr total, so 100px per fr
    expect(result).toEqual([100, 100, 200]);
  });

  it('should handle gaps', () => {
    const result = calculateTrackSizes(['1fr', '1fr'], 420, 20);
    // 420 - 20 = 400 available
    // 400 / 2fr = 200px per fr
    expect(result).toEqual([200, 200]);
  });

  it('should handle percentages', () => {
    const result = calculateTrackSizes(['50%', '50%'], 400, 0);
    expect(result).toEqual([200, 200]);
  });

  it('should handle auto tracks', () => {
    const result = calculateTrackSizes([100, 'auto', 'auto'], 400, 0);
    // 400 - 100 = 300 remaining
    // 2 auto tracks = 150px each
    expect(result).toEqual([100, 150, 150]);
  });

  it('should prioritize fr over auto', () => {
    const result = calculateTrackSizes([100, '1fr', 'auto'], 400, 0);
    // 400 - 100 = 300 remaining
    // 1fr takes all remaining = 300px
    // auto gets 0
    expect(result).toEqual([100, 300, 0]);
  });
});


