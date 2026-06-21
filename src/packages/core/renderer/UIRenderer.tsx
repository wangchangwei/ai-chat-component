import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import type { UIAction } from "../schema/base.js";
import { getComponent, type UIRenderProps } from "../registry/index.js";

export interface UIRendererProps<TValue = unknown> {
  /** The schema produced by the agent */
  schema: UIAction;
  /** Called when the user finishes — the value is the user-supplied answer */
  onSubmit?: (value: TValue) => void;
  /** Called when the user cancels */
  onCancel?: () => void;
  className?: string;
  /**
   * Initial value (controlled). If omitted, the component's `defaultValue`
   * is used. The renderer keeps the latest value internally.
   */
  initialValue?: TValue;
}

/**
 * Render a registered Business UI component from a `{ component, props }` schema.
 *
 * Behavior:
 *   1. Looks up the component in the registry by `schema.component`.
 *   2. Validates `schema.props` against the registered Zod schema.
 *   3. Renders the React component, threading callbacks and the latest value.
 *
 * If the component is unknown or the props are invalid, the renderer renders a
 * visible error block (not a thrown exception) so the chat UI stays alive.
 */
export function UIRenderer<TValue = unknown>(props: UIRendererProps<TValue>) {
  const { schema, onSubmit, onCancel, className, initialValue } = props;

  const entry = getComponent(schema.component);

  // Validate props eagerly so we can render a friendly error block
  const validation = useMemo(() => {
    if (!entry) {
      return {
        ok: false as const,
        error: `Unknown component "${schema.component}". Register it with registerComponent().`,
      };
    }
    const result = entry.schema.safeParse(schema.props);
    if (!result.success) {
      return {
        ok: false as const,
        error: `Invalid props for "${schema.component}": ${result.error.message}`,
      };
    }
    // `result.data` is `unknown` because the registry stores heterogeneous
    // entries. The actual concrete props type is enforced at the registered
    // View component via its own signature — we trust Zod to narrow here.
    return { ok: true as const, props: result.data };
  }, [entry, schema.component, schema.props]);

  const [internalValue, setInternalValue] = useState<TValue | undefined>(
    initialValue ?? (entry?.defaultValue as TValue | undefined),
  );

  if (!validation.ok) {
    return <UIRendererError message={validation.error} className={className} />;
  }
  if (!entry) {
    // Already handled above, but TS narrows
    return <UIRendererError message="Component not found" className={className} />;
  }

  // The registry's Map holds a heterogeneous `ComponentEntry<any, any>`. The
  // concrete View is fully typed at the registration site (see
  // `defaultRegistry.ts`), so we cast once here to the broad `UIRenderProps`
  // shape and let TS narrow via the View's own signature at call time.
  const Component = entry.component as ComponentType<
    UIRenderProps<unknown, TValue>
  >;

  return (
    <div
      data-aui-component={schema.component}
      data-aui-id={schema.id}
      className={className}
    >
      <Component
        props={validation.props}
        value={internalValue}
        onChange={(v: TValue) => setInternalValue(v)}
        onSubmit={(v: TValue) => onSubmit?.(v)}
        onCancel={() => onCancel?.()}
      />
    </div>
  );
}

function UIRendererError({ message, className }: { message: string; className?: string }) {
  return (
    <div
      role="alert"
      className={
        "rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive " +
        (className ?? "")
      }
    >
      <div className="font-semibold mb-1">UI schema error</div>
      <div className="opacity-80">{message}</div>
    </div>
  );
}
