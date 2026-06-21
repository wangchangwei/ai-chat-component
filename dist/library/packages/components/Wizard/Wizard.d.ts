import * as React from "react";
import type { UIRenderProps } from "../../core/registry/index.js";
import type { WizardProps, WizardValue } from "../../core/schema/wizard.js";
/**
 * Wizard — multi-step form. Each step is a small Form. Final Submit emits
 * `{ currentStep, values }` so the agent knows which step the user reached.
 */
export declare function WizardView({ props, value, onChange, onSubmit, onCancel, }: UIRenderProps<WizardProps, WizardValue>): React.JSX.Element;
