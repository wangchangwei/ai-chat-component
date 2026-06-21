import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { CheckboxProps, CheckboxValue } from "../../core/schema/checkbox.js";
/**
 * Checkbox — multi-choice picker.
 *
 * User can select 0..N options and must click "Submit" to confirm.
 */
export declare function CheckboxView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<CheckboxProps, CheckboxValue>): React.JSX.Element;
