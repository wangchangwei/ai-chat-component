import { describe, it, expect, beforeEach } from "vitest";
import { z } from "zod";
import * as React from "react";
import {
  registerComponent,
  getComponent,
  listComponents,
  clearRegistry,
  unregisterComponent,
} from "../src/packages/core/registry/index.js";

function Stub(_: any) {
  return <div data-testid="stub" />;
}

beforeEach(() => {
  clearRegistry();
});

describe("ComponentRegistry", () => {
  it("registers and retrieves a component", () => {
    registerComponent("stub", {
      schema: z.object({ name: z.string() }),
      component: Stub as any,
    });
    const entry = getComponent("stub");
    expect(entry).toBeDefined();
    expect(listComponents()).toContain("stub");
  });

  it("returns undefined for an unknown component", () => {
    expect(getComponent("nope")).toBeUndefined();
  });

  it("overwrites an existing entry", () => {
    registerComponent("x", { schema: z.object({}), component: Stub as any });
    registerComponent("x", { schema: z.object({}), component: Stub as any });
    expect(listComponents().filter((n) => n === "x").length).toBe(1);
  });

  it("unregister removes an entry", () => {
    registerComponent("y", { schema: z.object({}), component: Stub as any });
    expect(unregisterComponent("y")).toBe(true);
    expect(getComponent("y")).toBeUndefined();
  });

  it("clear removes everything", () => {
    registerComponent("a", { schema: z.object({}), component: Stub as any });
    registerComponent("b", { schema: z.object({}), component: Stub as any });
    clearRegistry();
    expect(listComponents()).toEqual([]);
  });
});
