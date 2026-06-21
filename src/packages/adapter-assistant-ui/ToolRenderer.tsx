import { UIRenderer, type UIRendererProps, type UIAction } from "../core/index.js";
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

export const AssistantUIToolRenderer: ComponentType<
  AssistantUIToolRendererProps
> = ({ result, onSubmit, onCancel }) => {
  // `result` should be a UIAction. We accept any object that looks like one.
  if (!isUIAction(result)) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
        Tool result is not a valid UIAction.
      </div>
    );
  }
  return (
    <UIRenderer
      schema={result as UIAction}
      onSubmit={(value) => {
        if (onSubmit) {
          onSubmit(value);
        } else {
          // Fallback: dispatch a window event for hosts that listen globally.
          // eslint-disable-next-line no-console
          console.info("[ai-business-ui] submit:", value);
          window.dispatchEvent(
            new CustomEvent("ai-business-ui:submit", { detail: value }),
          );
        }
      }}
      onCancel={() => {
        if (onCancel) {
          onCancel();
        } else {
          window.dispatchEvent(new CustomEvent("ai-business-ui:cancel"));
        }
      }}
    />
  );
};

function isUIAction(x: unknown): x is UIAction {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return typeof o.component === "string" && "props" in o;
}

export type { UIAction, UIRendererProps };
