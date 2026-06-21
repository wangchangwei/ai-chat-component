import type { ComponentType } from "react";
import { registerComponent } from "../core/registry/index.js";
import type { UIRenderProps } from "../core/registry/index.js";
import { radioPropsSchema, type RadioProps, type RadioValue } from "../core/schema/radio.js";
import { checkboxPropsSchema, type CheckboxProps, type CheckboxValue } from "../core/schema/checkbox.js";
import { selectPropsSchema, type SelectProps, type SelectValue } from "../core/schema/select.js";
import { formPropsSchema, type FormProps, type FormValue } from "../core/schema/form.js";
import { confirmPropsSchema, type ConfirmProps, type ConfirmValue } from "../core/schema/confirm.js";
import { wizardPropsSchema, type WizardProps, type WizardValue } from "../core/schema/wizard.js";
import { cardPropsSchema, type CardProps, type CardValue } from "../core/schema/card.js";
import { tablePropsSchema, type TableProps, type TableValue } from "../core/schema/table.js";
import { uploadPropsSchema, type UploadProps, type UploadValue } from "../core/schema/upload.js";

import { RadioView } from "./Radio/Radio.js";
import { CheckboxView } from "./Checkbox/Checkbox.js";
import { SelectView } from "./Select/Select.js";
import { FormView } from "./Form/Form.js";
import { ConfirmView } from "./Confirm/Confirm.js";
import { WizardView } from "./Wizard/Wizard.js";
import { CardView } from "./Card/Card.js";
import { TableView } from "./Table/Table.js";
import { UploadView } from "./Upload/Upload.js";

/**
 * Register all built-in components.
 *
 * Safe to call multiple times — `registerComponent` overwrites previous
 * entries, so this also works after `clearRegistry()` in tests.
 *
 * In production apps, call this once at app boot (the demo app does it
 * in `main.tsx`).
 */
export function registerDefaultComponents(): void {
  registerComponent<RadioProps, RadioValue>("radio", {
    schema: radioPropsSchema,
    component: RadioView as ComponentType<UIRenderProps<RadioProps, RadioValue>>,
    displayName: "Radio",
  });
  registerComponent<CheckboxProps, CheckboxValue>("checkbox", {
    schema: checkboxPropsSchema,
    component: CheckboxView as ComponentType<UIRenderProps<CheckboxProps, CheckboxValue>>,
    displayName: "Checkbox",
  });
  registerComponent<SelectProps, SelectValue>("select", {
    schema: selectPropsSchema,
    component: SelectView as ComponentType<UIRenderProps<SelectProps, SelectValue>>,
    displayName: "Select",
  });
  registerComponent<FormProps, FormValue>("form", {
    schema: formPropsSchema,
    component: FormView as ComponentType<UIRenderProps<FormProps, FormValue>>,
    displayName: "Form",
  });
  registerComponent<ConfirmProps, ConfirmValue>("confirm", {
    schema: confirmPropsSchema,
    component: ConfirmView as ComponentType<UIRenderProps<ConfirmProps, ConfirmValue>>,
    displayName: "Confirm",
  });
  registerComponent<WizardProps, WizardValue>("wizard", {
    schema: wizardPropsSchema,
    component: WizardView as ComponentType<UIRenderProps<WizardProps, WizardValue>>,
    displayName: "Wizard",
  });
  registerComponent<CardProps, CardValue>("card", {
    schema: cardPropsSchema,
    component: CardView as ComponentType<UIRenderProps<CardProps, CardValue>>,
    displayName: "Card",
  });
  registerComponent<TableProps, TableValue>("table", {
    schema: tablePropsSchema,
    component: TableView as ComponentType<UIRenderProps<TableProps, TableValue>>,
    displayName: "Table",
  });
  registerComponent<UploadProps, UploadValue>("upload", {
    schema: uploadPropsSchema,
    component: UploadView as ComponentType<UIRenderProps<UploadProps, UploadValue>>,
    displayName: "Upload",
  });
}
