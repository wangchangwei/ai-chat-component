import { describe, it, expect } from "vitest";
import { createTheme, defaultTheme, resolveTheme } from "../src/packages/core/theme/classes.js";

describe("theme", () => {
  it("exposes a default theme that has every slot", () => {
    expect(defaultTheme.card).toBeTruthy();
    expect(defaultTheme.title).toBeTruthy();
    expect(defaultTheme.footer).toBeTruthy();
  });

  it("createTheme shallow-merges overrides", () => {
    const t = createTheme({ card: "rounded-2xl bg-pink-50", input: "rounded-full" });
    expect(t.card).toBe("rounded-2xl bg-pink-50");
    expect(t.input).toBe("rounded-full");
    // Other slots fall through to defaults
    expect(t.title).toBe(defaultTheme.title);
    expect(t.footer).toBe(defaultTheme.footer);
  });

  it("resolveTheme returns defaultTheme for nullish", () => {
    expect(resolveTheme(undefined)).toBe(defaultTheme);
    expect(resolveTheme(null)).toBe(defaultTheme);
  });

  it("resolveTheme merges partial overrides", () => {
    const t = resolveTheme({ card: "rounded-3xl" });
    expect(t.card).toBe("rounded-3xl");
    expect(t.title).toBe(defaultTheme.title);
  });

  it("resolveTheme passes through fully-populated themes", () => {
    const t = createTheme({ card: "rounded-3xl" });
    // createTheme returns a full Theme (not partial), so resolveTheme
    // should return it as-is.
    expect(resolveTheme(t)).toBe(t);
  });
});
