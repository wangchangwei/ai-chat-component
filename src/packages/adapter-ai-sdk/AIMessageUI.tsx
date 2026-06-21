import * as React from "react";
import { UIRenderer } from "../core/index.js";
import type { UIAction } from "../core/schema/base.js";

/**
 * Loose typing for an AI-SDK message part. We don't depend on the SDK at the
 * adapter boundary so the adapter compiles even if message shapes shift.
 */
export interface AIMessagePartLike {
  type: string;
  /** Common fields we look at */
  data?: unknown;
  text?: string;
  toolInvocation?: {
    state?: string;
    toolName?: string;
    result?: unknown;
  };
}

/**
 * Adapter for Vercel AI SDK and any other runtime that produces
 * `message.parts` arrays.
 *
 * Recognized part types:
 *   - `data-ui`            → `data` is the UIAction
 *   - `tool-show_ui`       → `toolInvocation.result` is the UIAction
 *
 * Usage:
 *   <AIMessageUI parts={message.parts} />
 */
export function AIMessageUI({
  parts,
}: {
  parts: AIMessagePartLike[] | undefined | null;
}): React.ReactElement | null {
  const schemas = React.useMemo(() => extractSchemas(parts ?? []), [parts]);
  if (schemas.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      {schemas.map((s, i) => (
        <UIRenderer key={i} schema={s} />
      ))}
    </div>
  );
}

function extractSchemas(parts: AIMessagePartLike[]): UIAction[] {
  const out: UIAction[] = [];
  for (const p of parts) {
    if (p.type === "data-ui" && isUIAction(p.data)) {
      out.push(p.data);
      continue;
    }
    if (p.type === "tool-show_ui" && p.toolInvocation?.result && isUIAction(p.toolInvocation.result)) {
      out.push(p.toolInvocation.result);
      continue;
    }
    if (p.type === "tool-invocation" && p.toolInvocation?.toolName === "show_ui" && isUIAction(p.toolInvocation.result)) {
      out.push(p.toolInvocation.result);
      continue;
    }
  }
  return out;
}

function isUIAction(x: unknown): x is UIAction {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return typeof o.component === "string" && "props" in o;
}
