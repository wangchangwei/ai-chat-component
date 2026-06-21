import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { FormProps, FormValue } from "../../core/schema/form.js";
/**
 * Form — composed of typed fields. Submits a record of name → value.
 */
export declare function FormView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<FormProps, FormValue>): React.JSX.Element;
