import type { ZodTypeAny } from "zod";
import type { ComponentType } from "react";
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
/** Register a component under a name. Overwrites if already present. */
export declare function registerComponent<TProps, TValue>(name: string, entry: ComponentEntry<TProps, TValue>): void;
/** Look up a registered component. Returns undefined if not found. */
export declare function getComponent(name: string): ComponentEntry | undefined;
/** Returns the list of registered component names (insertion order). */
export declare function listComponents(): string[];
/** Remove a registered component (test-only helper). */
export declare function unregisterComponent(name: string): boolean;
/** Clear the entire registry (test-only helper). */
export declare function clearRegistry(): void;
