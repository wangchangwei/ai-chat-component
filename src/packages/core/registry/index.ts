import type { ZodTypeAny } from "zod";
import type { ComponentType } from "react";
import type { Theme } from "../theme/classes.js";
import { defaultTheme } from "../theme/classes.js";

/**
 * Props passed to every concrete component implementation.
 *
 * The component must call `onSubmit` exactly once when the user finishes,
 * and may call `onCancel` to abort. Calling these callbacks more than once
 * is undefined behavior (the host agent will likely treat the second call
 * as a no-op).
 */
export interface UIRenderProps<TProps, TValue> {
  /** Component-specific, Zod-validated props from the agent */
  props: TProps;
  /** Current value (controlled) — undefined if not yet set */
  value: TValue | undefined;
  /** Notify the renderer of in-progress changes (used by Form/Wizard) */
  onChange: (value: TValue) => void;
  /** User finished and confirmed (e.g. clicked Submit, picked an option, ...) */
  onSubmit: (value: TValue) => void;
  /** User dismissed/cancelled */
  onCancel: () => void;
  /**
   * Active theme. Always a fully-resolved Theme (never a partial override).
   * The renderer resolves whatever the caller passes before forwarding, so
   * components can read any slot without a fallback dance. Optional so
   * custom View implementations written before v0.2.0 keep compiling —
   * the renderer always supplies a value at runtime.
   */
  theme?: Theme;
}

/**
 * One entry in the registry: how to validate props for a given component name,
 * and how to render it.
 */
export interface ComponentEntry<TProps = unknown, TValue = unknown> {
  schema: ZodTypeAny;
  component: ComponentType<UIRenderProps<TProps, TValue>>;
  /** Used by the renderer when a value is not provided */
  defaultValue?: TValue;
  /** Friendly name shown in dev tools / docs */
  displayName?: string;
}

const registry = new Map<string, ComponentEntry<any, any>>();

/** Register a component under a name. Overwrites if already present. */
export function registerComponent<TProps, TValue>(
  name: string,
  entry: ComponentEntry<TProps, TValue>,
): void {
  registry.set(name, entry);
}

/** Look up a registered component. Returns undefined if not found. */
export function getComponent(name: string): ComponentEntry | undefined {
  return registry.get(name);
}

/** Returns the list of registered component names (insertion order). */
export function listComponents(): string[] {
  return Array.from(registry.keys());
}

/** Remove a registered component (test-only helper). */
export function unregisterComponent(name: string): boolean {
  return registry.delete(name);
}

/** Clear the entire registry (test-only helper). */
export function clearRegistry(): void {
  registry.clear();
}
