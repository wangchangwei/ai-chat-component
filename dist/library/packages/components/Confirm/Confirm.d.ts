import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { ConfirmProps, ConfirmValue } from "../../core/schema/confirm.js";
/**
 * Confirm — yes/no modal dialog. Submits `true`/`false`.
 */
export declare function ConfirmView({ props, onSubmit, onCancel, }: UIRenderProps<ConfirmProps, ConfirmValue>): React.JSX.Element;
