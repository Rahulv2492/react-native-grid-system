/**
 * Tests for responsive utilities
 */

import {
  getCurrentBreakpoint,
  getResponsiveColumns,
  GridPatterns,
} from "../utils/responsive";

describe("getCurrentBreakpoint", () => {
  it("should return correct breakpoint for width", () => {
    expect(getCurrentBreakpoint(400)).toBe("xs");
    expect(getCurrentBreakpoint(600)).toBe("sm");
    expect(getCurrentBreakpoint(800)).toBe("md");
    expect(getCurrentBreakpoint(1000)).toBe("lg");
    expect(getCurrentBreakpoint(1300)).toBe("xl");
  });

  it("should handle custom breakpoints", () => {
    const customBreakpoints = {
      xs: 0,
      sm: 600,
      md: 1024,
    };
    expect(getCurrentBreakpoint(500, customBreakpoints)).toBe("xs");
    expect(getCurrentBreakpoint(700, customBreakpoints)).toBe("sm");
    expect(getCurrentBreakpoint(1200, customBreakpoints)).toBe("md");
  });
});

describe("getResponsiveColumns", () => {
  it("should return columns for current breakpoint", () => {
    const config = {
      xs: ["1fr"],
      sm: ["1fr", "1fr"],
      md: ["1fr", "1fr", "1fr"],
    };

    expect(getResponsiveColumns(config, 400)).toEqual(["1fr"]);
    expect(getResponsiveColumns(config, 600)).toEqual(["1fr", "1fr"]);
    expect(getResponsiveColumns(config, 800)).toEqual(["1fr", "1fr", "1fr"]);
  });

  it("should cascade to smaller breakpoint if not defined", () => {
    const config = {
      xs: ["1fr"],
      lg: ["1fr", "1fr", "1fr", "1fr"],
    };

    // md should fall back to xs
    expect(getResponsiveColumns(config, 800)).toEqual(["1fr"]);
    // lg should use its own
    expect(getResponsiveColumns(config, 1000)).toEqual([
      "1fr",
      "1fr",
      "1fr",
      "1fr",
    ]);
  });
});

describe("GridPatterns", () => {
  it("should create responsive columns", () => {
    const pattern = GridPatterns.responsiveColumns(1, 2, 3, 4, 5);
    expect(pattern.xs).toHaveLength(1);
    expect(pattern.sm).toHaveLength(2);
    expect(pattern.md).toHaveLength(3);
    expect(pattern.lg).toHaveLength(4);
    expect(pattern.xl).toHaveLength(5);
  });

  it("should create equal columns", () => {
    const columns = GridPatterns.equal(4);
    expect(columns).toEqual(["1fr", "1fr", "1fr", "1fr"]);
  });

  it("should create sidebar layout", () => {
    expect(GridPatterns.sidebar(200, "left")).toEqual([200, "1fr"]);
    expect(GridPatterns.sidebar(200, "right")).toEqual(["1fr", 200]);
  });

  it("should create holy grail layout", () => {
    expect(GridPatterns.holyGrail(150, 200)).toEqual([150, "1fr", 200]);
  });

  it("should create masonry pattern", () => {
    const columns = GridPatterns.masonry(3);
    expect(columns).toHaveLength(3);
    expect(columns).toEqual(["1fr", "1.5fr", "1fr"]);
  });
});
