/**
 * Mock for react-native in tests
 */

export const Dimensions = {
  get: jest.fn().mockReturnValue({ width: 375, height: 667 }),
  addEventListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
  removeEventListener: jest.fn(),
};

export const StyleSheet = {
  create: jest.fn((styles) => styles),
};

export const View = "View";
export const Text = "Text";
export const ScrollView = "ScrollView";
export const Image = "Image";


