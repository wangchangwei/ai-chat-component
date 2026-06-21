import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { RadioProps, RadioValue } from "../../core/schema/radio.js";
/**
 * Radio — single-choice picker.
 *
 * If `submitLabel` is set, shows a submit button (manual confirmation).
 * Otherwise auto-submits on pick.
 */
export declare function RadioView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<RadioProps, RadioValue>): React.JSX.Element;
