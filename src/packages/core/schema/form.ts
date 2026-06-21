import { z } from "zod";

/**
 * Form is a composition of typed fields. Each field is discriminated by `type`.
 * The schema covers: input, textarea, number, switch, radio, checkbox, select.
 */

const inputField = z.object({
  type: z.literal("input"),
  name: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  required: z.boolean().optional(),
});

const textareaField = z.object({
  type: z.literal("textarea"),
  name: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  required: z.boolean().optional(),
  rows: z.number().int().positive().optional(),
});

const numberField = z.object({
  type: z.literal("number"),
  name: z.string(),
  label: z.string(),
  defaultValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  required: z.boolean().optional(),
});

const switchField = z.object({
  type: z.literal("switch"),
  name: z.string(),
  label: z.string(),
  description: z.string().optional(),
  defaultValue: z.boolean().optional(),
});

const radioField = z.object({
  type: z.literal("radio"),
  name: z.string(),
  label: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })).min(2),
  defaultValue: z.string().optional(),
  required: z.boolean().optional(),
});

const checkboxField = z.object({
  type: z.literal("checkbox"),
  name: z.string(),
  label: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  defaultValue: z.array(z.string()).optional(),
});

const selectField = z.object({
  type: z.literal("select"),
  name: z.string(),
  label: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  defaultValue: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
});

export const formFieldSchema = z.discriminatedUnion("type", [
  inputField,
  textareaField,
  numberField,
  switchField,
  radioField,
  checkboxField,
  selectField,
]);

export type FormField = z.infer<typeof formFieldSchema>;

export const formPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(formFieldSchema).min(1),
  submitLabel: z.string().optional(),
  cancelLabel: z.string().optional(),
});

export type FormProps = z.infer<typeof formPropsSchema>;

export const formValueSchema = z.record(z.string(), z.unknown());

export type FormValue = z.infer<typeof formValueSchema>;
