import { type UIRendererProps, type UIAction } from "../core/index.js";
import type { ComponentType } from "react";
/**
 * Adapter for @assistant-ui/react.
 *
 * The recommended usage is to wrap your Assistant-UI `tool()` definition
 * with this renderer so the agent's tool result renders as a Business UI
 * component directly inside the chat thread.
 *
 * Example (in your assistant-ui runtime config):
 *
 *   import { makeAssistantToolUI } from "@assistant-ui/react";
 *   import { AssistantUIToolRenderer } from "@ai-business-ui/adapter-assistant-ui";
 *
 *   export const showUITool = makeAssistantToolUI({
 *     toolName: "show_ui",
 *     render: AssistantUIToolRenderer,
 *   });
 *
 * Pass `onSubmit` / `onCancel` to receive values via props; otherwise the
 * adapter falls back to dispatching `ai-business-ui:submit` / `:cancel` window
 * events (useful when the host can't directly thread callbacks).
 *
 * `AssistantUIToolRenderer` is intentionally a plain React component so it
 * works regardless of the exact `tool()` / `makeAssistantToolUI()` API surface
 * (which has shifted across assistant-ui versions).
 */
export interface AssistantUIToolRendererProps {
    result: unknown;
    onSubmit?: (value: unknown) => void;
    onCancel?: () => void;
}
export declare const AssistantUIToolRenderer: ComponentType<AssistantUIToolRendererProps>;
export type { UIAction, UIRendererProps };
