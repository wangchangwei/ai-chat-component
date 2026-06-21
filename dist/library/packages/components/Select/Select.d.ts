import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { SelectProps, SelectValue } from "../../core/schema/select.js";
/**
 * Select — single-choice dropdown. User confirms with Submit.
 */
export declare function SelectView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<SelectProps, SelectValue>): React.JSX.Element;
