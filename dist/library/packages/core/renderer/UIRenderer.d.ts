import type { UIAction } from "../schema/base.js";
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
export declare function UIRenderer<TValue = unknown>(props: UIRendererProps<TValue>): import("react").JSX.Element;
