import { useState, useCallback } from "react";
import type { UIAction } from "../schema/base.js";
import { UIRenderer, type UIRendererProps } from "../renderer/UIRenderer.js";

/**
 * Manages a single HITL interaction: schema in, result out.
 *
 * Usage:
 *   const { schema, setSchema, ResultView, reset } = useUIResult<MyValue>();
 *
 *   <ResultView
 *     onSubmit={(v) => api.sendToAgent(v)}
 *   />
 */
export function useUIResult<TValue = unknown>() {
  const [schema, setSchemaInternal] = useState<UIAction | null>(null);
  const [result, setResult] = useState<TValue | null>(null);
  const [cancelled, setCancelled] = useState(false);

  const setSchema = useCallback((s: UIAction | null) => {
    setSchemaInternal(s);
    setResult(null);
    setCancelled(false);
  }, []);

  const reset = useCallback(() => {
    setSchemaInternal(null);
    setResult(null);
    setCancelled(false);
  }, []);

  const ResultView = useCallback(
    (props: Omit<UIRendererProps<TValue>, "schema">) => {
      if (!schema) return null;
      return (
        <UIRenderer<TValue>
          schema={schema}
          onSubmit={(v) => {
            setResult(v);
            props.onSubmit?.(v);
          }}
          onCancel={() => {
            setCancelled(true);
            props.onCancel?.();
          }}
          className={props.className}
          initialValue={props.initialValue}
        />
      );
    },
    [schema],
  );

  return { schema, setSchema, result, cancelled, reset, ResultView };
}
