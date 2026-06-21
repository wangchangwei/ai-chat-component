import * as React from "react";
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
export declare function AIMessageUI({ parts, }: {
    parts: AIMessagePartLike[] | undefined | null;
}): React.ReactElement | null;
