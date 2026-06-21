import type { UIAction } from "../schema/base.js";
import { type UIRendererProps } from "../renderer/UIRenderer.js";
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
export declare function useUIResult<TValue = unknown>(): {
    schema: UIAction<unknown> | null;
    setSchema: (s: UIAction | null) => void;
    result: TValue | null;
    cancelled: boolean;
    reset: () => void;
    ResultView: (props: Omit<UIRendererProps<TValue>, "schema">) => import("react").JSX.Element | null;
};
